import type { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
import AnnoncesListClient from "./AnnoncesListClient";

export const metadata: Metadata = {
  title: "Nos biens à vendre",
  description:
    "Découvrez toutes les annonces immobilières de Merci Immobilier à Perpignan et ses environs : maisons, appartements et terrains à vendre.",
  alternates: { canonical: "/annonces" },
};

export default async function AnnoncesPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("properties")
    .select("*")
    .order("updated_at", { ascending: false });

  return <AnnoncesListClient initialProperties={data || []} />;
}
