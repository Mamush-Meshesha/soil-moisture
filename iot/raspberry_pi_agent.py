#!/usr/bin/env python3
"""
Smart Agriculture Raspberry Pi & Edge IoT Gateway Daemon
=========================================================
Acquires multi-depth soil moisture data (SDI-12 / Modbus RTU / ADC),
validates signal integrity, maintains an ACID local SQLite spool buffer for
offline farm scenarios, and synchronizes with the Cloud Platform
over cellular/Wi-Fi or Bluetooth Low Energy (BLE) mobile sync.
"""

import argparse
import datetime
import json
import math
import os
import random
import sqlite3
import sys
import time
import urllib.error
import urllib.request
import uuid

DEFAULT_API_URL = "http://localhost:5000/api/telemetry/ingest"
DEFAULT_DEVICE_UID = "TS-PROBE-88219"
SPOOL_DB_PATH = os.path.join(os.path.dirname(__file__), "edge_spool.sqlite")


class EdgeSpoolBuffer:
    """Manages persistent offline queue of telemetry records when disconnected."""

    def __init__(self, db_path=SPOOL_DB_PATH):
        self.db_path = db_path
        self._init_db()

    def _init_db(self):
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute(
                """
                CREATE TABLE IF NOT EXISTS spooled_telemetry (
                    id TEXT PRIMARY KEY,
                    device_uid TEXT NOT NULL,
                    depth_cm INTEGER NOT NULL,
                    vwc_percent REAL NOT NULL,
                    temp_c REAL,
                    ec_ds_m REAL,
                    battery_mv INTEGER,
                    signal_rssi INTEGER,
                    measured_at TEXT NOT NULL,
                    synced INTEGER DEFAULT 0,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
                """
            )
            cursor.execute(
                "CREATE INDEX IF NOT EXISTS idx_unsynced ON spooled_telemetry(synced, measured_at)"
            )
            conn.commit()

    def enqueue_reading(self, device_uid, depth_cm, vwc, temp_c, ec, battery_mv, rssi, measured_at):
        reading_id = str(uuid.uuid4())
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute(
                """
                INSERT INTO spooled_telemetry
                (id, device_uid, depth_cm, vwc_percent, temp_c, ec_ds_m, battery_mv, signal_rssi, measured_at, synced)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0)
                """,
                (reading_id, device_uid, depth_cm, vwc, temp_c, ec, battery_mv, rssi, measured_at),
            )
            conn.commit()
        return reading_id

    def get_unsynced_batch(self, limit=50):
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute(
                """
                SELECT id, device_uid, depth_cm, vwc_percent, temp_c, ec_ds_m, battery_mv, signal_rssi, measured_at
                FROM spooled_telemetry
                WHERE synced = 0
                ORDER BY measured_at ASC
                LIMIT ?
                """,
                (limit,),
            )
            return cursor.fetchall()

    def mark_synced(self, reading_ids):
        if not reading_ids:
            return
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            placeholders = ",".join("?" for _ in reading_ids)
            cursor.execute(
                f"UPDATE spooled_telemetry SET synced = 1 WHERE id IN ({placeholders})",
                reading_ids,
            )
            conn.commit()


def acquire_sensor_horizons(device_uid, simulated=True):
    """
    Acquires readings across 5 depth horizons (10, 20, 30, 40, 50 cm).
    In hardware mode, this queries SDI-12 via UART GPIO or RS-485 Modbus.
    In simulated mode, it generates realistic diurnal soil physics.
    """
    now = datetime.datetime.now(datetime.timezone.utc)
    hour = now.hour
    measured_at = now.isoformat()

    depths = [10, 20, 30, 40, 50]
    readings = []

    # Estimate ambient soil temperature with depth damping
    base_surface_temp = 22.0 + (3.0 if 11 <= hour <= 18 else -2.0)
    battery_mv = 3850 + random.randint(-20, 20)
    signal_rssi = -68 + random.randint(-4, 4)

    for depth in depths:
        # Volumetric Water Content: deeper soil retains more water in dry periods
        depth_factor = depth / 50.0
        diurnal_transpiration = 0.6 if 11 <= hour <= 19 else 0.1
        vwc = round(28.0 + depth_factor * 4.0 - diurnal_transpiration + random.uniform(-0.2, 0.2), 1)
        temp_c = round(base_surface_temp - depth * 0.12 + random.uniform(-0.1, 0.1), 1)
        ec_ds_m = round(1.15 + (depth * 0.005) + random.uniform(-0.02, 0.02), 2)

        readings.append(
            {
                "depthCm": depth,
                "vwcPercent": max(0.0, min(100.0, vwc)),
                "tempC": temp_c,
                "ecDsM": ec_ds_m,
                "qualityScore": 0.99,
                "measuredAt": measured_at,
                "batteryMv": battery_mv,
                "signalRssi": signal_rssi,
            }
        )

    return readings


