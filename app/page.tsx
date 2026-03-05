import AgentSection from "@/components/Presentation";
import Avendre from "@/components/Avendre";
import MerciImmoHero from "@/components/MerciImmoHero";
import Presentation from "@/components/Presentation";
import Recrutement from "@/components/Recrutement";


export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Le composant Hero occupe le haut de la page. 
          Il contient déjà la grille avec le formulaire et l'image femme.jpg.
      */}
      <main className="flex flex-col">
       <MerciImmoHero />
       
       <Presentation />
        <Avendre />
       <Recrutement />
      
       
       

       
      </main>
    </div>
  );
}