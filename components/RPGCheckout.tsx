'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CreditCard, QrCode, ShieldCheck, Coins, ScrollText, Lock } from 'lucide-react';

export default function RPGCheckout() {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const router = useRouter();

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Processing payment...', { paymentMethod });
    alert('Tributo pago com sucesso! Bem-vindo à Guilda.');
    router.push('/');
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 md:p-8 relative font-sans overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=80&w=1920&auto=format&fit=crop" 
          fill 
          className="object-cover opacity-30" 
          alt="Tesouraria" 
          referrerPolicy="no-referrer" 
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black/80 to-black/90 z-10"></div>

      <div className="relative z-20 w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in zoom-in-95 duration-500">
        
        {/* Left Column: Order Summary (Parchment Style) */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="bg-[#e8decc] rounded-xl p-8 shadow-[0_0_30px_rgba(0,0,0,0.8)] border-4 border-[#8b5a2b] relative overflow-hidden h-full">
            {/* Parchment texture overlay */}
            <div className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/aged-paper.png")' }}></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-8 pb-6 border-b-2 border-[#8b5a2b]/30">
                <ScrollText className="w-8 h-8 text-[#5a3a18]" />
                <h2 className="text-3xl font-display font-bold text-[#5a3a18] uppercase tracking-wider">
                  O Tributo
                </h2>
              </div>

              <div className="flex-grow flex flex-col gap-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-display font-bold text-xl text-[#3a2510]">Contrato de Mercador</h3>
                    <p className="text-[#5a3a18]/80 text-sm mt-1">Acesso à Guilda (Mensal)</p>
                  </div>
                  <span className="font-display font-bold text-xl text-[#3a2510]">R$ 49,00</span>
                </div>

                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-display font-bold text-xl text-[#3a2510]">Taxa do Reino</h3>
                    <p className="text-[#5a3a18]/80 text-sm mt-1">Impostos imperiais</p>
                  </div>
                  <span className="font-display font-bold text-xl text-[#3a2510]">R$ 5,00</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t-2 border-[#8b5a2b]/30">
                <div className="flex justify-between items-end">
                  <span className="font-display font-bold text-lg text-[#5a3a18] uppercase tracking-widest">Total Exigido</span>
                  <span className="font-display font-bold text-4xl text-[#8b0000]">R$ 54,00</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Payment Form (Dark RPG Style) */}
        <div className="lg:col-span-7">
          <div className="bg-zinc-900/90 backdrop-blur-md border-4 border-amber-700/80 rounded-xl p-8 shadow-[0_0_40px_rgba(0,0,0,0.8)]">
            
            <div className="flex items-center gap-3 mb-8">
              <Coins className="w-8 h-8 text-amber-500" />
              <h2 className="text-2xl font-display font-bold text-amber-500 uppercase tracking-wider">
                Método de Pagamento
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <button 
                onClick={() => setPaymentMethod('card')}
                className={`flex flex-col items-center justify-center gap-3 p-4 border-2 rounded-lg transition-all duration-300 ${
                  paymentMethod === 'card' 
                    ? 'bg-amber-900/40 border-amber-500 text-amber-400 shadow-[0_0_15px_rgba(217,119,6,0.3)]' 
                    : 'bg-zinc-950 border-amber-900/50 text-amber-700 hover:border-amber-700'
                }`}
              >
                <CreditCard className="w-8 h-8" />
                <span className="font-display font-bold uppercase tracking-wider text-sm">Cartão Mágico</span>
              </button>
              
              <button 
                onClick={() => setPaymentMethod('pix')}
                className={`flex flex-col items-center justify-center gap-3 p-4 border-2 rounded-lg transition-all duration-300 ${
                  paymentMethod === 'pix' 
                    ? 'bg-amber-900/40 border-amber-500 text-amber-400 shadow-[0_0_15px_rgba(217,119,6,0.3)]' 
                    : 'bg-zinc-950 border-amber-900/50 text-amber-700 hover:border-amber-700'
                }`}
              >
                <QrCode className="w-8 h-8" />
                <span className="font-display font-bold uppercase tracking-wider text-sm">Pix (Ouro Rápido)</span>
              </button>
            </div>

            <form onSubmit={handleCheckout}>
              {paymentMethod === 'card' ? (
                <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div>
                    <label className="block font-display font-bold text-sm uppercase tracking-wider mb-2 text-amber-200/70">
                      Número do Cartão
                    </label>
                    <input 
                      type="text" 
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="0000 0000 0000 0000" 
                      className="w-full bg-zinc-950 border-2 border-amber-900/50 focus:border-amber-500 text-amber-50 px-4 py-3 outline-none transition-colors font-sans text-lg rounded-lg" 
                    />
                  </div>
                  
                  <div>
                    <label className="block font-display font-bold text-sm uppercase tracking-wider mb-2 text-amber-200/70">
                      Nome Gravado (Como no cartão)
                    </label>
                    <input 
                      type="text" 
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="THORIN OAKENSHIELD" 
                      className="w-full bg-zinc-950 border-2 border-amber-900/50 focus:border-amber-500 text-amber-50 px-4 py-3 outline-none transition-colors font-sans text-lg rounded-lg uppercase" 
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block font-display font-bold text-sm uppercase tracking-wider mb-2 text-amber-200/70">
                        Validade
                      </label>
                      <input 
                        type="text" 
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/AA" 
                        className="w-full bg-zinc-950 border-2 border-amber-900/50 focus:border-amber-500 text-amber-50 px-4 py-3 outline-none transition-colors font-sans text-lg rounded-lg" 
                      />
                    </div>
                    <div>
                      <label className="block font-display font-bold text-sm uppercase tracking-wider mb-2 text-amber-200/70">
                        Código (CVV)
                      </label>
                      <input 
                        type="text" 
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="123" 
                        maxLength={4}
                        className="w-full bg-zinc-950 border-2 border-amber-900/50 focus:border-amber-500 text-amber-50 px-4 py-3 outline-none transition-colors font-sans text-lg rounded-lg" 
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
                  <div className="w-48 h-48 bg-zinc-950 border-4 border-amber-900/50 rounded-xl flex items-center justify-center p-4 relative">
                    {/* Placeholder for QR Code */}
                    <div className="absolute inset-4 border-2 border-dashed border-amber-700/50 rounded-lg flex items-center justify-center">
                      <QrCode className="w-16 h-16 text-amber-700/50" />
                    </div>
                  </div>
                  <p className="text-amber-200/70 text-center font-sans max-w-xs">
                    Escaneie o código mágico com o grimório do seu banco para transferir o ouro instantaneamente.
                  </p>
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-amber-900/50">
                <div className="flex items-center justify-center gap-2 mb-6 text-amber-600/60 text-sm">
                  <Lock className="w-4 h-4" />
                  <span>Transação protegida por magia de criptografia nível 9</span>
                </div>

                <button 
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 px-8 py-4 font-display text-xl font-bold text-[#f4ecd8] bg-[#d97706] border-2 border-amber-900 shadow-[0_0_20px_rgba(217,119,6,0.4)] hover:bg-amber-500 hover:scale-105 transition-all duration-300 uppercase tracking-widest rounded-lg"
                >
                  <ShieldCheck className="w-6 h-6" />
                  Confirmar Tributo
                </button>
              </div>
            </form>

          </div>
        </div>

      </div>
    </main>
  );
}
