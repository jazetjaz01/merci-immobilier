"use client";

export const Logo = () => (
  <div className="flex flex-col items-center leading-none">
    {/* "merci" toujours visible, taille adaptée pour mobile/desktop */}
    <span className="font-monoton text-2xl md:text-4xl tracking-widest text-teal-600">
      merci
    </span>
    
    {/* "immobilier" : Masqué sur mobile (hidden), affiché à partir de md (md:block) */}
    <span className="hidden md:block text-2xl md:text-3xl font-medium -mt-1.5 -tracking-tight -ml-0.5 text-slate-700">
      immobilier
    </span>
  </div>
);