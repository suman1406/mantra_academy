
"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { HelpCircle, Bot, User, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { handleFaqQuery } from "@/app/actions";
import { cn } from "@/lib/utils";

type Message = {
  role: "user" | "bot";
  content: string;
};

export function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    startTransition(async () => {
      const result = await handleFaqQuery(input);
      const botMessage: Message = { role: "bot", content: result.answer };
      setMessages((prev) => [...prev, botMessage]);
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-accent text-accent-foreground shadow-lg hover:bg-accent/90 focus:ring-2 focus:ring-ring focus:ring-offset-2 animate-pulse"
        >
          <HelpCircle className="h-8 w-8" />
          <span className="sr-only">Open AI Assistant</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col w-full sm:max-w-md bg-background/90 backdrop-blur-sm">
        <SheetHeader>
          <SheetTitle className="font-headline text-2xl text-primary flex items-center gap-2">
            <Bot />
            Mantra Guide
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex-grow my-4 pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback><Bot size={20}/></AvatarFallback>
              </Avatar>
              <div className="p-3 rounded-lg bg-muted max-w-xs">
                <p>Greetings! How may I assist you today? Ask me about our mantra courses or our mission.</p>
              </div>
            </div>
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-start gap-3",
                  message.role === "user" && "flex-row-reverse"
                )}
              >
                <Avatar className="w-8 h-8">
                  <AvatarFallback>{message.role === 'bot' ? <Bot size={20}/> : <User size={20}/>}</AvatarFallback>
                </Avatar>
                <div
                  className={cn(
                    "p-3 rounded-lg max-w-xs",
                    message.role === "user"
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted"
                  )}
                >
                  <p>{message.content}</p>
                </div>
              </div>
            ))}
            {isPending && (
              <div className="flex items-start gap-3">
                 <Avatar className="w-8 h-8">
                   <AvatarFallback><Bot size={20}/></AvatarFallback>
                 </Avatar>
                <div className="p-3 rounded-lg bg-muted flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Thinking...</span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t pt-4">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="flex-grow"
            disabled={isPending}
          />
          <Button type="submit" size="icon" disabled={isPending || !input.trim()} className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Send className="h-5 w-5" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
