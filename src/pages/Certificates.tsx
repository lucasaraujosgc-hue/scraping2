import React from 'react';
import { Plus, Shield, UploadCloud } from 'lucide-react';

export default function Certificates() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-white">Gerenciador de Certificados Digitais</h1>
          <p className="text-sm text-slate-400 mt-1">Armazene e vincule certificados A1 (PFX) de forma segura.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-2 lg:col-span-3 border-2 border-dashed border-slate-700 bg-slate-900/40 rounded-2xl p-12 text-center hover:bg-slate-800 transition-colors cursor-pointer">
          <UploadCloud className="mx-auto h-12 w-12 text-slate-500" />
          <h3 className="mt-4 text-sm font-semibold text-white">Fazer upload de um novo certificado .PFX</h3>
          <p className="mt-2 text-sm text-slate-400">
            A senha será criptografada e os dados extraídos automaticamente.
          </p>
          <div className="mt-6">
            <button className="inline-flex items-center justify-center rounded-lg bg-slate-800 border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-700 transition focus:outline-none">
              Selecionar Arquivo
            </button>
          </div>
        </div>

        {/* Dummy Certificate Card */}
        <div className="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 overflow-hidden col-span-1 md:col-span-1 lg:col-span-1">
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded text-xs font-mono">
                <Shield className="w-3.5 h-3.5" />
                <span>Válido</span>
              </div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">e-CNPJ A1</span>
            </div>
            <h3 className="font-semibold text-slate-200 truncate" title="TECH SOLUTIONS SA">TECH SOLUTIONS SA</h3>
            <p className="text-sm font-mono text-slate-500 mt-1">12.345.678/0001-99</p>
            
            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-end">
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-500">Vencimento</p>
                <p className="text-sm font-semibold text-slate-300">22/10/2026</p>
              </div>
              <button className="text-indigo-400 text-sm font-medium hover:text-indigo-300 transition">Visualizar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
