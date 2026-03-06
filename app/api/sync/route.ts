import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET() {
  // 1. Récupération et vérification des clés d'environnement
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const partnerId = process.env.APIMO_PARTNER_ID;
  const token = process.env.APIMO_TOKEN;
  const agencyId = process.env.APIMO_AGENCY_ID;

  if (!supabaseUrl || !supabaseKey || !partnerId || !token || !agencyId) {
    return NextResponse.json({ 
      error: "Variables d'environnement manquantes dans .env.local",
      details: { supabaseUrl: !!supabaseUrl, supabaseKey: !!supabaseKey, apimo: !!token }
    }, { status: 500 });
  }

  // 2. Initialisation du client Supabase à l'intérieur du GET
  const supabase = createClient(supabaseUrl, supabaseKey);

  // 3. Fonction interne pour l'upload d'images
  async function uploadImageToSupabase(url: string, propertyId: number, imageId: number) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Échec téléchargement image ${imageId}`);
      
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
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
    // 4. Appel à l'API Apimo
    const auth = Buffer.from(`${partnerId}:${token}`).toString('base64');
    const res = await fetch(`https://api.apimo.pro/agencies/${agencyId}/properties`, {
      headers: { 
        'Authorization': `Basic ${auth}`,
        'Accept': 'application/json' 
      },
      cache: 'no-store'
    });

    const data = await res.json();

    if (!data.properties || data.properties.length === 0) {
      return NextResponse.json({ message: "Aucune annonce trouvée dans Apimo." });
    }

    const syncResults = [];

    // 5. Boucle sur les propriétés
    for (const p of data.properties) {
      const localImageUrls = [];

      if (p.pictures && p.pictures.length > 0) {
        // On limite aux 15 premières photos pour la rapidité
        for (const pic of p.pictures.slice(0, 15)) {
          const publicUrl = await uploadImageToSupabase(pic.url, p.id, pic.id);
          if (publicUrl) localImageUrls.push(publicUrl);
        }
      }

      const propertyData = {
        id: p.id,
        reference: p.reference?.toString(),
        title: p.comments[0]?.title || "Annonce Merci Immobilier",
        description: p.comments[0]?.comment || "",
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
        console.error(`❌ Erreur DB pour le bien ${p.id}:`, upsertError);
      } else {
        syncResults.push(p.id);
      }
    }

    return NextResponse.json({ 
      success: true, 
      synced_count: syncResults.length,
      ids: syncResults 
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}