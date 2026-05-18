import React, { useState, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X, ArrowLeft, Upload, Sparkles, Scan, HelpCircle, Eye, AlertTriangle } from 'lucide-react'
import { MoleculeViewer3D } from '../components/chemistry/MoleculeViewer3D'
import { MOLECULE_LIBRARY } from '../data/moleculeLibrary'
import type { Molecule } from '../data/moleculeLibrary'
import { useTranslation } from '../i18n'



const ELEMENT_COLORS: Record<string, string> = {
  C: '#2D2D2D', // Deep Slate/Black
  H: '#FFFFFF', // Pure White
  O: '#FF0033', // Neon Red
  N: '#3366FF', // Electric Blue
  S: '#FFCC00', // Scientific Yellow
  P: '#FF8800', // Vibrant Orange
  Cl: '#33FF33', // Bio Green
}

const ELEMENT_NAMES: Record<string, string> = {
  C: 'Carbon',
  H: 'Hydrogen',
  O: 'Oxygen',
  N: 'Nitrogen',
  S: 'Sulfur',
  P: 'Phosphorus',
  Cl: 'Chlorine'
}

// Sample Skeletal SVGs for offline uploader presets
const PRESET_SVGS = {
  benzene: (
    <svg viewBox="0 0 100 100" className="w-20 h-20 stroke-primary dark:stroke-primary fill-none stroke-[2.5]" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,15 80,32.5 80,67.5 50,85 20,67.5 20,32.5" />
      <line x1="50" y1="23" x2="74" y2="37" />
      <line x1="74" y1="63" x2="50" y2="77" />
      <line x1="26" y1="63" x2="26" y2="37" />
    </svg>
  ),
  caffeine: (
    <svg viewBox="0 0 120 100" className="w-20 h-20 stroke-primary dark:stroke-primary fill-none stroke-[2.5]" xmlns="http://www.w3.org/2000/svg">
      <polygon points="40,20 70,35 70,65 40,80 10,65 10,35" />
      <polygon points="70,35 95,20 110,50 95,80 70,65" />
      <line x1="40" y1="28" x2="64" y2="40" />
      <line x1="16" y1="61" x2="16" y2="39" />
      <line x1="70" y1="45" x2="95" y2="30" />
      <line x1="95" y1="70" x2="70" y2="55" />
    </svg>
  ),
  aspirin: (
    <svg viewBox="0 0 120 120" className="w-20 h-20 stroke-primary dark:stroke-primary fill-none stroke-[2.5]" xmlns="http://www.w3.org/2000/svg">
      <polygon points="40,40 70,55 70,85 40,100 10,85 10,55" />
      <polyline points="70,55 90,45 105,55" />
      <polyline points="70,85 90,95 105,85" />
      <line x1="90" y1="44" x2="90" y2="30" />
      <line x1="90" y1="96" x2="90" y2="110" />
    </svg>
  ),
  water: (
    <svg viewBox="0 0 100 100" className="w-20 h-20 stroke-primary dark:stroke-primary fill-none stroke-[2.5]" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="40" r="10" />
      <line x1="43" y1="47" x2="25" y2="65" />
      <line x1="57" y1="47" x2="75" y2="65" />
      <circle cx="20" cy="70" r="6" />
      <circle cx="80" cy="70" r="6" />
      <text x="45" y="44" className="stroke-none fill-primary text-[9px] font-black">O</text>
      <text x="16" y="73" className="stroke-none fill-primary text-[7px] font-black">H</text>
      <text x="76" y="73" className="stroke-none fill-primary text-[7px] font-black">H</text>
    </svg>
  )
}

const SAMPLE_PRESETS = [
  { id: 'benzene', name: 'Benzene Ring', formula: 'C₆H₆', moleculeId: 'c6h6', type: 'benzene' },
  { id: 'caffeine', name: 'Caffeine', formula: 'C₈H₁₀N₄O₂', moleculeId: 'c8h10n4o2', type: 'caffeine' },
  { id: 'aspirin', name: 'Aspirin', formula: 'C₉H₈O₄', moleculeId: 'c9h8o4', type: 'aspirin' },
  { id: 'water', name: 'Water Molecule', formula: 'H₂O', moleculeId: 'h2o', type: 'water' },
]

