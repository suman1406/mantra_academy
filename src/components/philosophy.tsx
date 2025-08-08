import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export function Philosophy() {
  return (
    <section className="w-full max-w-6xl">
      <Card className="border-border/40 bg-card/80 backdrop-blur-sm overflow-hidden md:grid md:grid-cols-2 items-center group">
        <div className="p-8 md:p-12">
          <h2 className="text-3xl md:text-5xl font-headline font-bold text-primary">Our Philosophy</h2>
          <div className="text-foreground/80 mt-4 space-y-4 text-lg">
            <p>
              We believe that within every individual lies a sanctuary of inner light—a source of boundless peace, wisdom, and strength. Our purpose is to provide the tools, guidance, and community to help you connect with that sacred space.
            </p>
            <p>
              Our teachings are rooted in ancient traditions, yet adapted for the modern world. We honor a holistic approach, nurturing the mind through meditation, the body through mindful movement, and the spirit through community and self-reflection.
            </p>
          </div>
        </div>
        <div className="relative h-64 md:h-full w-full min-h-[300px] overflow-hidden">
           <Image
            src="https://placehold.co/600x800.png"
            alt="A serene sanctuary with soft light"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            data-ai-hint="serene sanctuary soft light"
          />
        </div>
      </Card>
    </section>
  );
}
