import { BookOpen, GraduationCap, School } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

const experienceData = [
  {
    role: "AI-Based Error Detection System using JS",
    company: "A Project based on Artificial Intelligence",
    period: "2025",
    description: "An AI-driven industrial monitoring system developed to analyze equipment vibration patterns, thermal signatures, and pressure readings to detect potential failures. The system provides early warnings, visual health assessments, and maintenance recommendations, optimizing schedules and improving equipment effectiveness by 18%.",
    icon: BookOpen,
  },
  {
    role: "Energy Consumption Prediction for Accurate Forecasting",
    company: "Published in International Journal of Energy Research (IJER)",
    period: "2025",
    description: "Developed a predictor using Random Forest (89.5% accuracy) and KNN (83.2% accuracy) to reduce prediction errors by 22% versus traditional methods. Implemented in campus smart buildings, it achieved a 15% reduction in energy waste through data-driven load optimization.",
    icon: BookOpen,
  },
   {
    role: "Cyber Security Certification",
    company: "LinkedIn Learning",
    period: "Completed 2025",
    description: "Completed 5+ hour course covering network security, data protection, identity management, incident response, and emerging areas like AI security and Cloud security.",
    icon: BookOpen,
  },
  {
    role: "Bachelor of Technology in Computer Science",
    company: "SIMATS School of Engineering, Saveetha University",
    period: "2024 - Present",
    description: "Specializing in Artificial Intelligence and Full Stack Development. Current CGPA: 8.38/10",
    icon: GraduationCap,
  },
  {
    role: "Higher Secondary Education (HSE)",
    company: "Sree Narayana Guru Matric Higher Secondary School - Kanchipuram",
    period: "2022 - 2024",
    description: "",
    icon: School,
  },
  {
    role: "Secondary School Leaving Certificate (SSLC)",
    company: "Sree Narayana Guru Matric Higher Secondary School - Kanchipuram",
    period: "2021 - 2022",
    description: "",
    icon: School,
  },
];

export function ExperienceSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="experience" className="py-16 md:py-24" ref={ref}>
      <div
        className={cn(
          "transition-opacity duration-1000 ease-out will-change-transform-opacity",
          inView ? "animate-fade-in-up" : "opacity-0"
        )}
      >
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          Career Journey
        </h2>
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-4 md:left-1/2 -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary/50 via-accent/50 to-primary/50"></div>
          {experienceData.map((item, index) => (
            <div key={index} className="relative pl-12 md:pl-0 mb-12 flex items-center w-full">
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 bg-background border-2 border-primary rounded-full p-2 z-10">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <div
                className={`w-full md:w-1/2 p-6 bg-card rounded-lg shadow-lg border-l-4 md:border-l-0 transition-all duration-300 hover:shadow-2xl hover:border-accent ${
                  index % 2 === 0 ? "md:pr-8 md:border-r-4 md:border-primary" : "md:pl-8 md:text-right md:border-l-4 md:border-accent"
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
      </div>
    </section>
  );
}
