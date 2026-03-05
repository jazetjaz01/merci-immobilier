"use client";

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
  const inputStyle = "h-12 w-full text-base px-6 rounded-none border-none bg-white focus-visible:ring-teal-500 transition-all flex items-center";

  return (
    <section className="font-sans min-h-150 w-full bg-background border-b overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 h-full relative">
        
        {/* --- Colonne Gauche --- */}
        <div className="relative h-100 md:h-full w-full z-0">
          <Image
            src="/femme.jpg" 
            alt="Femme travaillant" 
            fill 
            priority 
            className="object-cover" 
          />
        </div>

        {/* --- Colonne Droite --- */}
        <div className="relative p-8 md:p-16 flex flex-col justify-center items-center md:items-start z-10
                        after:content-[''] after:absolute 
                        after:top-0 after:bottom-0 after:right-0 
                        after:left-[-80px] /* On réduit un peu l'extension pour la ligne simple */
                        after:bg-teal-700 after:-z-10
                        /* POLYGONE SIMPLIFIÉ (4 POINTS) :
                           1. 0% 0%       : Part de l'image en haut
                           2. 100% 0%     : Coin haut droit
                           3. 100% 100%   : Coin bas droit
                           4. 80px 100%   : Arrive en bas au début du bouton (aligné sur l'extension)
                        */
                        md:after:[clip-path:polygon(0%_0%,100%_0%,100%_100%,80px_100%)]">

          <div className="mb-12 text-center md:text-left relative z-20">
            <p className="text-xl font-medium mb-2 text-white">
              Merci agence immobilière,
            </p>
            <h1 className="text-3xl md:text-5xl font-medium text-white leading-tight tracking-wide">
              Acheter et vendre <br />sans prise de tête
            </h1>
          </div>

          <div className="w-full max-w-xl h-[300px] flex flex-col overflow-visible relative z-20">
            <Tabs defaultValue="acheter" className="w-full">
              <TabsList className="grid grid-cols-3 bg-transparent p-0 mb-8 rounded-none w-full h-12 gap-0 overflow-visible">
                {["acheter", "louer", "vendre"].map((tab) => (
                  <TabsTrigger 
                    key={tab}
                    value={tab} 
                    className="relative overflow-visible rounded-none h-12 text-base font-medium transition-all
                               text-white border-none shadow-none bg-transparent
                               data-[state=active]:bg-white data-[state=active]:text-slate-800
                               hover:bg-white hover:text-slate-800
                               group px-6"
                  >
                    <span className="capitalize">{tab}</span>
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 hidden 
                                    group-data-[state=active]:block 
                                    group-hover:block transition-all z-50">
                      <Play className="fill-white text-white rotate-90 size-5" />
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <div className="h-[116px]">
                {["acheter", "louer", "vendre"].map((tab) => (
                  <TabsContent 
                    key={tab} 
                    value={tab} 
                    className="space-y-3 w-full m-0 h-full data-[state=inactive]:hidden outline-none animate-none"
                  >
                    <Select>
                      <SelectTrigger className={inputStyle}>
                        <SelectValue placeholder="Que recherchez-vous ?" />
                      </SelectTrigger>
                      <SelectContent className="rounded-none">
                        <SelectItem value="appartement">Appartement</SelectItem>
                        <SelectItem value="maison">Maison</SelectItem>
                        <SelectItem value="terrain">Terrain</SelectItem>
                        <SelectItem value="bureaux">Bureaux</SelectItem>
                        <SelectItem value="magasin">Magasin</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select>
                      <SelectTrigger className={inputStyle}>
                        <SelectValue placeholder="Localisation" />
                      </SelectTrigger>
                      <SelectContent className="rounded-none">
                        <SelectItem value="paris">Paris</SelectItem>
                        <SelectItem value="lyon">Lyon</SelectItem>
                        <SelectItem value="marseille">Marseille</SelectItem>
                      </SelectContent>
                    </Select>
                  </TabsContent>
                ))}
              </div>
            </Tabs>
            
            <Button 
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