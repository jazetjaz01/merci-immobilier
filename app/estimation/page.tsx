"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Send, CheckCircle2, Cpu } from "lucide-react";

type Message = { role: "assistant" | "user"; content: string };

const questions = [
  { key: "typeBien", q: "Quel est le type de bien ? (Maison, Appartement...)" },
  { key: "surface", q: "Quelle est la surface approximative ?" },
  { key: "ville", q: "Dans quelle ville se situe-t-il ?" },
  { key: "etat", q: "Quel est l'état général du bien ?" },
  { key: "nom", q: "Quel est votre nom ?" },
  { key: "prenom", q: "Votre prénom ?" },
  { key: "email", q: "Votre email ?" },
  { key: "telephone", q: "Votre numéro de téléphone ?" },
];

export default function EstimationDesignLuxeFinal() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Bonjour, je suis l'assistant IA de Merci Immobilier. Commençons votre estimation. Quel est le type de bien ?" }
  ]);
  
  const [step, setStep] = useState(0);
  const [input, setInput] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const currentQuestion = questions[step];
    const userResponse = input;
    const updatedAnswers = { ...answers, [currentQuestion.key]: userResponse };
    setAnswers(updatedAnswers);

    setMessages(prev => [...prev, { role: "user", content: userResponse }]);
    setInput("");
    
    if (step + 1 < questions.length) {
      setTimeout(() => {
        setMessages(prev => [...prev, { role: "assistant", content: questions[step + 1].q }]);
        setStep(step + 1);
      }, 600);
    } else {
      setTimeout(async () => {
        setMessages(prev => [...prev, { role: "assistant", content: "Analyse en cours... ⌛" }]);
        
        try {
          const response = await fetch("/api/estimation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedAnswers),
          });

          if (response.ok) {
            setMessages(prev => [...prev, { 
              role: "assistant", 
              content: "Parfait ! Vos experts Merci Immobilier ont reçu votre demande. Nous vous recontactons très vite." 
            }]);
          } else {
            throw new Error();
          }
        } catch (error) {
          setMessages(prev => [...prev, { role: "assistant", content: "Désolé, une erreur est survenue. Pouvez-vous nous contacter directement ?" }]);
        }
      }, 800);
    }
  };

  return (
    <section className="w-full bg-slate-200 overflow-hidden pt-12 pb-16 md:pb-24 min-h-screen">
      {/* On réduit le gap-12 à gap-6 pour rapprocher les colonnes au niveau de la grille */}
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-28 items-start">
        
        {/* Colonne IMAGE - On réduit le décalage négatif à -ml-4 pour un rapprochement fluide */}
        <div className="relative flex justify-center md:justify-end h-[450px] md:h-[600px] w-full order-1 md:mt-24 md:-ml-4">
          <div 
            className="relative w-full h-full max-w-[500px] overflow-hidden shadow-2xl bg-slate-300"
            style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 80%)" }}
          >
            <Image
              src="/vendre/vendre4.jpg" 
              alt="Estimation Merci Immobilier France" 
              fill 
              className="object-cover object-top scale-105 transition-transform duration-1000 hover:scale-110" 
              priority
            />
          </div>
        </div>

        {/* Colonne TEXTE & CHAT - On réduit md:pl-20 à md:pl-8 */}
        <div className="flex flex-col order-2 md:pl-8 mt-0 md:mt-10">
          <div className="max-w-xl">
            <div className="flex flex-col leading-tight mb-4">
              <h2 className="text-4xl md:text-5xl font-medium text-slate-800">Obtenez</h2>
              <p className="text-4xl md:text-5xl font-medium text-slate-800">
                la valeur de <span className="font-pinyon text-6xl md:text-7xl text-teal-700">votre bien</span>
              </p>
            </div>

            <div className="flex items-start gap-3 mb-8 p-4 bg-white/30 border border-white/50 rounded-sm italic text-slate-700 text-sm leading-relaxed shadow-sm">
              <Cpu className="w-5 h-5 text-teal-700 mt-1 flex-shrink-0" />
              <p>
                Nous utilisons une intelligence artificielle de  <strong> Merci Immobilier</strong> pour collecter vos informations. Vos données seront utilisées exclusivement par nos conseillers pour votre estimation.
              </p>
            </div>

            {/* Chat Box */}
            <div className="bg-white/60 backdrop-blur-md border border-white shadow-2xl h-[400px] flex flex-col relative overflow-hidden rounded-sm">
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "assistant" ? "justify-start" : "justify-end"}`}>
                    <div className={`max-w-[85%] p-4 text-sm tracking-wide ${
                      msg.role === "assistant" 
                        ? "bg-transparent border-l-2 border-slate-800 text-slate-700 font-medium" 
                        : "bg-slate-800 text-white shadow-lg"
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              {step < questions.length && (
                <div className="p-4 bg-white/80 border-t border-slate-200">
                  <div className="flex gap-2">
                    <input
                      className="flex-1 bg-transparent border-b border-slate-300 py-3 text-lg outline-none focus:border-teal-700 transition-colors placeholder:text-slate-400 font-light"
                      placeholder="Répondez ici..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    />
                    <button 
                      onClick={handleSend}
                      className="p-3 bg-slate-800 text-white hover:bg-teal-700 transition-all active:scale-90"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-10 flex flex-col md:flex-row gap-6 md:gap-12">
              <div className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                <CheckCircle2 className="w-5 h-5 text-teal-600" /> 
                <span>Merci Immobilier</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                <CheckCircle2 className="w-5 h-5 text-teal-600" /> 
                <span>Gratuit & Confidentiel</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}