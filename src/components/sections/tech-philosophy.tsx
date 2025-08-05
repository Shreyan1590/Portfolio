import { CheckCircle, Zap, Scale } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

const principles = [
  {
    title: "Pragmatic & Purpose-Driven",
    description: "I choose technologies that best solve the problem at hand, not just what's new and shiny. The goal is to deliver value and create robust, maintainable systems.",
    icon: CheckCircle
  },
  {
    title: "Performance by Default",
    description: "User experience is paramount. I build applications with performance as a core principle, leveraging modern frameworks and architectures to create fast, responsive interfaces.",
    icon: Zap
  },
  {
    title: "Scalability for the Future",
    description: "I architect systems with growth in mind. By using scalable technologies and cloud-native principles, I ensure that applications can handle increasing load and complexity.",
    icon: Scale
  }
];

export function TechPhilosophySection() {
    const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="tech-philosophy" className="py-16 md:py-24" ref={ref}>
      <div
        className={cn(
          "transition-opacity duration-1000 ease-out will-change-transform-opacity",
          inView ? "animate-fade-in-up" : "opacity-0"
        )}
      >
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          My Technology Philosophy
        </h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {principles.map((principle, index) => (
            <div key={principle.title} className="text-center p-6 bg-card/50 border border-border/50 rounded-lg backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2">
              <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                <principle.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-headline font-semibold text-primary mb-2">{principle.title}</h3>
              <p className="text-muted-foreground text-sm">{principle.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
