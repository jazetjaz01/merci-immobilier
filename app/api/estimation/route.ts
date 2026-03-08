import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // On extrait les données envoyées par le chat
    const {
      typeBien,
      surface,
      ville,
      nom,
      prenom,
      email,
      telephone,
      etat // Ajouté car présent dans tes questions précédentes
    } = data;

    // --- ENVOI À L'AGENCE ---
    const { error: agencyError } = await resend.emails.send({
      // ✅ Utilise impérativement ton domaine vérifié ici
      from: "Estimation Merci Immobilier <contact@merci-immobilier.com>",
      to: "contact@merci-immobilier.com",
      replyTo: email, // Permet de répondre directement au client en cliquant sur "Répondre"
      subject: `[ESTIMATION IA] ${prenom} ${nom} - ${ville}`,
      html: `
        <div style="font-family: sans-serif; color: #333; max-width: 600px; border: 1px solid #eee; padding: 20px;">
          <h2 style="color: #0f766e; border-bottom: 2px solid #0f766e; padding-bottom: 10px;">Nouvelle demande d'estimation</h2>
          
          <p><strong>Type de bien :</strong> ${typeBien}</p>
          <p><strong>Surface :</strong> ${surface}</p>
          <p><strong>Ville :</strong> ${ville}</p>
          <p><strong>État :</strong> ${etat || "Non précisé"}</p>

          <h3 style="color: #0f766e; margin-top: 25px;">Coordonnées Client</h3>
          <p><strong>Identité :</strong> ${prenom} ${nom}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Téléphone :</strong> ${telephone}</p>
          
          <div style="margin-top: 30px; font-size: 12px; color: #999; border-top: 1px dashed #ccc; pt: 10px;">
            Demande générée via l'assistant IA de Merci Immobilier.
          </div>
        </div>
      `
    });

    if (agencyError) {
      console.error("Erreur Resend Agence:", agencyError);
      return NextResponse.json({ error: agencyError.message }, { status: 400 });
    }

    // --- OPTIONNEL : ACCUSÉ DE RÉCEPTION AU CLIENT ---
    await resend.emails.send({
      from: "Merci Immobilier <contact@merci-immobilier.com>",
      to: email,
      subject: "Nous avons bien reçu votre demande d'estimation",
      html: `
        <p>Bonjour ${prenom},</p>
        <p>Merci d'avoir utilisé notre assistant IA pour l'estimation de votre bien à ${ville}.</p>
        <p>Nos experts étudient vos informations et reviendront vers vous très rapidement avec une analyse détaillée.</p>
        <br/>
        <p>Bien cordialement,</p>
        <p><strong>L'équipe Merci Immobilier</strong></p>
      `
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Erreur Serveur API Email:", error);
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
  }
}