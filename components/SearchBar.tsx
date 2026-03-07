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

function SearchBarContent({ onSearch }: { onSearch: (filters: any) => void }) {
  const searchParams = useSearchParams();
  
  const [filters, setFilters] = useState({
    transaction: searchParams.get("transaction") || "vente",
    location: searchParams.get("location") || "",
    type: searchParams.get("type") || "",
    rooms: "",
    budgetMax: "",
    surfaceMin: "",
  });

  useEffect(() => {
    const hasParams = searchParams.get("transaction") || searchParams.get("location") || searchParams.get("type");
    if (hasParams) {
      onSearch(filters);
    }
  }, []);

  const handleInputChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const inputBaseStyle = "h-10 w-full bg-white text-slate-800 border-none rounded-none focus:ring-0 focus-visible:ring-0 outline-none transition-all flex items-center box-border";

  return (
    <div className="container mx-auto flex flex-wrap items-end justify-start gap-6 text-white pl-4">
      
      {/* --- JE SOUHAITE --- */}
      <div className="flex flex-col gap-1.5 min-w-[130px]">
        <label className="text-[10px] uppercase tracking-wider opacity-80 font-semibold">Je souhaite</label>
        <Select 
          value={filters.transaction} 
          onValueChange={(value) => handleInputChange("transaction", value)}
        >
          <SelectTrigger className={`${inputBaseStyle} font-bold text-[#3d7a85] px-4`}>
            <SelectValue placeholder="Acheter" />
          </SelectTrigger>
          <SelectContent className="rounded-none z-[100] bg-white border-none shadow-xl">
            <SelectItem value="vente">Acheter</SelectItem>
            <SelectItem value="location">Louer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* --- LOCALISATION --- */}
      <div className="flex flex-col gap-1.5 w-56"> 
        <label className="text-[10px] uppercase tracking-wider opacity-80 font-semibold">Localisation</label>
        <input
          type="text"
          value={filters.location}
          placeholder="Où vivez-vous ?"
          className={`${inputBaseStyle} px-4 text-sm`}
          onChange={(e) => handleInputChange("location", e.target.value)}
        />
      </div>

      {/* --- TYPE DE BIEN --- */}
      <div className="flex flex-col gap-1.5 min-w-[140px]">
        <label className="text-[10px] uppercase tracking-wider opacity-80 font-semibold">Type de bien</label>
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
      <div className="flex flex-col gap-1.5 w-24">
        <label className="text-[10px] uppercase tracking-wider opacity-80 font-semibold">Pièces</label>
        <Select onValueChange={(value) => handleInputChange("rooms", value)}>
          <SelectTrigger className={`${inputBaseStyle} px-4 text-sm text-slate-800`}>
            <SelectValue placeholder="Min." />
          </SelectTrigger>
          <SelectContent className="rounded-none z-[100] bg-white border-none shadow-xl">
            <SelectItem value="1">1+ p.</SelectItem>
            <SelectItem value="2">2+ p.</SelectItem>
            <SelectItem value="3">3+ p.</SelectItem>
            <SelectItem value="4">4+ p.</SelectItem>
            <SelectItem value="5">5+ p.</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* --- BUDGET --- */}
      <div className="flex flex-col gap-1.5 w-32">
        <label className="text-[10px] uppercase tracking-wider opacity-80 font-semibold">Budget Max</label>
        <Select onValueChange={(value) => handleInputChange("budgetMax", value)}>
          <SelectTrigger className={`${inputBaseStyle} px-4 text-sm text-slate-800`}>
            <SelectValue placeholder="Budget" />
          </SelectTrigger>
          <SelectContent className="rounded-none z-[100] bg-white border-none shadow-xl">
            <SelectItem value="100000">100 000 €</SelectItem>
            <SelectItem value="150000">150 000 €</SelectItem>
            <SelectItem value="200000">200 000 €</SelectItem>
            <SelectItem value="250000">250 000 €</SelectItem>
            <SelectItem value="300000">300 000 €</SelectItem>
            <SelectItem value="400000">400 000 €</SelectItem>
            <SelectItem value="500000">500 000 €</SelectItem>
            <SelectItem value="750000">750 000 €</SelectItem>
            <SelectItem value="1000000">1M € +</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* --- SURFACE --- */}
      <div className="flex flex-col gap-1.5 w-28">
        <label className="text-[10px] uppercase tracking-wider opacity-80 font-semibold">Surface Min</label>
        <Select onValueChange={(value) => handleInputChange("surfaceMin", value)}>
          <SelectTrigger className={`${inputBaseStyle} px-4 text-sm text-slate-800`}>
            <SelectValue placeholder="Surface" />
          </SelectTrigger>
          <SelectContent className="rounded-none z-[100] bg-white border-none shadow-xl">
            <SelectItem value="20">20 m²</SelectItem>
            <SelectItem value="40">40 m²</SelectItem>
            <SelectItem value="60">60 m²</SelectItem>
            <SelectItem value="80">80 m²</SelectItem>
            <SelectItem value="100">100 m²</SelectItem>
            <SelectItem value="120">120 m²</SelectItem>
            <SelectItem value="150">150 m²</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* --- BOUTON OK --- */}
      <button 
        onClick={() => onSearch(filters)}
        className="flex items-center justify-center gap-2 text-white font-bold text-xl hover:scale-105 transition-all h-10 px-2"
      >
        <RefreshCw className="h-5 w-5" /> OK
      </button>
    </div>
  );
}

export default function SearchBar({ onSearch }: { onSearch: (filters: any) => void }) {
  return (
    <div className="w-full bg-teal-700 py-3 px-4 relative z-50 pb-6 ">
      <Suspense fallback={<div className="text-white text-center text-xs">Chargement...</div>}>
        <SearchBarContent onSearch={onSearch} />
      </Suspense>
    </div>
  );
}