import { Language } from '../i18n/types';

export interface AboutPageContent {
  // waterscope.org Cambridge Heritage & Global Advisory
  cambridgeBadge: string;
  cambridgeTitle: string;
  cambridgeDesc: string;
  cambridgeFunding: string;
  cambridgeFundingDesc: string;
  founder1Name: string;
  founder1Role: string;
  founder1Bio: string;
  founder2Name: string;
  founder2Role: string;
  founder2Bio: string;
  founder3Name: string;
  founder3Role: string;
  founder3Bio: string;

  // Slide 6: Our Committed Team & Building Local Capacity
  headerBadge: string;
  headerTitle: string;
  headerDesc: string;

  // Slide 2: The Public Health Challenge
  missionBadge: string;
  missionTitle: string;
  missionP1: string;
  missionP2: string;

  // Slide 7: What Makes Us Different (4 Nodes)
  pillar1Title: string;
  pillar1Desc: string;
  pillar2Title: string;
  pillar2Desc: string;
  pillar3Title: string;
  pillar3Desc: string;
  pillar4Title: string;
  pillar4Desc: string;

  // Slide 9: Early Progress
  progressTitle: string;
  progressDesc: string;

  // Slide 10: The Collaboration Invitation
  collabTitle: string;
  collabDesc: string;
  collab1Title: string;
  collab1Desc: string;
  collab2Title: string;
  collab2Desc: string;

  // Slide 12: Call to Action & Closing
  ctaTitle: string;
  ctaDesc: string;
  ctaBtn1: string;
  ctaBtn2: string;
}

