
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
      <path d="M17.472 14.382c-.297-.149-.758-.372-1.03-.46-.272-.088-.48-.149-.682.149-.199.297-.682.836-.83.983-.149.149-.297.168-.544.02-.247-.149-1.029-.372-1.956-1.213-.728-.659-1.213-1.474-1.362-1.721-.149-.247-.018-.382.13-.51.13-.11.297-.297.446-.446.149-.149.199-.247.297-.415.099-.168.05-.317-.02-.465-.07-.149-.682-1.65-.93-2.267-.247-.616-.495-.519-.682-.51-.187-.008-.396-.008-.604-.008s-.495.07-.742.34c-.247.272-.978.93-.978 2.267 0 1.336 1.002 2.618 1.15 2.796.149.178 1.956 3.018 4.743 4.225.616.272 1.103.416 1.474.51.57.149 1.087.12 1.503-.06.465-.187 1.425-1.161 1.623-1.425.199-.264.199-.495.149-.643-.05-.149-.199-.247-.446-.394zM12 2.05A9.95 9.95 0 0 0 2.05 12a9.95 9.95 0 0 0 9.95 9.95A9.95 9.95 0 0 0 21.95 12 9.95 9.95 0 0 0 12 2.05zm0 18.003c-4.446 0-8.053-3.607-8.053-8.053 0-4.446 3.607-8.053 8.053-8.053 4.446 0 8.053 3.607 8.053 8.053 0 4.446-3.607 8.053-8.053 8.053z" />
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
