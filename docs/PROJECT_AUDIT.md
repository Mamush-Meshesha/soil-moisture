# [Platform Name] Smart Agriculture & Soil Monitoring Platform
## Repository Audit & Architecture Assessment

**Date:** October 19, 2026  
**Auditor:** Senior Full-Stack Software Architect & IoT Systems Engineer  
**Workspace:** `/home/mamush/Desktop/project/master-project/soil-moisture`  
**Brand Identity:** [Platform Name] (Agricultural Intelligence Ecosystem)  

---

### 1. Executive Summary & Existing Architecture Inspection

A thorough inspection of the workspace `/home/mamush/Desktop/project/master-project/soil-moisture` and adjacent directories was performed prior to code generation:
1. **Target Repository State:** The target workspace directory is currently empty with no pre-existing legacy code, package manifests, or database migrations in this folder.
2. **Adjacent Projects Context:** Neighboring directories (`sm-system-backend` and `sm-system-frontend`) were inspected; they represent an unrelated "School Management System" using Prisma and PostgreSQL.
3. **Environment & Runtime Availability:**
   - **Node.js:** v20.20.2
   - **npm:** 10.8.2
   - **pnpm:** Installed (`/home/mamush/.local/share/pnpm/pnpm`)
   - **Python:** 3.12.3 (available for Raspberry Pi / microcontroller sensor acquisition scripts and BLE simulation)
   - **Git:** 2.43.0
4. **Hardware & Sensor Communication Baseline:**
   - Physical hardware (Raspberry Pi, RS485/Modbus or SDI-12 soil probes) is currently not directly connected to the local development environment.
   - Per requirements, we define clean integration boundaries, realistic packet protocols, and an isolated simulated IoT / BLE telemetry ingestion pipeline that guarantees no synthetic data is masqueraded as physical hardware measurements.

---

### 2. Implemented Features (Current Baseline)

- Workspace directory initialized.
- System toolchain verified (Node 20, Python 3.12, Git).
- No pre-existing legacy agricultural code to preserve; this is a clean-slate greenfield implementation of the production-ready [Platform Name] platform adhering strictly to the CropX-inspired functional architecture.

---

### 3. Gap Analysis: Required Capabilities to Build

| Area | Status | Requirement |
|------|--------|-------------|
| **Brand & Design System** | Missing | [Platform Name] design tokens (`#176B45`, `#123B2B`, `#74B875`, `#F7F8F4`, etc.), responsive layout, Inter typography, accessible components, light/dark theme. |
| **Public Marketing Website** | Missing | Complete public site: `/` (Home), `/platform`, `/technology`, `/products`, `/products/:slug`, `/store`, `/solutions`, `/about`, `/resources`, `/contact`, `/demo`, legal pages. |
| **Hardware Catalog & Store** | Missing | Hardware catalog (moisture probes, telemetry gateways, accessories), shopping cart, checkout sandbox, order tracking. |
| **Authenticated Dashboard (`/app`)** | Missing | Multi-tenant farm & field management, device registry, live soil monitoring, time-series charts (moisture, temp, EC, multi-depth), wetting/drying curves. |
| **IoT & Sensor Pipeline** | Missing | Sensor data ingestion API, idempotency, duplicate detection, SDI-12 / Modbus payload parsing, quality scoring, calibration offsets. |
| **Alerts & Irrigation Engine** | Missing | Dynamic moisture thresholds (saturation, field capacity, stress point, wilting point), state transitions, notification center, irrigation event logging, ET0 estimation. |
| **Mobile & BLE Workflow** | Missing | BLE discovery, GATT service/characteristic spec, offline buffer sync, pairing wizard, test packet sender. |
| **IoT Edge Agent** | Missing | Python-based Raspberry Pi agent supporting SDI-12/Modbus emulation and Bluetooth/HTTP sync. |
| **Reporting & Export** | Missing | CSV telemetry export, structured PDF/HTML farm summary reports, audit logging. |
| **Testing & CI/CD** | Missing | Unit tests, API integration tests, E2E browser tests, Dockerfile, docker-compose. |

---

### 4. Target Architecture & Data Flow

```mermaid
graph TD
    A[Soil Sensors: SDI-12 / Modbus / Capacitive] -->|UART / RS485 / ADC| B[Raspberry Pi / Microcontroller Node]
    B -->|BLE GATT Services| C[Mobile App: Sync & Pairing]
    B -->|Direct Cellular / WiFi HTTPS| D[Cloud Ingestion API]
    C -->|Batch Sync HTTPS| D
    D --> E[Relational Time-Series Store & Validation]
    E --> F[Threshold & Alert Rules Engine]
    E --> G[Analytics & Irrigation Advisor]
    F --> H[Notification Center & In-App Alerts]
    G --> I[[Platform Name] Web Dashboard /app]
    E --> I
    J[Public Visitors / Farmers] --> K[Marketing Site & Store]
```

