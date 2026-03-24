'use client';

import { useState, useEffect } from 'react';
import { Store, Package, List, Settings, ShoppingCart, Plus, Edit2, Trash2, Image as ImageIcon, Save, MapPin, Clock, Phone } from 'lucide-react';

export default function RPGDashboard() {
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    const savedData = localStorage.getItem('merchantFormData');
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to parse form data", e);
      }
    }
  }, []);

  const tabs = [
    { id: 'profile', name: 'Perfil da Taverna', icon: <Store className="w-5 h-5" /> },
    { id: 'categories', name: 'Categorias', icon: <List className="w-5 h-5" /> },
    { id: 'items', name: 'Itens do Cardápio', icon: <Package className="w-5 h-5" /> },
    { id: 'customizations', name: 'Personalizações', icon: <Settings className="w-5 h-5" /> },
    { id: 'orders', name: 'Pedidos Ativos', icon: <ShoppingCart className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-[#f8f5f0] font-sans flex text-zinc-800">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#2a1f1a] text-amber-50 h-screen sticky top-0 flex flex-col shadow-2xl z-20">
        <div className="p-6 border-b border-amber-900/50">
          <h1 className="font-display font-bold text-xl text-amber-500 tracking-wider uppercase">Painel da Guilda</h1>
          <p className="text-xs text-amber-200/70 mt-1">Gestão de Mercadores</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-colors ${
                activeTab === tab.id 
                  ? 'bg-amber-600 text-white shadow-md' 
                  : 'text-amber-200 hover:bg-amber-900/50 hover:text-amber-100'
              }`}
            >
              {tab.icon}
              {tab.name}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-amber-900/50">
          <div className="bg-amber-950/50 rounded-lg p-3 border border-amber-900/50 flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-800 rounded-full flex items-center justify-center font-bold text-amber-100">
              TD
            </div>
            <div>
              <p className="text-xs text-amber-400 font-bold">{formData?.nomeFantasia || 'Taverna do Dragão'}</p>
              <p className="text-[10px] text-amber-200/70 uppercase">Plano Padrão</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto relative">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>
        
        <div className="p-8 max-w-5xl mx-auto relative z-10">
          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-display font-bold text-zinc-800">Perfil da Taverna</h2>
                  <p className="text-zinc-500 mt-1">Configure as informações públicas do seu comércio.</p>
                </div>
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 shadow-md transition-colors">
                  <Save className="w-5 h-5" /> Salvar Alterações
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-200">
                    <h3 className="text-lg font-bold text-zinc-800 mb-4 border-b border-zinc-100 pb-2">Informações Básicas</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-1">Nome do Comércio</label>
                        <input type="text" className="w-full border border-zinc-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none" defaultValue={formData?.nomeFantasia || "Taverna do Dragão"} />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-1">Razão Social</label>
                        <input type="text" className="w-full border border-zinc-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none" defaultValue={formData?.razaoSocial || ""} />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-1">CNPJ</label>
                        <input type="text" className="w-full border border-zinc-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none" defaultValue={formData?.cnpj || ""} />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-1">Subdomínio</label>
                        <div className="flex items-center border border-zinc-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-amber-500 focus-within:border-transparent">
                          <span className="bg-zinc-100 text-zinc-500 px-3 py-2.5 border-r border-zinc-300 text-sm">guilda.com/</span>
                          <input type="text" className="w-full px-4 py-2.5 outline-none" defaultValue={formData?.subdominio || ""} />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-1">Descrição Curta</label>
                        <textarea className="w-full border border-zinc-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none resize-none h-24" defaultValue="A melhor taverna do Reino de Elyria, servindo banquetes e poções para aventureiros cansados."></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-200">
                    <h3 className="text-lg font-bold text-zinc-800 mb-4 border-b border-zinc-100 pb-2">Contato e Localização</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-zinc-700 mb-1 flex items-center gap-2"><Phone className="w-4 h-4 text-zinc-400"/> Telefone / WhatsApp</label>
                          <input type="text" className="w-full border border-zinc-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none" defaultValue={formData?.whatsapp || formData?.telefone || "(47) 99999-9999"} />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-zinc-700 mb-1 flex items-center gap-2"><Clock className="w-4 h-4 text-zinc-400"/> Tempo de Entrega</label>
                          <input type="text" className="w-full border border-zinc-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none" defaultValue="30-45 MIN" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-1 flex items-center gap-2"><MapPin className="w-4 h-4 text-zinc-400"/> Endereço Completo</label>
                        <input type="text" className="w-full border border-zinc-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none" defaultValue={formData ? `${formData.rua}, ${formData.numero}${formData.complemento ? ` - ${formData.complemento}` : ''}, ${formData.bairro}, ${formData.cidade} - ${formData.uf}, ${formData.cep}` : "Reino de Elyria, Setor 4, Rua dos Ferreiros, 123"} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-200">
                    <h3 className="text-lg font-bold text-zinc-800 mb-4 border-b border-zinc-100 pb-2">Identidade Visual</h3>
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-32 h-32 bg-zinc-100 rounded-full border-4 border-white shadow-lg flex items-center justify-center relative overflow-hidden group cursor-pointer">
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <ImageIcon className="w-8 h-8 text-white" />
                        </div>
                        <span className="text-4xl">🐉</span>
                      </div>
                      <p className="text-xs text-zinc-500 text-center">Clique para alterar o brasão (logo) da sua taverna.</p>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-200">
                    <h3 className="text-lg font-bold text-zinc-800 mb-4 border-b border-zinc-100 pb-2">Status de Operação</h3>
                    <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-lg border border-zinc-200">
                      <div>
                        <p className="font-bold text-zinc-800">Taverna Aberta</p>
                        <p className="text-xs text-zinc-500">Recebendo pedidos</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-zinc-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ITEMS TAB */}
          {activeTab === 'items' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-display font-bold text-zinc-800">Itens do Cardápio</h2>
                  <p className="text-zinc-500 mt-1">Gerencie os produtos oferecidos aos aventureiros.</p>
                </div>
                <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 shadow-md transition-colors">
                  <Plus className="w-5 h-5" /> Novo Item
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 text-sm uppercase tracking-wider">
                      <th className="p-4 font-bold">Item</th>
                      <th className="p-4 font-bold">Categoria</th>
                      <th className="p-4 font-bold">Preço</th>
                      <th className="p-4 font-bold">Status</th>
                      <th className="p-4 font-bold text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {[
                      { name: 'Cerveja Amanteigada dos Anões', cat: 'Poções & Bebidas', price: 'R$ 8,90', active: true },
                      { name: 'Banquete do Rei Dragão', cat: 'Banquetes (Combos)', price: 'R$ 45,00', active: true },
                      { name: 'Sanduíche de Javali Defumado', cat: 'Rações de Viagem', price: 'R$ 22,90', active: false },
                    ].map((item, i) => (
                      <tr key={i} className="hover:bg-zinc-50 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-zinc-200 rounded-md"></div>
                            <span className="font-bold text-zinc-800">{item.name}</span>
                          </div>
                        </td>
                        <td className="p-4 text-zinc-600">{item.cat}</td>
                        <td className="p-4 font-bold text-amber-700">{item.price}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${item.active ? 'bg-green-100 text-green-700' : 'bg-zinc-100 text-zinc-500'}`}>
                            {item.active ? 'Disponível' : 'Esgotado'}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button className="p-2 text-zinc-400 hover:text-amber-600 hover:bg-amber-50 rounded transition-colors"><Edit2 className="w-4 h-4" /></button>
                            <button className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* CATEGORIES TAB */}
          {activeTab === 'categories' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-display font-bold text-zinc-800">Categorias</h2>
                  <p className="text-zinc-500 mt-1">Organize seu cardápio em seções para facilitar a busca.</p>
                </div>
                <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 shadow-md transition-colors">
                  <Plus className="w-5 h-5" /> Nova Categoria
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 text-sm uppercase tracking-wider">
                      <th className="p-4 font-bold w-16 text-center">Ícone</th>
                      <th className="p-4 font-bold">Nome da Categoria</th>
                      <th className="p-4 font-bold">Total de Itens</th>
                      <th className="p-4 font-bold text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {[
                      { name: 'Poções & Bebidas', icon: '🍷', items: 12 },
                      { name: 'Banquetes (Combos)', icon: '🍗', items: 5 },
                      { name: 'Rações de Viagem', icon: '🥪', items: 8 },
                    ].map((cat, i) => (
                      <tr key={i} className="hover:bg-zinc-50 transition-colors">
                        <td className="p-4 text-center text-2xl">{cat.icon}</td>
                        <td className="p-4 font-bold text-zinc-800">{cat.name}</td>
                        <td className="p-4 text-zinc-600">{cat.items} itens</td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button className="p-2 text-zinc-400 hover:text-amber-600 hover:bg-amber-50 rounded transition-colors"><Edit2 className="w-4 h-4" /></button>
                            <button className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* CUSTOMIZATIONS TAB */}
          {activeTab === 'customizations' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-display font-bold text-zinc-800">Grupos de Personalização</h2>
                  <p className="text-zinc-500 mt-1">Crie opções como &quot;Tamanho&quot;, &quot;Adicionais&quot; e &quot;Retiradas&quot; para vincular aos itens.</p>
                </div>
                <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 shadow-md transition-colors">
                  <Plus className="w-5 h-5" /> Novo Grupo
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: 'Tamanho da Porção', type: 'Escolha Única (Radio)', required: true, options: ['Padrão da Taverna (+ R$ 0,00)', 'Porção de Ogro (+ R$ 15,00)'] },
                  { name: 'Adicionais Mágicos', type: 'Múltipla Escolha (Checkbox)', required: false, options: ['Embalagem Élfica (+ R$ 5,00)', 'Seguro contra Goblins (+ R$ 12,00)'] },
                  { name: 'Ponto da Carne', type: 'Escolha Única (Radio)', required: true, options: ['Mal Passada', 'Ao Ponto', 'Bem Passada'] },
                ].map((group, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-sm border border-zinc-200 p-6 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-zinc-800 text-lg">{group.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-zinc-500 bg-zinc-100 px-2 py-1 rounded">{group.type}</span>
                          {group.required && <span className="text-[10px] font-bold uppercase text-red-600 bg-red-50 px-2 py-1 rounded">Obrigatório</span>}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <button className="p-1.5 text-zinc-400 hover:text-amber-600 hover:bg-amber-50 rounded transition-colors"><Edit2 className="w-4 h-4" /></button>
                        <button className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                    
                    <div className="bg-zinc-50 rounded-lg p-3 border border-zinc-100 flex-1">
                      <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Opções ({group.options.length})</p>
                      <ul className="space-y-1">
                        {group.options.map((opt, j) => (
                          <li key={j} className="text-sm text-zinc-700 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                            {opt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* OTHER TABS PLACEHOLDER */}
          {['orders'].includes(activeTab) && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 mb-6">
                <Settings className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-display font-bold text-zinc-800 mb-2">Módulo em Construção</h2>
              <p className="text-zinc-500 max-w-md">Os goblins engenheiros estão trabalhando duro para finalizar esta seção do painel da guilda.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
