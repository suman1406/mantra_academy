
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { LogIn, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("admin@mantra.com");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (email === "admin@mantra.com" && password === "password") {
      try {
        sessionStorage.setItem("isAdminAuthenticated", "true");
        toast({
          title: "Login Successful",
          description: "Welcome back, Admin!",
        });
        router.push('/admin/dashboard');
      } catch (error) {
        setError("Could not save session. Please enable storage in your browser.");
      }
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <Card className="w-full max-w-md shadow-2xl bg-white/80 backdrop-blur-sm border-primary/20">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-2 border-2 border-primary/20">
              <ShieldCheck className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-4xl font-headline font-bold text-primary">Admin Access</CardTitle>
            <CardDescription className="text-lg font-body text-foreground/80">
              Enter your credentials to manage the academy.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="px-8 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="font-semibold text-foreground/90">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@mantra.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/50 border-border/80 focus:border-primary focus:ring-primary/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/50 border-border/80 focus:border-primary focus:ring-primary/50"
                />
              </div>
              {error && <p className="text-sm text-center font-medium text-destructive">{error}</p>}
            </CardContent>
            <CardFooter className="px-8 pb-8 pt-4">
              <Button type="submit" size="lg" className="w-full group text-lg font-bold">
                Sign In
                <LogIn className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
