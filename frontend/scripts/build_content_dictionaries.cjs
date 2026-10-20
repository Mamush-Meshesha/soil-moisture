const fs = require('fs');
const path = require('path');

// 1. HOME CONTENT
const homeContent = `import { Language } from '../i18n/types';

export interface WorkflowStep {
  step: string;
  title: string;
  desc: string;
  highlight: string;
  detail: string;
}

export interface HomeContentData {
  heroBadge: string;
  heroHeadline1: string;
  heroHeadline2: string;
  heroSubtitle: string;
  heroBtnTech: string;
  heroBtnWork: string;
  heroTrust1: string;
  heroTrust2: string;
  heroTrust3: string;
  heroFloatingTitle: string;
  heroFloatingSub: string;

  problemBadge: string;
  problemTitle: string;
  problemDesc: string;
  pain1Title: string;
  pain1Desc: string;
  pain2Title: string;
  pain2Desc: string;
  pain3Title: string;
  pain3Desc: string;

  solutionBadge: string;
  solutionTitle: string;
  solutionDesc: string;
  solutionStat1Val: string;
  solutionStat1Desc: string;
  solutionStat2Val: string;
  solutionStat2Desc: string;
  solutionBtn: string;

  workflowBadge: string;
  workflowTitle: string;
  workflowDesc: string;
  workflowSteps: WorkflowStep[];

  opticsBadge: string;
  opticsTitle: string;
  opticsDesc: string;
  opticsCheck1: string;
  opticsCheck2: string;
  opticsCheck3: string;

  sdgBadge: string;
  sdgTitle: string;
  sdgQuote: string;
  sdgQuoteSub: string;
  sdgCol1Title: string;
  sdgCol1Desc: string;
  sdgCol2Title: string;
  sdgCol2Desc: string;
  sdgCol3Title: string;
  sdgCol3Desc: string;

  workBadge: string;
  workTitle: string;
  workViewAll: string;
  workCard1Badge: string;
  workCard1Title: string;
  workCard1Desc: string;
  workCard2Badge: string;
  workCard2Title: string;
  workCard2Desc: string;
  workCard3Badge: string;
  workCard3Title: string;
  workCard3Desc: string;
  workReadCase: string;

  hwBadge: string;
  hwTitle: string;
  hwDesc: string;
  hw1Badge: string;
  hw1Title: string;
  hw1Desc: string;
  hw1Spec1Key: string;
  hw1Spec1Val: string;
  hw1Spec2Key: string;
  hw1Spec2Val: string;
  hw2Badge: string;
  hw2Title: string;
  hw2Desc: string;
  hw2Spec1Key: string;
  hw2Spec1Val: string;
  hw2Spec2Key: string;
  hw2Spec2Val: string;
  hw3Badge: string;
  hw3Title: string;
  hw3Desc: string;
  hw3Spec1Key: string;
  hw3Spec1Val: string;
  hw3Spec2Key: string;
  hw3Spec2Val: string;
  hwViewStore: string;
  hwRequestQuote: string;

  ctaTitle: string;
  ctaDesc: string;
  ctaBtnDemo: string;
  ctaBtnSpecs: string;
}

export const homeContent: Record<Language, HomeContentData> = {
  en: {
    heroBadge: "Accessible Drinking-Water Safety",
    heroHeadline1: "Smarter Water Testing.",
    heroHeadline2: "Safer Communities.",
    heroSubtitle: "Making drinking-water quality testing accessible through practical technology that identifies bacterial contamination in as little as 8 hours—combining robust field filtration, automated optical detection, and digital reporting.",
    heroBtnTech: "Explore Our Technology",
    heroBtnWork: "Discover Our Work",
    heroTrust1: "Benchmarked to ISO 9308-1",
    heroTrust2: "Quantitative CFU in 21 hrs",
    heroTrust3: "Field-ready IP67 case",
    heroFloatingTitle: "Rapid Bacterial Detection",
    heroFloatingSub: "Identifies coliform presence in 8 hours",

    problemBadge: "The Global Challenge",
    problemTitle: "One in four people globally lack safely managed drinking water.",
    problemDesc: "Water-borne bacterial infections cause more than 500,000 diarrhoeal-related deaths every year—over 2,000 deaths every single day. Testing water supplies for fecal indicators such as E. coli and coliforms is essential, yet conventional water testing kits present severe practical barriers in remote and low-resource environments.",
    pain1Title: "Slow 24–48 Hour Delays",
    pain1Desc: "Standard laboratory microbiological methods take 24 to 48 hours for visible colonies to grow, during which communities may continue drinking contaminated water.",
    pain2Title: "Heavy, Fragile Equipment",
    pain2Desc: "Traditional test incubators require heavy batteries, delicate glassware, and complex flame sterilization steps that are difficult to transport on unpaved roads.",
    pain3Title: "Human Enumeration Error",
    pain3Desc: "Counting dozens or hundreds of overlapping bacterial colonies by eye introduces substantial subjectivity and recording discrepancies between operators.",

    solutionBadge: "The Solution",
    solutionTitle: "An All-in-One Portable Bacterial Testing System",
    solutionDesc: "AquaScope has re-engineered the gold-standard ISO 9308-1 membrane filtration method into a compact, battery-powered testing kit. By combining motorized vacuum filtration, temperature-controlled incubation, and automated digital microscopic imaging, anyone can carry out reliable water testing anywhere—from central labs to remote village taps.",
    solutionStat1Val: "8 Hours",
    solutionStat1Desc: "Early coliform presence detection",
    solutionStat2Val: "100% Mobile",
    solutionStat2Desc: "Operates without grid power or external lab",
    solutionBtn: "Read Detailed Technology Specs",

    workflowBadge: "Step-by-Step Procedure",
    workflowTitle: "How the Testing Workflow Works",
    workflowDesc: "A streamlined, contamination-resistant testing process refining ISO 9308-1 membrane filtration from water sample collection to digital colony reporting.",
    workflowSteps: [
      {
        step: "01",
        title: "Collect Water Sample",
        desc: "Draw a standard 100mL drinking-water sample using the motorized vacuum pump connected to the battery-powered field unit.",
        highlight: "Motorized vacuum filtration",
        detail: "Eliminates hand-pump fatigue and ensures consistent sample volume drawing through the sterile cartridge."
      },
      {
        step: "02",
        title: "Membrane Filtration",
        desc: "Water filters through the stainless-steel cartridge, capturing all bacteria on a 0.45µm gridded nitrocellulose membrane pad.",
        highlight: "ISO 9308-1 compliant filtration",
        detail: "Standardized microbiological membrane pore size retains coliforms, E. coli, and waterborne pathogens."
      },
      {
        step: "03",
        title: "Broth Media & Incubation",
        desc: "Nutrient broth media is added to the absorbent pad slider, which is sealed and placed in the internal thermal incubation chamber.",
        highlight: "Zero refrigeration needed",
        detail: "Maintains exact 37°C or 44°C incubation temperature without requiring laboratory incubators or electricity grid connection."
      },
      {
        step: "04",
        title: "Optical Microscopic Imaging",
        desc: "An integrated digital microscope module captures high-resolution optical imagery as bacterial microcolonies begin proliferating.",
        highlight: "Early microcolony optics",
        detail: "Detects microscopic colony emergence in as little as 8 hours, long before colonies become visible to the naked human eye."
      },
      {
        step: "05",
        title: "Automated AI Colony Count",
        desc: "Our machine-learning computer vision algorithm automatically distinguishes and counts E. coli and total coliform colonies.",
        highlight: "Objective & error-free",
        detail: "Eliminates human counting bias and technician eye strain; outputs accurate CFU/100mL quantitative values."
      },
      {
        step: "06",
        title: "Digital Sync & Real-Time Mapping",
        desc: "Results sync instantly via Bluetooth to the mobile app and upload to the central dashboard for real-time water safety intelligence.",
        highlight: "Instant GIS telemetry",
        detail: "Generates geolocated water purity reports for community leaders, WASH officers, and public health authorities."
      }
    ],

    opticsBadge: "Core Capabilities",
    opticsTitle: "Automated Optical Microbiology",
    opticsDesc: "Inside the unit, an embedded camera and microscopic imaging module track early bacterial microcolony formation. Our machine learning model automatically segments and counts fecal coliform and E. coli colonies directly on the membrane filter grid, producing clear quantitative data without human observation bias.",
    opticsCheck1: "Sensitivity down to 1 viable bacterial cell per 100mL",
    opticsCheck2: "Raw microscopic photo and analysed annotated overlay saved",
    opticsCheck3: "Automatic Bluetooth upload to smartphone app & cloud GIS",

    sdgBadge: "Human-Centred Water Impact",
    sdgTitle: "Supporting UN Sustainable Development Goal 6",
    sdgQuote: "“Ensure availability and sustainable management of water and sanitation for all.”",
    sdgQuoteSub: "We believe in decentralized water safety—empowering local community water committees, rural health clinics, and WASH officers to test their water autonomously.",
    sdgCol1Title: "Local Empowerment",
    sdgCol1Desc: "Enables community water operators to verify source safety without sending samples to distant urban laboratories.",
    sdgCol2Title: "Emergency Response",
    sdgCol2Desc: "Rapidly evaluates drinking water following floods, pipeline leaks, or natural disasters to prevent waterborne disease outbreaks.",
    sdgCol3Title: "Institutional Validation",
    sdgCol3Desc: "Provides accredited researchers and water utilities with traceable, geolocated microbiological audit trails.",

    workBadge: "Demonstrations & Field Trials",
    workTitle: "Our Work in the Field",
    workViewAll: "View All Field Initiatives",
    workCard1Badge: "AidEx Geneva Showcase",
    workCard1Title: "Humanitarian AidEx Demonstration",
    workCard1Desc: "Presented rapid 8-hour coliform testing and autonomous vacuum filtration to emergency WASH responders and international disaster relief coordinators.",
    workCard2Badge: "East Africa Field Trials",
    workCard2Title: "Rural Community Borehole Surveillance",
    workCard2Desc: "Conducted parallel validation across 65 community water points in Tanzania and Kenya, demonstrating 98.4% concordance with ISO reference laboratory results.",
    workCard3Badge: "Laboratory Validation",
    workCard3Title: "ISO 17025 Accredited Lab Benchmarking",
    workCard3Desc: "Independent microbiological trials confirming a lower detection threshold of 1 CFU/100mL and strict incubation thermal stability under ambient temperature swings.",
    workReadCase: "Read Case Study",

    hwBadge: "Water Testing Hardware",
    hwTitle: "Field-Ready Testing Kits & Consumables",
    hwDesc: "Equip your water quality program with portable testing systems, filtration pump units, and sterile nutrient consumable cartridges.",
    hw1Badge: "Complete System",
    hw1Title: "AquaScope Portable Kit – Complete",
    hw1Desc: "Full field kit including motorized vacuum pump, incubation module, optical camera scanner, battery power pack, and 25 test consumable sliders.",
    hw1Spec1Key: "Compliance",
    hw1Spec1Val: "ISO 9308-1 Benchmarked",
    hw1Spec2Key: "Power",
    hw1Spec2Val: "Li-ion 48h active battery",
    hw2Badge: "Testing Unit",
    hw2Title: "Optical Colony Scanner & Incubator",
    hw2Desc: "Standalone digital optical scanner module with temperature-controlled incubator bays and automated machine-learning colony counting.",
    hw2Spec1Key: "Detection",
    hw2Spec1Val: "Total Coliforms & E. coli",
    hw2Spec2Key: "Connectivity",
    hw2Spec2Val: "Bluetooth 5.2 & IoT",
    hw3Badge: "Consumables",
    hw3Title: "Sterile Membrane Sliders (Pack of 50)",
    hw3Desc: "Pre-sterilized single-use sliders with 0.45µm nitrocellulose gridded membrane pads and selective culture broth media.",
    hw3Spec1Key: "Shelf Life",
    hw3Spec1Val: "12 months ambient storage",
    hw3Spec2Key: "Storage",
    hw3Spec2Val: "No cold-chain required",
    hwViewStore: "View in Store",
    hwRequestQuote: "Request Quote",

    ctaTitle: "Ready to transform drinking-water safety in your community?",
    ctaDesc: "Get in touch to request a technical demonstration, discuss a humanitarian or municipal WASH partnership, or equip your technicians with portable water testing kits.",
    ctaBtnDemo: "Request a Demonstration",
    ctaBtnSpecs: "Explore Technology Specs"
  },

  am: {
    heroBadge: "ተደራሽ የመጠጥ ውሃ ደህንነት",
    heroHeadline1: "ዘመናዊ የውሃ ምርመራ።",
    heroHeadline2: "ደህንነታቸው የተጠበቁ ማህበረሰቦች።",
    heroSubtitle: "የመጠጥ ውሃ ጥራት ምርመራን ተደራሽ እና ቀላል ማድረግ። የባክቴሪያ ብክለትን በ 8 ሰዓታት ውስጥ የሚያውቅ አስተማማኝ ቴክኖሎጂ — ፈጣን የመስክ ማጣሪያን፣ አውቶሜትድ ኦፕቲካል ምስልን እና ዲጂታል ሪፖርትን ያካተተ።",
    heroBtnTech: "ቴክኖሎጂያችንን ይመርምሩ",
    heroBtnWork: "ስራችንን ይመልከቱ",
    heroTrust1: "በ ISO 9308-1 የተረጋገጠ",
    heroTrust2: "ትክክለኛ የ CFU ቆጠራ በ 21 ሰዓታት",
    heroTrust3: "ለመስክ ዝግጁ IP67 ሻንጣ",
    heroFloatingTitle: "ፈጣን የባክቴሪያ ምርመራ",
    heroFloatingSub: "የኮሊፎርም መኖርን በ 8 ሰዓት ያረጋግጣል",

    problemBadge: "አለምአቀፍ ፈተና",
    problemTitle: "በአለም ላይ ከ 4 ሰዎች አንዱ ንጹህና ደህንነቱ የተጠበቀ የመጠጥ ውሃ አያገኝም።",
    problemDesc: "በውሃ ወለድ ባክቴሪያ ምክንያት በየዓመቱ ከ 500,000 በላይ ሰዎች በተቅማጥ በሽታ ይሞታሉ — በየቀኑ ከ 2,000 በላይ ሞት። የውሃ ምንጮችን ለኢ. ኮላይ እና ኮሊፎርም መመርመር ወሳኝ ቢሆንም፣ ባህላዊ የላብራቶሪ ምርመራዎች በገጠራማና ሀብት ውስን በሆኑ አካባቢዎች ከፍተኛ እንቅፋት አለባቸው።",
    pain1Title: "የ 24–48 ሰዓታት መዘግየት",
    pain1Desc: "ባህላዊ የላብራቶሪ ማይክሮባዮሎጂ ምርመራዎች ባክቴሪያውን ለማሳደግ ከ 24 እስከ 48 ሰዓታት ይወስዳሉ፤ በዚህ ጊዜ ውስጥ ማህበረሰቦች የተበከለ ውሃ መጠጣታቸውን ይቀጥላሉ።",
    pain2Title: "ከባድና በቀላሉ የሚሰበሩ ቁሳቁሶች",
    pain2Desc: "ባህላዊ ኢንኩቤተሮች ከባድ ባትሪዎችን፣ በቀላሉ የሚሰበሩ የመስታወት ዕቃዎችን እና በእሳት ማምከንን ይፈልጋሉ፤ እነዚህም ባልተጠረጉ መንገዶች ለማጓጓዝ አስቸጋሪ ናቸው።",
    pain3Title: "የሰው እይታ የቆጠራ ስህተት",
    pain3Desc: "በደርዘን ወይም በመቶዎች የሚቆጠሩ የተደራረቡ የባክቴሪያ ቅኝ ግዛቶችን በዐይን መቁጠር ሰፊ የግል አመለካከትና የቁጥር ልዩነትን ያስከትላል።",

    solutionBadge: "መፍትሄው",
    solutionTitle: "ሁሉን-በአንድ የያዘ ተንቀሳቃሽ የባክቴሪያ መመርመሪያ ሥርዓት",
    solutionDesc: "AquaScope የወርቅ ደረጃውን የጠበቀውን የ ISO 9308-1 የሜምብሬን ማጣሪያ ዘዴ ወደ የታመቀ፣ በባትሪ የሚሰራ ተንቀሳቃሽ ኪት ቀይሮታል። በሞተር የሚሰራ ቫክዩም ማጣሪያ፣ የሙቀት ቁጥጥር ያለው ኢንኩቤሽን እና ዲጂታል ማይክሮስኮፒክ ምስልን በማጣመር ማንም ሰው በየትኛውም ቦታ አስተማማኝ ምርመራ እንዲያደርግ ያስችላል።",
    solutionStat1Val: "8 ሰዓታት",
    solutionStat1Desc: "የኮሊፎርም መኖርን ቀድሞ ማወቅ",
    solutionStat2Val: "100% ተንቀሳቃሽ",
    solutionStat2Desc: "ያለ ኤሌክትሪክ መስመር ወይም ላብራቶሪ ይሰራል",
    solutionBtn: "ዝርዝር የቴክኖሎጂ መግለጫዎችን ያንብቡ",

    workflowBadge: "የደረጃ በደረጃ ቅደም ተከተል",
    workflowTitle: "የምርመራ ሂደቱ እንዴት ይሰራል?",
    workflowDesc: "ከውሃ ናሙና አሰባሰብ እስከ ዲጂታል የባክቴሪያ ሪፖርት ድረስ የ ISO 9308-1 ማጣሪያን ያቀለለ፣ ንጽህናው የተጠበቀ የምርመራ ሂደት።",
    workflowSteps: [
      {
        step: "01",
        title: "የውሃ ናሙና መሰብሰብ",
        desc: "በባትሪ ከሚሰራው ተንቀሳቃሽ ኪት ጋር የተገናኘውን በሞተር የሚሰራ የቫክዩም ፓምፕ በመጠቀም መደበኛ 100 ሚሊ ሊትር የመጠጥ ውሃ ናሙና ይውሰዱ።",
        highlight: "በሞተር የሚሰራ የቫክዩም ማጣሪያ",
        detail: "የእጅ ፓምፕ ድካምን ያስቀራል፤ በጸዳው ካርትሪጅ ውስጥ ወጥ የሆነ የናሙና ፍሰት ያረጋግጣል።"
      },
      {
        step: "02",
        title: "በሜምብሬን ማጣራት",
        desc: "ውሃው በማይዝግ ብረት ካርትሪጅ ውስጥ በማለፍ ሁሉንም ባክቴሪያዎች በ 0.45µm ናይትሮሴሉሎዝ ሜምብሬን ፓድ ላይ ያስቀራል።",
        highlight: "ከ ISO 9308-1 ጋር የተጣጣመ ማጣሪያ",
        detail: "ደረጃውን የጠበቀ የማይክሮባዮሎጂ ሜምብሬን ቀዳዳ መጠን ኮሊፎርምን፣ ኢ. ኮላይን እና በሽታ አምጪ ተህዋስያንን ይይዛል።"
      },
      {
        step: "03",
        title: "የእድገት ንጥረ ነገር እና ኢንኩቤሽን",
        desc: "ፈሳሽ የእድገት ሚዲያ ወደ ፓድ ስላይደሩ ይጨመራል፤ ከዚያም ታሽጎ ወደ ውስጣዊው የሙቀት ኢንኩቤሽን ክፍል ይገባል።",
        highlight: "ማቀዝቀዣ አያስፈልገውም",
        detail: "የኤሌክትሪክ መስመር ወይም የላብራቶሪ ኢንኩቤተር ሳያስፈልገው ትክክለኛውን 37°C ወይም 44°C የሙቀት መጠን ይጠብቃል።"
      },
      {
        step: "04",
        title: "ኦፕቲካል ማይክሮስኮፒክ ምስል ማንሳት",
        desc: "የባክቴሪያ ጥቃቅን ቅኝ ግዛቶች መብዛት ሲጀምሩ የተቀናጀ ዲጂታል ማይክሮስኮፕ ከፍተኛ ጥራት ያለው የኦፕቲካል ምስል ያነሳል።",
        highlight: "የጥቃቅን ቅኝ ግዛቶች ኦፕቲክስ",
        detail: "ቅኝ ግዛቶች በሰው ዐይን ከመታየታቸው ከረጅም ሰዓታት በፊት፣ በ 8 ሰዓት ውስጥ መኖራቸውን ይለያል።"
      },
      {
        step: "05",
        title: "አውቶሜትድ AI የቅኝ ግዛት ቆጠራ",
        desc: "የማሽን ለርኒንግ ኮምፒውተር ቪዥን ስልተ-ቀመራችን ኢ. ኮላይ እና አጠቃላይ የኮሊፎርም ቅኝ ግዛቶችን በራስ-ሰር ለይቶ ይቆጥራል።",
        highlight: "ተጨባጭ እና ከስህተት የጸዳ",
        detail: "የሰው ቆጠራ ስህተትን እና የአይን ድካምን ያስቀራል፤ ትክክለኛ የ CFU/100mL አሃዛዊ ውጤት ይሰጣል።"
      },
      {
        step: "06",
        title: "ዲጂታል ማመሳሰል እና የካርታ ምዝገባ",
        desc: "ውጤቶቹ በብሉቱዝ አማካኝነት ወዲያውኑ ወደ ሞባይል መተግበሪያ ይመሳሰላሉ፤ ለእውነተኛ ጊዜ የውሃ ደህንነት መረጃ ወደ ማዕከላዊ ዳሽቦርድ ይላካሉ።",
        highlight: "ፈጣን የ GIS መረጃ ማስተላለፍ",
        detail: "ለማህበረሰብ መሪዎች፣ ለ WASH ባለሙያዎች እና ለጤና ባለስልጣናት በጂኦግራፊያዊ ካርታ የተደገፈ የውሃ ጥራት ሪፖርት ያዘጋጃል።"
      }
    ],

    opticsBadge: "ዋና ዋና ችሎታዎች",
    opticsTitle: "አውቶሜትድ ኦፕቲካል ማይክሮባዮሎጂ",
    opticsDesc: "በመሳሪያው ውስጥ የተገጠመ ካሜራ እና የማይክሮስኮፒክ ምስል ሞጁል የባክቴሪያ ቅኝ ግዛቶች መፈጠርን ይከታተላል። የማሽን ለርኒንግ ሞዴላችን የኢ. ኮላይ እና ኮሊፎርም ቅኝ ግዛቶችን በሜምብሬኑ ላይ በቀጥታ በመለየት ያለ ሰው ጣልቃገብነት ግልጽ የቁጥር መረጃ ያወጣል።",
    opticsCheck1: "በ 100mL ውስጥ 1 ህያው የባክቴሪያ ህዋስ ድረስ የማወቅ ችሎታ",
    opticsCheck2: "ጥሬ የማይክሮስኮፕ ፎቶ እና የተተነተነ ማብራሪያ ተቀምጦ ይቆያል",
    opticsCheck3: "በብሉቱዝ ወደ ስማርትፎን እና ክላውድ GIS በራስ-ሰር ይላካል",

    sdgBadge: "ሰው ተኮር የውሃ ተጽዕኖ",
    sdgTitle: "የተመድ የዘላቂ ልማት ግብ 6 ድጋፍ",
    sdgQuote: "“ለሁሉም ሰው የውሃ እና የንፅህና አጠባበቅ ተደራሽነትን እና ዘላቂ አስተዳደርን ማረጋገጥ።”",
    sdgQuoteSub: "ያልተማከለ የውሃ ደህንነት እናምናለን — የአካባቢ ማህበረሰብ የውሃ ኮሚቴዎችን፣ የገጠር ጤና ኬላዎችን እና የ WASH ባለሙያዎችን ራሳቸውን ችለው ውሃ እንዲመረምሩ ማብቃት።",
    sdgCol1Title: "የአካባቢ ማህበረሰብን ማብቃት",
    sdgCol1Desc: "የማህበረሰብ ውሃ ተቆጣጣሪዎች ናሙናዎችን ወደ ሩቅ ከተማ ላብራቶሪዎች ሳይልኩ በቦታው ላይ የውሃን ደህንነት እንዲያረጋግጡ ያስችላል።",
    sdgCol2Title: "የአደጋ ጊዜ ፈጣን ምላሽ",
    sdgCol2Desc: "የጎርፍ መከሰት፣ የመስመር መበላሸት ወይም የተፈጥሮ አደጋዎች ሲያጋጥሙ የውሃ ወለድ በሽታዎችን ለመከላከል ፈጣን ምርመራ ያካሂዳል።",
    sdgCol3Title: "ተቋማዊ ማረጋገጫ",
    sdgCol3Desc: "ለተመራማሪዎች እና ለውሃ ተቋማት በካርታ የተደገፈ፣ አስተማማኝ የማይክሮባዮሎጂ ኦዲት መረጃ ያቀርባል።",

    workBadge: "ማሳያዎች እና የመስክ ሙከራዎች",
    workTitle: "የመስክ ስራችን በተግባር",
    workViewAll: "ሁሉንም የመስክ ስራዎች ይመልከቱ",
    workCard1Badge: "የጄኔቫ AidEx ማሳያ",
    workCard1Title: "የሰብአዊ እርዳታ AidEx ማሳያ",
    workCard1Desc: "ፈጣን የ 8 ሰዓት የኮሊፎርም ምርመራ እና ራሱን የቻለ የቫክዩም ማጣሪያ ለአደጋ ጊዜ WASH ባለሙያዎች እና አለምአቀፍ አስተባባሪዎች ቀርቧል።",
    workCard2Badge: "የምስራቅ አፍሪካ የመስክ ሙከራዎች",
    workCard2Title: "የገጠር ማህበረሰብ ጥልቅ ጉድጓድ ክትትል",
    workCard2Desc: "በታንዛኒያ እና ኬንያ በሚገኙ 65 የውሃ ነጥቦች ላይ በተደረገ ሙከራ ከ ISO ማመሳከሪያ ላብራቶሪ ጋር 98.4% ተዛማጅነት አሳይቷል።",
    workCard3Badge: "የላብራቶሪ ማረጋገጫ",
    workCard3Title: "የ ISO 17025 እውቅና ያለው ላብራቶሪ ማረጋገጫ",
    workCard3Desc: "ገለልተኛ የማይክሮባዮሎጂ ምርመራ ዝቅተኛውን 1 CFU/100mL የማወቅ ደረጃን እና የሙቀት መረጋጋትን አረጋግጧል።",
    workReadCase: "የጉዳይ ጥናቱን ያንብቡ",

    hwBadge: "የውሃ መመርመሪያ ቁሳቁሶች",
    hwTitle: "ለመስክ ዝግጁ የሆኑ መመርመሪያ ኪቶች እና እቃዎች",
    hwDesc: "የውሃ ጥራት ፕሮግራምዎን በተንቀሳቃሽ መመርመሪያ ሲስተሞች፣ የማጣሪያ ፓምፖች እና በጸዱ የእድገት ካርትሪጆች ያሟሉ።",
    hw1Badge: "ሙሉ ሲስተም",
    hw1Title: "AquaScope ተንቀሳቃሽ ኪት – ሙሉ ስብስብ",
    hw1Desc: "የቫክዩም ፓምፕ፣ የኢንኩቤሽን ሞጁል፣ የኦፕቲካል ካሜራ ስካነር፣ የባትሪ ፓክ እና 25 መመርመሪያ ስላይደሮችን ያካተተ ሙሉ የመስክ ኪት።",
    hw1Spec1Key: "ደረጃ",
    hw1Spec1Val: "በ ISO 9308-1 የተረጋገጠ",
    hw1Spec2Key: "ኃይል",
    hw1Spec2Val: "48 ሰዓት የሚቆይ Li-ion ባትሪ",
    hw2Badge: "የመመርመሪያ ዩኒት",
    hw2Title: "የኦፕቲካል ቅኝ ግዛት ስካነር እና ኢንኩቤተር",
    hw2Desc: "ራሱን የቻለ ዲጂታል ኦፕቲካል ስካነር ሞጁል ከሙቀት ቁጥጥር ኢንኩቤተር እና አውቶሜትድ ማሽን ለርኒንግ ቆጠራ ጋር።",
    hw2Spec1Key: "ምርመራ",
    hw2Spec1Val: "አጠቃላይ ኮሊፎርም እና ኢ. ኮላይ",
    hw2Spec2Key: "ግንኙነት",
    hw2Spec2Val: "ብሉቱዝ 5.2 እና IoT",
    hw3Badge: "የፍጆታ እቃዎች",
    hw3Title: "የጸዱ የሜምብሬን ስላይደሮች (የ 50 ጥቅል)",
    hw3Desc: "በቅድሚያ የጸዱ ባለ 0.45µm ናይትሮሴሉሎዝ ሜምብሬን እና የተመረጠ የእድገት ብሮዝ ሚዲያ ያላቸው ስላይደሮች።",
    hw3Spec1Key: "የመደርደሪያ እድሜ",
    hw3Spec1Val: "ለ 12 ወራት በመደበኛ ሙቀት የሚቆይ",
    hw3Spec2Key: "ማከማቻ",
    hw3Spec2Val: "ማቀዝቀዣ አያስፈልገውም",
    hwViewStore: "በመደብር ይመልከቱ",
    hwRequestQuote: "ዋጋ ይጠይቁ",

    ctaTitle: "በማህበረሰብዎ የመጠጥ ውሃ ደህንነትን ለመቀየር ዝግጁ ነዎት?",
    ctaDesc: "የቴክኒክ ማሳያ ለመጠየቅ፣ ሰብአዊ ወይም ማዘጋጃ ቤት የ WASH አጋርነት ለመወያየት፣ ወይም ባለሙያዎችዎን በተንቀሳቃሽ የውሃ መመርመሪያ ኪቶች ለማስታጠቅ ያነጋግሩን።",
    ctaBtnDemo: "ማሳያ ይጠይቁ",
    ctaBtnSpecs: "የቴክኖሎጂ መግለጫዎችን ይመልከቱ"
  },

  om: {
    heroBadge: "Nageenya Bishaan Dhugaatii Dhaqqabamaa",
    heroHeadline1: "Qorannoo Bishaanii Ammayyaa.",
    heroHeadline2: "Hawaasa Nageenyi Isaanii Eegame.",
    heroSubtitle: "Qorannoo qulqullina bishaan dhugaatii teknolojii salphaa fi sa'aatii 8 keessatti faalama baakteeriyaa adda baasuun dhaqqabamaa gochuu — calaltuu dirree jabaataa, suuraa optikaalaa ofumaan hojjetu fi gabaasa dijitaalaa walitti qaba.",
    heroBtnTech: "Teknooloojii Keenya Qoradhaa",
    heroBtnWork: "Hojii Keenya Ilaalaa",
    heroTrust1: "Ulaagaa ISO 9308-1 kan Eege",
    heroTrust2: "Lakkoofsa CFU Sirrii Sa'aatii 21tti",
    heroTrust3: "Saanduqa IP67 Dirreef Qophaa'e",
    heroFloatingTitle: "Qorannoo Baakteeriyaa Saffisaa",
    heroFloatingSub: "Koliifoormii sa'aatii 8 keessatti adda baasa",

    problemBadge: "Qormaata Addunyaa",
    problemTitle: "Addunyaa irratti namoota 4 keessaa namni tokko bishaan dhugaatii qulqulluu hin argatu.",
    problemDesc: "Faalama baakteeriyaa bishaaniin waggaatti namoonni 500,000 ol dhukkuba garaa kaasaatiin du'u — guyyaatti du'a 2,000 ol. Bishaan E. coli fi koliifoormiif qorachuun barbaachisaa ta'us, meeshaaleen laabraatoorii aadaa naannoolee baadiyyaa keessatti gufuu cimaa qabu.",
    pain1Title: "Turtii Sa'aatii 24–48",
    pain1Desc: "Malli laabraatoorii aadaa baakteeriyaan akka guddatu gochuuf sa'aatii 24 hanga 48 fudhata; yeroo kana keessatti hawaasni bishaan faalame dhuguu itti fufa.",
    pain2Title: "Meeshaa Ulfaataa fi Cabuu Danda'u",
    pain2Desc: "Inkubatara aadaa baatrii ulfaataa, meeshaa fuullee laafaa fi ibiddaan qulqulleessuu barbaada; kunis daandii baadiyyaa irra deemuf ulfaataadha.",
    pain3Title: "Dogoggora Lakkoofsa Namaa",
    pain3Desc: "Kolonii baakteeriyaa dhibbaan lakkaa'aman ijaan lakkaa'uun garaagarummaa fi dogoggora guddaa uuma.",

    solutionBadge: "Furmaata",
    solutionTitle: "Sirna Qorannoo Baakteeriyaa Hunda-Tokko Keessaa Socho'u",
    solutionDesc: "AquaScope malli calaltuu meembraanii ISO 9308-1 gara kiitii baatriidhaan hojjetuutti jijjiiree jira. Calaltuu vaakiyeemii, inkubashinii teempireechara to'atu fi suuraa maaykirooskooppii dijitaalaa walitti makuun bakka kamittuu qorannoo sirrii gochuuf gargaara.",
    solutionStat1Val: "Sa'aatii 8",
    solutionStat1Desc: "Koliifoormii dursanii adda baasuu",
    solutionStat2Val: "100% Socho'aa",
    solutionStat2Desc: "Humna elektirikaa malee hojjeta",
    solutionBtn: "Ibsa Teknooloojii Bal'aa Dubbisaa",

    workflowBadge: "Tartiiba Hojii Sadarkaa Sadarkaadhaan",
    workflowTitle: "Adeemsi Qorannoo Akkamitti Hojjeta?",
    workflowDesc: "Samuda bishaanii sassaabuu irraa hanga gabaasa baakteeriyaa dijitaalaatti adeemsa calaltuu ISO 9308-1 qulqullina qabu.",
    workflowSteps: [
      {
        step: "01",
        title: "Samuda Bishaanii Fudhachuu",
        desc: "Pompiloo vaakiyeemii baatriidhaan hojjetutti fayyadamuun samuda bishaan dhugaatii 100mL fudhadhaa.",
        highlight: "Calaltuu vaakiyeemii masiiniin hojjetu",
        detail: "Dadhabbiin harkaatiin dhiibuu hin jiru; dhangala'aa wal-fakkaataa kaartirii keessa dabarsa."
      },
      {
        step: "02",
        title: "Calaltuu Meembraanii",
        desc: "Bishaan kaartirii sibiila dhangala'aa hin qabne keessa darbuun baakteeriyaa hunda meembraanii 0.45µm irratti hambisa.",
        highlight: "Calaltuu ISO 9308-1 wajjin walsimu",
        detail: "Guddinni qaawwa meembraanii koliifoormii, E. coli fi baakteeriyaa biroo qaba."
      },
      {
        step: "03",
        title: "Miidiyaa Guddinaa fi Inkubashinii",
        desc: "Dhangala'aan guddina baakteeriyaa paadii irra erga dhangalaafamee booda kuusaa ho'aa keessa seena.",
        highlight: "Firiijii kan hin barbaanne",
        detail: "Humna elektirikaa malee ho'a sirrii 37°C ykn 44°C eega."
      },
      {
        step: "04",
        title: "Suuraa Maaykirooskooppii Fudhachuu",
        desc: "Yeroo baakteeriyaan baay'achuu jalqabu maaykirooskooppiin dijitaalaa suuraa qulqullina guddaa qabu kaasa.",
        highlight: "Optiiksii kolonii duraa",
        detail: "Ijaan mul'achuu isaanii sa'aatii hedduu dura, sa'aatii 8 keessatti arguu dandeessisa."
      },
      {
        step: "05",
        title: "Lakkoofsa AI Ofumaan Hojjetu",
        desc: "Malli kompiitaraa maashin lerning keenya E. coli fi koliifoormii adda baasee ofumaan lakkaa'a.",
        highlight: "Dogoggora kan hin qabne",
        detail: "Dogoggora namaa fi dadhabbii ijaa hambisa; lakkoofsa CFU/100mL sirrii kenna."
      },
      {
        step: "06",
        title: "Walitti Qabuu fi Kaartaa Dijitaalaa",
        desc: "Bu'aan qorannoo Bluutuuziin gara mobaayilaatti darba; odeeffannoo yeroo qabatamaaf gara daashboordiitti ergama.",
        highlight: "Gabaasa GIS battalaa",
        detail: "Geggeessitoota hawaasaa fi ogeessota fayyaatiif gabaasa qulqullina bishaanii dhiyeessa."
      }
    ],

    opticsBadge: "Dandeettii Ijoo",
    opticsTitle: "Maaykiroobaayoloojii Optikaalaa Ofumaan Hojjetu",
    opticsDesc: "Meeshaa kana keessatti kaameeraan fi maaykirooskooppiin guddina baakteeriyaa hordofu. Malli maashin lerning keenya E. coli fi koliifoormii meembraanii irratti lakkaa'uun ragaa sirrii kenna.",
    opticsCheck1: "100mL keessatti seelii baakteeriyaa 1 adda baasuu danda'a",
    opticsCheck2: "Suuraa maaykirooskooppii qulqulluu fi xiinxala wajjin ol-kaa'a",
    opticsCheck3: "Ofumaan Bluutuuziin gara bilbilaa fi GIS kakuutti erga",

    sdgBadge: "Dhiibbaa Hawaasummaa Bishaanii",
    sdgTitle: "Galma Misooma Itti Fufiinsa Qabu UN 6 Deeggaruu",
    sdgQuote: "“Hundaaf bishaan dhugaatii fi qulqullina dhaqqabamaa fi itti fufiinsa qabu mirkaneessuu.”",
    sdgQuoteSub: "Nageenya bishaanii bittinaa'aa ta'etti amanna — koreewwan bishaan hawaasaa fi ogeessotni fayyaa of danda'anii akka qoratan humneessuu.",
    sdgCol1Title: "Hawaasa Naannoo Humneessuu",
    sdgCol1Desc: "Hawaasni laabraatoorii magaalaa fagoo osoo hin ergatin achumatti bishaan akka qoratan dandeessisa.",
    sdgCol2Title: "Deebii Yeroo Balaa",
    sdgCol2Desc: "Lolaan ykn balaan yeroo uumamu dhukkuboota daddarboo ittisuuf qorannoo saffisaa gaggeessa.",
    sdgCol3Title: "Mirkaneessa Dhaabbataa",
    sdgCol3Desc: "Qorattootaa fi dhaabbilee bishaaniitiif ragaa maaykiroobaayoloojii qulqulluu dhiyeessa.",

    workBadge: "Agarsiisa fi Qorannoo Dirree",
    workTitle: "Hojii Dirree Keenya Qabatamaa",
    workViewAll: "Hojiiwwan Dirree Hunda Ilaalaa",
    workCard1Badge: "Agarsiisa AidEx Jiinevaa",
    workCard1Title: "Agarsiisa Namoomaa AidEx",
    workCard1Desc: "Qorannoo koliifoormii sa'aatii 8 fi calaltuu vaakiyeemii ogeessota WASH yeroo balaatiif dhiyaateera.",
    workCard2Badge: "Qorannoo Dirree Baha Afrikaa",
    workCard2Title: "Hordoffii Boolla Bishaan Baadiyyaa",
    workCard2Desc: "Taanzaaniyaa fi Keeniyaa keessatti boolla bishaanii 65 irratti qorannoo gaggeeffameen laabraatoorii wajjin 98.4% walsimeera.",
    workCard3Badge: "Mirkaneessa Laabraatoorii",
    workCard3Title: "Mirkaneessa Laabraatoorii ISO 17025",
    workCard3Desc: "Qorannoon alaa sadarkaa gadi aanaa 1 CFU/100mL fi tasgabbii ho'aa mirkaneesseera.",
    workReadCase: "Qorannoo Dhimmaa Dubbisaa",

    hwBadge: "Meeshaalee Qorannoo Bishaanii",
    hwTitle: "Kiitota Qorannoo Dirree fi Meeshaalee Dhumatan",
    hwDesc: "Sagantaa qulqullina bishaanii keessan sirnoota socho'an, pompii calaltuu fi kaartirii qulqulluun guutaa.",
    hw1Badge: "Sirna Guutuu",
    hw1Title: "Kiitii Socho'aa AquaScope – Guutuu",
    hw1Desc: "Pompii vaakiyeemii, kuusaa ho'aa, iskaanara kaameeraa, baatrii fi meeshaalee qorannoo 25 kan of keessaa qabu.",
    hw1Spec1Key: "Ulaagaa",
    hw1Spec1Val: "ISO 9308-1 kan Eege",
    hw1Spec2Key: "Humna",
    hw1Spec2Val: "Baatrii Li-ion sa'aatii 48 turu",
    hw2Badge: "Yuunitii Qorannoo",
    hw2Title: "Iskaanara Kolonii fi Inkubatara",
    hw2Desc: "Iskaanara optikaalaa dijitaalaa qeenxee ho'a to'atu fi maashin lerningiin lakkaa'u.",
    hw2Spec1Key: "Qorannoo",
    hw2Spec1Val: "Koliifoormii Waliigalaa fi E. coli",
    hw2Spec2Key: "Walqunnamtii",
    hw2Spec2Val: "Bluetooth 5.2 fi IoT",
    hw3Badge: "Meeshaalee Dhumatan",
    hw3Title: "Silaayidara Meembraanii Qulqulluu (Paakkii 50)",
    hw3Desc: "Silaayidaroota meembraanii 0.45µm fi dhangala'aa qulqullina qabu dursee qophaa'e.",
    hw3Spec1Key: "Turtii Yeroo",
    hw3Spec1Val: "Ho'a idileetti ji'a 12 tura",
    hw3Spec2Key: "Kuusaa",
    hw3Spec2Val: "Qabbaneessaa hin barbaadu",
    hwViewStore: "Suuqii Keessatti Ilaalaa",
    hwRequestQuote: "Gatii Gaafadhaa",

    ctaTitle: "Nageenya bishaan dhugaatii hawaasa keessanii jijjiiruuf qophiidhaa?",
    ctaDesc: "Agarsiisa teeknikaa gaafachuuf, tumsa WASH mari'achuuf, ykn ogeessota keessan kiitii qorannootti hidhachiisuuf nu qunnamaa.",
    ctaBtnDemo: "Agarsiisa Gaafadhaa",
    ctaBtnSpecs: "Ibsa Teknooloojii Ilaalaa"
  },

  ti: {
    heroBadge: "ተበጻሒ ናይ መስተ ማይ ድሕንነት",
    heroHeadline1: "ዝበለጸ ናይ ማይ መርመራ።",
    heroHeadline2: "ድሑናት ማሕበረሰባት።",
    heroSubtitle: "ናይ መስተ ማይ ፅሬት መርመራ ተበጻሕን ቀሊልን ምግባር። ናይ ባክቴርያ ብከላ ኣብ ውሽጢ 8 ሰዓታት ዘለሊ ዘተኣማምን ቴክኖሎጂ — ፈጣን ናይ ሜዳ ምጽራይ፣ ኣውቶሜትድ ኦፕቲካል ምስልን ዲጂታል ሪፖርትን ዘጠቓለለ።",
    heroBtnTech: "ቴክኖሎጂና መርምሩ",
    heroBtnWork: "ስራሕና ተዓዘቡ",
    heroTrust1: "ብ ISO 9308-1 ዝተረጋገጸ",
    heroTrust2: "ትኽክለኛ ናይ CFU ቆጸራ ኣብ 21 ሰዓታት",
    heroTrust3: "ንሜዳ ድሉው IP67 ሳንዱቕ",
    heroFloatingTitle: "ቅልጡፍ ናይ ባክቴርያ መርመራ",
    heroFloatingSub: "ህላወ ኮሊፎርም ኣብ 8 ሰዓት የረጋግጽ",

    problemBadge: "ዓለማዊ ብድሆ",
    problemTitle: "ኣብ ዓለም ካብ 4 ሰባት ሓደ ጽሩይን ድሑንን ናይ መስተ ማይ ኣይረክብን።",
    problemDesc: "ብማይ ዝመሓላለፉ ባክቴርያታት ኣብ ዓመት ንልዕሊ 500,000 ሰባት ብተቅማጥ ህይወቶም ይወስዱ — ኣብ መዓልቲ ልዕሊ 2,000 ሞት። ማያት ንኢ. ኮላይን ኮሊፎርምን ምምርማር ወሳኒ እኳ እንተኾነ፣ ባህላዊ ናይ ላብራቶሪ መርመራታት ኣብ ገጠራትን ዓቕሞም ድሩት ኣብ ዝኾኑ ቦታታትን ከቢድ ዕንቅፋት ኣለዎም።",
    pain1Title: "ናይ 24–48 ሰዓታት ምድንጓይ",
    pain1Desc: "ባህላዊ ናይ ላብራቶሪ ማይክሮባዮሎጂ መርመራታት ባክቴርያ ንምዕባይ ካብ 24 ክሳብ 48 ሰዓታት ይወስዱ፤ ኣብዚ ግዜ እዚ ማሕበረሰባት ዝተበከለ ማይ ምስታይ ይቕጽሉ።",
    pain2Title: "ከቢድን ብቐሊሉ ዝስበርን ኣቁሑት",
    pain2Desc: "ባህላዊ ኢንኩቤተራት ከበድቲ ባትሪታትን፣ ብቐሊሉ ዝስበሩ ናይ መስኮት ኣቑሑትን ብሓዊ ምጽራይን ይሓቱ፤ እዚኦም ድማ ኣብ ገጠር ንምጉዓዝ ኣጸገምቲ እዮም።",
    pain3Title: "ናይ ሰብ ቆጸራ ጌጋ",
    pain3Desc: "ብኣማእታት ዝቑጸሩ ዝተደራረቡ ናይ ባክቴርያ ኮሎኒታት ብዓይኒ ምቑጻር ዓቢ ናይ ኣተሓሳስባን ናይ ቑጽሪ ፍልልይን የስዕብ።",

    solutionBadge: "መፍትሒ",
    solutionTitle: "ኩሉ-ኣብ-ሓደ ዝሓዘ ተንቀሳቓሲ ናይ ባክቴርያ መመርመሪ ስርዓት",
    solutionDesc: "AquaScope ነቲ ናይ ወርቂ ደረጃ ዝሓዘ ናይ ISO 9308-1 ናይ ሜምብሬን ምጽራይ ሜላ ናብ ንእሽቶ፣ ብባትሪ ዝሰርሕ ናይ ሜዳ ኪት ቀይርዎ ኣሎ። ብሞተር ዝሰርሕ ቫክዩም፣ ሙቐት ዝቆጻጸር ኢንኩቤሽንን ዲጂታል ማይክሮስኮፒክ ምስልን ብምውህሃድ ዝኾነ ሰብ ኣብ ዝኾነ ቦታ ትኽክለኛ መርመራ ከካይድ የኽእል።",
    solutionStat1Val: "8 ሰዓታት",
    solutionStat1Desc: "ህላወ ኮሊፎርም ኣቐዲምካ ምፍላጥ",
    solutionStat2Val: "100% ተንቀሳቓሲ",
    solutionStat2Desc: "ብዘይ ኤሌክትሪክ መስመር ወይ ላብራቶሪ ይሰርሕ",
    solutionBtn: "ዝርዝር ናይ ቴክኖሎጂ መግለጺታት ኣንብቡ",

    workflowBadge: "ናይ ደረጃ ብደረጃ ቅደም ተኸተል",
    workflowTitle: "ናይ መርመራ መስርሕ ከመይ ይሰርሕ?",
    workflowDesc: "ካብ ናሙና ማይ ምውሳድ ክሳብ ዲጂታል ሪፖርት ናይ ISO 9308-1 ምጽራይ ዝቐለለ፣ ፅሬቱ ዝተሓለወ ናይ መርመራ መስርሕ።",
    workflowSteps: [
      {
        step: "01",
        title: "ናይ ማይ ናሙና ምውሳድ",
        desc: "ምስቲ ብባትሪ ዝሰርሕ ተንቀሳቓሲ ኪት ዝተተሓሓዘ ብሞተር ዝሰርሕ ቫክዩም ፓምፕ ብምጥቃም ስሩዕ 100 ሚሊ ሊትር ናይ መስተ ማይ ናሙና ውሰዱ።",
        highlight: "ብሞተር ዝሰርሕ ናይ ቫክዩም ምጽራይ",
        detail: "ናይ ኢድ ፓምፕ ድኻም የትርፍ፤ ኣብቲ ዝጸረየ ካርትሪጅ ውሽጢ ማዕረ ዝኾነ ዋሕዚ የረጋግጽ።"
      },
      {
        step: "02",
        title: "ብሜምብሬን ምጽራይ",
        desc: "ማይ በቲ ዘይመጽጽ ብረት ካርትሪጅ ብምሕላፍ ንኹሎም ባክቴርያታት ኣብ 0.45µm ናይትሮሴሉሎዝ ሜምብሬን ፓድ የትርፎም።",
        highlight: "ምስ ISO 9308-1 ዝተሰማምዐ ምጽራይ",
        detail: "ደረጃ ዝሓለወ ናይ ማይክሮባዮሎጂ ሜምብሬን ንኮሊፎርም፣ ኢ. ኮላይን ካልኦት ባክቴርያታትን ይሕዝ።"
      },
      {
        step: "03",
        title: "ናይ ዕቤት መግብን ኢንኩቤሽንን",
        desc: "ፈሳሲ ናይ ዕቤት መግቢ ናብቲ ስላይደር ይውሰኽ፤ ቀጺሉ ተዓሺጉ ናብቲ ውሽጣዊ ናይ ሙቐት ኢንኩቤሽን ክፍሊ ይኣቱ።",
        highlight: "መዝሓሊ ዘየድልዮ",
        detail: "ናይ ኤሌክትሪክ መስመር ከየድለዮ ትኽክለኛ 37°C ወይ 44°C ሙቐት ይሕሉ።"
      },
      {
        step: "04",
        title: "ኦፕቲካል ማይክሮስኮፒክ ምስሊ ምውሳድ",
        desc: "ደቀቕቲ ናይ ባክቴርያ ኮሎኒታት ምብዛሕ ምስ ጀመሩ ዝተዋደደ ዲጂታል ማይክሮስኮፕ ብሉጽ ዝኾነ ኦፕቲካል ምስሊ ይወስድ።",
        highlight: "ናይ መጀመርታ ኮሎኒ ኦፕቲክስ",
        detail: "ብዓይኒ ሰብ ቅድሚ ምምልካቶም ኣብ ውሽጢ 8 ሰዓታት ምህላዎም የረጋግጽ።"
      },
      {
        step: "05",
        title: "ኣውቶሜትድ AI ናይ ኮሎኒ ቆጸራ",
        desc: "ናይ ማሽን ለርኒንግ ስልተ-ቀመርና ንኢ. ኮላይን ሓፈሻዊ ኮሊፎርምን ብባዕሉ ፈልዩ ይቖጽሮም።",
        highlight: "ካብ ጌጋ ዝጸረየ",
        detail: "ናይ ሰብ ቆጸራ ጌጋን ናይ ዓይኒ ድኻምን የትርፍ፤ ትኽክለኛ ናይ CFU/100mL ኣሃዛዊ ውጽኢት ይህብ።"
      },
      {
        step: "06",
        title: "ዲጂታል ምትእስሳርን ናይ ካርታ ምዝገባን",
        desc: "ውጽኢታት ብብሉቱዝ ናብ ሞባይል ኣፕሊኬሽን ይመሳሰሉ፤ ንቕጽበታዊ ናይ ማይ ድሕንነት ሓበሬታ ናብ ዳሽቦርድ ይለኣኹ።",
        highlight: "ቕጽበታዊ ናይ GIS መረዳእታ",
        detail: "ንመራሕቲ ማሕበረሰብን ሰብ ሞያ ጥዕናን ብካርታ ዝተደገፈ ናይ ማይ ጽሬት ሪፖርት የቕርብ።"
      }
    ],

    opticsBadge: "ቀንዲ ዓቕምታት",
    opticsTitle: "ኣውቶሜትድ ኦፕቲካል ማይክሮባዮሎጂ",
    opticsDesc: "ኣብ ውሽጢ እቲ መሳርሒ ዝተገጠመ ካሜራን ማይክሮስኮፒክ ምስልን ናይ ባክቴርያ ኮሎኒታት ምፍጣር ይከታተል። ማሽን ለርኒንግ ሞዴልና ንኢ. ኮላይን ኮሊፎርምን ኣብቲ ሜምብሬን ብምልላይ ግሉጽ ቑጽራዊ መረዳእታ የውጽእ።",
    opticsCheck1: "ኣብ 100mL ውሽጢ 1 ህያው ባክቴርያ ናይ ምፍላጥ ዓቕሚ",
    opticsCheck2: "ጥረ ናይ ማይክሮስኮፕ ፎቶን ዝተተንተነ መብርህን ተዓቂቡ ይጸንሕ",
    opticsCheck3: "ብብሉቱዝ ናብ ስማርትፎንን ናብ ክላውድ GISን ብባዕሉ ይለኣኽ",

    sdgBadge: "ሰብ ተኮር ናይ ማይ ጽልዋ",
    sdgTitle: "ናይ ው/ሕ/ሃ ቀጻሊ ልምዓት ሸቶ 6 ምድጋፍ",
    sdgQuote: "“ንኹሉ ሰብ ናይ ማይን ጽሬት ምሕላውን ተበጻሕነትን ቀጻሊ ምሕደራን ምርግጋጽ።”",
    sdgQuoteSub: "ዘይተማእከለ ናይ ማይ ድሕንነት ንኣምን — ናይ ከባቢ ማሕበረሰብ ማይ ኮሚቴታትን ሰብ ሞያ ጥዕናን ባዕሎም ማዮም ክምርምሩ ምብቃዕ።",
    sdgCol1Title: "ናይ ከባቢ ማሕበረሰብ ምብቃዕ",
    sdgCol1Desc: "ተቖጻጸርቲ ማይ ማሕበረሰብ ናሙና ናብ ርሑቕ ከተማ ላብራቶሪ ከይለኣኹ ኣብቲ ቦታ ናይ ማይ ድሕንነት ከረጋግጹ የኽእል።",
    sdgCol2Title: "ናይ ህጹጽ ግዜ ቅልጡፍ ምላሽ",
    sdgCol2Desc: "ውሕጅ፣ ምብልሻው መስመር ወይ ተፈጥሮኣዊ ሓደጋታት ከጋጥም ከሎ ብማይ ዝመሓላለፉ ሕማማት ንምክልኻል ቅልጡፍ መርመራ የካይድ።",
    sdgCol3Title: "ትካላዊ ምርግጋጽ",
    sdgCol3Desc: "ንተመራመርትን ንትካላት ማይን ብካርታ ዝተደገፈ፣ ዘተኣማምን ናይ ማይክሮባዮሎጂ ኦዲት መረዳእታ የቕርብ።",

    workBadge: "ተግባራዊ ምርኢታትን ናይ ሜዳ ፈተነታትን",
    workTitle: "ናይ ሜዳ ስራሕና ብተግባር",
    workViewAll: "ኩሎም ናይ ሜዳ ስራሕቲ ተዓዘቡ",
    workCard1Badge: "ናይ ጄኔቫ AidEx ምርኢት",
    workCard1Title: "ናይ ሰብኣዊ ሓገዝ AidEx ምርኢት",
    workCard1Desc: "ቅልጡፍ ናይ 8 ሰዓት ኮሊፎርም መርመራን ቫክዩም ምጽራይን ንሰብ ሞያ ህጹጽ WASH ኣቕሪብና።",
    workCard2Badge: "ናይ ምብራቕ ኣፍሪቃ ናይ ሜዳ ፈተነታት",
    workCard2Title: "ናይ ገጠር ማሕበረሰብ ዒላታት ክትትል",
    workCard2Desc: "ኣብ ታንዛንያን ኬንያን ኣብ ዝርከቡ 65 ናይ ማይ ነጥብታት ብዝተገብረ ፈተነ ምስ ISO ላብራቶሪ 98.4% ስምምዕ ኣርእዩ።",
    workCard3Badge: "ናይ ላብራቶሪ ምርጋጽ",
    workCard3Title: "ናይ ISO 17025 ላብራቶሪ ምርጋጽ",
    workCard3Desc: "ናጻ ናይ ማይክሮባዮሎጂ መርመራ ዝተሓተ 1 CFU/100mL ናይ ምፍላጥ ዓቕምን ናይ ሙቐት ርግኣትን ኣረጋጊጹ።",
    workReadCase: "ናይ ጉዳይ መጽናዕቲ ኣንብቡ",

    hwBadge: "ናይ ማይ መመርመሪ ኣቑሑት",
    hwTitle: "ንሜዳ ድሉዋት ዝኾኑ ኪታትን ኣቑሑትን",
    hwDesc: "ናይ ማይ ጽሬት ፕሮግራምኩም ብተንቀሳቐስቲ መመርመሪታት፣ ናይ ምጽራይ ፓምፕታትን ዝጸረዩ ካርትሪጃትን ኣማልኡ።",
    hw1Badge: "ምሉእ ስርዓት",
    hw1Title: "AquaScope ተንቀሳቓሲ ኪት – ምሉእ ስብስብ",
    hw1Desc: "ፓምፕ ቫክዩም፣ ናይ ኢንኩቤሽን ሞጁል፣ ናይ ኦፕቲካል ካሜራ ስካነር፣ ናይ ባትሪ ፓክን 25 መመርመሪ ስላይደርን ዝሓዘ ምሉእ ኪት።",
    hw1Spec1Key: "ደረጃ",
    hw1Spec1Val: "ብ ISO 9308-1 ዝተረጋገጸ",
    hw1Spec2Key: "ሓይሊ",
    hw1Spec2Val: "48 ሰዓት ዝጸንሕ Li-ion ባትሪ",
    hw2Badge: "ናይ መርመራ ዩኒት",
    hw2Title: "ናይ ኦፕቲካል ኮሎኒ ስካነርን ኢንኩቤተርን",
    hw2Desc: "ባዕሉ ዝኸኣለ ዲጂታል ኦፕቲካል ስካነር ሞጁል ምስ ሙቐት ዝቆጻጸር ኢንኩቤተርን ማሽን ለርኒንግ ቆጸራን።",
    hw2Spec1Key: "መርመራ",
    hw2Spec1Val: "ሓፈሻዊ ኮሊፎርምን ኢ. ኮላይን",
    hw2Spec2Key: "ርክብ",
    hw2Spec2Val: "ብሉቱዝ 5.2ን IoTን",
    hw3Badge: "መተካእታ ኣቑሑት",
    hw3Title: "ዝጸረዩ ናይ ሜምብሬን ስላይደራት (ናይ 50 ጥቅል)",
    hw3Desc: "ኣቐዲሞም ዝጸረዩ ብ 0.45µm ናይትሮሴሉሎዝ ሜምብሬንን ናይ ዕቤት መግብን ዝተዳለዉ ስላይደራት።",
    hw3Spec1Key: "ዕድመ መደርደሪ",
    hw3Spec1Val: "ን 12 ኣዋርሕ ኣብ ስሩዕ ሙቐት ዝጸንሕ",
    hw3Spec2Key: "መኽዘን",
    hw3Spec2Val: "መዝሓሊ ኣየድልዮን",
    hwViewStore: "ኣብ ድኳን ተዓዘቡ",
    hwRequestQuote: "ዋጋ ሕተቱ",

    ctaTitle: "ኣብ ማሕበረሰብኩም ናይ መስተ ማይ ድሕንነት ንምቕያር ድሉዋት ዲኹም?",
    ctaDesc: "ናይ ቴክኒክ ምርኢት ንምሕታት፣ ሰብኣዊ ወይ ማዘጋጃ ቤት ናይ WASH ምትሕግጋዝ ንምዝርራብ፣ ወይ ሰብ ሞያኹም ብተንቀሳቐስቲ ኪታት ንምዕጣቕ ተወከሱና።",
    ctaBtnDemo: "ምርኢት ሕተቱ",
    ctaBtnSpecs: "ናይ ቴክኖሎጂ መብርሂታት ተዓዘቡ"
  }
};
`;

