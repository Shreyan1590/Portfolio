import { GitFork, Star, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const contributionsData = [
  {
    title: "Genkit",
    description: "Contributed to the core framework by adding a new plugin for a popular vector database, improving developer experience for AI engineers.",
    repo: "google/genkit",
    stars: "1.2k",
    forks: "300",
  },
  {
    title: "Next.js",
    description: "Submitted a performance optimization PR that improved image loading speeds on mobile devices, which was merged into a minor release.",
    repo: "vercel/next.js",
    stars: "110k",
    forks: "25k",
  },
  {
    title: "ShadCN UI",
    description: "Added a new, accessible component to the popular UI library, complete with documentation and test cases.",
    repo: "shadcn/ui",
    stars: "40k",
    forks: "2k",
  },
];

export function OpenSourceSection() {
  return (
    <section id="open-source" className="py-16 md:py-24 fade-in-up">
      <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
        Open Source Contributions
      </h2>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {contributionsData.map((item) => (
          <Card key={item.title} className="bg-card/50 border-border/50 backdrop-blur-sm flex flex-col p-6 transition-all duration-300 hover:border-primary hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="font-headline text-xl text-primary">{item.title}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">{item.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-0 flex-grow space-y-4">
              <div className="flex justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4" /> {item.stars}
                </div>
                <div className="flex items-center gap-1">
                  <GitFork className="h-4 w-4" /> {item.forks}
                </div>
              </div>
              <Button variant="outline" size="sm" asChild className="w-full">
                <a href={`https://github.com/${item.repo}`} target="_blank" rel="noopener noreferrer">
                  <Eye className="mr-2 h-4 w-4" /> View Contribution
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
