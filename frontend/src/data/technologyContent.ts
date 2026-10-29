import { Language } from '../i18n/types';

export interface TechFeature {
  title: string;
  tag: string;
  desc: string;
}

export interface TechChallenge {
  title: string;
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
  challenges: TechChallenge[];

  pillarsTag: string;
  pillarsTitle: string;
  pillarsDesc: string;
  pillars: TechFeature[];

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

const data: Record<string, TechnologyPageContent> = {
  en: {
    // Slide 4: The WaterScope System
    headerBadge: "The WaterScope System",
    headerTitle: "Smart, Simple, Digital Water Testing for All",
    headerDesc: "An open-source innovative water testing system, enabling inclusive access to smart, easy-to-use, and reliable testing for bacterial presence in drinking water. Originally developed by Cambridge University Engineers.",

    // Slide 3: Key Challenges in Water Quality Monitoring
    barrierBadge: "Structural Barriers",
    barrierQuote: "The current monitoring ecosystem faces structural barriers. Most systems are expensive and imported. They rely on fragile supply chains. Many require technical expertise that is difficult to sustain in rural areas. They are often not digitally connected — meaning data remains isolated. And scaling them across thousands of rural water points becomes nearly impossible. This is not a technology failure. It is a systems design problem.",
    barrierWho: "Key Challenges in Water Quality Monitoring (Slide 3): High costs limit adoption; reliance on foreign products hinders local solutions; fragile supply chains fail due to logistics.",
    challenges: [
      {
        title: "Expensive",
        desc: "High costs limit widespread adoption of testing kits."
      },
      {
        title: "Imported",
        desc: "Reliance on foreign products hinders local solutions."
      },
      {
        title: "Technically Complex",
        desc: "Many systems require specialized training to operate."
      },
      {
        title: "Fragile Supply Chains",
        desc: "Vulnerable systems can fail due to logistical issues."
      },
      {
        title: "Not Digitally Connected",
        desc: "Limited data sharing complicates monitoring efforts."
      },
      {
        title: "Difficult to Scale",
        desc: "Rural areas face unique challenges in implementation."
      }
    ],

    // Slide 5: Key Features of WaterScope System (All 9 Features)
    pillarsTag: "Key Features of WaterScope System",
    pillarsTitle: "Designed Around Practical Field Needs",
    pillarsDesc: "The system is designed around practical field needs: Rapid — with early indication in as little as 8 hours and full quantitative results in 21 hours. Portable and robust — built for low-resource environments. Reliable — benchmarked against ISO 9308 standards and externally validated. Digital and smart — using embedded microscopy and machine learning to automate colony counting. And data-driven — enabling real-time monitoring and centralized reporting through a mobile app and dashboard. Most importantly, it reduces financial barriers for communities.",
    pillars: [
      {
        title: "Rapid",
        tag: "8 to 21 Hours",
        desc: "Provides immediate results for water quality testing (early indication in as little as 8 hours and full quantitative results in 21 hours)."
      },
      {
        title: "Portable",
        tag: "Low-Resource",
        desc: "Designed for easy transport to remote locations. Designed for low-resource environments."
      },
      {
        title: "Simple",
        tag: "Ease of Operation",
        desc: "User-friendly design ensures ease of operation."
      },
      {
        title: "Reliable",
        tag: "ISO 9308",
        desc: "Provides consistent and accurate water quality results. Benchmarked against ISO 9308 standards and externally validated."
      },
      {
        title: "Robust",
        tag: "Field-Adapted",
        desc: "Designed to withstand challenging field conditions."
      },
      {
        title: "Digital",
        tag: "Embedded Optics",
        desc: "Integrates advanced technology for data-driven insights. Uses embedded microscopy and machine learning to automate colony counting."
      },
      {
        title: "Smart",
        tag: "Real-Time Data",
        desc: "Provides real-time data for informed decision-making."
      },
      {
        title: "Affordable",
        tag: "Up to 80% Savings",
        desc: "Designed to be cost-effective for local communities, reducing financial barriers."
      },
      {
        title: "Data-Driven",
        tag: "App & Dashboard",
        desc: "Utilizes advanced analytics to improve water quality, enabling real-time monitoring and centralized reporting by using its mobile app and dashboard."
      }
    ],

    // Workflow
    sopBadge: "Cartridge-Based Testing Workflow",
    sopTitle: "Simplified 8-Minute Sample Processing",
    sopDesc: "A cartridge-based membrane filtration method combining automated colony detection using machine learning.",
    stages: [
      {
        num: "1",
        title: "Sample Drawing",
        desc: "A standard 100mL drinking water sample is drawn using the battery-powered motorized vacuum pump in under 3 minutes.",
        highlight: "Motorized vacuum filtration eliminates hand syringe pumping fatigue."
      },
      {
        num: "2",
        title: "Patented Cartridge Filtration",
        desc: "Water filters through the patented metal cartridge, retaining target bacteria on a 0.45µm nitrocellulose membrane filter pad.",
        highlight: "Eliminates risky field flame sterilization and aseptic technique requirements."
      },
      {
        num: "3",
        title: "Media Inoculation & Incubation",
        desc: "Nutrient broth media is introduced to the absorbent pad slider and inserted into the internal dual 37°C/44°C incubator.",
        highlight: "Zero cold-chain refrigeration needed; maintains ±0.3°C thermal stability."
      },
      {
        num: "4",
        title: "Automated Microscopic Imaging",
        desc: "The embedded digital microscope module captures high-resolution imagery as bacterial microcolonies begin proliferating.",
        highlight: "Early indication in as little as 8 hours, long before colonies can be seen by naked eye."
      },
      {
        num: "5",
        title: "Machine Learning Colony Counting",
        desc: "Automated computer vision algorithm segments and enumerates bacterial colonies directly on the membrane filter grid.",
        highlight: "Eliminates subjective human counting bias and technician eye strain."
      },
      {
        num: "6",
        title: "Mobile App & Dashboard Sync",
        desc: "Test results sync via Bluetooth to the mobile app and upload to the central dashboard for real-time monitoring.",
        highlight: "Provides geolocated, audit-ready water quality records."
      }
    ],

    // Slide 5, 7, 9: Technical Specifications
    specsBadge: "Verified Engineering Specifications",
    specsTitle: "System Parameters & Technical Benchmarks",
    colParam: "Parameter",
    colSpec: "WaterScope System Specification",
    colStandard: "Reference / Validation",
    specsRows: [
      {
        param: "Testing Method",
        spec: "Open-source cartridge-based membrane filtration with automated colony detection",
        standard: "Originally developed by Cambridge University Engineers"
      },
      {
        param: "Diagnostic Speed",
        spec: "Early indication in 8 hours; full quantitative results in 21 hours",
        standard: "Provides immediate results compared to 24–48h delays"
      },
      {
        param: "Testing Standards",
        spec: "Provides consistent and accurate results for E. coli & Coliforms",
        standard: "Benchmarked against ISO 9308 standards and externally validated"
      },
      {
        param: "Local Manufacturing",
        spec: "Manufactured using 3D printing and machining technologies at Bahir Dar University",
        standard: "Lowers costs by up to 80% compared to imported kits"
      },
      {
        param: "Mobility & Portability",
        spec: "5.8 kg all-in-one testing station in rugged field case",
        standard: "Designed for easy transport to remote, low-resource locations"
      },
      {
        param: "Colony Counting",
        spec: "Automated colony detection using embedded microscopy and machine learning",
        standard: "Eliminates human counting bias and eye strain"
      },
      {
        param: "Data Reporting",
        spec: "Real-time monitoring and centralized reporting via mobile app and dashboard",
        standard: "Data-driven insights for communities and health bureaus"
      },
      {
        param: "Institutional Confidence",
        spec: "Prior pilots in Ethiopia and Kenya; Letter of Intent for up to 30 units (ACF)",
        standard: "Demonstrated field usability in East African contexts"
      }
    ],

    docTitle: "Download Technical Presentation & Field Guides",
    docDesc: "Access the complete presentation materials, Standard Operating Procedures (SOP), and system specifications.",
    docBtn1: "Browse Technical Documentation",
    docBtn2: "Get in Touch with Engineers"
  },

  am: {
    headerBadge: "የ WaterScope ስርዓት",
    headerTitle: "ዘመናዊ፣ ቀላል፣ ዲጂታል የውሃ ምርመራ ለሁሉም",
    headerDesc: "በመጠጥ ውሃ ውስጥ የባክቴሪያ መኖርን ለማረጋገጥ ዘመናዊ፣ ቀላል እና አስተማማኝ ምርመራን ተደራሽ የሚያደርግ ክፍት የፈጠራ ስርዓት። መጀመሪያ በካምብሪጅ ዩኒቨርሲቲ መሐንዲሶች የተገነባ።",

    barrierBadge: "መዋቅራዊ እንቅፋቶች",
    barrierQuote: "የአሁኑ የክትትል ስነ-ምህዳር መዋቅራዊ እንቅፋቶች ያጋጥሙታል። አብዛኛዎቹ ስርዓቶች ውድ እና ከውጭ የሚገቡ ናቸው። በቀላሉ በሚስተጓጎሉ የአቅርቦት ሰንሰለቶች ላይ ጥገኛ ናቸው። ብዙዎቹ በገጠር አካባቢዎች ለማስቀጠል አስቸጋሪ የሆነ ልዩ ቴክኒካዊ ስልጠና ይፈልጋሉ። ብዙ ጊዜ በዲጂታል መንገድ የተገናኙ አይደሉም — ይህም መረጃ ተለይቶ እንዲቀር ያደርገዋል። በሺዎች በሚቆጠሩ የገጠር የውሃ ነጥቦች ላይ ማስፋፋት ፈጽሞ የማይቻል ይሆናል። ይህ የቴክኖሎጂ ውድቀት አይደለም። የስርዓት ንድፍ ችግር ነው።",
    barrierWho: "በውሃ ጥራት ክትትል ውስጥ ያሉ ቁልፍ ፈተናዎች፡ ውድ፣ ከውጭ የሚገባ፣ በቴክኒክ ውስብስብ፣ ደካማ የአቅርቦት ሰንሰለት፣ በዲጂታል ያልተገናኘ፣ ለማስፋፋት አስቸጋሪ።",
    challenges: [
      {
        title: "ውድ (Expensive)",
        desc: "ከፍተኛ ወጪ የመመርመሪያ ኪቶች በስፋት ጥቅም ላይ እንዳይውሉ ይገድባል።"
      },
      {
        title: "ከውጭ የሚገባ (Imported)",
        desc: "በውጭ ምርቶች ላይ ጥገኛ መሆን የአገር ውስጥ መፍትሄዎችን ያደናቅፋል።"
      },
      {
        title: "በቴክኒክ ውስብስብ (Technically Complex)",
        desc: "ብዙ ስርዓቶች ለመስራት ልዩ ስልጠና ይፈልጋሉ።"
      },
      {
        title: "ደካማ የአቅርቦት ሰንሰለት (Fragile Supply Chains)",
        desc: "ተጋላጭ ስርዓቶች በሎጂስቲክስ ችግሮች ምክንያት ሊበላሹ ይችላሉ።"
      },
      {
        title: "በዲጂታል ያልተገናኘ (Not Digitally Connected)",
        desc: "ውስን የመረጃ ልውውጥ የክትትል ጥረቶችን ያወሳስባል።"
      },
      {
        title: "ለማስፋፋት አስቸጋሪ (Difficult to Scale)",
        desc: "የገጠር አካባቢዎች በተግባራዊ አፈፃፀም ላይ ልዩ ፈተናዎች ያጋጥሟቸዋል።"
      }
    ],

    pillarsTag: "የ WaterScope ስርዓት ቁልፍ ገጽታዎች",
    pillarsTitle: "በተግባራዊ የመስክ ፍላጎቶች ዙሪያ የተነደፈ",
    pillarsDesc: "ስርዓቱ በተግባራዊ የመስክ ፍላጎቶች ዙሪያ የተነደፈ ነው፡ ፈጣን — ቀደም ያለ ምልክት በ 8 ሰዓት ውስጥ እና ሙሉ አሃዛዊ ውጤት በ 21 ሰዓት ውስጥ። ተንቀሳቃሽ እና ጠንካራ — ዝቅተኛ ሀብት ላላቸው አካባቢዎች የተሰራ። አስተማማኝ — ከ ISO 9308 ደረጃዎች ጋር የተነጻጸረ እና በውጭ አካል የተረጋገጠ። ዲጂታል እና ዘመናዊ — የተቀናጀ ማይክሮስኮፒ እና ማሽን ለርኒንግ በመጠቀም የቅኝ ግዛት ቆጠራን አውቶሜት ያደረገ። እና በመረጃ ላይ የተመሰረተ — በሞባይል መተግበሪያ እና ዳሽቦርድ አማካኝነት የእውነተኛ ጊዜ ክትትል እና ማዕከላዊ ሪፖርትን የሚያስችል።",
    pillars: [
      {
        title: "ፈጣን (Rapid)",
        tag: "ከ 8 እስከ 21 ሰዓታት",
        desc: "ለውሃ ጥራት ምርመራ ፈጣን ውጤቶችን ይሰጣል (ቀደም ያለ ምልክት በ 8 ሰዓታት እና ሙሉ አሃዛዊ ውጤት በ 21 ሰዓታት)።"
      },
      {
        title: "ተንቀሳቃሽ (Portable)",
        tag: "ዝቅተኛ ሀብት",
        desc: "ወደ ሩቅ ቦታዎች በቀላሉ ለማጓጓዝ የተነደፈ። ዝቅተኛ ሀብት ላላቸው አካባቢዎች የተሰራ።"
      },
      {
        title: "ቀላል (Simple)",
        tag: "ቀላል አሰራር",
        desc: "ለተጠቃሚ ምቹ የሆነ ንድፍ የአሰራር ቀላልነትን ያረጋግጣል።"
      },
      {
        title: "አስተማማኝ (Reliable)",
        tag: "ISO 9308",
        desc: "ወጥ እና ትክክለኛ የውሃ ጥራት ውጤቶችን ይሰጣል። ከ ISO 9308 ደረጃዎች ጋር የተነጻጸረ እና በውጭ አካል የተረጋገጠ።"
      },
      {
        title: "ጠንካራ (Robust)",
        tag: "ለመስክ የተስማማ",
        desc: "ፈታኝ የመስክ ሁኔታዎችን ለመቋቋም የተነደፈ።"
      },
      {
        title: "ዲጂታል (Digital)",
        tag: "የተቀናጀ ኦፕቲክስ",
        desc: "በመረጃ ላይ ለተመሰረተ ግንዛቤ የላቀ ቴክኖሎጂን ያጣምራል። የተቀናጀ ማይክሮስኮፒ እና ማሽን ለርኒንግ በመጠቀም የቅኝ ግዛት ቆጠራን አውቶሜት ያደርጋል።"
      },
      {
        title: "ዘመናዊ (Smart)",
        tag: "የእውነተኛ ጊዜ መረጃ",
        desc: "በመረጃ ላይ ለተመሰረተ ውሳኔ አሰጣጥ የእውነተኛ ጊዜ መረጃ ይሰጣል።"
      },
      {
        title: "ተመጣጣኝ (Affordable)",
        tag: "እስከ 80% ቅነሳ",
        desc: "የገንዘብ እንቅፋቶችን በመቀነስ ለአካባቢው ማህበረሰቦች ወጪ ቆጣቢ እንዲሆን የተነደፈ።"
      },
      {
        title: "በመረጃ ላይ የተመሰረተ (Data-Driven)",
        tag: "መተግበሪያ እና ዳሽቦርድ",
        desc: "የውሃ ጥራትን ለማሻሻል የላቀ ትንታኔን ይጠቀማል፣ የሞባይል መተግበሪያውን እና ዳሽቦርዱን በመጠቀም የእውነተኛ ጊዜ ክትትል እና ማዕከላዊ ሪፖርትን ያስችላል።"
      }
    ],

    sopBadge: "በካርትሪጅ ላይ የተመሰረተ የምርመራ ሂደት",
    sopTitle: "በ 8 ደቂቃ ውስጥ የሚከናወን የቀለለ የናሙና ዝግጅት",
    sopDesc: "የማሽን ለርኒንግ አውቶሜትድ የቅኝ ግዛት ቆጠራን ከካርትሪጅ ዘዴ ጋር ያጣመረ የሜምብሬን ማጣሪያ ዘዴ።",
    stages: [
      {
        num: "1",
        title: "የናሙና አወሳሰድ",
        desc: "በባትሪ ከሚሰራው የቫክዩም ፓምፕ ጋር የተገናኘውን ፓምፕ በመጠቀም መደበኛ 100 ሚሊ ሊትር የመጠጥ ውሃ ናሙና ከ 3 ደቂቃ ባነሰ ጊዜ ውስጥ ይወሰዳል።",
        highlight: "በሞተር የሚሰራ የቫክዩም ማጣሪያ የእጅ ፓምፕ ድካምን ያስቀራል።"
      },
      {
        num: "2",
        title: "በካርትሪጅ ማጣራት",
        desc: "ውሃው በማይዝግ ብረት ካርትሪጅ ውስጥ በማለፍ ባክቴሪያዎችን በ 0.45µm ሜምብሬን ፊልተር ላይ ያስቀራል።",
        highlight: "አደገኛ የሆነውን የመስክ እሳት ማምከን እና ልዩ የላብራቶሪ ችሎታን ያስቀራል።"
      },
      {
        num: "3",
        title: "ሚዲያ መጨመር እና ኢንኩቤሽን",
        desc: "ፈሳሽ የእድገት ሚዲያ ይጨመራል፤ ከዚያም በ 37°C/44°C የሙቀት ኢንኩቤተር ውስጥ ይቀመጣል።",
        highlight: "ማቀዝቀዣ አያስፈልገውም፤ ትክክለኛውን ±0.3°C የሙቀት መጠን ይጠብቃል።"
      },
      {
        num: "4",
        title: "አውቶሜትድ ማይክሮስኮፒክ ምስል",
        desc: "የተቀናጀው ዲጂታል ማይክሮስኮፕ ባክቴሪያዎች መብዛት ሲጀምሩ ከፍተኛ ጥራት ያለው ምስል ያነሳል።",
        highlight: "ቅኝ ግዛቶች በሰው ዐይን ከመታየታቸው በፊት በ 8 ሰዓት ውስጥ መኖራቸውን ይለያል።"
      },
      {
        num: "5",
        title: "የማሽን ለርኒንግ የቅኝ ግዛት ቆጠራ",
        desc: "የኮምፒውተር ቪዥን ስልተ-ቀመር በሜምብሬኑ ላይ ያሉትን የባክቴሪያ ቅኝ ግዛቶች በራስ-ሰር ለይቶ ይቆጥራል።",
        highlight: "የሰው ቆጠራ ስህተትን እና የአይን ድካምን ያስቀራል።"
      },
      {
        num: "6",
        title: "የሞባይል መተግበሪያ እና ዳሽቦርድ ማመሳሰል",
        desc: "ውጤቶቹ በብሉቱዝ ወደ ሞባይል መተግበሪያ ይመሳሰላሉ፤ ለእውነተኛ ጊዜ ክትትል ወደ ማዕከላዊ ዳሽቦርድ ይላካሉ።",
        highlight: "በጂኦግራፊያዊ ካርታ የተደገፈ አስተማማኝ የውሃ ጥራት ሪፖርት ያዘጋጃል።"
      }
    ],

    specsBadge: "የተረጋገጡ የምህንድስና ዝርዝሮች",
    specsTitle: "የስርዓት መለኪያዎች እና ቴክኒካዊ ንጽጽሮች",
    colParam: "መለኪያ",
    colSpec: "የ WaterScope ዝርዝር መግለጫ",
    colStandard: "ማመሳከሪያ / ማረጋገጫ",
    specsRows: [
      {
        param: "የምርመራ ዘዴ",
        spec: "በካርትሪጅ ላይ የተመሰረተ ክፍት የሜምብሬን ማጣሪያ ከአውቶሜትድ የቅኝ ግዛት ቆጠራ ጋር",
        standard: "መጀመሪያ በካምብሪጅ ዩኒቨርሲቲ መሐንዲሶች የተገነባ"
      },
      {
        param: "የምርመራ ፍጥነት",
        spec: "ቀደም ያለ ምልክት በ 8 ሰዓት፤ ሙሉ አሃዛዊ ውጤት በ 21 ሰዓት",
        standard: "ከ 24–48 ሰዓታት መዘግየት ጋር ሲነጻጸር ፈጣን ውጤት ይሰጣል"
      },
      {
        param: "የምርመራ ደረጃዎች",
        spec: "ለኢ. ኮላይ እና ኮሊፎርም ባክቴሪያ ወጥ እና ትክክለኛ ውጤት ይሰጣል",
        standard: "ከ ISO 9308 ደረጃዎች ጋር የተነጻጸረ እና በውጭ አካል የተረጋገጠ"
      },
      {
        param: "የአገር ውስጥ ማምረት",
        spec: "የ 3D ህትመት እና የማሽን ቴክኖሎጂዎችን በመጠቀም በባህር ዳር ዩኒቨርሲቲ ይመረታል",
        standard: "ከውጭ ከሚገቡ ኪቶች ጋር ሲነጻጸር ወጪን እስከ 80% ይቀንሳል"
      },
      {
        param: "ተንቀሳቃሽነት",
        spec: "5.8 ኪ.ግ ሙሉ የመስክ ጣቢያ በጠንካራ ሻንጣ ውስጥ",
        standard: "ወደ ሩቅ እና ዝቅተኛ ሀብት ላላቸው አካባቢዎች በቀላሉ ለማጓጓዝ የተነደፈ"
      },
      {
        param: "የቅኝ ግዛት ቆጠራ",
        spec: "የተቀናጀ ማይክሮስኮፒ እና ማሽን ለርኒንግ በመጠቀም አውቶሜትድ ቆጠራ",
        standard: "የሰው ቆጠራ ስህተትን እና የአይን ድካምን ያስቀራል"
      },
      {
        param: "የመረጃ ሪፖርት",
        spec: "በሞባይል መተግበሪያ እና ዳሽቦርድ አማካኝነት የእውነተኛ ጊዜ ክትትል እና ማዕከላዊ ሪፖርት",
        standard: "ለማህበረሰቦች እና ለጤና ቢሮዎች በመረጃ ላይ የተመሰረተ ግንዛቤ"
      },
      {
        param: "የተቋማት እምነት",
        spec: "በኢትዮጵያ እና ኬንያ የተደረጉ ቀዳሚ ፓይለቶች፤ እስከ 30 ኪቶች የፍላጎት ደብዳቤ (ACF)",
        standard: "በምስራቅ አፍሪካ የመስክ ሁኔታዎች ውስጥ ተጠቃሚነቱ የተረጋገጠ"
      }
    ],

    docTitle: "ቴክኒካዊ ሰነዶችን እና የመስክ መመሪያዎችን ያውርዱ",
    docDesc: "ሙሉውን የቴክኒክ ገለጻዎች፣ መደበኛ የአሰራር ቅደም ተከተሎችን (SOP) እና ዝርዝሮችን ያግኙ።",
    docBtn1: "ቴክኒካዊ ሰነዶችን ይመልከቱ",
    docBtn2: "መሐንዲሶችን ያነጋግሩ"
  },

  om: {
    headerBadge: "Sirna WaterScope",
    headerTitle: "Qorannoo Bishaan Ammayyaa, Salphaa fi Dijitaalaa Hundaaf",
    headerDesc: "Sirna qorannoo bishaanii kalaqaa banaa ta'e, qorannoo baakteeriyaa bishaan dhugaatii keessatti salphaa, ammayyaa fi amansiisaa ta'e hundaaf dhaqqabamaa taasisa. Jalqaba Injinariin Yuunivarsiitii Keembiriijitiin kan hojjetame.",

    barrierBadge: "Gufuuwwan Caasaa",
    barrierQuote: "Sirni to'annoo ammaa gufuuwwan caasaa qaba. Sirnoonni baay'een gatii guddaa fi biyya alaarraa kan fidamaniidha. Sarara dhiyeessii salphatti miidhamu irratti hundaa'u. Baay'een isaanii leenjii addaa naannoo baadiyyaatti itti fufsiisuun ulfaataa ta'e barbaadu. Yeroo baay'ee dijitaalaan kan walqunnaman miti — kana jechuun daataan kophaatti hafa. Bakka bishaanii baadiyyaa kumaatama irratti babal'isuun rakkisaa ta'a. Kun kufaatii teeknooloojii miti. Rakkoo saxaxa sirnaati.",
    barrierWho: "Qormaata Ijoo To'annoo Qulqullina Bishaanii Keessatti: Gatii guddaa, biyya alaarraa kan dhufu, teeknikaan xaxamaa, sarara dhiyeessii dadhabaa, dijitaalaan kan hin walqunnanne, babal'isuuf rakkisaa.",
    challenges: [
      {
        title: "Gatii Guddaa (Expensive)",
        desc: "Gatiin guddaan kiitiiwwan qorannoo bal'inaan akka hin fayyadamne daangessa."
      },
      {
        title: "Biyya Alaarraa Kan Dhufu (Imported)",
        desc: "Oomishaalee biyya alaa irratti hirkachuun furmaata biyya keessaa gufachiisa."
      },
      {
        title: "Teeknikaan Xaxamaa (Technically Complex)",
        desc: "Sirnoonni baay'een hojjechuuf leenjii addaa barbaadu."
      },
      {
        title: "Sarara Dhiyeessii Dadhabaa (Fragile Supply Chains)",
        desc: "Sirnoonni miidhamoo ta'an rakkoo loojistiiksiitiin kufuu danda'u."
      },
      {
        title: "Dijitaalaan Kan Hin Walqunnanne (Not Digitally Connected)",
        desc: "Daataa qooddachuu daangeffamuun carraaqqii to'annoo xaxamaa taasisa."
      },
      {
        title: "Babal'isuuf Rakkisaa (Difficult to Scale)",
        desc: "Naannoleen baadiyyaa hojiirra oolchuu irratti qormaata addaa qabu."
      }
    ],

    pillarsTag: "Amaloota Ijoo Sirna WaterScope",
    pillarsTitle: "Fedhii Dirree Qabatamaa Irratti Hundaa'ee Kan Saxaxame",
    pillarsDesc: "Sirnichi fedhii dirree qabatamaa irratti hundaa'ee kan saxaxameedha: Ariifataa — mallattoo sa'aatii 8 fi lakkoofsa guutuu sa'aatii 21 keessatti. Socho'aa fi cimaa — naannolee qabeenyi itti xiqqaateef kan hojjetame. Amansiisaa — sadarkaa ISO 9308 wajjin kan walbira qabamee fi qaama alaan kan mirkanaa'e. Dijitaala fi ammayyaa — maayikirooskooppii fi maashin larniingii fayyadamee kolonii lakkaa'a. Daataa irratti kan hundaa'e — appii moobaayilaa fi daashboordiin gabaasa giddu galeessaa kenna.",
    pillars: [
      {
        title: "Ariifataa (Rapid)",
        tag: "Sa'aatii 8 hanga 21",
        desc: "Qorannoo qulqullina bishaaniitiif bu'aa yeroodhaa kenna (mallattoo sa'aatii 8 keessatti fi bu'aa guutuu sa'aatii 21 keessatti)."
      },
      {
        title: "Socho'aa (Portable)",
        tag: "Qabeenya Xiqqaateef",
        desc: "Bakkeewwan fagootti salphaatti fe'amuuf kan saxaxame. Naannolee qabeenya xiqqaataniif kan hojjetame."
      },
      {
        title: "Salphaa (Simple)",
        tag: "Hojiif Salphaa",
        desc: "Saxaxni fayyadamaaf mijatu hojjechuuf salphaa ta'uu isaa mirkaneessa."
      },
      {
        title: "Amansiisaa (Reliable)",
        tag: "ISO 9308",
        desc: "Bu'aa qulqullina bishaanii dhaabbataa fi sirrii ta'e kenna. Sadarkaa ISO 9308 wajjin kan walbira qabamee fi qaama alaan kan mirkanaa'e."
      },
      {
        title: "Cimaa (Robust)",
        tag: "Dirreef Mirkanaa'e",
        desc: "Haalawwan dirree qormaata qaban damdamachuuf kan saxaxame."
      },
      {
        title: "Dijitaala (Digital)",
        tag: "Optiiksii Qabata",
        desc: "Hubannoo ragaa irratti hundaa'eef teeknooloojii olaanaa walitti makuun maayikirooskooppii fi maashin larniingiin kolonii lakkaa'a."
      },
      {
        title: "Ammayyaa (Smart)",
        tag: "Daataa Yeroodhaa",
        desc: "Murtoo ragaa irratti hundaa'eef daataa yeroodhaa kenna."
      },
      {
        title: "Gatii Madaalawaa (Affordable)",
        tag: "Hamma 80% Hir'isa",
        desc: "Hawaasa naannoof gatii qusatamaa ta'ee fi gufuu maallaqaa akka hir'isuuf kan saxaxame."
      },
      {
        title: "Daataa Irratti Kan Hundaa'e (Data-Driven)",
        tag: "Appii fi Daashboordii",
        desc: "Qulqullina bishaanii fooyyessuuf xiinxala olaanaa fayyadama, appii moobaayilaa fi daashboordii fayyadamuun to'annoo yerootiifi gabaasa giddu galeessaa dandeessisa."
      }
    ],

    sopBadge: "Adeemsa Qorannoo Kaartiriidhaan",
    sopTitle: "Qophii Naamuunaa Daqiiqaa 8 Salphaa",
    sopDesc: "Mala calaltuu meembireenii maashin larningiidhaan lakkoofsa kolonii ofumaan hojjetu wajjin.",
    stages: [
      {
        num: "1",
        title: "Naamuunaa Fudhuu",
        desc: "Naamuunaa bishaan dhugaatii 100mL paampii vaakiyumii mootoraan hojjetuun daqiiqaa 3 gadi keessatti fudhatama.",
        highlight: "Calaltuu vaakiyumii mootoraan hojjetu dadhabbii harka dhabamsiisa."
      },
      {
        num: "2",
        title: "Kaartiriin Calaluu",
        desc: "Bishaan kaartirii sibiilaa keessa darbuun baakteeriyaa meembireenii 0.45µm irratti qaba.",
        highlight: "Gubaatii ibiddaa dirree fi qulqullina addaa hin barbaadu."
      },
      {
        num: "3",
        title: "Miidiyaa fi Inkiwubeeshinii",
        desc: "Miidiyaan nyaataa itti dabalamuun inkiwubeetara 37°C/44°C keessa kaa'ama.",
        highlight: "Qabbaneessaa hin barbaadu; ho'a sirrii ±0.3°C eega."
      },
      {
        num: "4",
        title: "Fakkii Maayikirooskoopii Ofumaa",
        desc: "Maayikirooskoopiin dijitaalaa baakteeriyaan baay'achuu yeroo jalqabu fakkii qulqullina ol'aanaa kaasa.",
        highlight: "Koloniin ijaan mul'achuu dura sa'aatii 8 keessatti adda baasa."
      },
      {
        num: "5",
        title: "Lakkoofsa Kolonii Maashin Larnigii",
        desc: "Algorizimiin kompiitara viizyinii koloniilee baakteeriyaa ofumaan lakkaa'a.",
        highlight: "Dogoggora lakkoofsa namaa fi dadhabbii ijaa dhabamsiisa."
      },
      {
        num: "6",
        title: "Appii fi Daashboordii Walitti Qabsiisuu",
        desc: "Bu'aan qorannoo appii moobaayilaa fi daashboordiitti yeroodhaan ergama.",
        highlight: "Gabaasa qulqullina bishaanii amansiisaa kenna."
      }
    ],

    specsBadge: "Ibsa Injinariingii Mirkanaa'e",
    specsTitle: "Safartuulee Sirnaa fi Madaalliiwwan Teeknikaa",
    colParam: "Safartuu",
    colSpec: "Ibsa Sirna WaterScope",
    colStandard: "Mirkaneessa / Sadarkaa",
    specsRows: [
      {
        param: "Mala Qorannoo",
        spec: "Calaltuu meembireenii banaa kaartirii irratti hundaa'e lakkoofsa kolonii ofumaa wajjin",
        standard: "Jalqaba Injinariin Yuunivarsiitii Keembiriijitiin hojjetame"
      },
      {
        param: "Saffisa Qorannoo",
        spec: "Mallattoo jalqabaa sa'aatii 8; bu'aa guutuu sa'aatii 21 keessatti",
        standard: "Turtii sa'aatii 24–48 wajjin walbira qabamee ariifataadha"
      },
      {
        param: "Sadarkaa Qorannoo",
        spec: "E. coli fi Koliifoormiif bu'aa dhaabbataa fi sirrii ta'e kenna",
        standard: "Sadarkaa ISO 9308 wajjin kan walbira qabamee fi qaama alaan kan mirkanaa'e"
      },
      {
        param: "Oomisha Biyya Keessaa",
        spec: "Teeknooloojii Maxxansa 3D fi maashinaatiin Yuunivarsiitii Baahir Daaritti oomishama",
        standard: "Gatii kiitiiwwan biyya alaa hamma 80% hir'isa"
      },
      {
        param: "Socho'ummaa",
        spec: "Buufata dirree guutuu 5.8 kg saanduqa cimaa keessatti",
        standard: "Bakkeewwan fagootti salphaatti fe'amuuf kan saxaxame"
      },
      {
        param: "Lakkoofsa Kolonii",
        spec: "Maayikirooskooppii fi maashin larniingiitiin lakkoofsa ofumaan hojjetamu",
        standard: "Dogoggora lakkoofsa namaa dhabamsiisa"
      },
      {
        param: "Gabaasa Daataa",
        spec: "Appii moobaayilaa fi daashboordiin to'annoo yerootiifi gabaasa giddu galeessaa",
        standard: "Hawaasaa fi biiroolee fayyaatiif hubannoo ragaa irratti hundaa'e"
      },
      {
        param: "Amanamummaa Dhaabbilee",
        spec: "Paayileetii Itoophiyaa fi Keeniyaa; Xalayaa Fedhii yuuniitii 30 (ACF)",
        standard: "Haalawwan Afrikaa Bahaa keessatti bu'a qabeessummaan isaa mirkanaa'e"
      }
    ],

    docTitle: "Sanadoota Teeknikaa fi Qajeelfama Dirree Buufadhaa",
    docDesc: "Ibsa teeknikaa guutuu, Adeemsa Hojii Sadarkaa Eeggate (SOP) fi bal'ina sirnichaa argadhaa.",
    docBtn1: "Sanadoota Teeknikaa Ilaalaa",
    docBtn2: "Injinaroota Keenya Qunnamaa"
  }
};

export const technologyContent: Record<Language, TechnologyPageContent> = {
  en: data.en,
  am: data.am,
  om: data.om,
  ti: data.am,
};
