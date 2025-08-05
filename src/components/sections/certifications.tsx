import { Award, Building, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const certificationsData = [
  {
    title: "Google Certified Professional - AI Engineer",
    issuer: "Google Cloud",
    date: "Dec 2023",
    icon: Award,
  },
  {
    title: "Certified Kubernetes Application Developer (CKAD)",
    issuer: "The Linux Foundation",
    date: "Jun 2023",
    icon: Award,
  },
  {
    title: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    date: "Aug 2022",
    icon: Award,
  },
];

export function CertificationsSection() {
  return (
    <section id="certifications" className="py-16 md:py-24">
      <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
        Certifications & Credentials
      </h2>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {certificationsData.map((cert) => (
          <Card key={cert.title} className="bg-card/50 border-border/50 backdrop-blur-sm text-center flex flex-col items-center p-6 transition-all duration-300 hover:border-accent hover:shadow-2xl hover:shadow-accent/20">
            <CardHeader className="p-0 mb-4">
              <div className="p-4 bg-accent/10 rounded-full inline-block">
                <cert.icon className="h-10 w-10 text-accent" />
              </div>
            </CardHeader>
            <CardContent className="p-0 flex flex-col flex-grow justify-center">
              <CardTitle className="text-lg font-headline text-accent mb-2">{cert.title}</CardTitle>
              <div className="text-muted-foreground text-sm space-y-1">
                <div className="flex items-center justify-center gap-2">
                  <Building className="h-4 w-4" />
                  <span>{cert.issuer}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{cert.date}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
