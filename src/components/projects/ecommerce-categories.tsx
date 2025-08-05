import { Card } from "@/components/ui/card";
import { Headphones, Watch, Keyboard, Projector } from "lucide-react";
import Link from "next/link";

const categories = [
    { name: "Wearables", icon: Watch, href: "#" },
    { name: "Audio", icon: Headphones, href: "#" },
    { name: "Peripherals", icon: Keyboard, href: "#" },
    { name: "Projectors", icon: Projector, href: "#" },
];

export function EcommerceCategories() {
    return (
        <section className="mb-24">
            <h2 className="text-3xl font-headline font-bold text-center mb-8">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                {categories.map((category) => (
                    <Link href={category.href} key={category.name}>
                        <Card className="p-6 flex flex-col items-center justify-center aspect-square text-center bg-card/50 border-border/50 backdrop-blur-sm hover:bg-primary/10 hover:border-primary transition-all duration-300">
                           <category.icon className="h-12 w-12 text-primary mb-4" />
                           <h3 className="font-headline font-semibold text-lg">{category.name}</h3>
                        </Card>
                    </Link>
                ))}
            </div>
        </section>
    )
}
