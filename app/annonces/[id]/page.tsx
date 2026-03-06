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
import PropertyDiagnostics from "@/components/PropertyDiagnostics";
import ContactForm from "@/components/ContactForm";

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
        .select(`
          *,
          agents (
            name,
            email,
            phone,
            job_title,
            photo_url
          )
        `)
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

  // --- EXTRACTION DYNAMIQUE DEPUIS APIMO ---
  // On regarde d'abord dans le JSON brut d'Apimo, sinon on utilise la table agents
  const apimoUser = property.raw_apimo_json?.user;
  
  const agentInfo = {
    name: apimoUser ? `${apimoUser.firstname} ${apimoUser.lastname}` : property.agents?.name || "L'équipe Merci",
    phone: apimoUser?.mobile || apimoUser?.phone || property.agents?.phone || "0616224682",
    email: apimoUser?.email || property.agents?.email || "contact@merci-immo.com",
    photo: apimoUser?.picture || property.agents?.photo_url,
    job: property.agents?.job_title || "Conseiller Immobilier"
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-12 font-sans relative">
      
      {/* --- LIGHTBOX --- */}
      {isGalleryOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center" onClick={closeGallery}>
          <button onClick={closeGallery} className="absolute top-6 right-6 text-white hover:text-teal-400 z-[110]"><X className="h-10 w-10" /></button>
          <div className="relative w-full max-w-6xl h-[80vh] flex items-center justify-center px-4" onClick={(e) => e.stopPropagation()}>
            <img src={property.images[currentImageIdx]} className="max-w-full max-h-full object-contain" alt="Vue" />
            <button onClick={() => setCurrentImageIdx(prev => prev === 0 ? property.images.length - 1 : prev - 1)} className="absolute left-4 text-white p-4"><ChevronLeft className="h-10 w-10" /></button>
            <button onClick={() => setCurrentImageIdx(prev => prev === property.images.length - 1 ? 0 : prev + 1)} className="absolute right-4 text-white p-4"><ChevronRight className="h-10 w-10" /></button>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4">
        {/* Navigation retour */}
        <div className="mb-6">
          <button onClick={() => router.back()} className="flex items-center text-slate-400 hover:text-teal-700 text-xs uppercase tracking-[0.2em] font-bold transition-colors">
            <ChevronLeft className="h-4 w-4 mr-1" /> Retour
          </button>
        </div>

        {/* Grille d'images */}
        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-2 mb-10 group cursor-pointer overflow-hidden">
          <div className="md:col-span-2 relative bg-slate-100 h-full" onClick={() => openGallery(0)}>
            <img src={property.images[0]} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Vue principale" />
          </div>
          <div className="hidden md:grid md:col-span-2 grid-cols-2 gap-2">
             {property.images.slice(1, 5).map((img: string, idx: number) => (
               <div key={idx} className="relative aspect-square overflow-hidden bg-slate-100" onClick={() => openGallery(idx + 1)}>
                 <img src={img} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" alt={`Vue ${idx + 2}`} />
               </div>
             ))}
          </div>
          <button onClick={() => openGallery(0)} className="absolute bottom-6 right-6 bg-white border border-slate-900 px-6 py-3 text-xs font-bold uppercase tracking-widest flex items-center gap-3 hover:bg-slate-900 hover:text-white transition-all shadow-xl z-20 rounded-none">
            <Grid className="h-4 w-4" /> {property.images.length} photos
          </button>
        </div>

        {/* Infos Titre & Prix */}
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
            <p className="text-3xl font-bold">{property.price?.toLocaleString()} €</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            {/* Caractéristiques */}
            <div className="flex flex-wrap gap-12 mb-12 py-6 border-b border-slate-50">
              <div className="flex items-center gap-4">
                <div className="bg-teal-600/5 p-4"><Maximize className="h-7 w-7 text-teal-700" /></div>
                <div><p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Surface</p><p className="text-xl font-semibold text-slate-800">{property.surface} m²</p></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-teal-600/5 p-4"><Layers className="h-7 w-7 text-teal-700" /></div>
                <div><p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Pièces</p><p className="text-xl font-semibold text-slate-800">{property.rooms} pièces</p></div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-12">
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-teal-700 mb-6 flex items-center gap-4">Description <span className="h-[1px] flex-1 bg-teal-50"></span></h2>
              <p className="text-slate-600 leading-relaxed whitespace-pre-wrap text-lg font-light">{property.description}</p>
            </div>
            <PropertyDiagnostics rawApimoJson={property.raw_apimo_json} />
          </div>

          {/* --- BLOC CONTACT DYNAMIQUE --- */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-white border border-slate-100 p-8 shadow-2xl">
              
              <div className="flex items-center gap-5 mb-8">
                <div className="h-20 w-20 bg-teal-700 flex flex-shrink-0 items-center justify-center text-white text-3xl font-bold overflow-hidden shadow-inner border border-slate-100">
                  {agentInfo.photo ? (
                    <img 
                      src={agentInfo.photo} 
                      alt={agentInfo.name} 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <span className="font-serif">{agentInfo.name.charAt(0)}</span>
                  )}
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-teal-600 font-bold mb-1">Votre Expert dédié</p>
                  <p className="text-xl font-bold text-slate-900 leading-tight">
                    {agentInfo.name}
                  </p>
                  <p className="text-sm text-slate-500 font-medium mb-1">
                    {agentInfo.job}
                  </p>
                  {agentInfo.phone && (
                    <p className="text-sm text-teal-700 font-bold flex items-center gap-1">
                      <Phone className="h-3 w-3" /> {agentInfo.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-3 mb-8">
               <ContactForm property={property} agent={agentInfo} />
              </div>

              <div className="pt-8 border-t border-slate-100">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 bg-slate-900 flex-shrink-0 flex items-center justify-center text-white font-serif font-bold">M</div>
                  <div className="text-[13px] text-slate-500 leading-relaxed">
                    <p className="font-bold text-slate-900 uppercase text-[10px] tracking-widest mb-1">Merci Immobilier</p>
                    <p>7 avenue de Banyuls sur Mer,<br />66100 Perpignan, France</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}