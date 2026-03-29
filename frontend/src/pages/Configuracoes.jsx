import { useState } from 'react';
import API_BASE_URL from "../api_config";
import { IoPersonOutline, IoLogoBuffer, IoColorPaletteOutline, IoSaveOutline, IoCloudUploadOutline } from 'react-icons/io5';

function Configuracoes() {
  const [profilePic, setProfilePic] = useState('/perfil.png');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        alert('Foto de perfil atualizada com sucesso (apenas nesta sessão)!');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="dashboard-container" style={{ maxWidth: '1240px', padding: '32px 40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 className="page-title">Configurações e Conta</h1>
          <p className="page-subtitle">Sua identidade na internet e customização da taxa/assinatura.</p>
        </div>
        <button className="btn-primary" onClick={() => alert('Configurações salvas no servidor!')}>
          <IoSaveOutline style={{ marginRight: '8px' }} /> Salvar Alterações
        </button>
      </div>

      <div className="content-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Perfil Público</h2>
            <IoPersonOutline />
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px', padding: '16px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)' }}>
             <img src={profilePic} alt="Perfil" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--accent-primary)' }} />
             <div>
                <label htmlFor="upload-photo" className="btn-secondary" style={{ cursor: 'pointer', display: 'flex', gap: '8px', alignItems: 'center' }}>
                   <IoCloudUploadOutline /> Trocar Foto
                </label>
                <input type="file" id="upload-photo" hidden onChange={handleFileChange} accept="image/*" />
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '8px' }}>JPG, PNG ou GIF. Máximo de 2MB.</p>
             </div>
          </div>

          <form onSubmit={e => e.preventDefault()}>
            <div className="form-group">
              <label className="form-label">Nome de Exibição</label>
              <input type="text" className="form-input" defaultValue="Maria SoloSync" />
            </div>
            <div className="form-group">
              <label className="form-label">Email de Contato</label>
              <input type="email" className="form-input" defaultValue="maria@solosync.com" />
            </div>
            <div className="form-group">
              <label className="form-label">Link (URL Exclusiva)</label>
              <input type="text" className="form-input" defaultValue="solosync.app/maria" />
            </div>
            <div className="form-group">
              <label className="form-label">Bio (Descrição Curta)</label>
              <input type="text" className="form-input" defaultValue="Designer UX especializada em fintech e SaaS." />
            </div>
          </form>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Aparência do Link in Bio</h2>
            <IoColorPaletteOutline />
          </div>
          <form onSubmit={e => e.preventDefault()}>
            <div className="form-group">
              <label className="form-label">Cor Primária (HexCode)</label>
              <div style={{ display: 'flex', gap: '12px' }}>
                <input type="color" defaultValue="#8b5cf6" style={{ width: '40px', height: '40px', borderRadius: '8px', padding: 0, border: '1px solid var(--border-color)', outline: 'none' }} />
                <input type="text" className="form-input" defaultValue="#8b5cf6" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Cor Secundária (Fundo)</label>
              <div style={{ display: 'flex', gap: '12px' }}>
                <input type="color" defaultValue="#0c0c0e" style={{ width: '40px', height: '40px', borderRadius: '8px', padding: 0, border: '1px solid var(--border-color)', outline: 'none' }} />
                <input type="text" className="form-input" defaultValue="#0c0c0e" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" style={{ marginBottom: '12px' }}>Logotipo Personalizado</label>
              <div style={{ padding: '24px', border: '1px dashed var(--border-color)', borderRadius: '12px', textAlign: 'center' }}>
                 <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '12px' }}>Arraste seu logo aqui ou clique para buscar</p>
                 <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                   Selecionar Arquivo
                 </button>
              </div>
            </div>
          </form>
        </div>

        <div className="card" style={{ gridColumn: '1 / -1' }}>
          <div className="card-header">
            <h2 className="card-title">Integrações de Pagamento</h2>
            <IoLogoBuffer />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px', border: '1px solid var(--border-color)', borderRadius: '16px', background: 'rgba(99,91,255,0.05)' }}>
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: '600' }}>Stripe Connect</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px', maxWidth: '500px', marginTop: '4px' }}>Conecte sua conta bancária para receber pagamentos de faturas via Cartão, Pix ou Boleto com as menores taxas do mercado.</p>
            </div>
            <button className="btn-primary" style={{ background: '#635BFF', color: 'white', border: 'none', padding: '12px 24px' }}>
              Conectar Stripe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Configuracoes;
