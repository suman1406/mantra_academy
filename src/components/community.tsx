import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, Calendar, Mic } from "lucide-react";
import Link from "next/link";

const communityFeatures = [
    {
        icon: Users,
        title: "Global Community",
        description: "Connect with like-minded individuals from around the world in our forums and live events.",
    },
    {
        icon: Calendar,
        title: "Exclusive Events",
        description: "Participate in members-only workshops, group meditations, and Q&A sessions with our guides.",
    },
    {
        icon: Mic,
        title: "Guided Sessions",
        description: "Access a library of guided practices and talks to support your journey, anytime, anywhere.",
    }
]

export function Community() {
  return (
    <section className="w-full max-w-6xl">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-headline font-bold text-primary">Join Our Vibrant Community</h2>
            <p className="text-foreground/80 mt-2">Grow and share your journey with others</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 text-center">
            {communityFeatures.map((feature, index) => (
                 <Card key={index} className="p-8 border-border/40 bg-card/80 backdrop-blur-sm flex flex-col items-center">
                    <feature.icon className="h-12 w-12 text-accent mb-4"/>
                    <h3 className="text-2xl font-headline text-primary mb-2">{feature.title}</h3>
                    <p className="text-foreground/70 flex-grow">{feature.description}</p>
                 </Card>
            ))}
        </div>
        <div className="text-center mt-12">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full text-lg px-8 py-6 group transition-all duration-300 hover:shadow-lg hover:shadow-accent/40 hover:scale-105" asChild>
                <Link href="#">
                Become a Member
                </Link>
            </Button>
        </div>
    </section>
  );
}
