import { useState, useEffect } from 'react';
import API_BASE_URL from "../api_config";
import { IoCalendarOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';

function Agenda() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const weekDays = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];

  useEffect(() => {
    fetch(`${API_BASE_URL}/appointments`)
      .then(res => res.json())
      .then(data => {
        setAppointments(data);
        setLoading(false);
      });
  }, []);

  const toggleSlot = async (id) => {
    const res = await fetch(`${API_BASE_URL}/appointments/toggle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    const updated = await res.json();
    setAppointments(appointments.map(a => a.id === id ? updated : a));
  };

  return (
    <div className="dashboard-container" style={{ maxWidth: '1200px', padding: '32px 40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 className="page-title">Sua Agenda SoloSync</h1>
          <p className="page-subtitle">Configure e compartilhe sua disponibilidade pública.</p>
        </div>
        <button className="btn-primary" onClick={() => alert('Link da agenda copiado: solosync.com/me/maria')}>
          <IoCalendarOutline style={{ marginRight: '8px' }} /> Copiar Link Público
        </button>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Grade de Horários - Esta Semana</h2>
          <span className="status-badge status-paid"><IoCheckmarkCircleOutline /> Google Calendar Sincronizado</span>
        </div>

        {loading ? (
          <p style={{ padding: '20px', color: 'var(--text-secondary)' }}>Carregando agenda...</p>
        ) : (
          <div className="calendar-grid">
            {weekDays.map((day, dIdx) => (
              <div key={day} className="calendar-day">
                <div className="calendar-date">{day}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '16px' }}>Dia {24 + dIdx} Mar</div>
                
                <div className="slots-container">
                  {appointments
                    .filter(a => a.day === day)
                    .map((slot) => (
                      <div 
                        key={slot.id} 
                        className={`calendar-slot ${slot.booked ? 'booked' : ''}`}
                        onClick={() => toggleSlot(slot.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        {slot.time}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Agenda;
