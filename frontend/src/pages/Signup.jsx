import { useState } from 'react';
import API_BASE_URL from "../api_config";
import { useNavigate } from 'react-router-dom';
import { IoPersonOutline, IoMailOutline, IoLockClosedOutline, IoChevronBackOutline } from 'react-icons/io5';

function Signup({ onLogin }) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin(); 
      navigate('/');
    }, 1500);
  };

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      width: '100vw',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'radial-gradient(circle at 50% 10%, #1e1b4b 0%, #0c0c0e 80%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Background glowing spheres */}
      <div style={{ position: 'absolute', top: '20%', left: '-10%', width: '400px', height: '400px', background: 'rgba(56,189,248,0.2)', filter: 'blur(100px)', borderRadius: '50%' }}></div>
      <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '300px', height: '300px', background: 'rgba(139,92,246,0.3)', filter: 'blur(100px)', borderRadius: '50%' }}></div>

      {/* Main Signup Card - Glassmorphism */}
      <div style={{
        width: '100%',
        maxWidth: '420px',
        padding: '32px 40px',
        borderRadius: '24px',
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        position: 'relative',
        zIndex: 10
      }}>
        
        {/* Back Button */}
        <button 
          onClick={() => navigate('/login')}
          style={{
            position: 'absolute',
            top: '24px',
            left: '24px',
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
          onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
          onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
        >
          <IoChevronBackOutline size={20} />
        </button>

        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '700', letterSpacing: '2px', marginBottom: '8px', color: '#fff' }}>S I G N  U P</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '15px' }}>Create your account</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Input: Name */}
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', display: 'flex' }}>
              <IoPersonOutline size={20} />
            </div>
            <input 
              type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required
              style={{
                width: '100%', padding: '14px 20px 14px 48px', borderRadius: '30px',
                background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#fff', fontSize: '15px', outline: 'none', transition: 'all 0.3s'
              }}
              onFocus={e => { e.target.style.background = 'rgba(255,255,255,0.12)'; e.target.style.borderColor = 'rgba(255,255,255,0.3)'; }}
              onBlur={e => { e.target.style.background = 'rgba(255,255,255,0.08)'; e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }}
            />
          </div>

          {/* Input: Email */}
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', display: 'flex' }}>
              <IoMailOutline size={20} />
            </div>
            <input 
              type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required
              style={{
                width: '100%', padding: '14px 20px 14px 48px', borderRadius: '30px',
                background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#fff', fontSize: '15px', outline: 'none', transition: 'all 0.3s'
              }}
              onFocus={e => { e.target.style.background = 'rgba(255,255,255,0.12)'; e.target.style.borderColor = 'rgba(255,255,255,0.3)'; }}
              onBlur={e => { e.target.style.background = 'rgba(255,255,255,0.08)'; e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }}
            />
          </div>

          {/* Input: Password */}
          <div style={{ position: 'relative' }}>
             <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', display: 'flex' }}>
              <IoLockClosedOutline size={20} />
            </div>
            <input 
              type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required
              style={{
                width: '100%', padding: '14px 20px 14px 48px', borderRadius: '30px',
                background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#fff', fontSize: '15px', outline: 'none', transition: 'all 0.3s'
              }}
              onFocus={e => { e.target.style.background = 'rgba(255,255,255,0.12)'; e.target.style.borderColor = 'rgba(255,255,255,0.3)'; }}
              onBlur={e => { e.target.style.background = 'rgba(255,255,255,0.08)'; e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }}
            />
          </div>

          {/* Input: Confirm Password */}
          <div style={{ position: 'relative' }}>
             <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', display: 'flex' }}>
              <IoLockClosedOutline size={20} />
            </div>
            <input 
              type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required
              style={{
                width: '100%', padding: '14px 20px 14px 48px', borderRadius: '30px',
                background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#fff', fontSize: '15px', outline: 'none', transition: 'all 0.3s'
              }}
              onFocus={e => { e.target.style.background = 'rgba(255,255,255,0.12)'; e.target.style.borderColor = 'rgba(255,255,255,0.3)'; }}
              onBlur={e => { e.target.style.background = 'rgba(255,255,255,0.08)'; e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }}
            />
          </div>

          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', textAlign: 'center', margin: '8px 0', lineHeight: '1.5' }}>
            By registering, you are agreeing to our Terms of use and Privacy Policy
          </p>

          <button type="submit" style={{
            width: '100%', padding: '16px', borderRadius: '30px',
            background: 'linear-gradient(135deg, #4f46e5 0%, #8b5cf6 100%)',
            color: 'white', border: 'none', fontSize: '16px', fontWeight: '600',
            letterSpacing: '2px', cursor: 'pointer', boxShadow: '0 8px 20px rgba(139,92,246,0.3)',
            transition: 'transform 0.2s, box-shadow 0.2s', marginTop: '8px'
          }}
          onMouseOver={e => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={e => e.target.style.transform = 'translateY(0)'}
          >
            {loading ? 'PROCESSING...' : 'S I G N U P'}
          </button>
        </form>

        <p style={{ marginTop: '24px', fontSize: '14px', color: 'var(--text-secondary)', textAlign: 'center' }}>
          Already have an account? <span onClick={() => navigate('/login')} style={{ color: '#fff', textDecoration: 'none', fontWeight: '500', cursor: 'pointer' }}>Login</span>
        </p>
      </div>

    </div>
  );
}

export default Signup;
