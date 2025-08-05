import { ContactForm } from "@/components/contact-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ContactSection() {
  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl md:text-4xl font-headline font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Get In Touch
            </CardTitle>
            <CardDescription className="max-w-xl mx-auto">
              Have a project in mind, a question, or just want to connect? Drop me a message below and I'll get back to you as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
