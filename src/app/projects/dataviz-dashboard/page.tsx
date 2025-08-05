"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, ExternalLink, BarChart2, LineChart, PieChart } from "lucide-react";
import Link from "next/link";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Line, Pie } from "recharts";

const salesData = [
  { name: 'Jan', revenue: 4000, profit: 2400 },
  { name: 'Feb', revenue: 3000, profit: 1398 },
  { name: 'Mar', revenue: 5000, profit: 9800 },
  { name: 'Apr', revenue: 4780, profit: 3908 },
  { name: 'May', revenue: 5890, profit: 4800 },
  { name: 'Jun', revenue: 4390, profit: 3800 },
];

const categoryData = [
  { name: 'Electronics', value: 400 },
  { name: 'Clothing', value: 300 },
  { name: 'Groceries', value: 300 },
  { name: 'Books', value: 200 },
];


export default function DataVizDashboardPage() {
  const project = {
    title: "DataViz Dashboard",
    description: "An interactive dashboard for visualizing complex datasets, with dynamic charts, filtering capabilities, and data-driven components for business intelligence and analytics.",
    stack: ["React", "D3.js", "Python", "Flask", "Pandas"],
    repoUrl: "#",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a020d] via-background to-[#0d021a] py-12 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
          <CardHeader className="text-center">
            <Button variant="link" asChild className="mb-4">
              <Link href="/#projects">← Back to Projects</Link>
            </Button>
            <CardTitle className="text-4xl md:text-5xl font-headline font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              {project.title}
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground mt-2">
              Live Demo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-headline"><BarChart2/> Monthly Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="revenue" fill="hsl(var(--primary))" />
                      <Bar dataKey="profit" fill="hsl(var(--accent))" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
               <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-headline"><PieChart/> Sales by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="hsl(var(--primary))" label />
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="max-w-3xl mx-auto mt-12">
              <h3 className="text-3xl font-headline font-bold text-center mb-8">About This Project</h3>
              <p className="text-lg text-muted-foreground mb-6">{project.description}</p>
              
              <div className="mb-8">
                <h3 className="text-2xl font-headline font-semibold text-primary mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-base px-4 py-2">{tech}</Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-center gap-4">
                 <Button variant="ghost" size="lg" asChild>
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-5 w-5" />
                    View Code
                  </a>
                </Button>
                <Button size="lg" disabled>
                  <ExternalLink className="mr-2 h-5 w-5" />
                  You are viewing the demo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
