"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Grid, X } from "lucide-react";
import Image from "next/image";

export default function PropertyGallery({ images, title }: { images: string[]; title: string }) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  const openGallery = (index: number) => {
    setCurrentImageIdx(index);
    setIsGalleryOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      {isGalleryOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center" onClick={closeGallery}>
          <button onClick={closeGallery} className="absolute top-6 right-6 text-white hover:text-teal-400 z-[110]"><X className="h-10 w-10" /></button>
          <div className="relative w-full max-w-6xl h-[80vh] flex items-center justify-center px-4" onClick={(e) => e.stopPropagation()}>
            <Image src={images[currentImageIdx]} fill sizes="100vw" className="object-contain" alt={`${title} - photo ${currentImageIdx + 1}`} />
            <button onClick={() => setCurrentImageIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1))} className="absolute left-4 text-white p-4"><ChevronLeft className="h-10 w-10" /></button>
            <button onClick={() => setCurrentImageIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1))} className="absolute right-4 text-white p-4"><ChevronRight className="h-10 w-10" /></button>
          </div>
        </div>
      )}

      <div className="relative grid grid-cols-1 md:grid-cols-4 gap-2 mb-10 group cursor-pointer overflow-hidden">
        <div className="md:col-span-2 relative bg-slate-100 h-full min-h-[300px]" onClick={() => openGallery(0)}>
          <Image src={images[0]} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-1000 group-hover:scale-105" alt={`${title} - vue principale`} priority />
        </div>
        <div className="hidden md:grid md:col-span-2 grid-cols-2 gap-2">
          {images.slice(1, 5).map((img: string, idx: number) => (
            <div key={idx} className="relative aspect-square overflow-hidden bg-slate-100" onClick={() => openGallery(idx + 1)}>
              <Image src={img} fill sizes="25vw" className="object-cover transition-transform duration-700 hover:scale-110" alt={`${title} - vue ${idx + 2}`} />
            </div>
          ))}
        </div>
        <button onClick={() => openGallery(0)} className="absolute bottom-6 right-6 bg-white border border-slate-900 px-6 py-3 text-xs font-bold uppercase tracking-widest flex items-center gap-3 hover:bg-slate-900 hover:text-white transition-all shadow-xl z-20 rounded-none">
          <Grid className="h-4 w-4" /> {images.length} photos
        </button>
      </div>
    </>
  );
}
