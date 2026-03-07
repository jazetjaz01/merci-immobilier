import React from "react";

import Hero1 from "@/components/vendre/Hero1";
import VendreAction from "@/components/vendre/VendreAction2";
import EstimerAgence3 from "@/components/vendre/EstimerAgence3";
export const metadata = {
  title: "Vendre mon bien | Merci Immobilier",
  description: "Confiez la vente de votre maison ou appartement à notre agence. Estimation offerte et accompagnement sur-mesure à Perpignan et ses environs.",
};

export default function VendrePage() {
  return (
    <main className="flex flex-col min-h-screen  ">
   
      <Hero1 />
      <VendreAction />
      <EstimerAgence3 />

     
    </main>
  );
}