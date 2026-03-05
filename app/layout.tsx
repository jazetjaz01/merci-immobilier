import type { Metadata } from "next";
import { Outfit } from "next/font/google"; 
import "./globals.css";
import Navbar from "@/components/navbar";

const outfit = Outfit({ 
  subsets: ["latin"], 
  variable: "--font-outfit", 
});

export const metadata: Metadata = {
  title: "Merci Immobilier",
  description: "Premier réseau de mandataires par la gentillesse!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}