import { IoBriefcaseOutline, IoReceiptOutline, IoCalendarOutline, IoPeopleOutline, IoSettingsOutline } from 'react-icons/io5';
import API_BASE_URL from "../api_config";

const iconsMap = {
  IoBriefcaseOutline,
  IoReceiptOutline,
  IoCalendarOutline,
  IoPeopleOutline,
  IoSettingsOutline
};

function BasicPage({ title, subtitle, icon, emptyTitle, emptyMsg, btnText }) {
  const IconComponent = iconsMap[icon];

  return (
    <div className="dashboard-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 className="page-title">{title}</h1>
          <p className="page-subtitle">{subtitle}</p>
        </div>
        {btnText && <button className="btn-primary">{btnText}</button>}
      </div>
      <div className="card" style={{ textAlign: 'center', padding: '100px 40px' }}>
        {IconComponent && <IconComponent size={64} style={{ color: 'var(--text-secondary)' }} />}
        <h2 style={{ margin: '16px 0' }}>{emptyTitle}</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>{emptyMsg}</p>
      </div>
    </div>
  );
}

export default BasicPage;
