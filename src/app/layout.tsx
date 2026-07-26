import type { Metadata } from "next";
import { Geist, Geist_Mono, Caveat } from "next/font/google";
import { LoadingScreen } from "@/components/animations/LoadingScreen";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* Deliberate one-off exception to the Geist/Inter/Space Grotesk rule: used only
 * for the handwritten name accent in the homepage intro teaser, never for body
 * or heading text. */
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "Hemanth — Web Developer & Designer",
  description: "Portfolio of Hemanth, a freelance web developer and designer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LoadingScreen />
        {children}
      </body>
    </html>
  );
}
