import type { Metadata } from "next";
import Image from "next/image";
import { Inter } from "next/font/google";

import { Sidebar } from "@/components/sidebar";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js Playground",
  description: "Interactive display of Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <div className="border-t">
          <div className="bg-background">
            <div className="grid sm:grid-cols-5">
              <Sidebar className="hidden sm:block" />
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
