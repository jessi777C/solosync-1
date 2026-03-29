import { useState, useEffect } from 'react';
import API_BASE_URL from "../api_config";
import { 
  IoCashOutline, IoArrowUpOutline, IoAlertCircleOutline, 
  IoTimeOutline, IoTrendingUpOutline, IoCalendarNumberOutline,
  IoAddOutline, IoCheckmarkDoneOutline, IoDocumentTextOutline,
  IoEllipsisHorizontal, IoVideocamOutline
} from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    mrr: 0,
    clients: 0,
    activeProjects: 0,
    pendingProposals: 0
  });

  useEffect(() => {
    fetch(`${API_BASE_URL}/stats`)
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="dashboard-container" style={{ padding: '32px 40px' }}>
      <h1 className="page-title">Bem-vindo(a), Maria</h1>
      <p className="page-subtitle">Aqui está o resumo do seu negócio SoloSync hoje.</p>

      {/* Key Metrics */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <span>Faturamento Bruto</span>
            <div className="metric-icon"><IoCashOutline /></div>
          </div>
          <div className="metric-value">US$ {stats.mrr}</div>
          <div className="metric-trend trend-up">
            <IoArrowUpOutline />
            <span>Baseado em faturas</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span>Clientes Totais</span>
            <div className="metric-icon" style={{ background: 'rgba(245,158,11,0.1)', color: 'var(--warning)' }}>
              <IoAlertCircleOutline />
            </div>
          </div>
          <div className="metric-value">{stats.clients}</div>
          <div className="metric-trend">
            <span style={{ color: 'var(--text-secondary)' }}>Contatos ativos</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span>Contratos Ativos</span>
            <div className="metric-icon" style={{ background: 'rgba(16,185,129,0.1)', color: 'var(--success)' }}>
              <IoTrendingUpOutline />
            </div>
          </div>
          <div className="metric-value">{stats.activeProjects}</div>
          <div className="metric-trend trend-up">
            <IoArrowUpOutline />
            <span>Projetos em curso</span>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-header">
            <span>Propostas Pendentes</span>
            <div className="metric-icon" style={{ background: 'rgba(139,92,246,0.1)', color: 'var(--accent-secondary)' }}>
              <IoCalendarNumberOutline />
            </div>
          </div>
          <div className="metric-value">{stats.pendingProposals}</div>
          <div className="metric-trend">
            <span style={{ color: 'var(--text-secondary)' }}>Aguardando Aceite</span>
          </div>
        </div>
      </div>

      {/* Main Columns */}
      <div className="content-grid" style={{ gridTemplateColumns: '2fr 1.2fr', gap: '24px', marginTop: '32px' }}>
        <div className="left-col">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Atalhos Rápidos</h2>
              <button className="btn-primary" onClick={() => navigate('/faturas')}>
                <IoAddOutline style={{ marginRight: '8px' }} /> Nova Fatura
              </button>
            </div>
            
            <div className="list-container" style={{ padding: '20px' }}>
               <div style={{ padding: '40px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px dashed var(--border-color)' }}>
                  <img src="/logo.png" style={{ width: '40px', opacity: 0.3, marginBottom: '16px' }} />
                  <p style={{ color: 'var(--text-secondary)' }}>Bem-vinda ao SoloSync! Use o menu lateral para gerenciar seu negócio profissionalmente.</p>
               </div>
            </div>
          </div>
        </div>

        <div className="right-col">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Agenda Hoje</h2>
              <IoEllipsisHorizontal style={{ color: 'var(--text-secondary)', cursor: 'pointer' }} />
            </div>
            
            <div className="list-container">
              <div className="list-item" style={{ borderLeft: '4px solid var(--accent-primary)', paddingLeft: '12px', background: 'rgba(139,92,246,0.05)', borderRadius: '8px' }}>
                <div>
                  <h3 className="item-title">Alinhamento de Projeto</h3>
                  <div className="item-meta">14:00 - 15:00 • Com Cliente Prime</div>
                </div>
                <div className="item-icon" style={{ width: '32px', height: '32px', background: 'var(--accent-primary)', color: 'white', borderRadius: '50%', cursor: 'pointer' }}>
                  <IoVideocamOutline />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
