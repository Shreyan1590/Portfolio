import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function EcommerceHero() {
    return (
        <div className="relative rounded-lg overflow-hidden mb-24">
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src="https://placehold.co/1200x500/1a020d/34560%
45.png?text="
                    alt="Abstract background for featured product"
                    layout="fill"
                    objectFit="cover"
                    className="opacity-20"
                    data-ai-hint="abstract technology background"
                />
                 <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
            </div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative grid md:grid-cols-2 gap-8 items-center py-20 md:py-32 text-center md:text-left">
                    <div className="md:col-span-2">
                        <h1 className="text-4xl sm:text-5xl font-headline font-bold text-primary mb-4">
                           The Future of Tech is Here
                        </h1>
                        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto md:mx-0">
                            Welcome to QuantumLeap, your destination for the latest and greatest in cutting-edge gadgets. Discover innovation, quality, and style in every product.
                        </p>
                        <Button asChild size="lg">
                            <Link href="#new-arrivals">
                                Shop All Products
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
