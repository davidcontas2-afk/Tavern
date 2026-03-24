'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowRight, PenTool } from 'lucide-react';

const steps = [
  {
    id: 1,
    imageDesktop: 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=1920&auto=format&fit=crop',
    imageMobile: 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=1080&h=1920&auto=format&fit=crop',
    title: 'Pensamento',
    text: '"Finalmente cheguei... A famosa Guilda dos Mercadores. Dizem que aqui as melhores rotas de entrega e alianças são forjadas. Meu negócio precisa desse poder."',
    buttonText: 'Entrar na Guilda',
    isForm: false
  },
  {
    id: 2,
    imageDesktop: 'https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?q=80&w=1920&auto=format&fit=crop',
    imageMobile: 'https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?q=80&w=1080&h=1920&auto=format&fit=crop',
    title: 'Pensamento',
    text: '"Quanta movimentação... O cheiro de ouro, especiarias e contratos recém-assinados. É aqui que as verdadeiras fortunas do reino mudam de mãos."',
    buttonText: 'Aproximar-se do balcão',
    isForm: false
  },
  {
    id: 3,
    imageDesktop: 'https://images.unsplash.com/photo-1533327325824-76bc4e62d560?q=80&w=1920&auto=format&fit=crop',
    imageMobile: 'https://images.unsplash.com/photo-1533327325824-76bc4e62d560?q=80&w=1080&h=1920&auto=format&fit=crop',
    title: 'Pensamento',
    text: '"A recepcionista parece concentrada, organizando dezenas de registros e selos. Melhor me aproximar com calma para não atrapalhar os negócios."',
    buttonText: 'Chamar a atenção',
    isForm: false
  },
  {
    id: 4,
    imageDesktop: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1920&auto=format&fit=crop',
    imageMobile: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1080&h=1920&auto=format&fit=crop',
    title: 'Recepcionista',
    text: '"Um momento... Ah, um novo rosto! Bem-vindo à Guilda dos Mercadores. Vejo nos seus olhos a ambição de quem busca expandir suas rotas. Em que posso ajudar?"',
    buttonText: 'Pedir para ingressar',
    isForm: false
  },
  {
    id: 5,
    imageDesktop: 'https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=1920&auto=format&fit=crop',
    imageMobile: 'https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=1080&h=1920&auto=format&fit=crop',
    title: 'Recepcionista',
    text: '"Para firmar um pacto com a Guilda e ter acesso às nossas rotas exclusivas, preciso que registre sua caravana. Pegue este pergaminho e preencha com cuidado."',
    buttonText: 'Pegar o pergaminho',
    isForm: false
  },
  {
    id: 6,
    imageDesktop: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1920&auto=format&fit=crop',
    imageMobile: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1080&h=1920&auto=format&fit=crop',
    title: 'Pensamento',
    text: '"Uma mesa vazia no canto... Perfeito. É hora de colocar no papel os detalhes do meu negócio e provar o valor das minhas mercadorias."',
    buttonText: 'Sentar e preencher',
    isForm: false
  },
  {
    id: 7,
    imageDesktop: 'https://images.unsplash.com/photo-1614850715649-1d0106293cb1?q=80&w=1920&auto=format&fit=crop',
    imageMobile: 'https://images.unsplash.com/photo-1614850715649-1d0106293cb1?q=80&w=1080&h=1920&auto=format&fit=crop',
    title: 'Registro da Guilda',
    text: 'Preencha os dados da sua operação de entregas para os registros oficiais.',
    buttonText: 'Assinar Contrato',
    isForm: true
  },
  {
    id: 8,
    imageDesktop: 'https://images.unsplash.com/photo-1585404486516-7788448f2269?q=80&w=1920&auto=format&fit=crop', // Mercador entregando documento
    imageMobile: 'https://images.unsplash.com/photo-1585404486516-7788448f2269?q=80&w=1080&h=1920&auto=format&fit=crop',
    title: 'Pensamento',
    text: '"Tudo preenchido. Aqui está, com minha assinatura e o selo da minha caravana."',
    buttonText: 'Entregar Documento',
    isForm: false
  },
  {
    id: 9,
    imageDesktop: 'https://images.unsplash.com/photo-1582560475093-ba66accbc424?q=80&w=1920&auto=format&fit=crop',
    imageMobile: 'https://images.unsplash.com/photo-1582560475093-ba66accbc424?q=80&w=1080&h=1920&auto=format&fit=crop',
    title: 'Recepcionista',
    text: '"Excelente. Os documentos estão em ordem. Para oficializar sua licença de mercador e liberar as rotas, precisamos recolher a taxa da Guilda. Como é sua primeira vez, temos uma licença de teste com desconto no primeiro mês."',
    buttonText: 'Ver Contratos da Guilda',
    isForm: false
  }
];

