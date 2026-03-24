'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Store, Check, ArrowRight, CheckCircle, HelpCircle } from 'lucide-react';

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

const TooltipLabel = ({ label, tooltip }: { label: string; tooltip: string }) => (
  <div className="flex items-center gap-1.5 mb-1">
    <label className="block font-display font-bold text-xs uppercase tracking-wider text-amber-900">
      {label}
    </label>
    <div className="group relative flex items-center">
      <HelpCircle className="w-3.5 h-3.5 text-amber-900/60 cursor-help" />
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-max max-w-xs bg-zinc-900 text-amber-50 text-xs p-2 rounded shadow-lg z-50">
        {tooltip}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-900"></div>
      </div>
    </div>
  </div>
);

export default function RPGSetupCutscene() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showDialog, setShowDialog] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [gender, setGender] = useState<'homem' | 'mulher'>('homem');
  const [merchantName, setMerchantName] = useState('');
  const [inputName, setInputName] = useState('');

  // Form Part 1
  const [razaoSocial, setRazaoSocial] = useState('');
  const [nomeFantasia, setNomeFantasia] = useState('');
  const [subdominio, setSubdominio] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [telefone, setTelefone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');

  // Form Part 2
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');
  const [canais, setCanais] = useState({
    delivery: false,
    retirada: false,
    local: false
  });

  useEffect(() => {
    const savedGender = localStorage.getItem('merchantGender');
    if (savedGender === 'homem' || savedGender === 'mulher') {
      setGender(savedGender);
    } else {
      setGender('homem'); // Default fallback
    }
    
    const savedName = localStorage.getItem('merchantName');
    if (savedName && savedName !== 'undefined') {
      setMerchantName(savedName);
      setInputName(savedName);
    }
    
    // Start the cutscene
    setShowDialog(true);
  }, []);

  const scenes = useMemo(() => [
    { 
      id: 1, 
      image: `2-chegada.png`, 
      speaker: 'Narrador', 
      text: 'A Guilda dos Comerciantes. É aqui que sua jornada começa.',
      action: 'Entrar'
    },
    { 
      id: 2, 
      image: `3-dentro.png`, 
      speaker: 'Narrador', 
      text: 'O salão está cheio. O som de moedas ecoa.',
      action: 'Avançar'
    },
    { 
      id: 3, 
      image: `4-balcao.png`, 
      speaker: 'Leanor', 
      text: `Um momento... Próximo!`,
      action: 'Aguardar'
    },
    { 
      id: 4, 
      image: `5-atendente_fala.png`, 
      speaker: 'Leanor', 
      text: `Bem-vindo${gender === 'homem' ? '' : 'a'}. Qual o seu nome?`,
      action: 'Confirmar',
      needsInput: true
    },
    { 
      id: 5, 
      image: `6-recebendo_doc.png`, 
      speaker: 'Leanor', 
      text: `Certo, ${merchantName || 'viajante'}. Preencha o verso deste documento. Preencha com calma, pois papel é um bem valioso.`,
      action: 'Pegar'
    },
    { 
      id: 6, 
      image: `7-sentar.png`, 
      speaker: 'Narrador', 
      text: 'Você começa a preencher o contrato.',
      action: 'Continuar',
      showForm1: true
    },
    { 
      id: 7, 
      image: `8-virar_folha.png`, 
      speaker: 'Narrador', 
      text: 'Você vira a página.',
      action: 'Entregar',
      showForm2: true
    },
    { 
      id: 8, 
      image: `9-entregar_doc.png`, 
      speaker: 'Leanor', 
      text: `Tudo em ordem, ${merchantName}! Sua taverna está registrada.`,
      action: 'Acessar Taverna'
    }
  ], [gender, merchantName]);

  useEffect(() => {
    if (showDialog) {
      let currentTextIndex = 0;
      const fullText = scenes[step - 1].text;
      setCurrentText('');
      setIsTyping(true);

      const typingInterval = setInterval(() => {
        currentTextIndex++;
        setCurrentText(fullText.substring(0, currentTextIndex));
        if (currentTextIndex >= fullText.length) {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, 20);

      return () => clearInterval(typingInterval);
    }
  }, [step, showDialog, scenes]);

  const handleNext = () => {
    if (isTyping) {
      // Skip typing
      setCurrentText(scenes[step - 1].text);
      setIsTyping(false);
      return;
    }

    if (step === 4 && inputName.trim()) {
      setMerchantName(inputName);
      localStorage.setItem('merchantName', inputName);
    }

    if (step < scenes.length) {
      setStep(step + 1);
    } else {
      // Save form data to localStorage
      const formData = {
        razaoSocial,
        nomeFantasia,
        subdominio,
        cnpj,
        telefone,
        whatsapp,
        email,
        cep,
        rua,
        numero,
        complemento,
        bairro,
        cidade,
        uf,
        canais
      };
      localStorage.setItem('merchantFormData', JSON.stringify(formData));
      router.push('/dashboard');
    }
  };

  const currentScene = scenes[step - 1];
  const imagePath = `/fotos/${gender}/${currentScene.image}`;

  return (
    <main className="min-h-screen bg-black relative font-sans overflow-hidden flex flex-col">
      {/* Background Image / Cutscene Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={imagePath}
          className="w-full h-full object-cover transition-opacity duration-1000" 
          alt={`Cena ${step}`}
        />
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 flex-1 flex flex-col justify-end p-4 md:p-8 pb-32">
        
        {/* Forms Overlay */}
        {(currentScene.showForm1 || currentScene.showForm2) && (
          <div className="absolute inset-0 flex items-center justify-center p-4 z-30 bg-black/40 backdrop-blur-sm animate-in fade-in duration-500">
            <div className="bg-[#f4ecd8] border-4 border-amber-900/80 rounded-sm p-8 shadow-[0_0_40px_rgba(0,0,0,0.8)] w-full max-w-2xl max-h-[70vh] overflow-y-auto"
                 style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/aged-paper.png")' }}>
              
              <div className="text-center mb-8 border-b-2 border-amber-900/30 pb-4">
                <Store className="w-12 h-12 text-amber-900 mx-auto mb-2 opacity-80" />
                <h2 className="text-3xl font-display font-bold text-amber-900 uppercase tracking-widest">
                  Registro de Taverna
                </h2>
              </div>

              <div className="relative overflow-hidden" style={{ minHeight: '380px' }}>
                <div 
                  className="transition-all duration-700 ease-in-out absolute w-full"
                  style={{ 
                    transform: currentScene.showForm2 ? 'translateY(-100%)' : 'translateY(0)', 
                    opacity: currentScene.showForm2 ? 0 : 1, 
                    pointerEvents: currentScene.showForm2 ? 'none' : 'auto',
                    visibility: currentScene.showForm2 ? 'hidden' : 'visible'
                  }}
                >
                  <div className="space-y-4 pb-8">
                    <p className="text-amber-800/70 font-serif italic text-center mb-2">
                      Parte I: Identificação
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                      <div className="md:col-span-2">
                        <TooltipLabel label="Nome de Registro" tooltip="Razão social (ou nome jurídico)" />
                        <input 
                          type="text" 
                          value={razaoSocial}
                          onChange={(e) => setRazaoSocial(e.target.value)}
                          className="w-full bg-transparent border-b-2 border-amber-900/50 focus:border-amber-900 text-amber-950 px-2 py-1.5 outline-none transition-colors font-serif text-base placeholder-amber-900/30" 
                          placeholder="Ex: Taverna do Dragão Ltda"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <TooltipLabel label="Nome da Taverna" tooltip="Nome fantasia (se diferente)" />
                        <input 
                          type="text" 
                          value={nomeFantasia}
                          onChange={(e) => setNomeFantasia(e.target.value)}
                          className="w-full bg-transparent border-b-2 border-amber-900/50 focus:border-amber-900 text-amber-950 px-2 py-1.5 outline-none transition-colors font-serif text-base placeholder-amber-900/30" 
                          placeholder="Ex: O Dragão Fumejante"
                        />
                      </div>
                      <div>
                        <TooltipLabel label="Selo Real" tooltip="CNPJ" />
                        <input 
                          type="text" 
                          value={cnpj}
                          onChange={(e) => setCnpj(maskCNPJ(e.target.value))}
                          className="w-full bg-transparent border-b-2 border-amber-900/50 focus:border-amber-900 text-amber-950 px-2 py-1.5 outline-none transition-colors font-serif text-base placeholder-amber-900/30" 
                          placeholder="00.000.000/0001-00"
                        />
                      </div>
                      <div>
                        <TooltipLabel label="Cristal de Voz" tooltip="Telefone da loja" />
                        <input 
                          type="text" 
                          value={telefone}
                          onChange={(e) => setTelefone(maskPhone(e.target.value))}
                          className="w-full bg-transparent border-b-2 border-amber-900/50 focus:border-amber-900 text-amber-950 px-2 py-1.5 outline-none transition-colors font-serif text-base placeholder-amber-900/30" 
                          placeholder="(00) 00000-0000"
                        />
                      </div>
                      <div>
                        <TooltipLabel label="Correio Mágico" tooltip="E-mail da loja" />
                        <input 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-transparent border-b-2 border-amber-900/50 focus:border-amber-900 text-amber-950 px-2 py-1.5 outline-none transition-colors font-serif text-base placeholder-amber-900/30" 
                          placeholder="contato@taverna.com"
                        />
                      </div>
                      <div>
                        <TooltipLabel label="Mensageiro Veloz" tooltip="WhatsApp da loja" />
                        <input 
                          type="text" 
                          value={whatsapp}
                          onChange={(e) => setWhatsapp(maskPhone(e.target.value))}
                          className="w-full bg-transparent border-b-2 border-amber-900/50 focus:border-amber-900 text-amber-950 px-2 py-1.5 outline-none transition-colors font-serif text-base placeholder-amber-900/30" 
                          placeholder="(00) 00000-0000"
                        />
                      </div>
                      <div className="md:col-span-2 mt-2">
                        <TooltipLabel label="Caminho Mágico" tooltip="Subdomínio da loja" />
                        <div className="flex items-center border-b-2 border-amber-900/50 focus-within:border-amber-900 transition-colors">
                          <span className="text-amber-900/50 font-serif text-sm pl-2">guilda.com/</span>
                          <input 
                            type="text" 
                            value={subdominio}
                            onChange={(e) => setSubdominio(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                            className="w-full bg-transparent text-amber-950 px-1 py-1.5 outline-none font-serif text-base placeholder-amber-900/30" 
                            placeholder="minha-taverna"
                          />
                        </div>
                        <p className="text-xs text-amber-900/60 mt-1 font-serif italic">
                          Assim que seus clientes encontrarão seu cardápio: <span className="font-bold">guilda.com/{subdominio || 'minha-taverna'}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div 
                  className="transition-all duration-700 ease-in-out absolute w-full"
                  style={{ 
                    transform: currentScene.showForm2 ? 'translateY(0)' : 'translateY(100%)', 
                    opacity: currentScene.showForm2 ? 1 : 0, 
                    pointerEvents: currentScene.showForm2 ? 'auto' : 'none',
                    visibility: currentScene.showForm2 ? 'visible' : 'hidden'
                  }}
                >
                  <div className="space-y-4 pb-8">
                    <p className="text-amber-800/70 font-serif italic text-center mb-2">
                      Parte II: Localização
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-3">
                      <div>
                        <TooltipLabel label="Código Postal" tooltip="CEP" />
                        <input 
                          type="text" 
                          value={cep}
                          onChange={(e) => setCep(maskCEP(e.target.value))}
                          className="w-full bg-transparent border-b-2 border-amber-900/50 focus:border-amber-900 text-amber-950 px-2 py-1.5 outline-none transition-colors font-serif text-base placeholder-amber-900/30" 
                          placeholder="00000-000"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <TooltipLabel label="Via Principal" tooltip="Rua/Avenida" />
                        <input 
                          type="text" 
                          value={rua}
                          onChange={(e) => setRua(e.target.value)}
                          className="w-full bg-transparent border-b-2 border-amber-900/50 focus:border-amber-900 text-amber-950 px-2 py-1.5 outline-none transition-colors font-serif text-base placeholder-amber-900/30" 
                          placeholder="Ex: Rua dos Alfeneiros"
                        />
                      </div>
                      <div>
                        <TooltipLabel label="Número" tooltip="Número" />
                        <input 
                          type="text" 
                          value={numero}
                          onChange={(e) => setNumero(e.target.value)}
                          className="w-full bg-transparent border-b-2 border-amber-900/50 focus:border-amber-900 text-amber-950 px-2 py-1.5 outline-none transition-colors font-serif text-base placeholder-amber-900/30" 
                          placeholder="Ex: 42"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <TooltipLabel label="Detalhes do Local" tooltip="Complemento" />
                        <input 
                          type="text" 
                          value={complemento}
                          onChange={(e) => setComplemento(e.target.value)}
                          className="w-full bg-transparent border-b-2 border-amber-900/50 focus:border-amber-900 text-amber-950 px-2 py-1.5 outline-none transition-colors font-serif text-base placeholder-amber-900/30" 
                          placeholder="Ex: Sala 3"
                        />
                      </div>
                      <div>
                        <TooltipLabel label="Distrito" tooltip="Bairro" />
                        <input 
                          type="text" 
                          value={bairro}
                          onChange={(e) => setBairro(e.target.value)}
                          className="w-full bg-transparent border-b-2 border-amber-900/50 focus:border-amber-900 text-amber-950 px-2 py-1.5 outline-none transition-colors font-serif text-base placeholder-amber-900/30" 
                          placeholder="Ex: Centro"
                        />
                      </div>
                      <div>
                        <TooltipLabel label="Reino" tooltip="Cidade" />
                        <input 
                          type="text" 
                          value={cidade}
                          onChange={(e) => setCidade(e.target.value)}
                          className="w-full bg-transparent border-b-2 border-amber-900/50 focus:border-amber-900 text-amber-950 px-2 py-1.5 outline-none transition-colors font-serif text-base placeholder-amber-900/30" 
                          placeholder="Ex: Valíria"
                        />
                      </div>
                      <div>
                        <TooltipLabel label="Território" tooltip="UF" />
                        <input 
                          type="text" 
                          value={uf}
                          onChange={(e) => setUf(e.target.value.toUpperCase().slice(0, 2))}
                          className="w-full bg-transparent border-b-2 border-amber-900/50 focus:border-amber-900 text-amber-950 px-2 py-1.5 outline-none transition-colors font-serif text-base placeholder-amber-900/30" 
                          placeholder="Ex: SP"
                        />
                      </div>
                      <div className="md:col-span-3 mt-1">
                        <TooltipLabel label="Métodos de Atendimento" tooltip="Canais de atendimento ativos" />
                        <div className="flex flex-wrap gap-4 mt-1">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={canais.delivery} onChange={e => setCanais({...canais, delivery: e.target.checked})} className="w-4 h-4 accent-amber-700" />
                            <span className="font-serif text-amber-950 text-sm">Caravana (Delivery)</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={canais.retirada} onChange={e => setCanais({...canais, retirada: e.target.checked})} className="w-4 h-4 accent-amber-700" />
                            <span className="font-serif text-amber-950 text-sm">Retirada no Balcão</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={canais.local} onChange={e => setCanais({...canais, local: e.target.checked})} className="w-4 h-4 accent-amber-700" />
                            <span className="font-serif text-amber-950 text-sm">Consumo na Taverna</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Dialogue Box - Fixed at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 z-40">
        <div className="max-w-4xl mx-auto bg-zinc-950/90 backdrop-blur-md border-2 border-amber-700/50 rounded-xl p-6 shadow-[0_0_30px_rgba(0,0,0,0.8)] relative">
          
          {/* Speaker Name */}
          <div className="absolute -top-4 left-6 bg-amber-900 text-amber-100 px-4 py-1 rounded-md font-display font-bold text-sm tracking-wider uppercase border border-amber-700 shadow-lg">
            {currentScene.speaker}
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-end">
            <div className="flex-1">
              <p className="text-amber-50 font-serif text-xl md:text-2xl leading-relaxed min-h-[80px]">
                {currentText}
                {isTyping && <span className="inline-block w-2 h-5 ml-1 bg-amber-500 animate-pulse"></span>}
              </p>
              
              {/* Input for Name (Step 4) */}
              {currentScene.needsInput && !isTyping && (
                <div className="mt-4 animate-in fade-in duration-500">
                  <input 
                    type="text" 
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    placeholder="Digite seu nome..." 
                    className="w-full max-w-md bg-zinc-900 border-2 border-amber-700/50 focus:border-amber-500 text-amber-50 px-4 py-3 outline-none transition-colors font-sans text-lg rounded-lg"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && inputName.trim()) {
                        handleNext();
                      }
                    }}
                  />
                </div>
              )}
            </div>

            <button 
              onClick={handleNext}
              disabled={currentScene.needsInput && !inputName.trim() && !isTyping}
              className="shrink-0 flex items-center justify-center gap-2 px-6 py-3 font-display text-lg font-bold text-[#f4ecd8] bg-[#d97706] border-2 border-amber-900 shadow-[0_0_15px_rgba(217,119,6,0.3)] hover:bg-amber-500 transition-all duration-300 uppercase tracking-widest rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isTyping ? 'Pular' : currentScene.action}
              {!isTyping && (step === scenes.length ? <CheckCircle className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />)}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
