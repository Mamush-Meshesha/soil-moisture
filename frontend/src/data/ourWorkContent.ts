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

const data: Record<string, OurWorkPageContent> = {
  // English (en)
  en: {
    badge: 'Slide 8: Traction & Institutional Confidence',
    title: 'Traction & Institutional Confidence',
    desc: 'We have validated the system through prior pilots in Ethiopia and Kenya, demonstrating usability in real field conditions. We have engaged with the Ministry of Health through technician training programs. And we have received a Letter of Intent from Action Against Hunger for up to 30 units. This shows growing institutional confidence in a locally manufactured solution.',
    metric1Val: 'Up to 30 Units',
    metric1Label: 'Letter of Intent (Action Against Hunger)',
    metric2Val: '8 to 21 hrs',
    metric2Label: 'Rapid Early Warning & Quantitative Results',
    metric3Val: 'Up to 80%',
    metric3Label: 'Cost Reduction Through Local Manufacturing',
    filterLabel: 'Filter Initiatives:',
    categories: {
      all: 'All Initiatives',
      field: 'Field Validation',
      humanitarian: 'Humanitarian WASH',
      research: 'Academic Collaboration',
      community: 'Technician Training',
    },
    showingText: (count: number) => `Showing ${count} initiatives`,
    verifiedBadge: 'Institutional Confidence',
    viewCaseStudy: 'View Initiative Details',
    closeCaseStudy: 'Close Initiative Details',
    projectDetails: 'Field Validation & Institutional Details',
    objectiveLabel: 'Operational Objective',
    methodLabel: 'Implementation Method',
    findingsLabel: 'Key Outcomes & Findings',
    partnerLabel: 'Stakeholder / Collaborating Partner',
    inquireButton: 'Connect for Collaboration',
    sdgTag: 'Equitable Innovation',
    sdgTitle: 'What Makes Us Different',
    sdgDesc:
      'What differentiates us is not only the device — but the systems innovation model. This shifts water testing from external dependency to regional resilience. Strengthening local capacity ensures communities can manage their water resources effectively and sustainably over time.',
    sdgButton: 'Learn More About Our Team',
    principlesTitle: 'Core Systems Principles',
    principles: [
      {
        title: 'Cost Reduction',
        desc: 'Local manufacturing significantly lowers costs by up to 80%, making water testing accessible to communities in need.',
      },
      {
        title: 'Capacity Building',
        desc: 'Our approach builds local technical and research capacity within the country, empowering communities.',
      },
      {
        title: 'Self-Reliance',
        desc: 'Ensures communities can manage water resources sustainably over time, reducing dependency on imported diagnostics.',
      },
      {
        title: 'Job Opportunities',
        desc: 'Creating local manufacturing jobs empowers individuals and stimulates economic growth in regions affected by water scarcity.',
      },
    ],
    pilotTitle: 'The Collaboration Invitation',
    pilotDesc:
      'We are open to collaboration in research, scale, and deployment. We invite Canada–Africa academic collaboration — joint grants, co-supervision of students, pilot programs, and regional deployment strategies.',
    pilotBtn1: 'Discuss Collaboration',
    pilotBtn2: 'Explore System Features',
    projects: [
      {
        id: 'acf-letter-of-intent',
        categoryKey: 'humanitarian',
        title: 'Formal Letter of Intent: Action Against Hunger (ACF)',
        category: 'Humanitarian WASH',
        date: '2025 – 2026',
        location: 'Ethiopia & Regional Operations',
        image: '/images/waterscope-training-field.jpg',
        summary:
          'Formal Letter of Intent received for up to 30 units under consideration from Action Against Hunger(ACF), demonstrating growing institutional confidence in a locally manufactured solution.',
        details: {
          objective:
            'Procurement consideration of up to 30 portable WaterScope units for humanitarian emergency water quality monitoring.',
          method:
            'Demonstrating system usability and field testing readiness for rapid bacterial surveillance in low-resource humanitarian contexts.',
          keyFindings: [
            'Formal Letter of Intent received for up to 30 units under consideration from Action Against Hunger(ACF).',
            'Demonstrates growing institutional confidence in a locally manufactured solution.',
            'Shifts water testing from external dependency to regional resilience.',
          ],
          partner: 'Action Against Hunger (ACF)',
        },
      },
      {
        id: 'ethiopia-kenya-pilots',
        categoryKey: 'field',
        title: 'Prior Pilots in Ethiopia & Kenya: East African Field Testing',
        category: 'Field Validation',
        date: '2023 – 2025',
        location: 'Ethiopia & Kenya',
        image: '/images/field-testing-kenya.jpeg',
        summary:
          'Successful field testing and validation in East African contexts, demonstrating field usability in low-resource environments.',
        details: {
          objective:
            'Validating the open-source, field-adapted membrane filtration system in real East African field conditions.',
          method:
            'Field testing cartridge-based bacterial testing and automated colony detection across remote water points.',
          keyFindings: [
            'Successful field testing and validation in East African contexts.',
            'Demonstrated field usability in low-resource environments without central laboratory access.',
            'Benchmarked against ISO 9308 standards and externally validated.',
            'Early indication in as little as 8 hours and full quantitative results in 21 hours.',
          ],
          partner: 'WaterScope & East African Water Testing Partners',
        },
      },
      {
        id: 'moh-training-programs',
        categoryKey: 'community',
        title: 'Ministry of Health Engagement: Technician Training Programs',
        category: 'Technician Training',
        date: '2024 – 2026',
        location: 'Hawassa & Regional Centers, Ethiopia',
        image: '/images/training-hawassa-moh.png',
        summary:
          'Active training programs for water testing technicians, building government capacity and demonstrating system usability.',
        details: {
          objective:
            'Building local diagnostic and technical capacity across government water testing personnel.',
          method:
            'Hands-on technician training on cartridge filtration, thermal incubation, and automated digital reporting via mobile app and dashboard.',
          keyFindings: [
            'Active training programs for water testing technicians.',
            'Building government capacity and demonstrating system usability.',
            'Ensuring diagnostic capacity is built locally, sustained locally, and scaled locally.',
          ],
          partner: 'Ethiopian Ministry of Health',
        },
      },
      {
        id: 'local-manufacturing-progress',
        categoryKey: 'field',
        title: 'Early Progress: Manufacturing and Training',
        category: 'Field Validation',
        date: '2024 – 2026',
        location: 'Bahir Dar University (BiTec & Seifu BiT Maker Space)',
        image: '/images/manufacturing-3dprint.png',
        summary:
          'We have begun local manufacturing using 3D printing and machining technologies. We conduct training programs for water technicians. And we are building partnerships across sectors.',
        details: {
          objective:
            'Building a localized diagnostic ecosystem and lowering testing equipment costs by up to 80%.',
          method:
            'Utilizing 3D printing and CNC machining technologies at university maker spaces and incubation centers.',
          keyFindings: [
            'Local manufacturing significantly lowers costs by up to 80%, making water testing accessible.',
            'Began local manufacturing using 3D printing and machining technologies.',
            'Creating local manufacturing jobs empowers individuals and stimulates economic growth.',
            'Reduces dependency on fragile imported supply chains.',
          ],
          partner: 'Bahir Dar University, Centre for Global Equality, BiT Maker Space',
        },
      },
      {
        id: 'caacc-collaboration',
        categoryKey: 'research',
        title: 'Canada-Africa Academic Collaboration: Transforming Water Quality',
        category: 'Academic Collaboration',
        date: 'February 26-27, 2026',
        location: 'Canada-Africa Academic Collaborations Conference (CAACC)',
        image: '/images/waterscope-hero-nile.jpg',
        summary:
          'Presented by Yohannes Tamiru: Invitation for academic collaboration in research, scale, and deployment. Enabling work in environmental microbiology, antimicrobial resistance, and AI pathogen detection.',
        details: {
          objective:
            'Inviting Canada–Africa academic collaboration — joint grants, co-supervision of students, pilot programs, and regional deployment strategies.',
          method:
            'Collaborative platform enabling work in environmental microbiology, antimicrobial resistance surveillance, AI-driven pathogen detection, and implementation science.',
          keyFindings: [
            'Partner on pilot programs, regional rollouts, and integration with existing water quality monitoring systems.',
            'Collaboration with organizations in African nations actively engaged in water testing initiatives.',
            'Water surveillance should be equitable, collaborative, and locally empowered.',
          ],
          partner: 'Canada-Africa Academic Collaborations Conference (CAACC), Bahir Dar University',
        },
      },
    ],
  },

  // Amharic (am)
  am: {
    badge: 'ተጨባጭ ስራዎች እና የተቋማት እምነት',
    title: 'ተጨባጭ ስራዎች እና የተቋማት እምነት',
    desc: 'ስርዓቱን በኢትዮጵያ እና በኬንያ በቀደሙት ፓይለቶች አረጋግጠናል፤ ይህም በእውነተኛ የመስክ ሁኔታዎች ውስጥ ተጠቃሚነቱን አሳይቷል። በቴክኒሻን ማሰልጠኛ ፕሮግራሞች ከጤና ጥበቃ ሚኒስቴር ጋር ሰርተናል። እንዲሁም ከ Action Against Hunger እስከ 30 ለሚደርሱ ክፍሎች የፍላጎት ደብዳቤ ተቀብለናል። ይህ በአገር ውስጥ ለተመረተ መፍትሄ እያደገ የመጣውን የተቋማት እምነት ያሳያል።',
    metric1Val: 'እስከ 30 ኪቶች',
    metric1Label: 'የፍላጎት ደብዳቤ (Action Against Hunger)',
    metric2Val: 'ከ 8 እስከ 21 ሰዓት',
    metric2Label: 'ፈጣን የመጀመሪያ ምልክት እና አሃዛዊ ውጤት',
    metric3Val: 'እስከ 80%',
    metric3Label: 'በአገር ውስጥ ማምረት የሚገኝ የወጪ ቅነሳ',
    filterLabel: 'ስራዎችን ይምረጡ፡',
    categories: {
      all: 'ሁሉም ስራዎች',
      field: 'የመስክ ማረጋገጫ',
      humanitarian: 'ሰብአዊ WASH',
      research: 'የአካዳሚክ ትብብር',
      community: 'የቴክኒሻን ስልጠና',
    },
    showingText: (count: number) => `${count} ስራዎችን እያሳየ ነው`,
    verifiedBadge: 'የተረጋገጠ የተቋም እምነት',
    viewCaseStudy: 'ዝርዝሩን ይመልከቱ',
    closeCaseStudy: 'ዝርዝሩን ዝጋ',
    projectDetails: 'የመስክ ማረጋገጫ እና የተቋም ዝርዝሮች',
    objectiveLabel: 'ተግባራዊ ዓላማ',
    methodLabel: 'የአተገባበር ዘዴ',
    findingsLabel: 'ቁልፍ ውጤቶች እና ግኝቶች',
    partnerLabel: 'ተባባሪ አጋር / ባለድርሻ አካል',
    inquireButton: 'ለትብብር ያነጋግሩን',
    sdgTag: 'ፍትሃዊ ፈጠራ',
    sdgTitle: 'ልዩ የሚያደርገን ምንድን ነው?',
    sdgDesc:
      'ልዩ የሚያደርገን መሳሪያው ብቻ ሳይሆን የስርዓት ፈጠራ ሞዴሉ ነው። ይህ የውሃ ምርመራን ከውጭ ጥገኝነት ወደ ክልላዊ ጽናት ይለውጣል። የአገር ውስጥ አቅምን ማጠናከር ማህበረሰቦች የውሃ ሀብታቸውን በዘላቂነት እንዲያስተዳድሩ ያረጋግጣል።',
    sdgButton: 'ስለ ቡድናችን የበለጠ ይወቁ',
    principlesTitle: 'የስርዓቱ ዋና መርሆዎች',
    principles: [
      {
        title: 'የወጪ ቅነሳ',
        desc: 'የአገር ውስጥ ማምረት ወጪን እስከ 80% በከፍተኛ ሁኔታ ይቀንሳል፤ ይህም የውሃ ምርመራ ለተቸገሩ ማህበረሰቦች ተደራሽ ያደርገዋል።',
      },
      {
        title: 'አቅም ግንባታ',
        desc: 'አካሄዳችን በአገር ውስጥ የቴክኒክ እና የምርምር አቅምን ይገነባል፤ ማህበረሰቦች የውሃ ጥራት መፍትሄዎቻቸውን እንዲቆጣጠሩ ያበቃል።',
      },
      {
        title: 'ራስን መቻል',
        desc: 'ማህበረሰቦች የውሃ ሀብታቸውን በዘላቂነት እንዲያስተዳድሩ ያረጋግጣል፤ ይህም ከውጭ በሚገቡ ምርቶች ላይ ጥገኝነትን ይቀንሳል።',
      },
      {
        title: 'የስራ እድሎች',
        desc: 'የአገር ውስጥ የማኑፋክቸሪንግ ስራዎችን መፍጠር ግለሰቦችን ያበቃል እንዲሁም በውሃ እጥረት በተጎዱ አካባቢዎች የኢኮኖሚ እድገትን ያነቃቃል።',
      },
    ],
    pilotTitle: 'የትብብር ግብዣ',
    pilotDesc:
      'በምርምር፣ በማስፋፋት እና በተግባራዊ ስራዎች ላይ ለትብብር ክፍት ነን። የካናዳ-አፍሪካ አካዳሚክ ትብብርን እንጋብዛለን — የጋራ እርዳታዎች፣ የተማሪዎች የጋራ ቁጥጥር፣ የፓይለት ፕሮግራሞች እና የክልላዊ ማስፋፊያ ስልቶች።',
    pilotBtn1: 'ትብብርን ይወያዩ',
    pilotBtn2: 'የስርዓቱን ገጽታዎች ይመርምሩ',
    projects: [
      {
        id: 'acf-letter-of-intent',
        categoryKey: 'humanitarian',
        title: 'ይፋዊ የፍላጎት ደብዳቤ፡ Action Against Hunger (ACF)',
        category: 'ሰብአዊ WASH',
        date: '2025 – 2026',
        location: 'ኢትዮጵያ እና የቀጠናው ስራዎች',
        image: '/images/waterscope-training-field.jpg',
        summary:
          'ከ Action Against Hunger (ACF) እስከ 30 ለሚደርሱ ክፍሎች ይፋዊ የፍላጎት ደብዳቤ ተቀብለናል፤ ይህም በአገር ውስጥ ለተመረተ መፍትሄ እያደገ የመጣውን የተቋማት እምነት ያሳያል።',
        details: {
          objective:
            'ለአደጋ ጊዜ የሰብአዊ የውሃ ጥራት ክትትል እስከ 30 ለሚደርሱ ተንቀሳቃሽ የ WaterScope ኪቶች የግዢ ግምት።',
          method:
            'ዝቅተኛ ሀብት ባላቸው የሰብአዊ እርዳታ ሁኔታዎች ውስጥ ለፈጣን የባክቴሪያ ክትትል የስርዓቱን የመስክ ዝግጁነት ማሳየት።',
          keyFindings: [
            'ከ Action Against Hunger (ACF) እስከ 30 ለሚደርሱ ክፍሎች ግምት ውስጥ የገባ ይፋዊ የፍላጎት ደብዳቤ ተቀብለናል።',
            'በአገር ውስጥ ለተመረተ መፍትሄ እያደገ የመጣውን የተቋማት እምነት ያሳያል።',
            'የውሃ ምርመራን ከውጭ ጥገኝነት ወደ ክልላዊ ጽናት ይለውጣል።',
          ],
          partner: 'Action Against Hunger (ACF)',
        },
      },
      {
        id: 'ethiopia-kenya-pilots',
        categoryKey: 'field',
        title: 'ቀዳሚ ፓይለቶች በኢትዮጵያ እና ኬንያ፡ የመስክ ማረጋገጫ',
        category: 'የመስክ ማረጋገጫ',
        date: '2023 – 2025',
        location: 'ኢትዮጵያ እና ኬንያ',
        image: '/images/field-testing-kenya.jpeg',
        summary:
          'በምስራቅ አፍሪካ ሁኔታዎች የተሳካ የመስክ ሙከራ እና ማረጋገጫ ተካሂዷል፤ ይህም ዝቅተኛ ሀብት ባላቸው አካባቢዎች የመስክ ተጠቃሚነቱን አሳይቷል።',
        details: {
          objective:
            'በእውነተኛ የምስራቅ አፍሪካ የመስክ ሁኔታዎች ውስጥ ክፍት፣ ለመስክ የተስማማ የሜምብሬን ማጣሪያ ስርዓትን ማረጋገጥ።',
          method:
            'በሩቅ የውሃ ነጥቦች ላይ በካርትሪጅ ላይ የተመሰረተ የባክቴሪያ ምርመራ እና አውቶሜትድ የቅኝ ግዛት ቆጠራ የመስክ ሙከራ።',
          keyFindings: [
            'በምስራቅ አፍሪካ ሁኔታዎች የተሳካ የመስክ ሙከራ እና ማረጋገጫ ተካሂዷል።',
            'የላብራቶሪ መሠረተ ልማት በሌለባቸው ዝቅተኛ ሀብት አካባቢዎች የመስክ ተጠቃሚነቱ ተረጋግጧል።',
            'ከ ISO 9308 ደረጃዎች ጋር የተነጻጸረ እና በውጭ አካል የተረጋገጠ።',
            'ቀደም ያለ ምልክት በ 8 ሰዓት እና ሙሉ አሃዛዊ ውጤት በ 21 ሰዓት።',
          ],
          partner: 'WaterScope እና የምስራቅ አፍሪካ የውሃ ምርመራ አጋሮች',
        },
      },
      {
        id: 'moh-training-programs',
        categoryKey: 'community',
        title: 'ከጤና ጥበቃ ሚኒስቴር ጋር ያለው ግንኙነት፡ የቴክኒሻን ስልጠና ፕሮግራሞች',
        category: 'የቴክኒሻን ስልጠና',
        date: '2024 – 2026',
        location: 'ሀዋሳ እና የክልል ማዕከላት፣ ኢትዮጵያ',
        image: '/images/training-hawassa-moh.png',
        summary:
          'ለውሃ መመርመሪያ ቴክኒሻኖች ንቁ የስልጠና ፕሮግራሞች፣ የመንግስትን አቅም መገንባት እና የስርዓቱን ተጠቃሚነት ማሳየት።',
        details: {
          objective:
            'በመንግስት የውሃ መመርመሪያ ባለሙያዎች ዘንድ የአካባቢ ምርመራ እና ቴክኒካዊ አቅምን መገንባት።',
          method:
            'በካርትሪጅ ማጣራት፣ በሙቀት ኢንኩቤሽን እና በሞባይል መተግበሪያ ዲጂታል ሪፖርት አቀራረብ ላይ ተግባራዊ የቴክኒሻን ስልጠና።',
          keyFindings: [
            'ለውሃ መመርመሪያ ቴክኒሻኖች ንቁ የስልጠና ፕሮግራሞች ተካሂደዋል።',
            'የመንግስትን አቅም መገንባት እና የስርዓቱን ተጠቃሚነት ማሳየት ተችሏል።',
            'የመመርመር አቅም በአገር ውስጥ እንዲገነባ፣ በዚያው እንዲቀጥል እና በአገር ውስጥ እንዲስፋፋ ያረጋግጣል።',
          ],
          partner: 'የኢትዮጵያ ጤና ጥበቃ ሚኒስቴር',
        },
      },
      {
        id: 'local-manufacturing-progress',
        categoryKey: 'field',
        title: 'ቀደምት እድገት፡ ማኑፋክቸሪንግ እና ስልጠና',
        category: 'የመስክ ማረጋገጫ',
        date: '2024 – 2026',
        location: 'ባህር ዳር ዩኒቨርሲቲ (BiTec እና Seifu BiT Maker Space)',
        image: '/images/manufacturing-3dprint.png',
        summary:
          'የ 3D ህትመት እና የማሽን ቴክኖሎጂዎችን በመጠቀም የአገር ውስጥ ማምረት ጀምረናል። ለውሃ ቴክኒሻኖች የስልጠና ፕሮግራሞችን እናካሂዳለን። እንዲሁም በተለያዩ ዘርፎች ሽርክናዎችን እየገነባን ነው።',
        details: {
          objective:
            'የአካባቢያዊ የመመርመሪያ ስነ-ምህዳር መገንባት እና የመመርመሪያ መሳሪያዎች ወጪን እስከ 80% መቀነስ።',
          method:
            'በዩኒቨርሲቲው ሰይፉ ሜከር ስፔስ እና ኢንኩቤሽን ማዕከል የ 3D ህትመት እና ትክክለኛ የማሽን ቴክኖሎጂዎችን መጠቀም።',
          keyFindings: [
            'የአገር ውስጥ ማምረት ወጪን እስከ 80% በከፍተኛ ሁኔታ ይቀንሳል።',
            'የ 3D ህትመት እና የማሽን ቴክኖሎጂዎችን በመጠቀም የአገር ውስጥ ማምረት ተጀምሯል።',
            'የአገር ውስጥ የማኑፋክቸሪንግ ስራዎችን መፍጠር ግለሰቦችን ያበቃል እንዲሁም የኢኮኖሚ እድገትን ያነቃቃል።',
            'በቀላሉ በሚስተጓጎሉ የውጭ አቅርቦት ሰንሰለቶች ላይ ጥገኝነትን ይቀንሳል።',
          ],
          partner: 'ባህር ዳር ዩኒቨርሲቲ፣ Centre for Global Equality፣ BiT Maker Space',
        },
      },
      {
        id: 'caacc-collaboration',
        categoryKey: 'research',
        title: 'የካናዳ-አፍሪካ አካዳሚክ ትብብር፡ የውሃ ጥራትን መለወጥ',
        category: 'የአካዳሚክ ትብብር',
        date: 'የካቲት 26-27፣ 2026',
        location: 'የካናዳ-አፍሪካ የትምህርት ትብብር ጉባኤ (CAACC)',
        image: '/images/waterscope-hero-nile.jpg',
        summary:
          'በዮሐንስ ታምሩ የቀረበ፡ በምርምር፣ በማስፋፋት እና በተግባራዊ ስራዎች ላይ ለአካዳሚክ ትብብር የቀረበ ግብዣ። በአካባቢ ማይክሮባዮሎጂ፣ በ AMR እና በ AI በሽታ አምጪ ተህዋስያን መለየት ላይ የሚሰሩ ስራዎችን ያስችላል።',
        details: {
          objective:
            'የካናዳ-አፍሪካ አካዳሚክ ትብብርን መጋበዝ — የጋራ እርዳታዎች፣ የተማሪዎች የጋራ ቁጥጥር፣ የፓይለት ፕሮግራሞች እና የክልላዊ ማስፋፊያ ስልቶች።',
          method:
            'በአካባቢ ማይክሮባዮሎጂ፣ በፀረ-ተህዋሲያን መቋቋም (AMR) ክትትል፣ በ AI በሽታ አምጪ ተህዋስያን መለየት እና በተግባራዊ ሳይንስ ላይ ስራዎችን የሚያስችል የትብብር መድረክ።',
          keyFindings: [
            'በፓይለት ፕሮግራሞች፣ በክልላዊ ስርጭት እና ከነባር የውሃ ጥራት ክትትል ስርዓቶች ጋር በማቀናጀት ላይ አብሮ መስራት።',
            'በውሃ ምርመራ ስራዎች ላይ በንቃት ከተሰማሩ የአፍሪካ አገራት ድርጅቶች ጋር መተባበር።',
            'የውሃ ክትትል ፍትሃዊ፣ የትብብር እና በአገር ውስጥ የዳበረ መሆን አለበት።',
          ],
          partner: 'የካናዳ-አፍሪካ የትምህርት ትብብር ጉባኤ (CAACC)፣ ባህር ዳር ዩኒቨርሲቲ',
        },
      },
    ],
  },

  // Afaan Oromoo (om)
  om: {
    badge: 'Hojiiwwan Qabatamaa fi Amanamummaa Dhaabbilee',
    title: 'Hojiiwwan Qabatamaa fi Amanamummaa Dhaabbilee',
    desc: 'Sirnicha paayileetii Itoophiyaa fi Keeniyaa keessatti gaggeeffameen mirkaneessineerra; kunis haala dirree qabatamaa keessatti bu\'a qabeessummaa isaa agarsiiseera. Sagantaa leenjii ogeessotaatiin Ministeera Fayyaa wajjin hojjenneerra. Akkasumas Action Against Hunger irraa hamma yuuniitii 30tiif Xalayaa Fedhii arganneerra. Kunis furmaata biyya keessatti oomishamuuf amantaan dhaabbilee guddachaa dhufuu agarsiisa.',
    metric1Val: 'Hamma Yuuniitii 30',
    metric1Label: 'Xalayaa Fedhii (Action Against Hunger)',
    metric2Val: 'Sa\'aatii 8 hanga 21',
    metric2Label: 'Mallattoo Ariifataa fi Bu\'aa Guutuu',
    metric3Val: 'Hamma 80%',
    metric3Label: 'Oomisha Biyya Keessaatiin Gatii Hir\'isuu',
    filterLabel: 'Hojiiwwan Calalaa:',
    categories: {
      all: 'Hojiiwwan Hunda',
      field: 'Mirkaneessa Dirree',
      humanitarian: 'WASH Namoomaa',
      research: 'Walta\'iinsa Barnootaa',
      community: 'Leenjii Ogeessotaa',
    },
    showingText: (count: number) => `Hojiiwwan ${count} agarsiisaa jira`,
    verifiedBadge: 'Amanamummaa Dhaabbataa Mirkanaa\'e',
    viewCaseStudy: 'Bal\'ina Ilaalaa',
    closeCaseStudy: 'Bal\'ina Cufaa',
    projectDetails: 'Mirkaneessa Dirree fi Bal\'ina Dhaabbilee',
    objectiveLabel: 'Kaayyoo Hojii',
    methodLabel: 'Mala Hojiirra Oolmaa',
    findingsLabel: 'Bu\'aalee Ijoo',
    partnerLabel: 'Michuu / Qooda Fudhataa',
    inquireButton: 'Walta\'iinsaaf Nu Qunnamaa',
    sdgTag: 'Kalaqa Haqa Qabeessa',
    sdgTitle: 'Maaltu Adda Nu Taasisa?',
    sdgDesc:
      'Wanti adda nu taasisu meeshaa qofa miti — moodeela kalaqa sirnaati. Kun qorannoo bishaanii hirkattummaa alaarraa gara dandeettii naannootti jijjiira. Dandeettii biyya keessaa cimsuun hawaasni qabeenya bishaan isaanii yeroo dheeraaf akka bulchan mirkaneessa.',
    sdgButton: 'Waa\'ee Garee Keenyaa Baradhaa',
    principlesTitle: 'Qajeeltoo Sirnichaa',
    principles: [
      {
        title: 'Gatii Hir\'isuu',
        desc: 'Biyya keessatti oomishuun gatii hamma 80% hir\'isa; kunis qorannoo bishaanii hawaasa barbaadaniif dhaqqabamaa taasisa.',
      },
      {
        title: 'Dandeettii Ijaaruu',
        desc: 'Adeemsi keenya dandeettii teeknikaa fi qorannoo biyya keessaa ijaara; hawaasni furmaata qulqullina bishaan isaanii akka to\'atan humna kenna.',
      },
      {
        title: 'Of Dandeessuu',
        desc: 'Hawaasni qabeenya bishaan isaanii yeroo dheeraaf akka bulchan mirkaneessa, hirkattummaa alaa hir\'isa.',
      },
      {
        title: 'Carraa Hojii',
        desc: 'Hojiiwwan oomishaa biyya keessatti uumuun namoota humneessa akkasumas guddina diinagdee naannolee hanqinni bishaanii jiran keessatti dammaqsa.',
      },
    ],
    pilotTitle: 'Afeerraa Walta\'iinsaa',
    pilotDesc:
      'Qorannoo, babal\'isuu fi hojiirra oolchuu irratti walta\'iinsaaf banaadha. Walta\'iinsa barnootaa Kaanaadaa–Afrikaa afeerra — deeggarsa waloo, hordoffii barattootaa waloo, sagantaalee paayileetii fi tarsiimoo babal\'isuu naannoo.',
    pilotBtn1: 'Walta\'iinsa Mari\'adhaa',
    pilotBtn2: 'Amaloota Sirnichaa Qoradhaa',
    projects: [
      {
        id: 'acf-letter-of-intent',
        categoryKey: 'humanitarian',
        title: 'Xalayaa Fedhii Ifaa: Action Against Hunger (ACF)',
        category: 'WASH Namoomaa',
        date: '2025 – 2026',
        location: 'Itoophiyaa fi Naannolee Dhiyoo',
        image: '/images/waterscope-training-field.jpg',
        summary:
          'Action Against Hunger (ACF) irraa hamma yuuniitii 30tiif Xalayaan Fedhii fudhatameera; kunis oomisha biyya keessaaf amanamummaan guddachaa dhufuu agarsiisa.',
        details: {
          objective:
            'To\'annoo qulqullina bishaanii yeroo balaa namoomaatiif kiitii WaterScope socho\'aa hamma 30 bitachuuf tilmaama.',
          method:
            'Haalawwan qabeenyi xiqqaate keessatti qorannoo baakteeriyaa ariifataadhaaf qophii sirnichi dirree irratti qabu agarsiisuu.',
          keyFindings: [
            'Action Against Hunger (ACF) irraa hamma yuuniitii 30tiif Xalayaan Fedhii fudhatameera.',
            'Oomisha biyya keessaaf amanamummaan guddachaa dhufuu agarsiisa.',
            'Qorannoo bishaanii hirkattummaa alaarraa gara dandeettii naannootti jijjiira.',
          ],
          partner: 'Action Against Hunger (ACF)',
        },
      },
      {
        id: 'ethiopia-kenya-pilots',
        categoryKey: 'field',
        title: 'Paayileetiiwwan Itoophiyaa fi Keeniyaa: Mirkaneessa Dirree',
        category: 'Mirkaneessa Dirree',
        date: '2023 – 2025',
        location: 'Itoophiyaa fi Keeniyaa',
        image: '/images/field-testing-kenya.jpeg',
        summary:
          'Haalawwan Afrikaa Bahaa keessatti qorannoon dirree milkaa\'ina qabu gaggeeffamee fi mirkanaa\'eera; kunis bu\'a qabeessummaa isaa agarsiiseera.',
        details: {
          objective:
            'Haala dirree Afrikaa Bahaa qabatamaa keessatti sirna calaltuu meembireenii banaa ta\'e mirkaneessuu.',
          method:
            'Bakkeewwan bishaanii fagootti qorannoo baakteeriyaa kaartiriidhaan fi lakkoofsa kolonii ofumaan qorachuu.',
          keyFindings: [
            'Haalawwan Afrikaa Bahaa keessatti qorannoon dirree milkaa\'ina qabu gaggeeffameera.',
            'Bakka laabiraatooriin hin jirreetti bu\'a qabeessummaan isaa mirkanaa\'eera.',
            'Sadarkaa ISO 9308 wajjin kan walbira qabamee fi qaama alaan kan mirkanaa\'e.',
            'Mallattoo jalqabaa sa\'aatii 8 keessatti fi bu\'aa guutuu sa\'aatii 21 keessatti.',
          ],
          partner: 'WaterScope fi Michoota Qorannoo Bishaan Afrikaa Bahaa',
        },
      },
      {
        id: 'moh-training-programs',
        categoryKey: 'community',
        title: 'Ministeera Fayyaa Wajjin Walta\'iinsa: Sagantaa Leenjii Ogeessotaa',
        category: 'Leenjii Ogeessotaa',
        date: '2024 – 2026',
        location: 'Hawaasaa fi Wiirtuulee Naannoo, Itoophiyaa',
        image: '/images/training-hawassa-moh.png',
        summary:
          'Ogeessota qorannoo bishaaniitiif sagantaalee leenjii socho\'aa, dandeettii mootummaa ijaaruu fi sirnicha agarsiisuu.',
        details: {
          objective:
            'Ogeessota qorannoo bishaanii mootummaa biratti dandeettii qorannoo fi teeknikaa biyya keessaa ijaaruu.',
          method:
            'Calaltuu kaartirii, inkiwubeetara ho\'aa fi appii moobaayilaatiin gabaasa dijitaalaa irratti leenjii qabatamaa.',
          keyFindings: [
            'Ogeessota qorannoo bishaaniitiif sagantaaleen leenjii socho\'aa gaggeeffamaniiru.',
            'Dandeettii mootummaa ijaaruu fi sirnicha agarsiisuun danda\'ameera.',
            'Dandeettiin qorannoo biyya keessatti akka ijaaramu, akka itti fufu fi akka babal\'atu mirkaneessa.',
          ],
          partner: 'Ministeera Fayyaa Itoophiyaa',
        },
      },
      {
        id: 'local-manufacturing-progress',
        categoryKey: 'field',
        title: 'Guddina Jalqabaa: Oomisha fi Leenjii',
        category: 'Mirkaneessa Dirree',
        date: '2024 – 2026',
        location: 'Yuunivarsiitii Baahir Daar (BiTec fi Seifu BiT Maker Space)',
        image: '/images/manufacturing-3dprint.png',
        summary:
          'Teeknooloojii Maxxansa 3D fi maashinoota fayyadamuun oomisha biyya keessaa jalqabneerra. Ogeessota bishaaniif sagantaalee leenjii ni gaggeessina. Akkasumas dameewwan hedduu keessatti michummaa ijaaraa jirra.',
        details: {
          objective:
            'Ikkoosistamii qorannoo naannoo ijaaruu fi gatii meeshaalee qorannoo hamma 80% hir\'isuu.',
          method:
            'Wiirtuu kalaqaa Seifu Maker Space fi BiTec keessatti Maxxansa 3D fi maashinoota sirrii fayyadamuu.',
          keyFindings: [
            'Biyya keessatti oomishuun gatii hamma 80% hir\'isa.',
            'Teeknooloojii Maxxansa 3D fi maashinaatiin oomishni biyya keessaa jalqabameera.',
            'Hojiiwwan oomishaa biyya keessatti uumuun namoota humneessa akkasumas guddina diinagdee dammaqsa.',
            'Sarara dhiyeessii alaa miidhamuu danda\'u irratti hirkattummaa hir\'isa.',
          ],
          partner: 'Yuunivarsiitii Baahir Daar, Centre for Global Equality, BiT Maker Space',
        },
      },
      {
        id: 'caacc-collaboration',
        categoryKey: 'research',
        title: 'Walta\'iinsa Barnootaa Kaanaadaa-Afrikaa: Qulqullina Bishaanii Jijjiiruu',
        category: 'Walta\'iinsa Barnootaa',
        date: 'Guraandhala 26-27, 2026',
        location: 'Konfaransii Walta\'iinsa Barnootaa Kaanaadaa-Afrikaa (CAACC)',
        image: '/images/waterscope-hero-nile.jpg',
        summary:
          'Yohaannis Taamiruutiin kan dhiyaate: Qorannoo, babal\'isuu fi hojiirra oolchuu irratti afeerraa walta\'iinsa barnootaa. Maayikiroobaayoloojii naannoo, AMR fi beekumsa baakteeriyaa AI keessatti.',
        details: {
          objective:
            'Walta\'iinsa barnootaa Kaanaadaa–Afrikaa afeeruu — deeggarsa waloo, hordoffii barattootaa waloo, sagantaalee paayileetii fi tarsiimoo babal\'isuu naannoo.',
          method:
            'Maayikiroobaayoloojii naannoo, to\'annoo dandamanna qorichaa (AMR), beekumsa baakteeriyaa AI fi saayinsii hojiirra oolmaa keessatti waltajjii walta\'iinsaa.',
          keyFindings: [
            'Sagantaalee paayileetii, tamsaasa naannoo fi sirna to\'annoo jiran wajjin qindeessuu irratti michoomuu.',
            'Dhaabbilee biyyoota Afrikaa keessatti qorannoo bishaanii irratti socho\'an wajjin walta\'uu.',
            'To\'annoon bishaanii haqa qabeessa, gamtaa fi naannootti humneeffame ta\'uu qaba.',
          ],
          partner: 'Konfaransii Walta\'iinsa Barnootaa Kaanaadaa-Afrikaa (CAACC), Yuunivarsiitii Baahir Daar',
        },
      },
    ],
  },
};

export const ourWorkContent: Record<Language, OurWorkPageContent> = {
  en: data.en,
  am: data.am,
  om: data.om,
  ti: data.am,
};
