import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  Building2, 
  LayoutDashboard, 
  ShieldCheck, 
  Bot, 
  CalendarClock, 
  Files,
  Settings
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Empresas', href: '/empresas', icon: Building2 },
  { name: 'Certificados', href: '/certificados', icon: ShieldCheck },
  { name: 'Automações (RPA)', href: '/scrapers', icon: Bot },
  { name: 'Agendamentos', href: '/agendamentos', icon: CalendarClock },
  { name: 'Arquivos', href: '/arquivos', icon: Files },
];

export default function AppLayout() {
  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <ShieldCheck className="w-6 h-6 text-indigo-500 mr-2" />
          <span className="text-lg font-semibold tracking-tight text-white">AutoFiscal</span>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                  isActive
                    ? 'bg-slate-800 text-indigo-400'
                    : 'text-slate-500 hover:bg-slate-800/50 hover:text-slate-300'
                )
              }
            >
              <item.icon className="mr-3 flex-shrink-0 h-5 w-5" aria-hidden="true" />
              {item.name}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button className="flex items-center w-full px-3 py-2 text-sm font-medium text-slate-500 rounded-md hover:bg-slate-800/50 hover:text-slate-300 transition-colors">
            <Settings className="mr-3 h-5 w-5" />
            Configurações
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto bg-slate-950">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
