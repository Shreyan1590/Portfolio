import Image from "next/image";

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
        <div className="md:col-span-2">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">
            About Me
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Hello! I'm Shreyan, a software engineer with a knack for building beautiful, high-performing web applications. My journey into tech started with a fascination for how things work, which quickly evolved into a passion for coding and problem-solving.
            </p>
            <p>
              With a strong foundation in computer science principles, I specialize in full-stack development, bringing ideas to life from concept to deployment. I thrive in collaborative environments and am always eager to learn new technologies and take on challenging projects.
            </p>
            <p>
              When I'm not coding, you can find me exploring new hiking trails, experimenting with new recipes in the kitchen, or diving into a good sci-fi novel.
            </p>
          </div>
        </div>
        <div className="relative h-80 w-full rounded-lg overflow-hidden group">
          <Image
            src="https://placehold.co/400x500.png"
            alt="A portrait of Shreyan S."
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 group-hover:scale-105"
            data-ai-hint="professional portrait"
          />
        </div>
      </div>
    </section>
  );
}
