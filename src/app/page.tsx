import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { SkillsSection } from "@/components/sections/skills";
import { ExperienceSection } from "@/components/sections/experience";
import { ProjectsSection } from "@/components/sections/projects";
import { CoverLetterSection } from "@/components/sections/cover-letter";
import { CertificationsSection } from "@/components/sections/certifications";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1a020d] via-background to-[#0d021a]">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AboutSection />
          <SkillsSection />
          <ExperienceSection />
          <ProjectsSection />
          <CertificationsSection />
          <CoverLetterSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
