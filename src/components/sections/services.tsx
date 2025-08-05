import { Rocket, Code, BrainCircuit } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

const servicesData = [
  {
    title: "AI Feature Integration",
    description: "I can help you build and integrate cutting-edge AI features into your existing applications using modern tools like Genkit and LangChain.",
    icon: BrainCircuit,
  },
  {
    title: "Full-Stack Web Development",
    description: "From concept to deployment, I offer end-to-end web development services, creating scalable and high-performance applications.",
    icon: Code,
  },
  {
    title: "Technical Consulting & Architecture",
    description: "Need guidance on your tech stack or application architecture? I provide expert consulting to ensure your project is built for success.",
    icon: Rocket,
  },
];

export function ServicesSection() {
    const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="services" className="py-16 md:py-24 bg-secondary/20" ref={ref}>
      <div
        className={cn(
          "transition-opacity duration-1000 ease-out will-change-transform-opacity",
          inView ? "animate-fade-in-up" : "opacity-0"
        )}
      >
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          What I Offer
        </h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <Card
              key={service.title}
              className="bg-card/50 border-border/50 backdrop-blur-sm text-center flex flex-col items-center p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/20 hover:-translate-y-2"
            >
              <CardHeader className="p-0 mb-4">
                <div className="p-4 bg-accent/10 rounded-full inline-block transition-transform duration-300 group-hover:scale-110">
                  <service.icon className="h-10 w-10 text-accent" />
                </div>
              </CardHeader>
              <CardContent className="p-0 flex flex-col flex-grow">
                <CardTitle className="text-lg font-headline text-accent mb-2">{service.title}</CardTitle>
                <CardDescription className="text-muted-foreground text-sm">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
