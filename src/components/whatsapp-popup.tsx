
"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M21.44 12.22a8.9 8.9 0 0 0-4.66-4.66A9 9 0 1 0 3.56 12.22" />
        <path d="M12 18a6 6 0 0 0 6-6h-6V6a6 6 0 1 0-6 6Z" />
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
