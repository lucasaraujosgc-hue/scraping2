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
  Handle,
  Position
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { ArrowLeft, Play, Save, CheckCircle2, MonitorPlay, MousePointerClick, X, Globe, Copy, RefreshCcw, Download, FileCode2, ShieldCheck, Edit, Trash2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useAppStore } from '../store';

const RPANode = ({ id, data, isConnectable }: any) => {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-lg p-3 shadow-lg min-w-[200px] relative group text-left">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} className="w-2 h-2 !bg-indigo-500" />
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-200 font-medium">{data.label}</span>
      </div>
      <div className="absolute -top-3 -right-3 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
         <button className="bg-slate-800 p-1.5 rounded-full border border-slate-700 text-indigo-400 hover:bg-slate-700 transition" onClick={() => data.onEdit(id)}>
           <Edit className="w-3.5 h-3.5" />
         </button>
         <button className="bg-slate-800 p-1.5 rounded-full border border-slate-700 text-rose-400 hover:bg-slate-700 transition" onClick={() => data.onDelete(id)}>
           <Trash2 className="w-3.5 h-3.5" />
         </button>
      </div>
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} className="w-2 h-2 !bg-indigo-500" />
    </div>
  );
};

const nodeTypes = {
  rpaNode: RPANode,
};

export default function VisualBuilder() {
  const { id } = useParams();
  const getScraperName = useAppStore(state => state.scrapers.find(s => s.id === id)?.name) || 'Novo Scraper';
  const [saved, setSaved] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const handleTestMacro = async () => {
    setIsRunning(true);
    try {
      const response = await fetch('/api/run-macro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges })
      });
      const data = await response.json();
      console.log('Macro start response:', data);
      alert('Macro iniciada em background!');
    } catch (err) {
      console.error(err);
      alert('Erro ao iniciar macro');
    } finally {
      setIsRunning(false);
    }
  };

  const onEditNode = useCallback((nodeId: string) => {
    setNodes((nds) => 
      nds.map((n) => {
        if (n.id === nodeId) {
          const newLabel = window.prompt('Editar nome da ação:', n.data.label);
          if (newLabel) {
            return { ...n, data: { ...n.data, label: newLabel } };
          }
        }
        return n;
      })
    );
  }, []);

  const onDeleteNode = useCallback((nodeId: string) => {
    setNodes((nds) => nds.filter((n) => n.id !== nodeId));
    setEdges((eds) => eds.filter((e) => e.source !== nodeId && e.target !== nodeId));
  }, []);

  const initialNodes = [
    { id: '1', position: { x: 50, y: 50 }, data: { label: 'Iniciar RPA', onEdit: onEditNode, onDelete: onDeleteNode }, type: 'rpaNode' },
    { id: '2', position: { x: 50, y: 150 }, data: { label: 'Abrir URL', onEdit: onEditNode, onDelete: onDeleteNode }, type: 'rpaNode' },
    { id: '3', position: { x: 50, y: 250 }, data: { label: 'Aguardar (Pausa)', onEdit: onEditNode, onDelete: onDeleteNode }, type: 'rpaNode' },
    { id: '4', position: { x: 50, y: 350 }, data: { label: 'Preencher: {{cnpj}}', onEdit: onEditNode, onDelete: onDeleteNode }, type: 'rpaNode' },
    { id: '5', position: { x: 50, y: 450 }, data: { label: 'Intervenção: Captcha', onEdit: onEditNode, onDelete: onDeleteNode }, type: 'rpaNode' },
    { id: '6', position: { x: 50, y: 550 }, data: { label: 'Baixar PDF', onEdit: onEditNode, onDelete: onDeleteNode }, type: 'rpaNode' },
  ];

  const initialEdges = [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3' },
    { id: 'e3-4', source: '3', target: '4' },
    { id: 'e4-5', source: '4', target: '5' },
    { id: 'e5-6', source: '5', target: '6' },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const addNode = (label: string) => {
    const maxY = nodes.reduce((max, node) => Math.max(max, node.position.y), 0);
    const newNode = {
      id: `node-${Date.now()}`,
      position: { x: 50, y: maxY + 100 },
      data: { label, onEdit: onEditNode, onDelete: onDeleteNode },
      type: 'rpaNode'
    };
    
    // Auto-connect to the last node
    const lastNode = nodes[nodes.length - 1];
    if (lastNode) {
      setEdges((eds) => addEdge({ source: lastNode.id, target: newNode.id }, eds));
    }
    
    setNodes((nds) => nds.concat(newNode));
  };

  return (
    <div className="h-full flex flex-col pt-0 bg-slate-950 relative">
      <div className="h-16 px-6 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between z-10 w-full absolute top-0 left-0 right-0">
        <div className="flex items-center space-x-4">
          <Link to="/scrapers" className="text-slate-500 hover:text-slate-300 transition">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="h-6 w-px bg-slate-800" />
          <h1 className="text-lg font-semibold text-white">{getScraperName}</h1>
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
          <button onClick={handleTestMacro} disabled={isRunning} className={`inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-indigo-700 transition ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}>
            {isRunning ? <RefreshCcw className="w-4 h-4 mr-2 animate-spin" /> : <Play className="w-4 h-4 mr-2" />}
            {isRunning ? 'Executando...' : 'Testar'}
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
            nodeTypes={nodeTypes}
            colorMode="dark"
            fitView
            className="bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px]"
          >
            <Controls className="bg-slate-900 border-slate-800 fill-slate-400" />
            <Background variant="dots" gap={12} size={1} color="#334155" />
            
            <Panel position="top-right" className="bg-slate-900 p-4 shadow-xl rounded-2xl border border-slate-800 w-64 m-4 max-h-[80vh] overflow-y-auto">
              <h3 className="text-sm font-semibold text-white border-b border-slate-800 pb-2 mb-3">Adicionar Ação (RPA)</h3>
              <div className="space-y-2">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 mt-4">Navegação Base</div>
                <button onClick={() => addNode('Abrir URL')} className="w-full text-left px-3 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-sm text-slate-300 transition flex items-center"><Globe className="w-4 h-4 mr-2 text-slate-400" /> Abrir URL</button>
                <button onClick={() => addNode('Clicar Elemento')} className="w-full text-left px-3 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-sm text-slate-300 transition flex items-center"><MousePointerClick className="w-4 h-4 mr-2 text-slate-400" /> Clicar Elemento</button>
                <button onClick={() => addNode('Inserir Texto')} className="w-full text-left px-3 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-sm text-slate-300 transition flex items-center"><FileCode2 className="w-4 h-4 mr-2 text-slate-400" /> Inserir Texto</button>
                <button onClick={() => addNode('Aguardar (Pausa)')} className="w-full text-left px-3 py-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 rounded-lg text-sm text-amber-400 transition flex items-center"><RefreshCcw className="w-4 h-4 mr-2 text-amber-400" /> Aguardar (Pausa)</button>
                
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 mt-4">Intervenção Humana</div>
                <button onClick={() => addNode('Resolver Captcha')} className="w-full text-left px-3 py-2 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-lg text-sm text-rose-400 transition flex items-center"><Play className="w-4 h-4 mr-2 text-rose-400" /> Resolver Captcha</button>

                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 mt-4">Arquivos e Captura</div>
                <button onClick={() => addNode('Baixar Documento')} className="w-full text-left px-3 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-lg text-sm text-emerald-400 transition flex items-center"><Download className="w-4 h-4 mr-2 text-emerald-400" /> Baixar Documento</button>
                <button onClick={() => addNode('Extrair Texto')} className="w-full text-left px-3 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-sm text-slate-300 transition flex items-center"><Copy className="w-4 h-4 mr-2 text-slate-400" /> Extrair Texto</button>

                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 mt-4">Banco de Dados (DB)</div>
                <button onClick={() => addNode('Preencher: {{empresa.cnpj}}')} className="block w-full text-left px-2 py-1.5 bg-slate-950 hover:bg-slate-800 transition border border-slate-800 rounded text-[11px] font-mono text-indigo-400 mt-1 mb-1">{`{{empresa.cnpj}}`}</button>
                <button onClick={() => addNode('Preencher: {{empresa.senha}}')} className="block w-full text-left px-2 py-1.5 bg-slate-950 hover:bg-slate-800 transition border border-slate-800 rounded text-[11px] font-mono text-indigo-400 mt-1 mb-1">{`{{empresa.senha}}`}</button>
              </div>
            </Panel>
          </ReactFlow>
        </div>

        {/* Embedded Browser (Recording Mode) */}
        {isRecording && (
          <div className="w-1/2 h-full bg-slate-950 flex flex-col items-center justify-center p-4">
             <div className="w-full h-full max-h-full bg-white rounded-xl shadow-2xl border-4 border-dashed border-rose-500/40 flex flex-col overflow-hidden relative">
               
               {/* Rec Overlay */}
               <div className="absolute top-16 right-4 z-50 flex items-start justify-end pointer-events-none pt-4">
                 <div className="bg-rose-500/10 text-rose-400 px-4 py-2 rounded-lg shadow-lg flex items-center border border-rose-500/20 pointer-events-auto backdrop-blur-md">
                    <MonitorPlay className="w-4 h-4 mr-2 animate-pulse" />
                    <span className="text-xs font-bold tracking-widest uppercase">Gravando Ações</span>
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
               <div className="flex-1 bg-slate-50 relative overflow-hidden flex flex-col items-center pt-28">
                  <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 w-96 relative">
                    <div className="h-8 w-32 bg-blue-900 rounded mb-6 mx-auto flex items-center justify-center text-white text-xs font-bold">RECEITA FEDERAL</div>
                    <div className="space-y-4">
                      <div onClick={() => addNode('Preencher: {{empresa.cnpj}}')} className="h-10 border border-slate-300 rounded cursor-pointer relative group flex justify-start items-center px-3 hover:bg-indigo-50">
                        <div className="absolute inset-0 border-2 border-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity rounded"></div>
                        <span className="text-sm text-slate-400">Inserir CNPJ...</span>
                      </div>
                      <div onClick={() => addNode('Preencher: {{empresa.senha}}')} className="h-10 border border-slate-300 rounded cursor-pointer relative group flex justify-start items-center px-3 hover:bg-indigo-50">
                        <div className="absolute inset-0 border-2 border-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity rounded"></div>
                        <span className="text-sm text-slate-400">Inserir Senha...</span>
                      </div>
                      <div onClick={() => addNode('Clicar Elemento: Acessar')} className="h-10 bg-blue-600 rounded cursor-pointer relative group flex justify-center items-center hover:bg-blue-700 transition">
                        <div className="absolute inset-0 border-2 border-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity rounded"></div>
                        <span className="text-sm text-white font-medium">Entrar (Certificado Digital)</span>
                      </div>
                      <div onClick={() => addNode('Intervenção: hCaptcha')} className="h-16 mt-4 border border-slate-300 rounded cursor-pointer relative group flex justify-between items-center px-4 hover:border-indigo-400 transition bg-slate-50">
                        <div className="flex items-center">
                          <div className="w-6 h-6 border-2 border-slate-300 rounded-sm mr-3 group-hover:border-indigo-400 transition"></div>
                          <span className="text-sm text-slate-600 font-medium">Sou humano</span>
                        </div>
                        <div className="flex flex-col items-center">
                           <ShieldCheck className="w-5 h-5 text-slate-400 group-hover:text-indigo-400 transition" />
                           <span className="text-[10px] text-slate-400 mt-1">hCaptcha</span>
                        </div>
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
