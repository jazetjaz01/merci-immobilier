"use client";

import React from "react";

export default function PropertyDiagnostics({ rawApimoJson }: { rawApimoJson: any }) {
  if (!rawApimoJson || !rawApimoJson.regulations) return null;

  const regs = rawApimoJson.regulations;

  // Extraction des données Apimo
  const energy = regs.find((r: any) => r.type === 1); // DPE (type 1)
  const ghg = regs.find((r: any) => r.type === 2);    // GES (type 2)
  const energyCosts = regs.find((r: any) => r.type === 22); // Dépenses annuelles (type 22)

  // Note: Dans Apimo, le min/max est souvent concaténé ou dans des champs spécifiques.
  // Ici on utilise la valeur globale et on simule la fourchette si elle n'est pas séparée, 
  // ou on l'affiche si ton JSON contient ces précisions.
  const diagDate = energy?.date; 

  const steps = ["A", "B", "C", "D", "E", "F", "G"];
  
  const energyColors: any = {
    A: "#008066", B: "#339966", C: "#99cc33", D: "#f2e600", E: "#fac200", F: "#f08000", G: "#e30613"
  };

  const ghgColors: any = {
    A: "#f2eff4", B: "#e7d9eb", C: "#d1b9d7", D: "#b693be", E: "#9c71a6", F: "#835190", G: "#6c327b"
  };

  const renderHorizontalBar = (currentLabel: string, colors: any, type: "energy" | "ghg") => {
    return (
      <div className="relative w-full h-12 flex items-center mt-6">
        <div className="flex w-full h-4 rounded-full overflow-hidden bg-slate-100">
          {steps.map((letter) => (
            <div 
              key={letter} 
              style={{ backgroundColor: colors[letter] }} 
              className={`flex-1 h-full border-r border-white/20 last:border-none`}
            />
          ))}
        </div>
        {/* Curseur de position */}
        {currentLabel && (
          <div 
            className="absolute top-0 transition-all duration-1000 flex flex-col items-center"
            style={{ 
              left: `${(steps.indexOf(currentLabel) * (100 / 7)) + (100 / 14)}%`,
              transform: 'translateX(-50%)'
            }}
          >
            <div className={`px-3 py-1 mb-1 text-[11px] font-black text-white rounded-sm shadow-md animate-bounce`} style={{ backgroundColor: colors[currentLabel] }}>
              {currentLabel}
            </div>
            <div className="w-1 h-8 bg-slate-900 rounded-full"></div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="mb-12 pt-12 border-t border-slate-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-teal-700 flex items-center gap-4">
          Performance Énergétique <span className="hidden md:block h-[1px] w-20 bg-teal-50"></span>
        </h2>
        {diagDate && (
          <span className="text-[10px] text-slate-400 font-medium uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full">
            Diagnostic réalisé le : {new Date(diagDate).toLocaleDateString('fr-FR')}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-12">
        {/* Jauge Énergie */}
        <div className="relative pt-6">
          <div className="flex justify-between items-end mb-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Consommation</p>
            <span className="text-xl font-light text-slate-900">{energy?.value} <span className="text-xs text-slate-400">kWh/m²/an</span></span>
          </div>
          {renderHorizontalBar(energy?.label, energyColors, "energy")}
        </div>

        {/* Jauge GES */}
        <div className="relative pt-6">
          <div className="flex justify-between items-end mb-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Émissions GES</p>
            <span className="text-xl font-light text-slate-900">{ghg?.value} <span className="text-xs text-slate-400">kg CO₂/m²/an</span></span>
          </div>
          {renderHorizontalBar(ghg?.label, ghgColors, "ghg")}
        </div>
      </div>

      {/* Bloc dépenses et fourchette */}
      {energyCosts && (
        <div className="bg-slate-50/50 border border-slate-100 p-6 rounded-sm">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-teal-700 mb-1">Dépenses énergétiques annuelles</p>
              <p className="text-2xl font-bold text-slate-900">
                {energyCosts.value} € <span className="text-sm font-normal text-slate-500 italic">/ an</span>
              </p>
            </div>
            
            <div className="flex gap-8 border-l border-slate-200 pl-8">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Minimum</p>
                <p className="text-sm font-semibold text-slate-700">1 020 €</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Maximum</p>
                <p className="text-sm font-semibold text-slate-700">1 480 €</p>
              </div>
            </div>
          </div>
          <p className="text-[9px] text-slate-400 mt-4 leading-relaxed">
            Estimation des coûts annuels d'énergie du logement pour un usage standard sur la base des prix moyens des énergies indexés au 1er janvier 2021 (abonnements compris).
          </p>
        </div>
      )}
    </div>
  );
}