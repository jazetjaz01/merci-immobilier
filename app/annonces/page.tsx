"use client";

import React, { useEffect, useState } from "react";
import { Search, MapPin, Euro, Maximize, Layers, SlidersHorizontal, Loader2 } from "lucide-react";
// Importation de ton utilitaire existant (vérifie bien le chemin @/utils/supabase/client)
import { createClient } from "@/utils/supabase/client";

// --- COMPOSANT CARTE (AnnonceCard) ---
const AnnonceCard = ({ property }: { property: any }) => {
  // On récupère la première image du tableau, sinon un placeholder
  const mainImage = property.images && property.images.length > 0 
    ? property.images[0] 
    : "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop";

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={mainImage} 
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-teal-800">
          {property.property_type === 2 ? "Maison" : "Bien Immobilier"}
        </div>
        <div className="absolute bottom-4 left-4 bg-teal-700 text-white px-4 py-1 rounded-lg font-bold">
          {property.price > 0 ? `${property.price.toLocaleString()} €` : "Prix sur demande"}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-slate-800 line-clamp-1">{property.title}</h3>
        </div>
        <div className="flex items-center text-slate-500 text-sm mb-4">
          <MapPin className="h-3 w-3 mr-1" /> {property.city} ({property.zipcode})
        </div>
        
        <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-slate-600">
          <div className="flex items-center gap-1">
            <Layers className="h-4 w-4 text-teal-600" />
            <span className="text-sm font-medium">{property.rooms} p.</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize className="h-4 w-4 text-teal-600" />
            <span className="text-sm font-medium">{property.surface} m²</span>
          </div>
          <button className="text-teal-700 font-bold text-sm hover:underline">
            Voir le bien
          </button>
        </div>
      </div>
    </div>
  );
};

// --- COMPOSANT PRINCIPAL (Page) ---
export default function AnnoncesPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      try {
        // Utilisation de ton client Supabase
        const supabase = createClient();

        const { data, error } = await supabase
          .from("properties")
          .select("*")
          .order("updated_at", { ascending: false });

        if (error) throw error;
        setProperties(data || []);
      } catch (error) {
        console.error("Erreur chargement Supabase:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      {/* --- BARRE DE RECHERCHE --- */}
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
            <button className="bg-teal-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-teal-800 transition-colors flex items-center gap-2">
              <Search className="h-4 w-4" />
              <span>Rechercher</span>
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
            <p className="text-slate-500 mt-2">
              {loading ? "Recherche en cours..." : `${properties.length} annonces trouvées`}
            </p>
          </div>
          <button className="flex items-center gap-2 text-sm font-semibold text-slate-600 border border-slate-300 px-4 py-2 rounded-lg hover:bg-white transition-all">
            <SlidersHorizontal className="h-4 w-4" /> Trier
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Loader2 className="h-10 w-10 animate-spin mb-4" />
            <p>Alamiia récupère les dernières pépites...</p>
          </div>
        ) : properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((prop) => (
              <AnnonceCard key={prop.id} property={prop} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
            <p className="text-slate-500">Aucune annonce n'est encore disponible.</p>
          </div>
        )}
      </main>
    </div>
  );
}