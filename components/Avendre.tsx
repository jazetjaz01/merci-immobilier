"use client";

import Image from "next/image";

export default function EstimerBienSection() {
  return (
    <section className="w-full bg-white overflow-hidden pt-12 pb-16 md:pb-24">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-4 items-start md:items-end">
        
        {/* --- Colonne Texte --- */}
        <div className="flex flex-col order-2 md:order-1 items-start md:items-end mt-12 md:mt-0">
          <div className="max-w-xl w-full">
            
            <div className="flex flex-col leading-none mb-6">
              <h2 className="text-3xl md:text-4xl font-medium text-slate-800 mb-0">
                Vous avez un bien
              </h2>
              <p className="text-3xl md:text-4xl font-medium text-slate-800">
                <span className="font-pinyon text-4xl md:text-5xl italic">l'immobilier</span> à vendre ?
              </p>
            </div>

            <div className="space-y-6 text-slate-600 text-lg leading-normal mb-10">
              <p>
                Pour vous aider à vendre facilement votre logement, nous vous proposons une estimation de votre bien immobilier, adaptée à vos besoins et à votre situation.
              </p>
              <p>
                Bénéficiez de l’accompagnement d’une enseigne immobilière au rayonnement national et à forte visibilité médiatique.
              </p>
            </div>

            {/* --- Bouton Corrigé --- */}
             <button className="bg-slate-800 text-white px-10 py-4 text-lg font-medium hover:bg-slate-700 transition-colors w-fit">
              Estimer mon bien
            </button>
          </div>
        </div>

        {/* --- Colonne Image --- */}
        <div className="relative flex justify-center md:justify-start h-[550px] w-full order-1 md:order-2">
          <div 
            className="relative w-full h-full max-w-[550px] overflow-hidden shadow-2xl"
            style={{
              clipPath: "polygon(25% 0%, 100% 15%, 100% 85%, 50% 100%, 0% 85%, 0% 15%)",
            }}
          >
            <Image
              src="/xsalon1.jpg" 
              alt="Estimation immobilière" 
              fill 
              className="object-cover scale-110"
            />
          </div>
        </div>

      </div>
    </section>
  );
}