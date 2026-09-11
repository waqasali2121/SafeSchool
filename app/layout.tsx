import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AppProvider } from "@/lib/store/app-context";
import { Navbar } from "@/components/navigation/navbar";
import { SosBanner } from "@/components/safety/sos-banner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SafeAI School – AI Powered Smart School Safety & Learning Platform",
  description:
    "Every Girl Safe. Every Parent Connected. Every Student Empowered. Modern AI-powered school ecosystem combining smart attendance tracking, parent safety notifications, student academic management, homework, emergency safety system, and an intelligent RAG learning assistant.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-pink-500 selection:text-white`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AppProvider>
            <div className="relative flex min-h-screen flex-col">
              <Navbar />
              <SosBanner />
              <div className="flex-1">{children}</div>
            </div>
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
