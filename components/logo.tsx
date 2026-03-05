"use client";

export const Logo = () => (
  <div className="flex flex-col items-center leading-none">
    {/* "merci" en Monoton avec un espacement large pour le style enseigne */}
    <span className="font-monoton text-2xl md:text-4xl text-slate-800 tracking-widest text-teal-600">
      merci
    </span>
    
    {/* "immobilier" en Pinyon Script pour casser le côté rigide de Monoton */}
    <span className=" text-2xl md:text-3xl font-medium mt-[-6px]  -tracking-tight ml-[-2px] text-slate-700">
      immobilier
    </span>
  </div>
);