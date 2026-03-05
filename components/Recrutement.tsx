"use client";

import Image from "next/image";

export default function Recrutement() {
  return (
    <section className="w-full bg-teal-600/10 overflow-hidden pt-0 pb-16 md:pb-24">
      {/* Items-start pour que le haut plat de l'image s'aligne avec le haut de la section */}
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
        
        {/* --- Colonne Image : À gauche --- */}
        <div className="relative flex justify-center md:justify-end h-[500px] w-full order-1">
          <div 
            className="relative w-full h-full max-w-[480px] max-h-[500px] overflow-hidden shadow-xl"
            style={{
              /* Forme inversée : 
                 Haut plat (0% 0% et 100% 0%)
                 Côtés verticaux jusqu'à 70%
                 Pointe du bas à 40% de largeur et 100% de hauteur
              */
              clipPath: "polygon(0% 0%, 100% 0%, 100% 70%, 40% 100%, 0% 70%)",
            }}
          >
            <Image
              src="/femme2.jpg" // Pense à ajouter une photo d'équipe ou d'agent
              alt="Rejoindre l'équipe Merci Immobilier" 
              fill 
              className="object-cover scale-105"
            />
          </div>
          {/* Décoration en arrière-plan */}
          <div className="absolute -z-10 w-72 h-72 bg-slate-100 rounded-full blur-3xl opacity-60 bottom-0 -left-10"></div>
        </div>

        {/* --- Colonne Texte : À droite --- */}
        <div className="flex flex-col order-2 pl-0 md:pl-12 mt-12 md:mt-10">
          <div className="max-w-xl">
            <div className="flex flex-col leading-none mb-6">
              <h2 className="text-3xl md:text-4xl font-medium text-slate-800 mb-0">
                Devenez
              </h2>
              <p className="text-3xl md:text-4xl font-medium text-slate-800">
                acteur de <span className="font-pinyon text-4xl md:text-5xl italic">votre succès</span>
              </p>
            </div>

            <div className="space-y-6 text-slate-800 text-lg leading-normal mb-10">
              <p className="font-medium">
                Vous avez le sens du service et l'envie d'entreprendre ? Rejoignez le réseau Merci Immobilier.
              </p>
              <p>
                Nous recherchons des agents commerciaux passionnés qui partagent nos valeurs de bienveillance et d'exigence. Profitez d'un accompagnement personnalisé, d'outils performants et d'une rémunération attractive au sein d'une équipe à taille humaine.
              </p>
              <p>
                Que vous soyez expérimenté ou en reconversion, nous vous offrons la formation et le cadre nécessaires pour faire de l'immobilier un métier passionnant et épanouissant.
              </p>
            </div>

            {/* Bouton d'action */}
            <button className="bg-slate-800 text-white px-10 py-4 text-lg font-medium hover:bg-slate-700 transition-colors w-fit">
              Nous rejoindre
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}