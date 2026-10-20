import { Language } from '../i18n/types';

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
