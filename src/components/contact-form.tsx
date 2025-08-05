"use client";

import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

export function ContactForm() {
  const [state, handleSubmit] = useForm("xwpqrnva");

  if (state.succeeded) {
      return (
        <div className="text-center p-8 bg-secondary/20 rounded-lg">
            <h3 className="text-2xl font-headline text-accent">Thank You!</h3>
            <p className="text-muted-foreground mt-2">Your message has been sent successfully. I'll get back to you soon.</p>
        </div>
      );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                  id="name"
                  type="text" 
                  name="name"
                  required
                  placeholder="John Doe"
              />
              <ValidationError 
                  prefix="Name" 
                  field="name"
                  errors={state.errors}
                  className="text-sm font-medium text-destructive"
              />
          </div>
          <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                  id="email"
                  type="email" 
                  name="email"
                  required
                  placeholder="john.doe@example.com"
              />
              <ValidationError 
                  prefix="Email" 
                  field="email"
                  errors={state.errors}
                  className="text-sm font-medium text-destructive"
              />
          </div>
        </div>
        <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
                id="message"
                name="message"
                className="min-h-[150px]"
                required
                placeholder="Your message here..."
            />
            <ValidationError 
                prefix="Message" 
                field="message"
                errors={state.errors}
                className="text-sm font-medium text-destructive"
            />
        </div>
        <Button type="submit" disabled={state.submitting} className="w-full" size="lg">
             {state.submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {state.submitting ? "Sending..." : "Send Message"}
        </Button>
    </form>
  );
}
