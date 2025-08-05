import Image from "next/image";

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-center">
        <div className="md:col-span-3">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            About Me
          </h2>
          <div className="space-y-4 text-muted-foreground text-lg">
            <p>
              I'm a results-oriented Software Engineer with a passion for developing scalable, high-impact web applications and AI-powered features. With a solid background in full-stack development, I excel at architecting and implementing robust solutions from the ground up.
            </p>
            <p>
              My expertise lies in the MERN stack, complemented by extensive experience with modern frameworks like Next.js and Python for backend and AI development. I'm driven by a desire to continuously learn and apply new technologies to solve real-world problems, always aiming for clean, efficient, and maintainable code.
            </p>
            <p>
              Beyond the code, I'm a strategic thinker and a collaborative team player. I'm adept at bridging the gap between technical and business requirements to deliver products that not only function flawlessly but also drive user engagement and achieve business goals.
            </p>
          </div>
        </div>
        <div className="md:col-span-2 relative h-96 w-full rounded-lg overflow-hidden group shadow-2xl shadow-primary/20">
           <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-accent/50 opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
          <Image
            src="https://placehold.co/400x500.png"
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
