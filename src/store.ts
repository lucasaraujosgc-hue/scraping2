import { create } from 'zustand';

export interface Scraper {
  id: string;
  name: string;
  type: 'Macro Individual' | 'Grupo';
  status: 'Ativo' | 'Pausado';
  lastRun: string;
}

interface AppState {
  scrapers: Scraper[];
  addScraper: (scraper: Omit<Scraper, 'id' | 'lastRun' | 'status'>) => string;
  updateScraper: (id: string, name: string) => void;
  deleteScraper: (id: string) => void;
  toggleScraperStatus: (id: string) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  scrapers: [],
  addScraper: (scraper) => {
    const id = Math.random().toString(36).substring(2, 9);
    set((state) => ({
      scrapers: [...state.scrapers, {
        ...scraper,
        id,
        status: 'Ativo',
        lastRun: 'Nunca executado'
      }]
    }));
    return id;
  },
  updateScraper: (id, name) => set((state) => ({
    scrapers: state.scrapers.map(s => s.id === id ? { ...s, name } : s)
  })),
  deleteScraper: (id) => set((state) => ({
    scrapers: state.scrapers.filter(s => s.id !== id)
  })),
  toggleScraperStatus: (id) => set((state) => ({
    scrapers: state.scrapers.map(s => s.id === id ? { ...s, status: s.status === 'Ativo' ? 'Pausado' : 'Ativo'} : s)
  }))
}));
