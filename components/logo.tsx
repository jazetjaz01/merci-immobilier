import Image from "next/image";

export const Logo = () => (
  <Image
    src="/logo.svg"       // Next.js va chercher directement dans le dossier public
    alt="Logo Merci Immobilier"
    width={150}           // On garde les dimensions de ton SVG d'origine
    height={50}
    priority              // Optionnel : permet de charger le logo plus vite (SEO/LCP)
  />
);