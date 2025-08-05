import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const skillsData = [
  { category: "Languages", skills: [
    { name: "Python", level: 95 },
    { name: "JavaScript", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "SQL", level: 80 },
  ]},
  { category: "Frameworks & Libraries", skills: [
    { name: "React / Next.js", level: 95 },
    { name: "Node.js / Express", level: 90 },
    { name: "Django", level: 80 },
    { name: "Tailwind CSS", level: 95 },
  ]},
  { category: "Tools & Platforms", skills: [
    { name: "Git & GitHub", level: 95 },
    { name: "Docker", level: 85 },
    { name: "AWS", level: 75 },
    { name: "Vercel", level: 90 },
  ]},
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-16 md:py-24">
      <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">
        Technical Skills
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillsData.map((category) => (
          <Card key={category.category} className="bg-secondary/20 border-border/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-headline text-primary">{category.category}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {category.skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-foreground">{skill.name}</span>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2 [&>div]:bg-primary" />
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
