"use client"

import { ProjectPageHeader } from "@/components/projects/project-page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PenTool, Trash2, Brush, Palette } from "lucide-react";
import React, { useRef, useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";

export default function CollaborativeWhiteboardPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#FFFFFF');
  const [lineWidth, setLineWidth] = useState(5);
  const [lastPos, setLastPos] = useState<{x: number, y: number} | null>(null);

  const colors = ['#FFFFFF', '#EF4444', '#F97316', '#EAB308', '#22C55E', '#3B82F6', '#8B5CF6', '#EC4899'];

  const getMousePos = (canvas: HTMLCanvasElement, evt: MouseEvent | TouchEvent) => {
    const rect = canvas.getBoundingClientRect();
    if (evt instanceof MouseEvent) {
      return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
      };
    } else {
        return {
            x: evt.touches[0].clientX - rect.left,
            y: evt.touches[0].clientY - rect.top
        };
    }
  }

  const draw = (e: MouseEvent | TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context || !lastPos) return;

    const currentPos = getMousePos(canvas, e);
    
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    context.lineCap = 'round';
    context.lineJoin = 'round';

    context.beginPath();
    context.moveTo(lastPos.x, lastPos.y);
    context.lineTo(currentPos.x, currentPos.y);
    context.stroke();
    
    setLastPos(currentPos);
  };
  
  const startDrawing = (e: MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setLastPos(getMousePos(canvas, e));
    setIsDrawing(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setLastPos(null);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    context.fillStyle = '#111827';
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const setCanvasSize = () => {
        const parent = canvas.parentElement;
        if (parent) {
            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;
        }
    };
    
    setCanvasSize();
    
    const context = canvas.getContext('2d');
    if (!context) return;
    context.fillStyle = '#111827';
    context.fillRect(0, 0, canvas.width, canvas.height);

    window.addEventListener('resize', setCanvasSize);

    return () => {
        window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a020d] via-background to-[#0d021a] flex flex-col">
     <ProjectPageHeader title="Real-time Collaborative Whiteboard" />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow">
        <Card className="bg-card/50 border-border/50 backdrop-blur-sm h-full flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <PenTool /> Whiteboard Demo
            </CardTitle>
            <CardDescription>
              This is a visual demo of a whiteboard. In a real application, multiple users could draw on this canvas simultaneously.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-4 p-2 rounded-lg bg-secondary/30">
                <div className="flex items-center gap-2">
                    <Palette className="h-5 w-5 text-muted-foreground" />
                    {colors.map(c => (
                        <button key={c} onClick={() => setColor(c)} className={`w-6 h-6 rounded-full border-2 ${color === c ? 'border-primary' : 'border-transparent'}`} style={{backgroundColor: c}} />
                    ))}
                </div>
                <div className="flex items-center gap-2">
                    <Brush className="h-5 w-5 text-muted-foreground" />
                    <input type="range" min="1" max="20" value={lineWidth} onChange={(e) => setLineWidth(Number(e.target.value))} className="w-24"/>
                </div>
                <Button variant="outline" size="sm" onClick={clearCanvas}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear Canvas
                </Button>
            </div>
            <div className="relative h-[60vh] w-full rounded-lg overflow-hidden shadow-inner bg-gray-900 flex-grow">
                <canvas
                    ref={canvasRef}
                    onMouseDown={(e) => startDrawing(e.nativeEvent)}
                    onMouseMove={(e) => draw(e.nativeEvent)}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={(e) => startDrawing(e.nativeEvent)}
                    onTouchMove={(e) => draw(e.nativeEvent)}
                    onTouchEnd={stopDrawing}
                    className="cursor-crosshair"
                />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
