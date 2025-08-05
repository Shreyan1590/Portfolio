import { CheckCircle, Zap, Scale } from "lucide-react";

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
  return (
    <section id="tech-philosophy" className="py-16 md:py-24">
      <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
        My Technology Philosophy
      </h2>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {principles.map((principle) => (
          <div key={principle.title} className="text-center p-6 bg-card/50 border border-border/50 rounded-lg backdrop-blur-sm">
            <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
              <principle.icon className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-headline font-semibold text-primary mb-2">{principle.title}</h3>
            <p className="text-muted-foreground text-sm">{principle.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
