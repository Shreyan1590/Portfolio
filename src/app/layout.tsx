import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { Chatbot } from "@/components/chatbot";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://shreyan.site'),
  title: "Shreyan | Developer & Designer",
  description: "Welcome to Shreyan's portfolio showcasing expertise in AI solutions, web development, and interactive UI/UX design. Explore innovative projects and creative solutions.",
  keywords: ["Shreyan portfolio", "AI engineer", "full-stack developer", "Next.js", "Genkit", "TypeScript", "web developer"],
  authors: [{ name: "Shreyan S." }],
  verification: {
    google: "bHoyyZpyrIWXgnulzKPyO3o08hajP44MbyV-5v2I3nk",
  },
  openGraph: {
    title: "Shreyan | Developer & Designer",
    description: "Explore Shreyan's portfolio of AI-powered applications and modern web development projects.",
    url: "https://shreyan.site",
    siteName: "Shreyan's Portfolio",
    images: [
      {
        url: 'https://shreyan.site/og-image.png', // Must be an absolute URL
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        {children}
        <Toaster />
        <Chatbot />
      </body>
    </html>
  );
}
