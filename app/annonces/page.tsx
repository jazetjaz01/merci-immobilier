"use client";

import React, { useEffect, useState } from "react";
import { MapPin, Maximize, Layers, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
// IMPORTATION DU NOUVEAU COMPOSANT
import SearchBar from "@/components/SearchBar"; 

// --- COMPOSANT CARTE (AnnonceCard) ---
const AnnonceCard = ({ property }: { property: any }) => {
  const mainImage = property.images?.[0] || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop";

  return (
    <Link href={`/annonces/${property.id}`} className="block group">
      {/* Modification : Ombre légèrement plus douce pour le fond teinté */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-teal-600/5 h-full">
        <div className="relative h-64 overflow-hidden">
          <img src={mainImage} alt={property.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-teal-800">
            {property.property_type === 2 ? "Maison" : "Bien"}
          </div>
          <div className="absolute bottom-4 left-4 bg-teal-700 text-white px-4 py-1 rounded-lg font-bold">
            {property.price > 0 ? `${property.price.toLocaleString()} €` : "Prix sur demande"}
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-slate-800 line-clamp-1 group-hover:text-[#3d7a85] transition-colors mb-2">{property.title}</h3>
          <div className="flex items-center text-slate-500 text-sm mb-4">
            <MapPin className="h-3 w-3 mr-1" /> {property.city} ({property.zipcode})
          </div>
          <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-slate-600">
            <div className="flex items-center gap-1"><Layers className="h-4 w-4 text-teal-600" /><span className="text-sm font-medium">{property.rooms} p.</span></div>
            <div className="flex items-center gap-1"><Maximize className="h-4 w-4 text-teal-600" /><span className="text-sm font-medium">{property.surface} m²</span></div>
            <span className="text-teal-700 font-bold text-sm group-hover:underline">Voir le bien</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

// --- COMPOSANT PRINCIPAL ---
export default function AnnoncesPage() {
  const [allProperties, setAllProperties] = useState<any[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase.from("properties").select("*").order("updated_at", { ascending: false });
        if (error) throw error;
        setAllProperties(data || []);
        setFilteredProperties(data || []);
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProperties();
  }, []);

  const handleSearch = (filters: any) => {
    let results = [...allProperties];
    
    if (filters.location) results = results.filter(p => p.city.toLowerCase().includes(filters.location.toLowerCase()));
    if (filters.type && filters.type !== "0") results = results.filter(p => p.property_type?.toString() === filters.type);
    if (filters.rooms) results = results.filter(p => p.rooms >= parseInt(filters.rooms));
    if (filters.budgetMax) results = results.filter(p => p.price <= parseInt(filters.budgetMax));
    if (filters.surfaceMin) results = results.filter(p => p.surface >= parseInt(filters.surfaceMin));
    
    setFilteredProperties(results);
  };

  return (
    /* CHANGEMENT ICI : bg-teal-600/10 au lieu de bg-slate-50 */
    <div className="min-h-screen bg-teal-600/10">
      <div className="pt-0">
        <SearchBar onSearch={handleSearch} />
      </div>

      <main className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-medium text-slate-800">
              Nos Biens <span className="font-pinyon text-teal-700 text-4xl">disponibles</span>
            </h1>
            <p className="text-slate-500 mt-2">
              {loading ? "Chargement..." : `${filteredProperties.length} annonces trouvées`}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Loader2 className="h-10 w-10 animate-spin mb-4 text-teal-600" />
            <p>Alamiia recherche vos biens...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((prop) => <AnnonceCard key={prop.id} property={prop} />)}
          </div>
        )}
      </main>
    </div>
  );
}