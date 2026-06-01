import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { ArrowLeft, Play, Save, CheckCircle2, MonitorPlay, MousePointerClick, X, Globe, Copy, RefreshCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

const initialNodes = [
  { id: '1', position: { x: 50, y: 50 }, data: { label: 'Iniciar Execução' }, type: 'input' },
  { id: '2', position: { x: 50, y: 150 }, data: { label: 'Abrir URL (Receita)' } },
  { id: '3', position: { x: 50, y: 250 }, data: { label: 'Preencher CNPJ: {{cnpj}}' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
];

export default function VisualBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [saved, setSaved] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="h-full flex flex-col pt-0 bg-slate-950 relative">
      <div className="h-16 px-6 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between z-10 w-full absolute top-0 left-0 right-0">
        <div className="flex items-center space-x-4">
          <Link to="/scrapers" className="text-slate-500 hover:text-slate-300 transition">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="h-6 w-px bg-slate-800" />
          <h1 className="text-lg font-semibold text-white">Consulta CND Receita Federal</h1>
          <span className="px-2 py-0.5 rounded border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 font-mono text-[10px] uppercase font-bold tracking-widest hidden md:inline-block">Usa Certificado</span>
        </div>
        <div className="flex items-center space-x-3">
          {saved && <span className="text-emerald-400 flex items-center text-sm font-medium"><CheckCircle2 className="w-4 h-4 mr-1" /> Salvo</span>}
          
          <button 
            onClick={() => setIsRecording(!isRecording)}
            className={`inline-flex items-center justify-center rounded-lg border px-4 py-1.5 text-sm font-medium transition ${
              isRecording 
                ? 'bg-rose-500/10 border-rose-500/20 text-rose-400 hover:bg-rose-500/20' 
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {isRecording ? (
               <><X className="w-4 h-4 mr-2" /> Fechar Gravação</>
            ) : (
               <><MonitorPlay className="w-4 h-4 mr-2" /> Modo Gravação</>
            )}
          </button>

          <button onClick={handleSave} className="inline-flex items-center justify-center rounded-lg bg-slate-800 border border-slate-700 px-4 py-1.5 text-sm font-medium text-slate-300 hover:bg-slate-700 transition">
            <Save className="w-4 h-4 mr-2" />
            Salvar
          </button>
          <button className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-indigo-700 transition">
            <Play className="w-4 h-4 mr-2" />
            Testar
          </button>
        </div>
      </div>

      <div className="flex-1 mt-16 relative flex">
        {/* React Flow Container */}
        <div className={`transition-all duration-300 ease-in-out h-full ${isRecording ? 'w-1/2 border-r border-slate-800' : 'w-full'}`}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            colorMode="dark"
            fitView
            className="bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px]"
          >
            <Controls className="bg-slate-900 border-slate-800 fill-slate-400" />
            <Background variant="dots" gap={12} size={1} color="#334155" />
            
            <Panel position="top-right" className="bg-slate-900 p-4 shadow-xl rounded-2xl border border-slate-800 w-64 m-4">
              <h3 className="text-sm font-semibold text-white border-b border-slate-800 pb-2 mb-3">Adicionar Bloco</h3>
              <div className="space-y-2">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Navegação</div>
                <button className="w-full text-left px-3 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-sm text-slate-300 transition">🌍 Abrir URL</button>
                <button className="w-full text-left px-3 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-sm text-slate-300 transition">🖱️ Clicar Elemento</button>
                <button className="w-full text-left px-3 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-sm text-slate-300 transition">⌨️ Digitar Texto</button>
                
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 mt-4">Captura</div>
                <button className="w-full text-left px-3 py-2 bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/20 rounded-lg text-sm text-indigo-400 transition">📄 Capturar PDF</button>
                <button className="w-full text-left px-3 py-2 bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/20 rounded-lg text-sm text-indigo-400 transition">🧩 OCR / Tabela</button>

                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 mt-4">Variáveis</div>
                <code className="block w-full px-2 py-1.5 bg-slate-950 border border-slate-800 rounded text-[11px] font-mono text-emerald-400 mt-1 mb-1">{`{{empresa.cnpj}}`}</code>
                <code className="block w-full px-2 py-1.5 bg-slate-950 border border-slate-800 rounded text-[11px] font-mono text-emerald-400 mt-1 mb-1">{`{{empresa.senha}}`}</code>
              </div>
            </Panel>
          </ReactFlow>
        </div>

        {/* Embedded Browser (Recording Mode) */}
        {isRecording && (
          <div className="w-1/2 h-full bg-slate-950 flex flex-col items-center justify-center p-4">
             <div className="w-full h-full max-h-full bg-white rounded-xl shadow-2xl border border-slate-700 flex flex-col overflow-hidden relative">
               
               {/* Rec Overlay */}
               <div className="absolute top-16 left-0 right-0 bottom-0 z-50 bg-indigo-500/10 border-4 border-dashed border-indigo-500/30 flex items-center justify-center pointer-events-none">
                 <div className="bg-slate-900/90 text-white px-6 py-4 rounded-xl shadow-2xl flex flex-col items-center border border-slate-700">
                    <MousePointerClick className="w-8 h-8 text-indigo-400 mb-3 animate-bounce" />
                    <span className="text-sm font-semibold tracking-wide">Navegador Interativo (Modo Gravação)</span>
                    <span className="text-xs text-slate-400 mt-1 max-w-[250px] text-center">Clique em qualquer elemento abaixo para adicionar um bloco de ação no fluxo ao lado.</span>
                 </div>
               </div>

               {/* Browser UI Chrome */}
               <div className="h-12 bg-slate-100 flex items-center px-4 border-b border-slate-200">
                 <div className="flex space-x-2 mr-4">
                   <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                   <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                   <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                 </div>
                 <div className="flex items-center space-x-2 mr-4 text-slate-400">
                   <ArrowLeft className="w-4 h-4 cursor-not-allowed" />
                   <RefreshCcw className="w-4 h-4 cursor-not-allowed" />
                 </div>
                 <div className="flex-1 bg-white border border-slate-200 rounded-md h-8 flex items-center px-3">
                   <Globe className="w-4 h-4 text-slate-400 mr-2" />
                   <span className="text-sm text-slate-700 font-mono">https://cav.receita.fazenda.gov.br/</span>
                 </div>
               </div>

               {/* Mock Browser Viewport */}
               <div className="flex-1 bg-slate-50 relative overflow-hidden flex flex-col items-center pt-20">
                  <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 w-96 relative opacity-50 blur-[1px]">
                    <div className="h-8 w-32 bg-blue-900 rounded mb-6 mx-auto"></div>
                    <div className="space-y-4">
                      <div className="h-10 border border-slate-300 rounded cursor-pointer relative group">
                        <div className="absolute inset-0 border-2 border-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity rounded"></div>
                        <span className="absolute left-3 top-2.5 text-sm text-slate-400">CNPJ</span>
                      </div>
                      <div className="h-10 border border-slate-300 rounded cursor-pointer relative group">
                        <div className="absolute inset-0 border-2 border-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity rounded"></div>
                        <span className="absolute left-3 top-2.5 text-sm text-slate-400">Senha</span>
                      </div>
                      <div className="h-10 bg-blue-600 rounded cursor-pointer relative group flex justify-center items-center">
                        <div className="absolute inset-0 border-2 border-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity rounded"></div>
                        <span className="text-sm text-white font-medium">Entrar</span>
                      </div>
                    </div>
                  </div>
               </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
