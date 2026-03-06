"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  MapPin, 
  Maximize, 
  Layers, 
  ChevronLeft, 
  Phone, 
  Mail, 
  Grid, 
  X, 
  ChevronRight,
  Loader2 
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function PropertyDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  useEffect(() => {
    async function fetchProperty() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        router.push("/annonces");
      } else {
        setProperty(data);
      }
      setLoading(false);
    }
    fetchProperty();
  }, [id, router]);

  const openGallery = (index: number) => {
    setCurrentImageIdx(index);
    setIsGalleryOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
    document.body.style.overflow = 'auto';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-teal-600/5">
        <Loader2 className="h-12 w-12 animate-spin text-teal-700 mb-4" />
        <p className="text-teal-900 font-medium tracking-widest uppercase text-xs">Alamiia prépare la visite...</p>
      </div>
    );
  }

  if (!property) return null;

  return (
    <div className="min-h-screen bg-white pt-6 pb-12 font-sans relative">
      
      {/* --- LIGHTBOX --- */}
      {isGalleryOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center" onClick={closeGallery}>
          <button onClick={closeGallery} className="absolute top-6 right-6 text-white hover:text-teal-400 z-[110]">
            <X className="h-10 w-10" />
          </button>
          <div className="relative w-full max-w-6xl h-[80vh] flex items-center justify-center px-4" onClick={(e) => e.stopPropagation()}>
            <img src={property.images[currentImageIdx]} className="max-w-full max-h-full object-contain" alt="Vue" />
            <button onClick={() => setCurrentImageIdx(prev => prev === 0 ? property.images.length - 1 : prev - 1)} className="absolute left-4 text-white p-4"><ChevronLeft className="h-10 w-10" /></button>
            <button onClick={() => setCurrentImageIdx(prev => prev === property.images.length - 1 ? 0 : prev + 1)} className="absolute right-4 text-white p-4"><ChevronRight className="h-10 w-10" /></button>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4">
        {/* En-tête simplifié */}
        <div className="mb-6">
          <button onClick={() => router.back()} className="flex items-center text-slate-400 hover:text-teal-700 text-xs uppercase tracking-[0.2em] font-bold transition-colors">
            <ChevronLeft className="h-4 w-4 mr-1" /> Retour aux annonces
          </button>
        </div>

        {/* --- GRILLE D'IMAGES --- */}
        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-2 mb-10 group cursor-pointer">
          <div className="md:col-span-2 relative bg-slate-100 overflow-hidden" onClick={() => openGallery(0)}>
            <img src={property.images[0]} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Vue principale" />
          </div>
          <div className="hidden md:grid md:col-span-2 grid-cols-2 gap-2">
             {property.images.slice(1, 5).map((img: string, idx: number) => (
               <div key={idx} className="relative aspect-square overflow-hidden bg-slate-100" onClick={() => openGallery(idx + 1)}>
                 <img src={img} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" alt={`Vue ${idx + 2}`} />
                 {idx === 3 && property.images.length > 5 && (
                   <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center pointer-events-none text-white font-bold">
                     <p className="text-xl">+ {property.images.length - 5}</p>
                     <p className="text-[10px] uppercase tracking-widest">photos</p>
                   </div>
                 )}
               </div>
             ))}
          </div>
          <button onClick={() => openGallery(0)} className="absolute bottom-6 right-6 bg-white border border-slate-900 px-6 py-3 text-xs font-bold uppercase tracking-widest flex items-center gap-3 hover:bg-slate-900 hover:text-white transition-all shadow-xl z-20">
            <Grid className="h-4 w-4" /> Voir toutes les photos
          </button>
        </div>

        {/* --- NOUVELLE SECTION TITRE / PRIX / VILLE --- */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10 pb-10 border-b border-slate-100">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-3">{property.title}</h1>
            <div className="flex items-center text-slate-500 text-lg">
              <MapPin className="h-5 w-5 mr-2 text-teal-600" />
              {property.city} ({property.zipcode})
              <span className="mx-4 text-slate-200">|</span>
              <span className="text-sm uppercase tracking-widest font-medium opacity-70">Réf: {property.reference}</span>
            </div>
          </div>
          <div className="bg-teal-700 text-white px-8 py-4 text-center">
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-80 mb-1">Prix de vente</p>
            <p className="text-3xl font-bold">{property.price.toLocaleString()} €</p>
          </div>
        </div>

        {/* --- CONTENU --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            {/* CARACTÉRISTIQUES */}
            <div className="flex flex-wrap gap-12 mb-12">
              <div className="flex items-center gap-4">
                <div className="bg-teal-600/5 p-4"><Maximize className="h-7 w-7 text-teal-700" /></div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Surface</p>
                  <p className="text-xl font-semibold text-slate-800">{property.surface} m²</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-teal-600/5 p-4"><Layers className="h-7 w-7 text-teal-700" /></div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Pièces</p>
                  <p className="text-xl font-semibold text-slate-800">{property.rooms} pièces</p>
                </div>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="mb-12">
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-teal-700 mb-6 flex items-center gap-4">
                Description du bien <span className="h-[1px] flex-1 bg-teal-50"></span>
              </h2>
              <p className="text-slate-600 leading-relaxed whitespace-pre-wrap text-lg font-light">
                {property.description}
              </p>
            </div>
          </div>

          {/* --- BLOC CONTACT (STICKY) --- */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-white border border-slate-100 p-10 shadow-2xl">
              <div className="space-y-4">
                <button className="w-full bg-teal-700 text-white py-5 font-bold hover:bg-teal-800 transition-all flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-xs shadow-lg shadow-teal-700/20">
                  <Phone className="h-4 w-4" /> Appeler l'expert
                </button>
                <button className="w-full bg-white border border-teal-700 text-teal-700 py-5 font-bold hover:bg-teal-50 transition-all flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-xs">
                  <Mail className="h-4 w-4" /> Envoyer un message
                </button>
              </div>

              <div className="mt-10 pt-10 border-t border-slate-100 flex items-center gap-5">
                <div className="h-14 w-14 bg-teal-700 flex items-center justify-center font-bold text-white text-xl">M</div>
                <div>
                  <p className="font-bold text-slate-900 tracking-tight">Merci Immobilier</p>
                  <p className="text-xs text-slate-500 uppercase tracking-widest">Conseiller Perpignan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}