import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { fetchWithToken } from './api';

function PatientsManager() {
  const { token, user } = useContext(AuthContext);
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    fetchWithToken('/patients', token)
      .then(data => setPatients(data));
  }, [token]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    const res = await fetchWithToken('/patients', token, {
      method: 'POST',
      body: JSON.stringify({ name, email, phone })
    });
    if (res.error) setError(res.error);
    else setPatients([...patients, res]);
  };

  return (
    <div>
      <h2>Pacienți</h2>
      <form onSubmit={handleCreate}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Nume pacient" required />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Telefon" />
        <button type="submit">Adaugă pacient</button>
      </form>
      {error && <p style={{color:'red'}}>{error}</p>}
      <ul>
        {patients.map(p => (
          <li key={p.id}>
            {p.name} {p.email && `(${p.email})`} {p.phone && `- ${p.phone}`}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PatientsManager;
