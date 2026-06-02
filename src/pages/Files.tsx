import React from 'react';
import { Files as FilesIcon } from 'lucide-react';

export default function Files() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-white">Repositório de Arquivos</h1>
          <p className="text-sm text-slate-400 mt-1">Acesse, filtre e faça download de todos os documentos (PDFs, XMLs, CNDs) baixados.</p>
        </div>
      </div>
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-16 text-center flex flex-col items-center justify-center shadow-xl">
        <div className="bg-slate-800/50 p-4 rounded-full mb-4 border border-slate-700/50">
          <FilesIcon className="w-10 h-10 text-slate-500" />
        </div>
        <p className="text-slate-200 font-medium text-lg">Nenhum arquivo encontrado</p>
        <p className="text-slate-400 text-sm mt-2 max-w-md">
          Quando suas automações executarem e baixarem arquivos, eles serão indexados nesta seção automaticamente.
        </p>
      </div>
    </div>
  );
}
