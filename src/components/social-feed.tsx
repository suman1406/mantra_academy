import Image from "next/image";
import { Instagram, Youtube } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const feedItems = [
  { platform: "Instagram", image: "https://placehold.co/400x400.png", aiHint: "spiritual quote", handle: "@innerlight" },
  { platform: "YouTube", image: "https://placehold.co/400x400.png", aiHint: "meditation guide", handle: "InnerLightChannel" },
  { platform: "Instagram", image: "https://placehold.co/400x400.png", aiHint: "yoga pose", handle: "@innerlight" },
  { platform: "Instagram", image: "https://placehold.co/400x400.png", aiHint: "mandala art", handle: "@innerlight" },
];

export function SocialFeed() {
  return (
    <section className="w-full max-w-6xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-headline font-bold text-primary">Connect With Us</h2>
        <p className="text-foreground/80 mt-2">Follow our journey and get daily inspiration</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {feedItems.map((item, index) => (
          <Card key={index} className="overflow-hidden group relative border-border/40 bg-card/80 backdrop-blur-sm">
            <CardContent className="p-0">
              <Image src={item.image} alt="Social media post" width={400} height={400} className="object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint={item.aiHint} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <div className="flex items-center space-x-2">
                  {item.platform === "Instagram" ? <Instagram /> : <Youtube />}
                  <span className="font-semibold">{item.handle}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
