import React from "react";

import Hero1 from "@/components/vendre/Hero1";
export const metadata = {
  title: "Vendre mon bien | Merci Immobilier",
  description: "Confiez la vente de votre maison ou appartement à notre agence. Estimation offerte et accompagnement sur-mesure à Perpignan et ses environs.",
};

export default function VendrePage() {
  return (
    <main className="flex flex-col min-h-screen bg-teal-600/10">
      {/* Composant Hero (le code que nous avons créé précédemment) */}
      <Hero1 />

      {/* Section optionnelle : Les étapes de la vente (pour donner du relief à la page) */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-800 mb-12">
              Comment nous vendons votre bien
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-teal-700 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">1</div>
                <h3 className="font-semibold text-lg mb-2">Estimation</h3>
                <p className="text-slate-600 text-sm">Analyse précise du marché local pour fixer le juste prix.</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-teal-700 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">2</div>
                <h3 className="font-semibold text-lg mb-2">Mise en valeur</h3>
                <p className="text-slate-600 text-sm">Photos pro et diffusion sur les portails immobiliers majeurs.</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-teal-700 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">3</div>
                <h3 className="font-semibold text-lg mb-2">Vente signée</h3>
                <p className="text-slate-600 text-sm">Filtrage des acquéreurs et gestion complète du compromis.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}