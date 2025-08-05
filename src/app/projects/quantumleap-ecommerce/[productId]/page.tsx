"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Sparkles, Loader2, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { handleGenerateProductDescription } from "@/app/actions";
import { ProjectPageHeader } from "@/components/projects/project-page-header";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { products } from "@/lib/product-data";
import { notFound } from "next/navigation";


export default function ProductDetailPage({ params }: { params: { productId: string } }) {
  const product = products.find(p => p.id === params.productId);

  const [description, setDescription] = useState("Select the features you want to highlight and click the button below to generate a new product description with AI!");
  const [isLoading, setIsLoading] = useState(false);
  
  if (!product) {
    notFound();
  }
  
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(product.features);
  const { toast } = useToast();

  const handleFeatureToggle = (feature: string) => {
    setSelectedFeatures(prev =>
      prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]
    );
  };

  async function generateDescription() {
    if (selectedFeatures.length === 0) {
        toast({
            variant: "destructive",
            title: "No Features Selected",
            description: "Please select at least one feature to generate a description.",
        });
        return;
    }
    setIsLoading(true);
    const response = await handleGenerateProductDescription({ productName: product.name, features: selectedFeatures });

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
    <div className="min-h-screen bg-gradient-to-br from-[#1a020d] via-background to-[#0d021a]">
      <ProjectPageHeader title={product.name} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
          <CardContent className="p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
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
                           {[...Array(5)].map((_, i) => <Star key={i} className={`h-5 w-5 ${i < product.rating ? 'fill-current' : ''}`} />)}
                        </div>
                        <span className="text-muted-foreground">({product.reviews} reviews)</span>
                    </div>
                    <p className="text-4xl font-bold text-primary mb-6">${product.price}</p>
                    
                    <div className="mb-6">
                        <h3 className="font-headline text-lg mb-3">Highlight Features:</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {product.features.map(feature => (
                                <div key={feature} className="flex items-center space-x-2">
                                <Checkbox 
                                    id={feature} 
                                    checked={selectedFeatures.includes(feature)} 
                                    onCheckedChange={() => handleFeatureToggle(feature)}
                                />
                                <Label htmlFor={feature} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    {feature}
                                </Label>
                                </div>
                            ))}
                        </div>
                    </div>


                    <Card className="bg-secondary/20 mb-6">
                        <CardHeader className="py-4">
                            <CardTitle className="flex items-center gap-2 font-headline text-lg"><Bot/> AI-Generated Description</CardTitle>
                        </CardHeader>
                        <CardContent className="min-h-[6rem] pt-0">
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
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
