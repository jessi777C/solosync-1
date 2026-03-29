import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Propostas from './pages/Propostas';
import Contratos from './pages/Contratos';
import Faturas from './pages/Faturas';
import Agenda from './pages/Agenda';
import Clientes from './pages/Clientes';
import Configuracoes from './pages/Configuracoes';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Checkout from './pages/Checkout';
import './index.css';

function App() {
  // Bypass de login para desenvolvimento: volta para a tela de inicio automaticamente
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    // Escuta mudanças de auth
    const checkAuth = () => {
      setIsAuthenticated(!!localStorage.getItem('solosync_auth'));
    };
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/checkout/:id" element={<Checkout />} />

        {!isAuthenticated ? (
          <>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <Route path="*" element={
            <div className="app-layout">
              <Sidebar />
              <main className="main-content">
                <Header />
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/propostas" element={<Propostas />} />
                  <Route path="/contratos" element={<Contratos />} />
                  <Route path="/faturas" element={<Faturas />} />
                  <Route path="/agenda" element={<Agenda />} />
                  <Route path="/clientes" element={<Clientes />} />
                  <Route path="/configuracoes" element={<Configuracoes />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
            </div>
          } />
        )}
      </Routes>
    </Router>
  );
}

export default App;
