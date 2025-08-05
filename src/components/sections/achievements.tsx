import { Trophy, Award, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const achievementsData = [
  {
    title: "Innovator of the Year",
    issuer: "TechCorp",
    date: "2021",
    description: "Awarded for designing and implementing the AI-powered recommendation engine.",
    icon: Trophy,
  },
  {
    title: "Global Hackathon Winner (1st Place)",
    issuer: "AI for Good Foundation",
    date: "2022",
    description: "Developed a prototype for an accessible learning platform for disabled students.",
    icon: Award,
  },
  {
    title: "Top Performer Award",
    issuer: "Nexus AI",
    date: "2023",
    description: "Recognized for outstanding performance and contributions to the core platform.",
    icon: Zap,
  },
];

export function AchievementsSection() {
  return (
    <section id="achievements" className="py-16 md:py-24 bg-secondary/20">
      <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
        Awards & Recognition
      </h2>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {achievementsData.map((achievement) => (
          <Card key={achievement.title} className="bg-card/50 border-border/50 backdrop-blur-sm text-center flex flex-col items-center p-6 transition-all duration-300 hover:border-primary hover:shadow-2xl hover:shadow-primary/20">
            <CardHeader className="p-0 mb-4">
              <div className="p-4 bg-primary/10 rounded-full inline-block">
                <achievement.icon className="h-10 w-10 text-primary" />
              </div>
            </CardHeader>
            <CardContent className="p-0 flex flex-col flex-grow">
              <CardTitle className="text-lg font-headline text-primary mb-2">{achievement.title}</CardTitle>
              <p className="text-sm font-semibold text-foreground">{achievement.issuer} - {achievement.date}</p>
              <p className="text-muted-foreground text-sm mt-2">{achievement.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
