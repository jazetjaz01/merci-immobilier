import type { Metadata } from "next";
import EstimationClient from "./EstimationClient";

export const metadata: Metadata = {
  title: "Estimation gratuite de votre bien",
  description:
    "Obtenez une estimation gratuite et rapide de la valeur de votre maison ou appartement à Perpignan avec Merci Immobilier.",
  alternates: { canonical: "/estimation" },
};

export default function EstimationPage() {
  return <EstimationClient />;
}
