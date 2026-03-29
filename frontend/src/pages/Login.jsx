import { useState } from 'react';
import API_BASE_URL from "../api_config";
import { useNavigate } from 'react-router-dom';
import { IoRocketOutline, IoShieldCheckmarkOutline } from 'react-icons/io5';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem('solosync_auth', 'true');
      localStorage.setItem('user_name', email.split('@')[0]);
      onLogin(); 
      navigate('/');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <img src="/logo.png" alt="SoloSync" style={{ width: '60px', mixBlendMode: 'screen', marginBottom: '16px' }} />
          <h1 style={{ fontSize: '28px', fontWeight: '700' }}>Bem-vinda de volta</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Gerencie sua carreira solo hoje.</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">E-mail</label>
            <input 
              type="email" 
              className="form-input" 
              placeholder="ex: maria@solosync.app" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Senha</label>
            <input 
              type="password" 
              className="form-input" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '16px' }}>
            <IoRocketOutline style={{ marginRight: '8px' }} /> Entrar no SoloSync
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px', color: 'var(--text-secondary)' }}>
          Não tem uma conta? <span onClick={() => navigate('/signup')} style={{ color: 'var(--accent-primary)', cursor: 'pointer', fontWeight: '600' }}>Criar conta grátis</span>
        </div>
        
        <div style={{ marginTop: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: 0.5, fontSize: '12px' }}>
           <IoShieldCheckmarkOutline /> Dados protegidos por SoloSync
        </div>
      </div>
    </div>
  );
}

export default Login;
