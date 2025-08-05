import { BookOpen, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const researchData = [
  {
    title: "AI-Based Error Detection System using JS",
    year: "2025",
    journal: "A Project based on Artificial Intelligence",
    description: "An AI-driven industrial monitoring system developed to analyze equipment vibration patterns, thermal signatures, and pressure readings to detect potential failures. The system provides early warnings, visual health assessments, and maintenance recommendations, optimizing schedules and improving equipment effectiveness by 18%.",
    icon: FileText
  },
  {
    title: "Energy Consumption Prediction for Accurate Forecasting",
    year: "2025",
    journal: "International Journal of Energy Research (IJER)",
    description: "Developed a predictor using Random Forest (89.5% accuracy) and KNN (83.2% accuracy) to reduce prediction errors by 22% versus traditional methods. Implemented in campus smart buildings, it achieved a 15% reduction in energy waste through data-driven load optimization.",
    icon: BookOpen
  },
];

export function ResearchSection() {
  return (
    <section id="research" className="py-16 md:py-24 bg-secondary/20">
      <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
        Research & Publications
      </h2>
      <div className="max-w-4xl mx-auto space-y-8">
        {researchData.map((item) => (
          <Card key={item.title} className="bg-card/50 border-border/50 backdrop-blur-sm p-6 transition-all duration-300 hover:border-primary hover:shadow-2xl hover:shadow-primary/20">
            <CardHeader className="p-0 flex flex-row items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg mt-1">
                 <item.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="font-headline text-xl text-primary">{item.title}</CardTitle>
                <CardDescription className="font-semibold">{item.journal} &bull; {item.year}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-0 pl-16 pt-4">
              <p className="text-muted-foreground text-sm">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
