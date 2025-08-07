import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const teamMembers = [
  {
    name: "Aria Lightwood",
    role: "Founder & Lead Mystic",
    image: "https://placehold.co/400x400.png",
    aiHint: "spiritual woman portrait",
    bio: "Aria founded the Sanctuary to create a haven for souls seeking light and wisdom.",
  },
  {
    name: "Kaelen Stone",
    role: "Meditation Guide",
    image: "https://placehold.co/400x400.png",
    aiHint: "meditating man portrait",
    bio: "With 20 years of practice, Kaelen guides students to find their inner stillness.",
  },
  {
    name: "Seraphina Moon",
    role: "Yoga Instructor",
    image: "https://placehold.co/400x400.png",
    aiHint: "yoga instructor portrait",
    bio: "Seraphina combines ancient yoga traditions with modern anatomical understanding.",
  },
];

export default function AboutPage() {
  return (
    <div className="py-12 space-y-20">
      <section className="text-center">
        <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary">Our Sacred Mission</h1>
        <div className="mt-6 max-w-3xl mx-auto space-y-4 text-lg text-foreground/80">
          <p>
            At Inner Light Sanctuary, our mission is to illuminate the path of spiritual discovery for every soul that finds its way to us. We believe in the power of ancient wisdom, the peace of mindful practice, and the strength of a supportive community.
          </p>
          <p>
            We are dedicated to providing authentic, accessible, and transformative experiences that nurture the mind, body, and spirit. Our vision is a world where every individual is connected to their inner light, living a life of purpose, peace, and profound joy.
          </p>
        </div>
      </section>

      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-headline font-bold text-primary">Meet Our Guides</h2>
          <p className="text-foreground/80 mt-2">The hearts and souls behind the Sanctuary</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.name} className="text-center border-border/40 bg-card/80 backdrop-blur-sm flex flex-col items-center p-6">
              <div className="relative w-40 h-40 mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={400}
                  height={400}
                  data-ai-hint={member.aiHint}
                  className="rounded-full object-cover ring-4 ring-offset-4 ring-offset-background ring-accent/50"
                />
              </div>
              <CardHeader>
                <CardTitle className="font-headline text-2xl text-primary">{member.name}</CardTitle>
                <p className="text-accent font-semibold">{member.role}</p>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