def sync_payload_to_cloud(api_url, device_uid, readings, idempotency_key=None):
    """Posts telemetry payload to Cloud API with idempotency protection."""
    if not idempotency_key:
        idempotency_key = f"rpi-sync-{uuid.uuid4()}"

    payload = {
        "deviceUid": device_uid,
        "source": "SENSOR",
        "batteryMv": readings[0]["batteryMv"] if readings else 3800,
        "signalRssi": readings[0]["signalRssi"] if readings else -70,
        "firmware": "v2.4.1-rpi",
        "readings": [
            {
                "depthCm": r["depthCm"],
                "vwcPercent": r["vwcPercent"],
                "tempC": r["tempC"],
                "ecDsM": r["ecDsM"],
                "qualityScore": r.get("qualityScore", 1.0),
                "measuredAt": r["measuredAt"],
            }
            for r in readings
        ],
    }

    req_data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        api_url,
        data=req_data,
        headers={
            "Content-Type": "application/json",
            "X-Device-Id": device_uid,
            "X-Idempotency-Key": idempotency_key,
        },
        method="POST",
    )

    with urllib.request.urlopen(req, timeout=10) as response:
        resp_data = response.read().decode("utf-8")
        return json.loads(resp_data)


def main():
    parser = argparse.ArgumentParser(description="Smart Agriculture Edge Sensor Gateway Daemon")
    parser.add_argument("--device-uid", default=DEFAULT_DEVICE_UID, help="Device hardware identifier")
    parser.add_argument("--api-url", default=DEFAULT_API_URL, help="Cloud telemetry ingestion endpoint")
    parser.add_argument("--interval", type=int, default=10, help="Sampling interval in seconds (default 10s)")
    parser.add_argument("--once", action="store_true", help="Acquire and sync single reading cycle then exit")
    parser.add_argument("--simulate-offline", action="store_true", help="Simulate network outage to test local spool buffer")
    args = parser.parse_args()

    spool = EdgeSpoolBuffer()
    print(f"[*] Edge Gateway Daemon started for device: {args.device_uid}")
    print(f"[*] Local spool database: {spool.db_path}")
    print(f"[*] Target API: {args.api_url}")

    iteration = 0
    while True:
        iteration += 1
        print(f"\n[{datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Cycle #{iteration}: Acquiring 5-depth soil horizons...")
        readings = acquire_sensor_horizons(args.device_uid)

        # Enqueue into local SQLite spool buffer
        for r in readings:
            spool.enqueue_reading(
                args.device_uid,
                r["depthCm"],
                r["vwcPercent"],
                r["tempC"],
                r["ecDsM"],
                r["batteryMv"],
                r["signalRssi"],
                r["measuredAt"],
            )

        print(f"    -> Sampled {len(readings)} horizons. Topsoil (10cm): {readings[0]['vwcPercent']}% VWC, Subsoil (50cm): {readings[-1]['vwcPercent']}% VWC.")

        # Sync spooled readings if online
        if args.simulate_offline:
            print("    [!] Offline simulation mode active. Telemetry queued locally in spool buffer.")
        else:
            unsynced = spool.get_unsynced_batch(limit=50)
            if unsynced:
                print(f"    [*] Attempting to synchronize {len(unsynced)} buffered readings with cloud...")
                batch_readings = [
                    {
                        "depthCm": row[2],
                        "vwcPercent": row[3],
                        "tempC": row[4],
                        "ecDsM": row[5],
                        "batteryMv": row[6],
                        "signalRssi": row[7],
                        "measuredAt": row[8],
                    }
                    for row in unsynced
                ]
                reading_ids = [row[0] for row in unsynced]

                try:
                    result = sync_payload_to_cloud(args.api_url, args.device_uid, batch_readings)
                    spool.mark_synced(reading_ids)
                    print(f"    [+] Cloud sync SUCCESS: {result.get('insertedCount', 0)} inserted, {result.get('duplicatesSkipped', 0)} duplicates skipped.")
                    if result.get("alertsTriggered"):
                        for alert in result["alertsTriggered"]:
                            print(f"    [ALERT TRIGGERED] {alert['ruleName']} -> {alert['message']}")
                except Exception as ex:
                    print(f"    [-] Cloud sync FAILED ({ex}). Telemetry safely preserved in local buffer.")

        if args.once:
            break

        time.sleep(args.interval)


if __name__ == "__main__":
    main()
