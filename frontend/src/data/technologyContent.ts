import { Language } from '../i18n/types';

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
