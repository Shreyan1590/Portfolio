import { Bot } from "lucide-react";
import Link from "next/link";

export function EcommerceFooter() {
  return (
    <footer className="border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
             <a href="#" className="mr-6 flex items-center space-x-2 mb-4">
                <Bot className="h-6 w-6 text-primary" />
                <span className="font-bold font-headline text-lg sm:inline-block">
                QuantumLeap
                </span>
            </a>
            <p className="text-muted-foreground text-sm max-w-md">Your one-stop shop for the latest and greatest in technology and gadgets. Experience the future, today.</p>
          </div>
          <div>
            <h3 className="font-headline font-semibold text-foreground mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-primary">New Arrivals</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Best Sellers</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">On Sale</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">All Products</Link></li>
            </ul>
          </div>
           <div>
            <h3 className="font-headline font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-primary">FAQ</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Contact Us</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Shipping & Returns</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Track Order</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border/50 pt-6 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} QuantumLeap E-commerce. A demo project by Shreyan S.</p>
        </div>
      </div>
    </footer>
  );
}
