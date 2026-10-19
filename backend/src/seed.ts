import bcrypt from 'bcryptjs';
import prisma from './prisma';
import { initDatabase } from './db';

export async function seedDatabase() {
  console.log('Seeding PostgreSQL Database via Prisma ORM...');
  await initDatabase();

  // 1. Create Default Users
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash('AgriPass2026!', salt);

  const adminId = 'usr-admin-01';
  const farmerId = 'usr-farmer-01';

  await prisma.user.upsert({
    where: { id: adminId },
    update: {
      email: 'admin@example.com',
      passwordHash,
      fullName: 'Dr. [Lead Agronomist]',
      role: 'PLATFORM_ADMIN',
      organizationName: '[Your Agricultural Organization]',
    },
    create: {
      id: adminId,
      email: 'admin@example.com',
      passwordHash,
      fullName: 'Dr. [Lead Agronomist]',
      role: 'PLATFORM_ADMIN',
      organizationName: '[Your Agricultural Organization]',
    },
  });

  await prisma.user.upsert({
    where: { id: farmerId },
    update: {
      email: 'farmer@example.com',
      passwordHash,
      fullName: '[Farm Manager]',
      role: 'FARM_MANAGER',
      organizationName: '[Your Farm Organization]',
    },
    create: {
      id: farmerId,
      email: 'farmer@example.com',
      passwordHash,
      fullName: '[Farm Manager]',
      role: 'FARM_MANAGER',
      organizationName: '[Your Farm Organization]',
    },
  });

  // 2. Create Farms
  const farm1Id = 'farm-alpha-01';
  const farm2Id = 'farm-beta-02';

  await prisma.farm.upsert({
    where: { id: farm1Id },
    update: {
      name: '[Primary Agricultural Facility]',
      location: '[Region Alpha, Agricultural Belt]',
      latitude: 36.6777,
      longitude: -121.6555,
      timezone: 'America/Los_Angeles',
      totalAreaHa: 140.0,
      description: 'Commercial specialty row crops and high-efficiency irrigated corn/soy production.',
    },
    create: {
      id: farm1Id,
      userId: farmerId,
      name: '[Primary Agricultural Facility]',
      location: '[Region Alpha, Agricultural Belt]',
      latitude: 36.6777,
      longitude: -121.6555,
      timezone: 'America/Los_Angeles',
      totalAreaHa: 140.0,
      description: 'Commercial specialty row crops and high-efficiency irrigated corn/soy production.',
    },
  });

  await prisma.farm.upsert({
    where: { id: farm2Id },
    update: {
      name: '[Highland Orchard & Vineyard Plot]',
      location: '[Region Beta, Fruit & Wine Belt]',
      latitude: 46.6021,
      longitude: -120.5059,
      timezone: 'America/Los_Angeles',
      totalAreaHa: 85.0,
      description: 'Precision vineyard and high-density apple orchards using subsurface micro-drip irrigation.',
    },
    create: {
      id: farm2Id,
      userId: farmerId,
      name: '[Highland Orchard & Vineyard Plot]',
      location: '[Region Beta, Fruit & Wine Belt]',
      latitude: 46.6021,
      longitude: -120.5059,
      timezone: 'America/Los_Angeles',
      totalAreaHa: 85.0,
      description: 'Precision vineyard and high-density apple orchards using subsurface micro-drip irrigation.',
    },
  });

  // 3. Create Fields & Alert Rules
  const fields = [
    {
      id: 'fld-corn-alpha',
      farmId: farm1Id,
      name: 'North Pivot Alpha',
      cropType: 'Field Corn (Pioneer 1197)',
      plantingDate: '2026-04-12',
      soilType: 'Silt Loam',
      minVwc: 22.0,
      maxVwc: 38.0,
      areaHa: 45.0,
      rootDepth: 50,
    },
    {
      id: 'fld-soy-beta',
      farmId: farm1Id,
      name: 'South Drip Beta',
      cropType: 'Soybeans (Asgrow 24XF1)',
      plantingDate: '2026-05-01',
      soilType: 'Sandy Loam',
      minVwc: 18.0,
      maxVwc: 32.0,
      areaHa: 30.0,
      rootDepth: 40,
    },
    {
      id: 'fld-merlot-block4',
      farmId: farm2Id,
      name: 'Block 4 Merlot',
      cropType: 'Wine Grapes (Merlot VCR101)',
      plantingDate: '2021-03-15',
      soilType: 'Gravelly Loam',
      minVwc: 14.0,
      maxVwc: 26.0,
      areaHa: 18.0,
      rootDepth: 60,
    },
    {
      id: 'fld-alfalfa-gamma',
      farmId: farm1Id,
      name: 'East Plot Gamma',
      cropType: 'Alfalfa (Hay Production)',
      plantingDate: '2025-08-20',
      soilType: 'Clay Loam',
      minVwc: 24.0,
      maxVwc: 42.0,
      areaHa: 25.0,
      rootDepth: 45,
    },
  ];

  for (const f of fields) {
    await prisma.field.upsert({
      where: { id: f.id },
      update: {
        farmId: f.farmId,
        name: f.name,
        cropType: f.cropType,
        plantingDate: f.plantingDate,
        soilType: f.soilType,
        targetMinMoisture: f.minVwc,
        targetMaxMoisture: f.maxVwc,
        areaHa: f.areaHa,
        rootDepthCm: f.rootDepth,
      },
      create: {
        id: f.id,
        farmId: f.farmId,
        name: f.name,
        cropType: f.cropType,
        plantingDate: f.plantingDate,
        soilType: f.soilType,
        targetMinMoisture: f.minVwc,
        targetMaxMoisture: f.maxVwc,
        areaHa: f.areaHa,
        rootDepthCm: f.rootDepth,
      },
    });

    await prisma.alertRule.upsert({
      where: { id: `rule-min-${f.id}` },
      update: {
        fieldId: f.id,
        ruleName: `Moisture Deficit (${f.name})`,
        metric: 'VWC',
        operator: '<',
        threshold: f.minVwc,
        severity: 'WARNING',
      },
      create: {
        id: `rule-min-${f.id}`,
        fieldId: f.id,
        ruleName: `Moisture Deficit (${f.name})`,
        metric: 'VWC',
        operator: '<',
        threshold: f.minVwc,
        severity: 'WARNING',
      },
    });

    await prisma.alertRule.upsert({
      where: { id: `rule-max-${f.id}` },
      update: {
        fieldId: f.id,
        ruleName: `Saturation Runoff Warning (${f.name})`,
        metric: 'VWC',
        operator: '>',
        threshold: f.maxVwc,
        severity: 'INFO',
      },
      create: {
        id: `rule-max-${f.id}`,
        fieldId: f.id,
        ruleName: `Saturation Runoff Warning (${f.name})`,
        metric: 'VWC',
        operator: '>',
        threshold: f.maxVwc,
        severity: 'INFO',
      },
    });
  }

  // 4. Create Devices
  const devices = [
    {
      id: 'dev-probe-01',
      farmId: farm1Id,
      fieldId: 'fld-corn-alpha',
      uid: 'TS-PROBE-88219',
      name: 'Probe Alpha Center',
      model: 'Probe-X5',
      hardwareType: 'SDI-12 5-Horizon Multi-Depth',
      firmware: 'v2.4.1',
      battery: 94,
      signal: -64,
    },
    {
      id: 'dev-probe-02',
      farmId: farm1Id,
      fieldId: 'fld-soy-beta',
      uid: 'TS-PROBE-77104',
      name: 'Probe Beta South Edge',
      model: 'Probe-X5',
      hardwareType: 'SDI-12 5-Horizon Multi-Depth',
      firmware: 'v2.4.1',
      battery: 88,
      signal: -72,
    },
    {
      id: 'dev-probe-03',
      farmId: farm2Id,
      fieldId: 'fld-merlot-block4',
      uid: 'TS-PROBE-99341',
      name: 'Vineyard Probe Block 4',
      model: 'Probe-X5',
      hardwareType: 'SDI-12 5-Horizon Multi-Depth',
      firmware: 'v2.4.0',
      battery: 96,
      signal: -59,
    },
    {
      id: 'dev-gw-01',
      farmId: farm1Id,
      fieldId: null,
      uid: 'TS-GATEWAY-102',
      name: '[Field Gateway - Sector Alpha]',
      model: 'Hub-Cellular',
      hardwareType: '4G LTE / BLE Field Gateway',
      firmware: 'v3.1.0',
      battery: 100,
      signal: -52,
    },
  ];

  for (const d of devices) {
    await prisma.device.upsert({
      where: { id: d.id },
      update: {
        farmId: d.farmId,
        fieldId: d.fieldId,
        deviceUid: d.uid,
        name: d.name,
        model: d.model,
        hardwareType: d.hardwareType,
        firmwareVersion: d.firmware,
        batteryLevel: d.battery,
        signalQuality: d.signal,
        status: 'ONLINE',
        lastSeenAt: new Date(Date.now() - 5 * 60 * 1000),
      },
      create: {
        id: d.id,
        farmId: d.farmId,
        fieldId: d.fieldId,
        deviceUid: d.uid,
        name: d.name,
        model: d.model,
        hardwareType: d.hardwareType,
        firmwareVersion: d.firmware,
        batteryLevel: d.battery,
        signalQuality: d.signal,
        status: 'ONLINE',
        lastSeenAt: new Date(Date.now() - 5 * 60 * 1000),
      },
    });

    await prisma.maintenanceRecord.upsert({
      where: { id: `maint-${d.id}` },
      update: {
        deviceId: d.id,
        type: 'CALIBRATION',
        description: 'Factory 5-depth soil calibration verification and dielectric calibration test.',
        performedBy: '[Field Technician]',
        performedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
      create: {
        id: `maint-${d.id}`,
        deviceId: d.id,
        type: 'CALIBRATION',
        description: 'Factory 5-depth soil calibration verification and dielectric calibration test.',
        performedBy: '[Field Technician]',
        performedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
    });
  }

  // 5. Generate 7 Days of Multi-Depth Sensor Readings
  console.log('Generating realistic 7-day soil moisture time-series...');
  const depths = [10, 20, 30, 40, 50];
  const now = Date.now();
  const twoHours = 2 * 60 * 60 * 1000;
  const totalSteps = 84; // 7 days * 12 points/day
  const readingsToInsert: any[] = [];

  for (const dev of devices.filter((d) => d.hardwareType.includes('Multi-Depth'))) {
    for (let step = totalSteps; step >= 0; step--) {
      const timestamp = new Date(now - step * twoHours);
      const hourOfDay = timestamp.getUTCHours();
      const diurnalDrop = hourOfDay >= 12 && hourOfDay <= 20 ? 0.8 : 0.1;
      const isPostIrrigation = step <= 24;

      for (const depth of depths) {
        let baseVwc = 28.0;
        let baseTemp = 20.0;
        let baseEc = 1.15;

        if (dev.fieldId === 'fld-corn-alpha') {
          baseVwc = 32.0 - (depth / 50) * 4.0;
          if (isPostIrrigation) baseVwc += 4.5 * (1 - depth / 70);
        } else if (dev.fieldId === 'fld-soy-beta') {
          baseVwc = 19.5 - step * 0.04;
          if (depth === 10) baseVwc -= 2.5;
        } else if (dev.fieldId === 'fld-merlot-block4') {
          baseVwc = 17.5 + (depth / 50) * 3.5;
        }

        const tempVariation = 25 - depth * 0.15 + (hourOfDay >= 12 && hourOfDay <= 18 ? 3.5 : -2.0) * (1 - depth / 60);
        const finalVwc = Math.max(8.0, Math.min(48.0, parseFloat((baseVwc - diurnalDrop + (Math.random() * 0.4 - 0.2)).toFixed(1))));
        const finalTemp = parseFloat(tempVariation.toFixed(1));
        const finalEc = parseFloat((baseEc + depth * 0.008 + (Math.random() * 0.05)).toFixed(2));

        const readingId = `rdg-${dev.uid}-${depth}-${step}`;
        readingsToInsert.push({
          id: readingId,
          deviceId: dev.id,
          fieldId: dev.fieldId,
          depthCm: depth,
          vwcPercent: finalVwc,
          tempC: finalTemp,
          ecDsM: finalEc,
          qualityScore: 0.99,
          source: 'SIMULATED',
          isDemo: 1,
          measuredAt: timestamp,
        });
      }
    }
  }

  // Insert readings in chunks of 500
  const chunkSize = 500;
  for (let i = 0; i < readingsToInsert.length; i += chunkSize) {
    const chunk = readingsToInsert.slice(i, i + chunkSize);
    await prisma.sensorReading.createMany({
      data: chunk,
      skipDuplicates: true,
    });
  }
  console.log(`Inserted ${readingsToInsert.length} multi-depth sensor readings.`);

  // 6. Create Realistic Alerts
  await prisma.alert.upsert({
    where: { id: 'alt-active-01' },
    update: {
      fieldId: 'fld-soy-beta',
      deviceId: 'dev-probe-02',
      title: 'Moisture Deficit (South Drip Beta)',
      message: 'Soil moisture at 10cm depth measured 16.8% VWC, falling below target minimum threshold of 18.0%. Irrigation recommended within 24 hours.',
      severity: 'WARNING',
      status: 'ACTIVE',
      triggeredAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    },
    create: {
      id: 'alt-active-01',
      fieldId: 'fld-soy-beta',
      deviceId: 'dev-probe-02',
      title: 'Moisture Deficit (South Drip Beta)',
      message: 'Soil moisture at 10cm depth measured 16.8% VWC, falling below target minimum threshold of 18.0%. Irrigation recommended within 24 hours.',
      severity: 'WARNING',
      status: 'ACTIVE',
      triggeredAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    },
  });

  await prisma.alert.upsert({
    where: { id: 'alt-resolved-02' },
    update: {
      fieldId: 'fld-corn-alpha',
      deviceId: 'dev-probe-01',
      title: 'Saturation Runoff Warning (North Pivot Alpha)',
      message: 'Surface moisture reached 39.2% VWC following cycle. Soil has infiltrated safely back to field capacity (34.1%).',
      severity: 'INFO',
      status: 'RESOLVED',
      triggeredAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
      resolvedAt: new Date(Date.now() - 36 * 60 * 60 * 1000),
    },
    create: {
      id: 'alt-resolved-02',
      fieldId: 'fld-corn-alpha',
      deviceId: 'dev-probe-01',
      title: 'Saturation Runoff Warning (North Pivot Alpha)',
      message: 'Surface moisture reached 39.2% VWC following cycle. Soil has infiltrated safely back to field capacity (34.1%).',
      severity: 'INFO',
      status: 'RESOLVED',
      triggeredAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
      resolvedAt: new Date(Date.now() - 36 * 60 * 60 * 1000),
    },
  });

  // 7. Create Irrigation Events
  await prisma.irrigationEvent.upsert({
    where: { id: 'irrig-01' },
    update: {
      fieldId: 'fld-corn-alpha',
      scheduledAt: new Date(Date.now() - 44 * 60 * 60 * 1000),
      durationMinutes: 180,
      waterAppliedMm: 22.5,
      method: 'Center Pivot Low-Drift',
      notes: 'Scheduled maintenance cycle; uniform infiltration confirmed across 10-30cm root horizons.',
    },
    create: {
      id: 'irrig-01',
      fieldId: 'fld-corn-alpha',
      scheduledAt: new Date(Date.now() - 44 * 60 * 60 * 1000),
      durationMinutes: 180,
      waterAppliedMm: 22.5,
      method: 'Center Pivot Low-Drift',
      notes: 'Scheduled maintenance cycle; uniform infiltration confirmed across 10-30cm root horizons.',
    },
  });

  await prisma.irrigationEvent.upsert({
    where: { id: 'irrig-02' },
    update: {
      fieldId: 'fld-soy-beta',
      scheduledAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      durationMinutes: 120,
      waterAppliedMm: 14.0,
      method: 'Surface Drip Emitters',
      notes: 'Pre-flowering vegetative hydration pass.',
    },
    create: {
      id: 'irrig-02',
      fieldId: 'fld-soy-beta',
      scheduledAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      durationMinutes: 120,
      waterAppliedMm: 14.0,
      method: 'Surface Drip Emitters',
      notes: 'Pre-flowering vegetative hydration pass.',
    },
  });

  // 8. Create Hardware Store Products
  const products = [
    {
      id: 'prod-01',
      slug: 'probe-x5',
      name: '[Platform Name] Probe X5 Multi-Depth',
      category: 'Sensors',
      price: 480.0,
      description: 'Rugged 5-depth digital soil capacitance probe measuring Volumetric Water Content (VWC), Temperature, and Bulk Electrical Conductivity (EC) at 10, 20, 30, 40, and 50 cm depths simultaneously.',
      specs: {
        interface: 'SDI-12 v1.4 / RS-485 Modbus RTU',
        depths: '10, 20, 30, 40, 50 cm',
        moistureRange: '0 to 100% VWC (±1.5% accuracy)',
        tempRange: '-40°C to +60°C (±0.5°C)',
        ecRange: '0 to 20 dS/m (±5%)',
        enclosure: 'IP68 Hermetically Sealed Polycarbonate',
        cableLength: '5 meters UV-resistant polyurethane',
      },
      image: '/images/hardware/probe-x5.png',
      stockQty: 42,
    },
    {
      id: 'prod-02',
      slug: 'probe-x3',
      name: '[Platform Name] Probe X3 Compact',
      category: 'Sensors',
      price: 320.0,
      description: 'Compact 3-depth digital capacitance sensor optimized for shallow root crops, berries, vineyards, and greenhouse nursery benches.',
      specs: {
        interface: 'SDI-12 / Analog 0-3.3V',
        depths: '10, 20, 30 cm',
        moistureRange: '0 to 100% VWC',
        tempRange: '-20°C to +50°C',
        enclosure: 'IP68 Weatherproof',
        cableLength: '3 meters',
      },
      image: '/images/hardware/probe-x3.png',
      stockQty: 65,
    },
    {
      id: 'prod-03',
      slug: 'solar-field-gateway',
      name: '[Platform Name] Solar Field Gateway',
      category: 'Gateways',
      price: 550.0,
      description: 'Autonomous solar-powered cellular field hub equipped with LTE-M / NB-IoT connectivity, integrated GPS, Bluetooth Low Energy 5.2, and internal battery buffer.',
      specs: {
        cellular: 'Global LTE-M / NB-IoT with 2G fallback',
        localRadio: 'BLE 5.2 Long Range & LoRa 915/868 MHz',
        power: 'Integrated 5W Solar Panel + 6400mAh LiFePO4 Battery',
        ports: '4x SDI-12 / Modbus M12 Industrial Connectors',
        operatingTemp: '-30°C to +65°C',
        ipRating: 'IP67 Weatherproof Mast Enclosure',
      },
      image: '/images/hardware/gateway.png',
      stockQty: 28,
    },
    {
      id: 'prod-04',
      slug: 'pocket-ble-reader',
      name: '[Platform Name] Pocket BLE Reader',
      category: 'Accessories',
      price: 190.0,
      description: 'Handheld Bluetooth Low Energy field tool for agronomy scouts and technicians. Directly plug into probe heads to download flash logs and stream live moisture readings to smartphone app.',
      specs: {
        connectivity: 'Bluetooth 5.2 BLE',
        batteryLife: '30 hours active continuous scanning',
        recharge: 'USB Type-C Fast Charge',
        weight: '160 grams',
      },
      image: '/images/hardware/pocket-ble.png',
      stockQty: 80,
    },
    {
      id: 'prod-05',
      slug: 'soil-installation-auger-kit',
      name: 'Precision Soil Auger & Slurry Tool Kit',
      category: 'Tools',
      price: 145.0,
      description: 'Specially engineered Dutch spiral auger matched to [Platform Name] probe shaft diameter to ensure intimate soil-sensor contact without air voids or compaction.',
      specs: {
        shaftDiameter: '42 mm tapered',
        length: '100 cm marked depth increments',
        material: 'High-Tensile Stainless Steel',
      },
      image: '/images/hardware/auger.png',
      stockQty: 35,
    },
    {
      id: 'prod-06',
      slug: 'solar-power-expansion-pack',
      name: '10W Heavy-Duty Solar Expansion Kit',
      category: 'Accessories',
      price: 120.0,
      description: 'Heavy duty high-efficiency monocrystalline solar kit with universal mast clamp for regions with dense cloud cover or prolonged winter operations.',
      specs: {
        wattage: '10W Peak',
        voltage: '12V Regulated DC output',
        mount: 'Galvanized U-bolt mast kit',
      },
      image: '/images/hardware/solar-pack.png',
      stockQty: 50,
    },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { id: p.id },
      update: {
        slug: p.slug,
        name: p.name,
        category: p.category,
        price: p.price,
        description: p.description,
        specsJson: JSON.stringify(p.specs),
        imageUrl: p.image,
        inStock: 1,
        stockQty: p.stockQty,
      },
      create: {
        id: p.id,
        slug: p.slug,
        name: p.name,
        category: p.category,
        price: p.price,
        description: p.description,
        specsJson: JSON.stringify(p.specs),
        imageUrl: p.image,
        inStock: 1,
        stockQty: p.stockQty,
      },
    });
  }

  console.log('Seeding completed successfully!');
}

if (require.main === module) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('Seeding failed:', err);
      process.exit(1);
    });
}
