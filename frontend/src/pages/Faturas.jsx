import { useState, useEffect } from 'react';
import API_BASE_URL from "../api_config";
import { IoReceiptOutline, IoCashOutline, IoLinkOutline, IoCloseOutline, IoCheckmarkDoneOutline } from 'react-icons/io5';

function Faturas() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ client: '', value: '' });
  const [showModal, setShowModal] = useState(false);
  const [lastLink, setLastLink] = useState('');

  useEffect(() => {
    fetch(`${API_BASE_URL}/invoices`)
      .then(res => res.json())
      .then(data => {
        setInvoices(data);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_BASE_URL}/invoices`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const newInvoice = await res.json();
    setInvoices([newInvoice, ...invoices]);
    setLastLink(`checkout/${newInvoice.id}`);
    setShowModal(true);
    setFormData({ client: '', value: '' });
  };

  const copyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/${lastLink}`);
    alert('Link copiado! Envie para o seu cliente pelo WhatsApp ou e-mail.');
  };

  return (
    <div className="dashboard-container" style={{ maxWidth: '1240px', padding: '32px 40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 className="page-title">Faturas e Invoicing</h1>
          <p className="page-subtitle">Crie cobranças instantâneas que aceitam Cartão, Pix e Apple Pay.</p>
        </div>
      </div>

      <div className="content-grid" style={{ gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
        <div className="card">
          <h2 className="card-title" style={{ marginBottom: '16px' }}>Gerar Checkout Rápido</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Nome do Cliente</label>
              <input type="text" className="form-input" placeholder="Ex: João Silva" value={formData.client} onChange={e => setFormData({...formData, client: e.target.value})} required />
            </div>
            <div className="form-group">
              <label className="form-label">Valor (US$)</label>
              <input type="number" className="form-input" placeholder="0.00" value={formData.value} onChange={e => setFormData({...formData, value: e.target.value})} required />
            </div>
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '12px' }}>
              <IoReceiptOutline style={{ marginRight: '8px' }} /> Criar Link de Pagamento
            </button>
          </form>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Histórico de Cobranças</h2>
          </div>
          <div className="list-container">
            {loading ? (
              <p style={{ color: 'var(--text-secondary)', padding: '20px' }}>Carregando faturas...</p>
            ) : (
              invoices.map(inv => (
                <div key={inv.id} className="list-item">
                  <div className="item-info">
                    <div className="item-icon" style={{ background: inv.status === 'Pago' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)', color: inv.status === 'Pago' ? 'var(--success)' : 'var(--warning)' }}>
                      <IoCashOutline />
                    </div>
                    <div>
                      <h3 className="item-title">Para: {inv.client}</h3>
                      <div className="item-meta">Vence em {inv.dueDate}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="item-title">US$ {inv.value}</div>
                    <span className={`status-badge ${inv.status === 'Pago' ? 'status-paid' : 'status-pending'}`}>
                      {inv.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: 'white' }}>
               <IoCheckmarkDoneOutline size={30} />
            </div>
            <h2 style={{ fontSize: '26px', marginBottom: '8px' }}>Link de Pagamento Criado!</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>A fatura já está disponível para o seu cliente.</p>
            
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
               <IoLinkOutline color="var(--accent-primary)" size={20} />
               <span style={{ fontSize: '14px', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {window.location.origin}/{lastLink}
               </span>
               <button onClick={copyLink} style={{ background: 'var(--accent-primary)', border: 'none', color: 'white', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}>Copiar</button>
            </div>

            <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setShowModal(false)}>
               Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Faturas;
