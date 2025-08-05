import { products } from "@/lib/product-data";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function EcommerceHero() {
    const featuredProduct = products.find(p => p.id === "2"); // Nova Smart Watch

    if (!featuredProduct) return null;

    return (
        <div className="relative rounded-lg overflow-hidden mb-24">
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src="https://placehold.co/1200x500.png"
                    alt="Abstract background for featured product"
                    layout="fill"
                    objectFit="cover"
                    className="opacity-20"
                    data-ai-hint="abstract technology background"
                />
                 <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
            </div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative grid md:grid-cols-2 gap-8 items-center py-12 md:py-24">
                    <div>
                        <h1 className="text-4xl sm:text-5xl font-headline font-bold text-primary mb-4">
                            {featuredProduct.name}
                        </h1>
                        <p className="text-lg text-muted-foreground mb-8">
                            Stay connected and track your fitness with the most advanced smartwatch on the market. Precision, style, and intelligence—all on your wrist.
                        </p>
                        <Button asChild size="lg">
                            <Link href={`/projects/quantumleap-ecommerce/${featuredProduct.id}`}>
                                Learn More
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                     <div className="relative h-80 w-full">
                         <Image
                            src={featuredProduct.image}
                            alt={featuredProduct.name}
                            layout="fill"
                            objectFit="contain"
                            className="drop-shadow-[0_20px_20px_rgba(var(--primary-rgb),0.2)]"
                            data-ai-hint={featuredProduct.aiHint}
                         />
                    </div>
                </div>
            </div>
        </div>
    );
}
