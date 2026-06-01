import React from 'react';
import { Building2, ShieldCheck, FileCheck2, AlertCircle } from 'lucide-react';

const stats = [
  { name: 'Empresas Cadastradas', value: '142', icon: Building2, color: 'text-indigo-400', bg: 'bg-indigo-600/10 border-indigo-500/20' },
  { name: 'Certificados Ativos', value: '138', icon: ShieldCheck, color: 'text-emerald-400', bg: 'bg-emerald-600/10 border-emerald-500/20' },
  { name: 'Certidões Emitidas (Mês)', value: '845', icon: FileCheck2, color: 'text-indigo-400', bg: 'bg-indigo-600/10 border-indigo-500/20' },
  { name: 'Avisos Pendentes', value: '4', icon: AlertCircle, color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20' },
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
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="font-semibold text-slate-200">Grupo CNDs Mensal</span>
                  <span className="text-slate-500">- Empresa {String.fromCharCode(64 + i)}</span>
                </div>
                <span className="text-slate-500 font-mono text-[11px]">Há {i * 15} min</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl p-6 overflow-hidden">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">Alertas de Vencimento de Certificados</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm p-3 bg-red-500/10 text-red-400 rounded-xl border border-red-500/20">
              <div className="flex items-center font-semibold text-slate-200">
                <AlertCircle className="w-4 h-4 mr-2 text-red-500" />
                Construtora Alfa Ltda
              </div>
              <span className="text-[10px] font-mono border border-red-500/20 bg-red-500/10 px-2 py-0.5 rounded text-red-400">VENCE EM 2 DIAS</span>
            </div>
            <div className="flex items-center justify-between text-sm p-3 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
              <div className="flex items-center font-semibold text-slate-200">
                <AlertCircle className="w-4 h-4 mr-2 text-amber-500" />
                Tech Solutions SA
              </div>
              <span className="text-[10px] font-mono border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 rounded text-amber-400">VENCE EM 14 DIAS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
