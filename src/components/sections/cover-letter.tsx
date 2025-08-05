import { CoverLetterForm } from "@/components/cover-letter-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot } from "lucide-react";

export function CoverLetterSection() {
  return (
    <section id="ai-tool" className="py-16 md:py-24">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">
          AI Cover Letter Generator
        </h2>
        <p className="max-w-2xl mx-auto text-muted-foreground mb-12">
          Leverage the power of AI to generate a personalized cover letter. Just paste your resume details and the job description below.
        </p>
      </div>
      <Card className="max-w-4xl mx-auto bg-card/50">
        <CardHeader className="flex flex-row items-center gap-4">
          <Bot className="h-8 w-8 text-primary" />
          <div>
            <CardTitle className="font-headline text-xl">Generate a Custom Cover Letter</CardTitle>
            <CardDescription>Fill in the fields below to get started.</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <CoverLetterForm />
        </CardContent>
      </Card>
    </section>
  );
}
