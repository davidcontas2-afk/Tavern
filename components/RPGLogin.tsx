'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Key, User, Mail, Shield, LogIn, UserPlus } from 'lucide-react';

export default function RPGLogin() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'homem' | 'mulher'>('homem');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { isLogin, email, password, name, gender });
    localStorage.setItem('merchantGender', gender);
    if (!isLogin && name) {
      localStorage.setItem('merchantName', name);
    }
    router.push('/setup');
  };

  const fillFakeData = (testGender: 'homem' | 'mulher') => {
    setIsLogin(false);
    setGender(testGender);
    setName(testGender === 'homem' ? 'Thorin' : 'Elara');
    setEmail(`${testGender}@guilda.com`);
    setPassword('123456');
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative font-sans overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/fotos/login.png" 
          fill 
          className="object-cover opacity-40" 
          alt="Entrada da Cidade" 
          referrerPolicy="no-referrer" 
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10"></div>

      {/* Login/Register Card */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-md gap-6 animate-in fade-in zoom-in duration-500">
        <div className="bg-zinc-900/90 backdrop-blur-md border-4 border-amber-700/80 rounded-xl p-8 shadow-[0_0_40px_rgba(0,0,0,0.8)] w-full">
          
          <div className="flex justify-center mb-6 relative">
            <div className="p-4 bg-zinc-950 border-2 border-amber-900/50 rounded-full shadow-[0_0_15px_rgba(217,119,6,0.3)]">
              <Shield className="w-10 h-10 text-amber-500" />
            </div>
          </div>

          <h2 className="text-3xl font-display font-bold text-amber-500 text-center mb-2 drop-shadow-lg">
            {isLogin ? 'Portões da Guilda' : 'Alistar-se na Guilda'}
          </h2>
          <p className="text-amber-200/60 text-center mb-6 font-display text-sm tracking-widest uppercase">
            {isLogin ? 'Identifique-se, viajante' : 'Junte-se aos mercadores'}
          </p>

          {/* Quick Test Buttons */}
          <div className="flex gap-2 justify-center mb-6">
            <button type="button" onClick={() => fillFakeData('homem')} className="text-xs bg-zinc-950 border border-amber-900/50 text-amber-500 px-3 py-1.5 rounded hover:bg-amber-900/30 transition-colors">
              Testar: Homem
            </button>
            <button type="button" onClick={() => fillFakeData('mulher')} className="text-xs bg-zinc-950 border border-amber-900/50 text-amber-500 px-3 py-1.5 rounded hover:bg-amber-900/30 transition-colors">
              Testar: Mulher
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {!isLogin && (
              <div>
                <label className="block font-display font-bold text-sm uppercase tracking-wider mb-2 text-amber-200/70">
                  Sua Alcunha (Nome)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-amber-700" />
                  </div>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={!isLogin}
                    placeholder="Ex: Thorin" 
                    className="w-full bg-zinc-950 border-2 border-amber-900/50 focus:border-amber-500 text-amber-50 pl-12 pr-4 py-3 outline-none transition-colors font-sans text-lg rounded-lg" 
                  />
                </div>
              </div>
            )}

            {!isLogin && (
              <div>
                <label className="block font-display font-bold text-sm uppercase tracking-wider mb-2 text-amber-200/70">
                  Gênero do Mercador
                </label>
                <div className="flex gap-4">
                  <label className={`flex-1 flex items-center justify-center gap-2 p-3 border-2 rounded-lg cursor-pointer transition-colors ${gender === 'homem' ? 'border-amber-500 bg-amber-900/30 text-amber-400' : 'border-amber-900/50 bg-zinc-950 text-amber-200/50 hover:border-amber-700/50'}`}>
                    <input type="radio" name="gender" value="homem" checked={gender === 'homem'} onChange={() => setGender('homem')} className="hidden" />
                    Homem
                  </label>
                  <label className={`flex-1 flex items-center justify-center gap-2 p-3 border-2 rounded-lg cursor-pointer transition-colors ${gender === 'mulher' ? 'border-amber-500 bg-amber-900/30 text-amber-400' : 'border-amber-900/50 bg-zinc-950 text-amber-200/50 hover:border-amber-700/50'}`}>
                    <input type="radio" name="gender" value="mulher" checked={gender === 'mulher'} onChange={() => setGender('mulher')} className="hidden" />
                    Mulher
                  </label>
                </div>
              </div>
            )}

            <div>
              <label className="block font-display font-bold text-sm uppercase tracking-wider mb-2 text-amber-200/70">
                Correio Mágico (E-mail)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-amber-700" />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="viajante@reino.com" 
                  className="w-full bg-zinc-950 border-2 border-amber-900/50 focus:border-amber-500 text-amber-50 pl-12 pr-4 py-3 outline-none transition-colors font-sans text-lg rounded-lg" 
                />
              </div>
            </div>

            <div>
              <label className="block font-display font-bold text-sm uppercase tracking-wider mb-2 text-amber-200/70">
                Palavra-Passe (Senha)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Key className="h-5 w-5 text-amber-700" />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••" 
                  className="w-full bg-zinc-950 border-2 border-amber-900/50 focus:border-amber-500 text-amber-50 pl-12 pr-4 py-3 outline-none transition-colors font-sans text-lg rounded-lg" 
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full flex items-center justify-center gap-3 px-8 py-4 mt-4 font-display text-xl font-bold text-[#f4ecd8] bg-[#d97706] border-2 border-amber-900 shadow-[0_0_20px_rgba(217,119,6,0.4)] hover:bg-amber-500 hover:scale-105 transition-all duration-300 uppercase tracking-widest rounded-lg"
            >
              {isLogin ? <LogIn className="w-6 h-6" /> : <UserPlus className="w-6 h-6" />}
              {isLogin ? 'Adentrar' : 'Firmar Pacto'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-amber-900/50 text-center">
            <p className="text-amber-200/60 font-sans mb-4">
              {isLogin ? 'Ainda não possui registro na Guilda?' : 'Já possui um selo de mercador?'}
            </p>
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-amber-500 hover:text-amber-400 font-display font-bold uppercase tracking-wider text-sm transition-colors hover:underline underline-offset-4"
            >
              {isLogin ? 'Alistar-se agora' : 'Retornar aos portões'}
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}
