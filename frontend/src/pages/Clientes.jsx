import { useState, useEffect } from 'react';
import API_BASE_URL from "../api_config";
import { IoPeopleOutline, IoMailOutline, IoCardOutline, IoCloseOutline } from 'react-icons/io5';

function Clientes() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '' });

  useEffect(() => {
    fetch(`${API_BASE_URL}/clients`)
      .then(res => res.json())
      .then(data => {
        setClients(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_BASE_URL}/clients`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const newClient = await res.json();
    setClients([...clients, newClient]);
    setIsModalOpen(false);
    setFormData({ name: '', email: '', company: '' });
  };

  return (
    <div className="dashboard-container" style={{ maxWidth: '1200px', padding: '32px 40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 className="page-title">Clientes</h1>
          <p className="page-subtitle">Seu CRM completo e gestão de portfólio.</p>
        </div>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          <IoPeopleOutline style={{ marginRight: '8px' }} /> Adicionar Cliente
        </button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setIsModalOpen(false)}>
              <IoCloseOutline size={24} />
            </button>
            <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>Novo Cliente</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Cadastre um novo contato na sua rede.</p>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Nome Completo</label>
                <input required type="text" className="form-input" placeholder="Ex: João Silva" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">E-mail</label>
                <input required type="email" className="form-input" placeholder="Ex: joao@empresa.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Empresa (Opcional)</label>
                <input type="text" className="form-input" placeholder="Ex: TechCorp" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} />
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Salvar Cliente
              </button>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <p style={{ color: 'var(--text-secondary)' }}>Carregando clientes...</p>
      ) : (
        <div className="client-grid">
          {clients.map(c => (
            <div key={c.id} className="client-card">
              <img src={c.avatar} alt="Avatar" className="client-avatar" />
              <h3 style={{ fontSize: '18px', fontWeight: '600' }}>{c.name}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px' }}>{c.company || 'Pessoa Física'}</p>
              
              <div className="client-stats">
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Faturamento</div>
                  <div style={{ fontWeight: '600', color: 'var(--success)' }}>US$ 0</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Ações</div>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                    <button className="btn-secondary" onClick={() => alert(`Enviando e-mail para ${c.email}`)} style={{ padding: '6px' }}><IoMailOutline /></button>
                    <button className="btn-secondary" style={{ padding: '6px' }}><IoCardOutline /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Clientes;