const data: Record<string, AboutPageContent> = {
  en: {
    // waterscope.org Cambridge Heritage
    cambridgeBadge: "University of Cambridge Heritage",
    cambridgeTitle: "Global Origins & Scientific Founding",
    cambridgeDesc: "Founded in 2015, WaterScope is a social impact 'spin-in' start-up based at the University of Cambridge. Our founding team is comprised of biologists, physicists, material scientists, and engineers who designed and iterated the WaterScope system specifically for and with end-users in low- and middle-income countries.",
    cambridgeFunding: "£900,000+ Non-Dilutive Funding",
    cambridgeFundingDesc: "Raised over £900,000 in non-dilutive research and humanitarian innovation grants, enabling rigorous academic validation, international field trials, and open-source hardware development.",
    founder1Name: "Dr. Alexander Patto",
    founder1Role: "CEO & Co-Founder (WaterScope UK)",
    founder1Bio: "PhD in Genetics, Royal Academy of Engineering Enterprise Fellow & Borysiewicz Biomedical Fellow at the University of Cambridge. Pioneer in accessible diagnostics.",
    founder2Name: "Sammy Mahdi",
    founder2Role: "COO & Co-Founder (WaterScope UK)",
    founder2Bio: "MRes + PhD in Sensor Technologies & Applications, Institute for Manufacturing, University of Cambridge. Expert in scalable systems and IoT field telemetry.",
    founder3Name: "Dr. Richard Bowman",
    founder3Role: "Co-Founder & Optical Hardware Pioneer",
    founder3Bio: "University of Cambridge / University of Bath. Co-creator of the OpenFlexure 3D-printed digital microscope, democratizing optical pathogen detection worldwide.",

    // Slide 6
    headerBadge: "Building Local Capacity",
    headerTitle: "Our Committed Team",
    headerDesc: "We are a dedicated group of young Ethiopian engineers focused on enhancing local water diagnostics and fostering innovation through collaboration with communities and educational institutions. However, technology alone is not enough. Our work is focused not only on deploying devices, but on building local technical capacity. We collaborate with communities, government stakeholders, and universities — including Bahir Dar University. Our goal is to ensure that diagnostic capacity is built locally, sustained locally, and scaled locally. African-led innovation is central to our model.",

    // Slide 2
    missionBadge: "The Public Health Challenge",
    missionTitle: "Water access is often discussed in terms of infrastructure — but surveillance is equally critical.",
    missionP1: "Globally, 2.2 billion individuals do not have access to safe drinking water, contributing to widespread health issues and emphasizing the urgent need for sustainable water solutions. In Ethiopia, 60–80% of communicable diseases are linked to inadequate water, sanitation, and hygiene conditions, with diarrhea responsible for approximately 25,000 under-five deaths annually, making it the third leading cause of child mortality.",
    missionP2: "The challenge is not only water access — it is the lack of reliable, scalable monitoring systems. What differentiates us is not only the device — but the systems innovation model. This shifts water testing from external dependency to regional resilience, bringing open-source, field-adapted diagnostic tools directly into local hands.",

    // Slide 7: What Makes Us Different
    pillar1Title: "Cost Reduction",
    pillar1Desc: "Local manufacturing significantly lowers costs by up to 80%, making water testing accessible to communities in need.",
    pillar2Title: "Capacity Building",
    pillar2Desc: "Our approach builds local technical and research capacity within the country, empowering communities to take control of their water quality solutions.",
    pillar3Title: "Self-Reliance",
    pillar3Desc: "Strengthening local capacity ensures communities can manage their water resources effectively and sustainably over time, reducing dependency on imported diagnostics.",
    pillar4Title: "Job Opportunities",
    pillar4Desc: "Creating local manufacturing jobs empowers individuals and stimulates economic growth in regions affected by water scarcity.",

    // Slide 9
    progressTitle: "Early Progress: Manufacturing and Training",
    progressDesc: "We have begun local manufacturing using 3D printing and machining technologies. We conduct training programs for water technicians. And we are building partnerships across sectors. This is the beginning of a localized diagnostic ecosystem.",

    // Slide 10
    collabTitle: "The Collaboration Invitation",
    collabDesc: "We are open to collaboration in research, scale, and deployment. This platform enables work in environmental microbiology, antimicrobial resistance surveillance, AI-driven pathogen detection, and implementation science. We invite Canada–Africa academic collaboration — joint grants, co-supervision of students, pilot programs, and regional deployment strategies. Water surveillance should be equitable, collaborative, and locally empowered.",
    collab1Title: "Scale & Deployment",
    collab1Desc: "Partner on pilot programs, regional rollouts, and integration with existing water quality monitoring systems.",
    collab2Title: "Partnership in Africa",
    collab2Desc: "We are interested in collaborating with organizations in African nations that are actively engaged in water testing initiatives.",

    // Slide 12
    ctaTitle: "Get in Touch",
    ctaDesc: "Water quality surveillance should not depend solely on imported laboratories. Young African engineers can build scalable, validated, research-driven solutions. Through equitable academic collaboration, we can transform water safety monitoring across Africa.",
    ctaBtn1: "Contact Our Team",
    ctaBtn2: "Explore Our Work"
  },

  am: {
    // waterscope.org Cambridge Heritage
    cambridgeBadge: "የካምብሪጅ ዩኒቨርሲቲ ቅርስ",
    cambridgeTitle: "አለም አቀፍ አመጣጥ እና ሳይንሳዊ አመራር",
    cambridgeDesc: "በ 2015 የተመሰረተው WaterScope በካምብሪጅ ዩኒቨርሲቲ ውስጥ የተፈጠረ የማህበራዊ ተፅእኖ ጀማሪ ድርጅት ነው። መስራች ቡድናችን የ WaterScope ስርዓትን ዝቅተኛ እና መካከለኛ ገቢ ባላቸው ሀገራት ውስጥ ላሉ ተጠቃሚዎች ሆን ብለው የነደፉ እና ያዳበሩ ባዮሎጂስቶች፣ የፊዚክስ ሊቃውንት እና መሐንዲሶችን ያቀፈ ነው።",
    cambridgeFunding: "£900,000+ የምርምር ድጋፍ",
    cambridgeFundingDesc: "ከ 900,000 የእንግሊዝ ፓውንድ በላይ የምርምር እና የፈጠራ ድጋፍ በማሰባሰብ ጥብቅ የአካዳሚክ ማረጋገጫን፣ አለም አቀፍ የመስክ ሙከራዎችን እና ክፍት የቴክኖሎጂ እድገትን አስችሏል።",
    founder1Name: "ዶ/ር አሌክሳንደር ፓቶ",
    founder1Role: "ዋና ስራ አስፈፃሚ እና ተባባሪ መስራች (WaterScope UK)",
    founder1Bio: "በጄኔቲክስ ፒኤችዲ፣ የሮያል ኢንጂነሪንግ አካዳሚ ኢንተርፕራይዝ ፌሎው እና በካምብሪጅ ዩኒቨርሲቲ ባዮሜዲካል ፌሎው።",
    founder2Name: "ሳሚ ማህዲ",
    founder2Role: "ዋና ኦፕሬሽን ኦፊሰር እና ተባባሪ መስራች (WaterScope UK)",
    founder2Bio: "በሴንሰር ቴክኖሎጂዎች ማስተርስ እና ፒኤችዲ፣ የማኑፋክቸሪንግ ኢንስቲትዩት፣ የካምብሪጅ ዩኒቨርሲቲ።",
    founder3Name: "ዶ/ር ሪቻርድ ቦውማን",
    founder3Role: "ተባባሪ መስራች እና የኦፕቲካል ሃርድዌር መሐንዲስ",
    founder3Bio: "የካምብሪጅ ዩኒቨርሲቲ / ባዝ ዩኒቨርሲቲ። የ OpenFlexure 3D የታተመ ዲጂታል ማይክሮስኮፕ ተባባሪ ፈጣሪ።",

    headerBadge: "የአገር ውስጥ አቅም ግንባታ",
    headerTitle: "ቁርጠኛ ቡድናችን",
    headerDesc: "እኛ የአገር ውስጥ የውሃ ምርመራን ለማሳደግ እና ከማህበረሰቦች እና የትምህርት ተቋማት ጋር በመተባበር ፈጠራን ለማበረታታት ያተኮርን ወጣት የኢትዮጵያ መሐንዲሶች ስብስብ ነን። ሆኖም ቴክኖሎጂ ብቻውን በቂ አይደለም። ስራችን መሳሪያዎችን በማሰማራት ላይ ብቻ ሳይሆን የአካባቢ ቴክኒካዊ አቅምን በመገንባት ላይ ያተኮረ ነው። ከማህበረሰቦች፣ ከመንግስት ባለድርሻ አካላት እና ከዩኒቨርሲቲዎች — ባህር ዳር ዩኒቨርሲቲን ጨምሮ አብረን እንሰራለን። ግባችን የመመርመር አቅም በአገር ውስጥ እንዲገነባ፣ በዚያው እንዲቀጥል እና በአገር ውስጥ እንዲስፋፋ ማድረግ ነው። አፍሪካ መር ፈጠራ ለሞዴላችን ማዕከላዊ ነው።",

    missionBadge: "የህዝብ ጤና ፈተና",
    missionTitle: "የውሃ አቅርቦት ብዙ ጊዜ ከመሰረተ ልማት አንፃር ይነሳል — ነገር ግን ክትትል እኩል ወሳኝ ነው።",
    missionP1: "በአለም አቀፍ ደረጃ 2.2 ቢሊዮን ሰዎች ንጹህ የመጠጥ ውሃ አያገኙም፤ ይህም ለተስፋፋ የጤና ችግሮች መንስኤ በመሆን ዘላቂ የውሃ መፍትሄዎች አስቸኳይ አስፈላጊነትን ያጎላል። በኢትዮጵያ ውስጥ 60–80% የሚሆኑት ተላላፊ በሽታዎች በቂ ካልሆነ የውሃ፣ የንፅህና እና የሳኒቴሽን ሁኔታዎች ጋር የተያያዙ ናቸው፤ ተቅማጥ በየዓመቱ ለግምት 25,000 ከ 5 ዓመት በታች ህፃናት ሞት ተጠያቂ ሲሆን ይህም በህፃናት ሞት ሶስተኛው ዋነኛ መንስኤ ያደርገዋል።",
    missionP2: "ፈተናው የውሃ አቅርቦት ማጣት ብቻ አይደለም — አስተማማኝ እና ሊሰፉ የሚችሉ የክትትል ስርዓቶች እጥረት ጭምር ነው። ልዩ የሚያደርገን መሳሪያው ብቻ ሳይሆን የስርዓት ፈጠራ ሞዴሉ ነው። ይህ የውሃ ምርመራን ከውጭ ጥገኝነት ወደ ክልላዊ ጽናት ይለውጣል።",

    pillar1Title: "የወጪ ቅነሳ (Cost Reduction)",
    pillar1Desc: "የአገር ውስጥ ማምረት ወጪን እስከ 80% በከፍተኛ ሁኔታ ይቀንሳል፤ ይህም የውሃ ምርመራ ለተቸገሩ ማህበረሰቦች ተደራሽ ያደርገዋል።",
    pillar2Title: "አቅም ግንባታ (Capacity Building)",
    pillar2Desc: "አካሄዳችን በአገር ውስጥ የቴክኒክ እና የምርምር አቅምን ይገነባል፤ ማህበረሰቦች የውሃ ጥራት መፍትሄዎቻቸውን እንዲቆጣጠሩ ያበቃል።",
    pillar3Title: "ራስን መቻል (Self-Reliance)",
    pillar3Desc: "የአገር ውስጥ አቅምን ማጠናከር ማህበረሰቦች የውሃ ሀብታቸውን በዘላቂነት እንዲያስተዳድሩ ያረጋግጣል፤ ይህም ከውጭ በሚገቡ የመመርመሪያዎች ላይ ጥገኝነትን ይቀንሳል።",
    pillar4Title: "የስራ እድሎች (Job Opportunities)",
    pillar4Desc: "የአገር ውስጥ የማኑፋክቸሪንግ ስራዎችን መፍጠር ግለሰቦችን ያበቃል እንዲሁም በውሃ እጥረት በተጎዱ አካባቢዎች የኢኮኖሚ እድገትን ያነቃቃል።",

    progressTitle: "ቀደምት እድገት፡ ማኑፋክቸሪንግ እና ስልጠና",
    progressDesc: "የ 3D ህትመት እና የማሽን ቴክኖሎጂዎችን በመጠቀም የአገር ውስጥ ማምረት ጀምረናል። ለውሃ ቴክኒሻኖች የስልጠና ፕሮግራሞችን እናካሂዳለን። እንዲሁም በተለያዩ ዘርፎች ሽርክናዎችን እየገነባን ነው። ይህ የአካባቢያዊ የመመርመሪያ ስነ-ምህዳር ጅማሮ ነው።",

    collabTitle: "የትብብር ግብዣ",
    collabDesc: "በምርምር፣ በማስፋፋት እና በተግባራዊ ስራዎች ላይ ለትብብር ክፍት ነን። ይህ መድረክ በአካባቢ ማይክሮባዮሎጂ፣ በፀረ-ተህዋሲያን መቋቋም (AMR) ክትትል፣ በ AI በሽታ አምጪ ተህዋስያን መለየት እና በተግባራዊ ሳይንስ ላይ ስራዎችን ያስችላል። የካናዳ-አፍሪካ አካዳሚክ ትብብርን እንጋብዛለን — የጋራ እርዳታዎች፣ የተማሪዎች የጋራ ቁጥጥር፣ የፓይለት ፕሮግራሞች እና የክልላዊ ማስፋፊያ ስልቶች። የውሃ ክትትል ፍትሃዊ፣ የትብብር እና በአገር ውስጥ የዳበረ መሆን አለበት።",
    collab1Title: "ማስፋፋት እና ማሰማራት",
    collab1Desc: "በፓይለት ፕሮግራሞች፣ በክልላዊ ስርጭት እና ከነባር የውሃ ጥራት ክትትል ስርዓቶች ጋር በማቀናጀት ላይ አብሮ መስራት።",
    collab2Title: "ሽርክና በአፍሪካ",
    collab2Desc: "በውሃ ምርመራ ስራዎች ላይ በንቃት ከተሰማሩ የአፍሪካ አገራት ድርጅቶች ጋር ለመተባበር ፍላጎት አለን።",

    ctaTitle: "ያግኙን",
    ctaDesc: "የውሃ ጥራት ክትትል ከውጭ በሚገቡ ላብራቶሪዎች ላይ ብቻ ጥገኛ መሆን የለበትም። ወጣት አፍሪካውያን መሐንዲሶች ሊሰፉ የሚችሉ፣ የተረጋገጡ፣ በምርምር የተደገፉ መፍትሄዎችን መገንባት ይችላሉ። በፍትሃዊ የአካዳሚክ ትብብር በመላው አፍሪካ የውሃ ደህንነት ክትትልን መለወጥ እንችላለን።",
    ctaBtn1: "ቡድናችንን ያነጋግሩ",
    ctaBtn2: "ስራችንን ይመልከቱ"
  },

  om: {
    // waterscope.org Cambridge Heritage
    cambridgeBadge: "Dhaala Yuunivarsiitii Keembiriij",
    cambridgeTitle: "Madda Addunyaa fi Hundeeffama Saayinsawaa",
    cambridgeDesc: "Bara 2015 kan hundeeffame WaterScope Yuunivarsiitii Keembiriij keessatti dhaabbata hawaasummaa jalqabamedha. Gareen hundeeffamaa baayoloojistoota, fiizisistoota fi injinaroota sirna WaterScope biyyoota galii gadi aanaa fi giddu galeessaa qabaniif dizaayinii godhan irraa ijaarame.",
    cambridgeFunding: "Deeggarsa Paawundii £900,000+",
    cambridgeFundingDesc: "Deeggarsa qorannoo paawundii kuma 900 ol walitti qabuudhaan mirkaneessa saayinsawaa fi qorannoo dirree addunyaa dandeessiseera.",
    founder1Name: "Dr. Alexander Patto",
    founder1Role: "Hogganaa Ol'aanaa fi Walitti Qabaa (WaterScope UK)",
    founder1Bio: "PhD Jiineetiksii, Royal Academy of Engineering Fellow, Yuunivarsiitii Keembiriij.",
    founder2Name: "Sammy Mahdi",
    founder2Role: "Hogganaa Hojii fi Walitti Qabaa (WaterScope UK)",
    founder2Bio: "MRes + PhD Teeknooloojii Seensarii, Institute for Manufacturing, Yuunivarsiitii Keembiriij.",
    founder3Name: "Dr. Richard Bowman",
    founder3Role: "Walitti Qabaa fi Ogeessa Optikaalaa",
    founder3Bio: "Yuunivarsiitii Keembiriij / Baaz. Kalaqaa maayikirooskooppii dijitaalaa 3D OpenFlexure.",

    headerBadge: "Dandeettii Biyya Keessaa Ijaaruu",
    headerTitle: "Garee Keenya Kan Murannoo Qabu",
    headerDesc: "Nuti garee injinaroota Itoophiyaa dargaggoota qorannoo bishaan biyya keessaa fooyyessuu fi hawaasa fi dhaabbilee barnootaa wajjin walta'uudhaan kalaqa guddisuu irratti xiyyeeffanneedha. Haa ta'u malee teeknooloojii qofti gahaa miti. Hojiin keenya meeshaalee fiduu qofa irratti utuu hin taane dandeettii teeknikaa biyya keessaa ijaaruu irratti kan xiyyeeffateedha. Hawaasa, qooda fudhattoota mootummaa fi yuunivarsiitota — Yuunivarsiitii Baahir Daar dabalatee waliin hojjanna. Kaayyoon keenya dandeettiin qorannoo biyya keessatti akka ijaaramu, akka itti fufu fi akka babal'atu gochuudha. Kalaqni Afrikaan durfamu moodeela keenyaaf giddu galeessa.",

    missionBadge: "Rakkoo Fayyaa Hawaasaa",
    missionTitle: "Dhaqqabamummaan bishaanii yeroo baay'ee bu'uura misoomaa wajjin ka'a — garuu to'annoonis walqixa barbaachisaadha.",
    missionP1: "Addunyaa irratti namoonni biliyoona 2.2 bishaan dhugaatii qulqulluu hin argatan; kunis rakkoolee fayyaatiif sababa ta'uun furmaata bishaanii itti fufiinsa qabuuf barbaachisummaa agarsiisa. Itoophiyaa keessatti dhibeewwan daddarboo keessaa dhibbeentaan 60–80 bishaan, qulqullina fi saaniiteeshinii gahaa hin taaneen kan walqabataniidha; garaa kaasaan waggaatti du'a daa'imman waggaa shanii gadii tilmaamaan 25,000tiif sababa ta'a, kunis sababa du'a daa'immanii isa sadaffaa isa taasisa.",
    missionP2: "Rakkoon dhaqqabamummaa bishaanii qofa miti — sirna to'annoo amansiisaa fi babal'achuu danda'u dhabuudha. Wanti adda nu taasisu meeshaa qofa miti — moodeela kalaqa sirnaati. Kun qorannoo bishaanii hirkattummaa alaarraa gara dandeettii naannootti jijjiira.",

    pillar1Title: "Gatii Hir'isuu (Cost Reduction)",
    pillar1Desc: "Biyya keessatti oomishuun gatii hamma 80% hir'isa; kunis qorannoo bishaanii hawaasa barbaadaniif dhaqqabamaa taasisa.",
    pillar2Title: "Dandeettii Ijaaruu (Capacity Building)",
    pillar2Desc: "Adeemsi keenya dandeettii teeknikaa fi qorannoo biyya keessaa ijaara; hawaasni furmaata qulqullina bishaan isaanii akka to'atan humna kenna.",
    pillar3Title: "Of Dandeessuu (Self-Reliance)",
    pillar3Desc: "Dandeettii biyya keessaa cimsuun hawaasni qabeenya bishaan isaanii yeroo dheeraaf akka bulchan mirkaneessa, hirkattummaa meeshaalee biyya alaarraa hir'isa.",
    pillar4Title: "Carraa Hojii (Job Opportunities)",
    pillar4Desc: "Hojiiwwan oomishaa biyya keessatti uumuun namoota humneessa akkasumas guddina diinagdee naannolee hanqinni bishaanii jiran keessatti dammaqsa.",

    progressTitle: "Guddina Jalqabaa: Oomisha fi Leenjii",
    progressDesc: "Teeknooloojii Maxxansa 3D fi maashinoota fayyadamuun oomisha biyya keessaa jalqabneerra. Ogeessota bishaaniif sagantaalee leenjii ni gaggeessina. Akkasumas dameewwan hedduu keessatti michummaa ijaaraa jirra. Kun jalqaba ikkoosistamii qorannoo naannooti.",

    collabTitle: "Afeerraa Walta'iinsaa",
    collabDesc: "Qorannoo, babal'isuu fi hojiirra oolchuu irratti walta'iinsaaf banaadha. Platformiin kun maayikiroobaayoloojii naannoo, to'annoo dandamanna qorichaa (AMR), beekumsa baakteeriyaa AI fi saayinsii hojiirra oolmaa keessatti hojii dandeessisa. Walta'iinsa barnootaa Kaanaadaa–Afrikaa afeerra — deeggarsa waloo, hordoffii barattootaa waloo, sagantaalee paayileetii fi tarsiimoo babal'isuu naannoo. To'annoon bishaanii haqa qabeessa, gamtaa fi naannootti humneeffame ta'uu qaba.",
    collab1Title: "Babal'isuu fi Hojiirra Oolchuu",
    collab1Desc: "Sagantaalee paayileetii, tamsaasa naannoo fi sirna to'annoo qulqullina bishaanii jiran wajjin qindeessuu irratti michoomuu.",
    collab2Title: "Michummaa Afrikaa Keessatti",
    collab2Desc: "Dhaabbilee biyyoota Afrikaa keessatti dhimma qorannoo bishaanii irratti hojjetan wajjin walta'uuf fedhii qabna.",

    ctaTitle: "Nu Qunnamaa",
    ctaDesc: "To'annoon qulqullina bishaanii laabiraatoorii alaarraa dhufu qofa irratti hirkachuu hin qabu. Injinaroonni dargaggoonni Afrikaa furmaata qorannoon deeggaramee fi babal'achuu danda'u ijaaruu danda'u. Walta'iinsa barnootaa haqa qabeessaan to'annoo nageenya bishaanii Afrikaa keessatti jijjiiruu dandeenya.",
    ctaBtn1: "Garee Keenya Qunnamaa",
    ctaBtn2: "Hojii Keenya Qoradhaa"
  }
};

export const aboutContent: Record<Language, AboutPageContent> = {
  en: data.en,
  am: data.am,
  om: data.om,
  ti: data.am,
};
