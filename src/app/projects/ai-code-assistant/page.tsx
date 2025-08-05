"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Bot, Sparkles, Loader2, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { handleAnalyzeCode } from "@/app/actions";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ProjectPageHeader } from "@/components/projects/project-page-header";

const formSchema = z.object({
  code: z.string().min(20, "Please enter at least 20 characters of code."),
  language: z.string().min(1, "Please select a language."),
});

export default function AiCodeAssistantPage() {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
      language: "javascript",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setAnalysis(null);
    const response = await handleAnalyzeCode(values);

    if (response.error) {
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: response.error,
      });
    } else if (response.analysis) {
      setAnalysis(response.analysis);
      toast({
        title: "Success!",
        description: "Your code has been analyzed.",
      });
    }
    setIsLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a020d] via-background to-[#0d021a]">
     <ProjectPageHeader title="AI-Powered Code Assistant" />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
         <Card className="mb-8 bg-card/50 border-border/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <Bot /> AI Code Analyzer
            </CardTitle>
            <CardDescription>
              Paste a code snippet below, select the language, and the AI will provide suggestions, detect bugs, and generate documentation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isClient && (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Language</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a language" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="javascript">JavaScript</SelectItem>
                            <SelectItem value="python">Python</SelectItem>
                            <SelectItem value="typescript">TypeScript</SelectItem>
                            <SelectItem value="html">HTML</SelectItem>
                            <SelectItem value="css">CSS</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Code Snippet</FormLabel>
                        <FormControl>
                          <Textarea placeholder="function helloWorld() { console.log('Hello, World!'); }" {...field} className="min-h-[200px] font-code text-sm"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Wand2 className="mr-2 h-4 w-4" />
                        Analyze Code
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>

        {(isLoading || analysis) && (
            <Card className="mt-8 bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline">
                <Sparkles /> Analysis Result
              </CardTitle>
            </CardHeader>
            <CardContent className="min-h-[200px] relative">
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-card/80 backdrop-blur-sm rounded-lg">
                      <div className="text-center">
                          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
                          <p className="text-muted-foreground">Analyzing your code...</p>
                      </div>
                  </div>
              )}
              {analysis && (
                  <pre className="whitespace-pre-wrap font-code text-sm bg-secondary/30 p-4 rounded-md">{analysis}</pre>
              )}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
