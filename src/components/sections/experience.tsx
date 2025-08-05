import { Briefcase } from "lucide-react";

const experienceData = [
  {
    role: "Senior Software Engineer",
    company: "TechCorp",
    period: "2021 - Present",
    description: "Led the development of a high-traffic e-commerce platform, improving performance by 30%. Mentored junior engineers and championed best practices in code quality and testing.",
  },
  {
    role: "Software Engineer",
    company: "Innovate Inc.",
    period: "2019 - 2021",
    description: "Developed and maintained features for a SaaS product using React and Django. Collaborated in an agile team to deliver features on a bi-weekly sprint cycle.",
  },
  {
    role: "Software Engineer Intern",
    company: "Data Solutions",
    period: "Summer 2018",
    description: "Assisted in building a data processing pipeline using Python and SQL, which helped automate internal reporting and saved hundreds of hours annually.",
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="py-16 md:py-24">
      <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">
        Professional Experience
      </h2>
      <div className="relative max-w-2xl mx-auto">
        <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-border"></div>
        {experienceData.map((item, index) => (
          <div key={index} className="relative mb-12">
            <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background border-2 border-primary rounded-full p-2">
              <Briefcase className="h-5 w-5 text-primary" />
            </div>
            <div
              className={`w-[calc(50%-2rem)] p-6 bg-card rounded-lg shadow-md ${
                index % 2 === 0 ? "float-left" : "float-right"
              }`}
            >
              <h3 className="text-lg font-headline font-semibold text-primary">{item.role}</h3>
              <p className="font-semibold text-foreground mb-1">{item.company}</p>
              <p className="text-xs text-muted-foreground mb-3">{item.period}</p>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          </div>
        ))}
        <div className="clear-both"></div>
      </div>
    </section>
  );
}
