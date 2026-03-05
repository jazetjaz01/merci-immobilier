import Image from "next/image";

export const Logo = () => (
  <Image
    src="/logo.svg"       // Next.js va chercher directement dans le dossier public
    alt="Logo Merci Immobilier"
    width={130}           // On garde les dimensions de ton SVG d'origine
    height={40}
    priority              // Optionnel : permet de charger le logo plus vite (SEO/LCP)
  />
);