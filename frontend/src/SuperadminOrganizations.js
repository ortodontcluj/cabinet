import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { fetchWithToken } from './api';

function SuperadminOrganizations() {
  const { token } = useContext(AuthContext);
  const [organizations, setOrganizations] = useState([]);
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchWithToken('/organizations', token)
      .then(data => setOrganizations(data));
  }, [token]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    const res = await fetchWithToken('/organizations', token, {
      method: 'POST',
      body: JSON.stringify({ name })
    });
    if (res.error) setError(res.error);
    else setOrganizations([...organizations, res]);
  };

  return (
    <div>
      <h2>Organizații</h2>
      <form onSubmit={handleCreate}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Nume organizație" required />
        <button type="submit">Creează</button>
      </form>
      {error && <p style={{color:'red'}}>{error}</p>}
      <ul>
        {organizations.map(org => <li key={org.id}>{org.name}</li>)}
      </ul>
    </div>
  );
}

export default SuperadminOrganizations;
