"use client";

import Image from "next/image";

export default function Presentation() {
  return (
    <section className="w-full bg-teal-500/10 overflow-hidden pt-0 pb-0">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start md:items-end">
        
        {/* --- Colonne Image : Collée au bord inférieur --- */}
        <div className="relative flex justify-center md:justify-end h-[500px] w-full order-1">
          <div 
            className="relative w-full h-full max-w-[480px] overflow-hidden shadow-xl"
            style={{
              clipPath: "polygon(0% 40%, 40% 20%, 100% 40%, 100% 100%, 0% 100%)",
            }}
          >
            <Image
              src="/accueil/salon1.jpg" 
              alt="Maison Merci Immobilier" 
              fill 
              className="object-cover scale-105"
            />
          </div>
          <div className="absolute -z-10 w-72 h-72 bg-teal-50 rounded-full blur-3xl opacity-40 bottom-0 -left-10"></div>
        </div>

        {/* --- Colonne Texte : Remontée par rapport au bas --- */}
        <div className="flex flex-col order-2 pl-0 md:pl-12 mt-12 md:mt-0 pb-16 md:pb-24">
          <div className="max-w-xl">
            <div className="flex flex-col leading-none mb-6 pt-12">
              <h2 className="text-3xl md:text-4xl font-medium text-slate-800 mb-0">
                Merci
              </h2>
              <p className="text-3xl md:text-4xl font-medium text-slate-800">
                vous fera aimer <span className="font-pinyon text-4xl md:text-5xl italic">l'immobilier</span>
              </p>
            </div>

            <div className="space-y-6 text-slate-800 text-lg leading-normal mb-10">
              <p className="font-medium text-slate-800">
                Découvrez Merci Immobilier, une équipe composée de femmes et d'hommes focalisée sur la réussite de votre projet.
              </p>
              <p>
                Parce que nous savons qu’un lieu de vie façonne votre quotidien, les équipes du réseau Merci Immobilier mettent leur expertise et leur exigence à votre service pour vous accompagner dans la découverte d’un bien qui vous correspond pleinement.
              </p>
            </div>

            {/* --- Bouton avec correction du Hover --- */}
            <button className="group relative bg-slate-800 text-white px-10 py-4 text-lg font-medium transition-all duration-300 ease-in-out hover:bg-slate-700 hover:shadow-lg active:scale-95 w-fit">
              Découvrir nos services
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}