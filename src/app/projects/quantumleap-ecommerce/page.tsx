"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProjectPageHeader } from "@/components/projects/project-page-header";
import { products } from "@/lib/product-data";
import { EcommerceFooter } from "@/components/projects/ecommerce-footer";
import { EcommerceHero } from "@/components/projects/ecommerce-hero";
import { EcommerceCategories } from "@/components/projects/ecommerce-categories";
import { EcommercePromo } from "@/components/projects/ecommerce-promo";

export default function QuantumLeapEcommercePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a020d] via-background to-[#0d021a]">
      <ProjectPageHeader title="QuantumLeap E-commerce" />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <EcommerceHero />

        <EcommerceCategories />

        <div id="new-arrivals" className="text-center mb-12 mt-24">
            <h2 className="text-3xl font-headline font-bold mb-2">New Arrivals</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Check out the latest in cutting-edge tech. Click on any product to see a live demo of our AI-powered description generator.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
            <Card key={product.id} className="flex flex-col overflow-hidden group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 bg-card/50 hover:-translate-y-2 border-border/50 backdrop-blur-sm">
                <CardHeader className="p-0">
                    <div className="relative h-60 w-full overflow-hidden">
                        <Image
                            src={product.image}
                            alt={`Screenshot of ${product.name}`}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            data-ai-hint={product.aiHint}
                        />
                    </div>
                </CardHeader>
                <CardContent className="p-6 flex-grow flex flex-col">
                    <CardTitle className="font-headline text-xl text-primary mb-2">{product.name}</CardTitle>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="flex text-yellow-400">
                           {[...Array(5)].map((_, i) => <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />)}
                        </div>
                        <span className="text-xs text-muted-foreground">({product.reviews} reviews)</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground mb-4">${product.price}</p>
                </CardContent>
                <CardFooter className="bg-secondary/30 p-4">
                     <Button asChild className="w-full">
                        <Link href={`/projects/quantumleap-ecommerce/${product.id}`}>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View Details
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
            ))}
        </div>

        <EcommercePromo />
      </main>
      <EcommerceFooter />
    </div>
  );
}
