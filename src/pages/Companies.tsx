import React, { useState } from 'react';
import { Plus, Search, Building2, ExternalLink, Upload, Download, FileSpreadsheet, X, Info } from 'lucide-react';

const empresas = [
  { id: 1, cpnj: '12.345.678/0001-99', razaoSocial: 'Tech Solutions S.A.', certificado: 'Ativo', status: 'Ativo' },
  { id: 2, cpnj: '98.765.432/0001-11', razaoSocial: 'Comércio Alfa Ltda', certificado: 'Ativo', status: 'Ativo' },
  { id: 3, cpnj: '45.678.901/0001-22', razaoSocial: 'Serviços Omega ME', certificado: 'Vence em 15d', status: 'Atenção' },
];

export default function Companies() {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-white">Empresas</h1>
          <p className="text-sm text-slate-400 mt-1">Gerencie os dados, campos personalizados e certificados das empresas.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setIsImportModalOpen(true)}
            className="inline-flex items-center justify-center rounded-lg bg-slate-800 border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-700 transition-colors focus:outline-none"
          >
            <Upload className="w-4 h-4 mr-2" />
            Importar (.xlsx)
          </button>
          <button className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors focus:outline-none">
            <Plus className="w-4 h-4 mr-2" />
            Nova Empresa
          </button>
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex space-x-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-500" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-slate-700 rounded-lg leading-5 bg-slate-950 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Buscar por Razão Social, CNPJ..."
            />
          </div>
        </div>
        
        <table className="min-w-full divide-y divide-slate-800">
          <thead className="bg-slate-950/50 backdrop-blur-sm">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Razão Social / CNPJ
              </th>
              <th scope="col" className="px-6 py-3 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Certificado Padrão
              </th>
              <th scope="col" className="px-6 py-3 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Ações</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-transparent divide-y divide-slate-800/60">
            {empresas.map((empresa) => (
              <tr key={empresa.id} className="hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-slate-800 rounded-lg border border-slate-700">
                      <Building2 className="h-5 w-5 text-slate-400" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-semibold text-slate-200">{empresa.razaoSocial}</div>
                      <div className="text-xs text-slate-400 font-mono mt-0.5">{empresa.cpnj}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-0.5 inline-flex text-[11px] font-mono border rounded ${
                    empresa.certificado.includes('Vence') ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  }`}>
                    {empresa.certificado}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                  {empresa.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-400 hover:text-indigo-300 flex items-center ml-auto">
                    Acessar <ExternalLink className="w-4 h-4 ml-1" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Import Modal */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm px-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950/30">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                  <FileSpreadsheet className="w-5 h-5 text-indigo-400" />
                </div>
                <h2 className="text-lg font-semibold text-white">Importar Empresas (.xlsx)</h2>
              </div>
              <button 
                onClick={() => setIsImportModalOpen(false)}
                className="text-slate-500 hover:text-slate-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {/* Upload Area */}
              <div className="border-2 border-dashed border-slate-700 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-950/50 hover:bg-slate-800/50 transition-colors cursor-pointer group">
                <Upload className="w-8 h-8 text-slate-500 group-hover:text-indigo-400 transition-colors mb-3" />
                <p className="text-sm font-medium text-slate-300">Clique para selecionar ou arraste o arquivo</p>
                <p className="text-xs text-slate-500 mt-1">Apenas arquivos .xlsx são suportados</p>
              </div>

              {/* Manual Info */}
              <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm font-semibold text-slate-200">
                    <Info className="w-4 h-4 text-indigo-400" />
                    <span>Como estruturar sua planilha</span>
                  </div>
                  <button className="text-[11px] uppercase tracking-widest font-bold text-indigo-400 hover:text-indigo-300 flex items-center bg-indigo-500/10 px-3 py-1.5 rounded-lg border border-indigo-500/20 transition-colors">
                    <Download className="w-3.5 h-3.5 mr-1.5" /> Baixar Modelo
                  </button>
                </div>
                
                <p className="text-xs text-slate-400 leading-relaxed">
                  A primeira linha da sua planilha deve conter os cabeçalhos exatos listados abaixo. O sistema importará a partir da segunda linha.
                </p>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg">
                    <span className="font-mono text-emerald-400 block mb-1 font-semibold">CNPJ</span>
                    <span className="text-slate-500">Apenas números ou com máscara</span>
                  </div>
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg">
                    <span className="font-mono text-emerald-400 block mb-1 font-semibold">Razao_Social</span>
                    <span className="text-slate-500">Razão social completa</span>
                  </div>
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg">
                    <span className="font-mono text-emerald-400 block mb-1 font-semibold">Nome_Fantasia</span>
                    <span className="text-slate-500">Opcional</span>
                  </div>
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg">
                    <span className="font-mono text-emerald-400 block mb-1 font-semibold">IE / IM</span>
                    <span className="text-slate-500">Inscrição Estadual ou Municipal</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-800 bg-slate-950/30 flex justify-end space-x-3">
              <button 
                onClick={() => setIsImportModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                Cancelar
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
                Iniciar Importação
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
