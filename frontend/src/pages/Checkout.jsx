import { useState, useEffect } from 'react';
import API_BASE_URL from "../api_config";
import { useParams } from 'react-router-dom';
import { IoShieldCheckmarkOutline, IoCardOutline, IoPhonePortraitOutline, IoBagAddOutline } from 'react-icons/io5';

function Checkout() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulando busca de fatura real do banco para o cliente
    fetch(`${API_BASE_URL}/invoices`)
      .then(res => res.json())
      .then(data => {
        const inv = data.find(i => i.id === parseInt(id)) || data[0];
        setInvoice(inv);
        setLoading(false);
      });
  }, [id]);

  if (loading) return null;

  return (
    <div className="login-container" style={{ minHeight: '100vh', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at top right, rgba(139,92,246,0.1), transparent 400px), radial-gradient(circle at bottom left, rgba(6,182,212,0.1), transparent 400px), #0c0c0e' }}>
      
      <div style={{ marginBottom: '40px', textAlign: 'center' }}>
         <img src="/logo.png" alt="SoloSync" style={{ width: '60px', mixBlendMode: 'screen', marginBottom: '8px' }} />
         <h1 style={{ fontSize: '20px', fontWeight: '500', color: 'var(--text-secondary)' }}>Fatura SoloSync de {invoice.client}</h1>
      </div>

      <div style={{ width: '100%', maxWidth: '480px', background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(20px)', borderRadius: '24px', border: '1px solid var(--border-color)', padding: '40px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
         <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>Total a Pagar</span>
            <div style={{ fontSize: '48px', fontWeight: '700', color: 'white', marginTop: '8px' }}>US$ {invoice.value}</div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '12px' }}>Vence em {invoice.dueDate}</p>
         </div>

         <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '0.05em' }}>Método de Pagamento</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
               <button className="btn-secondary" style={{ padding: '16px', justifyContent: 'flex-start', background: 'white', color: 'black', border: 'none', borderRadius: '12px' }}>
                  <IoCardOutline size={20} style={{ marginRight: '12px' }} /> Pagar com Cartão
               </button>
               <button className="btn-secondary" style={{ padding: '16px', justifyContent: 'flex-start', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
                  <IoPhonePortraitOutline size={20} style={{ marginRight: '12px' }} /> Pagar com Apple Pay
               </button>
               <button className="btn-secondary" style={{ padding: '16px', justifyContent: 'flex-start', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
                  <IoBagAddOutline size={20} style={{ marginRight: '12px' }} /> Pagar via PIX (Brasil)
               </button>
            </div>
         </div>

         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'rgba(16,185,129,0.8)', fontSize: '13px' }}>
            <IoShieldCheckmarkOutline /> Pagamento 100% Seguro por SoloSync & Stripe
         </div>
      </div>

      <p style={{ color: 'var(--text-secondary)', fontSize: '12px', marginTop: '40px' }}>© 2026 SoloSync Technologies. Todos os direitos reservados.</p>
    </div>
  );
}

export default Checkout;
