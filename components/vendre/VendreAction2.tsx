"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function EstimerEnLigneTrapeze() {
  return (
    <section className="w-full bg-teal-500/10 overflow-hidden pt-12 md:pt-16 pb-0">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-end">
        
        {/* --- Colonne Image : Forme Trapèze collée en bas --- */}
        <div className="relative flex justify-center md:justify-end h-[350px] md:h-[420px] w-full order-1">
          <div 
            className="relative w-full h-full max-w-[480px] overflow-hidden shadow-2xl"
            style={{
              // Effet de pente : 20% de décalage en haut à gauche pour la cohérence
              clipPath: "polygon(0% 20%, 100% 0%, 100% 100%, 0% 100%)",
            }}
          >
            <Image
              src="/accueil/maison1.jpg" 
              alt="Estimation immobilière en ligne" 
              fill 
              className="object-cover object-center scale-110" 
              priority
            />
          </div>
        </div>

        {/* --- Colonne Texte --- */}
        <div className="flex flex-col order-2 md:pl-6 pb-12 md:pb-16">
          <div className="max-w-xl">
            {/* Titre Reformulé avec style Pinyon */}
            <div className="flex flex-col leading-tight mb-6">
              <h2 className="text-2xl md:text-3xl font-medium text-slate-800">
                Estimer mon bien
              </h2>
              <p className="text-2xl md:text-4xl font-medium text-slate-800">
                <span className="font-pinyon text-4xl md:text-5xl text-teal-700 italic">en ligne</span> avec Merci
              </p>
            </div>

            {/* Description adaptée */}
            <div className="space-y-4 text-slate-700 text-base md:text-lg leading-relaxed mb-8">
              <p className="font-semibold text-slate-800">
                Obtenez une évaluation fiable en quelques minutes.
              </p>
              <p>
                Vous souhaitez connaître les prix au m² de votre quartier ? Notre outil vous permet d'estimer votre appartement ou votre maison rapidement, directement depuis chez vous.
              </p>
            </div>

            {/* --- Bouton d'action --- */}
            <Link href="/estimation" className="inline-block">
              <button className="group relative bg-slate-800 text-white px-8 py-4 text-lg font-medium transition-all duration-300 ease-in-out hover:bg-teal-700 hover:shadow-xl active:scale-95 flex items-center gap-2">
                Estimer mon bien en ligne
                <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>

            <p className="mt-4 text-sm text-slate-400 italic">
              * Évaluation gratuite et immédiate.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}