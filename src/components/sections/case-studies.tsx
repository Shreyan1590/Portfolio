import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ExternalLink, BarChart, Users, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const caseStudiesData = [
  {
    title: "Generative AI Platform for Enterprise",
    subtitle: "Nexus AI",
    description: "Led the end-to-end development of a secure, scalable generative AI platform. The system integrated multiple LLMs, provided a unified API for developers, and included a user-facing playground. It was built with a microservices architecture on Kubernetes, ensuring high availability and fault tolerance.",
    image: "https://placehold.co/1200x600.png",
    stack: ["Genkit", "Next.js", "Kubernetes", "Python", "PostgreSQL"],
    results: [
      {
        icon: Zap,
        value: "40% faster",
        label: "Model response time"
      },
      {
        icon: Users,
        value: "10k+ users",
        label: "Served at launch"
      },
      {
        icon: BarChart,
        value: "99.9% uptime",
        label: "Achieved in Q1"
      }
    ],
    liveUrl: "#",
    aiHint: "AI dashboard interface"
  }
];

export function CaseStudiesSection() {
  return (
    <section id="case-studies" className="py-16 md:py-24 bg-secondary/20">
      <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
        In-Depth Case Studies
      </h2>
      <div className="max-w-6xl mx-auto">
        {caseStudiesData.map((study) => (
          <div key={study.title} className="bg-card/50 border border-border/50 rounded-xl overflow-hidden shadow-2xl shadow-primary/10">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 md:p-12 order-2 lg:order-1">
                <h3 className="text-2xl md:text-3xl font-headline font-bold text-primary">{study.title}</h3>
                <p className="text-lg text-muted-foreground font-semibold mb-6">{study.subtitle}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {study.stack.map((tech) => (
                    <Badge key={tech} variant="secondary">{tech}</Badge>
                  ))}
                </div>
                <p className="text-muted-foreground mb-8">{study.description}</p>
                <div className="grid grid-cols-3 gap-4 mb-8 text-center">
                  {study.results.map(result => (
                    <div key={result.label}>
                      <result.icon className="h-8 w-8 text-accent mx-auto mb-2" />
                      <p className="text-xl font-bold">{result.value}</p>
                      <p className="text-sm text-muted-foreground">{result.label}</p>
                    </div>
                  ))}
                </div>
                <Button asChild>
                  <a href={study.liveUrl} target="_blank" rel="noopener noreferrer">
                    View Project
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
              <div className="relative min-h-[300px] lg:min-h-0 order-1 lg:order-2">
                <Image
                  src={study.image}
                  alt={`Case study for ${study.title}`}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 hover:scale-105"
                  data-ai-hint={study.aiHint}
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent lg:bg-gradient-to-r" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
