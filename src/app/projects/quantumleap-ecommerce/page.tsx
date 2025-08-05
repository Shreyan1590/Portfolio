"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, ExternalLink, Bot, Sparkles, Loader2, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { handleGenerateProductDescription } from "@/app/actions";

const product = {
    name: "Aura Pro Wireless Earbuds",
    image: "https://placehold.co/800x800.png",
    price: 149.99,
    rating: 4.8,
    reviews: 256,
    features: ["Active Noise Cancellation", "30-Hour Battery Life", "IPX7 Waterproof", "Bluetooth 5.2", "Wireless Charging"],
    aiHint: "sleek wireless earbuds"
}

export default function QuantumLeapEcommercePage() {
  const [description, setDescription] = useState("Click the button below to generate a new product description with AI!");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const project = {
    title: "QuantumLeap E-commerce",
    description: "A full-featured e-commerce platform built with a modern stack, focusing on performance, scalability, and providing an exceptional user experience with features like real-time inventory, secure payments, and personalized recommendations.",
    stack: ["Next.js", "GraphQL", "Stripe", "PostgreSQL", "Tailwind CSS", "Redis"],
    repoUrl: "#",
  };

  async function generateDescription() {
    setIsLoading(true);
    const response = await handleGenerateProductDescription({ productName: product.name, features: product.features });

    if (response.error) {
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: response.error,
      });
    } else if (response.description) {
      setDescription(response.description);
      toast({
        title: "Success!",
        description: "New product description generated.",
      });
    }
    setIsLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a020d] via-background to-[#0d021a] py-12 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
          <CardHeader className="text-center">
            <Button variant="link" asChild className="mb-4">
              <Link href="/#projects">← Back to Projects</Link>
            </Button>
            <CardTitle className="text-4xl md:text-5xl font-headline font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              {project.title}
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground mt-2">
              Live Demo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
                <div className="relative h-96 md:h-full w-full rounded-lg overflow-hidden group shadow-2xl shadow-primary/20">
                  <Image
                    src={product.image}
                    alt={`Image of ${product.name}`}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint={product.aiHint}
                  />
                </div>
                <div className="flex flex-col justify-center">
                    <h1 className="text-3xl font-bold font-headline mb-2">{product.name}</h1>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="flex text-yellow-400">
                           {[...Array(5)].map((_, i) => <Star key={i} className={`h-5 w-5 ${i < 4 ? 'fill-current' : ''}`} />)}
                        </div>
                        <span className="text-muted-foreground">({product.reviews} reviews)</span>
                    </div>
                    <p className="text-4xl font-bold text-primary mb-6">${product.price}</p>
                    
                    <Card className="bg-secondary/20 mb-6">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 font-headline text-lg"><Bot/> AI-Generated Description</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {isLoading ? (
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span>Generating...</span>
                                </div>
                            ) : (
                                <p className="text-muted-foreground">{description}</p>
                            )}
                        </CardContent>
                    </Card>

                    <div className="space-y-4">
                        <Button onClick={generateDescription} disabled={isLoading} size="lg" className="w-full">
                            <Sparkles className="mr-2 h-4 w-4" />
                            Generate New Description
                        </Button>
                        <Button size="lg" variant="outline" className="w-full">
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Add to Cart
                        </Button>
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto mt-12">
              <h3 className="text-3xl font-headline font-bold text-center mb-8">About This Project</h3>
              <p className="text-lg text-muted-foreground mb-6">{project.description}</p>
              
              <div className="mb-8">
                <h3 className="text-2xl font-headline font-semibold text-primary mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-base px-4 py-2">{tech}</Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-center gap-4">
                 <Button variant="ghost" size="lg" asChild>
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-5 w-5" />
                    View Code
                  </a>
                </Button>
                <Button size="lg" disabled>
                  <ExternalLink className="mr-2 h-5 w-5" />
                  You are viewing the demo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
