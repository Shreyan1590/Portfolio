"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2, PieChart, RefreshCw } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Pie, Cell } from "recharts";
import { ProjectPageHeader } from "@/components/projects/project-page-header";
import { Button } from '@/components/ui/button';

const generateSalesData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map(month => ({
        name: month,
        revenue: Math.floor(Math.random() * 5000) + 2000,
        profit: Math.floor(Math.random() * 3000) + 1000,
    }));
};

const generateCategoryData = () => {
    const categories = ['Electronics', 'Clothing', 'Groceries', 'Books', 'Home Goods'];
    return categories.map(cat => ({
        name: cat,
        value: Math.floor(Math.random() * 500) + 100,
    }));
};

const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', '#FFBB28', '#FF8042', '#00C49F'];

export default function DataVizDashboardPage() {
  const [salesData, setSalesData] = useState(generateSalesData());
  const [categoryData, setCategoryData] = useState(generateCategoryData());

  const refreshData = () => {
      setSalesData(generateSalesData());
      setCategoryData(generateCategoryData());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a020d] via-background to-[#0d021a]">
     <ProjectPageHeader title="DataViz Dashboard" />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex justify-end">
            <Button onClick={refreshData}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh Data
            </Button>
        </div>
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
                  <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="profit" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
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
                  <Pie 
                    data={categoryData} 
                    dataKey="value" 
                    nameKey="name" 
                    cx="50%" 
                    cy="50%" 
                    outerRadius={100} 
                    labelLine={false}
                    label={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
                    >
                    {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
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
