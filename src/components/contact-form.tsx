"use client";

import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
            <Label htmlFor="inquiry-type">Reason for Contact</Label>
            <select name="inquiry-type" id="inquiry-type" required className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <option value="" disabled>Select a reason</option>
                <option value="project-collaboration">Project Collaboration</option>
                <option value="job-opportunity">Job Opportunity</option>
                <option value="technical-question">Technical Question</option>
                <option value="general-inquiry">General Inquiry</option>
            </select>
             <ValidationError 
                prefix="Inquiry-type" 
                field="inquiry-type"
                errors={state.errors}
                className="text-sm font-medium text-destructive"
            />
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
