import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const fontSans = Plus_Jakarta_Sans({
      subsets: ["latin"],
      variable: "--font-plus-jakarta-sans",
      weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
      title: "Healthdo",
      description: "A health app",
};

export default function RootLayout({
      children,
}: Readonly<{
      children: React.ReactNode;
}>) {
      return (
            <html lang="en">
                  <body
                        className={cn(
                              "min-h-screen bg-dark-400 bg-white font-sans antialiased",
                              fontSans.variable
                        )}
                  >
                        {children}
                  </body>
            </html>
      );
}
