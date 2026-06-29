import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Force Next.js à ne jamais mettre cette route en cache
export const dynamic = 'force-dynamic';

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const partnerId = process.env.APIMO_PARTNER_ID;
  const token = process.env.APIMO_TOKEN;
  const agencyId = process.env.APIMO_AGENCY_ID;

  if (!supabaseUrl || !supabaseKey || !partnerId || !token || !agencyId) {
    return NextResponse.json({ error: "Variables d'environnement manquantes" }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  async function uploadImageToSupabase(url: string, propertyId: number, imageId: number) {
    try {
      const response = await fetch(url);
      if (!response.ok) return null;
      
      const buffer = Buffer.from(await response.arrayBuffer());
      const filePath = `${propertyId}/${imageId}.jpg`;

      const { error: uploadError } = await supabase.storage
        .from('properties')
        .upload(filePath, buffer, { contentType: 'image/jpeg', upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('properties').getPublicUrl(filePath);
      return data.publicUrl;
    } catch (error) {
      console.error(`❌ Erreur image ${imageId}:`, error);
      return null;
    }
  }

  try {
    const auth = Buffer.from(`${partnerId}:${token}`).toString('base64');
    const res = await fetch(`https://api.apimo.pro/agencies/${agencyId}/properties`, {
      headers: { 
        'Authorization': `Basic ${auth}`,
        'Accept': 'application/json' 
      },
      next: { revalidate: 0 } // Désactive le cache au niveau du fetch
    });

    const data = await res.json();

    if (!data.properties || data.properties.length === 0) {
      return NextResponse.json({ message: "Aucune annonce trouvée." });
    }

    console.log(`🚀 Début de synchro : ${data.properties.length} biens trouvés.`);
    const syncResults = [];

    for (const p of data.properties) {
      // OPTIMISATION : On lance les uploads d'images en PARALLÈLE pour ce bien
      const imagePromises = (p.pictures || [])
        .slice(0, 12) // On limite à 12 pour la stabilité
        .map((pic: any) => uploadImageToSupabase(pic.url, p.id, pic.id));
      
      const localImageUrls = (await Promise.all(imagePromises)).filter(url => url !== null);

      const propertyData = {
        id: p.id,
        reference: p.reference?.toString(),
        title: p.comments?.[0]?.title || "Annonce Merci Immobilier",
        description: p.comments?.[0]?.comment || "",
        price: p.price?.value || 0,
        city: p.city?.name || "Perpignan",
        zipcode: p.city?.zipcode || "66000",
        surface: p.area?.value || 0,
        rooms: p.rooms || 0,
        bedrooms: p.bedrooms || 0,
        property_type: p.type,
        raw_apimo_json: p,
        images: localImageUrls,
        updated_at: new Date().toISOString()
      };

      const { error: upsertError } = await supabase
        .from('properties')
        .upsert(propertyData, { onConflict: 'id' });

      if (upsertError) {
        console.error(`❌ Erreur DB bien ${p.id}:`, upsertError.message);
      } else {
        syncResults.push(p.id);
        console.log(`✅ Bien ${p.id} synchronisé.`);
      }
    }

    return NextResponse.json({ 
      success: true, 
      synced_count: syncResults.length,
      ids: syncResults 
    });

  } catch (error: any) {
    console.error("💥 Erreur critique sync :", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}