---

### 5. Sensor Protocol & Mobile Communication Details

- **Probe Types:** Multi-depth capacitance & TDR/FDR soil moisture probes (e.g., 10cm, 20cm, 30cm, 40cm, 50cm depths) measuring Volumetric Water Content (VWC % 0-100), Soil Temperature (°C -40 to +60), and Bulk Electrical Conductivity (EC 0-20 dS/m).
- **Communication Protocol:**
  - **Edge to Mobile:** Bluetooth Low Energy (BLE) custom GATT Profile:
    - Service UUID: `181A` (Environmental Sensing) / Custom `6E400001-B5A3-F393-E0A9-E50E24DCCA9E`
    - Read/Notify Characteristics for Real-Time Telemetry and Batch Flash Memory Sync.
  - **Mobile / Edge to Cloud API:** REST JSON payload with:
    - `deviceId`, `syncId`, `timestamp`, `readings`: `[ { depthCm, vwcPercent, tempC, ecDsM, rawAdc, batteryMv, signalDbm, qualityScore } ]`
    - Ingestion header: `X-Idempotency-Key` preventing duplicate telemetry ingestion during offline retry synchronization.

---

### 6. Security and Reliability Safeguards

1. **Authentication & RBAC:** JWT-based stateless auth + secure bcrypt password hashing. Roles: `OWNER`, `FARM_MANAGER`, `FIELD_OPERATOR`, `AGRONOMIST`, `VIEWER`, `PLATFORM_ADMIN`.
2. **Tenant & Farm Isolation:** Organization-scoped queries ensuring farmers cannot view or alter peers' telemetry.
3. **Measurement Integrity:** Strict distinction between raw measured sensor data (`source: "SENSOR"`), calculated metrics (`source: "CALCULATED"`), and simulated demo data (`isDemo: true`).
4. **Idempotent Ingestion:** Primary composite unique constraints on `(deviceId, sensorDepth, measuredAt)` and ingestion cache.
5. **Fail-Safe Irrigation Logic:** Advisory only. Never claims definitive crop water requirements without necessary input parameters.

---

### 7. Recommended Implementation Sequence

1. **Phase 1: Project Setup & Unified Monorepo Structure**
   - Initialize Git repository.
   - Set up root structure with `frontend/`, `backend/`, and `iot/`.
   - Implement the complete custom CSS Design System with exact requested color tokens and typography.
2. **Phase 2: Backend Architecture & Database**
   - Express + TypeScript backend with SQLite (`sqlite3` / relational schema).
   - JWT Auth, Farm/Field CRUD, Device Registry, Telemetry Ingestion API, Alert Engine, Irrigation Manager, Hardware Catalog & Store API.
   - Seed script with realistic farm demo data clearly labeled as simulated.
3. **Phase 3: Public Marketing Website & Store**
   - Clean, modern, high-conversion agricultural marketing site inspired by CropX:
     - Home (`/`), Platform (`/platform`), Technology (`/technology`), Solutions (`/solutions`), About (`/about`), Resources (`/resources`), Contact (`/contact`), Demo (`/demo`), Store (`/store`), Product Details (`/products/:slug`), Checkout (`/checkout`).
4. **Phase 4: Authenticated Customer Dashboard (`/app`)**
   - Overview metrics, Farm/Field hierarchy, Device Registry, Real-time Soil Monitoring with depth charts, Wetting/Drying trend analytics, Alert Center, Irrigation Management, CSV/Report generator, Settings & Team permissions.
5. **Phase 5: Mobile BLE Sync Workflow & IoT Edge Agent**
   - Interactive Bluetooth sync wizard in web app (pairing, flash memory sync, offline buffering simulation).
   - Standalone Python Raspberry Pi IoT Agent (`iot/raspberry_pi_agent.py`) capable of generating SDI-12 / Modbus payloads and syncing via HTTP or BLE.
6. **Phase 6: Automated Testing, Browser Verification, and Documentation**
   - Backend unit and integration tests (Jest / Vitest).
   - Frontend component/route tests.
   - Browser subagent validation on marketing pages, store, and dashboard.
   - Comprehensive `README.md`, `docs/DEVICE_INTEGRATION.md`, and deployment configs.