// 2. TECHNOLOGY CONTENT
const technologyContent = `import { Language } from '../i18n/types';

export interface TechPillar {
  title: string;
  tag: string;
  desc: string;
}

export interface ProcessStage {
  num: string;
  title: string;
  desc: string;
  highlight: string;
}

export interface SpecRow {
  param: string;
  spec: string;
  standard: string;
}

export interface TechnologyPageContent {
  headerBadge: string;
  headerTitle: string;
  headerDesc: string;

  barrierBadge: string;
  barrierQuote: string;
  barrierWho: string;

  pillarsTag: string;
  pillarsTitle: string;
  pillars: TechPillar[];

  sopBadge: string;
  sopTitle: string;
  sopDesc: string;
  stages: ProcessStage[];

  specsBadge: string;
  specsTitle: string;
  colParam: string;
  colSpec: string;
  colStandard: string;
  specsRows: SpecRow[];

  docTitle: string;
  docDesc: string;
  docBtn1: string;
  docBtn2: string;
}

export const technologyContent: Record<Language, TechnologyPageContent> = {
  en: {
    headerBadge: "Advanced Membrane Filtration & Optics",
    headerTitle: "Our Water Testing Technology",
    headerDesc: "We have modernized the ISO 9308-1 membrane filtration standard into an integrated, portable water testing system that eliminates complex laboratory sterilization, reduces incubation time, and counts bacterial colonies automatically.",

    barrierBadge: "The Technological Barrier",
    barrierQuote: "Existing field bacterial testing kits are slow (requiring over 24 to 48 hours), cumbersome, require flame sterilization in the field, and depend on subjective manual counting by human eye. This makes routine drinking-water monitoring nearly impossible for remote health centers, rural water utilities, and community caretakers.",
    barrierWho: "According to the World Health Organization (WHO), zero viable bacterial colonies of E. coli should be detectable in any 100mL sample of drinking water. Our technology provides the sensitivity of an accredited laboratory directly in a field-deployable portable kit.",

    pillarsTag: "System Advantages",
    pillarsTitle: "Built for Real-World Accuracy",
    pillars: [
      {
        title: "Rapid",
        tag: "8 to 21 Hours",
        desc: "Detects presence of coliform bacteria in as little as 8 hours, delivering fully quantitative CFU counts in 21 hours—significantly faster than standard field kits."
      },
      {
        title: "Transportable",
        tag: "All-in-One Kit",
        desc: "The entire testing system is housed within an IP67 rugged case, allowing on-site filtering, sterile handling, and incubation without requiring a laboratory bench."
      },
      {
        title: "Simple",
        tag: "Minimal Training",
        desc: "Designed with and for field operators. Straightforward sample filtration and color-coded safety keys enable technicians and community health workers to test accurately."
      },
      {
        title: "Reliable",
        tag: "ISO 9308-1",
        desc: "Benchmarked directly against standard ISO 9308-1 and ISO 9308-2 membrane filtration protocols and accredited through external ISO 17025 laboratories."
      },
      {
        title: "Robust",
        tag: "Field Hardened",
        desc: "Tested to operate reliably in high ambient temperatures (up to 40°C), dusty environments, and off-grid locations using high-capacity rechargeable battery cells."
      },
      {
        title: "Data Driven",
        tag: "Real-Time Sync",
        desc: "Test results and raw colony images sync via Bluetooth to the mobile app and upload to a centralized GIS dashboard for water quality mapping and policy action."
      }
    ],

    sopBadge: "Standard Operating Procedure",
    sopTitle: "How It Works: Step-by-Step",
    sopDesc: "The complete testing sequence from sample drawing to automated optical report.",
    stages: [
      {
        num: "1",
        title: "Membrane Slider Insertion",
        desc: "The sterile 0.45µm nitrocellulose membrane and nutrient pad are situated within the ergonomic slider. The slider is clamped into the stainless-steel cartridge to prepare for sample filtration.",
        highlight: "Contamination-free handling without open tweezers or flame sterilization."
      },
      {
        num: "2",
        title: "Motorized Vacuum Filtration",
        desc: "A standard 100mL drinking-water sample is collected and filtered through the cartridge funnel using a quiet, motorized vacuum pump powered by the internal battery pack.",
        highlight: "Uniform filtration pressure ensures consistent bacterial cell retention."
      },
      {
        num: "3",
        title: "Liquid Media & Incubation",
        desc: "Selective liquid nutrient media is introduced onto the absorbent pad to cultivate coliforms and E. coli. The cartridge is slotted into the integrated incubation chamber maintained at precisely 37°C or 44°C.",
        highlight: "Precision thermal incubation without bulky water-baths or external incubators."
      },
      {
        num: "4",
        title: "Automated Microscopic Imaging",
        desc: "A built-in digital optical microscope captures high-resolution imagery as bacterial colonies develop. Image recognition software detects early colony proliferation long before colonies can be seen by eye.",
        highlight: "High-resolution imaging module powered by embedded computer vision."
      },
      {
        num: "5",
        title: "Machine Learning Colony Counting",
        desc: "Our machine-learning algorithm identifies and enumerates bacterial colonies, distinguishing target coliforms from non-target organisms and outputting an objective CFU/100mL measurement.",
        highlight: "Eliminates human counting bias and technician eye strain."
      },
      {
        num: "6",
        title: "Telemetry & Cloud Mapping",
        desc: "Test data, GPS location, and microscopic sample photos sync automatically via Bluetooth to the mobile application and upload to the central dashboard for regional water monitoring.",
        highlight: "Traceable, audit-ready drinking water quality records."
      }
    ],

    specsBadge: "Verified Engineering Specifications",
    specsTitle: "Technical System Parameters",
    colParam: "Parameter",
    colSpec: "Specification",
    colStandard: "Standard / Verification",
    specsRows: [
      {
        param: "Analytical Principle",
        spec: "Membrane Filtration & Digital Optical Enumeration",
        standard: "ISO 9308-1:2014 / Amd 1:2016"
      },
      {
        param: "Target Organisms",
        spec: "Total Coliform Bacteria & Escherichia coli (E. coli)",
        standard: "WHO Safe Drinking Water Guideline"
      },
      {
        param: "Detection Limit (LOD)",
        spec: "1 Colony Forming Unit (CFU) per 100 mL sample",
        standard: "ISO 17025 Verified Sensitivity"
      },
      {
        param: "Testing Speed",
        spec: "Presence in 8 hrs; full quantitative CFU in 21 hrs",
        standard: "Up to 60% faster than conventional incubators"
      },
      {
        param: "Thermal Stability",
        spec: "37.0°C ± 0.3°C or 44.0°C ± 0.3°C",
        standard: "Operational in 10°C to 40°C ambient"
      },
      {
        param: "Filter Membrane",
        spec: "0.45 µm pore size, 47 mm gridded sterile nitrocellulose",
        standard: "Single-use sealed sterile slider"
      },
      {
        param: "Enclosure & Ingress",
        spec: "IP67 waterproof and dustproof pelican-style casing",
        standard: "Drop-tested for field transport"
      },
      {
        param: "Telemetry & Connectivity",
        spec: "Bluetooth Low Energy 5.2 + Global LTE-M / NB-IoT",
        standard: "Automatic GIS and cloud dashboard upload"
      }
    ],

    docTitle: "Download Technical Documentation & SOPs",
    docDesc: "Access the complete AquaScope Field Operator Manual, Standard Operating Procedures (SOP), and microbiological validation data.",
    docBtn1: "Browse Technical Resources & Guidelines",
    docBtn2: "View Testing Hardware & Consumables"
  },

  am: {
    headerBadge: "የላቀ የሜምብሬን ማጣሪያ እና ኦፕቲክስ",
    headerTitle: "የውሃ መመርመሪያ ቴክኖሎጂያችን",
    headerDesc: "የ ISO 9308-1 የሜምብሬን ማጣሪያ ደረጃን ወደ ዘመናዊ፣ ሁሉን-በአንድ የያዘ ተንቀሳቃሽ የውሃ መመርመሪያ ሥርዓት ቀይረነዋል፤ ይህም ውስብስብ የላብራቶሪ ማምከንን ያስቀራል፣ የምርመራ ጊዜን ያሳጥራል እንዲሁም የባክቴሪያ ቅኝ ግዛቶችን በራስ-ሰር ይቆጥራል።",

    barrierBadge: "የቴክኖሎጂው እንቅፋት",
    barrierQuote: "ነባር የመስክ ባክቴሪያ መመርመሪያ ኪቶች እጅግ አዝጋሚ (ከ 24 እስከ 48 ሰዓታት የሚወስዱ)፣ ከባዶች፣ በመስክ ላይ በእሳት ማምከን የሚሹ እና በሰው ዓይን ቆጠራ ላይ የተመሰረቱ ናቸው። ይህም ለገጠር የጤና ጣቢያዎች፣ የውሃ ተቋማት እና ለማህበረሰብ ተቆጣጣሪዎች መደበኛ ክትትል ማድረግን ፈታኝ አድርጎታል።",
    barrierWho: "በዓለም ጤና ድርጅት (WHO) መመሪያ መሰረት በማንኛውም 100mL የመጠጥ ውሃ ናሙና ውስጥ ዜሮ (0) የኢ. ኮላይ ባክቴሪያ መገኘት አለበት። ቴክኖሎጂያችን የእውቅና ያለው ላብራቶሪን ትክክለኛነት በቀጥታ ወደ ሜዳ ያመጣል።",

    pillarsTag: "የሲስተሙ ጥቅሞች",
    pillarsTitle: "ለእውነተኛ የመስክ ትክክለኛነት የተሰራ",
    pillars: [
      {
        title: "ፈጣን",
        tag: "ከ 8 እስከ 21 ሰዓታት",
        desc: "የኮሊፎርም ባክቴሪያ መኖሩን በ 8 ሰዓት ውስጥ ያውቃል፤ ሙሉ አሃዛዊ የ CFU ቆጠራን በ 21 ሰዓት ውስጥ ያቀርባል — ከመደበኛ የመስክ ኪቶች እጅግ ፈጣን።"
      },
      {
        title: "ተንቀሳቃሽ",
        tag: "ሁሉን-በአንድ ኪት",
        desc: "ሙሉው የመመርመሪያ ሲስተም በጠንካራ IP67 ሻንጣ ውስጥ የተካተተ ሲሆን፣ የላብራቶሪ ጠረጴዛ ሳያስፈልግ በቦታው ላይ ማጣራት፣ ማዘጋጀት እና ኢንኩቤሽን ያከናውናል።"
      },
      {
        title: "ቀላል",
        tag: "አነስተኛ ስልጠና",
        desc: "ለመስክ ባለሙያዎች ታስቦ የተሰራ። ቀላል የናሙና ማጣሪያ እና በቀለም የተለዩ የደህንነት ቁልፎች ቴክኒሻኖች እና የጤና ባለሙያዎች በትክክል እንዲመረምሩ ያስችላሉ።"
      },
      {
        title: "አስተማማኝ",
        tag: "ISO 9308-1",
        desc: "በቀጥታ ከመደበኛ የ ISO 9308-1 እና ISO 9308-2 የሜምብሬን ማጣሪያ ፕሮቶኮሎች ጋር የተነጻጸረ እና በ ISO 17025 ላብራቶሪዎች የተረጋገጠ።"
      },
      {
        title: "ጠንካራ",
        tag: "ለመስክ የጠነከረ",
        desc: "በከፍተኛ የአካባቢ ሙቀት (እስከ 40°C)፣ በአቧራማ ሁኔታዎች እና ከኤሌክትሪክ መስመር ውጭ በሆኑ ቦታዎች በከፍተኛ ባትሪ አስተማማኝ ሆኖ እንዲሰራ ተፈትኗል።"
      },
      {
        title: "መረጃ ተኮር",
        tag: "የእውነተኛ ጊዜ ማመሳሰል",
        desc: "የምርመራ ውጤቶች እና ጥሬ የማይክሮስኮፕ ምስሎች በብሉቱዝ ወደ ሞባይል መተግበሪያ ይመሳሰላሉ፤ ለውሃ ጥራት ካርታ እና ውሳኔ አሰጣጥ ወደ ክላውድ ይላካሉ።"
      }
    ],

    sopBadge: "መደበኛ የአሰራር ቅደም ተከተል (SOP)",
    sopTitle: "እንዴት ይሰራል፡ ደረጃ በደረጃ",
    sopDesc: "ከውሃ ናሙና ማንሳት ጀምሮ እስከ አውቶሜትድ ኦፕቲካል ሪፖርት ድረስ ያለው ሙሉ የምርመራ ቅደም ተከተል።",
    stages: [
      {
        num: "1",
        title: "የሜምብሬን ስላይደር ማስገባት",
        desc: "የጸዳው 0.45µm ናይትሮሴሉሎዝ ሜምብሬን እና የተመጣጠነ ፓድ በስላይደሩ ውስጥ ይቀመጣሉ። ስላይደሩ ለማጣራት እንዲዘጋጅ በማይዝግ ብረት ካርትሪጅ ውስጥ ይታሰራል።",
        highlight: "ያለ ክፍት ሹካ ወይም የእሳት ማምከን ከብክለት የጸዳ አያያዝ።"
      },
      {
        num: "2",
        title: "በሞተር የሚሰራ የቫክዩም ማጣሪያ",
        desc: "መደበኛ 100mL የመጠጥ ውሃ ናሙና ተሰብስቦ በውስጣዊ ባትሪ በሚሰራ ጸጥተኛ የቫክዩም ፓምፕ አማካኝነት በማጣሪያው ውስጥ ያልፋል።",
        highlight: "ወጥ የሆነ የማጣሪያ ግፊት ባክቴሪያዎች በሙሉ በሜምብሬኑ ላይ እንዲቀሩ ያረጋግጣል።"
      },
      {
        num: "3",
        title: "ፈሳሽ ሚዲያ እና ኢንኩቤሽን",
        desc: "የኮሊፎርም እና ኢ. ኮላይ እድገትን የሚያፋጥን ፈሳሽ ሚዲያ ወደ ፓዱ ይጨመራል። ካርትሪጁ በትክክል 37°C ወይም 44°C በተጠበቀው የውስጥ ኢንኩቤሽን ውስጥ ይገባል።",
        highlight: "ከባድ የውሃ ገንዳዎች ወይም ውጫዊ ኢንኩቤተሮች ሳያስፈልጉ ትክክለኛ የሙቀት ቁጥጥር።"
      },
      {
        num: "4",
        title: "አውቶሜትድ ማይክሮስኮፒክ ምስል",
        desc: "የተገነባው ዲጂታል ኦፕቲካል ማይክሮስኮፕ የባክቴሪያ ቅኝ ግዛቶች ሲያድጉ ከፍተኛ ጥራት ያለው ምስል ያነሳል። የኮምፒውተር ቪዥን ሶፍትዌር ቅኝ ግዛቶች በዐይን ከመታየታቸው በፊት ያውቃል።",
        highlight: "በተቀናጀ ኮምፒውተር ቪዥን የሚሰራ ከፍተኛ ጥራት ያለው የምስል ሞጁል።"
      },
      {
        num: "5",
        title: "የማሽን ለርኒንግ ቅኝ ግዛት ቆጠራ",
        desc: "የማሽን ለርኒንግ ስልተ-ቀመራችን ኢ. ኮላይ እና ኮሊፎርምን ለይቶ ይቆጥራል፤ ተጨባጭ የ CFU/100mL ልኬት ያወጣል።",
        highlight: "የሰው ቆጠራ ስህተትን እና የአይን ድካምን ያስቀራል።"
      },
      {
        num: "6",
        title: "የመረጃ ልውውጥ እና የክላውድ ካርታ",
        desc: "የምርመራ መረጃ፣ የ GPS መገኛ እና የማይክሮስኮፕ ናሙና ፎቶዎች በብሉቱዝ ወደ ሞባይል መተግበሪያ ይመሳሰላሉ፤ ለማዕከላዊ ክትትል ወደ ዳሽቦርድ ይላካሉ።",
        highlight: "ኦዲት ሊደረግ የሚችል አስተማማኝ የመጠጥ ውሃ ጥራት መዝገብ።"
      }
    ],

    specsBadge: "የተረጋገጡ የምህንድስና ዝርዝሮች",
    specsTitle: "የሲስተሙ ቴክኒካዊ መለኪያዎች",
    colParam: "መለኪያ",
    colSpec: "ዝርዝር መግለጫ",
    colStandard: "ደረጃ / ማረጋገጫ",
    specsRows: [
      {
        param: "የትንተና መርህ",
        spec: "የሜምብሬን ማጣራት እና ዲጂታል ኦፕቲካል ቆጠራ",
        standard: "ISO 9308-1:2014 / Amd 1:2016"
      },
      {
        param: "ዒላማ ባክቴሪያዎች",
        spec: "አጠቃላይ ኮሊፎርም ባክቴሪያ እና ኢ. ኮላይ (E. coli)",
        standard: "የዓለም ጤና ድርጅት (WHO) የመጠጥ ውሃ መመሪያ"
      },
      {
        param: "የመለየት አቅም ወሰን (LOD)",
        spec: "በ 100 mL ናሙና ውስጥ 1 የቅኝ ግዛት አሃድ (1 CFU)",
        standard: "በ ISO 17025 የተረጋገጠ ትክክለኛነት"
      },
      {
        param: "የምርመራ ፍጥነት",
        spec: "ህላወን በ 8 ሰዓት፤ ሙሉ የ CFU ቆጠራ በ 21 ሰዓት",
        standard: "ከተለመዱት ኢንኩቤተሮች እስከ 60% ፈጣን"
      },
      {
        param: "የሙቀት መረጋጋት",
        spec: "37.0°C ± 0.3°C ወይም 44.0°C ± 0.3°C",
        standard: "ከ 10°C እስከ 40°C የአካባቢ ሙቀት ውስጥ ይሰራል"
      },
      {
        param: "የማጣሪያ ሜምብሬን",
        spec: "0.45 µm ቀዳዳ መጠን፣ 47 mm የጸዳ ናይትሮሴሉሎዝ",
        standard: "ለአንድ ጊዜ አገልግሎት የታሸገ የጸዳ ስላይደር"
      },
      {
        param: "የሻንጣ መከላከያ ደረጃ",
        spec: "IP67 ውሃ እና አቧራ የማያስገባ ጠንካራ ሻንጣ",
        standard: "ለመስክ ትራንስፖርት የመውደቅ ሙከራ ያለፈ"
      },
      {
        param: "ግንኙነት እና ዳታ",
        spec: "ብሉቱዝ 5.2 + አለምአቀፍ LTE-M / NB-IoT",
        standard: "ወደ GIS እና ክላውድ ዳሽቦርድ በራስ-ሰር የሚላክ"
      }
    ],

    docTitle: "ቴክኒካዊ ሰነዶችን እና SOPs ያውርዱ",
    docDesc: "የሙሉውን AquaScope የመስክ ኦፕሬተር መመሪያ፣ መደበኛ የአሰራር ቅደም ተከተሎች (SOP) እና የማይክሮባዮሎጂ ማረጋገጫ መረጃዎችን ያግኙ።",
    docBtn1: "ቴክኒካዊ መመሪያዎችን ይመልከቱ",
    docBtn2: "የመመርመሪያ ቁሳቁሶችን በመደብር ይመልከቱ"
  },

  om: {
    headerBadge: "Calaltuu Meembraanii fi Optiiksii Ol'aanaa",
    headerTitle: "Teknooloojii Qorannoo Bishaan Keenyaa",
    headerDesc: "Ulaagaa calaltuu meembraanii ISO 9308-1 gara sirna qorannoo socho'aa fi ammayyaatti jijjiirreerra; kunis qulqulleessuu laabraatoorii walxaxaa hambisa, yeroo inkubashinii gabaabsa akkasumas kolonii baakteeriyaa ofumaan lakkaa'a.",

    barrierBadge: "Gufuu Teknooloojii",
    barrierQuote: "Kiitotni qorannoo baakteeriyaa dirree jiran suuta kan hojjetan (sa'aatii 24 hanga 48 kan fudhatan), ulfaatoo, ibiddaan qulqulleessuu kan barbaadanii fi lakkoofsa ijaa irratti kan hirkatanidha. Kunis buufataalee fayyaa baadiyyaa fi tajaajila bishaaniitiif qorannoo idilee gochuu ulfaataa taasisa.",
    barrierWho: "Akka qajeelfama Dhaabbata Fayyaa Addunyaatti (WHO), samuda bishaan dhugaatii 100mL kamiyyuu keessatti baakteeriyaan E. coli zeeroo (0) ta'uu qaba. Teknooloojiin keenya qulqullina laabraatoorii beekamaa kallattiin gara dirreetti fida.",

    pillarsTag: "Faayidaalee Sirnichaa",
    pillarsTitle: "Sirrummaa Qabatamaa Dirreetiif kan Hojjetame",
    pillars: [
      {
        title: "Saffisaa",
        tag: "Sa'aatii 8 hanga 21",
        desc: "Koliifoormiin jiraachuu isaa sa'aatii 8 keessatti adda baasa; lakkoofsa CFU guutuu sa'aatii 21 keessatti kenna — kiitota dirree idilee caalaa saffisaadha."
      },
      {
        title: "Socho'aa",
        tag: "Kiitii Hunda-Tokko",
        desc: "Sirni qorannoo guutuun saanduqa IP67 jabaataa keessatti qophaa'e; teessoo laabraatoorii malee achumatti calaluu fi inkubashinii gaggeessa."
      },
      {
        title: "Salphaa",
        tag: "Leenjii Xiqqaa",
        desc: "Ogeessota dirreetiif kan qophaa'e. Calaltuu salphaa fi furtuu bifa qabuun ogeessotni fayyaa hawaasaa sirriitti akka qoratan dandeessisa."
      },
      {
        title: "Amanamaa",
        tag: "ISO 9308-1",
        desc: "Ulaagaalee calaltuu meembraanii ISO 9308-1 fi ISO 9308-2 wajjin kallattiin kan madaalamee fi laabraatoorii ISO 17025tiin kan mirkanaa'e."
      },
      {
        title: "Jabaataa",
        tag: "Dirreef kan Qophaa'e",
        desc: "Ho'a olaanaa (hanga 40°C), naannoo awwaaraa fi elektirika malee baatrii olaanaadhaan amanamummaadhaan akka hojjetu qorameera."
      },
      {
        title: "Ragaa Irratti kan Hundaa'e",
        tag: "Yeroo Qabatamaatti Walitti Fiduu",
        desc: "Bu'aan qorannoo fi suuraan maaykirooskooppii Bluutuuziin gara mobaayilaatti darba; kaartaa qulqullina bishaaniitiif gara daashboordiitti ergama."
      }
    ],

    sopBadge: "Adeemsa Hojii Idilee (SOP)",
    sopTitle: "Akkamitti Hojjeta: Sadarkaa Sadarkaadhaan",
    sopDesc: "Samuda bishaanii fudhachuu irraa hanga gabaasa optikaalaa ofumaan hojjetuutti adeemsa qorannoo guutuu.",
    stages: [
      {
        num: "1",
        title: "Silaayidara Meembraanii Galchuu",
        desc: "Meembraaniin 0.45µm fi paadiin silaayidara keessa jiru. Silaayidarichi samuda calaluuf kaartirii sibiilaa keessatti hidhama.",
        highlight: "Qabduu banaa ykn ibidda malee faalama irraa bilisaan qabuu."
      },
      {
        num: "2",
        title: "Calaltuu Vaakiyeemii Masiiniin Hojjetu",
        desc: "Samudni bishaan dhugaatii 100mL fudhatamee pompii vaakiyeemii callisaa baatriidhaan hojjetuun calalama.",
        highlight: "Dhiibbaa calaltuu wal-qixa ta'een baakteeriyaan hundi meembraanii irratti hafa."
      },
      {
        num: "3",
        title: "Dhangala'aa Miidiyaa fi Inkubashinii",
        desc: "Dhangala'aan guddina koliifoormii fi E. coli paadii irratti dhangalaafama. Kaartiriin gara kuusaa ho'aa 37°C ykn 44°Ctti gala.",
        highlight: "Bishaan ho'aa ykn inkubatara guddaa malee ho'a sirrii to'achuu."
      },
      {
        num: "4",
        title: "Suuraa Maaykirooskooppii Ofumaan Kaasu",
        desc: "Maaykirooskooppiin optikaalaa dijitaalaa yeroo baakteeriyaan guddatu suuraa qulqullina qabu kaasa. Sooftiweeriin ijaan mul'achuu dura adda baasa.",
        highlight: "Mawjuulii suuraa olaanaa kompiitara viiziyiniin hojjetu."
      },
      {
        num: "5",
        title: "Lakkoofsa Kolonii Maashin Lerningii",
        desc: "Malli maashin lerning keenya E. coli fi koliifoormii adda baasee lakkaa'a; safartuu CFU/100mL qabatamaa kenna.",
        highlight: "Dogoggora lakkoofsa namaa fi dadhabbii ijaa hambisa."
      },
      {
        num: "6",
        title: "Ragaa Dabarsuu fi Kaartaa Dijitaalaa",
        desc: "Ragaan qorannoo, bakki GPS fi suuraan maaykirooskooppii Bluutuuziin gara mobaayilaatti ergamee gara daashboordii giddu-galeessaatti ol-kaa'ama.",
        highlight: "Galmee qulqullina bishaan dhugaatii qoratamuu danda'u."
      }
    ],

    specsBadge: "Ulaagaalee Injinariingii Mirkanaa'an",
    specsTitle: "Safartuulee Sirna Teeknikaa",
    colParam: "Safartuu",
    colSpec: "Ibsa Bal'aa",
    colStandard: "Ulaagaa / Mirkaneessa",
    specsRows: [
      {
        param: "Seera Xiinxalaa",
        spec: "Calaltuu Meembraanii fi Lakkoofsa Optikaalaa Dijitaalaa",
        standard: "ISO 9308-1:2014 / Amd 1:2016"
      },
      {
        param: "Baakteeriyaa Xiyyeeffannoo",
        spec: "Koliifoormii Waliigalaa fi Escherichia coli (E. coli)",
        standard: "Qajeelfama Bishaan Dhugaatii WHO"
      },
      {
        param: "Dandeettii Adda Baasuu (LOD)",
        spec: "Samuda 100 mL keessatti Yuunitii Kolonii 1 (1 CFU)",
        standard: "Qulqullina ISO 17025tiin Mirkanaa'e"
      },
      {
        param: "Saffisa Qorannoo",
        spec: "Jiraachuu sa'aatii 8tti; lakkoofsa CFU sa'aatii 21tti",
        standard: "Inkubatara aadaa caalaa 60% saffisaa"
      },
      {
        param: "Tasgabbii Ho'aa",
        spec: "37.0°C ± 0.3°C ykn 44.0°C ± 0.3°C",
        standard: "Ho'a naannoo 10°C hanga 40°C keessatti hojjeta"
      },
      {
        param: "Meembraanii Calaltuu",
        spec: "Qaawwa 0.45 µm, 47 mm naayitirooseeluloosii qulqulluu",
        standard: "Silaayidara qulqulluu al-tokko qofa fayyadu"
      },
      {
        param: "Gosa Saanduqaa",
        spec: "IP67 bishaan fi awwaara kan hin galchine",
        standard: "Geejjiba dirreetiif kufaatii kan dandamatu"
      },
      {
        param: "Walqunnamtii Ragaa",
        spec: "Bluetooth Low Energy 5.2 + Global LTE-M / NB-IoT",
        standard: "Ofumaan gara GIS fi daashboordiitti ol-ergama"
      }
    ],

    docTitle: "Galmeewwan Teeknikaa fi SOPs Buufadhaa",
    docDesc: "Qajeelfama Hojii Dirree AquaScope guutuu, Adeemsa Hojii Idilee (SOP) fi ragaalee qorannoo maaykiroobaayoloojii argadhaa.",
    docBtn1: "Qajeelfamoota Teeknikaa Ilaalaa",
    docBtn2: "Meeshaalee Qorannoo Suuqii Keessatti Ilaalaa"
  },

  ti: {
    headerBadge: "ዝማዕበለ ናይ ሜምብሬን ምጽራይን ኦፕቲክስን",
    headerTitle: "ናይ ማይ መመርመሪ ቴክኖሎጂና",
    headerDesc: "ነቲ ናይ ISO 9308-1 ናይ ሜምብሬን ምጽራይ ደረጃ ናብ ዘመናዊ፣ ኩሉ-ኣብ-ሓደ ዝሓዘ ተንቀሳቓሲ ናይ ማይ መመርመሪ ስርዓት ቀይርናዮ ኣለና፤ እዚ ድማ ውስብስብ ናይ ላብራቶሪ ምጽራይ የትርፍ፣ ግዜ መርመራ የሕጽር ከምኡ'ውን ናይ ባክቴርያ ኮሎኒታት ብባዕሉ ይቖጽር።",

    barrierBadge: "ናይ ቴክኖሎጂ ዕንቅፋት",
    barrierQuote: "እቶም ዘለዉ ናይ ሜዳ ባክቴርያ መመርመሪ ኪታት ኣዝዮም ደንጎይቲ (ካብ 24 ክሳብ 48 ሰዓታት ዝወስዱ)፣ ከበድቲ፣ ብሓዊ ምጽራይ ዝደልዩን ኣብ ናይ ሰብ ዓይኒ ቆጸራ ዝምርኮሱን እዮም። እዚ ድማ ንናይ ገጠር ጥዕና ኬላታት፣ ንትካላት ማይን ንተቖጻጸርቲ ማሕበረሰብን ስሩዕ ክትትል ንምግባር ከቢድ ገይርዎ ኣሎ።",
    barrierWho: "ብመሰረት መምርሒ ውድብ ጥዕና ዓለም (WHO)፣ ኣብ ዝኾነ 100mL ናይ መስተ ማይ ናሙና ዜሮ (0) ናይ ኢ. ኮላይ ባክቴርያ ክርከብ ኣለዎ። ቴክኖሎጂና ነቲ ናይ ፍሉጥ ላብራቶሪ ትኽክለኛነት ብቐጥታ ናብ ሜዳ የብጽሖ።",

    pillarsTag: "ናይቲ ስርዓት ብልጫታት",
    pillarsTitle: "ንተግባራዊ ናይ ሜዳ ትኽክለኛነት ዝተሰርሐ",
    pillars: [
      {
        title: "ቅልጡፍ",
        tag: "ካብ 8 ክሳብ 21 ሰዓታት",
        desc: "ህላወ ኮሊፎርም ባክቴርያ ኣብ ውሽጢ 8 ሰዓት የረጋግጽ፤ ምሉእ ቑጽራዊ ናይ CFU ቆጸራ ኣብ 21 ሰዓት ይህብ — ካብ ስሩዕ ናይ ሜዳ ኪታት ኣዝዩ ቅልጡፍ።"
      },
      {
        title: "ተንቀሳቓሲ",
        tag: "ኩሉ-ኣብ-ሓደ ኪት",
        desc: "ምሉእ ናይ መርመራ ስርዓት ኣብ ድልዱል IP67 ሳንዱቕ ውሽጢ ዝተዳለወ ኮይኑ፣ ናይ ላብራቶሪ ሰሌዳ ከየድለየ ኣብቲ ቦታ ምጽራይን ኢንኩቤሽንን የካይድ።"
      },
      {
        title: "ቀሊል",
        tag: "ውሑድ ስልጠና",
        desc: "ንናይ ሜዳ ሰብ ሞያ ተባሂሉ ዝተዳለወ። ቀሊል ናይ ምጽራይ ኣሰራርሓን ብሕብሪ ዝተፈልዩ መፍትሓትን ሰብ ሞያ ብትኽክል ክምርምሩ የኽእሎም።"
      },
      {
        title: "ዘተኣማምን",
        tag: "ISO 9308-1",
        desc: "ብቐጥታ ምስ ስሩዕ ናይ ISO 9308-1ን ISO 9308-2ን ሜላታት ዝተነጻጸረን ብ ISO 17025 ላብራቶሪታት ዝተረጋገጸን።"
      },
      {
        title: "ድልዱል",
        tag: "ንሜዳ ዝጠነኸረ",
        desc: "ኣብ ልዑል ሙቐት (ክሳብ 40°C)፣ ኣብ ሓመዳም ኩነታትን ኤሌክትሪክ ኣብ ዘይብሎም ቦታታትን ብልዑል ባትሪ ብዘተኣማምን መንገዲ ክሰርሕ ተፈቲኑ።"
      },
      {
        title: "መረዳእታ ዝመርሖ",
        tag: "ቕጽበታዊ ምትእስሳር",
        desc: "ውጽኢት መርመራን ጥረ ናይ ማይክሮስኮፕ ስእልታትን ብብሉቱዝ ናብ ሞባይል ይመሳሰሉ፤ ንካርታን ንውሳነን ናብ ክላውድ ይለኣኹ።"
      }
    ],

    sopBadge: "ስሩዕ ናይ ኣሰራርሓ ቅደም ተኸተል (SOP)",
    sopTitle: "ከመይ ይሰርሕ፡ ደረጃ ብደረጃ",
    sopDesc: "ካብ ናሙና ማይ ምውሳድ ክሳብ ኣውቶሜትድ ኦፕቲካል ሪፖርት ዘሎ ምሉእ ናይ መርመራ ቅደም ተኸተል።",
    stages: [
      {
        num: "1",
        title: "ናይ ሜምብሬን ስላይደር ምእታው",
        desc: "እቲ ዝጸረየ 0.45µm ናይትሮሴሉሎዝ ሜምብሬንን መግብን ኣብቲ ስላይደር ይቕመጡ። እቲ ስላይደር ንምጽራይ ድሉው ንምግባር ኣብቲ ናይ ብረት ካርትሪጅ ይእሰር።",
        highlight: "ክፉት መትሓዚ ወይ ሓዊ ከየድለየ ካብ ብከላ ዝጸረየ ኣተሓሕዛ።"
      },
      {
        num: "2",
        title: "ብሞተር ዝሰርሕ ናይ ቫክዩም ምጽራይ",
        desc: "ስሩዕ 100mL ናይ መስተ ማይ ናሙና ተወሲዱ ብውሽጣዊ ባትሪ ብዝሰርሕ ጸጥተኛ ቫክዩም ፓምፕ ኣቢሉ ይጸሪ።",
        highlight: "ማዕረ ዝኾነ ናይ ምጽራይ ጸቕጢ ባክቴርያታት ኣብቲ ሜምብሬን ክተርፉ የረጋግጽ።"
      },
      {
        num: "3",
        title: "ፈሳሲ መግብን ኢንኩቤሽንን",
        desc: "ናይ ኮሊፎርምን ኢ. ኮላይን ዕቤት ዘቀላጥፍ ፈሳሲ መግቢ ናብቲ ፓድ ይውሰኽ። እቲ ካርትሪጅ ናብቲ 37°C ወይ 44°C ዝተሓለወ ኢንኩቤተር ይኣቱ።",
        highlight: "ከበድቲ ናይ ማይ ባስካታት ከየድለዩ ትኽክለኛ ናይ ሙቐት ምቁጽጻር።"
      },
      {
        num: "4",
        title: "ኣውቶሜትድ ማይክሮስኮፒክ ምስሊ",
        desc: "ዝተገጠመ ዲጂታል ኦፕቲካል ማይክሮስኮፕ ባክቴርያታት ክበዝሑ ከለዉ ጽሬት ዘለዎ ምስሊ ይወስድ። ኮምፒውተር ቪዥን ቅድሚ ብዓይኒ ምርኣዮም የለልዮም።",
        highlight: "ብኮምፒውተር ቪዥን ዝሰርሕ ልዑል ጽሬት ዘለዎ ናይ ምስሊ ሞጁል።"
      },
      {
        num: "5",
        title: "ናይ ማሽን ለርኒንግ ኮሎኒ ቆጸራ",
        desc: "ናይ ማሽን ለርኒንግ ስልተ-ቀመርና ንኢ. ኮላይን ኮሊፎርምን ፈልዩ ይቖጽር፤ ትኽክለኛ ናይ CFU/100mL ልክዒት ይህብ።",
        highlight: "ናይ ሰብ ቆጸራ ጌጋን ናይ ዓይኒ ድኻምን የትርፍ።"
      },
      {
        num: "6",
        title: "ናይ መረዳእታ ምትእስሳርን ዲጂታል ካርታን",
        desc: "መረዳእታ መርመራ፣ ናይ GPS ቦታን ናይ ማይክሮስኮፕ ስእልን ብብሉቱዝ ናብ ሞባይል ኣፕሊኬሽን ይመሳሰሉ፤ ንማእከላይ ክትትል ናብ ዳሽቦርድ ይለኣኹ።",
        highlight: "ኦዲት ክግበረሉ ዝኽእል ዘተኣማምን ናይ መስተ ማይ ጽሬት መዝገብ።"
      }
    ],

    specsBadge: "ዝተረጋገጹ ናይ ምህንድስና ዝርዝራት",
    specsTitle: "ናይቲ ስርዓት ቴክኒካዊ መለክዒታት",
    colParam: "መለክዒ",
    colSpec: "ዝርዝር መብርሂ",
    colStandard: "ደረጃ / ምርግጋጽ",
    specsRows: [
      {
        param: "ናይ ትንተና መትከል",
        spec: "ናይ ሜምብሬን ምጽራይን ዲጂታል ኦፕቲካል ቆጸራን",
        standard: "ISO 9308-1:2014 / Amd 1:2016"
      },
      {
        param: "ዒላማ ባክቴርያታት",
        spec: "ሓፈሻዊ ኮሊፎርም ባክቴርያን ኢ. ኮላይን (E. coli)",
        standard: "ናይ ውድብ ጥዕና ዓለም (WHO) ናይ መስተ ማይ መምርሒ"
      },
      {
        param: "ናይ ምፍላጥ ዓቕሚ ደረት (LOD)",
        spec: "ኣብ 100 mL ናሙና ውሽጢ 1 ናይ ኮሎኒ ኣሃድ (1 CFU)",
        standard: "ብ ISO 17025 ዝተረጋገጸ ትኽክለኛነት"
      },
      {
        param: "ናይ መርመራ ፍጥነት",
        spec: "ህላወ ኣብ 8 ሰዓት፤ ምሉእ ቆጸራ CFU ኣብ 21 ሰዓት",
        standard: "ካብ ንቡራት ኢንኩቤተራት ክሳብ 60% ቅልጡፍ"
      },
      {
        param: "ናይ ሙቐት ርግኣት",
        spec: "37.0°C ± 0.3°C ወይ 44.0°C ± 0.3°C",
        standard: "ካብ 10°C ክሳብ 40°C ናይ ከባቢ ሙቐት ይሰርሕ"
      },
      {
        param: "ናይ ምጽራይ ሜምብሬን",
        spec: "0.45 µm ቀዳድ፣ 47 mm ዝጸረየ ናይትሮሴሉሎዝ",
        standard: "ንሓደ ግዜ ጥራይ ዘገልግል ዝተዓሸገ ስላይደር"
      },
      {
        param: "ናይ ሳንዱቕ መከላኸሊ",
        spec: "IP67 ማይን ሓመድን ዘየእቱ ድልዱል ሳንዱቕ",
        standard: "ንናይ ሜዳ ጉዕዞ ካብ ላዕሊ ብምውዳቕ ዝተፈተነ"
      },
      {
        param: "ርክብን መረዳእታን",
        spec: "ብሉቱዝ 5.2 + ዓለማዊ LTE-M / NB-IoT",
        standard: "ናብ GISን ክላውድ ዳሽቦርድን ብባዕሉ ዝለኣኽ"
      }
    ],

    docTitle: "ቴክኒካዊ ሰነዳትን SOPs ኣውርዱ",
    docDesc: "ምሉእ ናይ AquaScope ናይ ሜዳ ኦፕሬተር መምርሒ፣ ስሩዕ ናይ ኣሰራርሓ ቅደም ተኸተል (SOP) ከምኡ'ውን ናይ ማይክሮባዮሎጂ መረጋገጺታት ርኸቡ።",
    docBtn1: "ቴክኒካዊ መምርሒታት ተዓዘቡ",
    docBtn2: "ናይ መመርመሪ ኣቑሑት ኣብ ድኳን ተዓዘቡ"
  }
};
`;

