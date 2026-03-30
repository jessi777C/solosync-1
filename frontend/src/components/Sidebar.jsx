import { NavLink } from 'react-router-dom';
import { 
  IoGridOutline, IoDocumentTextOutline, IoBriefcaseOutline,
  IoReceiptOutline, IoCalendarOutline, IoPeopleOutline, IoSettingsOutline,
  IoLogOutOutline
} from 'react-icons/io5';

function Sidebar() {
  const getNavClass = ({ isActive }) => isActive ? 'nav-item active' : 'nav-item';

  return (
    <aside className="sidebar">
      <div className="logo-container">
        <img src="/logo.png" alt="Logo" style={{ width: '40px', height: '40px', mixBlendMode: 'screen', borderRadius: '8px' }} />
        <span className="logo-text">SoloSync</span>
      </div>
      
      <ul className="nav-menu">
        <NavLink to="/" className={getNavClass} style={{ textDecoration: 'none' }}>
          <IoGridOutline size={20} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/propostas" className={getNavClass} style={{ textDecoration: 'none' }}>
          <IoDocumentTextOutline size={20} />
          <span>Propostas</span>
        </NavLink>
        <NavLink to="/contratos" className={getNavClass} style={{ textDecoration: 'none' }}>
          <IoBriefcaseOutline size={20} />
          <span>Contratos</span>
        </NavLink>
        <NavLink to="/faturas" className={getNavClass} style={{ textDecoration: 'none' }}>
          <IoReceiptOutline size={20} />
          <span>Faturas</span>
        </NavLink>
        <NavLink to="/agenda" className={getNavClass} style={{ textDecoration: 'none' }}>
          <IoCalendarOutline size={20} />
          <span>Agenda</span>
        </NavLink>
        <NavLink to="/clientes" className={getNavClass} style={{ textDecoration: 'none' }}>
          <IoPeopleOutline size={20} />
          <span>Clientes</span>
        </NavLink>
        <NavLink to="/configuracoes" className={getNavClass} style={{ textDecoration: 'none', marginTop: 'auto' }}>
          <IoSettingsOutline size={20} />
          <span>Configurações</span>
        </NavLink>

        <button 
          onClick={() => {
            localStorage.removeItem('solosync_auth');
            window.location.href = '/login';
          }}
          className="nav-item logout-btn"
          style={{ 
            background: 'none', 
            border: 'none', 
            color: '#ff4d4d', 
            cursor: 'pointer',
            padding: '12px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            width: '100%',
            fontWeight: '500',
            marginTop: '10px'
          }}
        >
          <IoLogOutOutline size={20} />
          <span>Sair</span>
        </button>
      </ul>
    </aside>
  );
}

export default Sidebar;
