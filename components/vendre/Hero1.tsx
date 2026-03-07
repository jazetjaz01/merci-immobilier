"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function Hero1() {
  return (
    <section className="font-sans w-full overflow-hidden">
      {/* --- Grille Principale --- */}
      <div className="flex flex-col md:grid md:grid-cols-2 md:h-[600px] relative">
        
        {/* --- Colonne IMAGE (Gauche) --- */}
        <div className="relative h-[300px] md:h-full w-full z-0">
          <Image
            src="/avendre/vendre1.jpg" 
            alt="Vendre votre bien avec Merci Immobilier" 
            fill 
            priority 
            className="object-cover object-top" 
          />
        </div>

        {/* --- Colonne TEXTE (Droite avec l'effet biseauté) --- */}
        <div className="relative p-8 md:p-20 flex flex-col justify-center items-center md:items-start z-10 bg-teal-700
                        md:bg-transparent
                        md:after:content-[''] md:after:absolute 
                        md:after:top-0 md:after:bottom-0 md:after:right-0 
                        md:after:left-[-80px]
                        md:after:bg-teal-700 md:after:-z-10
                        md:after:[clip-path:polygon(0%_0%,100%_0%,100%_100%,80px_100%)]">

          {/* Contenu textuel */}
          <div className="text-center md:text-left relative z-20 max-w-lg">
            <p className="text-lg md:text-xl font-medium mb-3 text-white opacity-90">
              Propriétaires,
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight tracking-wide mb-6">
              Vendez votre bien <br className="hidden md:block" /> au meilleur prix
            </h1>
            
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              Confiez-nous la vente de votre bien et profitez d'un accompagnement sur-mesure, de l'estimation offerte jusqu'à la signature finale.
            </p>

            {/* Liste d'arguments */}
            <ul className="space-y-3 text-white/90">
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <CheckCircle2 className="size-5 text-teal-300" />
                <span>Estimation précise sous 48h</span>
              </li>
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <CheckCircle2 className="size-5 text-teal-300" />
                <span>Diffusion sur les plus grandes plateformes</span>
              </li>
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <CheckCircle2 className="size-5 text-teal-300" />
                <span>Photos professionnelles et visites ciblées</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      
    </section>
  );
}