'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { Store, Check, ArrowLeft, ArrowRight, FileEdit, CheckCircle, HelpCircle, Download } from 'lucide-react';

type Phase = 'choice' | 'gender' | 'name' | 'story';

const npcs = [
  { name: 'Isolda', seed: 'Isolda', skinColor: 'f5d0b5' },
  { name: 'Rowena', seed: 'Rowena', skinColor: 'efcc9f' },
  { name: 'Safira', seed: 'Safira', skinColor: 'c99c62' },
  { name: 'Amina', seed: 'Amina', skinColor: '643d19' }
];

// Masks
const maskCNPJ = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .slice(0, 18);
};

const maskPhone = (value: string) => {
  let v = value.replace(/\D/g, '');
  if (v.length <= 10) {
    return v.replace(/^(\d{2})(\d)/g, '($1) $2').replace(/(\d{4})(\d)/, '$1-$2').slice(0, 14);
  }
  return v.replace(/^(\d{2})(\d)/g, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2').slice(0, 15);
};

const maskCEP = (value: string) => {
  return value.replace(/\D/g, '').replace(/^(\d{5})(\d)/, '$1-$2').slice(0, 9);
};

export default function SetupVar12() {
  const [phase, setPhase] = useState<Phase>('choice');
  const [step, setStep] = useState(1);
  const [showDialog, setShowDialog] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentNpc, setCurrentNpc] = useState(npcs[0]);

  useEffect(() => {
    setCurrentNpc(npcs[Math.floor(Math.random() * npcs.length)]);
  }, []);

  // Merchant Info
  const [merchantName, setMerchantName] = useState('');
  const [merchantGender, setMerchantGender] = useState<'M' | 'F'>('M');

  // Form Part 1
  const [storeName, setStoreName] = useState('');
  const [fantasyName, setFantasyName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [domain, setDomain] = useState('');
  const [cnpj, setCnpj] = useState('');

  // Form Part 2
  const [storePhone, setStorePhone] = useState('');
  const [storeWhatsapp, setStoreWhatsapp] = useState('');
  const [storeEmail, setStoreEmail] = useState('');

  // Form Part 3
  const [cep, setCep] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  // Form Part 4
  const [responsibleName, setResponsibleName] = useState('');
  const [responsiblePhone, setResponsiblePhone] = useState('');
  const [responsibleEmail, setResponsibleEmail] = useState('');
  const [channels, setChannels] = useState({
    delivery: false,
    pickup: false,
    local: false
  });

  const npcName = `${currentNpc.name}, a Recepcionista`;
  const dialogues = useMemo(() => [
    { name: 'Eu', text: `Cheguei. Esta é a famosa Guilda dos Mercadores. Vou entrar e me cadastrar como um novo mercador.` },
    { name: npcName, text: `Ah, um rosto novo! Bem-vindo à Guilda. Sou ${currentNpc.name}. Qual o seu nome, viajante?` },
    { name: npcName, text: `Excelente, ${merchantName || 'viajante'}! Por favor, preencha este primeiro pergaminho com os dados básicos da sua nova taverna.` },
    { name: npcName, text: 'Ótimo. Agora, como os clientes e fornecedores poderão contatar sua taverna?' },
    { name: npcName, text: 'Precisamos saber exatamente onde sua taverna está localizada para enviar as mercadorias.' },
    { name: npcName, text: 'Por fim, quem é o responsável legal e como a taverna vai operar?' },
    { name: npcName, text: 'Tudo certo! Seu registro foi concluído com sucesso. Bem-vindo à Guilda!' }
  ], [npcName, currentNpc.name, merchantName]);

  useEffect(() => {
    if (phase === 'story' && showDialog) {
      let currentTextIndex = 0;
      const fullText = dialogues[step - 1].text;
      setCurrentText('');
      setIsTyping(true);
      
      const typingInterval = setInterval(() => {
        if (currentTextIndex < fullText.length) {
          setCurrentText(fullText.substring(0, currentTextIndex + 1));
          currentTextIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, 30);

      return () => {
        clearInterval(typingInterval);
      };
    }
  }, [step, phase, showDialog, dialogues]);

  useEffect(() => {
    if (!isTyping && phase === 'story' && step === 1) {
      const timer = setTimeout(() => {
        setStep(2);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isTyping, phase, step]);

  const startGenderPhase = () => {
    setPhase('gender');
  };

  const startStoryPhase = (gender: 'M' | 'F') => {
    setMerchantGender(gender);
    setPhase('story');
    setStep(1);
    setTimeout(() => {
      setShowDialog(true);
    }, 500);
  };

  const nextStep = () => {
    if (step === 2 && phase === 'story') {
      setPhase('name');
    } else if (step < 7) {
      setStep(s => s + 1);
    }
  };

  const prevStep = () => {
    if (step === 3 && phase === 'story') {
      setStep(2);
    } else if (step > 1) {
      setStep(s => s - 1);
    }
  };

  const confirmName = () => {
    setPhase('story');
    setStep(3);
    setTimeout(() => setShowDialog(true), 500);
  };

  const getNpcAvatar = () => {
    return `https://api.dicebear.com/9.x/adventurer/svg?seed=${currentNpc.seed}&skinColor=${currentNpc.skinColor}&backgroundColor=transparent`;
  };

  const getCharacterName = () => {
    return dialogues[step - 1]?.name || '';
  };

  const bgStep = phase === 'name' ? 2 : (phase === 'gender' ? 1 : step);

  const Tooltip = ({ text, position = 'top' }: { text: string, position?: 'top' | 'right' }) => {
    const positionClasses = position === 'top' 
      ? "bottom-full left-1/2 -translate-x-1/2 mb-2" 
      : "left-full top-1/2 -translate-y-1/2 ml-2";
    const arrowClasses = position === 'top'
      ? "top-full left-1/2 -translate-x-1/2 border-t-amber-700/80"
      : "right-full top-1/2 -translate-y-1/2 border-r-amber-700/80";

    return (
      <div className="relative group flex items-center ml-2">
        <HelpCircle className="w-4 h-4 text-[#d97706] cursor-help opacity-70 hover:opacity-100 transition-opacity" />
        <div className={`absolute ${positionClasses} w-64 p-3 bg-zinc-900 border-2 border-amber-700/80 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pointer-events-none`}>
          <div className="flex items-start gap-3">
            <Image src={getNpcAvatar()} width={32} height={32} className="w-8 h-8 rounded-full border border-amber-500/50 bg-black/50" alt={currentNpc.name} referrerPolicy="no-referrer" />
            <div>
              <p className="text-xs font-bold text-amber-500 mb-1">{currentNpc.name} diz:</p>
              <p className="text-xs text-amber-50 font-sans normal-case tracking-normal">{text}</p>
            </div>
          </div>
          <div className={`absolute border-4 border-transparent ${arrowClasses}`}></div>
        </div>
      </div>
    );
  };

  const downloadCode = () => {
    const codeContent = `// SetupVar12.tsx
// Este arquivo contém o componente completo com Tailwind CSS embutido nos comentários.
/*
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800&family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: "Lora", ui-sans-serif, system-ui, sans-serif;
  --font-display: "Cinzel", ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;

  --color-parchment: #f4e4bc;
  --color-parchment-dark: #e8d8b0;
  --color-ink: #2c1e16;
  --color-ink-light: #4a3b32;
  --color-accent: #8b0000;
  --color-accent-hover: #660000;
  --color-gold: #d4af37;
}

body {
  background-color: var(--color-parchment);
  color: var(--color-ink);
  font-family: var(--font-sans);
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
}

@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-in {
  animation: fade-in-up 0.8s ease-out forwards;
  opacity: 0;
}
*/

// O código React abaixo é o mesmo que está em execução.
// Copie e cole no seu projeto Next.js.
`;
    // Fetch the current file content to download it
    fetch('/api/download-setup')
      .then(res => res.text())
      .then(text => {
        const blob = new Blob([codeContent + '\\n\\n' + text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'SetupVar12.tsx';
        a.click();
        URL.revokeObjectURL(url);
      })
      .catch(() => {
        // Fallback if API route is not available
        const fallbackCode = codeContent + '\\n// Código do componente foi omitido no fallback. Copie diretamente do repositório.';
        const blob = new Blob([fallbackCode], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'SetupVar12.tsx';
        a.click();
        URL.revokeObjectURL(url);
      });
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative font-sans overflow-hidden bg-black">
      
      <button onClick={downloadCode} className="absolute top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 bg-zinc-900/80 text-amber-500 border border-amber-700/50 rounded-lg hover:bg-zinc-800 transition-colors text-sm font-bold shadow-lg">
        <Download className="w-4 h-4" />
        Baixar Setup
      </button>

      {/* Background Images */}
      <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${bgStep === 1 ? 'opacity-100' : 'opacity-0'}`}>
        {merchantGender === 'M' ? (
          <Image src="https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1920&auto=format&fit=crop" fill className="object-cover opacity-50" alt="Fachada da Guilda (Homem)" referrerPolicy="no-referrer" />
        ) : (
          <Image src="https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=1920&auto=format&fit=crop" fill className="object-cover opacity-50" alt="Fachada da Guilda (Mulher)" referrerPolicy="no-referrer" />
        )}
      </div>
      
      <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${bgStep === 2 ? 'opacity-100' : 'opacity-0'}`}>
        <Image src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1920&auto=format&fit=crop" fill className="object-cover opacity-50" alt="Interior da Guilda" referrerPolicy="no-referrer" />
      </div>

      <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${bgStep >= 3 ? 'opacity-100' : 'opacity-0'}`}>
        <Image src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=1920&auto=format&fit=crop" fill className="object-cover opacity-40" alt="Mesa da Recepcionista" referrerPolicy="no-referrer" />
      </div>

      {/* Overlay escuro para leitura */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10"></div>

      {/* Phase 1: Choice */}
      {phase === 'choice' && (
        <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-md gap-6 animate-in fade-in zoom-in duration-500">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-amber-500 text-center mb-4 drop-shadow-lg">O Início da Jornada</h1>
          
          <button onClick={startGenderPhase} className="w-full flex items-center justify-center gap-3 px-8 py-4 font-display text-xl font-bold text-[#f4ecd8] bg-[#d97706] border-2 border-amber-900 shadow-[0_0_20px_rgba(217,119,6,0.4)] hover:bg-amber-500 hover:scale-105 transition-all duration-300 uppercase tracking-widest rounded-lg">
            <Store className="w-6 h-6" />
            Ir para Guilda dos Mercadores
          </button>
        </div>
      )}

      {/* Phase 1.5: Gender Collection */}
      {phase === 'gender' && (
        <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-md gap-6 animate-in fade-in zoom-in duration-500">
          <div className="bg-zinc-900/90 backdrop-blur-md border-4 border-amber-700/80 rounded-xl p-8 shadow-[0_0_40px_rgba(0,0,0,0.8)] w-full">
            <h2 className="text-2xl font-display font-bold text-amber-500 text-center mb-6">Como você se apresenta?</h2>
            
            <div className="flex flex-col gap-4">
              <button 
                onClick={() => startStoryPhase('M')} 
                className="w-full flex items-center justify-center gap-3 px-8 py-4 font-display text-xl font-bold text-[#f4ecd8] bg-zinc-800 border-2 border-amber-900/50 hover:border-amber-500 hover:bg-zinc-700 transition-all duration-300 uppercase tracking-widest rounded-lg"
              >
                Homem
              </button>
              <button 
                onClick={() => startStoryPhase('F')} 
                className="w-full flex items-center justify-center gap-3 px-8 py-4 font-display text-xl font-bold text-[#f4ecd8] bg-zinc-800 border-2 border-amber-900/50 hover:border-amber-500 hover:bg-zinc-700 transition-all duration-300 uppercase tracking-widest rounded-lg"
              >
                Mulher
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Phase 2: Name Collection */}
      {phase === 'name' && (
        <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-md gap-6 animate-in fade-in zoom-in duration-500">
          <div className="bg-zinc-900/90 backdrop-blur-md border-4 border-amber-700/80 rounded-xl p-8 shadow-[0_0_40px_rgba(0,0,0,0.8)] w-full">
            <h2 className="text-2xl font-display font-bold text-amber-500 text-center mb-6">Identificação</h2>
            
            <div className="mb-6">
              <label className="block font-display font-bold text-sm uppercase tracking-wider mb-2 text-amber-200/70">Seu Nome de Mercador</label>
              <input 
                type="text" 
                value={merchantName} 
                onChange={(e) => setMerchantName(e.target.value)} 
                placeholder="Ex: Thorin Escudo-de-Carvalho" 
                className="w-full bg-zinc-950 border-2 border-amber-900/50 focus:border-amber-500 text-amber-50 px-4 py-3 outline-none transition-colors font-sans text-lg rounded-lg" 
              />
            </div>

            <button 
              onClick={confirmName} 
              disabled={!merchantName.trim()} 
              className="w-full flex items-center justify-center gap-3 px-8 py-4 font-display text-xl font-bold text-[#f4ecd8] bg-[#d97706] border-2 border-amber-900 shadow-[0_0_20px_rgba(217,119,6,0.4)] hover:bg-amber-500 disabled:opacity-50 disabled:hover:bg-[#d97706] disabled:hover:scale-100 hover:scale-105 transition-all duration-300 uppercase tracking-widest rounded-lg"
            >
              <Check className="w-6 h-6" />
              Confirmar
            </button>
          </div>
        </div>
      )}

      {/* Phase 3: Story & Forms */}
      {phase === 'story' && (
        <div className="relative z-20 w-full h-full flex flex-col justify-between pt-20 pb-8 px-4 max-w-6xl mx-auto">
          
          {/* Form Area */}
          <div className="flex-1 flex items-center justify-center">
            {step >= 3 && step <= 6 && (
              <div className="w-full max-w-4xl bg-[#f4ecd8] rounded-sm shadow-2xl border-4 border-[#2c1e16] p-6 md:p-8 text-[#2c1e16] animate-in fade-in zoom-in duration-700 max-h-[60vh] overflow-y-auto">
                <div className="text-center mb-6 border-b-2 border-[#2c1e16]/20 pb-4">
                  <h2 className="font-display text-2xl font-bold uppercase tracking-wider">Registro da Guilda - Parte {step - 2} de 4</h2>
                  <p className="text-[#5a4634] italic text-sm">Preencha com pena e tinta.</p>
                </div>

                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  {step === 3 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-1">
                          <label className="font-display font-bold text-sm uppercase tracking-wider text-[#5a4634]">Nome da Taverna / Loja</label>
                          <Tooltip text="Como os clientes conhecem o seu estabelecimento no dia a dia." />
                        </div>
                        <input type="text" value={storeName} onChange={(e) => setStoreName(e.target.value)} className="w-full bg-[#e8decc] border-2 border-[#2c1e16]/40 focus:border-[#d97706] px-4 py-2 outline-none transition-colors font-sans text-lg" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <label className="font-display font-bold text-sm uppercase tracking-wider text-[#5a4634]">Nome Fantasia</label>
                          <Tooltip text="O nome comercial da sua loja, caso seja diferente do nome comum." />
                        </div>
                        <input type="text" value={fantasyName} onChange={(e) => setFantasyName(e.target.value)} className="w-full bg-[#e8decc] border-2 border-[#2c1e16]/40 focus:border-[#d97706] px-4 py-2 outline-none transition-colors font-sans text-lg" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <label className="font-display font-bold text-sm uppercase tracking-wider text-[#5a4634]">Razão Social</label>
                          <Tooltip text="O nome jurídico registrado nos documentos da sua guilda." />
                        </div>
                        <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="w-full bg-[#e8decc] border-2 border-[#2c1e16]/40 focus:border-[#d97706] px-4 py-2 outline-none transition-colors font-sans text-lg" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <label className="font-display font-bold text-sm uppercase tracking-wider text-[#5a4634]">CNPJ</label>
                          <Tooltip text="O número de registro oficial do seu negócio. Apenas números." position="right" />
                        </div>
                        <input type="text" value={cnpj} onChange={(e) => setCnpj(maskCNPJ(e.target.value))} placeholder="00.000.000/0000-00" className="w-full bg-[#e8decc] border-2 border-[#2c1e16]/40 focus:border-[#d97706] px-4 py-2 outline-none transition-colors font-sans text-lg" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <label className="font-display font-bold text-sm uppercase tracking-wider text-[#5a4634]">Domínio Mágico</label>
                          <Tooltip text="O nome que aparecerá no link da sua loja. Use letras minúsculas e sem espaços." />
                        </div>
                        <div className="flex items-stretch">
                          <input type="text" value={domain} onChange={(e) => setDomain(e.target.value.toLowerCase().replace(/\\s/g, ''))} className="w-full bg-[#e8decc] border-2 border-r-0 border-[#2c1e16]/40 focus:border-[#d97706] px-4 py-2 outline-none transition-colors font-sans text-lg" />
                          <div className="bg-[#2c1e16] text-[#f4ecd8] px-3 py-2 border-2 border-[#2c1e16] flex items-center font-bold text-sm">
                            .taverna.app
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <label className="font-display font-bold text-sm uppercase tracking-wider text-[#5a4634]">Telefone da Loja</label>
                          <Tooltip text="O número principal para contato com o estabelecimento." />
                        </div>
                        <input type="text" value={storePhone} onChange={(e) => setStorePhone(maskPhone(e.target.value))} placeholder="(00) 00000-0000" className="w-full bg-[#e8decc] border-2 border-[#2c1e16]/40 focus:border-[#d97706] px-4 py-2 outline-none transition-colors font-sans text-lg" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <label className="font-display font-bold text-sm uppercase tracking-wider text-[#5a4634]">WhatsApp da Loja</label>
                          <Tooltip text="O número de WhatsApp para receber mensagens dos clientes." />
                        </div>
                        <input type="text" value={storeWhatsapp} onChange={(e) => setStoreWhatsapp(maskPhone(e.target.value))} placeholder="(00) 00000-0000" className="w-full bg-[#e8decc] border-2 border-[#2c1e16]/40 focus:border-[#d97706] px-4 py-2 outline-none transition-colors font-sans text-lg" />
                      </div>
                      <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-1">
                          <label className="font-display font-bold text-sm uppercase tracking-wider text-[#5a4634]">E-mail da Loja</label>
                          <Tooltip text="Endereço eletrônico para contato formal com a loja." />
                        </div>
                        <input type="email" value={storeEmail} onChange={(e) => setStoreEmail(e.target.value)} className="w-full bg-[#e8decc] border-2 border-[#2c1e16]/40 focus:border-[#d97706] px-4 py-2 outline-none transition-colors font-sans text-lg" />
                      </div>
                      <div className="md:col-span-2 mt-2">
                        <div className="flex items-center gap-2 mb-3">
                          <label className="font-display font-bold text-sm uppercase tracking-wider text-[#5a4634]">Canais de Atendimento Ativos</label>
                          <Tooltip text="Marque as formas como você atende seus clientes hoje." />
                        </div>
                        <div className="flex flex-wrap gap-6">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={channels.delivery} onChange={(e) => setChannels({...channels, delivery: e.target.checked})} className="w-5 h-5 accent-[#d97706]" />
                            <span className="font-sans font-bold text-[#2c1e16]">Delivery</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={channels.pickup} onChange={(e) => setChannels({...channels, pickup: e.target.checked})} className="w-5 h-5 accent-[#d97706]" />
                            <span className="font-sans font-bold text-[#2c1e16]">Retirada</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={channels.local} onChange={(e) => setChannels({...channels, local: e.target.checked})} className="w-5 h-5 accent-[#d97706]" />
                            <span className="font-sans font-bold text-[#2c1e16]">Consumo Local</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 5 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <label className="font-display font-bold text-sm uppercase tracking-wider text-[#5a4634]">CEP</label>
                          <Tooltip text="O Código de Endereçamento Postal da sua localização." position="right" />
                        </div>
                        <input type="text" value={cep} onChange={(e) => setCep(maskCEP(e.target.value))} placeholder="00000-000" className="w-full bg-[#e8decc] border-2 border-[#2c1e16]/40 focus:border-[#d97706] px-4 py-2 outline-none transition-colors font-sans text-lg" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block font-display font-bold text-sm uppercase tracking-wider mb-1 text-[#5a4634]">Rua / Avenida</label>
                        <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} className="w-full bg-[#e8decc] border-2 border-[#2c1e16]/40 focus:border-[#d97706] px-4 py-2 outline-none transition-colors font-sans text-lg" />
                      </div>
                      <div>
                        <label className="block font-display font-bold text-sm uppercase tracking-wider mb-1 text-[#5a4634]">Número</label>
                        <input type="text" value={number} onChange={(e) => setNumber(e.target.value)} className="w-full bg-[#e8decc] border-2 border-[#2c1e16]/40 focus:border-[#d97706] px-4 py-2 outline-none transition-colors font-sans text-lg" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block font-display font-bold text-sm uppercase tracking-wider mb-1 text-[#5a4634]">Complemento</label>
                        <input type="text" value={complement} onChange={(e) => setComplement(e.target.value)} className="w-full bg-[#e8decc] border-2 border-[#2c1e16]/40 focus:border-[#d97706] px-4 py-2 outline-none transition-colors font-sans text-lg" />
                      </div>
                      <div>
                        <label className="block font-display font-bold text-sm uppercase tracking-wider mb-1 text-[#5a4634]">Bairro</label>
                        <input type="text" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} className="w-full bg-[#e8decc] border-2 border-[#2c1e16]/40 focus:border-[#d97706] px-4 py-2 outline-none transition-colors font-sans text-lg" />
                      </div>
                      <div>
                        <label className="block font-display font-bold text-sm uppercase tracking-wider mb-1 text-[#5a4634]">Cidade</label>
                        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="w-full bg-[#e8decc] border-2 border-[#2c1e16]/40 focus:border-[#d97706] px-4 py-2 outline-none transition-colors font-sans text-lg" />
                      </div>
                      <div>
                        <label className="block font-display font-bold text-sm uppercase tracking-wider mb-1 text-[#5a4634]">UF</label>
                        <input type="text" value={state} onChange={(e) => setState(e.target.value.toUpperCase())} placeholder="EX" maxLength={2} className="w-full bg-[#e8decc] border-2 border-[#2c1e16]/40 focus:border-[#d97706] px-4 py-2 outline-none transition-colors font-sans text-lg uppercase" />
                      </div>
                    </div>
                  )}

                  {step === 6 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="md:col-span-2">
                        <label className="block font-display font-bold text-sm uppercase tracking-wider mb-1 text-[#5a4634]">Nome do Responsável</label>
                        <input type="text" value={responsibleName} onChange={(e) => setResponsibleName(e.target.value)} className="w-full bg-[#e8decc] border-2 border-[#2c1e16]/40 focus:border-[#d97706] px-4 py-2 outline-none transition-colors font-sans text-lg" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <label className="font-display font-bold text-sm uppercase tracking-wider text-[#5a4634]">Telefone do Responsável</label>
                          <Tooltip text="O número direto da pessoa que responde pela loja." />
                        </div>
                        <input type="text" value={responsiblePhone} onChange={(e) => setResponsiblePhone(maskPhone(e.target.value))} placeholder="(00) 00000-0000" className="w-full bg-[#e8decc] border-2 border-[#2c1e16]/40 focus:border-[#d97706] px-4 py-2 outline-none transition-colors font-sans text-lg" />
                      </div>
                      <div>
                        <label className="block font-display font-bold text-sm uppercase tracking-wider mb-1 text-[#5a4634]">E-mail do Responsável</label>
                        <input type="email" value={responsibleEmail} onChange={(e) => setResponsibleEmail(e.target.value)} className="w-full bg-[#e8decc] border-2 border-[#2c1e16]/40 focus:border-[#d97706] px-4 py-2 outline-none transition-colors font-sans text-lg" />
                      </div>
                    </div>
                  )}
                </form>
              </div>
            )}
          </div>

          {/* Dialogue Area Wrapper */}
          <div className="relative w-full max-w-4xl mx-auto mt-8">
            {/* Character Sprite */}
            <div className={`absolute bottom-0 -left-4 md:-left-16 w-32 h-32 md:w-48 md:h-48 transition-all duration-500 ease-out z-50 pointer-events-none ${step === 1 ? 'opacity-0' : 'opacity-100'}`}>
              <Image src={getNpcAvatar()} fill className="object-contain drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]" alt="NPC" referrerPolicy="no-referrer" />
            </div>

            {/* Dialogue Box */}
            <div className={`w-full bg-zinc-900/90 backdrop-blur-md border-4 border-amber-700/80 rounded-xl p-6 md:p-8 ${step === 1 ? '' : 'pl-28 md:pl-36'} shadow-[0_0_30px_rgba(0,0,0,0.8)] relative transition-all duration-500 z-40 ${!showDialog ? 'translate-y-10 opacity-0' : ''}`}>
              
              {/* Character Name Badge */}
              {step > 1 && (
                <div className="absolute -top-5 left-28 md:left-36 bg-amber-800 border-2 border-amber-500 text-amber-100 px-6 py-1 rounded-full font-display font-bold text-lg tracking-wider shadow-lg">
                  {getCharacterName()}
                </div>
              )}

              {/* Action Buttons Badge */}
              <div className="absolute -top-6 right-4 md:right-8 flex items-center gap-2">
                  {step > 1 && step < 7 && (
                    <button onClick={prevStep} className="flex items-center gap-1 px-3 py-1.5 bg-zinc-700 hover:bg-zinc-600 text-white font-bold rounded-full transition-colors shadow-lg shadow-zinc-900/20 text-sm border-2 border-zinc-500">
                      <ArrowLeft className="w-4 h-4" /> Voltar
                    </button>
                  )}
                  {step < 7 ? (
                    <button onClick={nextStep} className="flex items-center gap-1 px-4 py-1.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-full transition-colors shadow-lg shadow-amber-900/20 animate-pulse text-sm border-2 border-amber-500">
                      {step >= 3 ? 'Próxima' : 'Continuar'} 
                      {step >= 3 ? <FileEdit className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                    </button>
                  ) : (
                    <button className="flex items-center gap-1 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full transition-colors shadow-lg shadow-emerald-900/20 text-sm border-2 border-emerald-500">
                      Concluir <CheckCircle className="w-4 h-4" />
                    </button>
                  )}
              </div>

              <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start mt-4">
                {/* Dialogue Text */}
                <div className="flex-1 min-h-[80px]">
                  <p className="text-xl md:text-2xl text-amber-50 font-serif leading-relaxed">
                    {currentText}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}
    </main>
  );
}
