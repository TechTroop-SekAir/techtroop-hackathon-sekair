import React, { useState } from 'react';
import { userStore } from '../stores/userStore';

export function AuthForm() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      if (isRegister) {
        await userStore.register(email, password, fullName);
      } else {
        await userStore.login(email, password);
      }
      setEmail('');
      setPassword('');
      setFullName('');
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '30px', border: '1px solid #ddd', borderRadius: '8px', fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center' }}>{isRegister ? 'Sign Up to SekAir' : 'Sign In to SekAir'}</h2>
      
      {errorMsg && <div style={{ color: 'red', marginBottom: '15px', fontSize: '14px', textAlign: 'center' }}>❌ {errorMsg}</div>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {isRegister && (
          <input 
            type="text" 
            placeholder="Full Name" 
            value={fullName} 
            onChange={(e) => setFullName(e.target.value)} 
            required 
            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        )}
        
        <input 
          type="email" 
          placeholder="Email Address" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        
        <input 
          type="password" 
          placeholder="Password (min 6 chars)" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />

        <button 
          type="submit" 
          style={{ padding: '12px', backgroundColor: '#008CBA', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          {isRegister ? 'Register' : 'Login'}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px' }}>
        {isRegister ? 'Already have an account?' : "Don't have an account?"} {' '}
        <span 
          onClick={() => { setIsRegister(!isRegister); setErrorMsg(''); }} 
          style={{ color: '#008CBA', cursor: 'pointer', textDecoration: 'underline' }}
        >
          {isRegister ? 'Login here' : 'Register here'}
        </span>
      </p>
    </div>
  );
}
