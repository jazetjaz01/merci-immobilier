"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Play } from "lucide-react";

export default function MerciImmoHero() {
  const router = useRouter();
  
  const [transaction, setTransaction] = useState("acheter");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");

  const inputStyle = "h-12 w-full text-base px-6 rounded-none border-none bg-white focus-visible:ring-teal-500 transition-all flex items-center text-slate-700 shadow-sm";

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (transaction) params.append("transaction", transaction === "louer" ? "location" : "vente");
    if (type) params.append("type", type);
    if (location) params.append("location", location);
    router.push(`/annonces?${params.toString()}`);
  };

  return (
    <section className="font-sans min-h-screen md:min-h-[600px] w-full bg-background border-b overflow-hidden">
      <div className="flex flex-col md:grid md:grid-cols-2 md:h-[600px] relative">
        
        {/* --- Colonne IMAGE (Haut sur mobile, Gauche sur desktop) --- */}
        <div className="relative h-[250px] md:h-full w-full z-0">
          <Image
            src="/accueil/femme1.jpg" 
            alt="Merci Immobilier - Accompagnement" 
            fill 
            priority 
            className="object-cover object-top md:object-cover" 
          />
        </div>

        {/* --- Colonne FORMULAIRE --- */}
        <div className="relative p-6 md:p-16 flex flex-col justify-center items-center md:items-start z-10 bg-slate-300
                        md:bg-transparent
                        md:after:content-[''] md:after:absolute 
                        md:after:top-0 md:after:bottom-0 md:after:right-0 
                        md:after:left-[-80px]
                        md:after:bg-slate-300 md:after:-z-10
                        md:after:[clip-path:polygon(0%_0%,100%_0%,100%_100%,80px_100%)]">

          {/* Titres - Ajustement des tailles pour mobile */}
         <div className="mb-6 md:mb-8 text-center md:text-left relative z-20">
  <p className="text-lg md:text-xl font-medium mb-0  opacity-90 leading-none">
    Merci agence immobilière,
  </p>
  <h1 className="text-2xl md:text-5xl font-medium text-slate-900 leading-tight tracking-wide mt-1">
    Acheter et vendre sans <br /> <span className="font-pinyon text-4xl md:text-6xl  italic mx-1">prise</span> de tête
  </h1>
</div>

          {/* Bloc Recherche */}
          <div className="w-full max-w-xl flex flex-col overflow-visible relative z-20">
            <Tabs defaultValue="acheter" onValueChange={setTransaction} className="w-full">
              {/* Tabs ajustées pour mobile (plus petites) */}
              <TabsList className="grid grid-cols-3 bg-transparent p-0 mb-6 rounded-none w-full h-10 md:h-12 gap-0 overflow-visible">
                {["acheter", "louer", "vendre"].map((tab) => (
                  <TabsTrigger 
                    key={tab}
                    value={tab} 
                    className="relative overflow-visible rounded-none h-10 md:h-12 text-sm md:text-base font-medium transition-all
                               text-white border-none shadow-none bg-transparent
                               data-[state=active]:bg-white data-[state=active]:text-slate-800
                               hover:bg-white/10 group px-2 md:px-6"
                  >
                    <span className="capitalize">{tab}</span>
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 hidden 
                                    group-data-[state=active]:block transition-all z-50">
                      <Play className="fill-white text-white rotate-90 size-4 md:size-5" />
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <div className="space-y-3">
                <Select onValueChange={setType}>
                  <SelectTrigger className={inputStyle}>
                    <SelectValue placeholder="Que recherchez-vous ?" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    <SelectItem value="2">Maison</SelectItem>
                    <SelectItem value="1">Appartement</SelectItem>
                    <SelectItem value="terrain">Terrain</SelectItem>
                  </SelectContent>
                </Select>

                <Select onValueChange={setLocation}>
                  <SelectTrigger className={inputStyle}>
                    <SelectValue placeholder="Localisation" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    <SelectItem value="Perpignan">Perpignan</SelectItem>
                    <SelectItem value="Villeneuve-de-la-Raho">Villeneuve-de-la-Raho</SelectItem>
                    <SelectItem value="Canet-en-Roussillon">Canet-en-Roussillon</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Tabs>
            
            <Button 
              onClick={handleSearch}
              className="w-full h-12 mt-6 bg-[#2D333F] hover:bg-[#1A1E24] text-white text-lg font-semibold rounded-none flex items-center justify-center gap-2 transition-colors shadow-lg"
            >
              <Search className="size-5" />
              Rechercher
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}