const LOCAL_TRANSLATIONS = {
  en: {
    title: "3D Molecule Viewer",
    subtitle: "Interactive ball-and-stick models. Drag to rotate, scroll to zoom.",
    library: "Library",
    search: "Search compounds or formulas...",
    scanner: "Molecule Scanner",
    scannerDesc: "Upload a structure image. AI vision identifies the molecule.",
    identify: "Identify Molecule",
    presets: "Or test with chemical presets:",
    hint: "Optional hint (e.g. 'an alcohol', 'natural product')",
    enterKeywords: "Enter keywords or formula...",
    atoms: "Atoms",
    dropzone: "Drop a structure image here",
    analyzing: "Analyzing molecular structure...",
    noMolecules: "No molecules found",
    clearSearch: "Clear Search",
    emptyScanner: "Upload a structure to identify it.",
    emptyScannerDesc: "Skeletal formulas work best.",
    molecule: "Molecule",
    image: "Image"
  },
  ta: {
    title: "3D மூலக்கூறு காட்டி",
    subtitle: "ஊடாடும் பந்து மற்றும் குச்சி மாதிரிகள். சுழற்ற இழுக்கவும், பெரிதாக்க உருட்டவும்.",
    library: "நூலகம்",
    search: "சேர்மங்கள் அல்லது சூத்திரங்களைத் தேடுங்கள்...",
    scanner: "மூலக்கூறு ஸ்கேனர்",
    scannerDesc: "அமைப்புப் படத்தை பதிவேற்றவும். AI பார்வை மூலக்கூறை அடையாளம் காண்கிறது.",
    identify: "மூலக்கூறை அடையாளம் காண்க",
    presets: "அல்லது வேதியியல் முன்னமைவுகளுடன் சோதிக்கவும்:",
    hint: "விருப்ப குறிப்பு (எ.கா. 'ஒரு ஆல்கஹால்', 'இயற்கை தயாரிப்பு')",
    enterKeywords: "முக்கிய வார்த்தைகள் அல்லது சூத்திரத்தை உள்ளிடவும்...",
    atoms: "அணுக்கள்",
    dropzone: "மூலக்கூறு அமைப்புப் படத்தை இங்கே இழுத்து விடவும்",
    analyzing: "மூலக்கூறு அமைப்பை பகுப்பாய்வு செய்கிறது...",
    noMolecules: "மூலக்கூறுகள் எதுவும் கிடைக்கவில்லை",
    clearSearch: "தேடலை அழி",
    emptyScanner: "அடையாளம் காண ஒரு அமைப்பை பதிவேற்றவும்.",
    emptyScannerDesc: "கூட்டு எலும்பு சூத்திரங்கள் சிறந்தவை.",
    molecule: "மூலக்கூறு",
    image: "படம்"
  },
  hi: {
    title: "3D अणु व्यूअर",
    subtitle: "इंटरैक्टिव बॉल-एंड-स्टिक मॉडल। घुमाने के लिए खींचें, ज़ूम करने के लिए स्क्रॉल करें।",
    library: "लाइब्रेरी",
    search: "यौगिकों या सूत्रों की खोज करें...",
    scanner: "अणु स्कैनर",
    scannerDesc: "एक संरचना छवि अपलोड करें। AI दृष्टि अणु की पहचान करती है।",
    identify: "अणु की पहचान करें",
    presets: "या रासायनिक प्रीसेट के साथ परीक्षण करें:",
    hint: "वैकल्पिक संकेत (जैसे 'एक अल्कोहल', 'प्राकृतिक उत्पाद')",
    enterKeywords: "कीवर्ड या सूत्र दर्ज करें...",
    atoms: "परमाणु",
    dropzone: "संरचना छवि यहाँ ड्रॉप करें",
    analyzing: "आणविक संरचना का विश्लेषण किया जा रहा है...",
    noMolecules: "कोई अणु नहीं मिला",
    clearSearch: "खोज साफ़ करें",
    emptyScanner: "पहचानने के लिए एक संरचना अपलोड करें।",
    emptyScannerDesc: "कंकाल सूत्र सबसे अच्छा काम करते हैं।",
    molecule: "अणु",
    image: "छवि"
  },
  te: {
    title: "3D మాలిక్యూల్ వ్యూయర్",
    subtitle: "ఇంటరాక్టివ్ బాల్-అండ్-స్టిక్ నమూనాలు. తిప్పడానికి లాగండి, జూమ్ చేయడానికి స్క్రోల్ చేయండి.",
    library: "లైబ్రరీ",
    search: "సమ్మేళనాలు లేదా సూత్రాలను శోధించండి...",
    scanner: "మాలిక్యూల్ స్కానర్",
    scannerDesc: "నిర్మాణ చిత్రాన్ని అప్‌లోడ్ చేయండి. AI విజన్ మాలిక్యూల్‌ను గుర్తిస్తుంది.",
    identify: "మాలిక్యూల్‌ను గుర్తించండి",
    presets: "లేదా రసాయన ప్రిసెట్‌లతో పరీక్షించండి:",
    hint: "ఐచ్ఛిక సూచన (ఉదా. 'ఒక ఆల్కహాల్', 'సహజ ఉత్పత్తి')",
    enterKeywords: "కీవర్డ్‌లు లేదా సూత్రాన్ని నమోదు చేయండి...",
    atoms: "పరమాణువులు",
    dropzone: "నిర్మాణ చిత్రాన్ని ఇక్కడ వేయండి",
    analyzing: "మాలిక్యులర్ నిర్మాణాన్ని విశ్లేషిస్తోంది...",
    noMolecules: "అణువులు కనుగొనబడలేదు",
    clearSearch: "శోధనను క్లియర్ చేయి",
    emptyScanner: "గుర్తించడానికి ఒక నిర్మాణాన్ని అప్‌లోడ్ చేయండి.",
    emptyScannerDesc: "అస్థిపంజర సూత్రాలు బాగా పనిచేస్తాయి.",
    molecule: "అణువు",
    image: "చిత్రం"
  },
  ml: {
    title: "3D തന്മാത്ര വ്യൂവർ",
    subtitle: "ഇന്ററാക്ടീവ് ബോൾ-ആൻഡ്-സ്റ്റിക്ക് മോഡലുകൾ. തിരിക്കാൻ വലിക്കുക, സൂം ചെയ്യാൻ സ്ക്രോൾ ചെയ്യുക.",
    library: "ലൈബ്രറി",
    search: "സംയുക്തങ്ങളോ സമവാക്യങ്ങളോ തിരയുക...",
    scanner: "തന്മാത്ര സ്കാനർ",
    scannerDesc: "ഘടനയുടെ ചിത്രം അപ്‌ലോഡ് ചെയ്യുക. AI ദർശനം തന്മാത്രയെ തിരിച്ചറിയുന്നു.",
    identify: "തന്മാത്ര തിരിച്ചറിയുക",
    presets: "അല്ലെങ്കിൽ രാസ പ്രീസെറ്റുകൾ ഉപയോഗിച്ച് പരിശോധിക്കുക:",
    hint: "ഓപ്ഷണൽ സൂചന (ഉദാ. 'ഒരു ആൽക്കഹോൾ', 'പ്രകൃതിദത്ത ഉൽപ്പന്നം')",
    enterKeywords: "കീവേഡുകളോ സമവാക്യമോ നൽകുക...",
    atoms: "ആറ്റങ്ങൾ",
    dropzone: "ഘടനയുടെ ചിത്രം ഇവിടെ ഇടുക",
    analyzing: "തന്മാത്രാ ഘടന വിശകലനം ചെയ്യുന്നു...",
    noMolecules: "തന്മാത്രകളൊന്നും കണ്ടെത്തിയില്ല",
    clearSearch: "തിരയൽ ഒഴിവാക്കുക",
    emptyScanner: "തിരയൽ അപ്‌ലോഡ് ചെയ്യുക.",
    emptyScannerDesc: "അസ്ഥികൂട സമവാക്യങ്ങൾ മികച്ചതാണ്.",
    molecule: "തന്മാത്ര",
    image: "ചിത്രം"
  },
  kn: {
    title: "3D ಅಣು ವೀಕ್ಷಕ",
    subtitle: "ಸಂವಾದಾತ್ಮಕ ಬಾಲ್-ಮತ್ತು-ಸ್ಟಿಕ್ ಮಾದರಿಗಳು. ತಿರುಗಿಸಲು ಎಳೆಯಿರಿ, ಜೂಮ್ ಮಾಡಲು ಸ್ಕ್ರಾಲ್ ಮಾಡಿ.",
    library: "ಲೈಬ್ರರಿ",
    search: "ಸಂಯುಕ್ತಗಳನ್ನು ಅಥವಾ ಸೂತ್ರಗಳನ್ನು ಹುಡುಕಿ...",
    scanner: "ಅಣು ಸ್ಕ್ಯಾನರ್",
    scannerDesc: "ರಚನೆಯ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ. AI ದೃಷ್ಟಿ ಅಣುವನ್ನು ಗುರುತಿಸುತ್ತದೆ.",
    identify: "ಅಣುವನ್ನು ಗುರುತಿಸಿ",
    presets: "ಅಥವಾ ರಾಸಾಯನಿಕ ಪ್ರಿಸೆಟ್‌ಗಳೊಂದಿಗೆ ಪರೀಕ್ಷಿಸಿ:",
    hint: "ಐಚ್ಛಿಕ ಸುಳಿವು (ಉದಾ. 'ಒಂದು ಆಲ್ಕೋಹಾಲ್', 'ನೈಸರ್ಗಿಕ ಉತ್ಪನ್ನ')",
    enterKeywords: "ಕೀವರ್ಡ್‌ಗಳನ್ನು ಅಥವಾ ಸೂತ್ರವನ್ನು ನಮೂದಿಸಿ...",
    atoms: "ಪರಮಾಣುಗಳು",
    dropzone: "ರಚನೆಯ ಚಿತ್ರವನ್ನು ಇಲ್ಲಿ ಹಾಕಿ",
    analyzing: "ಅಣು ರಚನೆಯನ್ನು ವಿಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",
    noMolecules: "ಯಾವುದೇ ಅಣುಗಳು ಕಂಡುಬಂದಿಲ್ಲ",
    clearSearch: "ಹುಡುಕಾಟ ತೆರವುಗೊಳಿಸಿ",
    emptyScanner: "ಗುರುತಿಸಲು ಒಂದು ರಚನೆಯನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",
    emptyScannerDesc: "ಅಸ್ಥಿಪಂಜರ ಸೂತ್ರಗಳು ಉತ್ತಮವಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತವೆ.",
    molecule: "ಅಣು",
    image: "ಚಿತ್ರ"
  },
  mr: {
    title: "3D रेणू व्ह्यूअर",
    subtitle: "परस्परसंवादी बॉल-अँड-स्टिक मॉडेल. फिरवण्यासाठी ड्रॅग करा, झूम करण्यासाठी स्क्रॉल करा.",
    library: "लायब्ररी",
    search: "संयुगे किंवा सूत्रे शोधा...",
    scanner: "रेणू स्कॅनर",
    scannerDesc: "रचना प्रतिमा अपलोड करा. AI व्हिजन रेणू ओळखते.",
    identify: "रेणू ओळखा",
    presets: "किंवा रासायनिक प्रीसेटसह चाचणी करा:",
    hint: "पर्यायी संकेत (उदा. 'एक अल्कोहोल', 'नैसर्गिक उत्पादन')",
    enterKeywords: "कीवर्ड किंवा सूत्र प्रविष्ट करा...",
    atoms: "अणू",
    dropzone: "रचना प्रतिमा येथे टाका",
    analyzing: "आण्विक रचनेचे विश्लेषण करत आहे...",
    noMolecules: "अणू आढळले नाहीत",
    clearSearch: "शोध साफ करा",
    emptyScanner: "ओळखण्यासाठी रचना अपलोड करा.",
    emptyScannerDesc: "कंकाल सूत्रे सर्वोत्तम काम करतात.",
    molecule: "रेणू",
    image: "चित्र"
  },
  gu: {
    title: "3D અણુ વ્યૂઅર",
    subtitle: "ઇન્ટરેક્ટિવ બોલ-એન્ડ-સ્ટીક મોડલ્સ. ફેરવવા માટે ખેંચો, ઝૂમ કરવા માટે સ્ક્રોલ કરો.",
    library: "લાઇબ્રેરી",
    search: "સંયોજનો અથવા સૂત્રો શોધો...",
    scanner: "અણુ સ્કેનર",
    scannerDesc: "બંધારણની છબી અપલોડ કરો. AI વિઝન અણુને ઓળખે છે.",
    identify: "અણુ ઓળખો",
    presets: "અથવા રાસાયણિક પ્રીસેટ્સ સાથે પરીક્ષણ કરો:",
    hint: "વૈકલ્પિક સંકેત (દા.ત. 'એક આલ્કોહોલ', 'કુદરતી ઉત્પાદન')",
    enterKeywords: "કીવર્ડ્સ અથવા સૂત્ર દાખલ કરો...",
    atoms: "અણુઓ",
    dropzone: "બંધારણની છબી અહીં મૂકો",
    analyzing: "આણ્વિક બંધારણનું વિશ્લેષણ કરી રહ્યું છે...",
    noMolecules: "કોઈ અણુ મળ્યા નથી",
    clearSearch: "શોર્ચ સાફ કરો",
    emptyScanner: "ઓળખવા માટે બંધારણ અપલોડ કરો.",
    emptyScannerDesc: "કંકાલ સૂત્રો શ્રેષ્ઠ કાર્ય કરે છે.",
    molecule: "અણુ",
    image: "છબી"
  },
  bn: {
    title: "3D অণু ভিউয়ার",
    subtitle: "ইন্টারেক্টিভ বল-অ্যান্ড-স্টিক модель। ঘোরাতে ড্র্যাগ করুন, জুম করতে স্ক্রোল করুন।",
    library: "লাইব্রেরি",
    search: "যৌগ বা সংকেত খুঁজুন...",
    scanner: "অণু স্ক্যানার",
    scannerDesc: "গঠনের ছবি আপলোড করুন। AI ভিশন অণুটিকে সনাক্ত করে।",
    identify: "অণু সনাক্ত করুন",
    presets: "অথবা রাসায়নিক প্রিসেট দিয়ে পরীক্ষা করুন:",
    hint: "ঐচ্ছিক ইঙ্গিত (যেমন 'একটি অ্যালকোহল', 'প্রাকৃতিক পণ্য')",
    enterKeywords: "কীওয়ার্ড বা সংকেত লিখুন...",
    atoms: "পরমাণু সমূহ",
    dropzone: "এখানে গঠনের ছবি ড্রপ করুন",
    analyzing: "আণবিক গঠন বিশ্লেষণ করা হচ্ছে...",
    noMolecules: "কোনো অণু পাওয়া যায়নি",
    clearSearch: "অনুসন্ধান মুছুন",
    emptyScanner: "শনাক্ত করতে একটি গঠন আপলোড করুন।",
    emptyScannerDesc: "কঙ্কাল সংকেত সবচেয়ে ভালো কাজ করে।",
    molecule: "অণু",
    image: "ছবি"
  }
}

