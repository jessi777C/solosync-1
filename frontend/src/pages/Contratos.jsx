import { useState, useEffect } from 'react';
import API_BASE_URL from "../api_config";
import { IoBriefcaseOutline, IoEyeOutline } from 'react-icons/io5';

function Contratos() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/contracts`)
      .then(res => res.json())
      .then(data => {
        setContracts(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="dashboard-container" style={{ maxWidth: '1200px', padding: '32px 40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 className="page-title">Contratos</h1>
          <p className="page-subtitle">Consulte arquivos com validade jurídica de seus projetos.</p>
        </div>
        <button className="btn-primary" onClick={() => alert('Geração de novo contrato automatizada em breve!')}>
          <IoBriefcaseOutline style={{ marginRight: '8px' }} /> Novo Contrato
        </button>
      </div>

      <div className="card">
        {loading ? (
          <p style={{ color: 'var(--text-secondary)', padding: '20px' }}>Carregando contratos...</p>
        ) : (
          <table className="doc-table" style={{ marginTop: 0 }}>
            <thead>
              <tr>
                <th>Cliente & Projeto</th>
                <th>Valor Total</th>
                <th>Assinado em</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map(c => (
                <tr key={c.id}>
                  <td>
                    <strong>{c.client}</strong><br/>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{c.project}</span>
                  </td>
                  <td>US$ {c.value}</td>
                  <td>{c.signedAt}</td>
                  <td>
                    <span className={`status-badge ${c.status === 'Ativo' ? 'status-paid' : c.status === 'Finalizado' ? 'status-draft' : 'status-pending'}`}>
                      {c.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button className="btn-secondary" onClick={() => alert('Visualizador de PDF em desenvolvimento')} style={{ padding: '6px 12px', fontSize: '13px', display: 'inline-flex' }}>
                      <IoEyeOutline style={{ marginRight: '6px' }} /> Ver Doc
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Contratos;
