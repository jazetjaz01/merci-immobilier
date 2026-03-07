import AgentSection from "@/components/accueil/Presentation";

import MerciImmoHero from "@/components/accueil/MerciImmoHero";
import Presentation from "@/components/accueil/Presentation";
import Recrutement from "@/components/accueil/Recrutement";
import Avendre from "@/components/accueil/Avendre";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans">
      
      <main className="flex flex-col">
       <MerciImmoHero />
       
       <Presentation />
        <Avendre />
       <Recrutement />
      
       
       

       
      </main>
    </div>
  );
}