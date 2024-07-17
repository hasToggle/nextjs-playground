import type { Metadata } from "next";
import Image from "next/image";
import { Inter } from "next/font/google";

import { Sidebar } from "@/components/sidebar";
import { Menu } from "@/components/menu";
import { Footer } from "@/components/footer";

import { playlists } from "@/lib/playlists";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js Playground",
  description: "Interactive display of Next.js features.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <div className="md:hidden">
          <Image
            src="/examples/music-light.png"
            width={1280}
            height={1114}
            alt="Music"
            className="block dark:hidden"
          />
          <Image
            src="/examples/music-dark.png"
            width={1280}
            height={1114}
            alt="Music"
            className="hidden dark:block"
          />
        </div>
        <div className="hidden md:block">
          {/* <Menu /> */}
          <div className="border-t">
            <div className="bg-background">
              <div className="grid sm:grid-cols-5">
                <Sidebar playlists={playlists} className="hidden sm:block" />
                {children}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
