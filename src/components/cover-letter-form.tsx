"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, Copy, Check } from "lucide-react";

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
import { handleGenerateCoverLetter } from "@/app/actions";
import { Card, CardContent } from "@/components/ui/card";

const formSchema = z.object({
  resumeInfo: z
    .string()
    .min(100, "Please provide at least 100 characters from your resume."),
  jobDescription: z
    .string()
    .min(100, "Please provide at least 100 characters for the job description."),
});

export function CoverLetterForm() {
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
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
    const response = await handleGenerateCoverLetter(values);

    if (response.error) {
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: response.error,
      });
    } else if (response.coverLetter) {
      setResult(response.coverLetter);
      toast({
        title: "Success!",
        description: "Your cover letter has been generated.",
      });
    }
    setIsLoading(false);
  }

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    }
  };

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
            {isLoading ? "Generating..." : "Generate Cover Letter"}
          </Button>
        </form>
      </Form>

      {(isLoading || result) && (
        <div className="mt-8">
          <h3 className="text-lg font-headline font-semibold mb-4">Generated Cover Letter</h3>
          <Card className="min-h-[300px] relative">
            <CardContent className="p-6">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-card/80 backdrop-blur-sm rounded-lg">
                  <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
                    <p className="text-muted-foreground">Generating, please wait...</p>
                  </div>
                </div>
              )}
              {result && (
                <>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 right-2 h-8 w-8"
                    onClick={handleCopy}
                  >
                    {hasCopied ? (
                      <Check className="h-4 w-4 text-accent" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <pre className="whitespace-pre-wrap font-body text-sm leading-relaxed">
                    {result}
                  </pre>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
