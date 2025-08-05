import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

const blogData = [
  {
    title: "The Rise of Generative AI in Web Development",
    description: "Exploring how large language models and diffusion models are changing the landscape of web and application development.",
    image: "https://placehold.co/600x400.png",
    tags: ["AI", "Web Dev", "Genkit"],
    url: "#",
    aiHint: "robot writing code"
  },
  {
    title: "Optimizing Next.js Applications for Performance",
    description: "A deep dive into server components, image optimization, and other techniques for building lightning-fast Next.js apps.",
    image: "https://placehold.co/600x400.png",
    tags: ["Next.js", "Performance", "React"],
    url: "#",
    aiHint: "fast loading website"
  },
  {
    title: "My Journey into Kubernetes and Cloud-Native",
    description: "From Docker containers to orchestrating complex microservices with Kubernetes, here are my key learnings.",
    image: "https://placehold.co/600x400.png",
    tags: ["Kubernetes", "DevOps", "Cloud"],
    url: "#",
    aiHint: "cloud infrastructure"
  },
];

export function BlogSection() {
    const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="blog" className="py-16 md:py-24" ref={ref}>
      <div
        className={cn(
          "transition-opacity duration-1000 ease-out will-change-transform-opacity",
          inView ? "animate-fade-in-up" : "opacity-0"
        )}
      >
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          From My Blog
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogData.map((post, index) => (
            <Card key={post.title} className="flex flex-col overflow-hidden group bg-card/50 border-border/50 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2">
              <div className="relative h-48 w-full overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <Image
                  src={post.image}
                  alt={`Blog post image for ${post.title}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  data-ai-hint={post.aiHint}
                />
              </div>
              <CardHeader>
                <CardTitle className="font-headline text-xl text-primary">{post.title}</CardTitle>
                <CardDescription>{post.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="bg-secondary/30 p-4">
                <Button variant="link" asChild className="p-0 h-auto">
                  <a href={post.url} target="_blank" rel="noopener noreferrer">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
