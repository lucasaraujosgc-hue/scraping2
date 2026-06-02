import React from 'react';
import { Building2, ShieldCheck, FileCheck2, AlertCircle, RefreshCcw } from 'lucide-react';

const stats = [
  { name: 'Empresas Cadastradas', value: '0', icon: Building2, color: 'text-indigo-400', bg: 'bg-indigo-600/10 border-indigo-500/20' },
  { name: 'Certificados Ativos', value: '0', icon: ShieldCheck, color: 'text-emerald-400', bg: 'bg-emerald-600/10 border-emerald-500/20' },
  { name: 'Certidões Emitidas (Mês)', value: '0', icon: FileCheck2, color: 'text-indigo-400', bg: 'bg-indigo-600/10 border-indigo-500/20' },
  { name: 'Avisos Pendentes', value: '0', icon: AlertCircle, color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20' },
];

export default function Dashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-white flex items-center gap-2">Visão Geral</h1>
        <p className="text-sm text-slate-400 mt-1">Acompanhe os principais indicadores do sistema.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl">
            <div className="flex items-center">
              <div className={`p-2 rounded-xl border ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} aria-hidden="true" />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">{stat.name}</h3>
              <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl p-6 overflow-hidden">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">Últimas Execuções</h2>
          <div className="flex flex-col items-center justify-center p-8 text-center border border-dashed border-slate-800 rounded-xl bg-slate-950/50">
            <RefreshCcw className="w-8 h-8 text-slate-600 mb-3" />
            <p className="text-slate-300 font-medium text-sm">Nenhuma execução recente</p>
            <p className="text-slate-500 text-xs mt-1">Crie e execute suas automações para visualizar os logs aqui.</p>
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl p-6 overflow-hidden">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">Alertas de Vencimento</h2>
          <div className="flex flex-col items-center justify-center p-8 text-center border border-dashed border-slate-800 rounded-xl bg-slate-950/50">
            <ShieldCheck className="w-8 h-8 text-emerald-600/50 mb-3" />
            <p className="text-slate-300 font-medium text-sm">Tudo em dia</p>
            <p className="text-slate-500 text-xs mt-1">Nenhum certificado prestes a vencer no momento.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
