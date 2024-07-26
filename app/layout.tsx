import type { Metadata } from "next";
import { Martian_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const fontMartian = Martian_Mono({
      subsets: ["latin"],
      variable: "--font-martian-mono",
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
                              "min-h-screen dark:bg-dark-400 bg-white font-sans antialiased",
                              fontMartian.variable
                        )}
                  >
                        <ThemeProvider
                              attribute="class"
                              defaultTheme="dark"
                              enableSystem
                              disableTransitionOnChange
                        >
                              {children}
                        </ThemeProvider>
                  </body>
            </html>
      );
}
