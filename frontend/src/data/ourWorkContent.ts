import { Language } from '../i18n/types';

export interface LocalizedProject {
  id: string;
  categoryKey: 'all' | 'field' | 'humanitarian' | 'research' | 'community';
  title: string;
  category: string;
  date: string;
  location: string;
  image: string;
  summary: string;
  details: {
    objective: string;
    method: string;
    keyFindings: string[];
    partner?: string;
  };
}

export interface OurWorkPageContent {
  badge: string;
  title: string;
  desc: string;
  metric1Val: string;
  metric1Label: string;
  metric2Val: string;
  metric2Label: string;
  metric3Val: string;
  metric3Label: string;
  filterLabel: string;
  categories: {
    all: string;
    field: string;
    humanitarian: string;
    research: string;
    community: string;
  };
  showingText: (count: number) => string;
  verifiedBadge: string;
  viewCaseStudy: string;
  closeCaseStudy: string;
  projectDetails: string;
  objectiveLabel: string;
  methodLabel: string;
  findingsLabel: string;
  partnerLabel: string;
  inquireButton: string;
  sdgTag: string;
  sdgTitle: string;
  sdgDesc: string;
  sdgButton: string;
  principlesTitle: string;
  principles: Array<{ title: string; desc: string }>;
  pilotTitle: string;
  pilotDesc: string;
  pilotBtn1: string;
  pilotBtn2: string;
  projects: LocalizedProject[];
}

