import { IoSearchOutline, IoNotificationsOutline, IoLogOutOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const userName = localStorage.getItem('user_name') || 'Maria';

  const handleLogout = () => {
    localStorage.removeItem('solosync_auth');
    localStorage.removeItem('user_name');
    window.location.reload(); // Quick reset
  };

  return (
    <header className="header" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="header-search">
        <IoSearchOutline size={20} />
        <input type="text" placeholder="Buscar no SoloSync..." />
      </div>
      
      <div className="user-profile">
        <div style={{ position: 'relative' }}>
          <IoNotificationsOutline size={24} style={{ color: 'var(--text-secondary)', marginRight: '24px', cursor: 'pointer' }} />
          <span style={{ position: 'absolute', top: '0', right: '24px', width: '8px', height: '8px', background: 'var(--accent-primary)', borderRadius: '50%', border: '2px solid var(--surface-secondary)' }}></span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '14px', fontWeight: '600' }}>{userName}</span>
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)', cursor: 'pointer' }} onClick={handleLogout}>Sair do Hub <IoLogOutOutline style={{ verticalAlign: 'middle' }} /></span>
          </div>
          <img src="/perfil.png" alt="Perfil" className="avatar" style={{ border: '2px solid rgba(139,92,246,0.3)', width: '36px', height: '36px' }} />
        </div>
      </div>
    </header>
  );
}

export default Header;
