
"use client";

import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { useMemo } from "react";

const allMantras = [
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

const Mantra = ({ text, column }: { text: string; column: number }) => {
  const isMobile = useIsMobile();
  const duration = 15 + Math.random() * 15;
  const delay = Math.random() * 15;
  const fontSize = isMobile ? "1rem" : "1.5rem";
  const columnWidth = isMobile ? 20 : 10;
  const left = column * columnWidth + (Math.random() * columnWidth - (columnWidth/2));


  return (
    <motion.p
      className="absolute font-headline text-primary/30 whitespace-nowrap"
      style={{
        left: `${left}vw`,
        fontSize: fontSize,
        textShadow: "0 0 10px hsla(var(--background), 0.7)",
      }}
      initial={{ top: "-20%", opacity: 0.7 }}
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
    const isMobile = useIsMobile();
    const numColumns = isMobile ? 5 : 10;

    const mantrasForColumns = useMemo(() => {
        const columns: string[][] = Array.from({ length: numColumns }, () => []);
        allMantras.forEach((mantra, index) => {
            columns[index % numColumns].push(mantra);
        });

        // To make it less crowded, lets only pick one mantra per column randomly
        return columns.map((colMantras, colIndex) => {
             if (colMantras.length === 0) return null;
             const mantra = colMantras[Math.floor(Math.random() * colMantras.length)];
             return { mantra, colIndex };
        }).filter(item => item !== null);

    }, [numColumns]);


  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
      {mantrasForColumns.map((item, i) =>
        item ? <Mantra key={i} text={item.mantra} column={item.colIndex} /> : null
      )}
    </div>
  );
}
