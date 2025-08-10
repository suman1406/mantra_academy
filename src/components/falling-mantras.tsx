
"use client";

import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const mantras = [
    "शिवोऽहम्",
    "चिदानन्द रूपःअहम्",
    "अहं ब्रह्मास्मि",
    "तत्त्वमसि",
    "प्रज्ञानं ब्रह्म",
    "अयमात्मा ब्रह्म",
    "ब्रह्म सत्यं जगन्मिथ्या",
    "एकमेव द्वितीयं ब्रह्म",
    "मनो बुद्ध्यहंकार चित्तानि नाहम्",
    "अहं निर्विकल्पो निराकार रूपः",
    "सर्वं खल्विदं ब्रह्म",
    "सोऽहम्",
    "नेति नेति",
    "समगच्छध्वं संवदध्वम्",
    "सत्यमेव जयते",
    "धर्मो रक्षति रक्षितः",
    "योगः कर्मसु कौशलम्",
    "असतो मा सद्गमय",
    "मृत्योर्मा अमृतं गमय",
    "सर्वे भवन्तु सुखिनः",
    "विद्या ददाति विनयं",
    "श्रद्धावान लभते ज्ञानम्",
    "न हि ज्ञानेन सदृशं पवित्रमिह विद्यते",
    "आत्मदीपो भव",
];

const Mantra = ({ text }: { text: string }) => {
  const isMobile = useIsMobile();
  const left = Math.random() * 100;
  const duration = 15 + Math.random() * 15;
  const delay = Math.random() * 10;
  const fontSize = isMobile ? "1.2rem" : "1.75rem";

  return (
    <motion.p
      className="absolute font-headline text-primary/30 whitespace-nowrap"
      style={{
        left: `${left}vw`,
        fontSize: fontSize,
      }}
      initial={{ top: "-20%", opacity: 0.8 }}
      animate={{ top: "120%", opacity: 0 }}
      transition={{
        duration: duration,
        delay: delay,
        ease: "linear",
        repeat: Infinity,
      }}
    >
      {text}
    </motion.p>
  );
};

export function FallingMantras() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {mantras.map((text, i) => (
        <Mantra key={i} text={text} />
      ))}
    </div>
  );
}
