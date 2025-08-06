"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, Sparkles, Wand2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { handleHelloGenkit } from "@/app/actions";
import { Card, CardContent } from "@/components/ui/card";
import { useTypewriter } from "@/hooks/use-typewriter";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Please enter a name with at least 2 characters."),
});

export function GenkitGreeterForm() {
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const animatedGreeting = useTypewriter(result || '', 20);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    const response = await handleHelloGenkit(values);

    if (response.error) {
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: response.error,
      });
    } else if (response.greeting) {
      setResult(response.greeting);
    }
    setIsLoading(false);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Chris"
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
            {isLoading ? "Generating..." : <><Wand2 className="mr-2 h-4 w-4" />Greet Me</>}
          </Button>
        </form>
      </Form>

      {(isLoading || result) && (
        <div className="mt-6">
          <Card className="min-h-[100px] relative">
            <CardContent className="p-6">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-card/80 backdrop-blur-sm rounded-lg">
                  <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
                    <p className="text-muted-foreground">Generating greeting...</p>
                  </div>
                </div>
              )}
              {result && (
                  <p className="font-body text-base text-center leading-relaxed">
                    {animatedGreeting}
                  </p>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
