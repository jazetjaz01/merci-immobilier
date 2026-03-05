"use client";

import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

// On importe ton composant Logo (ajuste le chemin si nécessaire)
// import { Logo } from "./logo"; 

const footerLinks = [
  { title: "Nos Biens", href: "#" },
  { title: "Estimation", href: "#" },
  { title: "L'Agence", href: "#" },
  { title: "Recrutement", href: "#" },
  { title: "Contact", href: "#" },
  { title: "Mentions Légales", href: "#" },
];

const Footer = () => {
  return (
    <div className="w-full bg-teal-600/10">
      <footer 
        className="w-full bg-teal-700"
        style={{
          clipPath: "polygon(0% 30%, 50% 0%, 70% 15%, 85% 5%, 100% 20%, 100% 100%, 0% 100%)",
        }}
      >
        <div className="mx-auto max-w-7xl pt-14 md:pt-20"> 
          <div className="flex flex-col items-center justify-start py-8 px-6">
            
            {/* --- Intégration du Logo avec adaptation des couleurs pour fond sombre --- */}
            <div className="flex flex-col items-center leading-none mb-8">
              <span className="font-monoton text-2xl md:text-4xl tracking-widest text-white">
                merci
              </span>
              <span className="hidden md:block text-sm md:text-lg font-medium -mt-1 tracking-[0.4em] text-white ml-1">
                immobilier
              </span>
            </div>

            {/* Navigation */}
            <ul className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
              {footerLinks.map(({ title, href }) => (
                <li key={title}>
                  <Link
                    className="text-teal-50 hover:text-white font-medium transition-colors duration-200 text-sm md:text-base"
                    href={href}
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="px-6">
            <Separator className="bg-white/20" />
          </div>

          <div className="flex flex-col-reverse items-center justify-between gap-x-2 gap-y-6 px-6 py-10 sm:flex-row">
            
            <span className="text-teal-100/80 text-sm font-medium">
              &copy; {new Date().getFullYear()}{" "}
              <span className="font-pinyon text-lg text-white">Merci</span> Immobilier. 
              Tous droits réservés.
            </span>

            <div className="flex items-center gap-6 text-teal-100">
              <Link href="#" className="hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;