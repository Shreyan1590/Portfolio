"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Loader2, Send, Sparkles, User, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { handlePortfolioChat } from '@/app/actions';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn } from '@/lib/utils';
import { useTypewriter } from '@/hooks/use-typewriter';

type Message = {
  role: 'user' | 'model';
  content: string;
};

function ChatMessage({ message }: { message: Message }) {
    const isModel = message.role === 'model';
    const animatedContent = useTypewriter(message.content, 10);
    
    return (
        <div className={cn("flex items-start gap-3", isModel ? "justify-start" : "justify-end")}>
            {isModel && (
                <Avatar className="h-8 w-8">
                    <AvatarFallback><Bot /></AvatarFallback>
                </Avatar>
            )}
            <div
                className={cn(
                    "max-w-xs rounded-lg px-4 py-2 text-sm",
                    isModel ? "bg-secondary" : "bg-primary text-primary-foreground"
                )}
            >
                {isModel ? animatedContent : message.content}
            </div>
            {!isModel && (
                <Avatar className="h-8 w-8">
                    <AvatarFallback><User /></AvatarFallback>
                </Avatar>
            )}
        </div>
    );
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setIsOpen(prev => !prev);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const chatHistory = [...messages, userMessage];

    const response = await handlePortfolioChat({ message: input, history: chatHistory });
    
    if (response.error) {
        toast({
            variant: "destructive",
            title: "Chatbot Error",
            description: response.error,
        });
         setMessages(prev => [...prev, {role: 'model', content: "Sorry, I ran into an error. Please try again."}]);
    } else if (response.response) {
        setMessages(prev => [...prev, { role: 'model', content: response.response }]);
    }

    setIsLoading(false);
  };
  
    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({
                top: scrollAreaRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [messages]);

  return (
    <>
      <div className={cn("fixed bottom-6 right-6 z-50 transition-transform duration-300 ease-in-out", isOpen ? "scale-0" : "scale-100")}>
        <Button onClick={toggleOpen} size="icon" className="h-16 w-16 rounded-full shadow-lg">
          <Bot className="h-8 w-8" />
          <span className="sr-only">Open Chatbot</span>
        </Button>
      </div>

      <div className={cn(
          "fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] max-w-sm transition-all duration-300 ease-in-out",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      )}>
        <Card className="flex h-[70vh] flex-col shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
                 <Avatar className="h-10 w-10 border-2 border-primary">
                    <AvatarFallback className="bg-transparent"><Sparkles className="h-5 w-5 text-primary" /></AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle className="font-headline text-lg">Shreyan's AI Chatbot</CardTitle>
                    <CardDescription className="text-xs">Ask me anything about this portfolio.</CardDescription>
                </div>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleOpen}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close chat</span>
            </Button>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden p-0">
             <ScrollArea className="h-full" ref={scrollAreaRef}>
                 <div className="p-6 space-y-4">
                    <ChatMessage message={{role: 'model', content: "Hello! I'm Shreyan's AI assistant. How can I help you today?"}} />
                    {messages.map((message, index) => (
                        <ChatMessage key={index} message={message} />
                    ))}
                    {isLoading && (
                       <div className="flex items-start gap-3 justify-start">
                            <Avatar className="h-8 w-8">
                                <AvatarFallback><Bot /></AvatarFallback>
                            </Avatar>
                            <div className="bg-secondary rounded-lg px-4 py-3 text-sm">
                                <Loader2 className="h-4 w-4 animate-spin" />
                            </div>
                        </div>
                    )}
                 </div>
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
              <Input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type a message..."
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={isLoading}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
