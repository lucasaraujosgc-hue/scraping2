import { Routes, Route, BrowserRouter } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import Companies from './pages/Companies';
import Certificates from './pages/Certificates';
import Scrapers from './pages/Scrapers';
import VisualBuilder from './pages/VisualBuilder';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="empresas" element={<Companies />} />
          <Route path="certificados" element={<Certificates />} />
          <Route path="scrapers" element={<Scrapers />} />
          <Route path="scrapers/builder/:id" element={<VisualBuilder />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
