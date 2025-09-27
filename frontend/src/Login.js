import React, { useState, useContext } from 'react';
import { login as apiLogin } from './api';
import { AuthContext } from './AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await apiLogin(email, password);
    if (res.token) {
      login(res.user, res.token);
    } else {
      setError(res.error || 'Login failed');
    }
  };

  return (
    <div>
      <h2>Autentificare</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Parola" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{color:'red'}}>{error}</p>}
    </div>
  );
}

export default Login;
