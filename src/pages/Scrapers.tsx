import React from 'react';
import { Plus, Play, Pause, Edit, Trash2, GitPullRequest } from 'lucide-react';
import { Link } from 'react-router-dom';

const automations = [
  { id: '1', name: 'Consulta CND Receita Federal', type: 'Scraper Individual', status: 'Ativo', lastRun: 'Há 10 min' },
  { id: '2', name: 'Grupo CNDs Completo', type: 'Grupo', status: 'Ativo', lastRun: 'Há 2h' },
  { id: '3', name: 'Emissão DAS Simples Nacional', type: 'Scraper Individual', status: 'Pausado', lastRun: 'Há 5 dias' },
];

export default function Scrapers() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-white flex items-center gap-2">Automações (Scrapers)</h1>
          <p className="text-sm text-slate-400 mt-1">Gerecida os fluxos de consulta e grupos de automação.</p>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center justify-center rounded-lg bg-slate-800 border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-700 transition-colors focus:outline-none">
            Novo Grupo
          </button>
          <Link to="/scrapers/builder/new" className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors focus:outline-none">
            <Plus className="w-4 h-4 mr-2" />
            Novo Scraper
          </Link>
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 overflow-hidden">
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
            {automations.map((item) => (
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
                      <button className="text-amber-400 hover:text-amber-300"><Pause className="w-4 h-4" /></button>
                    ) : (
                      <button className="text-emerald-400 hover:text-emerald-300"><Play className="w-4 h-4" /></button>
                    )}
                    <Link to={`/scrapers/builder/${item.id}`} className="text-indigo-400 hover:text-indigo-300"><Edit className="w-4 h-4" /></Link>
                    <button className="text-rose-400 hover:text-rose-300"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
