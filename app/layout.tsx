import type { Metadata } from "next";
import { Outfit, Pinyon_Script, Monoton } from "next/font/google"; // Importation de Monoton
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const outfit = Outfit({ 
  subsets: ["latin"], 
  variable: "--font-outfit", 
});

const pinyon = Pinyon_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pinyon",
});

// Configuration de Monoton
const monoton = Monoton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-monoton",
});

const siteUrl = "https://www.merci-immobilier.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Merci Immobilier | Agence immobilière à Perpignan",
    template: "%s | Merci Immobilier",
  },
  description:
    "Merci Immobilier, réseau de mandataires immobiliers à Perpignan et ses environs. Achat, vente et estimation gratuite de votre bien avec un accompagnement sur-mesure.",
  keywords: [
    "agence immobilière Perpignan",
    "mandataire immobilier",
    "vendre son bien Perpignan",
    "estimation immobilière gratuite",
    "acheter maison Perpignan",
    "Merci Immobilier",
  ],
  authors: [{ name: "Merci Immobilier" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "Merci Immobilier",
    title: "Merci Immobilier | Agence immobilière à Perpignan",
    description:
      "Premier réseau de mandataires par la gentillesse. Achat, vente et estimation gratuite de votre bien à Perpignan et ses environs.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Merci Immobilier",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Merci Immobilier | Agence immobilière à Perpignan",
    description:
      "Premier réseau de mandataires par la gentillesse. Achat, vente et estimation gratuite de votre bien.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Merci Immobilier",
    description: "Premier réseau de mandataires par la gentillesse.",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    image: `${siteUrl}/logo.png`,
    email: "contact@merci-immobilier.com",
    telephone: "+33616224682",
    address: {
      "@type": "PostalAddress",
      streetAddress: "7 avenue de Banyuls sur Mer",
      postalCode: "66100",
      addressLocality: "Perpignan",
      addressCountry: "FR",
    },
    areaServed: {
      "@type": "City",
      name: "Perpignan",
    },
  };

  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      {/* Ajout des trois variables de police ici */}
      <body className={`${outfit.variable} ${pinyon.variable} ${monoton.variable} font-sans antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}