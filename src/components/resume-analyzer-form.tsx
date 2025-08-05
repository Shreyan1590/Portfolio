"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, CheckCircle, XCircle, Lightbulb, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { handleAnalyzeResume } from "@/app/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { AnalyzeResumeOutput } from "@/ai/flows/analyze-resume";

const formSchema = z.object({
  resumeInfo: z
    .string()
    .min(100, "Please provide at least 100 characters from your resume."),
  jobDescription: z
    .string()
    .min(100, "Please provide at least 100 characters for the job description."),
});

export function ResumeAnalyzerForm() {
  const [result, setResult] = useState<AnalyzeResumeOutput['analysis'] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resumeInfo: "",
      jobDescription: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    const response = await handleAnalyzeResume(values);

    if (response.error) {
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: response.error,
      });
    } else if (response.analysis) {
      setResult(response.analysis);
      toast({
        title: "Success!",
        description: "Your resume analysis is complete.",
      });
    }
    setIsLoading(false);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="resumeInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Resume / CV Info</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Paste relevant sections from your resume, like your summary, experience, and skills."
                    className="min-h-[150px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="jobDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Paste the full job description you are applying for."
                    className="min-h-[150px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isLoading}
            size="lg"
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Analyzing..." : "Analyze Resume"}
          </Button>
        </form>
      </Form>

      {(isLoading || result) && (
        <div className="mt-8">
          <h3 className="text-lg font-headline font-semibold mb-4">Analysis Result</h3>
          <Card className="min-h-[300px] relative">
             <CardContent className="p-6">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-card/80 backdrop-blur-sm rounded-lg">
                  <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
                    <p className="text-muted-foreground">Analyzing, please wait...</p>
                  </div>
                </div>
              )}
              {result && (
                <div className="space-y-6">
                  <div>
                    <CardTitle className="flex items-center gap-2 mb-2 text-primary">
                      <TrendingUp className="h-5 w-5" />
                      Match Score
                    </CardTitle>
                    <div className="flex items-center gap-4">
                      <Progress value={result.matchScore} className="w-full h-4" />
                      <span className="font-bold text-xl text-primary">{result.matchScore}%</span>
                    </div>
                  </div>
                   <div>
                    <CardTitle className="flex items-center gap-2 mb-2 text-green-500">
                      <CheckCircle className="h-5 w-5" />
                      Strengths
                    </CardTitle>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      {result.strengths.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  </div>
                  <div>
                    <CardTitle className="flex items-center gap-2 mb-2 text-orange-500">
                      <XCircle className="h-5 w-5" />
                      Weaknesses
                    </CardTitle>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      {result.weaknesses.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  </div>
                   <div>
                    <CardTitle className="flex items-center gap-2 mb-2 text-accent">
                      <Lightbulb className="h-5 w-5" />
                      Suggestions
                    </CardTitle>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      {result.suggestions.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