export default function RPGSetup() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ nome: '', caravana: '', tipo: '' });
  const router = useRouter();

  const currentStep = steps[step - 1];

  const handleNext = () => {
    if (step < steps.length) {
      setStep(step + 1);
    } else {
      router.push('/planos');
    }
  };

  const isFormValid = formData.nome && formData.caravana && formData.tipo;

  return (
    <main className="min-h-screen flex flex-col justify-end relative font-sans overflow-hidden bg-black">
      {/* Background Image - Responsive Desktop/Mobile */}
      <div className="absolute inset-0 z-0 transition-opacity duration-1000">
        {/* Mobile Image (9:16) */}
        <Image 
          src={currentStep.imageMobile || ''} 
          fill 
          className="object-cover md:hidden" 
          alt="Cenário Mobile" 
          referrerPolicy="no-referrer" 
          priority
        />
        {/* Desktop Image (16:9) */}
        <Image 
          src={currentStep.imageDesktop || ''} 
          fill 
          className="object-cover hidden md:block" 
          alt="Cenário Desktop" 
          referrerPolicy="no-referrer" 
          priority
        />
      </div>

      {/* Gradient overlay just for the bottom text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10 pointer-events-none"></div>

      {/* Cutscene Dialogue Box */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-4 pb-8 pt-20 animate-in slide-in-from-bottom-10 duration-500" key={step}>
        <div className="relative bg-zinc-950/85 backdrop-blur-md border-t-4 border-x-2 border-b-2 border-amber-700/80 rounded-t-xl rounded-b-md p-6 md:p-10 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] w-full">
          
          {/* Name Tag */}
          <div className="absolute -top-5 left-6 md:left-10 bg-amber-900 border-2 border-amber-500 px-6 py-1 rounded-md shadow-lg">
            <span className="font-display font-bold text-amber-100 tracking-wider uppercase text-sm md:text-base">
              {currentStep.title}
            </span>
          </div>

          {/* Dialogue Text or Form */}
          <div className="min-h-[100px] flex flex-col justify-center">
            {currentStep.isForm ? (
              <div className="flex flex-col gap-5 w-full max-w-2xl animate-in fade-in duration-700">
                <p className="text-amber-200/80 text-lg font-serif italic mb-2">
                  {currentStep.text}
                </p>
                <input 
                  type="text" 
                  placeholder="Seu Nome (Mestre Mercador)" 
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  className="bg-zinc-900/80 border-2 border-amber-900/50 text-amber-50 px-4 py-3 rounded-lg focus:outline-none focus:border-amber-500 transition-colors placeholder:text-zinc-500 font-serif text-lg" 
                />
                <input 
                  type="text" 
                  placeholder="Nome do seu Delivery / Caravana" 
                  value={formData.caravana}
                  onChange={(e) => setFormData({...formData, caravana: e.target.value})}
                  className="bg-zinc-900/80 border-2 border-amber-900/50 text-amber-50 px-4 py-3 rounded-lg focus:outline-none focus:border-amber-500 transition-colors placeholder:text-zinc-500 font-serif text-lg" 
                />
                <select 
                  value={formData.tipo}
                  onChange={(e) => setFormData({...formData, tipo: e.target.value})}
                  className="bg-zinc-900/80 border-2 border-amber-900/50 text-amber-50 px-4 py-3 rounded-lg focus:outline-none focus:border-amber-500 transition-colors font-serif text-lg appearance-none"
                >
                  <option value="" disabled>Especialidade das Entregas...</option>
                  <option value="comida">Provisões e Iguarias (Alimentação)</option>
                  <option value="itens">Artefatos e Suprimentos (Produtos)</option>
                  <option value="mensagens">Pergaminhos e Mensagens (Documentos)</option>
                </select>
              </div>
            ) : (
              <p className={`text-amber-50 text-xl md:text-3xl leading-relaxed font-serif drop-shadow-md ${currentStep.title === 'Pensamento' ? 'italic text-zinc-300' : ''}`}>
                {currentStep.text}
              </p>
            )}
          </div>

          {/* Next Button */}
          <div className="flex justify-end mt-6">
            <button 
              onClick={handleNext}
              disabled={currentStep.isForm && !isFormValid}
              className="inline-flex items-center justify-center gap-3 px-6 py-3 font-display text-lg font-bold text-[#f4ecd8] bg-[#d97706] border-2 border-amber-900 shadow-[0_0_15px_rgba(217,119,6,0.4)] hover:bg-amber-500 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:bg-[#d97706] transition-all duration-300 uppercase tracking-widest rounded-lg"
            >
              {currentStep.isForm && <PenTool className="w-5 h-5" />}
              {currentStep.buttonText}
              {!currentStep.isForm && <ArrowRight className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}
