"use client";

import React from "react";
import { Search, MapPin, Euro, Maximize, Layers, SlidersHorizontal } from "lucide-react";

// Le composant secondaire doit être défini AVANT ou APRÈS l'export default, sans commentaires JSX flottants
const AnnonceCard = () => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100">
      <div className="relative h-64 overflow-hidden">
        <div className="w-full h-full bg-slate-200 animate-pulse flex items-center justify-center">
          <span className="text-slate-400">Image Bien</span>
        </div>
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-teal-800">
          Exclusivité
        </div>
        <div className="absolute bottom-4 left-4 bg-teal-700 text-white px-4 py-1 rounded-lg font-bold">
          450 000 €
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-slate-800">Villa Contemporaine</h3>
        </div>
        <div className="flex items-center text-slate-500 text-sm mb-4">
          <MapPin className="h-3 w-3 mr-1" /> Perpignan (66000)
        </div>
        
        <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-slate-600">
          <div className="flex items-center gap-1">
            <Layers className="h-4 w-4 text-teal-600" />
            <span className="text-sm font-medium">5 pièces</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize className="h-4 w-4 text-teal-600" />
            <span className="text-sm font-medium">120 m²</span>
          </div>
          <button className="text-teal-700 font-bold text-sm hover:underline">
            Voir le bien
          </button>
        </div>
      </div>
    </div>
  );
};

// EXPORT DEFAULT à la fin pour plus de clarté
export default function AnnoncesPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      {/* --- BARRE DE RECHERCHE SUPÉRIEURE (Sticky) --- */}
      <div className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center gap-4">
            
            <div className="flex-1 min-w-[150px] relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-teal-600" />
              <input 
                type="text" 
                placeholder="Où cherchez-vous ?" 
                className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-teal-600 outline-none text-sm"
              />
            </div>

            <select className="bg-slate-100 border-none rounded-lg py-2 px-4 text-sm focus:ring-2 focus:ring-teal-600 outline-none font-medium cursor-pointer">
              <option>Vente</option>
              <option>Location</option>
            </select>

            <select className="bg-slate-100 border-none rounded-lg py-2 px-4 text-sm focus:ring-2 focus:ring-teal-600 outline-none cursor-pointer">
              <option>Type de bien</option>
              <option>Maison</option>
              <option>Appartement</option>
            </select>

            <div className="relative">
              <Euro className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-teal-600" />
              <input 
                type="text" 
                placeholder="Budget max" 
                className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-teal-600 outline-none text-sm w-32"
              />
            </div>

            <button className="bg-teal-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-teal-800 transition-colors flex items-center gap-2">
              <Search className="h-4 w-4" />
              <span className="hidden lg:inline">Rechercher</span>
            </button>
          </div>
        </div>
      </div>

      {/* --- GRILLE DES ANNONCES --- */}
      <main className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-medium text-slate-800">
              Nos Biens <span className="font-pinyon text-teal-700 text-4xl">disponibles</span>
            </h1>
            <p className="text-slate-500 mt-2">6 annonces trouvées</p>
          </div>
          <button className="flex items-center gap-2 text-sm font-semibold text-slate-600 border border-slate-300 px-4 py-2 rounded-lg hover:bg-white transition-all">
            <SlidersHorizontal className="h-4 w-4" /> Trier par
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <AnnonceCard key={item} />
          ))}
        </div>
      </main>
    </div>
  );
}