import AgentSection from "@/components/accueil/Presentation2";

import MerciImmoHero1 from "@/components/accueil/MerciImmoHero1";
import Presentation from "@/components/accueil/Presentation2";
import Recrutement from "@/components/accueil/Recrutement4";
import Avendre from "@/components/accueil/Avendre3";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans">
      
      <main className="flex flex-col">
       <MerciImmoHero1 />
       
       <Presentation />
        <Avendre />
       <Recrutement />
      
       
       

       
      </main>
    </div>
  );
}