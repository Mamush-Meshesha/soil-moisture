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
      fullName: 'Dr. Sarah Kibet',
      role: 'PLATFORM_ADMIN',
      organizationName: 'AquaScope Water Safety & Quality Portal',
    },
    create: {
      id: adminId,
      email: 'admin@example.com',
      passwordHash,
      fullName: 'Dr. Sarah Kibet',
      role: 'PLATFORM_ADMIN',
      organizationName: 'AquaScope Water Safety & Quality Portal',
    },
  });

  await prisma.user.upsert({
    where: { id: farmerId },
    update: {
      email: 'farmer@example.com',
      passwordHash,
      fullName: '[WASH Program Director]',
      role: 'FARM_MANAGER',
      organizationName: 'AquaScope Water Safety & Quality Portal',
    },
    create: {
      id: farmerId,
      email: 'farmer@example.com',
      passwordHash,
      fullName: '[WASH Program Director]',
      role: 'FARM_MANAGER',
      organizationName: 'AquaScope Water Safety & Quality Portal',
    },
  });

  // 2. Create Farms
  const farm1Id = 'farm-alpha-01';
  const farm2Id = 'farm-beta-02';

  await prisma.farm.upsert({
    where: { id: farm1Id },
    update: {
      name: 'Rift Valley Water & Sanitation District',
      location: 'Nakuru County, East Africa',
      latitude: 0.3031,
      longitude: 36.0800,
      timezone: 'Africa/Nairobi',
      totalAreaHa: 140.0,
      description: 'Regional municipal and rural distribution network serving 45,000 residents across deep boreholes and protected spring schemes.',
    },
    create: {
      id: farm1Id,
      userId: farmerId,
      name: 'Rift Valley Water & Sanitation District',
      location: 'Nakuru County, East Africa',
      latitude: 0.3031,
      longitude: 36.0800,
      timezone: 'Africa/Nairobi',
      totalAreaHa: 140.0,
      description: 'Regional municipal and rural distribution network serving 45,000 residents across deep boreholes and protected spring schemes.',
    },
  });

  await prisma.farm.upsert({
    where: { id: farm2Id },
    update: {
      name: 'Lake Victoria Basin WASH Initiative',
      location: 'Kisumu & Siaya Counties',
      latitude: -0.0917,
      longitude: 34.7680,
      timezone: 'Africa/Nairobi',
      totalAreaHa: 85.0,
      description: 'Humanitarian water quality monitoring, automated chlorination surveillance, and rapid coliform detection across rural lakeshore communities.',
    },
    create: {
      id: farm2Id,
      userId: farmerId,
      name: 'Lake Victoria Basin WASH Initiative',
      location: 'Kisumu & Siaya Counties',
      latitude: -0.0917,
      longitude: 34.7680,
      timezone: 'Africa/Nairobi',
      totalAreaHa: 85.0,
      description: 'Humanitarian water quality monitoring, automated chlorination surveillance, and rapid coliform detection across rural lakeshore communities.',
    },
  });

  // 3. Create Fields & Alert Rules
  const fields = [
    {
      id: 'fld-corn-alpha',
      farmId: farm1Id,
      name: 'Central Municipal Borehole #3',
      cropType: 'Deep Groundwater Aquifer',
      plantingDate: '2023-01-15',
      soilType: 'Deep Borehole (120m)',
      minVwc: 18.0,
      maxVwc: 35.0,
      areaHa: 45.0,
      rootDepth: 45,
    },
    {
      id: 'fld-soy-beta',
      farmId: farm1Id,
      name: 'Menengai Protected Spring Catchment',
      cropType: 'Protected Natural Spring',
      plantingDate: '2022-09-10',
      soilType: 'Gravity Spring Network',
      minVwc: 18.0,
      maxVwc: 32.0,
      areaHa: 30.0,
      rootDepth: 30,
    },
    {
      id: 'fld-merlot-block4',
      farmId: farm2Id,
      name: 'Dunga Lakeshore Filtration & Intake',
      cropType: 'Surface Water Intake & Filtration',
      plantingDate: '2023-11-04',
      soilType: 'Sand Filter & UV Barrier',
      minVwc: 15.0,
      maxVwc: 28.0,
      areaHa: 18.0,
      rootDepth: 50,
    },
    {
      id: 'fld-alfalfa-gamma',
      farmId: farm1Id,
      name: 'Kaptembwa Community Tapstand Array',
      cropType: 'Public Distribution Tapstand',
      plantingDate: '2023-06-20',
      soilType: 'Chlorinated Header Tank',
      minVwc: 20.0,
      maxVwc: 36.0,
      areaHa: 25.0,
      rootDepth: 25,
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
        let baseVwc = 99.4;
        if (dev.fieldId === 'fld-corn-alpha') {
          baseVwc = 99.6 - (depth % 3) * 0.2;
        } else if (dev.fieldId === 'fld-soy-beta') {
          baseVwc = 98.8 + (depth % 2) * 0.4;
        } else if (dev.fieldId === 'fld-merlot-block4') {
          baseVwc = 98.2 + (depth % 2) * 0.5;
        }

        const tempVariation = 37.0 + (Math.random() * 0.4 - 0.2);
        const finalVwc = Math.max(90.0, Math.min(100.0, parseFloat((baseVwc + (Math.random() * 0.2 - 0.1)).toFixed(1))));
        const finalTemp = parseFloat(tempVariation.toFixed(1));
        const finalEc = parseFloat((0.25 + (Math.random() * 0.05)).toFixed(2));

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
      slug: 'waterscope-portable-kit-complete',
      name: 'WaterScope Bacterial Testing Kit – Complete Field System',
      category: 'Testing Kits',
      price: 4000.0,
      description: 'Complete field-ready bacterial testing kit combining motorized vacuum filtration, dual 37°C/44°C incubator bays, optical microcolony camera, embedded IoT cloud sync, and 200 consumable test cartridges in an airtight IATA-compliant 5.8 kg case.',
      specs: {
        standard: 'ISO 9308-1 Membrane Filtration',
        target: 'Total Coliforms & E. coli directly (CFU/100mL)',
        speed: 'Relative risk level in 8 hrs; fully quantitative in 18 hrs',
        capacity: '14 simultaneous sample capacity',
        fieldSampling: '8 minutes sample prep (7 simple steps)',
        consumables: '200 tests included with the system',
        weight: '5.8 kg total kit weight (complies with IATA carriage rules)',
        connectivity: 'Embedded IoT worldwide coverage, Android App & Web Dashboard',
        training: 'Only 1 hour required (patented cartridge removes aseptic skill barriers)',
      },
      image: '/images/waterscope-hero-nile.jpg',
      stockQty: 25,
    },
    {
      id: 'prod-02',
      slug: 'patented-metal-cartridges-50',
      name: 'Patented Metal Cartridges & Consumables (Box of 50)',
      category: 'Consumables',
      price: 200.0,
      description: 'Patented easy-to-use metal cartridges containing 0.45µm membrane filter and selective culture media ($4.00 per test). Allows non-specialist water technicians to conduct microbiological testing without sterile laboratory knowledge.',
      specs: {
        technology: 'Patented aseptic metal cartridge technology',
        costPerTest: '$4.00 per test (vs $11.00 for Aquagenx CBT)',
        poreSize: '0.45 µm standardized nitrocellulose membrane',
        storage: 'Ambient shelf storage (no cold-chain refrigeration needed)',
        shelfLife: '12 months from manufacture date',
        quantity: '50 individually blister-sealed cartridges per box',
      },
      image: '/images/manufacturing-3dprint.png',
      stockQty: 320,
    },
    {
      id: 'prod-03',
      slug: 'patented-metal-cartridges-bulk-200',
      name: 'Patented Metal Cartridges Bulk Pack (Box of 200)',
      category: 'Consumables',
      price: 750.0,
      description: 'High-volume testing pack containing 200 sterile cartridges for community WASH surveillance, regional health bureaus, emergency disaster relief, and institutional water monitoring programs ($3.75 per test).',
      specs: {
        quantity: '200 individually blister-sealed cartridges',
        costPerTest: '$3.75 per test (bulk institutional discount)',
        standard: 'ISO 9308-1 compliant filtration media',
        storage: 'No refrigeration or cold-chain required',
        shelfLife: '12 months ambient storage',
      },
      image: '/images/manufacturing-cnc.png',
      stockQty: 150,
    },
    {
      id: 'prod-04',
      slug: 'digital-colony-scanner-incubator',
      name: 'WaterScope Digital Colony Scanner & Optical Incubator Unit',
      category: 'Equipment',
      price: 2800.0,
      description: 'Desktop & field digital colony counter equipped with an embedded optical microscope, machine-learning colony segmentation algorithm, and dual thermal incubation chambers (37°C and 44°C).',
      specs: {
        detection: 'Automated E. coli & Total Coliform Colony Enumeration',
        optics: 'High-resolution digital optical camera module',
        temperature: '37.0°C ± 0.3°C / 44.0°C ± 0.3°C regulated',
        screen: 'High-contrast sunlight-readable digital display',
        charging: 'USB-C Fast Charge (5V/3A) & 12V DC field input',
      },
      image: '/images/colony-scanner-incubator.jpg',
      stockQty: 40,
    },
    {
      id: 'prod-05',
      slug: 'motorized-vacuum-pump',
      name: 'Motorized Vacuum Water Sampling Pump',
      category: 'Equipment',
      price: 350.0,
      description: 'Quiet, lightweight battery-powered vacuum pump unit designed for drawing standardized 100mL water samples through the patented metal cartridge in under 3 minutes without manual hand syringes.',
      specs: {
        flowRate: '100 mL sample drawn in < 3 minutes',
        vacuumPressure: 'Standardized negative vacuum buffer',
        recharge: 'USB Type-C with internal Li-ion cell',
        material: 'Chemical-resistant PEEK and stainless steel',
        weight: '420 grams',
      },
      image: '/images/vacuum-sampling-pump.jpg',
      stockQty: 85,
    },
    {
      id: 'prod-06',
      slug: 'cellular-telemetry-hub',
      name: 'Global Telemetry & Cellular GPS Hub',
      category: 'Accessories',
      price: 450.0,
      description: 'Autonomous cellular telemetry gateway with multi-band LTE-M/NB-IoT and high-precision GPS. Automatically georeferences and uploads water quality test records directly to the WaterScope cloud mapping dashboard.',
      specs: {
        cellular: 'Global LTE-M / NB-IoT with 2G fallback in 165+ countries',
        gps: 'Multi-constellation GPS / GLONASS antenna',
        ingress: 'IP68 hermetically sealed enclosure',
        battery: 'Integrated 6400mAh LiFePO4 battery buffer',
        integration: 'Direct API connection to WaterScope Web Dashboard',
      },
      image: '/images/telemetry-gps-hub.jpg',
      stockQty: 60,
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

  // 10. Seed Water Quality Field Projects (Our Work - Authentic from PPT Slides 8, 9, 10)
  const initialProjects = [
    {
      id: 'proj-01',
      slug: 'acf-letter-of-intent',
      title: 'Formal Letter of Intent: Action Against Hunger (ACF)',
      category: 'Humanitarian WASH',
      categoryKey: 'humanitarian',
      date: '2025 – 2026',
      location: 'Ethiopia & Regional Operations',
      image: '/images/waterscope-training-field.jpg',
      summary: 'Formal Letter of Intent received for up to 30 units under consideration from Action Against Hunger(ACF), demonstrating growing institutional confidence in a locally manufactured solution.',
      objective: 'Procurement consideration of up to 30 portable WaterScope units for humanitarian emergency water quality monitoring.',
      method: 'Demonstrating system usability and field testing readiness for rapid bacterial surveillance in low-resource humanitarian contexts.',
      keyFindings: [
        'Formal Letter of Intent received for up to 30 units under consideration from Action Against Hunger(ACF).',
        'Demonstrates growing institutional confidence in a locally manufactured solution.',
        'Shifts water testing from external dependency to regional resilience.'
      ],
      partner: 'Action Against Hunger (ACF)',
      order: 1,
      translations: {
        am: {
          title: 'ይፋዊ የፍላጎት ደብዳቤ፡ Action Against Hunger (ACF)',
          category: 'ሰብአዊ WASH',
          date: '2025 – 2026',
          location: 'ኢትዮጵያ እና የቀጠናው ስራዎች',
          summary: 'ከ Action Against Hunger (ACF) እስከ 30 ለሚደርሱ ክፍሎች ይፋዊ የፍላጎት ደብዳቤ ተቀብለናል፤ ይህም በአገር ውስጥ ለተመረተ መፍትሄ እያደገ የመጣውን የተቋማት እምነት ያሳያል።',
          objective: 'ለአደጋ ጊዜ የሰብአዊ የውሃ ጥራት ክትትል እስከ 30 ለሚደርሱ ተንቀሳቃሽ የ WaterScope ኪቶች የግዢ ግምት።',
          method: 'ዝቅተኛ ሀብት ባላቸው የሰብአዊ እርዳታ ሁኔታዎች ውስጥ ለፈጣን የባክቴሪያ ክትትል የስርዓቱን የመስክ ዝግጁነት ማሳየት።',
          keyFindings: [
            'ከ Action Against Hunger (ACF) እስከ 30 ለሚደርሱ ክፍሎች ግምት ውስጥ የገባ ይፋዊ የፍላጎት ደብዳቤ ተቀብለናል።',
            'በአገር ውስጥ ለተመረተ መፍትሄ እያደገ የመጣውን የተቋማት እምነት ያሳያል።',
            'የውሃ ምርመራን ከውጭ ጥገኝነት ወደ ክልላዊ ጽናት ይለውጣል።'
          ],
          partner: 'Action Against Hunger (ACF)'
        },
        om: {
          title: 'Xalayaa Fedhii Ifaa: Action Against Hunger (ACF)',
          category: 'WASH Namoomaa',
          date: '2025 – 2026',
          location: 'Itoophiyaa fi Naannolee Dhiyoo',
          summary: 'Action Against Hunger (ACF) irraa hamma yuuniitii 30tiif Xalayaan Fedhii fudhatameera; kunis oomisha biyya keessaaf amanamummaan guddachaa dhufuu agarsiisa.',
          objective: 'To\'annoo qulqullina bishaanii yeroo balaa namoomaatiif kiitii WaterScope socho\'aa hamma 30 bitachuuf tilmaama.',
          method: 'Haalawwan qabeenyi xiqqaate keessatti qorannoo baakteeriyaa ariifataadhaaf qophii sirnichi dirree irratti qabu agarsiisuu.',
          keyFindings: [
            'Action Against Hunger (ACF) irraa hamma yuuniitii 30tiif Xalayaan Fedhii fudhatameera.',
            'Oomisha biyya keessaaf amanamummaan guddachaa dhufuu agarsiisa.',
            'Qorannoo bishaanii hirkattummaa alaarraa gara dandeettii naannootti jijjiira.'
          ],
          partner: 'Action Against Hunger (ACF)'
        }
      }
    },
    {
      id: 'proj-02',
      slug: 'ethiopia-kenya-pilots',
      title: 'Prior Pilots in Ethiopia & Kenya: East African Field Testing',
      category: 'Field Validation',
      categoryKey: 'field',
      date: '2023 – 2025',
      location: 'Ethiopia & Kenya',
      image: '/images/field-testing-kenya.jpeg',
      summary: 'Successful field testing and validation in East African contexts, demonstrating field usability in low-resource environments.',
      objective: 'Validating the open-source, field-adapted membrane filtration system in real East African field conditions.',
      method: 'Field testing cartridge-based bacterial testing and automated colony detection across remote water points.',
      keyFindings: [
        'Successful field testing and validation in East African contexts.',
        'Demonstrated field usability in low-resource environments without central laboratory access.',
        'Benchmarked against ISO 9308 standards and externally validated.',
        'Early indication in as little as 8 hours and full quantitative results in 21 hours.'
      ],
      partner: 'WaterScope & East African Water Testing Partners',
      order: 2,
      translations: {
        am: {
          title: 'ቀዳሚ ፓይለቶች በኢትዮጵያ እና ኬንያ፡ የመስክ ማረጋገጫ',
          category: 'የመስክ ማረጋገጫ',
          date: '2023 – 2025',
          location: 'ኢትዮጵያ እና ኬንያ',
          summary: 'በምስራቅ አፍሪካ ሁኔታዎች የተሳካ የመስክ ሙከራ እና ማረጋገጫ ተካሂዷል፤ ይህም ዝቅተኛ ሀብት ባላቸው አካባቢዎች የመስክ ተጠቃሚነቱን አሳይቷል።',
          objective: 'በእውነተኛ የምስራቅ አፍሪካ የመስክ ሁኔታዎች ውስጥ ክፍት፣ ለመስክ የተስማማ የሜምብሬን ማጣሪያ ስርዓትን ማረጋገጥ።',
          method: 'በሩቅ የውሃ ነጥቦች ላይ በካርትሪጅ ላይ የተመሰረተ የባክቴሪያ ምርመራ እና አውቶሜትድ የቅኝ ግዛት ቆጠራ የመስክ ሙከራ።',
          keyFindings: [
            'በምስራቅ አፍሪካ ሁኔታዎች የተሳካ የመስክ ሙከራ እና ማረጋገጫ ተካሂዷል።',
            'የላብራቶሪ መሠረተ ልማት በሌለባቸው ዝቅተኛ ሀብት አካባቢዎች የመስክ ተጠቃሚነቱ ተረጋግጧል።',
            'ከ ISO 9308 ደረጃዎች ጋር የተነጻጸረ እና በውጭ አካል የተረጋገጠ።',
            'ቀደም ያለ ምልክት በ 8 ሰዓት እና ሙሉ አሃዛዊ ውጤት በ 21 ሰዓት።'
          ],
          partner: 'WaterScope እና የምስራቅ አፍሪካ የውሃ ምርመራ አጋሮች'
        },
        om: {
          title: 'Paayileetiiwwan Itoophiyaa fi Keeniyaa: Mirkaneessa Dirree',
          category: 'Mirkaneessa Dirree',
          date: '2023 – 2025',
          location: 'Itoophiyaa fi Keeniyaa',
          summary: 'Haalawwan Afrikaa Bahaa keessatti qorannoon dirree milkaa\'ina qabu gaggeeffamee fi mirkanaa\'eera; kunis bu\'a qabeessummaa isaa agarsiiseera.',
          objective: 'Haala dirree Afrikaa Bahaa qabatamaa keessatti sirna calaltuu meembireenii banaa ta\'e mirkaneessuu.',
          method: 'Bakkeewwan bishaanii fagootti qorannoo baakteeriyaa kaartiriidhaan fi lakkoofsa kolonii ofumaan qorachuu.',
          keyFindings: [
            'Haalawwan Afrikaa Bahaa keessatti qorannoon dirree milkaa\'ina qabu gaggeeffameera.',
            'Bakka laabiraatooriin hin jirreetti bu\'a qabeessummaan isaa mirkanaa\'eera.',
            'Sadarkaa ISO 9308 wajjin kan walbira qabamee fi qaama alaan kan mirkanaa\'e.',
            'Mallattoo jalqabaa sa\'aatii 8 keessatti fi bu\'aa guutuu sa\'aatii 21 keessatti.'
          ],
          partner: 'WaterScope fi Michoota Qorannoo Bishaan Afrikaa Bahaa'
        }
      }
    },
    {
      id: 'proj-03',
      slug: 'moh-training-programs',
      title: 'Ministry of Health Engagement: Technician Training Programs',
      category: 'Technician Training',
      categoryKey: 'community',
      date: '2024 – 2026',
      location: 'Hawassa & Regional Centers, Ethiopia',
      image: '/images/training-hawassa-moh.png',
      summary: 'Active training programs for water testing technicians, building government capacity and demonstrating system usability.',
      objective: 'Building local diagnostic and technical capacity across government water testing personnel.',
      method: 'Hands-on technician training on cartridge filtration, thermal incubation, and automated digital reporting via mobile app and dashboard.',
      keyFindings: [
        'Active training programs for water testing technicians.',
        'Building government capacity and demonstrating system usability.',
        'Ensuring diagnostic capacity is built locally, sustained locally, and scaled locally.'
      ],
      partner: 'Ethiopian Ministry of Health',
      order: 3,
      translations: {
        am: {
          title: 'ከጤና ጥበቃ ሚኒስቴር ጋር ያለው ግንኙነት፡ የቴክኒሻን ስልጠና ፕሮግራሞች',
          category: 'የቴክኒሻን ስልጠና',
          date: '2024 – 2026',
          location: 'ሀዋሳ እና የክልል ማዕከላት፣ ኢትዮጵያ',
          summary: 'ለውሃ መመርመሪያ ቴክኒሻኖች ንቁ የስልጠና ፕሮግራሞች፣ የመንግስትን አቅም መገንባት እና የስርዓቱን ተጠቃሚነት ማሳየት።',
          objective: 'በመንግስት የውሃ መመርመሪያ ባለሙያዎች ዘንድ የአካባቢ ምርመራ እና ቴክኒካዊ አቅምን መገንባት።',
          method: 'በካርትሪጅ ማጣራት፣ በሙቀት ኢንኩቤሽን እና በሞባይል መተግበሪያ ዲጂታል ሪፖርት አቀራረብ ላይ ተግባራዊ የቴክኒሻን ስልጠና።',
          keyFindings: [
            'ለውሃ መመርመሪያ ቴክኒሻኖች ንቁ የስልጠና ፕሮግራሞች ተካሂደዋል።',
            'የመንግስትን አቅም መገንባት እና የስርዓቱን ተጠቃሚነት ማሳየት ተችሏል።',
            'የመመርመር አቅም በአገር ውስጥ እንዲገነባ፣ በዚያው እንዲቀጥል እና በአገር ውስጥ እንዲስፋፋ ያረጋግጣል።'
          ],
          partner: 'የኢትዮጵያ ጤና ጥበቃ ሚኒስቴር'
        },
        om: {
          title: 'Ministeera Fayyaa Wajjin Walta\'iinsa: Sagantaa Leenjii Ogeessotaa',
          category: 'Leenjii Ogeessotaa',
          date: '2024 – 2026',
          location: 'Hawaasaa fi Wiirtuulee Naannoo, Itoophiyaa',
          summary: 'Ogeessota qorannoo bishaaniitiif sagantaalee leenjii socho\'aa, dandeettii mootummaa ijaaruu fi sirnicha agarsiisuu.',
          objective: 'Ogeessota qorannoo bishaanii mootummaa biratti dandeettii qorannoo fi teeknikaa biyya keessaa ijaaruu.',
          method: 'Calaltuu kaartirii, inkiwubeetara ho\'aa fi appii moobaayilaatiin gabaasa dijitaalaa irratti leenjii qabatamaa.',
          keyFindings: [
            'Ogeessota qorannoo bishaaniitiif sagantaaleen leenjii socho\'aa gaggeeffamaniiru.',
            'Dandeettii mootummaa ijaaruu fi sirnicha agarsiisuun danda\'ameera.',
            'Dandeettiin qorannoo biyya keessatti akka ijaaramu, akka itti fufu fi akka babal\'atu mirkaneessa.'
          ],
          partner: 'Ministeera Fayyaa Itoophiyaa'
        }
      }
    },
    {
      id: 'proj-04',
      slug: 'local-manufacturing-progress',
      title: 'Early Progress: Manufacturing and Training',
      category: 'Field Validation',
      categoryKey: 'field',
      date: '2024 – 2026',
      location: 'Bahir Dar University (BiTec & Seifu BiT Maker Space)',
      image: '/images/manufacturing-3dprint.png',
      summary: 'We have begun local manufacturing using 3D printing and machining technologies. We conduct training programs for water technicians. And we are building partnerships across sectors.',
      objective: 'Building a localized diagnostic ecosystem and lowering testing equipment costs by up to 80%.',
      method: 'Utilizing 3D printing and CNC machining technologies at university maker spaces and incubation centers.',
      keyFindings: [
        'Local manufacturing significantly lowers costs by up to 80%, making water testing accessible.',
        'Began local manufacturing using 3D printing and machining technologies.',
        'Creating local manufacturing jobs empowers individuals and stimulates economic growth.',
        'Reduces dependency on fragile imported supply chains.'
      ],
      partner: 'Bahir Dar University, Centre for Global Equality, BiT Maker Space',
      order: 4,
      translations: {
        am: {
          title: 'ቀደምት እድገት፡ ማኑፋክቸሪንግ እና ስልጠና',
          category: 'የመስክ ማረጋገጫ',
          date: '2024 – 2026',
          location: 'ባህር ዳር ዩኒቨርሲቲ (BiTec እና Seifu BiT Maker Space)',
          summary: 'የ 3D ህትመት እና የማሽን ቴክኖሎጂዎችን በመጠቀም የአገር ውስጥ ማምረት ጀምረናል። ለውሃ ቴክኒሻኖች የስልጠና ፕሮግራሞችን እናካሂዳለን። እንዲሁም በተለያዩ ዘርፎች ሽርክናዎችን እየገነባን ነው።',
          objective: 'የአካባቢያዊ የመመርመሪያ ስነ-ምህዳር መገንባት እና የመመርመሪያ መሳሪያዎች ወጪን እስከ 80% መቀነስ።',
          method: 'በዩኒቨርሲቲው ሰይፉ ሜከር ስፔስ እና ኢንኩቤሽን ማዕከል የ 3D ህትመት እና ትክክለኛ የማሽን ቴክኖሎጂዎችን መጠቀም።',
          keyFindings: [
            'የአገር ውስጥ ማምረት ወጪን እስከ 80% በከፍተኛ ሁኔታ ይቀንሳል።',
            'የ 3D ህትመት እና የማሽን ቴክኖሎጂዎችን በመጠቀም የአገር ውስጥ ማምረት ተጀምሯል።',
            'የአገር ውስጥ የማኑፋክቸሪንግ ስራዎችን መፍጠር ግለሰቦችን ያበቃል እንዲሁም የኢኮኖሚ እድገትን ያነቃቃል።',
            'በቀላሉ በሚስተጓጎሉ የውጭ አቅርቦት ሰንሰለቶች ላይ ጥገኝነትን ይቀንሳል።'
          ],
          partner: 'ባህር ዳር ዩኒቨርሲቲ፣ Centre for Global Equality፣ BiT Maker Space'
        },
        om: {
          title: 'Guddina Jalqabaa: Oomisha fi Leenjii',
          category: 'Mirkaneessa Dirree',
          date: '2024 – 2026',
          location: 'Yuunivarsiitii Baahir Daar (BiTec fi Seifu BiT Maker Space)',
          summary: 'Teeknooloojii Maxxansa 3D fi maashinoota fayyadamuun oomisha biyya keessaa jalqabneerra. Ogeessota bishaaniif sagantaalee leenjii ni gaggeessina. Akkasumas dameewwan hedduu keessatti michummaa ijaaraa jirra.',
          objective: 'Ikkoosistamii qorannoo naannoo ijaaruu fi gatii meeshaalee qorannoo hamma 80% hir\'isuu.',
          method: 'Wiirtuu kalaqaa Seifu Maker Space fi BiTec keessatti Maxxansa 3D fi maashinoota sirrii fayyadamuu.',
          keyFindings: [
            'Biyya keessatti oomishuun gatii hamma 80% hir\'isa.',
            'Teeknooloojii Maxxansa 3D fi maashinaatiin oomishni biyya keessaa jalqabameera.',
            'Hojiiwwan oomishaa biyya keessatti uumuun namoota humneessa akkasumas guddina diinagdee dammaqsa.',
            'Sarara dhiyeessii alaa miidhamuu danda\'u irratti hirkattummaa hir\'isa.'
          ],
          partner: 'Yuunivarsiitii Baahir Daar, Centre for Global Equality, BiT Maker Space'
        }
      }
    },
    {
      id: 'proj-05',
      slug: 'caacc-collaboration',
      title: 'Canada-Africa Academic Collaboration: Transforming Water Quality',
      category: 'Academic Collaboration',
      categoryKey: 'research',
      date: 'February 26-27, 2026',
      location: 'Canada-Africa Academic Collaborations Conference (CAACC)',
      image: '/images/waterscope-hero-nile.jpg',
      summary: 'Presented by Yohannes Tamiru: Invitation for academic collaboration in research, scale, and deployment. Enabling work in environmental microbiology, antimicrobial resistance, and AI pathogen detection.',
      objective: 'Inviting Canada–Africa academic collaboration — joint grants, co-supervision of students, pilot programs, and regional deployment strategies.',
      method: 'Collaborative platform enabling work in environmental microbiology, antimicrobial resistance surveillance, AI-driven pathogen detection, and implementation science.',
      keyFindings: [
        'Partner on pilot programs, regional rollouts, and integration with existing water quality monitoring systems.',
        'Collaboration with organizations in African nations actively engaged in water testing initiatives.',
        'Water surveillance should be equitable, collaborative, and locally empowered.'
      ],
      partner: 'Canada-Africa Academic Collaborations Conference (CAACC), Bahir Dar University',
      order: 5,
      translations: {
        am: {
          title: 'የካናዳ-አፍሪካ አካዳሚክ ትብብር፡ የውሃ ጥራትን መለወጥ',
          category: 'የአካዳሚክ ትብብር',
          date: 'የካቲት 26-27፣ 2026',
          location: 'የካናዳ-አፍሪካ የትምህርት ትብብር ጉባኤ (CAACC)',
          summary: 'በዮሐንስ ታምሩ የቀረበ፡ በምርምር፣ በማስፋፋት እና በተግባራዊ ስራዎች ላይ ለአካዳሚክ ትብብር የቀረበ ግብዣ። በአካባቢ ማይክሮባዮሎጂ፣ በ AMR እና በ AI በሽታ አምጪ ተህዋስያን መለየት ላይ የሚሰሩ ስራዎችን ያስችላል።',
          objective: 'የካናዳ-አፍሪካ አካዳሚክ ትብብርን መጋበዝ — የጋራ እርዳታዎች፣ የተማሪዎች የጋራ ቁጥጥር፣ የፓይለት ፕሮግራሞች እና የክልላዊ ማስፋፊያ ስልቶች።',
          method: 'በአካባቢ ማይክሮባዮሎጂ፣ በፀረ-ተህዋሲያን መቋቋም (AMR) ክትትል፣ በ AI በሽታ አምጪ ተህዋስያን መለየት እና በተግባራዊ ሳይንስ ላይ ስራዎችን የሚያስችል የትብብር መድረክ።',
          keyFindings: [
            'በፓይለት ፕሮግራሞች፣ በክልላዊ ስርጭት እና ከነባር የውሃ ጥራት ክትትል ስርዓቶች ጋር በማቀናጀት ላይ አብሮ መስራት።',
            'በውሃ ምርመራ ስራዎች ላይ በንቃት ከተሰማሩ የአፍሪካ አገራት ድርጅቶች ጋር መተባበር።',
            'የውሃ ክትትል ፍትሃዊ፣ የትብብር እና በአገር ውስጥ የዳበረ መሆን አለበት።'
          ],
          partner: 'የካናዳ-አፍሪካ የትምህርት ትብብር ጉባኤ (CAACC)፣ ባህር ዳር ዩኒቨርሲቲ'
        },
        om: {
          title: 'Walta\'iinsa Barnootaa Kaanaadaa-Afrikaa: Qulqullina Bishaanii Jijjiiruu',
          category: 'Walta\'iinsa Barnootaa',
          date: 'Guraandhala 26-27, 2026',
          location: 'Konfaransii Walta\'iinsa Barnootaa Kaanaadaa-Afrikaa (CAACC)',
          summary: 'Yohaannis Taamiruutiin kan dhiyaate: Qorannoo, babal\'isuu fi hojiirra oolchuu irratti afeerraa walta\'iinsa barnootaa. Maayikiroobaayoloojii naannoo, AMR fi beekumsa baakteeriyaa AI keessatti.',
          objective: 'Walta\'iinsa barnootaa Kaanaadaa–Afrikaa afeeruu — deeggarsa waloo, hordoffii barattootaa waloo, sagantaalee paayileetii fi tarsiimoo babal\'isuu naannoo.',
          method: 'Maayikiroobaayoloojii naannoo, to\'annoo dandamanna qorichaa (AMR), beekumsa baakteeriyaa AI fi saayinsii hojiirra oolmaa keessatti waltajjii walta\'iinsaa.',
          keyFindings: [
            'Sagantaalee paayileetii, tamsaasa naannoo fi sirna to\'annoo jiran wajjin qindeessuu irratti michoomuu.',
            'Dhaabbilee biyyoota Afrikaa keessatti qorannoo bishaanii irratti socho\'an wajjin walta\'uu.',
            'To\'annoon bishaanii haqa qabeessa, gamtaa fi naannootti humneeffame ta\'uu qaba.'
          ],
          partner: 'Konfaransii Walta\'iinsa Barnootaa Kaanaadaa-Afrikaa (CAACC), Yuunivarsiitii Baahir Daar'
        }
      }
    }
  ];

  for (const pr of initialProjects) {
    await prisma.project.upsert({
      where: { id: pr.id },
      update: {
        slug: pr.slug,
        title: pr.title,
        category: pr.category,
        categoryKey: pr.categoryKey,
        date: pr.date,
        location: pr.location,
        image: pr.image,
        summary: pr.summary,
        objective: pr.objective,
        method: pr.method,
        keyFindingsJson: JSON.stringify(pr.keyFindings),
        partner: pr.partner,
        translationsJson: JSON.stringify(pr.translations),
        order: pr.order,
      },
      create: {
        id: pr.id,
        slug: pr.slug,
        title: pr.title,
        category: pr.category,
        categoryKey: pr.categoryKey,
        date: pr.date,
        location: pr.location,
        image: pr.image,
        summary: pr.summary,
        objective: pr.objective,
        method: pr.method,
        keyFindingsJson: JSON.stringify(pr.keyFindings),
        partner: pr.partner,
        translationsJson: JSON.stringify(pr.translations),
        order: pr.order,
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
