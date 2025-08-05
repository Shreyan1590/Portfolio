"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, Play, Mic } from "lucide-react";

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { handleGenerateSpeech } from "@/app/actions";
import { Card, CardContent } from "@/components/ui/card";

const voices = [
    { id: 'Algenib', name: 'Algenib (Male)' },
    { id: 'Achernar', name: 'Achernar (Male)' },
    { id: 'Sirius', name: 'Sirius (Male)' },
    { id: 'Vega', name: 'Vega (Female)' },
    { id: 'Canopus', name: 'Canopus (Female)' },
    { id: 'Procyon', name: 'Procyon (Female)' },
];

const formSchema = z.object({
  text: z
    .string()
    .min(10, "Please provide at least 10 characters to convert to speech.")
    .max(500, "Text cannot exceed 500 characters."),
  voice: z.string(),
});

export function TextToSpeechForm() {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      voice: "Algenib",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setAudioUrl(null);
    const response = await handleGenerateSpeech(values);

    if (response.error) {
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: response.error,
      });
    } else if (response.audioUrl) {
      setAudioUrl(response.audioUrl);
      toast({
        title: "Success!",
        description: "Your audio has been generated.",
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
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Text to Convert</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter the text you want to hear..."
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
            name="voice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Voice</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a voice" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {voices.map(voice => (
                        <SelectItem key={voice.id} value={voice.id}>
                            {voice.name}
                        </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
            {isLoading ? "Generating..." : <><Mic className="mr-2 h-4 w-4" /> Generate Speech</>}
          </Button>
        </form>
      </Form>

      {(isLoading || audioUrl) && (
        <div className="mt-8">
          <h3 className="text-lg font-headline font-semibold mb-4">Generated Audio</h3>
          <Card className="min-h-[100px] relative flex items-center justify-center">
            <CardContent className="p-6 w-full">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-card/80 backdrop-blur-sm rounded-lg">
                  <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
                    <p className="text-muted-foreground">Generating, please wait...</p>
                  </div>
                </div>
              )}
              {audioUrl && (
                <div className="flex flex-col items-center gap-4">
                    <audio controls src={audioUrl} className="w-full">
                        Your browser does not support the audio element.
                    </audio>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
