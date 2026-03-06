import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY);

// Initialisation de Supabase avec la clé Service Role (pour avoir le droit d'écrire)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, phone, propertyTitle, propertyRef, hasPropertyToSell, agentEmail } = body;

    // 1. Enregistrement dans Supabase
    const { error: supabaseError } = await supabase
      .from('contacts')
      .insert([
        { 
          full_name: fullName, 
          email, 
          phone, 
          property_title: propertyTitle, 
          property_ref: propertyRef, 
          has_property_to_sell: hasPropertyToSell,
          agent_email: agentEmail 
        }
      ]);

    if (supabaseError) {
      console.error("Erreur Supabase:", supabaseError);
      // On continue quand même l'envoi du mail même si la DB échoue, ou vice-versa
    }

    // 2. Envoi de l'email via Resend
    const { data, error: resendError } = await resend.emails.send({
      from: 'Merci Immobilier <contact@merci-immobilier.com>',
      to: [agentEmail || 'contact@merci-immobilier.com'],
      replyTo: email,
      subject: `[SITE] Nouveau Lead : ${fullName}`,
      html: `
        <h2>Nouveau contact enregistré</h2>
        <p><strong>Client :</strong> ${fullName}</p>
        <p><strong>Bien :</strong> ${propertyTitle}</p>
        <p><strong>Téléphone :</strong> ${phone}</p>
        <p><em>Ce message a été sauvegardé dans votre base de données Supabase.</em></p>
      `,
    });

    if (resendError) return NextResponse.json({ error: resendError }, { status: 400 });

    return NextResponse.json({ success: true });

  } catch (err: any) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}