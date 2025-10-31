
"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      {...props}
    >
      <title>WhatsApp</title>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.031-.967-.273-.099-.473-.148-.673.15-.197.297-.773.966-.947 1.164-.173.198-.347.223-.644.074-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.654-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.173.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.673-1.611-.923-2.207-.242-.579-.487-.5-.673-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.273.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.617h-.004a8.71 8.71 0 0 1-4.437-1.211l-.317-.188-3.308.868.884-3.236-.205-.332a8.73 8.73 0 0 1-1.337-4.64c.002-4.833 3.94-8.77 8.773-8.77 2.344 0 4.544.915 6.199 2.571a8.732 8.732 0 0 1 2.573 6.206c-.003 4.833-3.941 8.77-8.771 8.77m7.431-16.201A10.449 10.449 0 0 0 12.05 1.5c-5.79 0-10.51 4.717-10.512 10.507 0 1.85.482 3.646 1.399 5.23L1.5 22.5l5.405-1.42a10.48 10.48 0 0 0 5.052 1.287h.005c5.79 0 10.509-4.717 10.511-10.507a10.446 10.446 0 0 0-3.066-7.362z" />
    </svg>
);

export function WhatsappPopup() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const hasBeenShown = sessionStorage.getItem("whatsappPopupShown");
        if (!hasBeenShown) {
            const timer = setTimeout(() => {
                setIsOpen(true);
                sessionStorage.setItem("whatsappPopupShown", "true");
            }, 3000); // 3-second delay

            return () => clearTimeout(timer);
        }
    }, []);

    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-md bg-card/90 backdrop-blur-sm border-primary/20 text-card-foreground">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <DialogHeader className="text-center items-center">
                        <div className="p-3 bg-primary rounded-full w-fit mb-4">
                            <WhatsAppIcon className="h-8 w-8 text-primary-foreground" />
                        </div>
                        <DialogTitle className="font-headline text-2xl text-card-foreground">Join Our Community</DialogTitle>
                        <DialogDescription className="text-card-foreground/80">
                            Connect with fellow seekers, get instant updates on courses, and receive daily wisdom by joining our WhatsApp channel.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-6 sm:justify-center">
                        <Button asChild size="lg" className="w-full sm:w-auto">
                            <Link href="https://whatsapp.com/channel/0029Vb43WtE7T8bcZN2cyX1n" target="_blank" rel="noopener noreferrer">
                                Join Now
                            </Link>
                        </Button>
                    </DialogFooter>
                </motion.div>
            </DialogContent>
        </Dialog>
    );
}
