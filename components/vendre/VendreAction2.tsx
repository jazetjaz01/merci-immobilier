"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function VendreAction() {
  return (
    <section className="w-full bg-white overflow-hidden pt-16 pb-16 md:pb-24">
      {/* On passe de gap-12 à gap-4 ou gap-6 pour rapprocher les éléments */}
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-24 items-center">
        
        {/* --- Colonne TEXTE & BOUTONS --- */}
        <div className="flex flex-col items-center md:items-end order-2 md:order-1">
          {/* L'utilisation de md:mr-0 ou un alignement à droite rapproche visuellement du centre */}
          <div className="max-w-xl w-full md:text-right flex flex-col items-start md:items-end">
            
            {/* Titre avec style Pinyon */}
            <div className="flex flex-col leading-tight mb-8">
              <h2 className="text-3xl md:text-4xl font-medium text-slate-800">
                Vous avez un projet de
              </h2>
              <p className="text-3xl md:text-4xl font-medium text-slate-800">
                <span className="font-pinyon text-5xl md:text-6xl text-teal-700 italic">vente</span> immobilière ?
              </p>
            </div>

            <div className="space-y-6 text-slate-600 text-lg leading-relaxed mb-10">
              <p>
                Parce que chaque bien est unique, nous mettons à votre disposition notre expertise du marché local pour une vente sereine et efficace.
              </p>
              <p className="font-medium text-slate-800">
                Prêt à connaître la valeur réelle de votre patrimoine ?
              </p>
            </div>

            {/* --- Groupe de Boutons --- */}
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-start md:justify-end">
              <Button 
                asChild
                className="h-14 px-8 bg-teal-700 hover:bg-teal-800 text-white text-lg font-medium rounded-none transition-all group"
              >
                <Link href="/estimation">
                  Estimer mon bien
                  <ArrowRight className="ml-2 size-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button 
                asChild
                variant="outline"
                className="h-14 px-8 border-2 border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white text-lg font-medium rounded-none transition-all"
              >
                <Link href="/contact">
                  Nous contacter
                </Link>
              </Button>
            </div>
            
            <p className="mt-6 text-sm text-slate-400 italic">
              * Estimation gratuite et sans engagement sous 48h.
            </p>
          </div>
        </div>

        {/* --- Colonne IMAGE --- */}
        <div className="relative flex justify-center md:justify-start h-[500px] w-full order-1 md:order-2">
          <div 
            className="relative w-full h-full max-w-[500px] overflow-hidden shadow-2xl"
            style={{
              clipPath: "polygon(25% 0%, 100% 15%, 100% 85%, 50% 100%, 0% 85%, 0% 15%)",
            }}
          >
            <Image
              src="/accueil/maison1.jpg" 
              alt="Estimation immobilière Merci Immobilier" 
              fill 
              className="object-cover scale-110"
              priority
            />
          </div>
        </div>

      </div>
    </section>
  );
}