"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { RefreshCw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// --- Sous-composant pour gérer les Params (Nécessaire pour le build Next.js) ---
function SearchBarContent({ onSearch }: { onSearch: (filters: any) => void }) {
  const searchParams = useSearchParams();
  
  // On initialise les filtres avec les valeurs de l'URL s'ils existent
  const [filters, setFilters] = useState({
    transaction: searchParams.get("transaction") || "vente",
    location: searchParams.get("location") || "",
    type: searchParams.get("type") || "",
    rooms: "",
    budgetMax: "",
    surfaceMin: "",
  });

  // 1. Déclenche la recherche automatique au chargement si on vient du Hero
  useEffect(() => {
    const hasParams = searchParams.get("transaction") || searchParams.get("location") || searchParams.get("type");
    if (hasParams) {
      onSearch(filters);
    }
  }, []);

  const handleInputChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const inputBaseStyle = "h-10 w-full bg-white text-slate-800 border-none rounded-none focus:ring-0 focus-visible:ring-0 outline-none transition-all";

  return (
    <div className="container mx-auto flex flex-wrap items-end justify-center gap-4 text-white">
      
      {/* --- JE SOUHAITE --- */}
      <div className="flex flex-col gap-2 min-w-[140px] relative">
        <label className="text-xs uppercase tracking-wider opacity-80">Je souhaite</label>
        <Select 
          value={filters.transaction} 
          onValueChange={(value) => handleInputChange("transaction", value)}
        >
          <SelectTrigger className={`${inputBaseStyle} font-bold text-[#3d7a85] px-4`}>
            <SelectValue placeholder="Acheter" />
          </SelectTrigger>
          <SelectContent className="rounded-none z-[100] bg-white border-none shadow-xl">
            <SelectItem value="vente" className="cursor-pointer focus:bg-slate-100">Acheter</SelectItem>
            <SelectItem value="location" className="cursor-pointer focus:bg-slate-100">Louer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* --- LOCALISATION --- */}
      <div className="flex flex-col gap-2 flex-1 min-w-[200px]">
        <label className="text-xs uppercase tracking-wider opacity-80">Localisation</label>
        <input
          type="text"
          value={filters.location}
          placeholder="Où voulez-vous vivre ?"
          className={`${inputBaseStyle} px-4 text-sm`}
          onChange={(e) => handleInputChange("location", e.target.value)}
        />
      </div>

      {/* --- TYPE DE BIEN --- */}
      <div className="flex flex-col gap-2 min-w-[150px]">
        <label className="text-xs uppercase tracking-wider opacity-80">Type de bien</label>
        <Select 
          value={filters.type}
          onValueChange={(value) => handleInputChange("type", value)}
        >
          <SelectTrigger className={`${inputBaseStyle} px-4 text-sm text-slate-800`}>
            <SelectValue placeholder="Famille de bien" />
          </SelectTrigger>
          <SelectContent className="rounded-none z-[100] bg-white border-none shadow-xl">
            <SelectItem value="0">Tous les biens</SelectItem>
            <SelectItem value="2">Maison</SelectItem>
            <SelectItem value="1">Appartement</SelectItem>
            <SelectItem value="terrain">Terrain</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* --- PIÈCES --- */}
      <div className="flex flex-col gap-2 w-28">
        <label className="text-xs uppercase tracking-wider opacity-80">Pièces</label>
        <Select onValueChange={(value) => handleInputChange("rooms", value)}>
          <SelectTrigger className={`${inputBaseStyle} px-4 text-sm text-slate-800`}>
            <SelectValue placeholder="Pièces" />
          </SelectTrigger>
          <SelectContent className="rounded-none z-[100] bg-white border-none shadow-xl">
            <SelectItem value="1">1+ pièce</SelectItem>
            <SelectItem value="3">3+ pièces</SelectItem>
            <SelectItem value="5">5+ pièces</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* --- BUDGET --- */}
      <div className="flex flex-col gap-2 w-32">
        <label className="text-xs uppercase tracking-wider opacity-80">Budget</label>
        <input
          type="number"
          placeholder="Budget max."
          className={`${inputBaseStyle} px-4 text-sm`}
          onChange={(e) => handleInputChange("budgetMax", e.target.value)}
        />
      </div>

      {/* --- SURFACE --- */}
      <div className="flex flex-col gap-2 w-32">
        <label className="text-xs uppercase tracking-wider opacity-80">Surface</label>
        <input
          type="number"
          placeholder="Surface min."
          className={`${inputBaseStyle} px-4 text-sm`}
          onChange={(e) => handleInputChange("surfaceMin", e.target.value)}
        />
      </div>

      {/* --- BOUTON OK --- */}
      <button 
        onClick={() => onSearch(filters)}
        className="flex items-center gap-2 text-white font-bold text-2xl hover:scale-105 transition-all h-10 pb-1"
      >
        <RefreshCw className="h-6 w-6" /> OK
      </button>
    </div>
  );
}

// --- Wrapper principal avec Suspense ---
export default function SearchBar({ onSearch }: { onSearch: (filters: any) => void }) {
  return (
    <div className="w-full bg-[#3d7a85] py-6 px-4 relative z-50">
      <Suspense fallback={<div className="text-white text-center">Chargement du moteur...</div>}>
        <SearchBarContent onSearch={onSearch} />
      </Suspense>
    </div>
  );
}