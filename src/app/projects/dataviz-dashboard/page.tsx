"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2, PieChart } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Pie } from "recharts";
import { ProjectPageHeader } from "@/components/projects/project-page-header";

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
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a020d] via-background to-[#0d021a]">
     <ProjectPageHeader title={project.title} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline"><BarChart2/> Monthly Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border)/0.5)"/>
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))"/>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      borderColor: "hsl(var(--border))",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="revenue" fill="hsl(var(--primary))" />
                  <Bar dataKey="profit" fill="hsl(var(--accent))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline"><PieChart/> Sales by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="hsl(var(--primary))" label={{ fill: "hsl(var(--primary-foreground))" }} />
                  <Tooltip
                     contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      borderColor: "hsl(var(--border))",
                    }}
                   />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
