
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { LogIn, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // If the user is already authenticated (server cookie), verify and redirect
    (async () => {
      try {
        const resp = await fetch('/api/admin/me');
        if (resp.ok) {
          const data = await resp.json();
          if (data?.authenticated) router.replace('/admin/dashboard');
        }
      } catch (err) {
        // ignore, user not authenticated
      }
    })();
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    (async () => {
      try {
        const resp = await fetch('/api/admin/login', {
          method: 'POST',
          credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        if (!resp.ok) {
          const body = await resp.json().catch(() => ({}));
          setError(body?.error || 'Invalid credentials');
          return;
        }

        // Server sets an httpOnly cookie with the token. Redirect to dashboard.
        toast({ title: 'Login Successful', description: 'Welcome back, Admin!' });
        router.push('/admin/dashboard');
      } catch (err) {
        console.error(err);
        setError('Login failed. Please try again.');
      }
    })();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <Card className="w-full max-w-md shadow-2xl bg-card/95 backdrop-blur-sm border border-primary/10 text-card-foreground">
          <CardHeader className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.3,
              }}
              className="mx-auto bg-gradient-to-br from-primary to-primary/80 p-4 rounded-full w-fit mb-2 border-2 border-primary-foreground/30 shadow-lg"
            >
              <ShieldCheck className="h-10 w-10 text-primary-foreground" />
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2}}
            >
                <CardTitle className="text-4xl font-headline font-bold text-card-foreground">Admin Access</CardTitle>
                <CardDescription className="text-lg font-body text-card-foreground/80">
                  Enter your credentials to manage the academy.
                </CardDescription>
            </motion.div>
          </CardHeader>
          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            onSubmit={handleSubmit}
          >
            <CardContent className="px-8 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="font-semibold text-card-foreground/90">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@domain.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-card-foreground/6 border-card-foreground/20 text-card-foreground placeholder:text-card-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-md"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-card-foreground/90">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-card-foreground/6 border-card-foreground/20 text-card-foreground placeholder:text-card-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-md"
                />
              </div>
              {error && <p className="text-sm text-center font-medium text-destructive-foreground bg-destructive/5 py-2 rounded">{error}</p>}
            </CardContent>
            <CardFooter className="px-8 pb-8 pt-4">
               <Button type="submit" size="lg" className="w-full group text-lg font-bold transition-all duration-150 transform bg-primary text-primary-foreground hover:opacity-95">
                    Sign In
                    <LogIn className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                </Button>
            </CardFooter>
          </motion.form>
        </Card>
      </motion.div>
    </div>
  );
}
