import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function EcommercePromo() {
    return (
        <section className="my-24 bg-gradient-to-r from-primary to-accent text-primary-foreground p-12 rounded-lg flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
                <h2 className="text-3xl font-headline font-bold mb-2">Join Our Newsletter</h2>
                <p className="opacity-80 max-w-lg">Get the latest updates on new products, special offers, and exclusive tech insights delivered right to your inbox.</p>
            </div>
            <div className="flex-shrink-0">
                <Button size="lg" variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                    Sign Up Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
            </div>
        </section>
    )
}
