import { Language } from '../i18n/types';

export interface WorkflowStep {
  step: string;
  title: string;
  desc: string;
  highlight: string;
  detail: string;
}

export interface NodeItem {
  title: string;
  desc: string;
}

export interface HomeContentData {
  // waterscope.org Exact Sections
  problemHeading: string;
  problemParagraph1: string;
  problemParagraph2: string;
  solutionHeading: string;
  solutionParagraph1: string;
  solutionParagraph2: string;
  ucdHeading: string;
  ucdParagraph1: string;
  ucdParagraph2: string;
  ucdBtnTech: string;

  // waterscope.org Global Tagline & Mission
  heroTagline: string;
  heroMissionQuote: string;
  problemGlobalStat: string;
  problemGlobalDesc: string;

  // waterscope.org UN SDG 6 & User-Centred Design
  sdgBadge: string;
  sdgTitle: string;
  sdgQuote: string;
  sdgDesc: string;
  ucdTitle: string;
  ucdDesc: string;
  ucdPoint1Title: string;
  ucdPoint1Desc: string;
  ucdPoint2Title: string;
  ucdPoint2Desc: string;
  ucdPoint3Title: string;
  ucdPoint3Desc: string;

  // Slide 1 & Slide 4: Hero
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

  // Slide 2: The Public Health Challenge
  problemBadge: string;
  problemTitle: string;
  problemDesc: string;
  pain1Title: string;
  pain1Desc: string;
  pain2Title: string;
  pain2Desc: string;
  pain3Title: string;
  pain3Desc: string;

  // Slide 3: Key Challenges in Water Quality Monitoring
  challengesBadge: string;
  challengesTitle: string;
  challengesDesc: string;
  challenges: NodeItem[];

  // Slide 4: The WaterScope System
  solutionBadge: string;
  solutionTitle: string;
  solutionDesc: string;
  solutionStat1Val: string;
  solutionStat1Desc: string;
  solutionStat2Val: string;
  solutionStat2Desc: string;
  solutionBtn: string;

  // 7-step testing workflow
  workflowBadge: string;
  workflowTitle: string;
  workflowDesc: string;
  workflowSteps: WorkflowStep[];

  // Slide 5: Key Features of WaterScope System
  featuresBadge: string;
  featuresTitle: string;
  featuresDesc: string;
  features: NodeItem[];

  // Slide 7: What Makes Us Different
  diffBadge: string;
  diffTitle: string;
  diffDesc: string;
  diffs: NodeItem[];

  // Slide 8: Traction & Institutional Confidence
  tractionBadge: string;
  tractionTitle: string;
  tractionDesc: string;
  tractions: NodeItem[];

  // Slide 9: Early Progress: Manufacturing and Training
  progressBadge: string;
  progressTitle: string;
  progressDesc: string;

  // Slide 10: The Collaboration Invitation
  collabBadge: string;
  collabTitle: string;
  collabDesc: string;
  collabs: NodeItem[];

  // Slide 6: Our Committed Team: Building Local Capacity
  teamBadge: string;
  teamTitle: string;
  teamDesc: string;

  // Slide 11: Our Partners
  partnersBadge: string;
  partnersTitle: string;
  partnersDesc: string;

  // Hardware Section
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

  // Slide 12: Get in Touch & Final Call to Action
  ctaTitle: string;
  ctaDesc: string;
  ctaBtnDemo: string;
  ctaBtnSpecs: string;
}

