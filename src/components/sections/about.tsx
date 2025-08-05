import Image from "next/image";

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 fade-in-up">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-center">
        <div className="md:col-span-3">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            About Me
          </h2>
          <div className="space-y-4 text-muted-foreground text-lg">
            <p>
              I am an 18-year-old B.Tech student at Saveetha Institute of Medical And Technical Sciences. I really enjoy solving problems and making things pretty and easy to use. I can't stop learning new things; the more, the better.
            </p>
            <p>
              With over 2 years of experience in Web Development, I've helped startups and enterprises build scalable, performant applications that deliver real business value.
            </p>
            <p>
             My approach combines technical excellence with user-centered design principles to create solutions that are both powerful and intuitive.
            </p>
          </div>
        </div>
        <div className="md:col-span-2 relative h-96 w-full rounded-lg overflow-hidden group shadow-2xl shadow-primary/20">
           <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-accent/50 opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
          <Image
            src="/portrait.png"
            alt="A portrait of Shreyan S."
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 group-hover:scale-110"
            data-ai-hint="professional portrait"
          />
        </div>
      </div>
    </section>
  );
}
