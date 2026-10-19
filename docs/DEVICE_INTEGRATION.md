# [Platform Name] Device & Sensor Integration Specification

This document details the communication protocols, payload formats, and edge synchronization pipelines connecting field sensors to the Cloud Platform.

---

## 1. Supported Sensor Hardware & Interface Protocols

The platform supports commercial agricultural sensors measuring soil dynamics across multiple root-zone horizons:

1. **Multi-Depth Capacitance & TDR/FDR Probes:**
   - Depths: 10 cm, 20 cm, 30 cm, 40 cm, 50 cm.
   - Metrics:
     - **Volumetric Water Content (VWC):** `0.0% – 100.0%` (Resolution: `0.1%`, Accuracy: `±1.5% VWC` in calibrated soil).
     - **Soil Temperature:** `-40.0°C – +60.0°C` (Resolution: `0.1°C`, Accuracy: `±0.5°C`).
     - **Electrical Conductivity (Bulk EC):** `0.0 – 20.0 dS/m` (Resolution: `0.01 dS/m`).
2. **Physical Interfaces:**
   - **SDI-12 (Serial Digital Interface at 1200 baud):** Industry standard for low-power environmental data loggers.
   - **RS485 Modbus RTU (9600 baud, 8N1):** Rugged industrial communication for multi-probe arrays.
   - **Analog Voltage / Capacitive (0–3.3V ADC):** Low-cost probes connected to edge microcontroller ADCs.

---

## 2. Raspberry Pi & Edge Controller Workflow

Field hubs (such as Raspberry Pi 3/4/Zero 2W or ESP32 gateways) act as localized loggers with the following lifecycle:

```
[ Wake from Deep Sleep ]
           │
           ▼
[ Acquire Sensor Data (SDI-12 / Modbus) ]
           │
           ▼
[ Validate Range & Compute CRC / Quality ]
           │
           ▼
[ Store into Local Flash / SQLite Buffer ]
           │
      ┌────┴────────────────────────┐
      ▼                             ▼
[ Cellular / WiFi Available? ]   [ Bluetooth BLE Advertising ]
      │ Yes                         │ Farmer Smartphone in Range
      ▼                             ▼
[ Direct HTTPS Cloud Upload ]    [ BLE GATT Sync to Mobile App ]
      │                             │
      └──────────────┬──────────────┘
                     ▼
[ Mark Readings as Synced in Local Buffer ]
                     ▼
[ Return to Low-Power Sleep ]
```

---

## 3. Bluetooth Low Energy (BLE) Custom Profile

When network coverage is absent, field technicians use the [Platform Name] Mobile App to read or sync cached measurements over Bluetooth Low Energy:

- **Service UUID:** `6E400001-B5A3-F393-E0A9-E50E24DCCA9E` ([Platform Name] Telemetry Service)
- **Characteristics:**
  - **Live Measurement Characteristic:** `6E400002-B5A3-F393-E0A9-E50E24DCCA9E` (Read / Notify)
    - Emits real-time packet every 5 seconds while connected.
  - **Buffer Sync Characteristic:** `6E400003-B5A3-F393-E0A9-E50E24DCCA9E` (Write to Request / Notify to Stream)
    - Allows the mobile application to pull offline historical records since the last sync pointer.
  - **Device Status Characteristic:** `6E400004-B5A3-F393-E0A9-E50E24DCCA9E` (Read)
    - Returns battery percentage, firmware version, and hardware health flags.

### Binary Frame Format (BLE Notification, 20 bytes):
| Byte Index | Field | Format | Description |
|------------|-------|--------|-------------|
| 0–1 | Packet Header | `0x54 0x53` ("TS") | Protocol identifier |
| 2 | Depth Index | `uint8` | 1=10cm, 2=20cm, 3=30cm, 4=40cm, 5=50cm |
| 3–4 | VWC (%) | `uint16` (LE) | Scaled by 10 (e.g., `285` = `28.5%`) |
| 5–6 | Temperature (°C) | `int16` (LE) | Scaled by 10 (e.g., `214` = `21.4°C`) |
| 7–8 | EC (dS/m) | `uint16` (LE) | Scaled by 100 (e.g., `124` = `1.24 dS/m`) |
| 9–10 | Battery (mV) | `uint16` (LE) | Millivolts (e.g., `3850` = `3.85V`) |
| 11 | Signal RSSI | `int8` | Signal in dBm (e.g., `-72`) |
| 12–15 | Epoch Seconds | `uint32` (LE) | Measurement timestamp |
| 16–17 | Sequence Number | `uint16` (LE) | Incrementing counter |
| 18–19 | CRC16-CCITT | `uint16` (LE) | Checksum |

---

## 4. Cloud Ingestion API Specification

### Endpoint: `POST /api/telemetry/ingest`
- **Headers:**
  - `Content-Type: application/json`
  - `X-Device-Id: <device_uid>`
  - `X-Idempotency-Key: <unique_uuid_or_hash>` (Ensures offline sync retries do not duplicate readings)
  - `Authorization: Bearer <device_or_user_token>`

### JSON Ingestion Payload:
```json
{
  "deviceUid": "TS-PROBE-88219",
  "syncBatchId": "b4e872d3-1a2f-410a-8cf0-df6a1112bcf3",
  "source": "SENSOR",
  "batteryMv": 3840,
  "signalRssi": -68,
  "firmware": "v2.4.1",
  "readings": [
    {
      "depthCm": 10,
      "vwcPercent": 28.4,
      "tempC": 21.3,
      "ecDsM": 1.15,
      "qualityScore": 0.98,
      "measuredAt": "2026-10-19T07:30:00.000Z"
    },
    {
      "depthCm": 20,
      "vwcPercent": 31.8,
      "tempC": 19.8,
      "ecDsM": 1.22,
      "qualityScore": 0.99,
      "measuredAt": "2026-10-19T07:30:00.000Z"
    },
    {
      "depthCm": 30,
      "vwcPercent": 34.2,
      "tempC": 18.5,
      "ecDsM": 1.30,
      "qualityScore": 0.99,
      "measuredAt": "2026-10-19T07:30:00.000Z"
    }
  ]
}
```

### Ingestion Response:
```json
{
  "success": true,
  "insertedCount": 3,
  "duplicatesSkipped": 0,
  "alertsTriggered": [
    {
      "alertId": "alt-4921",
      "severity": "WARNING",
      "rule": "Low moisture at 10cm depth",
      "field": "North Pivot Alpha"
    }
  ],
  "serverTimestamp": "2026-10-19T07:31:02.145Z"
}
```

---

## 5. Offline Sync & Duplicate Rejection Guarantees

1. **Idempotency Key:** Every batch upload carries an `X-Idempotency-Key`. If the mobile client experiences a network timeout during upload, the subsequent retry with the same key will acknowledge the previous transaction without inserting duplicates.
2. **Composite Key Database Constraint:** The cloud database enforces a unique index on `(device_id, depth_cm, measured_at)`. Any duplicate point is cleanly skipped with an incremental `duplicatesSkipped` counter in the response.
3. **Measurement Source Distinction:**
   - Real sensor readings are tagged `source: "SENSOR"` and `is_demo: false`.
   - Virtual or simulated telemetry is tagged `source: "SIMULATED"` or `is_demo: true` and is strictly segmented from production agronomic analysis.
