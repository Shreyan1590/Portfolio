import { GraduationCap, School, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const educationData = [
  {
    degree: "Master of Science in Computer Science",
    university: "Stanford University",
    period: "2016 - 2018",
    specialization: "Specialization in Artificial Intelligence",
  },
  {
    degree: "Bachelor of Science in Software Engineering",
    university: "University of California, Berkeley",
    period: "2012 - 2016",
    specialization: "Graduated with High Honors",
  },
];

export function EducationSection() {
  return (
    <section id="education" className="py-16 md:py-24">
      <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
        Education
      </h2>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {educationData.map((edu) => (
          <Card key={edu.degree} className="bg-card/50 border-border/50 backdrop-blur-sm p-6 transition-all duration-300 hover:border-accent hover:shadow-2xl hover:shadow-accent/20">
            <CardHeader className="p-0 mb-4 flex flex-row items-center gap-4">
              <div className="p-3 bg-accent/10 rounded-full">
                <GraduationCap className="h-8 w-8 text-accent" />
              </div>
              <div>
                <CardTitle className="text-xl font-headline text-accent">{edu.degree}</CardTitle>
                <p className="text-sm text-muted-foreground">{edu.specialization}</p>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="text-muted-foreground text-sm space-y-2">
                <div className="flex items-center gap-2">
                  <School className="h-4 w-4" />
                  <span>{edu.university}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{edu.period}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
