'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Search, ShoppingBag, Clock, MapPin, Phone, QrCode, User, Star, ChevronRight, Menu, X, Plus, Minus, Info } from 'lucide-react';

const categories = [
  { id: 'bebidas', name: 'Poções & Bebidas', icon: '🍷' },
  { id: 'combos', name: 'Banquetes (Combos)', icon: '🍗' },
  { id: 'lanches', name: 'Rações de Viagem', icon: '🥪' },
];

const items = [
  {
    id: 1,
    name: 'Cerveja Amanteigada dos Anões',
    category: 'bebidas',
    price: '8,90',
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?q=80&w=800&auto=format&fit=crop',
    description: 'Caneca de 500ml. Venda proibida para menores de 18 anos.'
  },
  {
    id: 2,
    name: 'Elixir de Mana (Frutas Vermelhas)',
    category: 'bebidas',
    price: '6,50',
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1629385697072-0a158b444b76?q=80&w=800&auto=format&fit=crop',
    description: 'Poção refrescante de 350ml para restaurar energias.'
  },
  {
    id: 3,
    name: 'Banquete do Rei Dragão',
    category: 'combos',
    price: '45,00',
    originalPrice: '55,00',
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=800&auto=format&fit=crop',
    description: 'Pernil assado, batatas rústicas, pão élfico e 2 poções médias.'
  },
  {
    id: 4,
    name: 'Sanduíche de Javali Defumado',
    category: 'lanches',
    price: '22,90',
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop',
    description: 'Pão rústico, carne de javali, queijo curado e molho da taverna.'
  }
];

const storeHours = [
  { day: 'Segunda', hours: 'Fechado' },
  { day: 'Terça', hours: '18:00 - 23:30', active: true },
  { day: 'Quarta', hours: '18:00 - 23:30' },
  { day: 'Quinta', hours: '18:00 - 23:30' },
  { day: 'Sexta', hours: '18:00 - 01:00' },
  { day: 'Sábado', hours: '18:00 - 01:00' },
  { day: 'Domingo', hours: '18:00 - 23:00' },
];

