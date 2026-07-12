import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Maximize,
  Layers,
  ChevronLeft,
  Phone,
} from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import PropertyDiagnostics from "@/components/PropertyDiagnostics";
import ContactForm from "@/components/ContactForm";
import PropertyGallery from "./PropertyGallery";

const siteUrl = "https://www.merci-immobilier.com";

const getProperty = cache(async (id: string) => {
  const supabase = await createClient();
  const { data } = await supabase
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

  return data;
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const property = await getProperty(id);

  if (!property) {
    return { title: "Annonce introuvable" };
  }

  const priceLabel = property.price > 0 ? `${property.price.toLocaleString()} €` : "Prix sur demande";
  const title = `${property.title} - ${property.city} (${priceLabel})`;
  const description = property.description
    ? property.description.slice(0, 155)
    : `${property.title} à vendre à ${property.city}. ${property.surface} m², ${property.rooms} pièces. ${priceLabel}.`;
  const image = property.images?.[0];

  return {
    title,
    description,
    alternates: { canonical: `/annonces/${id}` },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/annonces/${id}`,
      type: "website",
      images: image ? [{ url: image, width: 1200, height: 800, alt: property.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = await getProperty(id);

  if (!property) {
    notFound();
  }

  const apimoUser = property.raw_apimo_json?.user;

  const agentInfo = {
    name: apimoUser ? `${apimoUser.firstname} ${apimoUser.lastname}` : property.agents?.name || "L'équipe Merci",
    phone: apimoUser?.mobile || apimoUser?.phone || property.agents?.phone || "0616224682",
    email: apimoUser?.email || property.agents?.email || "contact@merci-immo.com",
    photo: apimoUser?.picture || property.agents?.photo_url,
    job: property.agents?.job_title || "Conseiller Immobilier",
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description,
    url: `${siteUrl}/annonces/${id}`,
    image: property.images,
    about: {
      "@type": property.property_type === 2 ? "House" : "Apartment",
      name: property.title,
      numberOfRooms: property.rooms,
      floorSize: {
        "@type": "QuantitativeValue",
        value: property.surface,
        unitCode: "MTK",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: property.city,
        postalCode: property.zipcode,
        addressCountry: "FR",
      },
    },
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <div className="min-h-screen bg-slate-200 pt-6 pb-4 font-sans relative">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link href="/annonces" className="flex items-center text-slate-400 hover:text-teal-700 text-xs uppercase tracking-[0.2em] font-bold transition-colors w-fit">
            <ChevronLeft className="h-4 w-4 mr-1" /> Retour
          </Link>
        </div>

        <PropertyGallery images={property.images || []} title={property.title} />

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

            <div className="mb-12">
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-teal-700 mb-6 flex items-center gap-4">Description <span className="h-[1px] flex-1 bg-teal-50"></span></h2>
              <p className="text-slate-600 leading-relaxed whitespace-pre-wrap text-lg font-light">{property.description}</p>
            </div>
            <PropertyDiagnostics rawApimoJson={property.raw_apimo_json} />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-white border border-slate-100 p-8 shadow-2xl">
              <div className="flex items-center gap-5 mb-8">
                <div className="h-20 w-20 bg-teal-700 flex flex-shrink-0 items-center justify-center text-white text-3xl font-bold overflow-hidden shadow-inner border border-slate-100">
                  {agentInfo.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
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
