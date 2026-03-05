import type { Metadata } from "next";
import { Outfit, Pinyon_Script } from "next/font/google"; // Importation de la nouvelle font
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const outfit = Outfit({ 
  subsets: ["latin"], 
  variable: "--font-outfit", 
});

// Configuration de Pinyon Script
const pinyon = Pinyon_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pinyon",
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
      {/* Ajout de pinyon.variable ici */}
      <body className={`${outfit.variable} ${pinyon.variable} font-sans antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}