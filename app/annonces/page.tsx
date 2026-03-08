"use client";

import React, { useEffect, useState } from "react";
import { MapPin, Maximize, Layers, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import SearchBar from "@/components/SearchBar"; 

// --- COMPOSANT CARTE (AnnonceCard) ---
const AnnonceCard = ({ property }: { property: any }) => {
  const mainImage = property.images?.[0] || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop";

  return (
    <Link href={`/annonces/${property.id}`} className="block group">
      {/* Modification : rounded-none pour supprimer les coins arrondis */}
      <div className="bg-white rounded-none overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-teal-600/5 h-full">
        <div className="relative h-64 overflow-hidden">
          <img src={mainImage} alt={property.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          
          {/* Tags et Prix en rounded-none également */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-none text-[10px] font-bold uppercase tracking-widest text-teal-800">
            {property.property_type === 2 ? "Maison" : "Bien"}
          </div>
          <div className="absolute bottom-4 left-4 bg-teal-700 text-white px-4 py-1 rounded-none font-bold">
            {property.price > 0 ? `${property.price.toLocaleString()} €` : "Prix sur demande"}
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-lg font-semibold text-slate-800 line-clamp-1 group-hover:text-[#3d7a85] transition-colors mb-1">{property.title}</h3>
          <div className="flex items-center text-slate-500 text-xs mb-4">
            <MapPin className="h-3 w-3 mr-1" /> {property.city} ({property.zipcode})
          </div>
          <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-slate-600">
            <div className="flex items-center gap-1"><Layers className="h-4 w-4 text-teal-600" /><span className="text-xs font-medium">{property.rooms} p.</span></div>
            <div className="flex items-center gap-1"><Maximize className="h-4 w-4 text-teal-600" /><span className="text-xs font-medium">{property.surface} m²</span></div>
            <span className="text-teal-700 font-bold text-xs group-hover:underline">Voir le bien</span>
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
    
    if (filters.location) {
      results = results.filter(p => p.city?.toLowerCase().includes(filters.location.toLowerCase()));
    }
    if (filters.type && filters.type !== "0") {
      results = results.filter(p => p.property_type?.toString() === filters.type);
    }
    if (filters.rooms && filters.rooms !== "") {
      results = results.filter(p => p.rooms >= parseInt(filters.rooms));
    }
    if (filters.budgetMax && filters.budgetMax !== "") {
      results = results.filter(p => p.price <= parseInt(filters.budgetMax));
    }
    if (filters.surfaceMin && filters.surfaceMin !== "") {
      results = results.filter(p => p.surface >= parseInt(filters.surfaceMin));
    }
    
    setFilteredProperties(results);
  };

  return (
    <div className="min-h-screen bg-slate-200">
      <div className="w-full">
        <SearchBar onSearch={handleSearch} />
      </div>

      <main className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-medium text-slate-800">
              Nos Biens <span className="font-pinyon  text-4xl">disponibles</span>
            </h1>
            <p className="text-slate-500 mt-2">
              {loading ? "Chargement..." : `${filteredProperties.length} annonces trouvées`}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Loader2 className="h-10 w-10 animate-spin mb-4 text-teal-600" />
            <p>Nous  recherchons vos biens...</p>
          </div>
        ) : (
          /* Modification : grid-cols-1 à xl:grid-cols-4 pour avoir 4 colonnes sur grand écran */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((prop) => <AnnonceCard key={prop.id} property={prop} />)
            ) : (
              <div className="col-span-full text-center py-20 text-slate-500">
                Aucun bien ne correspond à vos critères.
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}