export const ourWorkContent: Record<Language, OurWorkPageContent> = {
  // English (en)
  en: {
    badge: 'Global Field Trials & Impact',
    title: 'Real-World Impact. Proven in the Field.',
    desc: 'From remote rural boreholes and refugee settlements to health clinics and ISO-certified validation labs, our water testing technology is built to perform in the environments where drinking water safety matters most.',
    metric1Val: '8 to 21 hrs',
    metric1Label: 'Rapid Coliform & E. coli Detection',
    metric2Val: '1 CFU / 100mL',
    metric2Label: 'ISO 9308-1 Detection Benchmark',
    metric3Val: 'Zero Cold-Chain',
    metric3Label: 'Stable Ambient Transportable Media',
    filterLabel: 'Filter Projects:',
    categories: {
      all: 'All Initiatives',
      field: 'Field Testing',
      humanitarian: 'Humanitarian WASH',
      research: 'Research & Validation',
      community: 'Community Workshops',
    },
    showingText: (count: number) => `Showing ${count} initiatives`,
    verifiedBadge: 'Verified Field Record',
    viewCaseStudy: 'View Case Study',
    closeCaseStudy: 'Close Case Study',
    projectDetails: 'Field Validation & Methodology Details',
    objectiveLabel: 'Operational Objective',
    methodLabel: 'Testing Protocol & Method',
    findingsLabel: 'Key Results & Field Findings',
    partnerLabel: 'Collaborating Partner / Stakeholder',
    inquireButton: 'Inquire About Similar Collaboration',
    sdgTag: 'Sustainable Development Goal 6',
    sdgTitle: 'Ensuring Safe Water & Sanitation For All',
    sdgDesc:
      'Target 6.1 aims for universal and equitable access to safe drinking water. Traditional testing kits are often too slow and costly for low-resource settings. AquaScope bridges this gap through affordable, decentralized membrane filtration technology that delivers clear quantitative results on-site.',
    sdgButton: 'Learn About Our Purpose',
    principlesTitle: 'Core Principles in Action',
    principles: [
      {
        title: 'User-Centred Design',
        desc: 'Built for technicians with minimal formal laboratory training.',
      },
      {
        title: 'No Fabricated Claims',
        desc: 'Transparent detection limits adhering strictly to ISO 9308-1 specifications.',
      },
      {
        title: 'Inclusive Open Data',
        desc: 'Telemetry results shared transparently with local communities and health boards.',
      },
    ],
    pilotTitle: 'Plan a Water Quality Pilot With Us',
    pilotDesc:
      'We partner with NGOs, ministries of health, water utilities, and research institutions worldwide to demonstrate reliable drinking-water testing.',
    pilotBtn1: 'Discuss a Partnership',
    pilotBtn2: 'Explore the Technology',
    projects: [
      {
        id: 'aidex-geneva',
        categoryKey: 'humanitarian',
        title: 'Water Quality Technology Showcase at AidEx Humanitarian Forum',
        category: 'Humanitarian WASH',
        date: 'October 2023',
        location: 'Geneva, Switzerland',
        image: '/images/hero-water-testing.jpg',
        summary:
          'Demonstrating the portable water testing kit to humanitarian agencies, emergency WASH responders, and international disaster relief coordinators.',
        details: {
          objective:
            'To demonstrate rapid 8-hour coliform identification and autonomous field membrane filtration to frontline NGO logistics and water quality officers.',
          method:
            'Live demonstrations utilizing spiked and municipal water samples, showing sample filtration through metal cartridges, automated incubation, and mobile telemetry sync.',
          keyFindings: [
            'Over 40 humanitarian organizations engaged in discussions regarding field trials.',
            'Validated the critical need for battery-powered testing that eliminates cold-chain requirements for media.',
            'Established collaborative pilot discussions for refugee settlement water testing.',
          ],
          partner: 'Humanitarian WASH Stakeholders & AidEx Global Summit',
        },
      },
      {
        id: 'tanzania-kenya-boreholes',
        categoryKey: 'field',
        title: 'Rural Community Water Point Bacterial Surveillance',
        category: 'Field Testing',
        date: 'March – June 2023',
        location: 'East Africa (Tanzania & Kenya)',
        image: '/images/portable-kit-system.jpg',
        summary:
          'Field trials evaluating the portable testing kit across 65 rural water points, including boreholes, gravity-fed spring systems, and rainwater harvesting cisterns.',
        details: {
          objective:
            'To assess the usability, accuracy, and operational robustness of the portable system compared against reference laboratory membrane filtration.',
          method:
            'Parallel testing of 100mL duplicate samples using the portable motorized pump and incubator versus standard laboratory membrane filtration under ISO 9308-1 protocols.',
          keyFindings: [
            '98.4% concordance with ISO reference laboratory results for bacterial presence/absence.',
            'Results delivered in 8 to 21 hours compared to 48–72 hours for central lab courier logistics.',
            'Easily operated by local water technicians after less than 2 hours of hands-on orientation.',
          ],
          partner: 'Local Water Supply Authorities & Community Health Committees',
        },
      },
      {
        id: 'iso-lab-validation',
        categoryKey: 'research',
        title: 'ISO 17025 Accredited Laboratory Sensitivity Benchmarking',
        category: 'Research & Validation',
        date: 'January 2023',
        location: 'Cambridge, United Kingdom',
        image: '/images/microbiology-grid.jpg',
        summary:
          'Rigorous independent analytical validation testing sensitivity, colony counting precision, and thermal stability in a certified microbiology research facility.',
        details: {
          objective:
            'To quantify the lower limit of detection (LOD) and automated computer vision colony counting accuracy across serial dilutions of Escherichia coli (ATCC 25922).',
          method:
            'Blind multi-operator trials testing bacterial concentrations from 1 to 200 CFU per 100mL, comparing automated machine-learning optical colony counts against manual microbiological enumeration.',
          keyFindings: [
            'Lower detection limit of 1 viable bacterial colony per 100mL sample volume.',
            'High correlation (R² > 0.97) between automated optical camera counts and expert microbiologist manual verification.',
            'Maintained strict ±0.3°C thermal accuracy in the incubation compartment across ambient temperature swings of 15°C to 40°C.',
          ],
          partner: 'Independent Microbiological Validation Consortium',
        },
      },
      {
        id: 'ethiopia-wash-workshops',
        categoryKey: 'community',
        title: 'WASH Committee Capacity Building & Rapid Water Mapping',
        category: 'Community Workshops',
        date: 'November 2023',
        location: 'Oromia & Amhara Regions, Ethiopia',
        image: '/images/hero-water-testing.jpg',
        summary:
          'Hands-on training workshops for community water caretakers and environmental health officers to map local drinking water safety and identify contamination pathways.',
        details: {
          objective:
            'To empower regional water desk officers and community water attendants to conduct routine, decentralized bacterial monitoring without reliance on capital laboratory shipments.',
          method:
            'Interactive 3-day technical training combining field water sampling, motorized vacuum filtration, incubation monitoring, and digital result logging.',
          keyFindings: [
            '28 community technicians trained and certified to perform autonomous drinking water testing.',
            'Mapped microbiological safety across 42 community points, identifying 9 vulnerable open dug wells requiring disinfection.',
            'Demonstrated 100% protocol adherence during independent field observation audits.',
          ],
          partner: 'Regional Water Bureaus & Community Water Caretaker Networks',
        },
      },
      {
        id: 'flooded-infrastructure',
        categoryKey: 'humanitarian',
        title: 'Rapid Water Testing Protocol for Flooded Infrastructure',
        category: 'Humanitarian WASH',
        date: 'April 2024',
        location: 'South Asia & Latin America Pilots',
        image: '/images/portable-kit-system.jpg',
        summary:
          'Developing rapid response protocols for water quality assessment following extreme weather events and flooding of municipal distribution pipes.',
        details: {
          objective:
            'To evaluate the deployment speed and diagnostic turnaround time of portable testing units in simulated post-flood emergency response scenarios.',
          method:
            'Field deployment kits pre-packed in airtight waterproof cases, operated entirely from internal rechargeable power packs.',
          keyFindings: [
            'Eliminated delays waiting for laboratory transport during roadway washouts.',
            'Enabled public health teams to clear safe water distribution points within hours.',
            'Provided geolocated test records to coordinate chlorine dosing and emergency treatment.',
          ],
          partner: 'Emergency Relief & WASH Taskforces',
        },
      },
    ],
  },

  // Amharic (am)
  am: {
    badge: 'ዓለም አቀፍ የመስክ ሙከራዎች እና ተጽዕኖ',
    title: 'በመስክ የተረጋገጠ እውነተኛ ተጽዕኖ።',
    desc: 'ከገጠር የውሃ ቦረቦሮች እና የስደተኞች መጠለያዎች ጀምሮ እስከ ጤና ኬላዎች እና አለም አቀፍ ላብራቶሪዎች ድረስ፣ የእኛ የውሃ መመርመሪያ ቴክኖሎጂ የመጠጥ ውሃ ደህንነት በጣም በሚያስፈልግባቸው ቦታዎች ሁሉ አስተማማኝ አገልግሎት እንዲሰጥ ተደርጎ የተሰራ ነው።',
    metric1Val: 'ከ8 እስከ 21 ሰዓት',
    metric1Label: 'ፈጣን የኢ.ኮላይ እና ኮሊፎርምስ ምርመራ',
    metric2Val: '1 CFU / 100mL',
    metric2Label: 'የ ISO 9308-1 የምርመራ መለኪያ',
    metric3Val: 'ማቀዝቀዣ የማይፈልግ',
    metric3Label: 'በመደበኛ የሙቀት መጠን የሚጓጓዝ ኬሚካል',
    filterLabel: 'ፕሮጀክቶችን ይምረጡ፡',
    categories: {
      all: 'ሁሉም ስራዎች',
      field: 'የመስክ ሙከራዎች',
      humanitarian: 'ሰብአዊ የዋሽ (WASH) ፕሮግራሞች',
      research: 'ምርምር እና ማረጋገጫ',
      community: 'የማህበረሰብ ስልጠናዎች',
    },
    showingText: (count: number) => `${count} ፕሮጀክቶች በመታየት ላይ`,
    verifiedBadge: 'የተረጋገጠ የመስክ መዝገብ',
    viewCaseStudy: 'ሙሉ ጥናቱን ይመልከቱ',
    closeCaseStudy: 'ዝጋ',
    projectDetails: 'የመስክ ማረጋገጫ እና የአሰራር ዘዴ ዝርዝር',
    objectiveLabel: 'የስራው ዋና ዓላማ',
    methodLabel: 'የምርመራ ፕሮቶኮል እና ዘዴ',
    findingsLabel: 'ቁልፍ ውጤቶች እና የመስክ ግኝቶች',
    partnerLabel: 'አጋር ድርጅት / ባለድርሻ አካል',
    inquireButton: 'ስለ ተመሳሳይ ትብብር ይጠይቁ',
    sdgTag: 'የተመድ የዘላቂ ልማት ግብ 6',
    sdgTitle: 'ለሁሉም ሰው ንፁህ ውሃ እና ሳኒቴሽን ማረጋገጥ',
    sdgDesc:
      'ግብ 6.1 ፍትሃዊ እና ሁለንተናዊ የመጠጥ ውሃ ተደራሽነትን ለማረጋገጥ ያለመ ነው። ባህላዊ የላብራቶሪ ኪቶች ውድ እና የረጅም ጊዜ መዘግየት ያለባቸው ናቸው። አኳስኮፕ በቦታው ላይ ግልጽ የቁጥር ውጤት በሚሰጥ ተመጣጣኝ የሜምብሬን ቴክኖሎጂ ይህንን ክፍተት ይሞላል።',
    sdgButton: 'ስለ ዓላማችን የበለጠ ይወቁ',
    principlesTitle: 'መሰረታዊ መርሆቻችን በተግባር',
    principles: [
      {
        title: 'ለተጠቃሚው ምቹ የሆነ ንድፍ',
        desc: 'አነስተኛ የላብራቶሪ ስልጠና ላላቸው የመስክ ሰራተኞች የተዘጋጀ።',
      },
      {
        title: 'ግልጽ እና ሳይንሳዊ እውነት',
        desc: 'የ ISO 9308-1 ዝርዝር መግለጫዎችን በጥብቅ የተከተለ ትክክለኛ የምርመራ ገደብ።',
      },
      {
        title: 'ክፍት እና አካታች መረጃ',
        desc: 'የውሃ ምርመራ ውጤቶች ለማህበረሰቦች እና ለጤና ቢሮዎች በግልጽ ይጋራሉ።',
      },
    ],
    pilotTitle: 'የውሃ ጥራት የሙከራ ፕሮጀክት ከእኛ ጋር ያቅዱ',
    pilotDesc:
      'አስተማማኝ የመጠጥ ውሃ ምርመራን ተግባራዊ ለማድረግ መንግስታዊ ካልሆኑ ድርጅቶች፣ ከጤና ጥበቃ ሚኒስቴር፣ ከውሃ ተቋማት እና ከምርምር ማዕከላት ጋር በትብብር እንሰራለን።',
    pilotBtn1: 'ስለ አጋርነት ይወያዩ',
    pilotBtn2: 'ቴክኖሎጂውን ይመልከቱ',
    projects: [
      {
        id: 'aidex-geneva',
        categoryKey: 'humanitarian',
        title: 'በኤይድኤክስ (AidEx) የሰብአዊ እርዳታ ፎረም ላይ የቀረበ የውሃ ቴክኖሎጂ ማሳያ',
        category: 'ሰብአዊ የዋሽ (WASH) ፕሮግራሞች',
        date: 'ጥቅምት 2023',
        location: 'ጄኔቫ፣ ስዊዘርላንድ',
        image: '/images/hero-water-testing.jpg',
        summary:
          'ተንቀሳቃሹን የውሃ መመርመሪያ ኪት ለሰብአዊ እርዳታ ድርጅቶች፣ ለአስቸኳይ ጊዜ የዋሽ (WASH) ሰራተኞች እና ለአለም አቀፍ የአደጋ መከላከያ አስተባባሪዎች ማስተዋወቅ።',
        details: {
          objective:
            'ፈጣን የ 8 ሰዓት የኮሊፎርም ምርመራን እና ተንቀሳቃሽ የሜምብሬን ማጣሪያ ቴክኖሎጂን ለግንባር ቀደም የሰብአዊ እርዳታ ድርጅቶች ማሳየት።',
          method:
            'የተዘጋጁ እና የማዘጋጃ ቤት ውሃ ናሙናዎችን በመጠቀም የቀጥታ ማሳያ ማካሄድ፣ በብረት ካርትሪጅ ማጣራት፣ ኢንኩቤሽን እና የቴሌሜትሪ ማመሳሰልን ማሳየት።',
          keyFindings: [
            'ከ 40 በላይ የሰብአዊ እርዳታ ድርጅቶች የመስክ ሙከራ ለማድረግ ፍላጎት አሳይተዋል።',
            'ማቀዝቀዣ የማይፈልግ እና በባትሪ የሚሰራ መመርመሪያ ያለው ወሳኝ ጠቀሜታ ተረጋግጧል።',
            'በስደተኞች መጠለያዎች ውስጥ የውሃ ምርመራ ለማድረግ የትብብር ውይይቶች ተጀምረዋል።',
          ],
          partner: 'የሰብአዊ እርዳታ የዋሽ ባለድርሻ አካላት እና የኤይድኤክስ ጉባኤ',
        },
      },
      {
        id: 'tanzania-kenya-boreholes',
        categoryKey: 'field',
        title: 'የገጠር ማህበረሰብ የውሃ ቦታዎች የባክቴሪያ ቅኝት',
        category: 'የመስክ ሙከራዎች',
        date: 'መጋቢት – ሰኔ 2023',
        location: 'ምስራቅ አፍሪካ (ታንዛኒያ እና ኬንያ)',
        image: '/images/portable-kit-system.jpg',
        summary:
          'በ 65 የገጠር የውሃ ቦታዎች ላይ (ቦረቦሮች፣ የምንጭ መስመሮች እና የዝናብ ውሃ ማጠራቀሚያዎች ጨምሮ) የተደረገ የተንቀሳቃሽ መመርመሪያ ኪት የመስክ ሙከራ።',
        details: {
          objective:
            'የተንቀሳቃሹን መመርመሪያ ኪት የአጠቃቀም ቅለት፣ ትክክለኛነት እና የመስክ ጥንካሬ ከመደበኛ የላብራቶሪ ምርመራ ጋር ማወዳደር።',
          method:
            'የ 100 ሚሊ ሊትር ናሙናዎችን በሞተር በሚሰራው ተንቀሳቃሽ ኪት እና በመደበኛ ላብራቶሪ በ ISO 9308-1 መስፈርት መሰረት ጎን ለጎን መመርመር።',
          keyFindings: [
            'ከዋናው የላብራቶሪ ምርመራ ውጤት ጋር 98.4% ትክክለኛ ተዛምዶ አሳይቷል።',
            'ውጤቶች ከ 48-72 ሰዓታት የላብራቶሪ መዘግየት ይልቅ በ 8 እስከ 21 ሰዓታት ውስጥ ደርሰዋል።',
            'የአካባቢው የውሃ ሰራተኞች ከ 2 ሰዓት ባነሰ ስልጠና መሣሪያውን በቀላሉ ተጠቅመውበታል።',
          ],
          partner: 'የአካባቢው የውሃ አስተዳደሮች እና የማህበረሰብ ጤና ኮሚቴዎች',
        },
      },
      {
        id: 'iso-lab-validation',
        categoryKey: 'research',
        title: 'በ ISO 17025 እውቅና በተሰጠው ላብራቶሪ የተደረገ የትክክለኛነት ማረጋገጫ',
        category: 'ምርምር እና ማረጋገጫ',
        date: 'ጥር 2023',
        location: 'ካምብሪጅ፣ ዩናይትድ ኪንግደም',
        image: '/images/microbiology-grid.jpg',
        summary:
          'በተረጋገጠ የማይክሮባዮሎጂ ምርምር ማዕከል ውስጥ የተደረገ ጥብቅ ገለልተኛ የትንታኔ ማረጋገጫ፣ የባክቴሪያ ቆጠራ ትክክለኛነት እና የሙቀት መረጋጋት ሙከራ።',
        details: {
          objective:
            'የመመርመሪያውን አነስተኛ የመለየት አቅም (LOD) እና የኮምፒውተር እይታ የባክቴሪያ ቆጠራ ትክክለኛነትን በኢ.ኮላይ ናሙናዎች ላይ ማረጋገጥ።',
          method:
            'ከ 1 እስከ 200 ባክቴሪያ በ 100 ሚሊ ሊትር ናሙና ላይ በመሞከር፣ የኮምፒውተር አውቶማቲክ ቆጠራን ከማይክሮባዮሎጂስቶች የእጅ ቆጠራ ጋር ማወዳደር።',
          keyFindings: [
            'በ 100 ሚሊ ሊትር ናሙና ውስጥ 1 ባክቴሪያ እንኳን የመለየት ከፍተኛ ብቃት አሳይቷል።',
            'በአውቶማቲክ ካሜራ ቆጠራ እና በባለሙያዎች የእጅ ቆጠራ መካከል ከፍተኛ ተዛምዶ (R² > 0.97) ተመዝግቧል።',
            'ከ 15°C እስከ 40°C ባለው ውጫዊ የሙቀት መለዋወጥ ውስጥ የ ±0.3°C ትክክለኛ የኢንኩቤሽን ሙቀትን ጠብቋል።',
          ],
          partner: 'ገለልተኛ የማይክሮባዮሎጂ ማረጋገጫ ተቋማት ህብረት',
        },
      },
      {
        id: 'ethiopia-wash-workshops',
        categoryKey: 'community',
        title: 'የዋሽ ኮሚቴ የአቅም ግንባታ እና ፈጣን የውሃ ደህንነት ካርታ ስራ',
        category: 'የማህበረሰብ ስልጠናዎች',
        date: 'ህዳር 2023',
        location: 'የኦሮሚያ እና አማራ ክልሎች፣ ኢትዮጵያ',
        image: '/images/hero-water-testing.jpg',
        summary:
          'ለማህበረሰብ የውሃ አስተዳዳሪዎች እና ለአካባቢ ጤና ባለሙያዎች የአካባቢውን የመጠጥ ውሃ ደህንነት በካርታ እንዲለዩ እና የብክለት መንገዶችን እንዲያውቁ የተሰጠ የተግባር ስልጠና።',
        details: {
          objective:
            'የወረዳ የውሃ ዴስክ ሰራተኞች እና የማህበረሰብ የውሃ ተቆጣጣሪዎች ውድ የላብራቶሪ መላኪያዎችን ሳይጠብቁ በራሳቸው የባክቴሪያ ምርመራ እንዲያደርጉ ማብቃት።',
          method:
            'የ 3 ቀናት የተግባር ስልጠና፡ የመስክ ናሙና መውሰድ፣ በቫኪዩም ማጣራት፣ ኢንኩቤሽን መከታተል እና ዲጂታል ውጤቶችን መመዝገብ።',
          keyFindings: [
            '28 የማህበረሰብ ቴክኒሻኖች የውሃ ምርመራን በራሳቸው እንዲያካሂዱ ሰልጥነው ሰርተፍኬት አግኝተዋል።',
            'በ 42 ማህበረሰብ የውሃ ቦታዎች ላይ ምርመራ ተካሂዶ የክሎሪን ህክምና የሚያስፈልጋቸው 9 የተጋለጡ ጉድጓዶች ተለይተዋል።',
            'በገለልተኛ የመስክ ቁጥጥር ወቅት 100% ትክክለኛ የአሰራር ደንብ ተገዢነት ታይቷል።',
          ],
          partner: 'የክልል የውሃ ቢሮዎች እና የማህበረሰብ የውሃ አስተዳዳሪዎች መረብ',
        },
      },
      {
        id: 'flooded-infrastructure',
        categoryKey: 'humanitarian',
        title: 'በጎርፍ ለተጎዱ መሠረተ ልማቶች የተዘጋጀ ፈጣን የውሃ ምርመራ ፕሮቶኮል',
        category: 'ሰብአዊ የዋሽ (WASH) ፕሮግራሞች',
        date: 'ሚያዚያ 2024',
        location: 'ደቡብ እስያ እና ላቲን አሜሪካ',
        image: '/images/portable-kit-system.jpg',
        summary:
          'ከባድ የአየር ንብረት መዛባት እና የከተማ ውሃ ቧንቧዎች በጎርፍ ከተጥለቀለቁ በኋላ ፈጣን የውሃ ጥራት ግምገማ ለማድረግ የሚያስችል የአስቸኳይ ጊዜ ፕሮቶኮል ማዘጋጀት።',
        details: {
          objective:
            'ከጎርፍ አደጋ በኋላ ባለው አስቸኳይ ጊዜ ውስጥ የተንቀሳቃሽ መመርመሪያ ኪቶችን የስምሪት ፍጥነት እና የምርመራ ጊዜ መገምገም።',
          method:
            'ውሃ በማያስገባ ጠንካራ ሻንጣ የተዘጋጁ የመስክ ኪቶች ሙሉ በሙሉ በውስጣቸው ባለው ባትሪ ብቻ አገልግሎት እንዲሰጡ ተደርገዋል።',
          keyFindings: [
            'መንገዶች በጎርፍ በተዘጉበት ወቅት ናሙናዎችን ወደ ላብራቶሪ ለመላክ የሚባክነውን ጊዜ አስቀርቷል።',
            'የህዝብ ጤና ቡድኖች ንፁህ የውሃ ማከፋፈያ ቦታዎችን በጥቂት ሰዓታት ውስጥ እንዲለዩ አስችሏል።',
            'የክሎሪን መጠንን እና የአስቸኳይ ጊዜ ህክምናን ለማስተባበር የቦታ መረጃ ያለውን የምርመራ ውጤት አቅርቧል።',
          ],
          partner: 'የአስቸኳይ ጊዜ እርዳታ እና የዋሽ ግብረ-ኃይል',
        },
      },
    ],
  },

  // Afaan Oromoo (om)
  om: {
    badge: 'Qorannoo fi Dhiibbaa Dirree Addunyaa',
    title: 'Dhiibbaa Dhugaa. Dirreetti Kan Mirkanaa\'e.',
    desc: 'Boolla bishaanii baadiyyaa fi buufata baqattootaa irraa kaasee hanga buufata fayyaa fi laabraatoorii mirkanaa\'etti, teknooloojiin keenya bakka nageenyi bishaan dhugaatii caalmaatti barbaachisutti akka hojjetuuf ijaarame.',
    metric1Val: 'Sa\'aatii 8 hanga 21',
    metric1Label: 'Qorannoo Saffisaa E. koli fi Koliifoormii',
    metric2Val: '1 CFU / 100mL',
    metric2Label: 'Ulaagaa Qorannoo ISO 9308-1',
    metric3Val: 'Qabbaneessaa Hin Barbaanne',
    metric3Label: 'Qoricha Qilleensa Irratti Tursiifamu',
    filterLabel: 'Piroojektiiwwan Filadhaa:',
    categories: {
      all: 'Hojiiwwan Hundumaa',
      field: 'Qorannoo Dirree',
      humanitarian: 'WASH fi Gargaarsa Namoomaa',
      research: 'Qorannoo fi Mirkaneessa',
      community: 'Leenjii Hawaasaa',
    },
    showingText: (count: number) => `Piroojektiiwwan ${count} mul'achaa jiru`,
    verifiedBadge: 'Galmee Dirree Mirkanaa\'e',
    viewCaseStudy: 'Qorannoo Guutuu Ilaalaa',
    closeCaseStudy: 'Cufaa',
    projectDetails: 'Bal\'ina Mirkaneessa Dirree fi Mala Hojii',
    objectiveLabel: 'Kaayyoo Hojii',
    methodLabel: 'Pirootokoolii fi Mala Qorannoo',
    findingsLabel: 'Bu\'aalee Ijoo fi Argannoowwan Dirree',
    partnerLabel: 'Dhaabbata Tumsaa / Qooda Fudhattoota',
    inquireButton: 'Waa\'ee Walta\'iinsa Walfakkaatuu Gaafadhaa',
    sdgTag: 'Galma Misooma Waaraa UN 6',
    sdgTitle: 'Hundumaaf Bishaan Qulqulluu fi Nageenya Mirkaneessuu',
    sdgDesc:
      'Galmi 6.1 bishaan dhugaatii hundumaaf qaqqabamaa gochuu irratti xiyyeeffata. Kittiiwwan durii baasii guddaa fi yeroo dheeraa fudhatu. AquaScope teknooloojii calallii meembireenii ammayyaatiin garaagarummaa kana guuta.',
    sdgButton: 'Waa\'ee Kaayyoo Keenyaa Baraa',
    principlesTitle: 'Qajeeltoowwan Bu\'uuraa Hojiirra Jiran',
    principles: [
      {
        title: 'Hojjettootaaf Kan Mijaate',
        desc: 'Ogeessota leenjii laabraatoorii xiqqaa qabaniif kan qophaa\'e.',
      },
      {
        title: 'Ragaa Dhugaa',
        desc: 'Ulaagaalee ISO 9308-1 qofa bu\'uureffata.',
      },
      {
        title: 'Daataa Banaa',
        desc: 'Bu\'aan qorannoo hawaasa fi biiroo fayyaatiif ifatti qoodama.',
      },
    ],
    pilotTitle: 'Piroojektii Qorannoo Qulqullina Bishaanii Nu Wajjin Karoorsaa',
    pilotDesc:
      'Qorannoo bishaan dhugaatii amansiisaa gochuuf dhaabbilee miti-mootummaa, ministeera fayyaa fi dhaabbilee bishaanii wajjin hojjenna.',
    pilotBtn1: 'Waa\'ee Walta\'iinsaa Mari\'adhaa',
    pilotBtn2: 'Teknooloojii Ilaalaa',
    projects: [
      {
        id: 'aidex-geneva',
        categoryKey: 'humanitarian',
        title: 'Agarsiisa Teknooloojii Qulqullina Bishaanii Fooramii Namoomaa AidEx Irratti',
        category: 'WASH fi Gargaarsa Namoomaa',
        date: 'Onkololeessa 2023',
        location: 'Jiineevaa, Siwiizarlaand',
        image: '/images/hero-water-testing.jpg',
        summary:
          'Kittii qorannoo bishaanii socho\'aa dhaabbilee gargaarsa namoomaa fi qindeessitoota balaa addunyaatiif agarsiisuu.',
        details: {
          objective:
            'Qorannoo koliifoormii sa\'aatii 8 saffisaa fi calallii meembireenii dirree ogeessota WASHtiif agarsiisuu.',
          method:
            'Fakkeenya bishaanii fayyadamuun agarsiisa kallattii calallii kaartirijii, hoo’isaa fi teelemeetirii agarsiisuu.',
          keyFindings: [
            'Dhaabbileen namoomaa 40 ol yaalii dirree gochuuf fedhii agarsiisaniiru.',
            'Barbaachisummaan qorannoo batiriin hojjetuu fi qabbaneessaa hin barbaanne mirkanaa\'eera.',
            'Mariyannoo yaalii buufata baqattootaa irratti qorannoo bishaanii gaggeessuu eegalameera.',
          ],
          partner: 'Qooda Fudhattoota WASH Namoomaa fi Kora AidEx',
        },
      },
      {
        id: 'tanzania-kenya-boreholes',
        categoryKey: 'field',
        title: 'Hordoffii Baakteeriyaa Iddoowwan Bishaan Hawaasa Baadiyyaa',
        category: 'Qorannoo Dirree',
        date: 'Bitooteessa – Waxabajjii 2023',
        location: 'Afrikaa Bahaa (Taanzaaniyaa fi Keeniyaa)',
        image: '/images/portable-kit-system.jpg',
        summary:
          'Iddoowwan bishaanii baadiyyaa 65 irratti yaalii dirree kittii qorannoo socho\'aa gaggeessuu.',
        details: {
          objective:
            'Mijaatinna, sirrummaa fi cimina kittii socho\'aa qorannoo laabraatoorii idilee waliin madaaluu.',
          method:
            'Fakkeenya bishaanii 100mL poompii socho\'aa fi laabraatoorii idilee ulaagaa ISO 9308-1tiin walbira qabuun qorachuu.',
          keyFindings: [
            'Bu\'aa laabraatoorii idilee waliin wal-simannaa 98.4% agarsiiseera.',
            'Bu\'aan sa\'aatii 48-72 eeguu osoo hin barbaachisin sa\'aatii 8 hanga 21tti argameera.',
            'Ogeessonni bishaanii naannoo leenjii sa\'aatii 2 gadiin meeshaa fayyadamuu danda\'aniiru.',
          ],
          partner: 'Abbaa Taayitaa Bishaanii Naannoo fi Koreewwan Fayyaa Hawaasaa',
        },
      },
      {
        id: 'iso-lab-validation',
        categoryKey: 'research',
        title: 'Mirkaneessa Sirrii Laabraatoorii ISO 17025tiin Beekkame',
        category: 'Qorannoo fi Mirkaneessa',
        date: 'Amajjii 2023',
        location: 'Kaambiriij, Yuunaayitid Kingidam',
        image: '/images/microbiology-grid.jpg',
        summary:
          'Giddugala qorannoo maayikiroobaayoloojii keessatti qorannoo sirrii lakkoofsa baakteeriyaa fi tasgabbii hoo\'aa gaggeessuu.',
        details: {
          objective:
            'Daangaa gadi aanaa baakteeriyaa argachuu fi sirrummaa lakkoofsa kaameraa E. koli irratti mirkaneessuu.',
          method:
            'Baay\'ina baakteeriyaa 1 hanga 200mL qorachuun lakkoofsa kompiitaraa fi kan ogeessaa walbira qabanii madaaluu.',
          keyFindings: [
            'Fakkeenya 100mL keessatti baakteeriyaa 1 qofa adda baasuu danda\'eera.',
            'Lakkoofsa kaameraa fi kan ogeessota gidduutti wal-simannaa olaanaan (R² > 0.97) argameera.',
            'Hoo\'a qilleensaa 15°C hanga 40°C gidduutti tasgabbii hoo\'aa ±0.3°C eegeera.',
          ],
          partner: 'Gamtaa Mirkaneessa Maayikiroobaayoloojii Walabaa',
        },
      },
      {
        id: 'ethiopia-wash-workshops',
        categoryKey: 'community',
        title: 'Ijaarsa Dandeettii Koree WASH fi Kaartaa Nageenya Bishaanii Saffisaa',
        category: 'Leenjii Hawaasaa',
        date: 'Sadaasa 2023',
        location: 'Naannolee Oromiyaa fi Amaaraa, Itoophiyaa',
        image: '/images/hero-water-testing.jpg',
        summary:
          'Eegduuwwan bishaan hawaasaa fi ogeessota fayyaatiif leenjii hojii qorannoo fi kaartaa nageenya bishaanii kennuu.',
        details: {
          objective:
            'Ogeessonni aanaa fi eegduuwwan bishaanii osoo laabraatoorii hin eegin ofumaan baakteeriyaa akka qoratan dandeessisuu.',
          method:
            'Leenjii guyyoota 3: fakkeenya fuudhuu, calallii vaakiyuumii, hoo’isuu fi galmee bu\'aa dijitaalaa.',
          keyFindings: [
            'Teknishaanonni hawaasaa 28 qorannoo bishaanii ofumaan gaggeessuuf leenji\'anii waraqaa ragaa fudhataniiru.',
            'Iddoowwan bishaanii 42 qorachuun boollawwan yaalii klooriinii barbaadan 9 adda baafamaniiru.',
            'Hordoffii walabaatiin qajeelfama hojii 100% sirriitti hordofuun mirkanaa\'eera.',
          ],
          partner: 'Biiroowwan Bishaanii Naannoo fi Hawaasa Eegduu Bishaanii',
        },
      },
      {
        id: 'flooded-infrastructure',
        categoryKey: 'humanitarian',
        title: 'Pirootokoolii Qorannoo Bishaanii Bu\'uuraalee Loolaatiin Manca\'aniif',
        category: 'WASH fi Gargaarsa Namoomaa',
        date: 'Ebla 2024',
        location: 'Eeshiyaa Kibbaa fi Laatiin Ameerikaa',
        image: '/images/portable-kit-system.jpg',
        summary:
          'Balaan loolaa fi dhangala\'aan erga ga\'ee booda qulqullina bishaanii saffisaan sakatta\'uuf pirootokoolii qopheessuu.',
        details: {
          objective:
            'Balaa loolaa booda yeroo ariifachiisaa keessatti saffisa sassaabbiifi qorannoo kittiiwwan socho\'aa madaaluu.',
          method:
            'Kittiiwwan qodaa bishaan hin galchine keessatti qophaa\'an guutummaatti batirii keessootti fayyadamu.',
          keyFindings: [
            'Karaaleen loolaan yeroo cufamanitti yeroo laabraatoorii eeguu hambiseera.',
            'Gareen fayyaa hawaasaa iddoowwan bishaan dhugaatii nagaa ta\'an sa\'aatii muraasa keessatti adda baasaniiru.',
            'Yaalii klooriinii qindeessuuf bu\'aa qorannoo GPS qabu dhiyeesseera.',
          ],
          partner: 'Garee Hojii Ariifachiisaa fi WASH',
        },
      },
    ],
  },

  // Tigrinya (ti)
  ti: {
    badge: 'ዓለም ለኸ ናይ ሜዳ ፈተነታትን ተፅዕኖን',
    title: 'ኣብ ሜዳ ዝተረጋገፀ ሓቀኛ ተፅዕኖ።',
    desc: 'ካብ ናይ ገጠር ናይ ማይ ጉድጓዳትን መዕቆቢ ስደተኛታትን ጀሚሩ ክሳብ ናይ ጥዕና ኬላታትን ዓለም ለኸ ላቦራቶሪታትን፣ ናይ ማይ መመርመሪ ቴክኖሎጂና ድሕንነት መስተ ማይ ኣብ ዝድለየሎም ቦታታት ኩሉ ውሑስ ኣገልግሎት ንምሃብ ዝተዳለወ እዩ።',
    metric1Val: 'ካብ 8 ክሳብ 21 ሰዓት',
    metric1Label: 'ቅልጡፍ ናይ ኢ.ኮላይን ኮሊፎርምን መርመራ',
    metric2Val: '1 CFU / 100mL',
    metric2Label: 'ናይ ISO 9308-1 ናይ መርመራ መዐቀኒ',
    metric3Val: 'መዝሓሊ ዘየድልዮ',
    metric3Label: 'ኣብ ንቡር ሙቐት ዝጓዓዝ ከሚካል',
    filterLabel: 'ፕሮጀክትታት ምረፁ፡',
    categories: {
      all: 'ኩሎም ስራሕቲ',
      field: 'ናይ ሜዳ ፈተነታት',
      humanitarian: 'ሰብኣዊ ናይ ዋሽ (WASH) መደባት',
      research: 'ምርምርን መረጋገፅን',
      community: 'ናይ ማሕበረሰብ ስልጠናታት',
    },
    showingText: (count: number) => `${count} ፕሮጀክትታት ይርኣዩ ኣለዉ`,
    verifiedBadge: 'ዝተረጋገፀ ናይ ሜዳ መዝገብ',
    viewCaseStudy: 'ምሉእ መፅናዕቲ ርኣዩ',
    closeCaseStudy: 'ዕፀው',
    projectDetails: 'ናይ ሜዳ መረጋገፅን ናይ ኣሰራርሓ ሜላን ዝርዝር',
    objectiveLabel: 'ናይ ስራሕ ቀንዲ ዕላማ',
    methodLabel: 'ናይ መርመራ ፕሮቶኮልን ሜላን',
    findingsLabel: 'ቀንዲ ውፅኢታትን ናይ ሜዳ ርክባትን',
    partnerLabel: 'መሻርኽቲ ትካል / መዳርግቲ ኣካል',
    inquireButton: 'ብዛዕባ ተመሳሳሊ ሽርክነት ሕተቱ',
    sdgTag: 'ናይ ውድብ ሕቡራት ሃገራት ዝላቒ ልምዓት ሸቶ 6',
    sdgTitle: 'ንኹሉ ሰብ ፅሩይ ማይን ድሕንነትን ምርግጋፅ',
    sdgDesc:
      'ሸቶ 6.1 ንኹሉ ሰብ ፍትሓውን ተበፃሕን መስተ ማይ ምርካብ እዩ። ልሙዳት ናይ ላቦራቶሪ ኪታታት ክቡራትን ግዜ ዝወስዱን እዮም። AquaScope ኣብ ቦትኡ ብቑፅሪ ውፅኢት ብዝህብ ናይ ሜምብሬን ቴክኖሎጂ ነዚ ክፍተት ይሞልኦ።',
    sdgButton: 'ብዛዕባ ዕላማና ብዝበለፀ ፍለጡ',
    principlesTitle: 'መሰረታዊ መትከላትና ኣብ ተግባር',
    principles: [
      {
        title: 'ንተጠቃሚ ምቹእ ዝኾነ ዲዛይን',
        desc: 'ውሑድ ናይ ላቦራቶሪ ስልጠና ንዘለዎም ሰራሕተኛታት ሜዳ ዝተዳለወ።',
      },
      {
        title: 'ግሉፅን ሳይንሳውን ሓቂ',
        desc: 'መምርሒታት ISO 9308-1 ጥራሕ ዝኽተል መርመራ።',
      },
      {
        title: 'ክፉት ሓበሬታ',
        desc: 'ውፅኢት መርመራ ንማሕበረሰባትን ንቢሮታት ጥዕናን ብግልፂ ይከፋፈል',
      },
    ],
    pilotTitle: 'ናይ ማይ ፅሬት ናይ ፈተነ ፕሮጀክት ምሳና ይደልዉ',
    pilotDesc:
      'ውሑስ ናይ መስተ ማይ መርመራ ተግባራዊ ንምግባር ምስ ዘይመንግስታውያን ትካላት፣ ሚኒስቴር ጥዕና፣ ትካላት ማይን ማእኸላት ምርምርን ብሓባር ንሰርሕ።',
    pilotBtn1: 'ብዛዕባ ሽርክነት ተመያየጡ',
    pilotBtn2: 'ቴክኖሎጂ ርኣዩ',
    projects: [
      {
        id: 'aidex-geneva',
        categoryKey: 'humanitarian',
        title: 'ኣብ ፎረም ሰብኣዊ ረድኤት AidEx ዝቐረበ ናይ ቴክኖሎጂ ማይ ምርኢት',
        category: 'ሰብኣዊ ናይ ዋሽ (WASH) መደባት',
        date: 'ጥቅምቲ 2023',
        location: 'ጄኔቫ፣ ስዊዘርላንድ',
        image: '/images/hero-water-testing.jpg',
        summary:
          'ተንቀሳቓሲ ናይ ማይ መመርመሪ ኪት ንትካላት ሰብኣዊ ረድኤትን ንናይ ህፁፅ ግዜ ሰራሕተኛታት ዋሽን ምልላይ።',
        details: {
          objective:
            'ቅልጡፍ ናይ 8 ሰዓታት ናይ ኮሊፎርም መርመራን ተንቀሳቓሲ ሜምብሬን ምፅራይን ንሰብኣዊ ረድኤት ሰራሕተኛታት ምርኣይ።',
          method:
            'ናይ ማይ ናሙናታት ብምጥቃም ናይ ቀጥታ ምርኢት ምግባር፣ ብብረት ካርትሪጅ ምፅራይ፣ ኢንኩቤሽንን ቴሌሜትሪ ምርኣይን።',
          keyFindings: [
            'ካብ 40 ንላዕሊ ትካላት ሰብኣዊ ረድኤት ፈተነ ንምግባር ድሌት ኣርእዮም።',
            'መዝሓሊ ዘየድልዮን ብባትሪ ዝሰርሕን መመርመሪ ዘለዎ ኣገዳስነት ተረጋጊፁ።',
            'ኣብ መዕቆቢ ስደተኛታት መርመራ ንምግባር ዝርርብ ተጀሚሩ።',
          ],
          partner: 'መሻርኽቲ ዋሽ ሰብኣዊ ረድኤትን ጉባኤ AidExን',
        },
      },
      {
        id: 'tanzania-kenya-boreholes',
        categoryKey: 'field',
        title: 'ናይ ገጠር ማሕበረሰብ ናይ ማይ ቦታታት ናይ ባክቴርያ ምክትታል',
        category: 'ናይ ሜዳ ፈተነታት',
        date: 'መጋቢት – ሰነ 2023',
        location: 'ምብራቕ ኣፍሪቃ (ታንዛንያን ኬንያን)',
        image: '/images/portable-kit-system.jpg',
        summary:
          'ኣብ 65 ናይ ገጠር ናይ ማይ ቦታታት ዝተገበረ ናይ ተንቀሳቓሲ መመርመሪ ኪት ናይ ሜዳ ፈተነ።',
        details: {
          objective:
            'ናይቲ ተንቀሳቓሲ ኪት ኣጠቓቕማን ትኽክለኛነትን ምስ ስሩዕ ናይ ላቦራቶሪ መርመራ ምውድዳር።',
          method:
            '100 ሚሊ ሊትር ናሙናታት ብተንቀሳቓሲ ኪትን ብስሩዕ ላቦራቶሪን ብ ISO 9308-1 መሰረት ብጎኒ ንጎኒ ምምርማር።',
          keyFindings: [
            'ምስ ናይ ላቦራቶሪ ውፅኢት 98.4% ትኽክለኛ ምትእስሳር ኣርእዩ።',
            'ውፅኢት ኣብ ክንዲ 48-72 ሰዓታት ብ 8 ክሳብ 21 ሰዓታት ውሽጢ በፂሑ።',
            'ናይ ከባቢ ሰራሕተኛታት ማይ ብትሕቲ 2 ሰዓት ስልጠና ብቐሊሉ ተጠቒሞምሉ።',
          ],
          partner: 'ናይ ከባቢ ምምሕዳር ማይን ኮሚቴታት ጥዕና ማሕበረሰብን',
        },
      },
      {
        id: 'iso-lab-validation',
        categoryKey: 'research',
        title: 'ብ ISO 17025 ፍቓድ ዝተረኸበሉ ናይ ላቦራቶሪ ትኽክለኛነት መረጋገፂ',
        category: 'ምርምርን መረጋገፅን',
        date: 'ጥሪ 2023',
        location: 'ካምብሪጅ፣ ዩናይትድ ኪንግደም',
        image: '/images/microbiology-grid.jpg',
        summary:
          'ኣብ ዝተረጋገፀ ናይ ማይክሮባዮሎጂ ማእኸል ምርምር ዝተገበረ ናይ ባክቴርያ ቆፀራ ትኽክለኛነትን ናይ ሙቐት ምርግጋእን ፈተነ።',
        details: {
          objective:
            'ዝተሓተ ናይ ምፍላጥ ዓቕምን ናይ ኮምፒውተር ቆፀራ ትኽክለኛነትን ኣብ ኢ.ኮላይ ናሙናታት ምርግጋፅ።',
          method:
            'ካብ 1 ክሳብ 200 ባክቴርያ ኣብ 100 ሚሊ ሊትር ናሙና ብምፍታን፣ ናይ ኮምፒውተር ቆፀራ ምስ ናይ ኢድ ቆፀራ ምውድዳር።',
          keyFindings: [
            'ኣብ 100 ሚሊ ሊትር ናሙና 1 ባክቴርያ እውን ናይ ምፍላጥ ልዑል ብቕዓት ኣርእዩ።',
            'ኣብ መንጎ ቆፀራ ካሜራን ቆፀራ ሰብ ሞያን ልዑል ምትእስሳር (R² > 0.97) ተመዝጊቡ።',
            'ካብ 15°C ክሳብ 40°C ኣብ ዘሎ ናይ ደገ ሙቐት ±0.3°C ትኽክለኛ ሙቐት ሓልዩ።',
          ],
          partner: 'ናፃ ናይ ማይክሮባዮሎጂ መረጋገፂ ትካላት ጥምረት',
        },
      },
      {
        id: 'ethiopia-wash-workshops',
        categoryKey: 'community',
        title: 'ናይ ኮሚቴ ዋሽ ናይ ዓቕሚ ህንፀትን ቅልጡፍ ናይ ማይ ድሕንነት ካርታን',
        category: 'ናይ ማሕበረሰብ ስልጠናታት',
        date: 'ሕዳር 2023',
        location: 'ክልላት ኦሮምያን ኣምሓራን፣ ኢትዮጵያ',
        image: '/images/hero-water-testing.jpg',
        summary:
          'ንናይ ማሕበረሰብ ናይ ማይ ተኸታተልትን ሰብ ሞያ ጥዕናን ናይ መስተ ማይ ድሕንነት ብካርታ ንምፍላጥን ናይ ብከላ መንገዲ ንምልላይን ዝተወሃበ ተግባራዊ ስልጠና።',
        details: {
          objective:
            'ናይ ወረዳ ሰራሕተኛታት ማይ ክቡር ናይ ላቦራቶሪ ምልኣኽ ከይተፀበዩ ባዕሎም መርመራ ክገብሩ ምኽኣል።',
          method:
            'ናይ 3 መዓልታት ስልጠና: ናሙና ምውሳድ፣ ብቫክዩም ምፅራይ፣ ኢንኩቤሽን ምክትታልን ዲጂታል ምምዝጋብን።',
          keyFindings: [
            '28 ሰራሕተኛታት ማሕበረሰብ ባዕሎም መርመራ ንምክያድ ሰልጢኖም ሰርተፍኬት ረኺቦም።',
            'ኣብ 42 ናይ ማይ ቦታታት መርመራ ተኻይዱ ሕክምና ክሎሪን ዘድልዮም 9 ጉድጓዳት ተፈሊዮም።',
            'ኣብ ናፃ ናይ ሜዳ ቁፅፅር 100% ትኽክለኛ ኣሰራርሓ ተራእዩ።',
          ],
          partner: 'ዞባዊ ቢሮታት ማይን መርበብ ሓለውቲ ማይ ማሕበረሰብን',
        },
      },
      {
        id: 'flooded-infrastructure',
        categoryKey: 'humanitarian',
        title: 'ብውሕጅ ንዝተጎድኡ መሰረተ ልምዓታት ዝተዳለወ ቅልጡፍ ናይ ማይ መርመራ ፕሮቶኮል',
        category: 'ሰብኣዊ ናይ ዋሽ (WASH) መደባት',
        date: 'ሚያዝያ 2024',
        location: 'ደቡብ እስያን ላቲን ኣሜሪካን',
        image: '/images/portable-kit-system.jpg',
        summary:
          'ብሰንኪ ውሕጅ መስመራት ማይ ምስ ተበላሸዉ ቅልጡፍ ናይ ፅሬት ማይ ገምጋም ንምግባር ዘኽእል ናይ ህፁፅ ግዜ ፕሮቶኮል ምድላው።',
        details: {
          objective:
            'ድሕሪ ውሕጅ ኣብ ዘሎ ህፁፅ ግዜ ናይ ተንቀሳቐስቲ ኪታት ናይ ምብፃሕ ቅልጣፈን ናይ መርመራ ግዜን ምግምጋም።',
          method:
            'ማይ ኣብ ዘየእቱ ሻንጣ ዝተዳለዉ ኪታት ምሉእ ብምሉእ ብውሽጣዊ ባትሪ ጥራሕ ኣገልግሎት ክህቡ ተገይሩ።',
          keyFindings: [
            'መንገድታት ብውሕጅ ኣብ ዝተዓፀውሉ ግዜ ናሙና ናብ ላቦራቶሪ ንምልኣኽ ዝባኽን ግዜ ኣትርፉ።',
            'ናይ ህዝባዊ ጥዕና ጋንታታት ፅሩይ መከፋፈሊ ቦታታት ብሒደት ሰዓታት ከለልዩ ኣኽኢሉ።',
            'ናይ ክሎሪን መጠንን ህፁፅ ሕክምናን ንምውዳድ ሓበሬታ ቦታ ዘለዎ ውፅኢት ኣቕሪቡ።',
          ],
          partner: 'ናይ ህፁፅ ግዜ ረድኤትን ናይ ዋሽ ሓይሊ ዕማምን',
        },
      },
    ],
  },
};
