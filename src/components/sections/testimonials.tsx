
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

const testimonialsData = [
  {
    name: "Jane Doe",
    role: "Lead Product Manager, Nexus AI",
    avatar: "https://placehold.co/100x100.png",
    testimonial: "Shreyan is a phenomenal engineer. His ability to translate complex product requirements into robust, scalable AI features was critical to our success. He's a true team player and a pleasure to work with.",
    aiHint: "woman professional"
  },
  {
    name: "John Smith",
    role: "CTO, TechCorp",
    avatar: "https://placehold.co/100x100.png",
    testimonial: "I was consistently impressed by Shreyan's technical depth and leadership. He not only delivered high-quality code but also mentored junior engineers, significantly elevating the team's capabilities.",
    aiHint: "man professional"
  },
  {
    name: "Emily White",
    role: "Engineering Manager, Innovate Inc.",
    avatar: "https://placehold.co/100x100.png",
    testimonial: "Shreyan's problem-solving skills are top-notch. He has a unique talent for tackling difficult challenges with creativity and precision. He was a key asset to our engineering team.",
    aiHint: "woman executive"
  },
];

export function TestimonialsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-secondary/20" ref={ref}>
       <div
        className={cn(
          "transition-opacity duration-1000 ease-out will-change-transform-opacity",
          inView ? "animate-fade-in-up" : "opacity-0"
        )}
      >
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          What Others Say
        </h2>
        <Carousel
          opts={{ align: "start", loop: true }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {testimonialsData.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <Card className="h-full flex flex-col justify-between p-6 bg-card/50 border-border/50 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-accent/20 hover:-translate-y-2">
                    <CardContent className="p-0">
                      <p className="text-muted-foreground italic mb-6">"{testimonial.testimonial}"</p>
                    </CardContent>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.aiHint} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-foreground">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