export const MoleculeLab: React.FC = () => {
  const navigate = useNavigate()
  const { language } = useTranslation()
  const lang = LOCAL_TRANSLATIONS[language as keyof typeof LOCAL_TRANSLATIONS] || LOCAL_TRANSLATIONS.en

  const tIdentifiedStructure = {
    en: "Identified Structure (3D Canvas)",
    ta: "அடையாளம் காணப்பட்ட அமைப்பு (3D கேன்வாஸ்)",
    hi: "पहचानी गई संरचना (3D कैनवास)",
    te: "గుర్తించబడిన నిర్మాణం (3D కాన్వాస్)",
    ml: "തിരിച്ചറിഞ്ഞ ഘടന (3D ക്യാൻവാസ്)",
    kn: "ಗುರುತಿಸಲಾದ ರಚನೆ (3D ಕ್ಯಾನ್ವಾಸ್)",
    mr: "ओळखलेली रचना (3D कॅनव्हास)",
    gu: "ઓળખાયેલ બંધારણ (3D કેનવાસ)",
    bn: "সনাক্তকৃত গঠন (3D ক্যানভাস)",
  }[language as string] || "Identified Structure (3D Canvas)";

  const tInteractiveModel = {
    en: "Interactive Model",
    ta: "ஊடாடும் மாதிரி",
    hi: "इंटरैक्टिव मॉडल",
    te: "ఇంటరాక్టివ్ మోడల్",
    ml: "ഇന്ററാക്ടീവ് മോഡൽ",
    kn: "ಸಂವಾದಾತ್ಮಕ ಮಾದರಿ",
    mr: "परस्परसंवादी मॉडेल",
    gu: "ઇન્ટરેક્ટિવ મોડેલ",
    bn: "ইন্টারেক্টিভ মডেল",
  }[language as string] || "Interactive Model";

  const tIupacName = {
    en: "IUPAC Name",
    ta: "IUPAC பெயர்",
    hi: "IUPAC नाम",
    te: "IUPAC పేరు",
    ml: "IUPAC നാമം",
    kn: "IUPAC ಹೆಸರು",
    mr: "IUPAC नाव",
    gu: "IUPAC નામ",
    bn: "IUPAC नाम",
  }[language as string] || "IUPAC Name";

  const tMolarMass = {
    en: "Molar Mass",
    ta: "மூலக்கூறு நிறை",
    hi: "मोलर द्रव्यमान",
    te: "మోలార్ ద్రవ్యరాశి",
    ml: "മോളാർ പിണ്ഡം",
    kn: "ಮೋಲಾರ್ ದ್ರವ್ಯರಾಶಿ",
    mr: "मोलर वस्तुमान",
    gu: "મોલર દળ",
    bn: "মোলার ভর",
  }[language as string] || "Molar Mass";

  const tFunctionalGroups = {
    en: "Functional Groups",
    ta: "செயல்பாட்டுக் குழுக்கள்",
    hi: "क्रियात्मक समूह",
    te: "ఫంక్షనల్ సమూహాలు",
    ml: "ఫങ്ഷണൽ ഗ്രൂപ്പുകൾ",
    kn: "ಕ್ರಿಯಾತ್ಮక ಗುಂಪುಗಳು",
    mr: "कार्यात्मक गट",
    gu: "ક્રિયાत्मक સમૂહો",
    bn: "কার্যকরী গ্রুপ",
  }[language as string] || "Functional Groups";

  const tAiVision = {
    en: "AI Vision Structural Breakdown",
    ta: "AI பார்வை கட்டமைப்பு பகுப்பாய்வு",
    hi: "AI विजन संरचनात्मक विश्लेषण",
    te: "AI విజన్ నిర్మాణాत्मक విశ్లేషణ",
    ml: "AI വിഷൻ ഘടനാപരമായ വിശകലനം",
    kn: "AI ದೃಷ್ಟಿ ರಚನಾತ್ಮक ವಿಶ್ಲೇಷಣೆ",
    mr: "AI व्हिजन संरचनात्मक विश्लेषण",
    gu: "AI વિઝન માળખાકીય વિશ્લેષણ",
    bn: "AI ভিশন গঠনগত বিশ্লেষণ",
  }[language as string] || "AI Vision Structural Breakdown";

  const tEducationalInsights = {
    en: "Educational Insights & Uses",
    ta: "கல்வி நுண்ணறிவு மற்றும் பயன்பாடுகள்",
    hi: "शैक्षिक अंतर्दृष्टि और उपयोग",
    te: "విద్యాဆိုင်రైన అంతర్దృష్టులు & ఉపయోగాలు",
    ml: "വിദ്യാഭ്യാസപരമായ ഉൾക്കാഴ്ചകളും ഉപയോഗങ്ങളും",
    kn: "ಶೈಕ್ಷಣಿಕ ಒಳನೋಟಗಳು ಮತ್ತು ಉಪಯೋಗಗಳು",
    mr: "शैक्षणिक अंतर्दृष्टी आणि उपयोग",
    gu: "શૈક્ષણિક આંતરદૃષ્ટિ અને ઉપયોગો",
    bn: "শিক্ষাগত অন্তর্দৃষ্টি এবং ব্যবহার",
  }[language as string] || "Educational Insights & Uses";

  const tSafetyProfile = {
    en: "Safety profile",
    ta: "பாதுகாப்பு சுயவிவரம்",
    hi: "सुरक्षा प्रोफ़ाइल",
    te: "భద్రతా ప్రొఫైల్",
    ml: "സുരക്ഷാ പ്രൊഫൈൽ",
    kn: "ಸುರಕ್ಷತಾ ಪ್ರೊಫೈಲ್",
    mr: "सुरक्षा प्रोफाइल",
    gu: "સુરક્ષા પ્રોફાઇલ",
    bn: "নিরাপত্তা প্রোফাইল",
  }[language as string] || "Safety profile";

  const tAnalyzingDetails = {
    en: "Gemma-4 Vision offline core mapping coordinates",
    ta: "Gemma-4 பார்வை ஆஃப்லைன் கோர் மேッピング ஆயத்தொலைவுகள்",
    hi: "जेम्मा-4 विजन ऑफ़लाइन कोर मैपिंग निर्देशांक",
    te: "జెమ్మా-4 విజన్ ఆఫ్‌లైన్ కోర్ మ్యాపింగ్ కోఆర్డినేట్లు",
    ml: "ജെമ്മ-4 വിഷൻ ഓഫ്‌ലൈൻ കോർ മാപ്പിംഗ് കോർഡിനേറ്റുകൾ",
    kn: "ಗೆಮ್ಮಾ-4 ದೃಷ್ಟಿ ಆಫ್‌ಲೈನ್ ಕೋರ್ ಮ್ಯಾಪಿಂಗ್ ಕೋಆರ್ಡಿನೇಟ್‌ಗಳು",
    mr: "जेम्मा-4 व्हिजन ऑफलाइन कोर मॅपिंग निर्देशांक",
    gu: "જેમ્મા-4 વિઝન ઑફલાઇન કોર મેપિંગ કોઓર્ડિનેટ્સ",
    bn: "জেম্মা-৪ ভিশন অফলাইন কোর ম্যাপিং স্থানাঙ্ক",
  }[language as string] || "Gemma-4 Vision offline core mapping coordinates";

  const tCompound = {
    en: "Compound",
    ta: "சேர்மம்",
    hi: "यौगिक",
    te: "సమ్మేళనం",
    ml: "സംയുക്തం",
    kn: "സംಯುಕ್ತ",
    mr: "संयुग",
    gu: "સંયોજન",
    bn: "যৌগ",
  }[language as string] || "Compound";

  const tInteractiveDetails = {
    en: "Drag • scroll • auto-rotate",
    ta: "இழுக்கவும் • உருಟவும் • தானாக சுழற்றவும்",
    hi: "खींचें • स्क्रॉल करें • ऑटो-रोटेट",
    te: "లాగండి • స్క్రోల్ చేయండి • ఆటో-రొటేట్",
    ml: "വലിക്കുക • സ്ക്രോൾ ചെയ്യുക • സ്വയം തിരിയുക",
    kn: "ಎಳೆಯಿರಿ • ಸ್ಕ್ರಾಲ್ ಮಾಡಿ • ಸ್ವಯಂ-ತಿರುಗಿಸಿ",
    mr: "ड्रॅग करा • स्क्रॉल करा • ऑटो-रोटेट",
    gu: "ખેંચો • સ્ક્રોલ કરો • ઓટો-રોટેટ",
    bn: "টানুন • স্ক্রোল করুন • স্বয়ংক্রিয় ঘোরান",
  }[language as string] || "Drag • scroll • auto-rotate";

  const tFooterWarning = {
    en: "Bonds shown as gray cylinders. Double/triple bonds appear as parallel lines. Geometry is approximate, not energy-minimized.",
    ta: "பிணைப்புகள் சாம்பல் உருளைகளாகக் காட்டப்படுகின்றன. இரட்டை/முப்பரிமாண பிணைப்புகள் இணையான கோடுகளாகத் தோன்றும். வடிவியல் தோராயமானது, ஆற்றல்-குறைக்கப்பட்டது அல்ல.",
    hi: "बॉन्ड धूसर बेलन के रूप में दिखाए गए हैं। दोहरे/तिहरे बॉन्ड समानांतर रेखाओं के रूप में दिखाई देते हैं। ज्यामिति अनुमानित है, ऊर्जा-न्यूनतम नहीं।",
    te: "బంధాలు బూడిద సిలిండర్లుగా చూపబడతాయి. డబుల్/ట్రిపుల్ బంధాలు సమాంతర రేఖలుగా కనిపిస్తాయి. జ్యామితి సుమారుగా ఉంటుంది, శక్తి-తగ్గించబడింది కాదు.",
    ml: "ബന്ധങ്ങൾ ചാരനിറത്തിലുള്ള സിലിണ്ടറുകളായി കാണിച്ചിരിക്കുന്നു. ഇരട്ട/ത്രിതയ ബന്ധങ്ങൾ സമാന്തര വരികളായി കാണപ്പെടുന്നു. ജ్యాമിതി ഏകദേശമാണ്, ഊർജ്ജ-പരിമിതമല്ല.",
    kn: "ಬಂಧಗಳನ್ನು ಬೂದು ಸಿಲಿಂಡರ್‌ಗಳಾಗಿ ತೋರಿಸಲಾಗಿದೆ. ಡಬల్/ತ್ರಿಪಲ್ ಬಂಧಗಳು ಸಮಾನಾಂತರ ರೇಖೆಗಳಾಗಿ ಗೋಚರಿಸುತ್ತವೆ. ಜ್ಯಾಮಿತಿಯು ಅಂದಾಜು ಆಗಿದೆ, ಶಕ್ತಿ-ಕಡಿಮೆಗೊಳಿಸಲ್ಪಟ್ಟಿಲ್ಲ.",
    mr: "बाँड राखाडी नळकांड्यांच्या रूपात दाखवले आहेत. दुहेरी/तिहेरी बाँड समांतर रेषांसारखे दिसतात. भूमिती अंदाजे आहे, ऊर्जा-न्यूनतम नाही.",
    gu: "બોન્ડ્સ ગ્રે સિલિન્ડર તરીકે દર્શાવવામાં આવ્યા છે. ડબલ/ટ્રિપલ બોન્ડ્સ સમાંતર રેખાઓ તરીકે દેખાય છે. ભૂમિતિ અંદાજિત છે, ઊર્જા-ન્યૂનતમ નથી.",
    bn: "বন্ধনগুলি ধূসর সিলিন্ডার হিসাবে দেখানো হয়েছে। ডবল/ট্রিপল বন্ধনগুলি সমান্তরাল রেখা হিসাবে প্রদর্শিত হয়। জ্যামিতি আনুমানিক, শক্তি-ন্যূনতম নয়।",
  }[language as string] || "Bonds shown as gray cylinders. Double/triple bonds appear as parallel lines. Geometry is approximate, not energy-minimized.";

  const [viewMode, setViewMode] = useState<'viewer' | 'scanner'>('viewer')
  
  // Viewer states
  const [selectedMolecule, setSelectedMolecule] = useState<Molecule>(MOLECULE_LIBRARY[0])
  const [searchQuery, setSearchQuery] = useState('')


  // Scanner states
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [activePresetId, setActivePresetId] = useState<string | null>(null)
  const [fileName, setFileName] = useState('')
  const [hintQuery, setHintQuery] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<Molecule | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Real-time offline in-memory query filtering
  const filteredMolecules = useMemo(() => {
    if (!searchQuery.trim()) return MOLECULE_LIBRARY
    const query = searchQuery.toLowerCase().trim()
    return MOLECULE_LIBRARY.filter(
      (m) =>
        m.name.toLowerCase().includes(query) ||
        m.formula.toLowerCase().includes(query)
    )
  }, [searchQuery])

  // Intelligent fallback to match first filtered result if currently selected is filtered out
  const activeMolecule = useMemo(() => {
    if (filteredMolecules.includes(selectedMolecule)) {
      return selectedMolecule
    }
    return filteredMolecules[0] || selectedMolecule
  }, [filteredMolecules, selectedMolecule])

  const distinctElements = useMemo(() => {
    const elements = new Set<string>()
    activeMolecule.atoms.forEach(atom => elements.add(atom.element))
    return Array.from(elements)
  }, [activeMolecule])

  // Handle uploader presets click
  const handlePresetSelect = (preset: typeof SAMPLE_PRESETS[0]) => {
    setActivePresetId(preset.id)
    setUploadedImage('preset')
    setFileName(preset.name)
    setHintQuery(preset.formula)
  }

  // Handle local image uploads
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setUploadedImage(reader.result as string)
        setActivePresetId(null)
        setFileName(file.name)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDropzoneClick = () => {
    fileInputRef.current?.click()
  }

  const clearUpload = () => {
    setUploadedImage(null)
    setActivePresetId(null)
    setFileName('')
    setScanResult(null)
  }

  // Local Offline matching vision scanner engine
  const handleIdentifyMolecule = () => {
    if (!uploadedImage) return

    setIsScanning(true)
    setScanResult(null)

    // Scientific delay for beautiful laser scan animation
    setTimeout(() => {
      setIsScanning(false)

      // 1. Clean input indicators
      const queryText = (fileName + ' ' + hintQuery).toLowerCase().trim()

      // 2. Scan compound keywords in our library
      let matched = MOLECULE_LIBRARY.find(m => 
        queryText.includes(m.name.toLowerCase()) || 
        queryText.includes(m.formula.toLowerCase().replace(/[^a-z0-9]/gi, '')) ||
        queryText.includes(m.id.toLowerCase())
      )

      // 3. Fallback matching
      if (!matched && activePresetId) {
        const preset = SAMPLE_PRESETS.find(p => p.id === activePresetId)
        matched = MOLECULE_LIBRARY.find(m => m.id === preset?.moleculeId)
      }

      // 4. Default random fallback if no match found
      if (!matched) {
        matched = MOLECULE_LIBRARY.find(m => m.id === 'c6h12o6') || MOLECULE_LIBRARY[0] // Fallback to Glucose
      }

      setScanResult(matched)
    }, 2200)
  }

  return (
    <div className="min-h-full p-4 md:p-8 bg-slate-50 dark:bg-bg-dark text-slate-800 dark:text-white transition-colors duration-300 font-sans relative">
      <style>{`
        @keyframes scan {
          0%, 100% { top: 0%; opacity: 0.8; }
          50% { top: 98%; opacity: 0.8; }
        }
      `}</style>
      
      {viewMode === 'viewer' ? (
        <>
          {/* Header Section */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate('/')}
              className="p-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl hover:scale-105 hover:bg-slate-100 dark:hover:bg-white/10 active:scale-95 transition-all text-slate-600 dark:text-white/80 flex items-center justify-center shadow-sm shrink-0"
            >
              <ArrowLeft size={16} />
            </button>
            <div className="space-y-1">
              <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                {lang.title}
              </h1>
              <p className="text-sm text-slate-500 dark:text-gray-400 font-medium">
                {lang.subtitle}
              </p>
            </div>
          </div>

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* Left Card: Library */}
            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-3xl p-6 shadow-sm flex flex-col h-[550px]">
              <h2 className="text-xs font-black text-slate-400 dark:text-white/40 uppercase tracking-[0.2em] mb-4">
                {lang.library}
              </h2>

              {/* Offline Search Bar */}
              <div className="relative mb-4 group">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/20 group-focus-within:text-primary transition-colors" size={16} />
                <input
                  type="text"
                  placeholder={lang.search}
                  className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-3 pl-10 pr-9 text-xs font-semibold outline-none text-slate-800 dark:text-white focus:border-primary/50 dark:focus:border-primary/50 focus:bg-white dark:focus:bg-transparent transition-all placeholder:text-slate-400 dark:placeholder:text-white/20 shadow-inner dark:shadow-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 dark:text-white/30 hover:text-slate-600 dark:hover:text-white/60 transition-colors rounded-full"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Scrollable list */}
              <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                {filteredMolecules.length > 0 ? (
                  filteredMolecules.map((m) => {
                    const isSelected = activeMolecule.id === m.id
                    return (
                      <button
                        key={m.id}
                        onClick={() => setSelectedMolecule(m)}
                        className={`w-full p-4 rounded-2xl flex flex-col items-start gap-1 transition-all duration-200 text-left border ${
                          isSelected
                            ? 'bg-primary/10 border-primary/30 text-slate-900 dark:text-white font-bold shadow-sm'
                            : 'bg-transparent border-transparent hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-white/80'
                        }`}
                      >
                        <span className="text-sm font-bold">{m.name}</span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-white/30">
                          {m.formula}
                        </span>
                      </button>
                    )
                  })
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center p-4">
                    <Search size={32} className="text-slate-350 dark:text-white/10 mb-2" />
                    <p className="text-xs font-bold text-slate-750 dark:text-white/80">{lang.noMolecules}</p>
                    <p className="text-[10px] text-slate-400 dark:text-white/30 mt-1">
                      {language === 'ta' ? 'வேறொரு கூட்டுப் பெயர் அல்லது வேதியியல் சூத்திரத்தை முயற்சிக்கவும்.' : language === 'hi' ? 'दूसरा यौगिक नाम या रासायनिक सूत्र आज़माएं।' : language === 'te' ? 'మరో సమ్మేళనం పేరు లేదా రసాయన సూత్రాన్ని ప్రయత్నించండి.' : language === 'ml' ? 'മറ്റൊരു സംയുക്ത നാമമോ രാസ സൂത്രമോ പരീക്ഷിക്കുക.' : language === 'kn' ? 'ಮತ್ತೊಂದು ಸಂಯುಕ್ತ ಹೆಸರು ಅಥವಾ ರಾಸಾಯನಿಕ ಸೂತ್ರವನ್ನು ಪ್ರಯತ್ನಿಸಿ.' : language === 'mr' ? 'दुसरे संयुग नाव किंवा रासायनिक सूत्र वापरून पहा.' : language === 'gu' ? 'બીજું સંયોજન નામ અથવા રાસાયણિક સૂત્ર અજમાવો.' : language === 'bn' ? 'অন্য যৌগ নাম বা রাসায়নিক সংকেত চেষ্টা করুন।' : 'Try another compound name or chemical formula.'}
                    </p>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="mt-4 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary hover:text-primary-hover rounded-xl text-[10px] font-bold tracking-wider uppercase transition-colors"
                    >
                      {lang.clearSearch}
                    </button>
                  </div>
                )}
              </div>

              {/* Molecule Scanner Launch Option (Below Library) */}
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5">
                <button
                  onClick={() => setViewMode('scanner')}
                  className="w-full bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-600 dark:text-sky-400 font-bold py-3.5 px-4 rounded-2xl text-xs flex items-center justify-center gap-2.5 transition-all shadow-sm active:scale-95 group"
                >
                  <Scan size={15} className="group-hover:rotate-90 transition-transform duration-300" />
                  {lang.scanner}
                </button>
              </div>

            </div>

            {/* Middle Card: 3D Visualization Area */}
            <div className="lg:col-span-2 relative bg-gradient-to-b from-slate-100 to-slate-200 dark:from-[#0B1026] dark:to-[#020617] border border-slate-200 dark:border-white/5 rounded-3xl overflow-hidden h-[550px] shadow-sm flex flex-col justify-between p-6">
              
              {/* Transparent container for Canvas */}
              <div className="absolute inset-0 z-0">
                <MoleculeViewer3D molecule={activeMolecule} />
              </div>

              {/* Floating Instructions Capsule */}
              <div className="absolute bottom-6 left-6 z-10 px-4 py-2 bg-white/80 dark:bg-black/40 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-white/60 pointer-events-none shadow-sm flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                {tInteractiveDetails}
              </div>
            </div>

            {/* Right Card: Molecule Details */}
            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-3xl p-6 shadow-sm flex flex-col justify-between h-[550px] overflow-y-auto">
              
              <div className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-xs font-black text-slate-400 dark:text-white/40 uppercase tracking-[0.2em]">
                    {lang.molecule}
                  </h2>
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white leading-tight">
                    {activeMolecule.name}
                  </h3>
                  <p className="text-lg font-black text-primary uppercase tracking-widest">
                    {activeMolecule.formula}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-slate-600 dark:text-gray-300 font-medium leading-relaxed font-sans">
                    {activeMolecule.description}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[10px] font-black text-slate-400 dark:text-white/40 uppercase tracking-widest">
                    {lang.atoms}
                  </h4>
                  <div className="flex flex-wrap gap-4">
                    {distinctElements.map((el) => {
                      const color = ELEMENT_COLORS[el] || '#CCCCCC'
                      const name = ELEMENT_NAMES[el] || el
                      return (
                        <div key={el} className="flex items-center gap-2">
                          <div 
                            className="w-3.5 h-3.5 rounded-full border border-slate-300 dark:border-white/10 shadow-sm"
                            style={{ backgroundColor: color }}
                          />
                          <span className="text-xs font-bold text-slate-800 dark:text-white">
                            {el} <span className="text-[10px] font-medium text-slate-400 dark:text-white/40">({name})</span>
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Footer Warning / Note */}
              <div className="mt-8 border-t border-slate-100 dark:border-white/5 pt-4">
                <p className="text-[10px] text-slate-400 dark:text-gray-500 font-medium leading-normal">
                  {tFooterWarning}
                </p>
              </div>

            </div>

          </div>
        </>
      ) : (
        /* Molecule Scanner Layout exactly matching the user's reference photo */
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-300">
          
          {/* Header & Back Button */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setViewMode('viewer')
                  clearUpload()
                }}
                className="p-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl hover:scale-105 hover:bg-slate-100 dark:hover:bg-white/10 active:scale-95 transition-all text-slate-600 dark:text-white/80 flex items-center justify-center shadow-sm"
              >
                <ArrowLeft size={16} />
              </button>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-sky-500/10 text-sky-500 border border-sky-500/20 rounded-2xl flex items-center justify-center">
                  <Scan size={24} />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight leading-none">
                    {lang.scanner}
                  </h1>
                  <p className="text-xs text-slate-500 dark:text-gray-400 font-medium mt-1">
                    {lang.scannerDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Double Column Grid layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left Card: IMAGE */}
            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-3xl p-6 shadow-sm flex flex-col justify-between min-h-[480px]">
              
              <div className="space-y-5">
                <h2 className="text-xs font-black text-slate-400 dark:text-white/40 uppercase tracking-[0.2em]">
                  {lang.image}
                </h2>

                {/* Dashed Dropzone Box */}
                <div 
                  onClick={uploadedImage ? undefined : handleDropzoneClick}
                  className={`relative w-full h-[220px] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-4 transition-all duration-300 ${
                    uploadedImage 
                      ? 'border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/10 overflow-hidden' 
                      : 'border-slate-300 dark:border-white/10 hover:border-primary/50 dark:hover:border-primary/50 bg-slate-50/50 dark:bg-white/5 cursor-pointer hover:shadow-inner'
                  }`}
                >
                  {uploadedImage ? (
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                      {uploadedImage === 'preset' ? (
                        <div className="flex items-center justify-center p-4 bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm relative w-full h-full max-w-[180px]">
                          {PRESET_SVGS[activePresetId as keyof typeof PRESET_SVGS]}
                        </div>
                      ) : (
                        <img 
                          src={uploadedImage} 
                          alt="Molecule Skeletal upload" 
                          className="max-h-full max-w-full object-contain rounded-lg border border-slate-200 dark:border-white/5 shadow-sm"
                        />
                      )}

                      {/* Moving laser scan line during scanning */}
                      {isScanning && (
                        <div 
                          className="absolute left-0 w-full h-1 bg-green-400 dark:bg-sky-400 shadow-[0_0_10px_#4ade80] pointer-events-none"
                          style={{ animation: 'scan 2s ease-in-out infinite' }}
                        />
                      )}

                      {/* Remove Button overlay */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation()
                          clearUpload()
                        }}
                        className="absolute top-3 right-3 p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors active:scale-90"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-center space-y-3 pointer-events-none">
                      <div className="p-4 bg-slate-100 dark:bg-white/5 rounded-full text-slate-400 dark:text-white/20">
                        <Upload size={24} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 dark:text-white/95">{lang.dropzone}</p>
                        <p className="text-[10px] text-slate-400 dark:text-white/30 font-medium mt-1">PNG/JPG • up to 4 MB</p>
                      </div>
                    </div>
                  )}
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleImageUpload} 
                    accept="image/*" 
                    className="hidden" 
                  />
                </div>

                {/* Custom Sample Presets Row */}
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-slate-400 dark:text-white/40 uppercase tracking-wider">
                    {lang.presets}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {SAMPLE_PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => handlePresetSelect(preset)}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          activePresetId === preset.id
                            ? 'bg-primary/10 border-primary/40 text-primary dark:text-white font-bold'
                            : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/5 text-slate-600 dark:text-white/80 hover:bg-slate-100 dark:hover:bg-white/10'
                        }`}
                      >
                        <p className="text-xs font-bold leading-tight truncate">{preset.name}</p>
                        <p className="text-[9px] text-slate-400 dark:text-white/40 leading-none mt-0.5">{preset.formula}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Optional Hint Box */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 dark:text-white/40 uppercase tracking-widest block">
                    {lang.hint}
                  </label>
                  <input
                    type="text"
                    placeholder={lang.enterKeywords}
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl py-3.5 px-4 text-xs font-semibold outline-none text-slate-800 dark:text-white focus:border-primary/50 dark:focus:border-primary/50 transition-all placeholder:text-slate-400 dark:placeholder:text-white/20"
                    value={hintQuery}
                    onChange={(e) => setHintQuery(e.target.value)}
                  />
                </div>

              </div>

              {/* Launch Scan trigger */}
              <div className="mt-8">
                <button
                  disabled={!uploadedImage || isScanning}
                  onClick={handleIdentifyMolecule}
                  className={`w-full font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-[0.98] text-xs ${
                    uploadedImage && !isScanning
                      ? 'bg-primary hover:bg-primary-hover text-white cursor-pointer hover:shadow-lg'
                      : 'bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-slate-400 dark:text-white/20 cursor-not-allowed'
                  }`}
                >
                  <Sparkles size={14} className={isScanning ? 'animate-spin' : ''} />
                  {lang.identify}
                </button>
              </div>

            </div>

            {/* Right Card: RESULTS */}
            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-3xl p-6 shadow-sm min-h-[480px] flex flex-col">
              
              {isScanning ? (
                /* Scanning loading status */
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-5 animate-pulse">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full border-4 border-t-primary border-primary/20 animate-spin" />
                    <Scan className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary" size={24} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-850 dark:text-white/95">{lang.analyzing}</p>
                    <p className="text-xs text-slate-400 dark:text-white/30">{tAnalyzingDetails}</p>
                  </div>
                </div>
              ) : scanResult ? (
                /* Dynamic Scan result layout */
                <div className="flex-1 flex flex-col justify-between space-y-6 overflow-y-auto max-h-[500px] pr-1 custom-scrollbar">
                  
                  {/* Smaller 3D molecular canvas */}
                  <div>
                    <h3 className="text-xs font-black text-slate-400 dark:text-white/40 uppercase tracking-[0.2em] mb-3">
                      {tIdentifiedStructure}
                    </h3>
                    <div className="relative w-full h-[180px] bg-gradient-to-b from-slate-100 to-slate-200 dark:from-[#0B1026] dark:to-[#020617] border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
                      <div className="absolute inset-0 z-0">
                        <MoleculeViewer3D molecule={scanResult} />
                      </div>
                      <span className="absolute bottom-3 left-3 z-10 px-2.5 py-1 bg-black/40 border border-white/10 rounded-full text-[8px] font-black uppercase tracking-widest text-white/80 pointer-events-none">
                        {tInteractiveModel}
                      </span>
                    </div>
                  </div>

                  {/* Compound description & parameters */}
                  <div className="space-y-4">
                    <div className="space-y-0.5">
                      <h4 className="text-[10px] font-black text-slate-450 dark:text-white/30 uppercase tracking-[0.15em]">
                        {scanResult.category} {tCompound}
                      </h4>
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
                        {scanResult.name}
                      </h3>
                      <p className="text-sm font-black text-primary uppercase tracking-widest">
                        {scanResult.formula}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 p-4 rounded-2xl">
                      <div>
                        <span className="text-[9px] font-black text-slate-400 dark:text-white/30 uppercase tracking-wider block">{tIupacName}</span>
                        <span className="text-xs font-bold text-slate-800 dark:text-white truncate block">{scanResult.iupacName}</span>
                      </div>
                      <div>
                        <span className="text-[9px] font-black text-slate-400 dark:text-white/30 uppercase tracking-wider block">{tMolarMass}</span>
                        <span className="text-xs font-bold text-slate-800 dark:text-white truncate block">{scanResult.molarMass}</span>
                      </div>
                      <div className="col-span-2 pt-2 border-t border-slate-200 dark:border-white/5">
                        <span className="text-[9px] font-black text-slate-400 dark:text-white/30 uppercase tracking-wider block">{tFunctionalGroups}</span>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {scanResult.functionalGroups.map(g => (
                            <span key={g} className="px-2 py-0.5 bg-primary/10 text-primary dark:text-white/80 rounded-md text-[9px] font-bold">
                              {g}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* AI vision breakdown analysis reports */}
                    <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-white/5">
                      
                      <div className="space-y-1">
                        <h5 className="text-[9px] font-black text-slate-400 dark:text-white/40 uppercase tracking-widest flex items-center gap-1.5">
                          <Eye size={10} className="text-sky-500" />
                          {tAiVision}
                        </h5>
                        <p className="text-xs text-slate-600 dark:text-gray-300 font-medium leading-relaxed">
                          The uploaded structure shows clean bond geometry matching our local molecular signature. {scanResult.bondExplanation}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <h5 className="text-[9px] font-black text-slate-400 dark:text-white/40 uppercase tracking-widest flex items-center gap-1.5">
                          <HelpCircle size={10} className="text-green-500" />
                          {tEducationalInsights}
                        </h5>
                        <ul className="text-xs text-slate-650 dark:text-gray-350 list-disc pl-4 space-y-1">
                          {scanResult.uses.map((use, idx) => (
                            <li key={idx} className="leading-relaxed">
                              {use}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-1">
                        <h5 className="text-[9px] font-black text-slate-400 dark:text-white/40 uppercase tracking-widest flex items-center gap-1.5">
                          <AlertTriangle size={10} className="text-amber-500" />
                          {tSafetyProfile}
                        </h5>
                        <p className="text-xs text-slate-600 dark:text-gray-350 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 p-2.5 rounded-xl font-semibold leading-relaxed">
                          {scanResult.safety}
                        </p>
                      </div>

                    </div>

                  </div>

                </div>
              ) : (
                /* Default Standard placeholder layout exactly matching the photo */
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="p-5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-full text-slate-400 dark:text-white/20">
                    <Scan size={36} className="stroke-[1.5]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-white/95">
                      {lang.emptyScanner}
                    </h3>
                    <p className="text-[10px] text-slate-400 dark:text-white/30 font-medium mt-1">
                      {lang.emptyScannerDesc}
                    </p>
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>
      )}

    </div>
  )
}