export default function RPGMarket() {
  const [activeCategory, setActiveCategory] = useState('bebidas');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [immersiveMode, setImmersiveMode] = useState(false);
  const [npcDialogOpen, setNpcDialogOpen] = useState(false);

  const filteredItems = items.filter(item => {
    const matchesCategory = item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f8f5f0] font-sans flex flex-col lg:flex-row text-zinc-800">
      
      {/* MOBILE HEADER & NAV (Visible only on small screens) */}
      <div className="lg:hidden bg-amber-800 text-amber-50 p-4 sticky top-0 z-40 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => setMobileMenuOpen(true)} className="p-1">
            <Menu className="w-6 h-6" />
          </button>
          <div className="font-display font-bold text-lg">Taverna do Dragão</div>
        </div>
        <button className="relative p-2 bg-amber-900/50 rounded-full">
          <ShoppingBag className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full">0</span>
        </button>
      </div>

      {/* MOBILE DRAWER MENU */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="relative w-4/5 max-w-sm bg-amber-800 h-full shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
            <div className="p-4 border-b border-amber-700 flex justify-between items-center">
              <span className="font-display font-bold text-amber-50 text-xl">Menu</span>
              <button onClick={() => setMobileMenuOpen(false)} className="text-amber-200"><X className="w-6 h-6"/></button>
            </div>
            <div className="p-4 flex-1 overflow-y-auto">
              <div className="space-y-2">
                {categories.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => { setActiveCategory(cat.id); setMobileMenuOpen(false); }}
                    className={`w-full text-left px-4 py-3 rounded-lg font-bold flex items-center gap-3 ${activeCategory === cat.id ? 'bg-amber-900 text-amber-50' : 'text-amber-200 hover:bg-amber-700'}`}
                  >
                    <span>{cat.icon}</span> {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LEFT SIDEBAR (Desktop) */}
      <aside className="hidden lg:flex flex-col w-72 bg-[#b46a2b] text-amber-50 h-screen sticky top-0 overflow-y-auto shadow-xl z-30">
        <div className="p-6 flex items-center gap-4 border-b border-amber-700/50">
          <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-amber-800 font-bold text-xl shadow-inner">
            TD
          </div>
          <div>
            <h2 className="font-display font-bold text-lg leading-tight">Taverna do<br/>Dragão</h2>
            <p className="text-amber-200 text-xs uppercase tracking-wider">Menu Oficial</p>
          </div>
        </div>

        <div className="p-6">
          <div className="bg-amber-900/40 rounded-xl p-4 mb-6 border border-amber-700/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-zinc-900 rounded-full flex items-center justify-center text-amber-500 font-bold">A</div>
              <div>
                <p className="text-xs text-amber-200">Olá,</p>
                <p className="font-bold text-sm">Aventureiro</p>
              </div>
            </div>
            <div className="flex justify-between items-center bg-amber-950/50 rounded-lg p-2 px-3 mb-3">
              <span className="text-xs text-amber-200">Bolsa de Ouro</span>
              <span className="font-bold text-amber-400">R$ 0,00</span>
            </div>
            <button 
              onClick={() => setImmersiveMode(!immersiveMode)}
              className="w-full bg-amber-500 hover:bg-amber-400 text-amber-950 text-xs font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2 mb-3 shadow-md"
            >
              <Star className="w-4 h-4" />
              {immersiveMode ? 'Modo Convencional' : 'Modo Imersivo (RPG)'}
            </button>
            <div className="flex gap-2">
              <button className="flex-1 bg-amber-100 text-amber-900 text-xs font-bold py-1.5 rounded hover:bg-white transition-colors">PERFIL</button>
              <button className="flex-1 bg-amber-100 text-amber-900 text-xs font-bold py-1.5 rounded hover:bg-white transition-colors">PEDIDOS</button>
            </div>
          </div>

          <nav className="space-y-1">
            {categories.map(cat => (
              <button 
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`w-full text-left px-4 py-3 rounded-lg font-bold flex items-center justify-between transition-colors ${
                  activeCategory === cat.id 
                    ? 'bg-zinc-900 text-amber-50 shadow-md' 
                    : 'text-amber-100 hover:bg-amber-700/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span>{cat.icon}</span>
                  <span className="uppercase tracking-wide text-sm">{cat.name}</span>
                </div>
                {activeCategory === cat.id && <Star className="w-4 h-4 text-amber-500" />}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-amber-700/50">
          <p className="text-xs text-amber-300 uppercase tracking-widest mb-3 font-bold">Apoio & Redes</p>
          <button className="w-full bg-green-600 hover:bg-green-500 text-white rounded-lg p-3 flex items-center gap-3 mb-3 transition-colors shadow-md">
            <Phone className="w-5 h-5" />
            <div className="text-left">
              <p className="text-[10px] uppercase font-bold opacity-80">Mensageiro (WhatsApp)</p>
              <p className="text-sm font-bold">(47) 99999-9999</p>
            </div>
          </button>
          <button className="w-full bg-amber-900/40 hover:bg-amber-900/60 text-amber-100 rounded-lg p-3 flex items-center gap-3 transition-colors border border-amber-700/50">
            <MapPin className="w-5 h-5" />
            <span className="text-sm font-bold">Localização</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT (Center) */}
      <main className="flex-1 flex flex-col min-h-screen relative">
        {immersiveMode ? (
          <div className="flex-1 relative bg-zinc-900 overflow-hidden flex flex-col items-center justify-center">
            {/* Tavern Background */}
            <div className="absolute inset-0 z-0">
              <Image 
                src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1920&auto=format&fit=crop" 
                alt="Tavern Interior" 
                fill 
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>
            </div>

            {/* NPC Character */}
            <div 
              className="relative z-10 cursor-pointer group flex flex-col items-center mt-20"
              onClick={() => setNpcDialogOpen(true)}
            >
              <div className="absolute -top-16 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-xl text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-2xl">
                Falar com o Taverneiro
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white/20"></div>
              </div>
              <div className="w-64 h-80 relative drop-shadow-2xl transition-transform group-hover:scale-105 duration-300">
                {/* Placeholder for NPC without background */}
                <Image 
                  src="https://images.unsplash.com/photo-1598343175492-9e7dc0e63cc6?q=80&w=800&auto=format&fit=crop" 
                  alt="Taverneiro" 
                  fill 
                  className="object-cover rounded-t-full mask-image-gradient"
                  style={{ maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)' }}
                />
              </div>
            </div>

            {/* NPC Dialog / Shop Interface */}
            {npcDialogOpen && (
              <div className="absolute inset-x-0 bottom-0 top-20 z-20 bg-black/80 backdrop-blur-md border-t-4 border-amber-600 p-4 md:p-8 flex flex-col animate-in slide-in-from-bottom-10 duration-300">
                <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col">
                  {/* Dialog Box */}
                  <div className="bg-zinc-900 border-2 border-amber-700/50 rounded-xl p-4 md:p-6 mb-6 relative shadow-2xl">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setNpcDialogOpen(false); }}
                      className="absolute -top-3 -right-3 bg-red-600 text-white rounded-full p-1 border-2 border-zinc-900 hover:bg-red-500 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <h3 className="text-amber-500 font-display font-bold text-xl mb-2">Taverneiro Bóris</h3>
                    <p className="text-zinc-300 text-lg">&quot;Bem-vindo à Taverna do Dragão, aventureiro! O que vai querer hoje? Temos as melhores poções e banquetes da região.&quot;</p>
                  </div>

                  {/* Game-like Shop Grid */}
                  <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {items.map(item => (
                        <div 
                          key={item.id}
                          onClick={() => setSelectedItem(item)}
                          className="bg-zinc-800 border-2 border-zinc-700 hover:border-amber-500 rounded-lg p-3 cursor-pointer transition-all group flex flex-col h-full"
                        >
                          <div className="relative w-full aspect-square rounded-md overflow-hidden mb-3 bg-zinc-900">
                            <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-2">
                              <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">Comprar</span>
                            </div>
                          </div>
                          <div className="flex-1 flex flex-col justify-between">
                            <h4 className="text-zinc-100 font-bold text-sm leading-tight mb-2 line-clamp-2">{item.name}</h4>
                            <div className="flex justify-between items-center mt-auto">
                              <span className="text-amber-500 font-bold text-sm">R$ {item.price}</span>
                              <div className="w-6 h-6 rounded-full bg-zinc-700 flex items-center justify-center text-zinc-300 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                                <Plus className="w-4 h-4" />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Subtle background texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>
            
            <div className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full relative z-10">
              
              {/* Store Header Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-4 md:p-6 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 bg-amber-600 rounded-full flex items-center justify-center text-white shadow-inner shrink-0 border-4 border-amber-100">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h1 className="text-2xl md:text-3xl font-display font-bold text-zinc-800">Taverna do Dragão</h1>
                      <span className="hidden md:flex items-center gap-1 bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">
                        <Phone className="w-3 h-3" /> (47) 99999-9999
                      </span>
                    </div>
                    <p className="text-zinc-500 text-sm flex items-center gap-1 mb-3">
                      <MapPin className="w-4 h-4" /> Reino de Elyria, Setor 4
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1.5 rounded-md flex items-center gap-1">
                        <Clock className="w-3 h-3" /> 30-45 MIN • CARAVANA
                      </span>
                      <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1.5 rounded-md flex items-center gap-1">
                        <ShoppingBag className="w-3 h-3" /> 15-30 MIN • RETIRADA
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 w-full md:w-auto">
                  <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Status da Taverna</span>
                  <div className="bg-green-100 text-green-700 font-bold px-4 py-2 rounded-full flex items-center gap-2 w-full md:w-auto justify-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    ABERTA AGORA
                  </div>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative mb-10">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-zinc-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-12 pr-4 py-4 bg-white border border-zinc-200 rounded-xl text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent shadow-sm"
                  placeholder="Busque por poções, banquetes, ingredientes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Category Title */}
              <div className="mb-6">
                <h2 className="text-2xl font-display font-bold text-zinc-800 uppercase tracking-widest border-b-2 border-amber-200 pb-2 inline-block">
                  {categories.find(c => c.id === activeCategory)?.name || 'Mercadorias'}
                </h2>
              </div>

              {/* Items Grid (Horizontal Cards) */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
                {filteredItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-white border border-zinc-200 rounded-xl p-4 flex flex-col sm:flex-row gap-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="relative w-full sm:w-32 h-40 sm:h-32 rounded-lg overflow-hidden shrink-0 border border-zinc-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2 mb-1">
                          <h3 className="font-bold text-zinc-800 text-lg leading-tight">{item.name}</h3>
                          <div className="text-right shrink-0">
                            {item.originalPrice && (
                              <span className="block text-xs text-zinc-400 line-through">R$ {item.originalPrice}</span>
                            )}
                            <span className="font-bold text-amber-600 whitespace-nowrap">R$ {item.price}</span>
                          </div>
                        </div>
                        <p className="text-zinc-500 text-sm line-clamp-2 mb-4">{item.description}</p>
                      </div>
                      
                      <div className="flex gap-2 mt-auto">
                        <button 
                          onClick={() => { setSelectedItem(item); setQuantity(1); }}
                          className="flex-1 py-2 px-3 bg-white border border-amber-600 text-amber-700 font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-amber-50 transition-colors text-center"
                        >
                          Personalizar
                        </button>
                        <button 
                          onClick={() => { setSelectedItem(item); setQuantity(1); }}
                          className="flex-1 py-2 px-3 bg-[#c27b3e] text-white font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-amber-700 transition-colors text-center"
                        >
                          Adicionar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredItems.length === 0 && (
                <div className="text-center py-20">
                  <Info className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-zinc-500">Nenhum item encontrado</h3>
                </div>
              )}
            </div>
          </>
        )}
      </main>

      {/* RIGHT SIDEBAR (Desktop) */}
      <aside className="hidden xl:flex flex-col w-80 bg-zinc-900 text-zinc-100 h-screen sticky top-0 shadow-2xl z-20">
        <div className="p-8">
          <h2 className="font-display font-bold text-2xl tracking-widest text-center mb-8 text-amber-500">DELIVERY</h2>
          
          {/* QR Code Box */}
          <div className="bg-white p-4 rounded-xl mb-8 border-2 border-dashed border-zinc-300 relative">
            <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-amber-500"></div>
            <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-amber-500"></div>
            <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-amber-500"></div>
            <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-amber-500"></div>
            
            <div className="aspect-square bg-zinc-100 rounded-lg flex items-center justify-center mb-3 relative overflow-hidden">
              <QrCode className="w-32 h-32 text-zinc-800" />
            </div>
            <p className="text-center text-zinc-800 font-bold tracking-widest uppercase">Scan Me</p>
          </div>

          {/* Store Hours */}
          <div className="bg-zinc-800/50 rounded-xl p-5 border border-zinc-700">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold text-amber-500 uppercase tracking-wider text-sm">Horários da Taverna</h3>
            </div>
            
            <ul className="space-y-3">
              {storeHours.map((day, idx) => (
                <li key={idx} className={`flex justify-between text-sm ${day.active ? 'text-amber-400 font-bold' : 'text-zinc-400'}`}>
                  <span>{day.day}</span>
                  <span>{day.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>

      {/* ITEM CUSTOMIZATION MODAL (Checkout Item) */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div 
            className="bg-white rounded-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header/Image */}
            <div className="relative h-48 w-full shrink-0 bg-zinc-100">
              <Image 
                src={selectedItem.image} 
                alt={selectedItem.name} 
                fill 
                className="object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <button 
                onClick={() => setSelectedItem(null)} 
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/40 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6 overflow-y-auto custom-scrollbar bg-[#fdfbf7]">
              <div className="flex justify-between items-start gap-4 mb-2">
                <h2 className="text-2xl font-display font-bold text-zinc-800">{selectedItem.name}</h2>
                <div className="text-right shrink-0">
                  <span className="text-2xl font-bold text-amber-700">R$ {selectedItem.price}</span>
                </div>
              </div>
              <p className="text-zinc-500 text-sm">{selectedItem.description}</p>
              
              <div className="mt-8 space-y-6">
                {/* Single Choice (Radio) */}
                <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
                  <div className="bg-zinc-50 px-4 py-3 border-b border-zinc-200 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-zinc-800">Tamanho da Porção</h3>
                      <p className="text-xs text-zinc-500">Escolha 1 opção</p>
                    </div>
                    <span className="bg-zinc-200 text-zinc-600 text-[10px] font-bold px-2 py-1 rounded uppercase">Obrigatório</span>
                  </div>
                  <div className="p-2">
                    <label className="flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-zinc-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <input type="radio" name="size" className="w-4 h-4 text-amber-600 focus:ring-amber-600" defaultChecked />
                        <span className="text-zinc-700 font-medium">Padrão da Taverna</span>
                      </div>
                      <span className="text-zinc-400 text-sm">+ R$ 0,00</span>
                    </label>
                    <label className="flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-zinc-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <input type="radio" name="size" className="w-4 h-4 text-amber-600 focus:ring-amber-600" />
                        <span className="text-zinc-700 font-medium">Porção de Ogro (Grande)</span>
                      </div>
                      <span className="text-zinc-700 font-medium text-sm">+ R$ 15,00</span>
                    </label>
                  </div>
                </div>

                {/* Multiple Choice (Checkbox) */}
                <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
                  <div className="bg-zinc-50 px-4 py-3 border-b border-zinc-200 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-zinc-800">Adicionais Mágicos</h3>
                      <p className="text-xs text-zinc-500">Escolha até 3 opções</p>
                    </div>
                  </div>
                  <div className="p-2">
                    <label className="flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-zinc-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <input type="checkbox" className="w-4 h-4 text-amber-600 focus:ring-amber-600 rounded" />
                        <span className="text-zinc-700 font-medium">Embalagem de Presente Élfica</span>
                      </div>
                      <span className="text-zinc-700 font-medium text-sm">+ R$ 5,00</span>
                    </label>
                    <label className="flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-zinc-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <input type="checkbox" className="w-4 h-4 text-amber-600 focus:ring-amber-600 rounded" />
                        <span className="text-zinc-700 font-medium">Seguro contra Goblins</span>
                      </div>
                      <span className="text-zinc-700 font-medium text-sm">+ R$ 12,00</span>
                    </label>
                  </div>
                </div>
                
                {/* Text Area */}
                <div>
                  <h3 className="font-bold text-zinc-800 mb-2">Alguma observação para o Alquimista?</h3>
                  <textarea 
                    className="w-full bg-white border border-zinc-200 rounded-xl p-4 text-zinc-700 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none h-24 shadow-sm"
                    placeholder="Ex: Tirar a cebola, enviar talheres de prata..."
                  ></textarea>
                </div>
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="p-4 border-t border-zinc-200 bg-white flex items-center justify-between gap-4 shrink-0 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
              <div className="flex items-center gap-3 bg-zinc-100 rounded-lg p-1 border border-zinc-200">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                  className="p-2 text-amber-700 hover:bg-white rounded shadow-sm transition-colors disabled:opacity-50"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4"/>
                </button>
                <span className="text-zinc-800 font-bold w-6 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)} 
                  className="p-2 text-amber-700 hover:bg-white rounded shadow-sm transition-colors"
                >
                  <Plus className="w-4 h-4"/>
                </button>
              </div>
              <button 
                onClick={() => setSelectedItem(null)}
                className="flex-1 py-3.5 bg-[#c27b3e] text-white font-bold uppercase tracking-wider rounded-xl hover:bg-amber-700 transition-colors shadow-md flex justify-between items-center px-6"
              >
                <span>Adicionar</span>
                <span>R$ {(Number(selectedItem.price.replace(',','.')) * quantity).toFixed(2).replace('.',',')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
