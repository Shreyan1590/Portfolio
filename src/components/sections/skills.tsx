import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BrainCircuit, Code, Database, Server, Settings } from "lucide-react";

const skillsData = [
  { category: "Frontend", icon: Code, skills: [
    { name: "React / Next.js", level: 95 },
    { name: "TypeScript", level: 90 },
    { name: "Tailwind CSS", level: 95 },
    { name: "Redux", level: 80 },
  ]},
  { category: "Backend", icon: Server, skills: [
    { name: "Node.js / Express", level: 90 },
    { name: "Python (Django, Flask)", level: 88 },
    { name: "GraphQL", level: 82 },
    { name: "RESTful APIs", level: 95 },
  ]},
  { category: "Databases", icon: Database, skills: [
    { name: "PostgreSQL", level: 85 },
    { name: "MongoDB", level: 90 },
    { name: "Redis", level: 75 },
    { name: "Firebase", level: 80 },
  ]},
  { category: "AI & Machine Learning", icon: BrainCircuit, skills: [
    { name: "Genkit / Firebase GenAI", level: 85 },
    { name: "OpenAI API", level: 90 },
    { name: "LangChain", level: 78 },
    { name: "Data Processing", level: 82 },
  ]},
  { category: "DevOps & Tools", icon: Settings, skills: [
    { name: "Docker & Kubernetes", level: 85 },
    { name: "Git & GitHub Actions", level: 95 },
    { name: "AWS & Vercel", level: 80 },
    { name: "Webpack", level: 75 },
  ]},
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-16 md:py-24">
      <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
        Technical Proficiency
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillsData.map((category) => (
          <Card key={category.category} className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center gap-4">
              <category.icon className="h-8 w-8 text-primary" />
              <CardTitle className="text-2xl font-headline text-primary">{category.category}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {category.skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-foreground">{skill.name}</span>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2 [&>div]:bg-gradient-to-r [&>div]:from-accent [&>div]:to-primary" />
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
