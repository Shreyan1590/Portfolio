import { Briefcase } from "lucide-react";

const experienceData = [
  {
    role: "Lead AI Engineer",
    company: "Nexus AI",
    period: "2022 - Present",
    description: "Architected and led the development of a generative AI platform, integrating multiple LLMs to serve over 10,000 users. Improved model response times by 40% through advanced caching and quantization techniques.",
  },
  {
    role: "Senior Software Engineer",
    company: "TechCorp",
    period: "2020 - 2022",
    description: "Led the development of a high-traffic e-commerce platform, improving performance by 30%. Mentored junior engineers and championed best practices in code quality and testing using React and Node.js.",
  },
  {
    role: "Software Engineer",
    company: "Innovate Inc.",
    period: "2018 - 2020",
    description: "Developed and maintained features for a SaaS product using React and Django. Collaborated in an agile team to deliver features on a bi-weekly sprint cycle, contributing to a 20% increase in user engagement.",
  },
    {
    role: "Software Engineer Intern",
    company: "Data Solutions",
    period: "Summer 2017",
    description: "Assisted in building a data processing pipeline using Python and SQL, which helped automate internal reporting and saved hundreds of hours annually.",
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="py-16 md:py-24">
      <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
        Career Journey
      </h2>
      <div className="relative max-w-3xl mx-auto">
        <div className="absolute left-4 md:left-1/2 -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary/50 via-accent/50 to-primary/50"></div>
        {experienceData.map((item, index) => (
          <div key={index} className="relative pl-12 md:pl-0 mb-12 flex items-center md:justify-center">
            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 bg-background border-2 border-primary rounded-full p-2 z-10">
              <Briefcase className="h-5 w-5 text-primary" />
            </div>
            <div
              className={`md:w-[calc(50%-2rem)] p-6 bg-card rounded-lg shadow-lg border-l-4 md:border-l-0 ${
                index % 2 === 0 ? "md:border-l-4 border-primary" : "md:border-r-4 md:text-right border-accent"
              }`}
               style={{'marginLeft': index % 2 === 0 ? '0' : 'auto', 'marginRight': index % 2 === 0 ? 'auto' : '0'}}
            >
              <h3 className="text-xl font-headline font-semibold text-primary">{item.role}</h3>
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
