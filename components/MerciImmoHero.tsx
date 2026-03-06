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
  
  // États pour capturer les choix de l'utilisateur
  const [transaction, setTransaction] = useState("acheter");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");

  const inputStyle = "h-12 w-full text-base px-6 rounded-none border-none bg-white focus-visible:ring-teal-500 transition-all flex items-center text-slate-700";

  const handleSearch = () => {
    // Construction des paramètres de recherche pour l'URL
    const params = new URLSearchParams();
    if (transaction) params.append("transaction", transaction === "louer" ? "location" : "vente");
    if (type) params.append("type", type);
    if (location) params.append("location", location);

    // Navigation vers la page annonces avec les filtres
    router.push(`/annonces?${params.toString()}`);
  };

  return (
    <section className="font-sans min-h-[600px] w-full bg-background border-b overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 h-[600px] relative">
        
        {/* --- Colonne Gauche : IMAGE --- */}
        <div className="relative h-full w-full z-0">
          <Image
            src="/femme.jpg" 
            alt="Merci Immobilier - Accompagnement" 
            fill 
            priority 
            className="object-cover" 
          />
        </div>

        {/* --- Colonne Droite : FORMULAIRE --- */}
        <div className="relative p-8 md:p-16 flex flex-col justify-center items-center md:items-start z-10
                        after:content-[''] after:absolute 
                        after:top-0 after:bottom-0 after:right-0 
                        after:left-[-80px]
                        after:bg-teal-700 after:-z-10
                        md:after:[clip-path:polygon(0%_0%,100%_0%,100%_100%,80px_100%)]">

          {/* Titres */}
          <div className="mb-12 text-center md:text-left relative z-20">
            <p className="text-xl font-medium mb-2 text-white opacity-90">
              Merci agence immobilière,
            </p>
            <h1 className="text-3xl md:text-5xl font-medium text-white leading-tight tracking-wide">
              Acheter et vendre <br />sans prise de tête
            </h1>
          </div>

          {/* Bloc Recherche */}
          <div className="w-full max-w-xl flex flex-col overflow-visible relative z-20">
            <Tabs defaultValue="acheter" onValueChange={setTransaction} className="w-full">
              <TabsList className="grid grid-cols-3 bg-transparent p-0 mb-8 rounded-none w-full h-12 gap-0 overflow-visible">
                {["acheter", "louer", "vendre"].map((tab) => (
                  <TabsTrigger 
                    key={tab}
                    value={tab} 
                    className="relative overflow-visible rounded-none h-12 text-base font-medium transition-all
                               text-white border-none shadow-none bg-transparent
                               data-[state=active]:bg-white data-[state=active]:text-slate-800
                               hover:bg-white/10 group px-6"
                  >
                    <span className="capitalize">{tab}</span>
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 hidden 
                                    group-data-[state=active]:block transition-all z-50">
                      <Play className="fill-white text-white rotate-90 size-5" />
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <div className="space-y-3">
                {/* On ne garde qu'un seul set de champs pour la simplicité, les Tabs gèrent l'état 'transaction' */}
                <Select onValueChange={setType}>
                  <SelectTrigger className={inputStyle}>
                    <SelectValue placeholder="Que recherchez-vous ?" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    <SelectItem value="2">Maison</SelectItem>
                    <SelectItem value="1">Appartement</SelectItem>
                    <SelectItem value="terrain">Terrain</SelectItem>
                    <SelectItem value="bureaux">Bureaux</SelectItem>
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
              className="w-full h-12 mt-4 bg-[#2D333F] hover:bg-[#1A1E24] text-white text-lg font-semibold rounded-none flex items-center justify-center gap-2 transition-colors shadow-md shrink-0"
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