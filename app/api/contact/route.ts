import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const { 
      fullName, 
      email, 
      phone, 
      propertyTitle, 
      propertyRef, 
      city, 
      zipcode,
      price,
      hasPropertyToSell, 
      agentEmail 
    } = body;

    // --- DEBUG : Vérifie tes données dans ton terminal VS Code ---
    console.log("Tentative d'enregistrement pour :", { fullName, propertyRef, city });

    // 1. Enregistrement dans Supabase
    const { error: supabaseError } = await supabase
      .from('contacts')
      .insert([
        { 
          full_name: fullName, 
          email: email, 
          phone: phone, 
          property_title: propertyTitle, 
          property_ref: propertyRef, 
          city: city,      // Correspond au SQL ALTER TABLE
          zip_code: zipcode, // Correspond au SQL ALTER TABLE
          price: price,
          has_property_to_sell: hasPropertyToSell,
          agent_email: agentEmail 
        }
      ]);

    if (supabaseError) {
      // Si l'insertion échoue, on affiche l'objet d'erreur complet
      console.error("ERREUR SUPABASE DÉTAILLÉE :", supabaseError);
    }

    // 2. Envoi de l'email via Resend
    // On l'envoie quand même, mais on est prévenu par le log au dessus si la DB a foiré
    const { data, error: resendError } = await resend.emails.send({
      from: 'Merci Immobilier <contact@merci-immobilier.com>',
      to: [agentEmail || 'contact@merci-immobilier.com'],
      replyTo: email,
      subject: `[LEAD] ${propertyTitle} - ${price} €`,
      html: `
        <div style="font-family: sans-serif; color: #333; max-width: 600px; border: 1px solid #eee; padding: 20px;">
          <h2 style="color: #0f766e; border-bottom: 2px solid #0f766e; padding-bottom: 10px;">Nouveau Contact Prospect</h2>
          <p><strong>Client :</strong> ${fullName}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Tél :</strong> ${phone}</p>
          <div style="background: #f9f9f9; padding: 15px; margin-top: 20px;">
            <p style="margin: 0;"><strong>Bien :</strong> ${propertyTitle}</p>
            <p style="margin: 5px 0;"><strong>Prix/Loyer :</strong> <span style="color: #0f766e; font-weight: bold;">${price} €</span></p>
            <p style="margin: 0;"><strong>Réf :</strong> ${propertyRef} - ${city} (${zipcode})</p>
          </div>
          <p style="margin-top: 20px;"><strong>Vendeur potentiel :</strong> ${hasPropertyToSell ? '✅ Oui' : '❌ Non'}</p>
        </div>
      `,
    });

    if (resendError) return NextResponse.json({ error: resendError }, { status: 400 });

    return NextResponse.json({ success: true });

  } catch (err: any) {
    console.error("Erreur serveur API:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}