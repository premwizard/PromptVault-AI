import { AuthProvider } from "@/contexts/AuthContext";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import QueryProvider from "@/components/providers/QueryProvider";
import "./globals.css";

const geistSans = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PromptVault AI - Your Premium Prompt Library",
  description:
    "Manage, organize, and share high-quality AI prompts. PromptVault is your complete prompt management solution.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#09090B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background dark" suppressHydrationWarning>
      <body
        className={`${geistSans.className} antialiased bg-background text-foreground relative flex min-h-screen flex-col`}
      >
        <AuthProvider>
          <QueryProvider>
            <AnimatedBackground />
            <div className="relative z-0 flex-1 flex flex-col transition-all duration-300">
              <main className="flex-1 overflow-y-auto overflow-x-hidden">
                {children}
              </main>
            </div>
          </QueryProvider>
        </AuthProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
