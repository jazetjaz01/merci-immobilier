import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, phone, propertyTitle, propertyRef, hasPropertyToSell, agentEmail } = body;

    // On définit l'expéditeur officiel (ton nouveau domaine validé dans Resend)
    const fromEmail = 'Merci Immobilier <contact@merci-immobilier.com>';
    
    // Le destinataire est soit l'agent, soit l'adresse générale de l'agence
    const toEmail = agentEmail || 'contact@merci-immobilier.com';

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email, // Permet de répondre directement au client en cliquant sur "Répondre"
      subject: `[LEAD SITE] ${propertyTitle} - Ref: ${propertyRef}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #0f766e; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 20px; text-transform: uppercase; letter-spacing: 2px;">Nouveau Contact Client</h1>
          </div>
          
          <div style="padding: 30px;">
            <p style="font-size: 16px;">Vous avez reçu une nouvelle demande pour le bien suivant :</p>
            <div style="background-color: #f8fafc; border-left: 4px solid #0f766e; padding: 15px; margin-bottom: 25px;">
              <strong style="display: block; font-size: 18px; color: #0f766e;">${propertyTitle}</strong>
              <span style="color: #64748b; font-size: 14px;">Référence : ${propertyRef}</span>
            </div>

            <h3 style="color: #0f766e; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">Détails du prospect</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; width: 150px;">Nom :</td>
                <td style="padding: 8px 0; font-weight: bold;">${fullName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Email :</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #0f766e; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Téléphone :</td>
                <td style="padding: 8px 0;">${phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Projet de vente :</td>
                <td style="padding: 8px 0;">${hasPropertyToSell ? '✅ Oui (A un bien à vendre)' : '❌ Non'}</td>
              </tr>
            </table>

            <div style="margin-top: 30px; text-align: center;">
              <a href="tel:${phone}" style="background-color: #0f766e; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Appeler le client</a>
            </div>
          </div>

          <div style="background-color: #f1f5f9; padding: 15px; text-align: center; font-size: 12px; color: #94a3b8;">
            Ce message a été généré par Alamiia pour Merci Immobilier.
          </div>
        </div>
      `,
    });

    if (error) return NextResponse.json({ error }, { status: 400 });
    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}