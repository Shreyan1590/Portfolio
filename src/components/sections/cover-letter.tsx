
import { CoverLetterForm } from "@/components/cover-letter-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, FileText, Voicemail } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResumeAnalyzerForm } from "../resume-analyzer-form";
import { TextToSpeechForm } from "../text-to-speech-form";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

export function CoverLetterSection() {
    const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="ai-tool" className="py-16 md:py-24" ref={ref}>
      <div
        className={cn(
          "transition-opacity duration-1000 ease-out will-change-transform-opacity",
          inView ? "animate-fade-in-up" : "opacity-0"
        )}
      >
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            AI-Powered Tools
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mb-12">
            Explore a collection of AI-powered utilities I've built. From generating cover letters to analyzing resumes, these tools showcase my ability to create practical, intelligent applications.
          </p>
        </div>
        <Tabs defaultValue="cover-letter" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="cover-letter">
              <FileText className="mr-2 h-4 w-4" />
              Cover Letter
            </TabsTrigger>
            <TabsTrigger value="resume-analyzer">
              <Bot className="mr-2 h-4 w-4" />
              Resume Analyzer
            </TabsTrigger>
            <TabsTrigger value="tts">
              <Voicemail className="mr-2 h-4 w-4" />
              Text-to-Speech
            </TabsTrigger>
          </TabsList>
          <TabsContent value="cover-letter">
            <Card className="bg-secondary/20">
              <CardHeader>
                <CardTitle className="font-headline text-xl">AI Cover Letter Generator</CardTitle>
                <CardDescription>Leverage AI to generate a personalized cover letter. Just paste your resume details and the job description below.</CardDescription>
              </CardHeader>
              <CardContent>
                <CoverLetterForm />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="resume-analyzer">
            <Card className="bg-secondary/20">
              <CardHeader>
                <CardTitle className="font-headline text-xl">AI Resume Analyzer</CardTitle>
                <CardDescription>Get instant feedback on how your resume stacks up against a job description. The AI will provide a match score, strengths, weaknesses, and suggestions.</CardDescription>
              </CardHeader>
              <CardContent>
                <ResumeAnalyzerForm />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tts">
            <Card className="bg-secondary/20">
              <CardHeader>
                <CardTitle className="font-headline text-xl">Text-to-Speech Generator</CardTitle>
                <CardDescription>Convert text into natural-sounding speech. Select a voice and enter any text to generate an audio clip.</CardDescription>
              </CardHeader>
              <CardContent>
                <TextToSpeechForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
