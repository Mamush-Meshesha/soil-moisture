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
        let baseVwc = 28.0;
        let baseTemp = 20.0;
        let baseEc = 1.15;

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
      slug: 'portable-kit-complete',
      name: 'AquaScope Portable Kit – Complete Field System',
      category: 'Testing Kits',
      price: 680.0,
      description: 'Complete field-ready bacterial testing kit combining motorized vacuum filtration, dual 37°C/44°C incubator bays, optical microcolony camera, 48-hour rechargeable battery pack, and 25 consumable sliders in an airtight IP67 case.',
      specs: {
        method: 'ISO 9308-1 Membrane Filtration',
        target: 'Total Coliforms & E. coli (CFU/100mL)',
        speed: 'Presence in 8 hrs; full quantitative count in 21 hrs',
        power: 'Li-ion battery buffer (48 hrs continuous runtime)',
        casing: 'IP67 Ruggedized Weatherproof Field Case',
        connectivity: 'Bluetooth 5.2 Low Energy & IoT sync',
        weight: '3.4 kg total kit weight',
      },
      image: '/images/portable-kit-system.jpg',
      stockQty: 34,
    },
    {
      id: 'prod-02',
      slug: 'optical-scanner-incubator',
      name: 'AquaScope Optical Colony Scanner & Incubator Unit',
      category: 'Equipment',
      price: 420.0,
      description: 'Desktop & field digital colony counter equipped with an embedded optical microscope, machine-learning colony segmentation algorithm, and dual thermal incubation chambers.',
      specs: {
        detection: 'Automated E. coli & Coliform Colony Enumeration',
        optics: 'High-resolution digital optical camera module',
        temperature: '37.0°C ± 0.3°C / 44.0°C ± 0.3°C regulated',
        screen: 'High-contrast sunlight-readable digital display',
        charging: 'USB-C Fast Charge (5V/3A) & 12V DC input',
      },
      image: '/images/portable-kit-system.jpg',
      stockQty: 48,
    },
    {
      id: 'prod-03',
      slug: 'motorized-vacuum-pump',
      name: 'Motorized Vacuum Water Sampling Pump',
      category: 'Equipment',
      price: 160.0,
      description: 'Quiet, lightweight battery-powered vacuum pump unit designed for drawing standardized 100mL water samples through stainless-steel filter cartridges in under 60 seconds.',
      specs: {
        flowRate: '100 mL sample drawn in < 60 seconds',
        vacuumPressure: 'Standardized 0.6 bar negative vacuum',
        recharge: 'USB Type-C with internal Li-ion cell',
        material: 'Chemical-resistant PEEK and stainless steel',
        weight: '380 grams',
      },
      image: '/images/portable-kit-system.jpg',
      stockQty: 72,
    },
    {
      id: 'prod-04',
      slug: 'sterile-sliders-pack-50',
      name: 'Sterile Membrane Filtration Sliders (Box of 50)',
      category: 'Consumables',
      price: 95.0,
      description: 'Individually sealed sterile cartridges containing 0.45µm nitrocellulose gridded membrane pads and selective culture broth for coliform and E. coli incubation. Requires no cold-chain storage.',
      specs: {
        poreSize: '0.45 µm standardized nitrocellulose membrane',
        grid: '3.1 mm grid markings for optical alignment',
        storage: 'Ambient shelf storage (no refrigeration needed)',
        shelfLife: '12 months from manufacture date',
        quantity: '50 individually blister-sealed sliders per box',
      },
      image: '/images/microbiology-grid.jpg',
      stockQty: 240,
    },
    {
      id: 'prod-05',
      slug: 'cellular-telemetry-hub',
      name: 'Global Telemetry & Cellular GPS Hub',
      category: 'Accessories',
      price: 210.0,
      description: 'Autonomous cellular telemetry gateway with multi-band LTE-M/NB-IoT and high-precision GPS. Automatically uploads georeferenced water quality test records directly to cloud mapping platforms.',
      specs: {
        cellular: 'Global LTE-M / NB-IoT with 2G fallback in 165+ countries',
        gps: 'Multi-constellation GPS / GLONASS antenna',
        ingress: 'IP68 hermetically sealed enclosure',
        battery: 'Integrated 6400mAh LiFePO4 battery buffer',
      },
      image: '/images/portable-kit-system.jpg',
      stockQty: 26,
    },
    {
      id: 'prod-06',
      slug: 'field-sampling-calibration-kit',
      name: 'Field Water Sampling & Optical Calibration Toolset',
      category: 'Accessories',
      price: 85.0,
      description: 'Comprehensive field sampling kit including 5x 100mL sterile autoclavable polypropylene sample bottles, an optical calibration test slide, micro-pipettors, and sterile alcohol wipes in a durable pouch.',
      specs: {
        bottles: '5x 100mL autoclavable polypropylene vessels',
        calibration: '1x precision optical dot target slide',
        tools: '1x 1mL fixed volume micro-pipettor + tips',
        case: 'Ballistic nylon protective carry case',
      },
      image: '/images/hero-water-testing.jpg',
      stockQty: 90,
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

  // 10. Seed Water Quality Field Projects (Our Work)
  const initialProjects = [
    {
      id: 'proj-01',
      slug: 'aidex-geneva',
      title: 'Water Quality Technology Showcase at AidEx Humanitarian Forum',
      category: 'Humanitarian WASH',
      categoryKey: 'humanitarian',
      date: 'October 2023',
      location: 'Geneva, Switzerland',
      image: '/images/hero-water-testing.jpg',
      summary: 'Demonstrating the portable water testing kit to humanitarian agencies, emergency WASH responders, and international disaster relief coordinators.',
      objective: 'To demonstrate rapid 8-hour coliform identification and autonomous field membrane filtration to frontline NGO logistics and water quality officers.',
      method: 'Live demonstrations utilizing spiked and municipal water samples, showing sample filtration through metal cartridges, automated incubation, and mobile telemetry sync.',
      keyFindings: [
        'Over 40 humanitarian organizations engaged in discussions regarding field trials.',
        'Validated the critical need for battery-powered testing that eliminates cold-chain requirements for media.',
        'Established collaborative pilot discussions for refugee settlement water testing.'
      ],
      partner: 'Humanitarian WASH Stakeholders & AidEx Global Summit',
      order: 1,
      translations: {
        am: {
          title: 'በ AidEx የሰብአዊ እርዳታ ፎረም ላይ የቀረበ የውሃ ጥራት ቴክኖሎጂ ማሳያ',
          category: 'ሰብአዊ WASH',
          date: 'ጥቅምት 2023',
          location: 'ጄኔቫ፣ ስዊዘርላንድ',
          summary: 'ተንቀሳቃሽ የውሃ መመርመሪያ ኪቱን ለሰብአዊ እርዳታ ድርጅቶች፣ ለአደጋ ጊዜ WASH ምላሽ ሰጪዎች እና ለአለም አቀፍ አስተባባሪዎች ማሳየት።',
          objective: 'ፈጣን የ 8 ሰዓት የኮሊፎርም መለያ እና ራሱን የቻለ የመስክ ሜምብሬን ማጣሪያን ለግንባር ቀደም የ NGO ሎጂስቲክስ እና የውሃ ጥራት ኃላፊዎች ማሳየት።',
          method: 'የናሙና ማጣሪያ፣ አውቶሜትድ ኢንኩቤሽን እና የሞባይል ቴሌሜትሪ ማመሳሰልን የሚያሳዩ የቀጥታ ማሳያዎች።',
          keyFindings: [
            'ከ 40 በላይ የሰብአዊ ድርጅቶች የመስክ ሙከራዎችን በተመለከተ ውይይት አድርገዋል።',
            'የማቀዝቀዣ ሰንሰለት የማያስፈልገው፣ በባትሪ የሚሰራ ምርመራ ወሳኝ መሆኑን አረጋግጧል።',
            'ለስደተኞች መጠለያ የውሃ ምርመራ የጋራ የፓይለት ውይይቶች ተመስርተዋል።'
          ],
          partner: 'የሰብአዊ WASH ባለድርሻ አካላት እና የ AidEx ዓለም አቀፍ ጉባኤ'
        },
        om: {
          title: 'Agarsiisa Teknooloojii Qulqullina Bishaanii Walgahii Namoomaa AidEx Irratti',
          category: 'WASH Namoomaa',
          date: 'Onkoloolessa 2023',
          location: 'Jiinevaa, Iswiizarlaandi',
          summary: 'Kiitii qorannoo bishaanii socho\'aa dhaabbilee namoomaa fi qindeessitoota balaa addunyaatiif agarsiisuu.',
          objective: 'Koliifoormii sa\'aatii 8 keessatti adda baasuu ogeessota loojistiksii NGOtiif agarsiisuu.',
          method: 'Agarsiisa qabatamaa calaltuu kaartirii, kuusaa ho\'aa fi teelemeetirii agarsiisu.',
          keyFindings: [
            'Dhaabbileen namoomaa 40 ol qorannoo dirree irratti mari\'ataniiru.',
            'Barbaachisummaa qorannoo baatriidhaan hojjetuu fi qabbaneessaa hin barbaanne mirkaneesseera.',
            'Baqattootaaf qorannoo bishaanii gaggeessuuf mariin jalqabameera.'
          ],
          partner: 'Qooda Fudhattoota WASH Namoomaa & Walgahii AidEx'
        },
        ti: {
          title: 'ኣብ AidEx ናይ ሰብኣዊ ሓገዝ ፎረም ዝቐረበ ናይ ማይ ጽሬት ቴክኖሎጂ ምርኢት',
          category: 'ሰብኣዊ WASH',
          date: 'ጥቕምቲ 2023',
          location: 'ጄኔቫ፣ ስዊዘርላንድ',
          summary: 'ነቲ ተንቀሳቓሲ ናይ ማይ መመርመሪ ኪት ንሰብኣዊ ሓገዝ ውድባትን ንናይ ህጹጽ ግዜ ምላሽ ወሃብትን ምርኣይ።',
          objective: 'ቅልጡፍ ናይ 8 ሰዓት ኮሊፎርም መለለዪን ናይ ሜዳ ምጽራይን ንሰብ ሞያ NGO ምርኣይ።',
          method: 'ናሙና ምጽራይ፣ ኢንኩቤሽንን ናይ ሞባይል ቴሌሜትሪ ምትእስሳርን ዘርኢ ናይ ቀጥታ ምርኢት።',
          keyFindings: [
            'ልዕሊ 40 ሰብኣዊ ውድባት ኣብ ናይ ሜዳ ፈተነታት ተዘራሪቦም።',
            'መዝሓሊ ዘየድልዮ ብባትሪ ዝሰርሕ መርመራ ኣገዳሲ ምዃኑ ኣረጋጊጹ።',
            'ንናይ ስደተኛታት መዕቖቢ ናይ ማይ መርመራ ዝርርብ ተጀሚሩ።'
          ],
          partner: 'ሰብኣዊ WASH መሻርኽትን ዓለማዊ ጉባኤ AidExን'
        }
      }
    },
    {
      id: 'proj-02',
      slug: 'tanzania-kenya-boreholes',
      title: 'Rural Community Water Point Bacterial Surveillance',
      category: 'Field Testing',
      categoryKey: 'field',
      date: 'March – June 2023',
      location: 'East Africa (Tanzania & Kenya)',
      image: '/images/portable-kit-system.jpg',
      summary: 'Field trials evaluating the portable testing kit across 65 rural water points, including boreholes, gravity-fed spring systems, and rainwater harvesting cisterns.',
      objective: 'To assess the usability, accuracy, and operational robustness of the portable system compared against reference laboratory membrane filtration.',
      method: 'Parallel testing of 100mL duplicate samples using the portable motorized pump and incubator versus standard laboratory membrane filtration under ISO 9308-1 protocols.',
      keyFindings: [
        '98.4% concordance with ISO reference laboratory results for bacterial presence/absence.',
        'Results delivered in 8 to 21 hours compared to 48–72 hours for central lab courier logistics.',
        'Easily operated by local water technicians after less than 2 hours of hands-on orientation.'
      ],
      partner: 'Local Water Supply Authorities & Community Health Committees',
      order: 2,
      translations: {
        am: {
          title: 'የገጠር ማህበረሰብ የውሃ ነጥቦች የባክቴሪያ ቅኝት',
          category: 'የመስክ ሙከራዎች',
          date: 'መጋቢት – ሰኔ 2023',
          location: 'ምስራቅ አፍሪካ (ታንዛኒያ እና ኬንያ)',
          summary: 'በ 65 የገጠር ውሃ ነጥቦች ላይ ጥልቅ ጉድጓዶችን፣ ምንጮችን እና የዝናብ ውሃ ማጠራቀሚያዎችን የመረመረ የመስክ ሙከራ።',
          objective: 'የተንቀሳቃሽ ሲስተሙን አጠቃቀም፣ ትክክለኛነት እና የመስክ ጥንካሬ ከማመሳከሪያ ላብራቶሪ ጋር ማወዳደር።',
          method: 'በ ISO 9308-1 ፕሮቶኮል መሰረት 100mL ናሙናዎችን በተንቀሳቃሽ ኪቱ እና በማዕከላዊ ላብራቶሪ ጎን ለጎን መመርመር።',
          keyFindings: [
            'ከ ISO ማመሳከሪያ ላብራቶሪ ውጤቶች ጋር 98.4% ተዛማጅነት።',
            'ከ 48–72 ሰዓታት የማጓጓዣ መዘግየት በተቃራኒ ውጤቶች ከ 8 እስከ 21 ሰዓታት ውስጥ ደርሰዋል።',
            'የአካባቢው የውሃ ቴክኒሻኖች ከ 2 ሰዓት ባነሰ ስልጠና በቀላሉ ተጠቅመውታል።'
          ],
          partner: 'የአካባቢ የውሃ አቅርቦት ባለስልጣናት እና የማህበረሰብ ጤና ኮሚቴዎች'
        },
        om: {
          title: 'Hordoffii Baakteeriyaa Boolla Bishaan Hawaasa Baadiyyaa',
          category: 'Qorannoo Dirree',
          date: 'Bitooteessa – Waxabajjii 2023',
          location: 'Baha Afrikaa (Taanzaaniyaa fi Keeniyaa)',
          summary: 'Boollaawwan bishaanii 65 irratti qorannoo dirree gaggeeffame.',
          objective: 'Sirrummaa fi jabinna sirna socho\'aa laabraatoorii wajjin madaaluu.',
          method: 'Ulaagaa ISO 9308-1 hordofuun samuda 100mL gama laciinuun qorachuu.',
          keyFindings: [
            'Bu\'aa laabraatoorii wajjin 98.4% walsimeera.',
            'Turtii sa\'aatii 48–72 dura ture gara sa\'aatii 8–21tti gabaabseera.',
            'Ogeessotni leenjii sa\'aatii 2 gadiin hojjechuu danda\'aniiru.'
          ],
          partner: 'Abbaa Taayitaa Bishaanii fi Koree Fayyaa Hawaasaa'
        },
        ti: {
          title: 'ናይ ገጠር ማሕበረሰብ ናይ ማይ ነጥብታት ናይ ባክቴርያ ክትትል',
          category: 'ናይ ሜዳ ፈተነታት',
          date: 'መጋቢት – ሰነ 2023',
          location: 'ምብራቕ ኣፍሪቃ (ታንዛንያን ኬንያን)',
          summary: 'ኣብ 65 ናይ ገጠር ማይ ነጥብታት ዒላታትን ዓይኒ ማያትን ዝገምገመ ናይ ሜዳ ፈተነ።',
          objective: 'ናይቲ ተንቀሳቓሲ ስርዓት ኣጠቓቕማን ትኽክለኛነትን ምስ ላብራቶሪ ምውድዳር።',
          method: 'ብመሰረት ISO 9308-1 ናሙናታት ብኽልቲኡ መገዲ ጎኒ ንጎኒ ምምርማር።',
          keyFindings: [
            'ምስ ናይ ISO ላብራቶሪ 98.4% ስምምዕ ረኺቡ።',
            'ውጽኢታት ኣብ ውሽጢ 8 ክሳብ 21 ሰዓታት ተረኺቦም።',
            'ሰራሕተኛታት ማይ ብውሑድ ስልጠና ብቐሊሉ ኣተግቢሮምዎ።'
          ],
          partner: 'ናይ ከባቢ መምርሒ ማይን ኮሚቴ ጥዕና ማሕበረሰብን'
        }
      }
    },
    {
      id: 'proj-03',
      slug: 'iso-lab-validation',
      title: 'ISO 17025 Accredited Laboratory Sensitivity Benchmarking',
      category: 'Research & Validation',
      categoryKey: 'research',
      date: 'January 2023',
      location: 'Cambridge, United Kingdom',
      image: '/images/microbiology-grid.jpg',
      summary: 'Rigorous independent analytical validation testing sensitivity, colony counting precision, and thermal stability in a certified microbiology research facility.',
      objective: 'To quantify the lower limit of detection (LOD) and automated computer vision colony counting accuracy across serial dilutions of Escherichia coli (ATCC 25922).',
      method: 'Blind multi-operator trials testing bacterial concentrations from 1 to 200 CFU per 100mL, comparing automated machine-learning optical colony counts against manual microbiological enumeration.',
      keyFindings: [
        'Lower detection limit of 1 viable bacterial colony per 100mL sample volume.',
        'High correlation (R² > 0.97) between automated optical camera counts and expert microbiologist manual verification.',
        'Maintained strict ±0.3°C thermal accuracy in the incubation compartment across ambient temperature swings of 15°C to 40°C.'
      ],
      partner: 'Independent Microbiological Testing Laboratories',
      order: 3,
      translations: {
        am: {
          title: 'የ ISO 17025 እውቅና ያለው የላብራቶሪ ትክክለኛነት ማረጋገጫ',
          category: 'ምርምር እና ማረጋገጫ',
          date: 'ጥር 2023',
          location: 'ካምብሪጅ፣ ዩናይትድ ኪንግደም',
          summary: 'በማይክሮባዮሎጂ ምርምር ማዕከል ውስጥ ስሜታዊነትን፣ የቅኝ ግዛት ቆጠራን እና የሙቀት መረጋጋትን የፈተነ ገለልተኛ ማረጋገጫ።',
          objective: 'የዝቅተኛውን የመለየት ወሰን (LOD) እና የኮምፒውተር ቪዥን ቆጠራ ትክክለኛነትን በኢ. ኮላይ ናሙናዎች ላይ ማረጋገጥ።',
          method: 'ከ 1 እስከ 200 CFU ባለው የባክቴሪያ መጠን ላይ የማሽን ለርኒንግ ቆጠራን ከባለሙያ ማይክሮባዮሎጂስት ቆጠራ ጋር ማነጻጸር።',
          keyFindings: [
            'ዝቅተኛው የመለየት ወሰን በ 100mL ናሙና ውስጥ 1 ህያው የባክቴሪያ ቅኝ ግዛት (1 CFU)።',
            'በአውቶሜትድ ካሜራ እና በማይክሮባዮሎጂስት ቆጠራ መካከል ከፍተኛ ተዛማጅነት (R² > 0.97)።',
            'ከ 15°C እስከ 40°C ባለው የአካባቢ ሙቀት ውስጥ የ ±0.3°C ትክክለኛነትን ጠብቋል።'
          ],
          partner: 'ገለልተኛ የማይክሮባዮሎጂ መመርመሪያ ላብራቶሪዎች'
        },
        om: {
          title: 'Mirkaneessa Laabraatoorii ISO 17025 Beekkamtii Qabu',
          category: 'Qorannoo & Mirkaneessa',
          date: 'Amajjii 2023',
          location: 'Keembiriij, Yuunaayitid Kingidam',
          summary: 'Dhaabbata qorannoo maaykiroobaayoloojii keessatti qorannoo tasgabbii ho\'aa fi qulqullina kolonii gaggeeffame.',
          objective: 'Sadarkaa gadi aanaa LOD fi sirrummaa maashin lerning qorachuu.',
          method: 'Baay\'ina baakteeriyaa 1 hanga 200 CFU irratti lakkoofsa kompiitaraa fi ogeessaa madaaluu.',
          keyFindings: [
            'Sadarkaa gadi aanaa 100mL keessatti kolonii baakteeriyaa 1 (1 CFU).',
            'Walitti dhufeenya olaanaa (R² > 0.97) kaameeraa fi ogeessa gidduu.',
            'Ho\'a 15°C hanga 40°C keessatti sirrummaa ±0.3°C eegeera.'
          ],
          partner: 'Laabraatooriiwwan Qorannoo Maaykiroobaayoloojii Bilisoo'
        },
        ti: {
          title: 'ናይ ISO 17025 ተፈላጥነት ዘለዎ ላብራቶሪ ምርጋጽ',
          category: 'ምርምርን ምርጋጽን',
          date: 'ጥሪ 2023',
          location: 'ካምብሪጅ፣ ዩናይትድ ኪንግደም',
          summary: 'ኣብ ናይ ማይክሮባዮሎጂ ማእከል ናይ ምፍላጥ ዓቕምን ናይ ሙቐት ርግኣትን ዝገምገመ ምርጋጽ።',
          objective: 'ዝተሓተ ናይ ምፍላጥ ዓቕምን (LOD) ናይ ኮምፒውተር ቪዥን ቆጸራን ምፍታሽ።',
          method: 'ካብ 1 ክሳብ 200 CFU ኣብ ዘለዎ መጠን ናይ ማሽን ለርኒንግ ቆጸራ ምስ ናይ ሰብ ሞያ ቆጸራ ምውድዳር።',
          keyFindings: [
            'ዝተሓተ ናይ ምፍላጥ ደረት ኣብ 100mL ውሽጢ 1 ናይ ባክቴርያ ኮሎኒ (1 CFU)።',
            'ኣብ መንጎ ኣውቶሜትድ ካሜራን ሰብ ሞያን ልዑል ምትእስሳር (R² > 0.97)።',
            'ኣብ ዝተፈላለየ ሙቐት ናይ ±0.3°C ትኽክለኛነት ሓልዩ።'
          ],
          partner: 'ናጻ ናይ ማይክሮባዮሎጂ መመርመሪ ላብራቶሪታት'
        }
      }
    },
    {
      id: 'proj-04',
      slug: 'community-wash-ethiopia',
      title: 'WASH Committee Capacity Building & Rapid Water Mapping',
      category: 'Community Workshops',
      categoryKey: 'community',
      date: 'November 2023',
      location: 'Oromia & Amhara Regions, Ethiopia',
      image: '/images/hero-water-testing.jpg',
      summary: 'Hands-on training workshops for community water caretakers and environmental health officers to map local drinking water safety and identify contamination pathways.',
      objective: 'To decentralize water quality monitoring by empowering local community sanitation operators with accessible testing tools and digital mapping.',
      method: 'Structured 2-day workshops covering sterile sample handling, vacuum pump filtration, incubator operation, and interpretation of colorimetric safety keys.',
      keyFindings: [
        'Trained 32 community WASH operators across 14 rural kebeles.',
        'Mapped water safety across 28 unprotected springs and protected boreholes directly onto open data dashboards.',
        'Identified upstream agricultural runoff contamination, enabling immediate sanitary seal repairs.'
      ],
      partner: 'Regional Water Resources Bureaus & Environmental Health Officers',
      order: 4,
      translations: {
        am: {
          title: 'የ WASH ኮሚቴዎች አቅም ግንባታ እና ፈጣን የውሃ ካርታ ዝግጅት',
          category: 'የማህበረሰብ አውደ-ጥናቶች',
          date: 'ህዳር 2023',
          location: 'የኦሮሚያ እና አማራ ክልሎች፣ ኢትዮጵያ',
          summary: 'የመጠጥ ውሃ ደህንነትን ለመከታተል እና የብክለት መንገዶችን ለመለየት ለማህበረሰብ ውሃ ተንከባካቢዎች እና የጤና ባለሙያዎች የተሰጠ ተግባራዊ ስልጠና።',
          objective: 'የአካባቢው የንፅህና አጠባበቅ ባለሙያዎችን በተደራሽ መመርመሪያ መሳሪያዎች እና በዲጂታል ካርታ በማብቃት የውሃ ጥራት ክትትልን ያልተማከለ ማድረግ።',
          method: 'የናሙና አያያዝን፣ የቫክዩም ፓምፕ ማጣሪያን፣ የኢንኩቤተር አሰራርን እና የውጤት አተረጓጎምን ያካተተ የ 2 ቀናት ተግባራዊ አውደ ጥናት።',
          keyFindings: [
            'በ 14 የገጠር ቀበሌዎች ውስጥ ለሚገኙ 32 የህብረተሰብ WASH ኦፕሬተሮች ስልጠና ተሰጥቷል።',
            'የ 28 ያልተጠበቁ ምንጮች እና የተጠበቁ ጉድጓዶች የውሃ ደህንነት በቀጥታ ወደ ክፍት ዳታ ዳሽቦርዶች ተመዝግቧል።',
            'ከእርሻ የሚመጣ የውሃ ብክለት ተለይቶ ፈጣን የጉድጓድ ጥገና ተካሂዷል።'
          ],
          partner: 'የክልል የውሃ ሀብት ቢሮዎች እና የአካባቢ ጤና ጥበቃ ባለሙያዎች'
        },
        om: {
          title: 'Ijaarsa Dandeettii Koree WASH fi Kaartaa Bishaanii Saffisaa',
          category: 'Walgahii Hawaasaa',
          date: 'Sadaasa 2023',
          location: 'Naannoo Oromiyaa fi Amaaraa, Itoophiyaa',
          summary: 'Nageenya bishaan dhugaatii hordofuu fi karaalee faalamaa adda baasuuf leenjii ogeessotaaf kenname.',
          objective: 'Meeshaalee salphaa fi kaartaa dijitaalaatiin tajaajila qulqullina bishaanii bittimsuu.',
          method: 'Leenjii guyyoota 2 qabiinsa samudaa, calaltuu vaakiyeemii fi inkubashinii irratti.',
          keyFindings: [
            'Gandoolee 14 keessatti ogeessota WASH 32 leenjiseera.',
            'Burqaalee fi boolla bishaanii 28 gara daashboordiitti galcheera.',
            'Faalama qonnaa irraa dhufe adda baasuun suphaan battalaa akka raawwatamu taasiseera.'
          ],
          partner: 'Biiroo Qabeenya Bishaanii Naannoo & Ogeessota Fayyaa'
        },
        ti: {
          title: 'ምዕባይ ዓቕሚ ኮሚቴታት WASHን ቅልጡፍ ናይ ማይ ካርታን',
          category: 'ናይ ማሕበረሰብ ዓውደ-መጽናዕትታት',
          date: 'ሕዳር 2023',
          location: 'ክልላት ኦሮምያን ኣምሓራን፣ ኢትዮጵያ',
          summary: 'ናይ መስተ ማይ ድሕንነት ንምክትታልን መንገዲ ብከላ ንምልላይን ንሓለውቲ ማይ ዝተወሃበ ተግባራዊ ስልጠና።',
          objective: 'ንሰብ ሞያ ጽሬት ብተበጻሕቲ መሳርሒታትን ዲጂታል ካርታን ብምብቃዕ ናይ ማይ ጽሬት ክትትል ዘይተማእከለ ምግባር።',
          method: 'ናሙና ኣተሓሕዛ፣ ቫክዩም ምጽራይ፣ ኢንኩቤሽንን ውጽኢት ምትርጓምን ዝሓዘ ናይ 2 መዓልታት ስልጠና።',
          keyFindings: [
            'ኣብ 14 ገጠራት ቀበሌታት ንዝርከቡ 32 ናይ WASH ሰራሕተኛታት ኣሰልጢኑ።',
            'ናይ 28 ዘይተሓለዉ ዓይኒ ማያትን ዒላታትን ናይ ማይ ድሕንነት ናብ ዳሽቦርድ መዝጊቡ።',
            'ካብ ሕርሻ ዝመጽእ ብከላ ተለልዩ ቀልጢፉ ናይ ዒላ ጽገና ተኻይዱ።'
          ],
          partner: 'ናይ ክልል ቢሮታት ጸጋታት ማይን ሰብ ሞያ ጥዕናን'
        }
      }
    },
    {
      id: 'proj-05',
      slug: 'emergency-disaster-response',
      title: 'Rapid Water Testing Protocol for Flooded Infrastructure',
      category: 'Humanitarian WASH',
      categoryKey: 'humanitarian',
      date: 'April 2024',
      location: 'South Asia & Latin America Pilots',
      image: '/images/portable-kit-system.jpg',
      summary: 'Developing rapid response protocols for water quality assessment following extreme weather events and flooding of municipal distribution pipes.',
      objective: 'To establish a rapid 8-hour screening workflow for emergency responders when central water treatment infrastructure is compromised.',
      method: 'Field deployment kits pre-packed in airtight waterproof cases, operated entirely from internal rechargeable power packs.',
      keyFindings: [
        'Eliminated delays waiting for laboratory transport during roadway washouts.',
        'Enabled public health teams to clear safe water distribution points within hours.',
        'Provided geolocated test records to coordinate chlorine dosing and emergency treatment.'
      ],
      partner: 'Emergency Relief & WASH Taskforces',
      order: 5,
      translations: {
        am: {
          title: 'ለተጎዱ የመሰረተ ልማት እና ጎርፍ የተዘጋጀ ፈጣን የውሃ ምርመራ ፕሮቶኮል',
          category: 'ሰብአዊ WASH',
          date: 'ሚያዚያ 2024',
          location: 'የደቡብ እስያ እና ላቲን አሜሪካ ፓይለቶች',
          summary: 'ከከባድ የአየር ሁኔታ እና የማዘጋጃ ቤት ቱቦዎች ጎርፍ በኋላ የውሃ ጥራትን ለመገምገም ፈጣን የአደጋ ጊዜ ፕሮቶኮሎችን ማዘጋጀት።',
          objective: 'የማዕከላዊ የውሃ ማከሚያ ሲስተሞች ሲበላሹ ለአደጋ ምላሽ ሰጪዎች ፈጣን የ 8 ሰዓት የማጣሪያ ቅደም ተከተል ማዘጋጀት።',
          method: 'ውሃ በማያስገባ ሻንጣ የታሸጉ እና ሙሉ በሙሉ በውስጣዊ ባትሪ የሚሰሩ የመስክ መመርመሪያ ኪቶች።',
          keyFindings: [
            'መንገዶች በጎርፍ በተዘጉበት ወቅት ናሙናዎችን ወደ ላብራቶሪ ለመላክ የነበረውን መዘግየት አስቀርቷል።',
            'የህዝብ ጤና ቡድኖች ደህንነቱ የተጠበቀ የውሃ ማከፋፈያ ነጥቦችን በጥቂት ሰዓታት ውስጥ እንዲያረጋግጡ አስችሏል።',
            'የክሎሪን ህክምናን ለማስተባበር በካርታ የተደገፉ የምርመራ መዝገቦችን አቅርቧል።'
          ],
          partner: 'የአደጋ ጊዜ እርዳታ እና የ WASH ግብረ-ኃይሎች'
        },
        om: {
          title: 'Sirna Qorannoo Bishaan Saffisaa Balaa Lolaatiif Qophaa\'e',
          category: 'WASH Namoomaa',
          date: 'Ebla 2024',
          location: 'Paayiletii Kibba Eeshiyaa fi Laatiin Ameerikaa',
          summary: 'Balaa lolaa booda qulqullina bishaanii madaaluuf adeemsa deebii saffisaa qopheessuu.',
          objective: 'Yeroo sararri bishaanii miidhamu qorannoo sa\'aatii 8 keessatti raawwatamu hundeessuu.',
          method: 'Kiitota bishaan hin galchine fi guutummaatti baatriidhaan hojjetan.',
          keyFindings: [
            'Daandiin yeroo cufamu gara laabraatooriitti erguuf turtii ture hambiseera.',
            'Gareen fayyaa bakkeewwan bishaan dhugaatii saffisaan akka mirkaneessan gargaareera.',
            'Yaala kilooriinii qindeessuuf ragaa kaartaa qabu dhiyeesseera.'
          ],
          partner: 'Gareewwan Gargaarsa Yeroo Balaa fi WASH'
        },
        ti: {
          title: 'ንሓደጋ ውሕጅ ዝተዳለወ ቅልጡፍ ናይ ማይ መርመራ ፕሮቶኮል',
          category: 'ሰብኣዊ WASH',
          date: 'ሚያዝያ 2024',
          location: 'ናይ ደቡብ እስያን ላቲን ኣመሪካን ፈተነታት',
          summary: 'ድሕሪ ከቢድ ናይ ኣየር ኩነታትን ውሕጅን ናይ ማይ ጽሬት ንምግምጋም ፈጣን ናይ ህጹጽ ግዜ ፕሮቶኮላት ምምዕባል。',
          objective: 'ማእከላይ ናይ ማይ መጽረዪ ምስ ዝበላሾ ናይ 8 ሰዓት ናይ ምጽራይ ኣሰራርሓ ምቛም።',
          method: 'ማይ ዘየእቱ ሳንዱቕ ዝተዓሸጉን ብባትሪ ዝሰርሑን ናይ ሜዳ ኪታት።',
          keyFindings: [
            'መንገድታት ብውሕጅ ኣብ ዝተዓጸዉሉ ግዜ ናብ ላብራቶሪ ናይ ምልኣኽ ምድንጓይ ኣትርፉ።',
            'ጉጅለታት ጥዕና ጽሩይ ናይ ማይ መከፋፈሊ ቦታታት ብቑሩብ ሰዓታት ከረጋግጹ ኣኽኢሉ。',
            'ናይ ክሎሪን ሕክምና ንምውዳድ ብካርታ ዝተደገፉ መዛግብቲ ኣቕሪቡ።'
          ],
          partner: 'ናይ ህጹጽ ሓገዝን ናይ WASH ግብረ-ሓይልታትን'
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
