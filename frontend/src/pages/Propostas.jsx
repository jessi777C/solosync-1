import { useState, useEffect } from 'react';
import API_BASE_URL from "../api_config";
import { IoAddCircleOutline, IoCreateOutline, IoPaperPlaneOutline, IoCloseOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';

function Propostas() {
  const [activeId, setActiveId] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', client: '', value: '' });

  useEffect(() => {
    fetch(`${API_BASE_URL}/proposals`)
      .then(res => res.json())
      .then(data => {
        setProposals(data);
        if (data.length > 0) setActiveId(data[0].id);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_BASE_URL}/proposals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const novaProposta = await res.json();
    setProposals([novaProposta, ...proposals]);
    setActiveId(novaProposta.id);
    setIsModalOpen(false);
    setFormData({ title: '', client: '', value: '' });
  };

  const activeProposal = proposals.find(p => p.id === activeId);

  return (
    <div className="dashboard-container" style={{ maxWidth: '1440px', padding: '32px 40px' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 className="page-title">Propostas e Orçamentos</h1>
          <p className="page-subtitle">Crie propostas irrecusáveis que se transformam em faturas automaticamente.</p>
        </div>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)} style={{ padding: '12px 24px', fontSize: '15px' }}>
          <IoAddCircleOutline size={20} style={{ marginRight: '8px' }} /> Nova Proposta
        </button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setIsModalOpen(false)}>
              <IoCloseOutline />
            </button>
            <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>Criar Nova Proposta</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Preencha os dados do projeto para gerar o documento.</p>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Título do Projeto</label>
                <input required type="text" className="form-input" placeholder="Ex: Criação de E-commerce" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Nome da Empresa / Cliente</label>
                <input required type="text" className="form-input" placeholder="Ex: Startup Alpha" value={formData.client} onChange={e => setFormData({...formData, client: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Valor (US$)</label>
                <input required type="number" className="form-input" placeholder="Ex: 1500" value={formData.value} onChange={e => setFormData({...formData, value: e.target.value})} />
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Gerar Proposta
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="proposals-layout">
        <div className="proposals-list">
          {loading ? (
            <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '20px' }}>Carregando...</div>
          ) : (
          proposals.map(prop => (
             <div 
               key={prop.id} 
               className={`proposal-card ${activeId === prop.id ? 'active' : ''}`}
               onClick={() => setActiveId(prop.id)}
             >
               <div className="proposal-card-header">
                 <h3 className="item-title">{prop.title}</h3>
                 <span className={`status-badge ${prop.statusClass || 'status-pending'}`}>
                   {prop.status}
                 </span>
               </div>
               <div className="proposal-client">{prop.client}</div>
               <div className="proposal-footer">
                 <span>US$ {prop.value}</span>
                 <span style={{ color: 'var(--text-secondary)', fontWeight: '400' }}>{prop.time || 'Agora'}</span>
               </div>
             </div>
          )))}
        </div>

        <div className="proposal-viewer">
          {!activeProposal ? (
            <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-secondary)' }}>Selecione uma proposta para visualizar</div>
          ) : (
            <>
              <div className="proposal-viewer-header">
                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '4px' }}>Proposta #PRP-{activeProposal.id.toString().padStart(4, '0')}</h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Criada em 28 Mar 2026 • Expira em 10 Abr 2026</p>
                </div>
                <div className="proposal-viewer-actions">
                  <button className="btn-secondary" onClick={() => alert('Modo de edição!')}>
                    <IoCreateOutline /> Editar
                  </button>
                  <button className="btn-primary" onClick={() => alert('Link copiado!')}>
                    <IoPaperPlaneOutline /> Enviar para Cliente
                  </button>
                </div>
              </div>

              <div className="proposal-document-container">
                <div className="proposal-document">
                  <div className="doc-header">
                    <div>
                      <div className="doc-logo" style={{ fontSize: '24px', fontWeight: '700', color: 'var(--accent-primary)' }}>SoloSync.</div>
                      <div style={{ color: 'var(--text-secondary)', marginTop: '16px', lineHeight: '1.6' }}>
                        mariacentro@solosync.app<br/>
                        São Paulo, SP - Brasil
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <h1 className="doc-title" style={{ fontSize: '28px' }}>Orçamento de Serviço</h1>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Para: {activeProposal.client}</p>
                    </div>
                  </div>

                  <div className="doc-section">
                    <h3 className="doc-section-title">O Desafio</h3>
                    <p style={{ color: 'var(--text-primary)', lineHeight: '1.7' }}>
                      Desenvolvimento e entrega do projeto <strong>"{activeProposal.title}"</strong> focado em excelência técnica e design premium para a empresa {activeProposal.client}.
                    </p>
                  </div>

                  <div className="doc-section">
                    <h3 className="doc-section-title">Valores Estimados</h3>
                    <div style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                          <span>Total por Desenvolvimento</span>
                          <span style={{ fontWeight: '600' }}>US$ {activeProposal.value.toLocaleString()}</span>
                       </div>
                       <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '14px' }}>
                          <span>Taxa de Impostos (Inc.)</span>
                          <span>US$ 0,00</span>
                       </div>
                       <div className="doc-total" style={{ marginTop: '20px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                         Investimento Total: <span style={{ color: 'var(--accent-primary)' }}>US$ {activeProposal.value.toLocaleString()}</span>
                       </div>
                    </div>
                  </div>

                  <div className="doc-section" style={{ marginTop: '60px', borderTop: '1px solid var(--border-color)', paddingTop: '32px' }}>
                    <h3 className="doc-section-title">Aprovação Digital</h3>
                    <div style={{ background: 'rgba(16,185,129,0.05)', border: '1px dashed var(--success)', padding: '24px', borderRadius: '12px', textAlign: 'center' }}>
                      <button className="btn-primary" style={{ margin: '0 auto', padding: '12px 32px', background: 'var(--success)' }}>
                        <IoCheckmarkCircleOutline style={{ marginRight: '8px' }} /> Aceitar e Assinar Agora
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Propostas;
