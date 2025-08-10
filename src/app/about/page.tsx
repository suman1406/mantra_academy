
"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Karthik Sharma",
    role: "Co-Founder & Lead Instructor",
    image: "https://placehold.co/400x400.png",
    aiHint: "indian scholar man",
    bio: "Karthik Sharma is a dedicated scholar, shaped by over 13 years of immersive learning in the traditional Gurukula system, with a firm grounding in the Indian Knowledge Systems (IKS). Introduced to the Vedic tradition at the age of 10, he studied Krishna Yajurveda, along with the Upanishads, Bhagavad Gītā, Brahmasūtras, Yogasūtras, and key shastras like Vyākaraṇa, Kāvya, and Mīmāṁsā. Under the guidance of Dr. Ramachandra Bhat Kotemane, a leading Vedic scholar, he developed a deeply experiential and contemplative approach to Vedānta. Karthik holds Vidwat (M.A.) in Advaita Vedanta and an M.Phil, and is currently pursuing doctoral research. With a heartfelt commitment to preserving India’s sacred wisdom, he continues to share the Gurukula way of learning bridging ancient heritage and modern seekers through teaching, reflection, and practice.",
  },
  {
    name: "Jyothi Sharma",
    role: "Co-Founder & Instructor",
    image: "https://placehold.co/400x400.png",
    aiHint: "indian scholar woman",
    bio: "Jyothi M. Bhat is a dedicated scholar and teacher deeply grounded in the timeless wisdom of the Indian Knowledge System (IKS). Trained in the traditional Gurukula way, she embodies the living heritage of oral transmission, disciplined study, and spiritual practice that form the heart of Bharat’s sacred teachings. Her profound understanding of Advaita Vedānta and Sanskrit scriptures is enriched by immersive Gurukula education, where learning merges scholarship with heartfelt experience. Committed to preserving and sharing this wisdom, Jyothi integrates authentic classical knowledge with contemporary inquiry, making the ancient teachings accessible and relevant for today’s seekers. At Mantra Academy, she brings this unique blend of tradition and modern insight to guide learners gently but deeply on their spiritual path, nurturing not just knowledge but transformation through sound, meaning, and devotion.",
  },
];

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.8,
};

const TeamMemberCard = ({ member, index }: { member: typeof teamMembers[0], index: number }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      className="w-full"
    >
        <Card className="text-center border-border/40 bg-card backdrop-blur-sm flex flex-col items-center p-6 h-full group hover:shadow-primary/20 hover:shadow-2xl transition-shadow duration-500 text-card-foreground">
            <div className="relative w-40 h-40 mb-4">
                <Image
                    src={member.image}
                    alt={member.name}
                    width={400}
                    height={400}
                    data-ai-hint={member.aiHint}
                    className="rounded-full object-cover ring-4 ring-offset-4 ring-offset-background ring-accent/50 group-hover:scale-105 transition-transform duration-500"
                />
            </div>
            <CardHeader className="p-2">
                <CardTitle className="font-headline text-2xl text-card-foreground">{member.name}</CardTitle>
                <p className="text-card-foreground/80 font-semibold">{member.role}</p>
            </CardHeader>
            <CardContent>
                <p className="text-card-foreground/70 text-left">{member.bio}</p>
            </CardContent>
        </Card>
    </motion.div>
  );
};

export default function AboutPage() {
    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (i: number = 1) => ({ 
            opacity: 1, 
            y: 0,
            transition: {
                staggerChildren: 0.2,
                delayChildren: i * 0.1,
                duration: 0.8,
                ease: "easeInOut"
            }
        })
    };

    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
    };

  return (
    <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="py-16 sm:py-24 space-y-24"
    >
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="border-border/40 bg-card text-card-foreground backdrop-blur-sm overflow-hidden group p-8 md:p-12">
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-card-foreground text-center">Our Sacred Mission</h1>
            <div className="text-card-foreground/80 mt-6 space-y-4 text-lg max-w-4xl mx-auto">
              <p>
                To preserve, embody, and transmit the authentic wisdom of the Vedas, Sanskrit, and Indian Knowledge Systems through accessible, immersive, and heartfelt teaching. Mantra Academy is dedicated to nurturing deep understanding, skillful chanting, and spiritual transformation by blending traditional Gurukula methods with modern learning, inspiring seekers worldwide to connect with Sanātana Dharma’s timeless truths and sacred practices.
              </p>
            </div>
          </Card>
      </motion.section>

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="w-full max-w-6xl mx-auto"
      >
        <Card className="border-border/40 bg-card text-card-foreground backdrop-blur-sm overflow-hidden md:grid md:grid-cols-3 items-center group">
          <div className="relative h-64 md:h-full w-full min-h-[400px] md:col-span-1 overflow-hidden">
             <Image
              src="https://placehold.co/600x800.png"
              alt="Acharya Dr. Ramachandra Bhat Kotemane"
              fill
              className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
              data-ai-hint="indian scholar portrait"
            />
          </div>
          <div className="p-8 md:p-12 md:col-span-2">
            <h2 className="text-3xl md:text-5xl font-headline font-bold text-card-foreground">Our Inspiration</h2>
            <h3 className="text-xl md:text-2xl font-headline font-semibold text-card-foreground/80 mt-2">Acharya Dr. Ramachandra Bhat Kotemane</h3>
            <p className="font-semibold text-card-foreground/70">Scholar - Mystic - Visionary Guide</p>
            <div className="text-card-foreground/80 mt-4 space-y-4 text-md">
                <p>At the heart of Mantra Academy’s vision stands our revered Acharya, Dr. Ramachandra Bhat Kotemane, fondly known simply as Acharya. A shining beacon in the world of Vedic, Vedantic, and Yogic wisdom, Acharya is the Pradhana Acharya of Veda Vijnana Gurukulam, Founder of Veda Vijnana Shodha Samsthanam, and former Vice-Chancellor of SVYASA Yoga University, Bengaluru.</p>
                <p>With decades of deep sādhanā, scholarship, and compassion, Acharya has guided countless seekers into the profound inner world of the Vedas and Upanishads. His unwavering emphasis on preserving the purity of Yoga and Vedic knowledge has shaped the very soul of modern traditional education.</p>
                <p>For us at Mantra Academy, an online extension of the Gurukula spirit, Acharya is not just a mentor, he is the root inspiration and spiritual backbone of every initiative we carry forward. His teachings, silent presence, and unshakable commitment to Sanātana Dharma pulse through every course, every chant, and every student we serve. We humbly walk this path, holding his blessing and vision close to our hearts.</p>
            </div>
          </div>
        </Card>
      </motion.section>

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="w-full max-w-6xl mx-auto"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-headline font-bold text-primary">Meet Our Team</h2>
          <p className="text-foreground/80 mt-2">The dedicated guides of Mantra Academy</p>
        </motion.div>
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={member.name} member={member} index={index} />
          ))}
        </motion.div>
      </motion.section>
    </motion.div>
  );
}