// 3. ABOUT CONTENT
const aboutContent = `import { Language } from '../i18n/types';

export interface AboutPageContent {
  headerBadge: string;
  headerTitle: string;
  headerDesc: string;

  missionBadge: string;
  missionTitle: string;
  missionP1: string;
  missionP2: string;

  pillar1Title: string;
  pillar1Desc: string;
  pillar2Title: string;
  pillar2Desc: string;
  pillar3Title: string;
  pillar3Desc: string;

  val1Title: string;
  val1Desc: string;
  val2Title: string;
  val2Desc: string;
  val3Title: string;
  val3Desc: string;

  ctaTitle: string;
  ctaDesc: string;
  ctaBtn1: string;
  ctaBtn2: string;
}

export const aboutContent: Record<Language, AboutPageContent> = {
  en: {
    headerBadge: "Our Purpose & Approach",
    headerTitle: "Smart, Simple Water Testing — For All.",
    headerDesc: "AquaScope was created to break down the technical, financial, and logistical barriers to reliable drinking-water testing, ensuring communities everywhere can verify their water safety on-site.",

    missionBadge: "Our Mission",
    missionTitle: "Why We Are Developing Accessible Water Testing",
    missionP1: "Access to clean, safe drinking water is a fundamental human right, yet contaminated water supplies remain one of the leading global causes of preventable childhood illness and mortality. Conventional microbiological testing methods are centralized in distant laboratories, requiring costly sample couriers, delicate glassware, and protracted incubation times that leave communities vulnerable during contamination events.",
    missionP2: "AquaScope brings the laboratory to the water source. Our interdisciplinary team of biologists, optical physicists, and software engineers designed a robust, portable testing system from the ground up—working in close collaboration with WASH officers, community caretakers, and public health researchers.",

    pillar1Title: "User-Centred Design",
    pillar1Desc: "Built for the real conditions of field deployment. Intuitive workflows ensure local operators can perform reliable tests with standard operating procedures.",
    pillar2Title: "Scientific Rigor",
    pillar2Desc: "Strict adherence to ISO 9308-1 membrane filtration standards and verified through independent accredited microbiology laboratories.",
    pillar3Title: "Decentralized Telemetry",
    pillar3Desc: "Test data is uploaded directly to shared water quality dashboards, allowing regional utilities and WASH agencies to target infrastructure repairs effectively.",

    val1Title: "Inclusive Participation",
    val1Desc: "We believe water safety should not be restricted to centralized urban laboratories. We enable local communities to test their own water supplies autonomously.",
    val2Title: "Verifiable Transparency",
    val2Desc: "We do not claim our product detects every contaminant. We clearly communicate its exact microbiological scope: rapid, sensitive detection of E. coli and coliform bacteria.",
    val3Title: "Human Dignity & Health",
    val3Desc: "Every test performed has a direct human objective: preventing waterborne infection, guiding chlorination interventions, and safeguarding community health.",

    ctaTitle: "Partner With Us on Water Safety",
    ctaDesc: "Whether you represent a humanitarian organization, a municipal water utility, or an academic research team, we welcome collaboration to validate and scale accessible water testing.",
    ctaBtn1: "Get in Touch",
    ctaBtn2: "Explore Our Field Projects"
  },

  am: {
    headerBadge: "ዓላማችን እና አካሄዳችን",
    headerTitle: "ዘመናዊ፣ ቀላል የውሃ ምርመራ — ለሁሉም።",
    headerDesc: "AquaScope የተመሰረተው አስተማማኝ የመጠጥ ውሃ ምርመራን የሚገድቡ ቴክኒካዊ፣ ፋይናንሳዊ እና ሎጂስቲክሳዊ እንቅፋቶችን ለማስወገድ ነው፤ ይህም በየትኛውም ቦታ የሚገኙ ማህበረሰቦች የውሃቸውን ደህንነት በቦታው እንዲያረጋግጡ ያስችላል።",

    missionBadge: "ተልዕኳችን",
    missionTitle: "ተደራሽ የውሃ ምርመራን ለምን እናለማለን?",
    missionP1: "ንጹህና ደህንነቱ የተጠበቀ የመጠጥ ውሃ ማግኘት መሰረታዊ የሰው ልጅ መብት ነው፤ ሆኖም የተበከሉ የውሃ አቅርቦቶች አሁንም በዓለም ዙሪያ ለህጻናት ህመም እና ሞት ዋነኛ መንስኤ ሆነው ቀጥለዋል። ባህላዊ የማይክሮባዮሎጂ ምርመራዎች በሩቅ ላብራቶሪዎች የተወሰኑ በመሆናቸው፣ ውድ የናሙና ማጓጓዝን፣ ተሰባሪ የመስታወት እቃዎችን እና ረጅም የምርመራ ጊዜን የሚሹ በመሆናቸው ማህበረሰቦችን ለአደጋ ያጋልጣሉ።",
    missionP2: "AquaScope ላብራቶሪውን በቀጥታ ወደ ውሃው ምንጭ ያመጣል። የባዮሎጂስቶች፣ የኦፕቲካል ፊዚክስ ባለሙያዎች እና የሶፍትዌር መሐንዲሶች ቡድናችን ከ WASH ባለሙያዎች፣ ከማህበረሰብ ተቆጣጣሪዎች እና ከህዝብ ጤና ተመራማሪዎች ጋር በቅርበት በመስራት ጠንካራና ተንቀሳቃሽ የመመርመሪያ ስርዓት ፈጥሯል።",

    pillar1Title: "ተጠቃሚን ማዕከል ያደረገ ንድፍ",
    pillar1Desc: "ለእውነተኛ የመስክ ስራ ሁኔታዎች የተሰራ። ቀላል የአሰራር ቅደም ተከተሎች የአካባቢው ኦፕሬተሮች ደረጃውን የጠበቀ አስተማማኝ ምርመራ እንዲያካሂዱ ያረጋግጣሉ።",
    pillar2Title: "ሳይንሳዊ ጥንካሬ",
    pillar2Desc: "የ ISO 9308-1 የሜምብሬን ማጣሪያ ደረጃዎችን በጥብቅ የተከተለ እና በገለልተኛ እውቅና ባላቸው ማይክሮባዮሎጂ ላብራቶሪዎች የተረጋገጠ።",
    pillar3Title: "ያልተማከለ የመረጃ ልውውጥ",
    pillar3Desc: "የምርመራ መረጃ በቀጥታ ወደ የጋራ የውሃ ጥራት ዳሽቦርድ ይላካል፤ ይህም የክልል የውሃ ተቋማት እና የ WASH ድርጅቶች የመሰረተ ልማት ጥገናዎችን በትክክል እንዲያነጣጥሩ ያስችላል።",

    val1Title: "ሁሉን አቀፍ ተሳትፎ",
    val1Desc: "የውሃ ደህንነት በከተማ ማዕከላዊ ላብራቶሪዎች ብቻ መወሰን የለበትም ብለን እናምናለን። የአካባቢ ማህበረሰቦች የራሳቸውን የውሃ አቅርቦት ራሳቸውን ችለው እንዲመረምሩ እናበቃለን።",
    val2Title: "ሊረጋገጥ የሚችል ግልጽነት",
    val2Desc: "ምርታችን ሁሉንም በካዮች ያውቃል የሚል የውሸት የይስሙላ ማስታወቂያ አንሰራም። ትክክለኛውን የማይክሮባዮሎጂ ወሰኑን በግልጽ እናሳውቃለን፡ ፈጣን እና ስሜታዊ የሆነ የኢ. ኮላይ እና ኮሊፎርም ባክቴሪያ መለያ ነው።",
    val3Title: "የሰው ልጅ ክብር እና ጤና",
    val3Desc: "እያንዳንዱ የሚካሄድ ምርመራ ቀጥተኛ ሰብአዊ ዓላማ አለው፡ በውሃ ወለድ የሚመጡ በሽታዎችን መከላከል፣ የክሎሪን ህክምናን መምራት እና የማህበረሰብ ጤናን መጠበቅ።",

    ctaTitle: "በውሃ ደህንነት ላይ አብረውን ይስሩ",
    ctaDesc: "የሰብአዊ እርዳታ ድርጅትን፣ የማዘጋጃ ቤት የውሃ ተቋምን ወይም የአካዳሚክ የምርምር ቡድንን ቢወክሉ፣ ተደራሽ የውሃ ምርመራን ለማረጋገጥ እና ለማስፋፋት አብረን ለመስራት ክፍት ነን።",
    ctaBtn1: "ያነጋግሩን",
    ctaBtn2: "የመስክ ፕሮጀክቶቻችንን ይመልከቱ"
  },

  om: {
    headerBadge: "Kaayyoo fi Adeemsa Keenya",
    headerTitle: "Qorannoo Bishaan Ammayyaa fi Salphaa — Hundaaf.",
    headerDesc: "AquaScope gufuulee teeknikaa, maallaqaa fi loojistiksii qorannoo bishaan dhugaatii amansiisaa ta'e dhabamsiisuuf kan hundeeffame yoo ta'u, hawaasni bakka hundatti argamu nageenya bishaan isaanii achumatti akka mirkaneeffatan taasisa.",

    missionBadge: "Ergama Keenya",
    missionTitle: "Qorannoo Bishaan Dhaqqabamaa Maaliif Hojjenna?",
    missionP1: "Bishaan dhugaatii qulqulluu fi nagaa qabu argachuun mirga bu'uuraa dhala namaati; ta'us dhiyeessiin bishaan faalame addunyaa irratti dhukkuba fi du'a daa'immaniitiif sababa guddaa ta'ee itti fufeera. Malli qorannoo aadaa laabraatoorii fagoo keessatti kan daangeffame waan ta'eef, baasii guddaa, meeshaa fuullee laafaa fi yeroo dheeraa fudhachuun hawaasa miidhaaf saaxila.",
    missionP2: "AquaScope laabraatoorii kallattiin gara burqaa bishaaniitti fida. Gareen ogeessota baayoloojii, fiiziksii optikaalaa fi injinaroota sooftiweerii keenyaa ogeessota WASH, kunuunsitoota hawaasaa fi qorattoota fayyaa wajjin ta'uun sirna qorannoo jabaataa fi socho'aa ta'e qopheessaniiru.",

    pillar1Title: "Fayyedamaa Giddu-galeessa kan Godhate",
    pillar1Desc: "Haala qabatamaa hojii dirreetiif kan hojjetame. Adeemsi salphaan ogeessotni naannoo ulaagaa eeguun qorannoo amansiisaa akka gaggeessan mirkaneessa.",
    pillar2Title: "Cimina Saayinsii",
    pillar2Desc: "Ulaagaalee calaltuu meembraanii ISO 9308-1 cimsanii hordofuu fi laabraatooriiwwan maaykiroobaayoloojii beekamoo ta'aniin kan mirkanaa'e.",
    pillar3Title: "Ragaa Bittinaa'aa",
    pillar3Desc: "Ragaan qorannoo kallattiin gara daashboordii qulqullina bishaaniitti ergamee dhaabbileen bishaanii fi WASH suphaa bu'uuraalee misoomaa sirriitti akka raawwatan gargaara.",

    val1Title: "Hirmaannaa Hunda-Galeessa",
    val1Desc: "Nageenyi bishaanii laabraatoorii magaalaa giddu-galeessaa qofatti daangeffamuu hin qabu jennee amanna. Hawaasni naannoo dhiyeessii bishaan isaanii of danda'anii akka qoratan dandeessifna.",
    val2Title: "Ibsama Mirkanaa'uu Danda'u",
    val2Desc: "Meeshaan keenya wantoota faalan hunda adda baasa jennee oduu sobaa hin beeksisnu. Daangaa maaykiroobaayoloojii isaa ifatti beeksifna: qorannoo saffisaa fi sirrii ta'e kan baakteeriyaa E. coli fi koliifoormiiti.",
    val3Title: "Ulfinna Dhala Namaa fi Fayyaa",
    val3Desc: "Qorannoon gaggeeffamu hundi kaayyoo namummaa kallattii qaba: dhukkuboota bishaaniin daddarban ittisuu, yaala kilooriinii qajeelchuu fi fayyaa hawaasaa eeguu.",

    ctaTitle: "Nageenya Bishaanii Irratti Nu Wajjin Hojjedhaa",
    ctaDesc: "Dhaabbata namoomaa, tajaajila bishaan magaalaa, ykn garee qorannoo barnootaa yoo bakka buutan, qorannoo bishaan dhaqqabamaa ta'e mirkaneessuu fi babal'isuuf waliin hojjechuuf qophiidha.",
    ctaBtn1: "Nu Qunnamaa",
    ctaBtn2: "Piroojektiiwwan Dirree Keenya Ilaalaa"
  },

  ti: {
    headerBadge: "ዕላማናን ኣካይዳናን",
    headerTitle: "ዘመናዊ፣ ቀሊል ናይ ማይ መርመራ — ንኹሉ።",
    headerDesc: "AquaScope ንዘተኣማምን ናይ መስተ ማይ መርመራ ዝዕንቅፉ ቴክኒካዊ፣ ፋይናንሳውን ሎጂስቲክሳውን ዕንቅፋታት ንምውጋድ ዝተመስረተ ኮይኑ፣ ኣብ ኩሉ ቦታታት ዝርከቡ ማሕበረሰባት ናይ ማዮም ድሕንነት ኣብቲ ቦታ ከረጋግጹ የኽእል።",

    missionBadge: "ተልእኾና",
    missionTitle: "ተበጻሒ ናይ ማይ መርመራ ንምንታይ ነማዕብል?",
    missionP1: "ጽሩይን ድሑንን ናይ መስተ ማይ ምርካብ መሰረታዊ ናይ ሰብኣዊ መሰል እዩ፤ እንተኾነ ግን ዝተበከሉ ቀረባት ማይ ኣብ መላእ ዓለም ንሕማምን ሞትን ህጻናት ቀንዲ ጠንቂ ኮይኖም ይቕጽሉ ኣለዉ። ባህላዊ ናይ ላብራቶሪ መርመራታት ኣብ ርሑቕ ከተማታት ዝተሓጸሩ ብምዃኖም፣ ክቡር ዋጋ፣ ዝስበር ኣቑሑትን ነዊሕ ግዜን ዝሓቱ ስለዝኾኑ ንማሕበረሰባት ኣብ ሓደጋ የውድቑ።",
    missionP2: "AquaScope ነቲ ላብራቶሪ ብቐጥታ ናብቲ ናይ ማይ ምንጪ የብጽሖ። ናይ ባዮሎጂ፣ ናይ ኦፕቲካል ፊዚክስን ናይ ሶፍትዌር መሃንድሳትን ጉጅለና ምስ ሰብ ሞያ WASH፣ ምስ ተቖጻጸርቲ ማሕበረሰብን ምስ ተመራመርቲ ጥዕናን ብቐረባ ብምስራሕ ድልዱልን ተንቀሳቓስን ናይ መርመራ ስርዓት ፈጢሮም ኣለዉ።",

    pillar1Title: "ተጠቃሚ ማእከል ዝገበረ ዲዛይን",
    pillar1Desc: "ንተግባራዊ ናይ ሜዳ ኩነታት ዝተሰርሐ። ቀለልቲ ናይ ኣሰራርሓ ቅደም ተኸተላት ናይ ከባቢ ኦፕሬተራት ደረጃ ዝሓለወ ዘተኣማምን መርመራ ከካይዱ የረጋግጹ።",
    pillar2Title: "ሳይንሳዊ ድልዳለ",
    pillar2Desc: "ናይ ISO 9308-1 ናይ ሜምብሬን ምጽራይ ደረጃታት ብጽኑዕ ዝተኸተለን ብናጻ ፍሉጣት ላብራቶሪታት ዝተረጋገጸን።",
    pillar3Title: "ዘይተማእከለ ናይ መረዳእታ ምትእስሳር",
    pillar3Desc: "መረዳእታ መርመራ ብቐጥታ ናብ ሓባራዊ ናይ ማይ ጽሬት ዳሽቦርድ ይለኣኽ፤ እዚ ድማ ትካላት ማይን ውድባት WASHን ናይ ጽገና ስራሕቲ ብትኽክል ከካይዱ የኽእሎም።",

    val1Title: "ኩሉ-ሓቆፍ ተሳትፎ",
    val1Desc: "ናይ ማይ ድሕንነት ኣብ ናይ ከተማ ማእከላይ ላብራቶሪታት ጥራይ ክድረት የብሉን ኢልና ንኣምን። ናይ ከባቢ ማሕበረሰባት ናይ ባዕሎም ቀረብ ማይ ባዕሎም ክምርምሩ ነብቅዕ።",
    val2Title: "ክረጋገጽ ዝኽእል ግሉጽነት",
    val2Desc: "ፍርያትና ኩሉ ዓይነት በከልቲ የለልይ እዩ ዝብል ናይ ሓሶት ምልክታ ኣይንሰርሕን። ትኽክለኛ ናይ ማይክሮባዮሎጂ ደረቱ ብግልጺ ነፍልጥ፡ ቅልጡፍን ተሃዋስን መለለዪ ናይ ኢ. ኮላይን ኮሊፎርምን ባክቴርያ እዩ።",
    val3Title: "ናይ ሰብኣዊ ክብሪን ጥዕናን",
    val3Desc: "ነፍሲ ወከፍ ዝካየድ መርመራ ቀጥታዊ ሰብኣዊ ዕላማ ኣለዎ፡ ብማይ ዝመሓላለፉ ሕማማት ምክልኻል፣ ናይ ክሎሪን ሕክምና ምምራሕን ናይ ማሕበረሰብ ጥዕና ምሕላውን።",

    ctaTitle: "ኣብ ናይ ማይ ድሕንነት ምሳና ስርሑ",
    ctaDesc: "ሰብኣዊ ውድብ፣ ናይ ማዘጋጃ ቤት ትካል ማይ፣ ወይ ናይ ምርምር ጉጅለ እንተወኪልኩም፣ ተበጻሒ ናይ ማይ መርመራ ንምርግጋጽን ንምስፋሕን ብሓባር ንምስራሕ ድሉዋት ኢና።",
    ctaBtn1: "ተወከሱና",
    ctaBtn2: "ናይ ሜዳ ፕሮጀክትታትና ተዓዘቡ"
  }
};
`;

const dataDir = path.resolve(__dirname, '../src/data');
fs.writeFileSync(path.join(dataDir, 'homeContent.ts'), homeContent, 'utf8');
fs.writeFileSync(path.join(dataDir, 'technologyContent.ts'), technologyContent, 'utf8');
fs.writeFileSync(path.join(dataDir, 'aboutContent.ts'), aboutContent, 'utf8');
console.log('Successfully generated homeContent.ts, technologyContent.ts, and aboutContent.ts!');
