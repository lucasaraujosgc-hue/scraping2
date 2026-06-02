import React, { useState } from 'react';
import { Plus, Play, Pause, Edit, Trash2, GitPullRequest, Search, FileCode2, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';

export default function Scrapers() {
  const { scrapers, toggleScraperStatus, deleteScraper, addScraper } = useAppStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newScraperName, setNewScraperName] = useState('');
  const [newScraperType, setNewScraperType] = useState<'Macro Individual' | 'Grupo'>('Macro Individual');
  const navigate = useNavigate();

  const handleCreateScraper = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newScraperName.trim()) return;
    const newId = addScraper({ name: newScraperName.trim(), type: newScraperType });
    setIsModalOpen(false);
    setNewScraperName('');
    if (newScraperType === 'Macro Individual') {
      navigate(`/scrapers/builder/${newId}`);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 relative">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-white flex items-center gap-2">Automações (RPA / Macros)</h1>
          <p className="text-sm text-slate-400 mt-1">Gerencie os fluxos de execução e grupos de automação.</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => { setNewScraperType('Grupo'); setIsModalOpen(true); }}
            className="inline-flex items-center justify-center rounded-lg bg-slate-800 border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-700 transition-colors focus:outline-none"
          >
            Novo Grupo
          </button>
          <button 
            onClick={() => { setNewScraperType('Macro Individual'); setIsModalOpen(true); }}
            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors focus:outline-none"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nova Macro
          </button>
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 overflow-hidden">
        {scrapers.length > 0 ? (
          <table className="min-w-full divide-y divide-slate-800">
            <thead className="bg-slate-950/50 backdrop-blur-sm">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider">Nome</th>
                <th scope="col" className="px-6 py-3 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider">Tipo</th>
                <th scope="col" className="px-6 py-3 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider">Última Execução</th>
                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Ações</span></th>
              </tr>
            </thead>
            <tbody className="bg-transparent divide-y divide-slate-800/60">
              {scrapers.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <GitPullRequest className="h-5 w-5 text-indigo-400 mr-3" />
                      <span className="text-sm font-semibold text-slate-200">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">{item.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-0.5 inline-flex text-[11px] font-mono border rounded ${
                      item.status === 'Ativo' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-slate-500">{item.lastRun}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-3">
                      {item.status === 'Ativo' ? (
                        <button onClick={() => toggleScraperStatus(item.id)} className="text-amber-400 hover:text-amber-300 transition" title="Pausar"><Pause className="w-4 h-4" /></button>
                      ) : (
                        <button onClick={() => toggleScraperStatus(item.id)} className="text-emerald-400 hover:text-emerald-300 transition" title="Ativar"><Play className="w-4 h-4" /></button>
                      )}
                      {item.type === 'Macro Individual' ? (
                        <Link to={`/scrapers/builder/${item.id}`} className="text-indigo-400 hover:text-indigo-300 transition" title="Editar Fluxo">
                          <Edit className="w-4 h-4" />
                        </Link>
                      ) : (
                         <button className="text-indigo-400 hover:text-indigo-300 transition" title="Editar Grupo">
                           <Edit className="w-4 h-4" />
                         </button>
                      )}
                      
                      <button onClick={() => deleteScraper(item.id)} className="text-rose-400 hover:text-rose-300 transition" title="Excluir"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
           <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
             <div className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-full mb-4">
               <FileCode2 className="w-10 h-10 text-slate-500" />
             </div>
             <h3 className="text-slate-200 font-medium text-lg">Nenhuma automação encontrada</h3>
             <p className="text-slate-400 text-sm mt-1 mb-6 max-w-sm">
               Crie uma nova macro ou grupo para começar a automatizar tarefas repetitivas.
             </p>
             <button 
               onClick={() => { setNewScraperType('Macro Individual'); setIsModalOpen(true); }}
               className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors focus:outline-none"
             >
               <Plus className="w-4 h-4 mr-2" />
               Nova Macro
             </button>
           </div>
        )}
      </div>

      {/* Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm px-4">
           <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
             <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/30">
                <h2 className="text-lg font-semibold text-white">Novo {newScraperType === 'Grupo' ? 'Grupo' : 'Macro'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-slate-300 transition-colors">
                  <X className="w-5 h-5" />
                </button>
             </div>
             
             <form onSubmit={handleCreateScraper}>
               <div className="p-5 space-y-4">
                 <div>
                   <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">
                     Nome da Automação
                   </label>
                   <input
                     type="text"
                     id="name"
                     autoFocus
                     value={newScraperName}
                     onChange={(e) => setNewScraperName(e.target.value)}
                     className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                     placeholder="Ex: Consulta CND Federal"
                   />
                 </div>
               </div>
               
               <div className="p-5 border-t border-slate-800 bg-slate-950/30 flex justify-end space-x-3">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit"
                    disabled={!newScraperName.trim()}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Criar e Continuar
                  </button>
               </div>
             </form>
           </div>
        </div>
      )}
    </div>
  );
}
