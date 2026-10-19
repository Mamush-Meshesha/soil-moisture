# [Platform Name] | Production-Ready Smart Agriculture & Soil Intelligence Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Node: v20](https://img.shields.io/badge/Node.js-v20.20-brightgreen.svg)](https://nodejs.org/)
[![Python: 3.12](https://img.shields.io/badge/Python-3.12-blue.svg)](https://python.org/)
[![Vite: 5.4](https://img.shields.io/badge/Vite-5.4-purple.svg)](https://vitejs.dev/)
[![Tests: Vitest](https://img.shields.io/badge/Tests-8%20Passed-success.svg)](https://vitest.dev/)

**[Platform Name]** is an end-to-end, production-ready agricultural technology platform inspired by CropX, engineered to transform subsurface field soil measurements into actionable irrigation intelligence. It encompasses a multi-horizon telemetry pipeline, an edge IoT Raspberry Pi agent with offline spool buffering, a Bluetooth Low Energy (BLE) field sync workflow, an e-commerce hardware store with sandbox checkout, and an enterprise customer farm dashboard.

---

## 1. System Architecture & Data Flow

```
+-------------------------------------------------------------+
|               Field Soil Sensor Horizons                   |
| (10cm, 20cm, 30cm, 40cm, 50cm - VWC %, Temp °C, Bulk EC)   |
+-------------------------------------------------------------+
                              |
                     [ SDI-12 / Modbus ]
                              v
+-------------------------------------------------------------+
|         Raspberry Pi / Edge Controller Gateway              |
|  - Local ACID SQLite Spool Buffer (edge_spool.sqlite)       |
|  - Custom BLE Environmental Sensing GATT Profile            |
|  - Automated Retry & Network Reconnect Daemon              |
+-------------------------------------------------------------+
            |                                      |
   [ Direct 4G HTTPS ]                   [ BLE GATT Handshake ]
            |                                      |
            v                                      v
+-------------------------------------------------------------+
|                   Cloud Telemetry Ingestion                 |
|  - POST /api/telemetry/ingest                               |
|  - X-Idempotency-Key deduplication                          |
|  - Dynamic Threshold Alert Rules Engine                     |
+-------------------------------------------------------------+
                              |
               [ Relational Time-Series Store ]
                              v
+-------------------------------------------------------------+
|                 [Platform Name] Web Platform                |
|  - Public Marketing & Technology Showcase                   |
|  - Equipment Store & Sandbox Checkout                       |
|  - Authenticated SaaS Farm Dashboard (/app)                 |
|  - Real-time Multi-Horizon SVG Charting                     |
|  - Infiltration & Diurnal Transpiration Curves              |
|  - Advisory Water Deficit Guidance (FAO-56 ET0)             |
|  - High-Resolution CSV Telemetry Exports                    |
+-------------------------------------------------------------+
```

---

## 2. Key Modules & Capabilities

### A. Public Marketing Website
- **Home (`/`)**: Agricultural value proposition, interactive multi-horizon soil visualizer, end-to-end data pipeline workflow, customer ROI breakdown.
- **Platform (`/platform`)**: In-depth explanation of multi-depth dielectric sensing, alert state transitions, and open reporting.
- **Technology (`/technology`)**: High-frequency capacitance (70MHz permittivity physics), SDI-12 / Modbus serial communication, and BLE frame specifications.
- **Hardware Catalog & Details (`/products`, `/products/:slug`)**: Full product specifications for Probe X5, Probe X3, Solar Field Gateways, and Augers with depth options and installation guidance.
- **Store & Sandbox Checkout (`/store`, `/checkout`)**: Functional shopping cart, address validation, sandbox payment simulation, order reference generation, and customer order tracking.
- **Solutions (`/solutions`)**: Custom workflows for commercial row crops, vineyards, agronomist consultants, and water districts.
- **Resources & About (`/resources`, `/about`)**: Sensor installation manual, soil texture moisture thresholds (wilting point, refill trigger, field capacity), and FAQs.
- **Contact & Demo (`/contact`, `/demo`)**: Validated lead capture persisted securely in the cloud database.

### B. Authenticated Customer Dashboard (`/app`)
- **Overview (`/app`)**: Summary KPI metrics, active threshold alerts banner, circular soil moisture status gauges, and quick action shortcuts.
- **Farms & Fields (`/app/farms`, `/app/fields`)**: Multi-farm property management, crop stage configuration, soil texture selection (Silt Loam, Sandy Loam, Clay), and root-zone depth tuning.
- **Devices Registry (`/app/devices`)**: Hardware health status (`ONLINE`, `STALE`, `OFFLINE`), battery voltage (mV), signal quality (dBm), and firmware tracking.
- **Soil Monitoring (`/app/soil-monitoring`)**: Interactive SVG multi-horizon chart (10cm, 20cm, 30cm, 40cm, 50cm), horizon series toggles, hover tooltips, and raw measurement table.
- **Analytics (`/app/analytics`)**: Mathematical drying slopes, wetting front infiltration rates, and 24-hour diurnal plant transpiration cycle curves.
- **Irrigation Guidance (`/app/irrigation`)**: Water deficit calculation in millimeters, irrigation event logging, and before/after moisture differentials.
- **Alerts Center (`/app/alerts`)**: Active threshold alerts with operator state transitions (Acknowledge, Resolve) and automated rule creation.
- **Reports & Export (`/app/reports`)**: Executive agronomic summary, 24-hour depth profiles, and one-click raw CSV telemetry data downloads.
- **Maintenance (`/app/maintenance`)**: Dielectric testing records, battery replacement logs, and technician field service notes.
- **Team & Settings (`/app/team`, `/app/settings`)**: Role-based access control (RBAC), unit system toggle (Metric vs US Customary), timezone localization, and IoT API key generation.

### C. Edge IoT Agent & Bluetooth BLE Sync
- **Raspberry Pi Daemon (`iot/raspberry_pi_agent.py`)**:
  - Simulates or interfaces with physical SDI-12 / Modbus soil probes.
  - Maintains a local SQLite offline buffer (`iot/edge_spool.sqlite`).
  - Automatically enqueues readings when disconnected and flushes batches upon reconnection with `X-Idempotency-Key` headers.
- **Interactive BLE Field Sync Wizard (`BleSimulatorModal.tsx`)**:
  - Accessible directly in the dashboard header via the **"BLE Field Sync"** button.
  - Scans for nearby probe advertising beacons (`TS-PROBE-88219`).
  - Performs GATT handshake on service `6E400001-B5A3-F393-E0A9-E50E24DCCA9E`.
  - Downloads 20-byte binary telemetry frames and commits offline flash buffers to the cloud database without duplicates.

---

## 3. Quick Start & Local Development

### Prerequisites
- Node.js v20+
- Python 3.10+ (for Raspberry Pi agent)
- npm or pnpm

### Setup Commands
```bash
# 1. Clone or navigate to the workspace
cd /home/mamush/Desktop/project/master-project/soil-moisture

# 2. Install all dependencies (backend & frontend)
npm run install:all

# 3. Seed realistic 7-day soil moisture telemetry and sample farms
npm run seed

# 4. Start Backend Server (Port 5000)
npm run dev:backend

# 5. Start Frontend Dev Server (Port 3000, in a separate terminal)
npm run dev:frontend
```

Open your browser to: **`http://localhost:3000`**

### Pre-Configured Demo Credentials
Quick-fill buttons are provided on the Login page (`/login`) for instantaneous evaluation:
- **Farm Manager:** `farmer@example.com` / `AgriPass2026!`
- **Lead Agronomist:** `admin@example.com` / `AgriPass2026!`

---

## 4. Running the Raspberry Pi Edge Agent

To simulate or acquire physical soil sensor readings on a field node:

```bash
# Run a single acquisition and cloud sync pass
python3 iot/raspberry_pi_agent.py --once

# Test offline spooling resilience (simulates network outage)
python3 iot/raspberry_pi_agent.py --once --simulate-offline

# Run continuous sampling every 10 seconds
python3 iot/raspberry_pi_agent.py --interval 10
```

---

## 5. Automated Tests & Build Verification

```bash
# Run backend Vitest integration suite
npm run test:backend

# Build backend and frontend production bundles
npm run build
```

**Test Results:**
- `GET /api/health` — 200 OK
- `POST /api/auth/login` — JWT token generation & RBAC verified
- `GET /api/farms` & `GET /api/fields` — Aggregated statistics verified
- `POST /api/telemetry/ingest` — Composite deduplication & idempotency verified
- `POST /api/store/checkout` — Sandbox order confirmed

---

## 6. Docker Container Deployment

```bash
# Build and run containerized platform
docker-compose up --build -d
```

---

## 7. Documentation Index

- [`docs/PROJECT_AUDIT.md`](docs/PROJECT_AUDIT.md) — Comprehensive pre-implementation architecture audit and gap analysis.
- [`docs/IMPLEMENTATION_PLAN.md`](docs/IMPLEMENTATION_PLAN.md) — Phased task breakdown and dependencies.
- [`docs/DEVICE_INTEGRATION.md`](docs/DEVICE_INTEGRATION.md) — Hardware communication specifications, SDI-12 protocol, BLE 20-byte binary frame format, and cloud ingestion API.

---

## 8. License

Distributed under the MIT License. Copyright © 2026 [Your Company / Organization Name]. All rights reserved.
