import React from 'react';
import { CalendarClock } from 'lucide-react';

export default function Schedules() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-white">Agendamentos</h1>
          <p className="text-sm text-slate-400 mt-1">Configure as execuções automáticas e recorrentes (diárias, semanais, mensais).</p>
        </div>
        <button className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition">
          Novo Agendamento
        </button>
      </div>
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-16 text-center flex flex-col items-center justify-center shadow-xl">
        <div className="bg-slate-800/50 p-4 rounded-full mb-4 border border-slate-700/50">
          <CalendarClock className="w-10 h-10 text-slate-500" />
        </div>
        <p className="text-slate-200 font-medium text-lg">Nenhum agendamento configurado</p>
        <p className="text-slate-400 text-sm mt-2 max-w-md">
          Crie um novo agendamento para automatizar a execução na nuvem de seus Scrapers Individuais ou Grupos.
        </p>
      </div>
    </div>
  );
}
