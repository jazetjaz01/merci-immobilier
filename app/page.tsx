import MerciImmoHero from "@/components/MerciImmoHero";


export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Le composant Hero occupe le haut de la page. 
          Il contient déjà la grille avec le formulaire et l'image femme.jpg.
      */}
      <main className="flex flex-col">
       <MerciImmoHero />

        {/* --- Section optionnelle en dessous --- */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
            <h2 className="text-3xl font-semibold leading-10 tracking-tight text-foreground">
              Découvrez nos services chez <span className="text-teal-600">Merci Immobilier</span>
            </h2>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              De la gestion locative à la vente de prestige, nous vous accompagnons 
              pour que chaque étape de votre projet immobilier soit un succès.
            </p>
          </div>

          {/* Tu pourras ajouter ici tes cartes de biens immobiliers plus tard */}
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
             {/* Emplacement pour les futurs composants de cartes */}
          </div>
        </section>
      </main>
    </div>
  );
}