"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { MapPin, Maximize, Layers, ChevronLeft, Phone, Mail, Calendar } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function PropertyDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    async function fetchProperty() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        console.error("Bien introuvable");
        router.push("/annonces");
      } else {
        setProperty(data);
      }
      setLoading(false);
    }
    fetchProperty();
  }, [id, router]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Chargement de la villa...</div>;
  if (!property) return null;

  return (
    <div className="min-h-screen bg-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Retour */}
        <button 
          onClick={() => router.back()}
          className="flex items-center text-slate-500 hover:text-teal-700 mb-6 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" /> Retour aux annonces
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* COLONNE GAUCHE : GALERIE */}
          <div className="lg:col-span-2">
            <div className="relative h-[500px] rounded-3xl overflow-hidden mb-4 bg-slate-100">
              <img 
                src={property.images[activeImage]} 
                alt={property.title}
                className="w-full h-full object-cover transition-opacity duration-500"
              />
              <div className="absolute bottom-6 right-6 bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm">
                {activeImage + 1} / {property.images.length}
              </div>
            </div>

            {/* Miniatures */}
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {property.images.map((img: string, index: number) => (
                <button 
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`relative h-24 w-32 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${activeImage === index ? 'border-teal-600 scale-95' : 'border-transparent opacity-70'}`}
                >
                  <img src={img} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <div className="mt-8">
              <h1 className="text-4xl font-semibold text-slate-800 mb-2">{property.title}</h1>
              <div className="flex items-center text-slate-500 mb-6">
                <MapPin className="h-5 w-5 mr-2 text-teal-600" />
                {property.city} ({property.zipcode}) — Réf: {property.reference}
              </div>

              <div className="flex gap-8 py-6 border-y border-slate-100 mb-8">
                <div className="flex items-center gap-3">
                  <div className="bg-teal-50 p-3 rounded-2xl"><Maximize className="h-6 w-6 text-teal-700" /></div>
                  <div><p className="text-xs text-slate-500 uppercase font-bold">Surface</p><p className="font-semibold">{property.surface} m²</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-teal-50 p-3 rounded-2xl"><Layers className="h-6 w-6 text-teal-700" /></div>
                  <div><p className="text-xs text-slate-500 uppercase font-bold">Pièces</p><p className="font-semibold">{property.rooms} pièces</p></div>
                </div>
              </div>

              <h2 className="text-2xl font-semibold mb-4">Description</h2>
              <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{property.description}</p>
            </div>
          </div>

          {/* COLONNE DROITE : CONTACT & PRIX */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-slate-50 border border-slate-200 p-8 rounded-3xl shadow-sm">
              <div className="mb-8">
                <p className="text-slate-500 text-sm mb-1">Prix de vente</p>
                <p className="text-4xl font-bold text-teal-800">{property.price.toLocaleString()} €</p>
              </div>

              <div className="space-y-4">
                <button className="w-full bg-teal-700 text-white py-4 rounded-2xl font-bold hover:bg-teal-800 transition-all flex items-center justify-center gap-2">
                  <Phone className="h-5 w-5" /> Contacter l'agence
                </button>
                <button className="w-full bg-white border border-teal-700 text-teal-700 py-4 rounded-2xl font-bold hover:bg-teal-50 transition-all flex items-center justify-center gap-2">
                  <Mail className="h-5 w-5" /> Envoyer un message
                </button>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-200">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center font-bold text-teal-700">M</div>
                  <div>
                    <p className="font-bold">Merci Immobilier</p>
                    <p className="text-sm text-slate-500">Votre expert à Perpignan</p>
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