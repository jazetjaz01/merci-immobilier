"use client";

import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

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
        {/* pt réduit de 28/36 à 14/20 pour remonter le contenu vers les sommets */}
        <div className="mx-auto max-w-7xl pt-14 md:pt-20"> 
          <div className="flex flex-col items-center justify-start py-8 px-6">
            
            {/* Logo Stylisé - Marge basse réduite (mb-6) */}
            <div className="flex flex-col items-center leading-none mb-6">
              <span className="text-2xl font-medium text-white tracking-tight">
                Merci
              </span>
              <span className="font-pinyon text-3xl text-teal-100 mt-[-2px]">
                Immobilier
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