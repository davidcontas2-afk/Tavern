'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Scroll, Coins, Crown, Check, ArrowRight } from 'lucide-react';

const plans = [
  {
    id: 'trial',
    name: 'Licença de Novato',
    icon: Scroll,
    price: '19',
    originalPrice: '49',
    description: 'Mês de teste. Desconto especial para novos mercadores.',
    features: [
      'Acesso à taverna pública',
      'Registro de até 50 itens',
      'Suporte via corvos (lento)',
      'Selo de bronze temporário'
    ],
    highlighted: false,
    buttonText: 'Iniciar Teste'
  },
  {
    id: 'merchant',
    name: 'Contrato Padrão',
    icon: Coins,
    price: '49',
    description: 'A licença definitiva para mercadores estabelecidos.',
    features: [
      'Tudo da Licença de Novato',
      'Registro ilimitado de itens',
      'Acesso ao mercado negro',
      'Suporte prioritário (mensageiros)',
      'Selo de prata'
    ],
    highlighted: true,
    buttonText: 'Assinar Contrato'
  },
  {
    id: 'master',
    name: 'Mestre da Guilda',
    icon: Crown,
    price: '149',
    description: 'O pacote completo para os lordes do comércio.',
    features: [
      'Tudo do Contrato Padrão',
      'Isenção de taxas imperiais',
      'Guarda-costas particular',
      'Cadeira no conselho',
      'Selo de ouro maciço'
    ],
    highlighted: false,
    buttonText: 'Reivindicar Título'
  }
];

export default function RPGPlans() {
  const router = useRouter();
  return (
    <main className="min-h-screen flex items-center justify-center p-4 md:p-8 relative font-sans overflow-hidden bg-black py-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?q=80&w=1920&auto=format&fit=crop" 
          fill 
          className="object-cover opacity-30" 
          alt="Sala dos Contratos" 
          referrerPolicy="no-referrer" 
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black z-10"></div>

      <div className="relative z-20 w-full max-w-6xl mx-auto flex flex-col items-center animate-in fade-in slide-in-from-bottom-10 duration-700">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-amber-500 mb-4 drop-shadow-lg">
            Contratos da Guilda
          </h1>
          <p className="text-amber-200/70 font-display text-lg tracking-widest uppercase max-w-2xl mx-auto">
            Escolha seu nível de influência e os privilégios que deseja desfrutar em nosso mercado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full items-center">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div 
                key={plan.id}
                className={`relative flex flex-col bg-zinc-900/90 backdrop-blur-md border-4 rounded-xl p-8 transition-all duration-300 ${
                  plan.highlighted 
                    ? 'border-amber-500 shadow-[0_0_40px_rgba(217,119,6,0.4)] md:-translate-y-4 z-10' 
                    : 'border-amber-900/50 shadow-xl hover:border-amber-700/80'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-amber-500 text-amber-950 px-4 py-1 rounded-full font-display font-bold text-sm tracking-wider uppercase shadow-lg whitespace-nowrap">
                    A Escolha dos Sábios
                  </div>
                )}

                <div className="flex justify-center mb-6">
                  <div className={`p-4 rounded-full border-2 ${plan.highlighted ? 'bg-amber-900/40 border-amber-500' : 'bg-zinc-950 border-amber-900/50'}`}>
                    <Icon className={`w-10 h-10 ${plan.highlighted ? 'text-amber-400' : 'text-amber-600'}`} />
                  </div>
                </div>

                <h3 className="text-2xl font-display font-bold text-amber-50 text-center mb-2">
                  {plan.name}
                </h3>
                <p className="text-amber-200/50 text-center text-sm mb-6 h-10">
                  {plan.description}
                </p>

                <div className="text-center mb-8 pb-8 border-b border-amber-900/50">
                  {plan.originalPrice && (
                    <div className="text-amber-200/40 text-sm line-through mb-1">
                      De R$ {plan.originalPrice} por
                    </div>
                  )}
                  <span className="text-amber-500 font-bold text-lg">R$</span>
                  <span className="text-5xl font-display font-bold text-amber-400 mx-1">{plan.price}</span>
                  <span className="text-amber-200/50 text-sm">/lua</span>
                </div>

                <ul className="flex flex-col gap-4 mb-8 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <span className="text-amber-100/80 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => router.push('/checkout')}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-4 font-display text-lg font-bold uppercase tracking-widest rounded-lg transition-all duration-300 ${
                    plan.highlighted
                      ? 'text-[#f4ecd8] bg-[#d97706] border-2 border-amber-900 shadow-[0_0_20px_rgba(217,119,6,0.4)] hover:bg-amber-500 hover:scale-105'
                      : 'text-amber-500 bg-zinc-950 border-2 border-amber-900/50 hover:border-amber-500 hover:bg-zinc-800'
                  }`}
                >
                  {plan.buttonText}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </main>
  );
}