const data: Record<string, HomeContentData> = {
  en: {
    // waterscope.org Exact Sections
    problemHeading: "The Problem",
    problemParagraph1: "Globally, water-borne bacterial infections lead to half a million diarrhoeal-related deaths each year—more than 2,000 deaths every day. This is more than malaria and HIV-related deaths combined.",
    problemParagraph2: "Testing water supplies for bacterial presence is therefore crucial, especially in remote and low-resource communities. Unfortunately, current water testing equipment is bulky, expensive, and slow to deliver results.",
    solutionHeading: "Our Solution",
    solutionParagraph1: "To tackle this problem, WaterScope® has developed an innovative water testing system, enabling inclusive access to smart, easy-to-use, and reliable testing for bacterial presence in drinking water.",
    solutionParagraph2: "Using robust materials and machine learning technology which automatically counts bacterial colonies such as E. coli, the testing system can be used anywhere—from the lab to the field—and can identify presence of coliforms in 8 hours, with fully quantitative result provided in 21 hours.",
    ucdHeading: "User-Centred Design",
    ucdParagraph1: "We believe in a bottom-up approach, encouraging communities in low- and middle-income countries to test their water autonomously, allowing for education, job creation, inclusive participation and community development.",
    ucdParagraph2: "Our user-centred design is simple—from sample collection to data processing—and can be used by anyone, anywhere in the world.",
    ucdBtnTech: "Read more about our technology",

    // waterscope.org Global Tagline & Mission
    heroTagline: "Smart, simple water testing — for all.",
    heroMissionQuote: "One in ten people in the world do not have access to clean water. WaterScope wants to change this. We’re overcoming global water inequality by breaking barriers to reliable bacterial testing.",
    problemGlobalStat: "Half a Million",
    problemGlobalDesc: "Globally, water-borne bacterial infections lead to half a million diarrhoeal-related deaths each year — more than 2,000 deaths every day (more than malaria and HIV combined). Testing water supplies for bacterial presence is crucial, yet traditional equipment is bulky, expensive, and slow.",

    // waterscope.org UN SDG 6 & User-Centred Design
    sdgBadge: "UN Sustainable Development Goal 6",
    sdgTitle: "Clean Water & Sanitation For All",
    sdgQuote: "Ensure availability and sustainable management of water and sanitation for all.",
    sdgDesc: "WaterScope proudly supports the United Nations Sustainable Development Goals. Sustainable Development Goal (SDG) number 6 is to 'ensure availability and sustainable management of water and sanitation for all.' WaterScope wants to play our part in this global initiative by removing technological and financial barriers to decentralized testing.",
    ucdTitle: "User-Centred Design & Bottom-Up Community Empowerment",
    ucdDesc: "We believe in a bottom-up approach, encouraging communities in low- and middle-income countries to test their water autonomously, allowing for education, job creation, inclusive participation and community development. Our user-centred design is simple — from sample collection to data processing — and can be used by anyone, anywhere in the world.",
    ucdPoint1Title: "Inclusive Community Participation",
    ucdPoint1Desc: "Removes dependent technician skill sets and flame-sterilization hazards, enabling community members, health extension workers, and students to conduct ISO 9308-1 compliant tests.",
    ucdPoint2Title: "Decentralized Autonomous Testing",
    ucdPoint2Desc: "Tests drinking water on-site without relying on distant centralized urban laboratories or vulnerable cold-chain transport logistics.",
    ucdPoint3Title: "Actionable Telemetry & Cloud Mapping",
    ucdPoint3Desc: "Integrated IoT and mobile apps stream real-time water quality data to a central dashboard, empowering NGOs and governments to intervene before contamination outbreaks spread.",

    // Slide 1 & Slide 4: Hero
    heroBadge: "WaterScope Africa | Canada-Africa Academic Collaborations Conference",
    heroHeadline1: "WaterScope Africa",
    heroHeadline2: "Transforming Water Quality",
    heroSubtitle: "An open-source innovative water testing system, enabling inclusive access to smart, easy-to-use, and reliable testing for bacterial presence in drinking water. Originally developed by Cambridge University Engineers.",
    heroBtnTech: "Key Features of WaterScope",
    heroBtnWork: "Traction & Pilots",
    heroTrust1: "Rapid: 8h indication, 21h quantitative (ISO 9308)",
    heroTrust2: "Local Manufacturing: Up to 80% Cost Reduction",
    heroTrust3: "Letter of Intent: Up to 30 Units (Action Against Hunger)",
    heroFloatingTitle: "Picture - Nile River, Bahir Dar, Ethiopia",
    heroFloatingSub: "Field-adapted membrane filtration deployable on-site",

    // Slide 2: The Public Health Challenge
    problemBadge: "The Public Health Challenge",
    problemTitle: "Water access is often discussed in terms of infrastructure — but surveillance is equally critical.",
    problemDesc: "The challenge is not only water access — it is the lack of reliable, scalable monitoring systems.",
    pain1Title: "People lacking safe drinking water",
    pain1Desc: "Globally, 2.2 billion individuals do not have access to safe drinking water, contributing to widespread health issues and emphasizing the urgent need for sustainable water solutions.",
    pain2Title: "Poor WASH",
    pain2Desc: "60–80% of communicable diseases in Ethiopia are linked to inadequate water, sanitation, and hygiene conditions.",
    pain3Title: "Child Mortality",
    pain3Desc: "Diarrhea is responsible for approximately 25,000 under-five deaths annually, making it the third leading cause of child mortality.",

    // Slide 3: Key Challenges in Water Quality Monitoring
    challengesBadge: "Structural Systemic Barriers",
    challengesTitle: "Key Challenges in Water Quality Monitoring",
    challengesDesc: "The current monitoring ecosystem faces structural barriers. Most systems are expensive and imported. They rely on fragile supply chains. Many require technical expertise that is difficult to sustain in rural areas. They are often not digitally connected — meaning data remains isolated. And scaling them across thousands of rural water points becomes nearly impossible. This is not a technology failure. It is a systems design problem.",
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

    // Slide 4: The WaterScope System
    solutionBadge: "The WaterScope System",
    solutionTitle: "Open-Source Membrane Filtration Developed by Cambridge Engineers",
    solutionDesc: "WaterScope is an open-source, field-adapted membrane filtration system originally developed by engineers at the University of Cambridge. It simplifies bacterial testing in drinking water through a cartridge-based method, combined with automated colony detection using machine learning. Instead of requiring a full laboratory, the system is compact, portable, and deployable in the field — as shown here by the Nile River in Bahir Dar. It bridges laboratory-level accuracy with field accessibility.",
    solutionStat1Val: "8–21 Hours",
    solutionStat1Desc: "Early indication in 8h, full quantitative count in 21h",
    solutionStat2Val: "Up to 80%",
    solutionStat2Desc: "Cost reduction through local manufacturing in Ethiopia",
    solutionBtn: "Explore Key Features",

    // Workflow
    workflowBadge: "Simplified Testing Process",
    workflowTitle: "Testing in 8 Minutes: Step-by-Step",
    workflowDesc: "A streamlined, field-adapted membrane filtration method removing laboratory barriers and enabling rapid bacterial testing on-site.",
    workflowSteps: [
      {
        step: "01",
        title: "Draw Water Sample",
        desc: "Collect a standard 100mL drinking water sample using the motorized vacuum pump connected to the battery-powered field testing unit.",
        highlight: "Motorized vacuum filtration",
        detail: "Eliminates syringe fatigue and filters 100mL in under 3 minutes."
      },
      {
        step: "02",
        title: "Patented Cartridge Filtration",
        desc: "Water filters through the patented stainless-steel cartridge, capturing all bacteria on a 0.45µm nitrocellulose membrane filter pad.",
        highlight: "No aseptic handling needed",
        detail: "Eliminates risky field flame sterilization and prevents contamination."
      },
      {
        step: "03",
        title: "Liquid Media & Incubation",
        desc: "Liquid nutrient broth media is introduced to cultivate target bacteria inside the integrated precision incubator bay at 37°C or 44°C.",
        highlight: "Zero refrigeration needed",
        detail: "Maintains strict ±0.3°C thermal stability directly on internal battery power."
      },
      {
        step: "04",
        title: "Optical Microscopic Imaging",
        desc: "An integrated digital microscope module captures high-resolution imagery as bacterial microcolonies begin proliferating.",
        highlight: "Early microcolony optics",
        detail: "Detects early microscopic colony emergence in as little as 8 hours."
      },
      {
        step: "05",
        title: "Machine Learning Colony Counting",
        desc: "Embedded machine-learning computer vision algorithms automatically detect and count bacterial colonies on the membrane filter grid.",
        highlight: "Automated colony counting",
        detail: "Eliminates manual technician counting bias and eye fatigue; outputs quantitative CFU/100mL."
      },
      {
        step: "06",
        title: "Digital App & Dashboard Sync",
        desc: "Results upload in real time through the mobile app and centralized dashboard, providing traceable water quality records for stakeholders.",
        highlight: "Centralized reporting",
        detail: "Enables real-time monitoring and data-driven public health decisions."
      }
    ],

    // Slide 5: Key Features of WaterScope System
    featuresBadge: "Key Features of WaterScope System",
    featuresTitle: "Designed Around Practical Field Needs",
    featuresDesc: "The system is designed around practical field needs: Rapid — with early indication in as little as 8 hours and full quantitative results in 21 hours. Portable and robust — built for low-resource environments. Reliable — benchmarked against ISO 9308 standards and externally validated. Digital and smart — using embedded microscopy and machine learning to automate colony counting. And data-driven — enabling real-time monitoring and centralized reporting through a mobile app and dashboard. Most importantly, it reduces financial barriers for communities.",
    features: [
      {
        title: "Rapid",
        desc: "Provides immediate results for water quality testing (early indication in as little as 8 hours and full quantitative results in 21 hours)."
      },
      {
        title: "Portable",
        desc: "Designed for easy transport to remote locations. Designed for low-resource environments."
      },
      {
        title: "Simple",
        desc: "User-friendly design ensures ease of operation."
      },
      {
        title: "Reliable",
        desc: "Provides consistent and accurate water quality results. Benchmarked against ISO 9308 standards and externally validated."
      },
      {
        title: "Robust",
        desc: "Designed to withstand challenging field conditions."
      },
      {
        title: "Digital",
        desc: "Integrates advanced technology for data-driven insights. Uses embedded microscopy and machine learning to automate colony counting."
      },
      {
        title: "Smart",
        desc: "Provides real-time data for informed decision-making."
      },
      {
        title: "Affordable",
        desc: "Designed to be cost-effective for local communities, reducing financial barriers."
      },
      {
        title: "Data-Driven",
        desc: "Utilizes advanced analytics to improve water quality, enabling real-time monitoring and centralized reporting by using its mobile app and dashboard."
      }
    ],

    // Slide 7: What Makes Us Different
    diffBadge: "Systems Innovation Model",
    diffTitle: "What Makes Us Different",
    diffDesc: "What differentiates us is not only the device — but the systems innovation model. This shifts water testing from external dependency to regional resilience.",
    diffs: [
      {
        title: "Cost Reduction",
        desc: "Local manufacturing significantly lowers costs by up to 80%, making water testing accessible to communities in need."
      },
      {
        title: "Capacity Building",
        desc: "Our approach builds local technical and research capacity within the country, empowering communities to take control of their water quality solutions."
      },
      {
        title: "Self-Reliance",
        desc: "Strengthening local capacity ensures communities can manage their water resources effectively and sustainably over time, reducing dependency on imported diagnostics."
      },
      {
        title: "Job Opportunities",
        desc: "Creating local manufacturing jobs empowers individuals and stimulates economic growth in regions affected by water scarcity."
      }
    ],

    // Slide 8: Traction & Institutional Confidence
    tractionBadge: "Demonstrated Field Usability",
    tractionTitle: "Traction & Institutional Confidence",
    tractionDesc: "We have validated the system through prior pilots in Ethiopia and Kenya, demonstrating usability in real field conditions. We have engaged with the Ministry of Health through technician training programs. And we have received a Letter of Intent from Action Against Hunger for up to 30 units. This shows growing institutional confidence in a locally manufactured solution.",
    tractions: [
      {
        title: "Letter of Intent",
        desc: "Formal Letter of Intent received for up to 30 units under consideration from Action Against Hunger(ACF)."
      },
      {
        title: "Prior Pilots in Ethiopia & Kenya",
        desc: "Successful field testing and validation in East African contexts, demonstrating field usability in low-resource environments."
      },
      {
        title: "Ministry of Health Engagement",
        desc: "Active training programs for water testing technicians, building government capacity and demonstrating system usability."
      }
    ],

    // Slide 9: Early Progress: Manufacturing and Training
    progressBadge: "Localized Diagnostic Ecosystem",
    progressTitle: "Early Progress: Manufacturing and Training",
    progressDesc: "We have begun local manufacturing using 3D printing and machining technologies. We conduct training programs for water technicians. And we are building partnerships across sectors. This is the beginning of a localized diagnostic ecosystem.",

    // Slide 10: The Collaboration Invitation
    collabBadge: "Equitable Academic Collaboration",
    collabTitle: "The Collaboration Invitation",
    collabDesc: "We are open to collaboration in research, scale, and deployment. This platform enables work in environmental microbiology, antimicrobial resistance surveillance, AI-driven pathogen detection, and implementation science. We invite Canada–Africa academic collaboration — joint grants, co-supervision of students, pilot programs, and regional deployment strategies. Water surveillance should be equitable, collaborative, and locally empowered.",
    collabs: [
      {
        title: "Scale & Deployment",
        desc: "Partner on pilot programs, regional rollouts, and integration with existing water quality monitoring systems."
      },
      {
        title: "Partnership in Africa",
        desc: "We are interested in collaborating with organizations in African nations that are actively engaged in water testing initiatives."
      }
    ],

    // Slide 6: Our Committed Team: Building Local Capacity
    teamBadge: "Building Local Capacity",
    teamTitle: "Our Committed Team",
    teamDesc: "We are a dedicated group of young Ethiopian engineers focused on enhancing local water diagnostics and fostering innovation through collaboration with communities and educational institutions. However, technology alone is not enough. Our work is focused not only on deploying devices, but on building local technical capacity. We collaborate with communities, government stakeholders, and universities — including Bahir Dar University. Our goal is to ensure that diagnostic capacity is built locally, sustained locally, and scaled locally. African-led innovation is central to our model.",

    // Slide 11: Our Partners
    partnersBadge: "Collaborative Progress",
    partnersTitle: "Our Partners",
    partnersDesc: "We work closely with Bahir Dar University, Centre for Global Equality, BiT Maker Space, and the founders WaterScope. These partnerships strengthen both technical rigor and implementation capacity. Collaboration is at the heart of our progress.",

    // Hardware store preview
    hwBadge: "Testing Hardware & Systems",
    hwTitle: "Field-Ready Testing Kits & Consumables",
    hwDesc: "Locally manufactured water testing hardware and consumables built at Bahir Dar University to eliminate foreign supply chain bottlenecks.",
    hw1Badge: "Complete Field Kit",
    hw1Title: "WaterScope Bacterial Testing Kit – Complete Field Station",
    hw1Desc: "Full field kit including motorized vacuum pump, dual 37°C/44°C incubator, optical microcolony camera, battery pack, and 200 consumable test cartridges in an IATA-compliant 5.8 kg case.",
    hw1Spec1Key: "Diagnostic Speed",
    hw1Spec1Val: "8h early warning, 21h quantitative count (ISO 9308)",
    hw1Spec2Key: "Kit Weight & Portability",
    hw1Spec2Val: "5.8 kg total kit weight (IATA carry-on compliant)",
    hw2Badge: "Consumable Pack",
    hw2Title: "Patented Metal Cartridges & Consumables (50 & 200 Packs)",
    hw2Desc: "Patented easy-to-use metal cartridges containing 0.45µm membrane filters and selective broth media. Only $4.00/test ($3.75 bulk).",
    hw2Spec1Key: "Cost per Test",
    hw2Spec1Val: "$4.00 consumable (up to 80% cost reduction)",
    hw2Spec2Key: "Handling & Storage",
    hw2Spec2Val: "Zero cold-chain | Removes aseptic handling skills",
    hw3Badge: "Testing Station",
    hw3Title: "Digital Colony Scanner & Optical Incubator",
    hw3Desc: "Integrated digital microscope and thermal incubator chamber with automated computer vision colony counting and embedded IoT cloud sync.",
    hw3Spec1Key: "Detection Target",
    hw3Spec1Val: "Total Coliforms & E. coli (CFU/100mL)",
    hw3Spec2Key: "Connectivity",
    hw3Spec2Val: "Global IoT, Bluetooth & GPS Dashboard Sync",
    hwViewStore: "View in Store",
    hwRequestQuote: "Request Quote",

    // Slide 12: Get in Touch
    ctaTitle: "Get in Touch",
    ctaDesc: "Join us in transforming water quality surveillance through local innovation. Water quality surveillance should not depend solely on imported laboratories. Young African engineers can build scalable, validated, research-driven solutions. Through equitable academic collaboration, we can transform water safety monitoring across Africa.",
    ctaBtnDemo: "Contact Our Team",
    ctaBtnSpecs: "Explore Key Features"
  },

  am: {
    // waterscope.org Exact Sections
    problemHeading: "ችግሩ (The Problem)",
    problemParagraph1: "በአለም አቀፍ ደረጃ በውሃ ወለድ የባክቴሪያ ኢንፌክሽኖች በየዓመቱ ለግማሽ ሚሊዮን የተቅማጥ ሞት መንስኤ ይሆናሉ — በየቀኑ ከ 2,000 በላይ ሰዎች ይሞታሉ። ይህም ከወባ እና ከኤች አይ ቪ ጥምር ሞት ይበልጣል።",
    problemParagraph2: "ስለዚህ በተለይ በሩቅ እና አነስተኛ ሃብት ባላቸው ማህበረሰቦች ውስጥ የውሃ አቅርቦቶችን ለባክቴሪያ መኖር መመርመር ወሳኝ ነው። እንደ አለመታደል ሆኖ የአሁን የውሃ መመርመሪያ መሳሪያዎች ግዙፍ፣ ውድ እና ውጤት ለመስጠት የዘገዩ ናቸው።",
    solutionHeading: "መፍትሄያችን (Our Solution)",
    solutionParagraph1: "ይህንን ችግር ለመፍታት WaterScope በመጠጥ ውሃ ውስጥ የባክቴሪያ መኖርን ለማረጋገጥ ዘመናዊ፣ ቀላል እና አስተማማኝ ምርመራን ተደራሽ የሚያደርግ የፈጠራ ስርዓት አዘጋጅቷል።",
    solutionParagraph2: "ጠንካራ ቁሳቁሶችን እና እንደ E. coli ያሉ የባክቴሪያ ቅኝ ግዛቶችን በራስ-ሰር የሚቆጥር የማሽን መማሪያ ቴክኖሎጂን በመጠቀም፣ ስርዓቱ በየትኛውም ቦታ — ከላብራቶሪ እስከ መስክ — ጥቅም ላይ ሊውል ይችላል፤ በ 8 ሰዓታት ውስጥ የኮሊፎርሞችን መኖር ይለያል እንዲሁም በ 21 ሰዓታት ውስጥ ሙሉ አሃዛዊ ውጤት ይሰጣል።",
    ucdHeading: "በተጠቃሚ ላይ ያተኮረ ንድፍ (User-Centred Design)",
    ucdParagraph1: "ዝቅተኛ እና መካከለኛ ገቢ ባላቸው ሀገራት ውስጥ ማህበረሰቦች ውሃቸውን በራሳቸው እንዲመረምሩ የሚያበረታታ ከስር ወደ ላይ ያለውን አካሄድ እናምናለን፤ ይህም ለትምህርት፣ ለስራ እድል ፈጠራ፣ ለአሳታፊ ተሳትፎ እና ለማህበረሰብ እድገት አስተዋጽኦ ያደርጋል።",
    ucdParagraph2: "በተጠቃሚ ላይ ያተኮረ ንድፋችን ቀላል ነው — ከናሙና አሰባሰብ እስከ መረጃ ትንተና — እና በማንኛውም ሰው፣ በየትኛውም ቦታ ጥቅም ላይ ሊውል ይችላል።",
    ucdBtnTech: "ስለ ቴክኖሎጂያችን የበለጠ ያንብቡ",

    // waterscope.org Global Tagline & Mission
    heroTagline: "ብልህ፣ ቀላል የውሃ ምርመራ — ለሁሉም።",
    heroMissionQuote: "በአለም ላይ ከአስር ሰዎች አንዱ ንጹህ ውሃ አያገኝም። WaterScope ይህንን መለወጥ ይፈልጋል። ለአስተማማኝ የባክቴሪያ ምርመራ እንቅፋት የሆኑትን በማስወገድ አለም አቀፍ የውሃ እኩልነትን እያሸነፍን ነው።",
    problemGlobalStat: "ግማሽ ሚሊዮን",
    problemGlobalDesc: "በአለም አቀፍ ደረጃ በውሃ ወለድ የባክቴሪያ ኢንፌክሽኖች በየዓመቱ ለግማሽ ሚሊዮን የተቅማጥ ሞት መንስኤ ይሆናሉ — በየቀኑ ከ 2,000 በላይ ሰዎች ይሞታሉ (ከወባ እና ከኤች አይ ቪ ጥምር ሞት ይበልጣል)።",

    // waterscope.org UN SDG 6 & User-Centred Design
    sdgBadge: "የተባበሩት መንግስታት የዘላቂ ልማት ግብ 6 (SDG 6)",
    sdgTitle: "ንጹህ ውሃ እና ሳኒቴሽን ለሁሉም",
    sdgQuote: "ለሁሉም ንጹህ ውሃ እና የሳኒቴሽን ተደራሽነትን እና ዘላቂ አስተዳደርን ማረጋገጥ።",
    sdgDesc: "WaterScope የተባበሩት መንግስታት የዘላቂ ልማት ግቦችን ይደግፋል። የዘላቂ ልማት ግብ (SDG) ቁጥር 6 'ለሁሉም የውሃ እና ሳኒቴሽን ተደራሽነትን እና ዘላቂ አስተዳደርን ማረጋገጥ' ነው። WaterScope ያልተማከለ ምርመራ ላይ ያሉ የቴክኖሎጂ እና የወጪ እንቅፋቶችን በማስወገድ በዚህ አለም አቀፍ ተነሳሽነት ውስጥ የበኩሉን ድርሻ መወጣት ይፈልጋል።",
    ucdTitle: "በተጠቃሚ ላይ ያተኮረ ንድፍ እና የማህበረሰብ ማብቃት",
    ucdDesc: "ዝቅተኛ እና መካከለኛ ገቢ ባላቸው ሀገራት ውስጥ ማህበረሰቦች ውሃቸውን በራሳቸው እንዲመረምሩ የሚያበረታታ ከስር ወደ ላይ ያለውን አካሄድ እናምናለን፤ ይህም ለትምህርት፣ ለስራ እድል ፈጠራ፣ ለአሳታፊ ተሳትፎ እና ለማህበረሰብ እድገት አስተዋጽኦ ያደርጋል። በተጠቃሚ ላይ ያተኮረ ንድፋችን ቀላል ነው — ከናሙና አሰባሰብ እስከ መረጃ ትንተና — እና በማንኛውም ሰው፣ በየትኛውም ቦታ ጥቅም ላይ ሊውል ይችላል።",
    ucdPoint1Title: "አካታች ተሳትፎ",
    ucdPoint1Desc: "ውስብስብ የቴክኒሻን ክህሎት እና የእሳት ማምከን አደጋዎችን ያስቀራል፤ ይህም የማህበረሰብ አባላት፣ የጤና ኤክስቴንሽን ሰራተኞች እና ተማሪዎች የ ISO 9308-1 ደረጃውን የጠበቀ ምርመራ እንዲያካሂዱ ያስችላቸዋል።",
    ucdPoint2Title: "ያልተማከለ ገለልተኛ ምርመራ",
    ucdPoint2Desc: "የርቀት የከተማ ላብራቶሪዎች ወይም የተጋለጡ የማጓጓዣ ሰንሰለቶች ላይ ጥገኛ ሳይሆኑ በመስክ ላይ በቀጥታ የመጠጥ ውሃን ይመረምራል።",
    ucdPoint3Title: "ተግባራዊ የደመና መረጃ እና ካርታ ስራ",
    ucdPoint3Desc: "የተቀናጀ የ IoT እና የሞባይል መተግበሪያዎች የእውነተኛ ጊዜ የውሃ ጥራት መረጃን ወደ ማዕከላዊ ዳሽቦርድ ያስተላልፋሉ፤ ይህም መንግስታት እና መንግስታዊ ያልሆኑ ድርጅቶች የበሽታ ወረርሽኝ ከመስፋፋቱ በፊት እርምጃ እንዲወስዱ ያስችላቸዋል።",

    heroBadge: "WaterScope አፍሪካ | የካናዳ-አፍሪካ የትምህርት ትብብር ጉባኤ",
    heroHeadline1: "WaterScope አፍሪካ",
    heroHeadline2: "የውሃ ጥራትን መለወጥ",
    heroSubtitle: "በመጠጥ ውሃ ውስጥ የባክቴሪያ መኖርን ለማረጋገጥ ዘመናዊ፣ ቀላል እና አስተማማኝ ምርመራን ተደራሽ የሚያደርግ ክፍት የፈጠራ ስርዓት። መጀመሪያ በካምብሪጅ ዩኒቨርሲቲ መሐንዲሶች የተገነባ።",
    heroBtnTech: "የ WaterScope ዋና ዋና ገጽታዎች",
    heroBtnWork: "ተጨባጭ ስራዎች እና ፓይለቶች",
    heroTrust1: "ፈጣን፡ የ 8 ሰዓት የመጀመሪያ ምልክት፣ የ 21 ሰዓት ሙሉ ቆጠራ (ISO 9308)",
    heroTrust2: "የአገር ውስጥ ምርት፡ እስከ 80% የወጪ ቅነሳ",
    heroTrust3: "የፍላጎት ደብዳቤ፡ እስከ 30 ኪቶች (Action Against Hunger)",
    heroFloatingTitle: "ምስል - አባይ ወንዝ፣ ባህር ዳር፣ ኢትዮጵያ",
    heroFloatingSub: "በመስክ ላይ በቀጥታ የሚሰራ የታመቀ የሜምብሬን ማጣሪያ ስርዓት",

    problemBadge: "የህዝብ ጤና ፈተና",
    problemTitle: "የውሃ አቅርቦት ብዙ ጊዜ ከመሰረተ ልማት አንፃር ይነሳል — ነገር ግን ክትትል እኩል ወሳኝ ነው።",
    problemDesc: "ፈተናው የውሃ አቅርቦት ማጣት ብቻ አይደለም — አስተማማኝ እና ሊሰፉ የሚችሉ የክትትል ስርዓቶች እጥረት ጭምር ነው።",
    pain1Title: "ንጹህ የመጠጥ ውሃ ያጡ ሰዎች",
    pain1Desc: "በአለም አቀፍ ደረጃ 2.2 ቢሊዮን ሰዎች ንጹህ የመጠጥ ውሃ አያገኙም፤ ይህም ለተስፋፋ የጤና ችግሮች መንስኤ በመሆን ዘላቂ የውሃ መፍትሄዎች አስቸኳይ አስፈላጊነትን ያጎላል።",
    pain2Title: "ደካማ WASH",
    pain2Desc: "በኢትዮጵያ ውስጥ 60–80% የሚሆኑት ተላላፊ በሽታዎች በቂ ካልሆነ የውሃ፣ የንፅህና እና የሳኒቴሽን ሁኔታዎች ጋር የተያያዙ ናቸው።",
    pain3Title: "የህፃናት ሞት",
    pain3Desc: "ተቅማጥ በየዓመቱ ለግምት 25,000 ከ 5 ዓመት በታች ህፃናት ሞት ተጠያቂ ሲሆን ይህም በህፃናት ሞት ሶስተኛው ዋነኛ መንስኤ ያደርገዋል።",

    challengesBadge: "መዋቅራዊ የስርዓት እንቅፋቶች",
    challengesTitle: "በውሃ ጥራት ክትትል ውስጥ ያሉ ቁልፍ ፈተናዎች",
    challengesDesc: "የአሁኑ የክትትል ስነ-ምህዳር መዋቅራዊ እንቅፋቶች ያጋጥሙታል። አብዛኛዎቹ ስርዓቶች ውድ እና ከውጭ የሚገቡ ናቸው። በቀላሉ በሚስተጓጎሉ የአቅርቦት ሰንሰለቶች ላይ ጥገኛ ናቸው። ብዙዎቹ በገጠር አካባቢዎች ለማስቀጠል አስቸጋሪ የሆነ ልዩ ቴክኒካዊ ስልጠና ይፈልጋሉ። ብዙ ጊዜ በዲጂታል መንገድ የተገናኙ አይደሉም — ይህም መረጃ ተለይቶ እንዲቀር ያደርገዋል። በሺዎች በሚቆጠሩ የገጠር የውሃ ነጥቦች ላይ ማስፋፋት ፈጽሞ የማይቻል ይሆናል። ይህ የቴክኖሎጂ ውድቀት አይደለም። የስርዓት ንድፍ ችግር ነው።",
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

    solutionBadge: "የ WaterScope ስርዓት",
    solutionTitle: "በካምብሪጅ መሐንዲሶች የበለጸገ ክፍት የሜምብሬን ማጣሪያ ስርዓት",
    solutionDesc: "WaterScope መጀመሪያ በካምብሪጅ ዩኒቨርሲቲ መሐንዲሶች የተገነባ ክፍት፣ ለመስክ የተስማማ የሜምብሬን ማጣሪያ ስርዓት ነው። በማሽን ለርኒንግ አውቶሜትድ የቅኝ ግዛት ቆጠራን ከካርትሪጅ ዘዴ ጋር በማጣመር በመጠጥ ውሃ ውስጥ የባክቴሪያ ምርመራን ያቀላል። ሙሉ ላብራቶሪ ከማስፈለግ ይልቅ፣ ስርዓቱ የታመቀ፣ ተንቀሳቃሽ እና በመስክ ላይ የሚሰራ ነው — እዚህ ባህር ዳር በአባይ ወንዝ ዳርቻ እንደታየው። የላብራቶሪ ትክክለኛነትን ከመስክ ተደራሽነት ጋር ያገናኛል።",
    solutionStat1Val: "8–21 ሰዓታት",
    solutionStat1Desc: "ቀደም ያለ ምልክት በ 8 ሰዓት፣ ሙሉ አሃዛዊ ቆጠራ በ 21 ሰዓት",
    solutionStat2Val: "እስከ 80%",
    solutionStat2Desc: "በኢትዮጵያ ውስጥ በአገር ውስጥ በማምረት የሚገኝ የወጪ ቅነሳ",
    solutionBtn: "ዋና ዋና ገጽታዎችን ይመርምሩ",

    workflowBadge: "የቀለለ የምርመራ ሂደት",
    workflowTitle: "በ 8 ደቂቃ ውስጥ የሚከናወን ምርመራ፡ ደረጃ በደረጃ",
    workflowDesc: "የላብራቶሪ ማነቆዎችን በማስቀረት በቦታው ላይ ፈጣን የባክቴሪያ ምርመራን የሚያስችል የመስክ ሜምብሬን ማጣሪያ ዘዴ።",
    workflowSteps: [
      {
        step: "01",
        title: "የውሃ ናሙና መውሰድ",
        desc: "በባትሪ ከሚሰራው ተንቀሳቃሽ የመስክ ኪት ጋር የተገናኘውን የቫክዩም ፓምፕ በመጠቀም መደበኛ 100 ሚሊ ሊትር የመጠጥ ውሃ ናሙና ይውሰዱ።",
        highlight: "በሞተር የሚሰራ ቫክዩም ማጣሪያ",
        detail: "የእጅ ፓምፕ ድካምን ያስቀራል፤ 100 ሚሊ ሊትር ናሙናን ከ 3 ደቂቃ ባነሰ ጊዜ ውስጥ ያጣራል።"
      },
      {
        step: "02",
        title: "በፓተንት በተጠበቀ ካርትሪጅ ማጣራት",
        desc: "ውሃው በማይዝግ ብረት ካርትሪጅ ውስጥ በማለፍ ሁሉንም ባክቴሪያዎች በ 0.45µm ናይትሮሴሉሎዝ ሜምብሬን ፓድ ላይ ያስቀራል።",
        highlight: "የማምከን ችሎታ አይጠይቅም",
        detail: "አደገኛ የሆነውን የመስክ እሳት ማምከን ያስቀራል፤ ብክለትን ይከላከላል።"
      },
      {
        step: "03",
        title: "ፈሳሽ ሚዲያ እና ኢንኩቤሽን",
        desc: "ፈሳሽ የእድገት ሚዲያ ይጨመራል፤ ከዚያም በተቀናጀው የሙቀት ክፍል ውስጥ በ 37°C ወይም 44°C ውስጥ ይቀመጣል።",
        highlight: "ማቀዝቀዣ አያስፈልገውም",
        detail: "በባትሪ ሃይል ትክክለኛውን ±0.3°C የሙቀት መጠን ጠብቆ ይቆያል።"
      },
      {
        step: "04",
        title: "ኦፕቲካል ማይክሮስኮፒክ ምስል",
        desc: "የባክቴሪያ ጥቃቅን ቅኝ ግዛቶች መብዛት ሲጀምሩ የተቀናጀ ዲጂታል ማይክሮስኮፕ ከፍተኛ ጥራት ያለው ምስል ያነሳል።",
        highlight: "የጥቃቅን ቅኝ ግዛቶች ኦፕቲክስ",
        detail: "ቅኝ ግዛቶች በሰው ዐይን ከመታየታቸው በፊት በ 8 ሰዓት ውስጥ መኖራቸውን ይለያል።"
      },
      {
        step: "05",
        title: "የማሽን ለርኒንግ የቅኝ ግዛት ቆጠራ",
        desc: "የማሽን ለርኒንግ ኮምፒውተር ቪዥን ስልተ-ቀመር በሜምብሬኑ ላይ ያሉትን የባክቴሪያ ቅኝ ግዛቶች በራስ-ሰር ለይቶ ይቆጥራል።",
        highlight: "አውቶሜትድ የቅኝ ግዛት ቆጠራ",
        detail: "የሰው ቆጠራ ስህተትን ያስቀራል፤ ትክክለኛ የ CFU/100mL አሃዛዊ ውጤት ይሰጣል።"
      },
      {
        step: "06",
        title: "የሞባይል መተግበሪያ እና ዳሽቦርድ ማመሳሰል",
        desc: "ውጤቶቹ በሞባይል መተግበሪያ እና በማዕከላዊ ዳሽቦርድ አማካኝነት በእውነተኛ ጊዜ ይላካሉ።",
        highlight: "ማዕከላዊ ሪፖርት",
        detail: "የእውነተኛ ጊዜ ክትትል እና በመረጃ ላይ የተመሰረተ ውሳኔን ያስችላል።"
      }
    ],

    featuresBadge: "የ WaterScope ስርዓት ቁልፍ ገጽታዎች",
    featuresTitle: "በተግባራዊ የመስክ ፍላጎቶች ዙሪያ የተነደፈ",
    featuresDesc: "ስርዓቱ በተግባራዊ የመስክ ፍላጎቶች ዙሪያ የተነደፈ ነው፡ ፈጣን — ቀደም ያለ ምልክት በ 8 ሰዓት ውስጥ እና ሙሉ አሃዛዊ ውጤት በ 21 ሰዓት ውስጥ። ተንቀሳቃሽ እና ጠንካራ — ዝቅተኛ ሀብት ላላቸው አካባቢዎች የተሰራ። አስተማማኝ — ከ ISO 9308 ደረጃዎች ጋር የተነጻጸረ እና በውጭ አካል የተረጋገጠ። ዲጂታል እና ዘመናዊ — የተቀናጀ ማይክሮስኮፒ እና ማሽን ለርኒንግ በመጠቀም የቅኝ ግዛት ቆጠራን አውቶሜት ያደረገ። እና በመረጃ ላይ የተመሰረተ — በሞባይል መተግበሪያ እና ዳሽቦርድ አማካኝነት የእውነተኛ ጊዜ ክትትል እና ማዕከላዊ ሪፖርትን የሚያስችል። ከሁሉም በላይ ደግሞ ለማህበረሰቦች የገንዘብ እንቅፋቶችን ይቀንሳል።",
    features: [
      {
        title: "ፈጣን (Rapid)",
        desc: "ለውሃ ጥራት ምርመራ ፈጣን ውጤቶችን ይሰጣል (ቀደም ያለ ምልክት በ 8 ሰዓታት እና ሙሉ አሃዛዊ ውጤት በ 21 ሰዓታት)።"
      },
      {
        title: "ተንቀሳቃሽ (Portable)",
        desc: "ወደ ሩቅ ቦታዎች በቀላሉ ለማጓጓዝ የተነደፈ። ዝቅተኛ ሀብት ላላቸው አካባቢዎች የተሰራ።"
      },
      {
        title: "ቀላል (Simple)",
        desc: "ለተጠቃሚ ምቹ የሆነ ንድፍ የአሰራር ቀላልነትን ያረጋግጣል።"
      },
      {
        title: "አስተማማኝ (Reliable)",
        desc: "ወጥ እና ትክክለኛ የውሃ ጥራት ውጤቶችን ይሰጣል። ከ ISO 9308 ደረጃዎች ጋር የተነጻጸረ እና በውጭ አካል የተረጋገጠ።"
      },
      {
        title: "ጠንካራ (Robust)",
        desc: "ፈታኝ የመስክ ሁኔታዎችን ለመቋቋም የተነደፈ።"
      },
      {
        title: "ዲጂታል (Digital)",
        desc: "በመረጃ ላይ ለተመሰረተ ግንዛቤ የላቀ ቴክኖሎጂን ያጣምራል። የተቀናጀ ማይክሮስኮፒ እና ማሽን ለርኒንግ በመጠቀም የቅኝ ግዛት ቆጠራን አውቶሜት ያደርጋል።"
      },
      {
        title: "ዘመናዊ (Smart)",
        desc: "በመረጃ ላይ ለተመሰረተ ውሳኔ አሰጣጥ የእውነተኛ ጊዜ መረጃ ይሰጣል።"
      },
      {
        title: "ተመጣጣኝ (Affordable)",
        desc: "የገንዘብ እንቅፋቶችን በመቀነስ ለአካባቢው ማህበረሰቦች ወጪ ቆጣቢ እንዲሆን የተነደፈ።"
      },
      {
        title: "በመረጃ ላይ የተመሰረተ (Data-Driven)",
        desc: "የውሃ ጥራትን ለማሻሻል የላቀ ትንታኔን ይጠቀማል፣ የሞባይል መተግበሪያውን እና ዳሽቦርዱን በመጠቀም የእውነተኛ ጊዜ ክትትል እና ማዕከላዊ ሪፖርትን ያስችላል።"
      }
    ],

    diffBadge: "የስርዓት ፈጠራ ሞዴል",
    diffTitle: "ልዩ የሚያደርገን ምንድን ነው?",
    diffDesc: "ልዩ የሚያደርገን መሳሪያው ብቻ ሳይሆን የስርዓት ፈጠራ ሞዴሉ ነው። ይህ የውሃ ምርመራን ከውጭ ጥገኝነት ወደ ክልላዊ ጽናት ይለውጣል።",
    diffs: [
      {
        title: "የወጪ ቅነሳ (Cost Reduction)",
        desc: "የአገር ውስጥ ማምረት ወጪን እስከ 80% በከፍተኛ ሁኔታ ይቀንሳል፤ ይህም የውሃ ምርመራ ለተቸገሩ ማህበረሰቦች ተደራሽ ያደርገዋል።"
      },
      {
        title: "አቅም ግንባታ (Capacity Building)",
        desc: "አካሄዳችን በአገር ውስጥ የቴክኒክ እና የምርምር አቅምን ይገነባል፤ ማህበረሰቦች የውሃ ጥራት መፍትሄዎቻቸውን እንዲቆጣጠሩ ያበቃል።"
      },
      {
        title: "ራስን መቻል (Self-Reliance)",
        desc: "የአገር ውስጥ አቅምን ማጠናከር ማህበረሰቦች የውሃ ሀብታቸውን በዘላቂነት እንዲያስተዳድሩ ያረጋግጣል፤ ይህም ከውጭ በሚገቡ የመመርመሪያዎች ላይ ጥገኝነትን ይቀንሳል።"
      },
      {
        title: "የስራ እድሎች (Job Opportunities)",
        desc: "የአገር ውስጥ የማኑፋክቸሪንግ ስራዎችን መፍጠር ግለሰቦችን ያበቃል እንዲሁም በውሃ እጥረት በተጎዱ አካባቢዎች የኢኮኖሚ እድገትን ያነቃቃል።"
      }
    ],

    tractionBadge: "የተረጋገጠ የመስክ ተጠቃሚነት",
    tractionTitle: "ተጨባጭ ስራዎች እና የተቋማት እምነት",
    tractionDesc: "ስርዓቱን በኢትዮጵያ እና በኬንያ በቀደሙት ፓይለቶች አረጋግጠናል፤ ይህም በእውነተኛ የመስክ ሁኔታዎች ውስጥ ተጠቃሚነቱን አሳይቷል። በቴክኒሻን ማሰልጠኛ ፕሮግራሞች ከጤና ጥበቃ ሚኒስቴር ጋር ሰርተናል። እንዲሁም ከ Action Against Hunger እስከ 30 ለሚደርሱ ክፍሎች የፍላጎት ደብዳቤ ተቀብለናል። ይህ በአገር ውስጥ ለተመረተ መፍትሄ እያደገ የመጣውን የተቋማት እምነት ያሳያል።",
    tractions: [
      {
        title: "የፍላጎት ደብዳቤ (Letter of Intent)",
        desc: "ከ Action Against Hunger (ACF) እስከ 30 ለሚደርሱ ክፍሎች ግምት ውስጥ የገባ ይፋዊ የፍላጎት ደብዳቤ ተቀብለናል።"
      },
      {
        title: "ቀዳሚ ፓይለቶች በኢትዮጵያ እና ኬንያ",
        desc: "በምስራቅ አፍሪካ ሁኔታዎች የተሳካ የመስክ ሙከራ እና ማረጋገጫ ተካሂዷል፤ ይህም ዝቅተኛ ሀብት ባላቸው አካባቢዎች የመስክ ተጠቃሚነቱን አሳይቷል።"
      },
      {
        title: "ከጤና ጥበቃ ሚኒስቴር ጋር ያለው ግንኙነት",
        desc: "ለውሃ መመርመሪያ ቴክኒሻኖች ንቁ የስልጠና ፕሮግራሞች፣ የመንግስትን አቅም መገንባት እና የስርዓቱን ተጠቃሚነት ማሳየት።"
      }
    ],

    progressBadge: "የአገር ውስጥ የመመርመሪያ ስነ-ምህዳር",
    progressTitle: "ቀደምት እድገት፡ ማኑፋክቸሪንግ እና ስልጠና",
    progressDesc: "የ 3D ህትመት እና የማሽን ቴክኖሎጂዎችን በመጠቀም የአገር ውስጥ ማምረት ጀምረናል። ለውሃ ቴክኒሻኖች የስልጠና ፕሮግራሞችን እናካሂዳለን። እንዲሁም በተለያዩ ዘርፎች ሽርክናዎችን እየገነባን ነው። ይህ የአካባቢያዊ የመመርመሪያ ስነ-ምህዳር ጅማሮ ነው።",

    collabBadge: "ፍትሃዊ የአካዳሚክ ትብብር",
    collabTitle: "የትብብር ግብዣ",
    collabDesc: "በምርምር፣ በማስፋፋት እና በተግባራዊ ስራዎች ላይ ለትብብር ክፍት ነን። ይህ መድረክ በአካባቢ ማይክሮባዮሎጂ፣ በፀረ-ተህዋሲያን መቋቋም (AMR) ክትትል፣ በ AI በሽታ አምጪ ተህዋስያን መለየት እና በተግባራዊ ሳይንስ ላይ ስራዎችን ያስችላል። የካናዳ-አፍሪካ አካዳሚክ ትብብርን እንጋብዛለን — የጋራ እርዳታዎች፣ የተማሪዎች የጋራ ቁጥጥር፣ የፓይለት ፕሮግራሞች እና የክልላዊ ማስፋፊያ ስልቶች። የውሃ ክትትል ፍትሃዊ፣ የትብብር እና በአገር ውስጥ የዳበረ መሆን አለበት።",
    collabs: [
      {
        title: "ማስፋፋት እና ማሰማራት (Scale & Deployment)",
        desc: "በፓይለት ፕሮግራሞች፣ በክልላዊ ስርጭት እና ከነባር የውሃ ጥራት ክትትል ስርዓቶች ጋር በማቀናጀት ላይ አብሮ መስራት።"
      },
      {
        title: "ሽርክና በአፍሪካ (Partnership in Africa)",
        desc: "በውሃ ምርመራ ስራዎች ላይ በንቃት ከተሰማሩ የአፍሪካ አገራት ድርጅቶች ጋር ለመተባበር ፍላጎት አለን።"
      }
    ],

    teamBadge: "የአገር ውስጥ አቅም ግንባታ",
    teamTitle: "ቁርጠኛ ቡድናችን",
    teamDesc: "እኛ የአገር ውስጥ የውሃ ምርመራን ለማሳደግ እና ከማህበረሰቦች እና የትምህርት ተቋማት ጋር በመተባበር ፈጠራን ለማበረታታት ያተኮርን ወጣት የኢትዮጵያ መሐንዲሶች ስብስብ ነን። ሆኖም ቴክኖሎጂ ብቻውን በቂ አይደለም። ስራችን መሳሪያዎችን በማሰማራት ላይ ብቻ ሳይሆን የአካባቢ ቴክኒካዊ አቅምን በመገንባት ላይ ያተኮረ ነው። ከማህበረሰቦች፣ ከመንግስት ባለድርሻ አካላት እና ከዩኒቨርሲቲዎች — ባህር ዳር ዩኒቨርሲቲን ጨምሮ አብረን እንሰራለን። ግባችን የመመርመር አቅም በአገር ውስጥ እንዲገነባ፣ በዚያው እንዲቀጥል እና በአገር ውስጥ እንዲስፋፋ ማድረግ ነው። አፍሪካ መር ፈጠራ ለሞዴላችን ማዕከላዊ ነው።",

    partnersBadge: "የትብብር እድገት",
    partnersTitle: "አጋሮቻችን",
    partnersDesc: "ከባህር ዳር ዩኒቨርሲቲ፣ ከ Centre for Global Equality፣ ከ BiT Maker Space እና ከመስራቾቹ WaterScope ጋር በቅርበት እንሰራለን። እነዚህ ሽርክናዎች ቴክኒካዊ ጥንካሬን እና የተግባር አቅምን ያጠናክራሉ። ትብብር የእድገታችን መሰረት ነው።",

    hwBadge: "የመመርመሪያ መሳሪያዎች",
    hwTitle: "ለመስክ ዝግጁ የሆኑ የመመርመሪያ ኪቶች",
    hwDesc: "የውጭ አቅርቦት ሰንሰለት ማነቆዎችን ለማስወገድ በባህር ዳር ዩኒቨርሲቲ በአገር ውስጥ የተመረቱ የውሃ መመርመሪያ መሳሪያዎች።",
    hw1Badge: "ሙሉ የመስክ ኪት",
    hw1Title: "የ WaterScope ባክቴሪያ መመርመሪያ ኪት – ሙሉ የመስክ ጣቢያ",
    hw1Desc: "በሞተር የሚሰራ የቫክዩም ፓምፕ፣ ባለ ሁለት 37°C/44°C ኢንኩቤተር፣ የኦፕቲካል ካሜራ፣ የባትሪ ጥቅል እና 200 የመመርመሪያ ካርትሪጅዎችን የያዘ የ 5.8 ኪ.ግ ሻንጣ።",
    hw1Spec1Key: "የምርመራ ፍጥነት",
    hw1Spec1Val: "የ 8 ሰዓት የመጀመሪያ ምልክት፣ የ 21 ሰዓት ሙሉ ቆጠራ (ISO 9308)",
    hw1Spec2Key: "የኪት ክብደት እና ተንቀሳቃሽነት",
    hw1Spec2Val: "5.8 ኪ.ግ ጠቅላላ ክብደት (ለአውሮፕላን ጉዞ ተስማሚ)",
    hw2Badge: "የፍጆታ እቃዎች ጥቅል",
    hw2Title: "በፓተንት የተጠበቁ የብረት ካርትሪጅዎች እና ፍጆታዎች (50 እና 200 ጥቅል)",
    hw2Desc: "0.45µm ሜምብሬን ፊልተር እና የእድገት ሚዲያ የያዙ የብረት ካርትሪጅዎች። በምርመራ $4.00 ብቻ።",
    hw2Spec1Key: "የአንድ ምርመራ ዋጋ",
    hw2Spec1Val: "$4.00 (እስከ 80% የወጪ ቅነሳ)",
    hw2Spec2Key: "አያያዝ እና ማከማቻ",
    hw2Spec2Val: "ማቀዝቀዣ አያስፈልገውም | ልዩ ስልጠና አይጠይቅም",
    hw3Badge: "የመመርመሪያ ጣቢያ",
    hw3Title: "ዲጂታል የቅኝ ግዛት ስካነር እና ኦፕቲካል ኢንኩቤተር",
    hw3Desc: "የተቀናጀ ዲጂታል ማይክሮስኮፕ እና የሙቀት ኢንኩቤተር ክፍል ከአውቶሜትድ ኮምፒውተር ቪዥን ቆጠራ እና አይኦቲ ክላውድ ጋር።",
    hw3Spec1Key: "የሚለየው ኢላማ",
    hw3Spec1Val: "አጠቃላይ ኮሊፎርም እና ኢ. ኮላይ (CFU/100mL)",
    hw3Spec2Key: "ግንኙነት",
    hw3Spec2Val: "አለምአቀፍ IoT፣ ብሉቱዝ እና ጂፒኤስ ማመሳሰል",
    hwViewStore: "በመደብር ይመልከቱ",
    hwRequestQuote: "ዋጋ ይጠይቁ",

    ctaTitle: "ያግኙን",
    ctaDesc: "በአገር ውስጥ ፈጠራ የውሃ ጥራት ክትትልን በመለወጥ ረገድ አብረውን ይሁኑ። የውሃ ጥራት ክትትል ከውጭ በሚገቡ ላብራቶሪዎች ላይ ብቻ ጥገኛ መሆን የለበትም። ወጣት አፍሪካውያን መሐንዲሶች ሊሰፉ የሚችሉ፣ የተረጋገጡ፣ በምርምር የተደገፉ መፍትሄዎችን መገንባት ይችላሉ። በፍትሃዊ የአካዳሚክ ትብብር በመላው አፍሪካ የውሃ ደህንነት ክትትልን መለወጥ እንችላለን።",
    ctaBtnDemo: "ቡድናችንን ያነጋግሩ",
    ctaBtnSpecs: "ዋና ዋና ገጽታዎችን ይመርምሩ"
  },

  om: {
    // waterscope.org Exact Sections
    problemHeading: "Rakkoo Jiru (The Problem)",
    problemParagraph1: "Addunyaa irratti dhibeen baakteeriyaa bishaaniin daddarbu waggaatti namoota miiliyoona walakkaa ol ta'an galaafata — guyyaatti namoota 2,000 ol. Kun dhibee busaa fi HIV walitti qabamee caala.",
    problemParagraph2: "Kanaafuu bishaan dhugaatii baakteeriyaaf qorachuun baay'ee barbaachisaadha. Haa ta'u malee meeshaaleen ammaa ulfaatoo, gatii qaalii fi saffisa gadi aanaa qabu.",
    solutionHeading: "Furmaata Keenya (Our Solution)",
    solutionParagraph1: "Rakkoo kana furuuf WaterScope sirna qorannoo bishaanii ammayyaa fi salphaa hundaaf dhaqqabamaa ta'e qopheesseera.",
    solutionParagraph2: "Teeknooloojii maashin larniingii fayyadamuun baakteeriyaa E. coli ofumaan lakkoofsa, sa'aatii 8 keessatti mallattoo kenna, sa'aatii 21 keessatti lakkoofsa guutuu dhiyeessa.",
    ucdHeading: "Dizaayinii Fayyadamaa Irratti Xiyyeeffate (User-Centred Design)",
    ucdParagraph1: "Biyyoota galii gadi aanaa qaban keessatti hawaasni bishaan isaanii ofumaan akka qoratan jajjabeessina; kunis barnootaaf, hojii uumuuf fi misoomaaf carraa bana.",
    ucdParagraph2: "Dizaayiniin keenya salphaadha — eegalee hanga xiinxalaatti — namni kamiyyuu bakka kamittuu itti fayyadamuu danda'a.",
    ucdBtnTech: "Waa'ee teeknooloojii keenyaa dabalataan dubbisaa",

    // waterscope.org Global Tagline & Mission
    heroTagline: "Qorannoo bishaanii qaxalee, salphaa — hundaaf.",
    heroMissionQuote: "Addunyaa irratti namoota kudhan keessaa tokko bishaan qulqulluu hin argatu. WaterScope kana jijjiiruu barbaada. Qorannoo baakteeriyaa amansiisaa ta'eef gufuuwwan jiran cabsuudhaan walqixxummaa dhabuu bishaanii addunyaa mo'achaa jirra.",
    problemGlobalStat: "Miiliyoona Walakkaa",
    problemGlobalDesc: "Addunyaa irratti dhibeen baakteeriyaa bishaaniin daddarbu waggaatti namoota miiliyoona walakkaa ol ta'an galaafata — guyyaatti namoota 2,000 ol (kan busaa fi HIV walitti qabame caala).",

    // waterscope.org UN SDG 6 & User-Centred Design
    sdgBadge: "Galma Misooma Itti Fufiinsa Qabu Dhaabbata Mootummoota Gamtoomanii 6 (SDG 6)",
    sdgTitle: "Bishaan Qulqulluu fi Saaniteeshinii Hundaaf",
    sdgQuote: "Argama bishaanii fi saaniteeshinii akkasumas bulchiinsa itti fufiinsa qabu hundaaf mirkaneessuu.",
    sdgDesc: "WaterScope Galma Misooma Itti Fufiinsa Qabu Dhaabbata Mootummoota Gamtoomanii ni deeggara. Galmi Misoomaa lakkoofsa 6 'argama bishaanii fi saaniteeshinii hundaaf mirkaneessuu' dha. WaterScope gufuuwwan teeknooloojii fi baasii qorannoo irratti jiran dhabamsiisuudhaan tarsiimoo addunyaa kana keessatti gumaacha gochuu barbaada.",
    ucdTitle: "Dizaayinii Fayyadamaa Irratti Xiyyeeffate fi Hawaasa Humneessuu",
    ucdDesc: "Biyyoota galii gadi aanaa fi giddu galeessaa qaban keessatti hawaasni bishaan isaanii of danda'anii akka qoratan jajjabeessina; kunis barnootaaf, carraa hojii uumuuf, hirmaachisummaa fi misooma hawaasaaf carraa bana. Dizaayiniin keenya salphaadha — eegalee hanga xiinxala daataatti — namni kamiyyuu bakka kamittuu itti fayyadamuu danda'a.",
    ucdPoint1Title: "Hirmaachisummaa Guutuu",
    ucdPoint1Desc: "Ogummaa teeknikaa cimaa fi balaa ibiddan qulqulleessuu dhabamsiisa; miseensonni hawaasaa fi ogeeyyiin fayyaa qorannoo ISO 9308-1 gaggeessuu dandeessisa.",
    ucdPoint2Title: "Qorannoo Of Danda'e",
    ucdPoint2Desc: "Laabiraatoorii magaalaa fagoo irratti utuu hin hirkatin battalatti bishaan dhugaatii qorata.",
    ucdPoint3Title: "Daataa Dijitaalaa fi Kaartaa Daashboordii",
    ucdPoint3Desc: "IoT fi appiin moobaayilaa daataa qulqullina bishaanii kallattiin gara daashboordiitti ergu; kunis mootummoota fi NGO'oota balaan dhibee utuu hin babal'atin tarkaanfii akka fudhatan gargaara.",

    heroBadge: "WaterScope Afrikaa | Konfaransii Walta'iinsa Barnootaa Kaanaadaa-Afrikaa",
    heroHeadline1: "WaterScope Afrikaa",
    heroHeadline2: "Qulqullina Bishaanii Jijjiiruu",
    heroSubtitle: "Sirna qorannoo bishaanii kalaqaa banaa ta'e, qorannoo baakteeriyaa bishaan dhugaatii keessatti salphaa, ammayyaa fi amansiisaa ta'e hundaaf dhaqqabamaa taasisa. Jalqaba Injinariin Yuunivarsiitii Keembiriijitiin kan hojjetame.",
    heroBtnTech: "Amaloota Ijoo WaterScope",
    heroBtnWork: "Hojiiwwan Qabatamaa fi Paayileetii",
    heroTrust1: "Ariifataa: mallattoo sa'aatii 8, lakkoofsa guutuu sa'aatii 21 (ISO 9308)",
    heroTrust2: "Oomisha Biyya Keessaa: Gatii Hamma 80% Hir'isuu",
    heroTrust3: "Xalayaa Fedhii: Hamma Yuuniitii 30 (Action Against Hunger)",
    heroFloatingTitle: "Fakkii - Laga Abbayyaa, Baahir Daar, Itoophiyaa",
    heroFloatingSub: "Sirna calaltuu meembireenii dirree irratti qophaa'e",

    problemBadge: "Rakkoo Fayyaa Hawaasaa",
    problemTitle: "Dhaqqabamummaan bishaanii yeroo baay'ee bu'uura misoomaa wajjin ka'a — garuu to'annoonis walqixa barbaachisaadha.",
    problemDesc: "Rakkoon dhaqqabamummaa bishaanii qofa miti — sirna to'annoo amansiisaa fi babal'achuu danda'u dhabuudha.",
    pain1Title: "Namoota bishaan dhugaatii qulqulluu hin arganne",
    pain1Desc: "Addunyaa irratti namoonni biliyoona 2.2 bishaan dhugaatii qulqulluu hin argatan; kunis rakkoolee fayyaatiif sababa ta'uun furmaata bishaanii itti fufiinsa qabuuf barbaachisummaa agarsiisa.",
    pain2Title: "WASH Dadhabaa",
    pain2Desc: "Itoophiyaa keessatti dhibeewwan daddarboo keessaa dhibbeentaan 60–80 bishaan, qulqullina fi saaniiteeshinii gahaa hin taaneen kan walqabataniidha.",
    pain3Title: "Du'a Daa'immanii",
    pain3Desc: "Garaa kaasaan waggaatti du'a daa'imman waggaa shanii gadii tilmaamaan 25,000tiif sababa ta'a, kunis sababa du'a daa'immanii isa sadaffaa isa taasisa.",

    challengesBadge: "Gufuuwwan Sirnaa",
    challengesTitle: "Qormaata Ijoo To'annoo Qulqullina Bishaanii Keessatti",
    challengesDesc: "Sirni to'annoo ammaa gufuuwwan caasaa qaba. Sirnoonni baay'een gatii guddaa fi biyya alaarraa kan fidamaniidha. Sarara dhiyeessii salphatti miidhamu irratti hundaa'u. Baay'een isaanii leenjii addaa naannoo baadiyyaatti itti fufsiisuun ulfaataa ta'e barbaadu. Yeroo baay'ee dijitaalaan kan walqunnaman miti — kana jechuun daataan kophaatti hafa. Bakka bishaanii baadiyyaa kumaatama irratti babal'isuun rakkisaa ta'a. Kun kufaatii teeknooloojii miti. Rakkoo saxaxa sirnaati.",
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

    solutionBadge: "Sirna WaterScope",
    solutionTitle: "Sirna Calaltuu Meembireenii Banaa Injinariin Keembiriijitiin Hojjetame",
    solutionDesc: "WaterScope sirna calaltuu meembireenii banaa fi dirreef qophaa'e kan jalqaba Injinariin Yuunivarsiitii Keembiriijitiin hojjetameedha. Mala kaartiriidhaan qorannoo baakteeriyaa bishaan dhugaatii keessatti salphisa, maashin larningiidhaan lakkoofsa kolonii ofumaan hojjeta. Laabiraatoorii guutuu barbaaduu mannaa, sirnichi dhiphaa, socho'aa fi dirree irratti kan hojjetuudha — akkuma asitti Laga Abbayyaa Baahir Daaritti mul'atu. Qulqullina laabiraatoorii dhaqqabamummaa dirree wajjin walqunnamsiisa.",
    solutionStat1Val: "Sa'aatii 8–21",
    solutionStat1Desc: "Mallattoo jalqabaa sa'aatii 8 keessatti, lakkoofsa guutuu sa'aatii 21 keessatti",
    solutionStat2Val: "Hamma 80%",
    solutionStat2Desc: "Itoophiyaa keessatti oomishuudhaan gatii hir'isuu",
    solutionBtn: "Amaloota Ijoo Qoradhaa",

    workflowBadge: "Adeemsa Qorannoo Salphaa",
    workflowTitle: "Qorannoo Daqiiqaa 8 Keessatti: Sadarkaa Sadarkaan",
    workflowDesc: "Gufuuwwan laabiraatoorii dhabamsiisuun achumatti qorannoo baakteeriyaa ariifataa ta'e kan dandeessisu mala calaltuu meembireenii.",
    workflowSteps: [
      {
        step: "01",
        title: "Naamuunaa Bishaan Fudhuu",
        desc: "Paampii vaakiyumii baatriidhaan hojjetu fayyadamuun naamuunaa bishaan dhugaatii 100mL fudhadhaa.",
        highlight: "Calaltuu vaakiyumii mootoraan hojjetu",
        detail: "Dadhabbiin harka hin jiru; daqiiqaa 3 gadi keessatti 100mL calala."
      },
      {
        step: "02",
        title: "Kaartirii Paatentiin Qabameen Calaluu",
        desc: "Bishaan kaartirii sibiilaa keessa darbuun baakteeriyaa hunda paadii meembireenii 0.45µm irratti qaba.",
        highlight: "Ogummaa qulqullinaa addaa hin barbaadu",
        detail: "Gubaatii ibiddaa dirree dhabamsiisa; faalama ittisa."
      },
      {
        step: "03",
        title: "Miidiyaa Dhangala'aa fi Inkiwubeeshinii",
        desc: "Miidiyaan nyaataa dhangala'aan itti dabalamuun kutaalee ho'aa 37°C ykn 44°C keessa kaa'ama.",
        highlight: "Qabbaneessaa hin barbaadu",
        detail: "Humni baatrii ho'a sirrii ±0.3°C eega."
      },
      {
        step: "04",
        title: "Fakkii Maayikirooskoopii Optikaalaa",
        desc: "Koloniin baakteeriyaa baay'achuu yeroo jalqabu maayikirooskoopiin dijitaalaa fakkii qulqullina ol'aanaa kaasa.",
        highlight: "Optiiksii koloniilee xixinnoo",
        detail: "Koloniin ijaan mul'achuu dura sa'aatii 8 keessatti adda baasa."
      },
      {
        step: "05",
        title: "Lakkoofsa Kolonii Maashin Larnigii",
        desc: "Algorizimiin maashin larnigii koloniilee baakteeriyaa meembireenii irratti ofumaan lakkaa'a.",
        highlight: "Lakkoofsa kolonii ofumaan",
        detail: "Dogoggora lakkoofsa namaa dhabamsiisa; bu'aa CFU/100mL kenna."
      },
      {
        step: "06",
        title: "Appii fi Daashboordii Waliin Walqabsiisuu",
        desc: "Bu'aan qorannoo appii moobaayilaa fi daashboordii giddu galeessaatti yeroodhaan ergamee qophaa'a.",
        highlight: "Gabaasa giddu galeessaa",
        detail: "Hordoffii yerootiifi murtoo ragaarratti hundaa'e dandeessisa."
      }
    ],

    featuresBadge: "Amaloota Ijoo Sirna WaterScope",
    featuresTitle: "Fedhii Dirree Qabatamaa Irratti Hundaa'ee Kan Saxaxame",
    featuresDesc: "Sirnichi fedhii dirree qabatamaa irratti hundaa'ee kan saxaxameedha: Ariifataa — mallattoo sa'aatii 8 fi lakkoofsa guutuu sa'aatii 21 keessatti. Socho'aa fi cimaa — naannolee qabeenyi itti xiqqaateef kan hojjetame. Amansiisaa — sadarkaa ISO 9308 wajjin kan walbira qabamee fi qaama alaan kan mirkanaa'e. Dijitaala fi ammayyaa — maayikirooskooppii fi maashin larniingii fayyadamee kolonii lakkaa'a. Daataa irratti kan hundaa'e — appii moobaayilaa fi daashboordiin gabaasa giddu galeessaa kenna. Hunda caalaa ammoo hawaasaaf gufuu maallaqaa hir'isa.",
    features: [
      {
        title: "Ariifataa (Rapid)",
        desc: "Qorannoo qulqullina bishaaniitiif bu'aa yeroodhaa kenna (mallattoo sa'aatii 8 keessatti fi bu'aa guutuu sa'aatii 21 keessatti)."
      },
      {
        title: "Socho'aa (Portable)",
        desc: "Bakkeewwan fagootti salphaatti fe'amuuf kan saxaxame. Naannolee qabeenya xiqqaataniif kan hojjetame."
      },
      {
        title: "Salphaa (Simple)",
        desc: "Saxaxni fayyadamaaf mijatu hojjechuuf salphaa ta'uu isaa mirkaneessa."
      },
      {
        title: "Amansiisaa (Reliable)",
        desc: "Bu'aa qulqullina bishaanii dhaabbataa fi sirrii ta'e kenna. Sadarkaa ISO 9308 wajjin kan walbira qabamee fi qaama alaan kan mirkanaa'e."
      },
      {
        title: "Cimaa (Robust)",
        desc: "Haalawwan dirree qormaata qaban damdamachuuf kan saxaxame."
      },
      {
        title: "Dijitaala (Digital)",
        desc: "Hubannoo ragaa irratti hundaa'eef teeknooloojii olaanaa walitti makuun maayikirooskooppii fi maashin larniingiin kolonii lakkaa'a."
      },
      {
        title: "Ammayyaa (Smart)",
        desc: "Murtoo ragaa irratti hundaa'eef daataa yeroodhaa kenna."
      },
      {
        title: "Gatii Madaalawaa (Affordable)",
        desc: "Hawaasa naannoof gatii qusatamaa ta'ee fi gufuu maallaqaa akka hir'isuuf kan saxaxame."
      },
      {
        title: "Daataa Irratti Kan Hundaa'e (Data-Driven)",
        desc: "Qulqullina bishaanii fooyyessuuf xiinxala olaanaa fayyadama, appii moobaayilaa fi daashboordii fayyadamuun to'annoo yerootiifi gabaasa giddu galeessaa dandeessisa."
      }
    ],

    diffBadge: "Moodeela Kalaqa Sirnaa",
    diffTitle: "Maaltu Adda Nu Taasisa?",
    diffDesc: "Wanti adda nu taasisu meeshaa qofa miti — moodeela kalaqa sirnaati. Kun qorannoo bishaanii hirkattummaa alaarraa gara dandeettii naannootti jijjiira.",
    diffs: [
      {
        title: "Gatii Hir'isuu (Cost Reduction)",
        desc: "Biyya keessatti oomishuun gatii hamma 80% hir'isa; kunis qorannoo bishaanii hawaasa barbaadaniif dhaqqabamaa taasisa."
      },
      {
        title: "Dandeettii Ijaaruu (Capacity Building)",
        desc: "Adeemsi keenya dandeettii teeknikaa fi qorannoo biyya keessaa ijaara; hawaasni furmaata qulqullina bishaan isaanii akka to'atan humna kenna."
      },
      {
        title: "Of Dandeessuu (Self-Reliance)",
        desc: "Dandeettii biyya keessaa cimsuun hawaasni qabeenya bishaan isaanii yeroo dheeraaf akka bulchan mirkaneessa, hirkattummaa meeshaalee biyya alaarraa hir'isa."
      },
      {
        title: "Carraa Hojii (Job Opportunities)",
        desc: "Hojiiwwan oomishaa biyya keessatti uumuun namoota humneessa akkasumas guddina diinagdee naannolee hanqinni bishaanii jiran keessatti dammaqsa."
      }
    ],

    tractionBadge: "Fayyadama Dirree Mirkanaa'e",
    tractionTitle: "Hojiiwwan Qabatamaa fi Amanamummaa Dhaabbilee",
    tractionDesc: "Sirnicha paayileetii Itoophiyaa fi Keeniyaa keessatti gaggeeffameen mirkaneessineerra; kunis haala dirree qabatamaa keessatti bu'a qabeessummaa isaa agarsiiseera. Sagantaa leenjii ogeessotaatiin Ministeera Fayyaa wajjin hojjenneerra. Akkasumas Action Against Hunger irraa hamma yuuniitii 30tiif Xalayaa Fedhii arganneerra. Kunis furmaata biyya keessatti oomishamuuf amantaan dhaabbilee guddachaa dhufuu agarsiisa.",
    tractions: [
      {
        title: "Xalayaa Fedhii (Letter of Intent)",
        desc: "Action Against Hunger (ACF) irraa hamma yuuniitii 30tiif Xalayaan Fedhii ifaa ta'e fudhatameera."
      },
      {
        title: "Paayileetiiwwan Itoophiyaa fi Keeniyaa",
        desc: "Haalawwan Afrikaa Bahaa keessatti qorannoon dirree milkaa'ina qabu gaggeeffamee fi mirkanaa'eera."
      },
      {
        title: "Ministeera Fayyaa Wajjin Walta'iinsa",
        desc: "Ogeessota qorannoo bishaaniitiif sagantaalee leenjii socho'aa, dandeettii mootummaa ijaaruu fi sirnicha agarsiisuu."
      }
    ],

    progressBadge: "Ikkoosistamii Qorannoo Naannoo",
    progressTitle: "Guddina Jalqabaa: Oomisha fi Leenjii",
    progressDesc: "Teeknooloojii Maxxansa 3D fi maashinoota fayyadamuun oomisha biyya keessaa jalqabneerra. Ogeessota bishaaniif sagantaalee leenjii ni gaggeessina. Akkasumas dameewwan hedduu keessatti michummaa ijaaraa jirra. Kun jalqaba ikkoosistamii qorannoo naannooti.",

    collabBadge: "Walta'iinsa Barnootaa Haqa Qabeessa",
    collabTitle: "Afeerraa Walta'iinsaa",
    collabDesc: "Qorannoo, babal'isuu fi hojiirra oolchuu irratti walta'iinsaaf banaadha. WPlatformiin kun maayikiroobaayoloojii naannoo, to'annoo dandamanna qorichaa (AMR), beekumsa baakteeriyaa AI fi saayinsii hojiirra oolmaa keessatti hojii dandeessisa. Walta'iinsa barnootaa Kaanaadaa–Afrikaa afeerra — deeggarsa waloo, hordoffii barattootaa waloo, sagantaalee paayileetii fi tarsiimoo babal'isuu naannoo. To'annoon bishaanii haqa qabeessa, gamtaa fi naannootti humneeffame ta'uu qaba.",
    collabs: [
      {
        title: "Babal'isuu fi Hojiirra Oolchuu (Scale & Deployment)",
        desc: "Sagantaalee paayileetii, tamsaasa naannoo fi sirna to'annoo qulqullina bishaanii jiran wajjin qindeessuu irratti michoomuu."
      },
      {
        title: "Michummaa Afrikaa Keessatti (Partnership in Africa)",
        desc: "Dhaabbilee biyyoota Afrikaa keessatti dhimma qorannoo bishaanii irratti hojjetan wajjin walta'uuf fedhii qabna."
      }
    ],

    teamBadge: "Dandeettii Biyya Keessaa Ijaaruu",
    teamTitle: "Garee Keenya Kan Murannoo Qabu",
    teamDesc: "Nuti garee injinaroota Itoophiyaa dargaggoota qorannoo bishaan biyya keessaa fooyyessuu fi hawaasa fi dhaabbilee barnootaa wajjin walta'uudhaan kalaqa guddisuu irratti xiyyeeffanneedha. Haa ta'u malee teeknooloojii qofti gahaa miti. Hojiin keenya meeshaalee fiduu qofa irratti utuu hin taane dandeettii teeknikaa biyya keessaa ijaaruu irratti kan xiyyeeffateedha. Hawaasa, qooda fudhattoota mootummaa fi yuunivarsiitota — Yuunivarsiitii Baahir Daar dabalatee waliin hojjanna. Kaayyoon keenya dandeettiin qorannoo biyya keessatti akka ijaaramu, akka itti fufu fi akka babal'atu gochuudha. Kalaqni Afrikaan durfamu moodeela keenyaaf giddu galeessa.",

    partnersBadge: "Guddina Walta'iinsaa",
    partnersTitle: "Michoota Keenya",
    partnersDesc: "Yuunivarsiitii Baahir Daar, Centre for Global Equality, BiT Maker Space, fi hundeeffamtoota WaterScope wajjin dhiyootti hojjanna. Michummaan kun cimina teeknikaa fi dandeettii hojiirra oolmaa cimsa. Walta'iinsi bu'uura guddina keenyaati.",

    hwBadge: "Meeshaalee Qorannoo",
    hwTitle: "Kiitiiwwan Dirreef Qophaa'an",
    hwDesc: "Gufuu sarara dhiyeessii alaa dhabamsiisuuf meeshaalee qorannoo bishaanii Yuunivarsiitii Baahir Daaritti biyya keessatti oomishaman.",
    hw1Badge: "Kiitii Dirree Guutuu",
    hw1Title: "Kiitii Qorannoo Baakteeriyaa WaterScope – Buufata Dirree Guutuu",
    hw1Desc: "Paampii vaakiyumii mootoraan hojjetu, inkiwubeetara 37°C/44°C lamaan, kaameraa optikaalaa, baatrii fi kaartirii 200 saanduqa 5.8kg keessatti qabata.",
    hw1Spec1Key: "Saffisa Qorannoo",
    hw1Spec1Val: "Mallattoo sa'aatii 8, lakkoofsa guutuu sa'aatii 21 (ISO 9308)",
    hw1Spec2Key: "Ulfaatina fi Socho'ummaa",
    hw1Spec2Val: "Ulfaatina walii galaa 5.8 kg (xiyyaaraan deemuuf mijataa)",
    hw2Badge: "Kuusaa Meeshaalee",
    hw2Title: "Kaartirii Sibiilaa Paatentii Qabuu fi Dhiyeessiiwwan (Kuusaa 50 fi 200)",
    hw2Desc: "Kaartirii calaltuu 0.45µm fi miidiyaa dhangala'aa qabu. Qorannoo tokkoof $4.00 qofa.",
    hw2Spec1Key: "Gatii Qorannoo Tokkoo",
    hw2Spec1Val: "$4.00 (gatii hamma 80% hir'isuu)",
    hw2Spec2Key: "Qabiinsa fi Kuusaa",
    hw2Spec2Val: "Qabbaneessaa hin barbaadu | Ogummaa addaa hin gaafatu",
    hw3Badge: "Buufata Qorannoo",
    hw3Title: "Iskaanara Kolonii Dijitaalaa fi Inkiwubeetara Optikaalaa",
    hw3Desc: "Maayikirooskooppii dijitaalaa fi inkiwubeetara ho'aa lakkoofsa kolonii kompiitara viizyiniitiin hojjetu fi IoT qabu.",
    hw3Spec1Key: "Kaayyoo Adda Baasuu",
    hw3Spec1Val: "Koliifoormii Waliigalaa fi E. coli (CFU/100mL)",
    hw3Spec2Key: "Walqunnamtii",
    hw3Spec2Val: "IoT Addunyaa, Bluutuusii fi GPS Daashboordiitti Walqabsiisuu",
    hwViewStore: "Kuusaa Keessatti Ilaali",
    hwRequestQuote: "Gatii Gaafadhu",

    ctaTitle: "Nu Qunnamaa",
    ctaDesc: "Kalaqa biyya keessaatiin to'annoo qulqullina bishaanii jijjiiruu keessatti nu faana hiriiraa. To'annoon qulqullina bishaanii laabiraatoorii alaarraa dhufu qofa irratti hirkachuu hin qabu. Injinaroonni dargaggoonni Afrikaa furmaata qorannoon deeggaramee fi babal'achuu danda'u ijaaruu danda'u. Walta'iinsa barnootaa haqa qabeessaan to'annoo nageenya bishaanii Afrikaa keessatti jijjiiruu dandeenya.",
    ctaBtnDemo: "Garee Keenya Qunnamaa",
    ctaBtnSpecs: "Amaloota Ijoo Qoradhaa"
  }
};

export const homeContent: Record<Language, HomeContentData> = {
  en: data.en,
  am: data.am,
  om: data.om,
  ti: data.am,
};
