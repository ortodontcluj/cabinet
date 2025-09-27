import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { fetchWithToken } from './api';

function OwnerUsers() {
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchWithToken('/users', token)
      .then(data => setUsers(data));
  }, [token]);

  // Exemplu: modificare rol utilizator
  const handleRoleChange = async (id, newRole) => {
    setError('');
    const res = await fetchWithToken(`/users/${id}`, token, {
      method: 'PUT',
      body: JSON.stringify({ role: newRole })
    });
    if (res.error) setError(res.error);
    else setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u));
  };

  // Exemplu: ștergere utilizator
  const handleDelete = async (id) => {
    setError('');
    const res = await fetchWithToken(`/users/${id}`, token, {
      method: 'DELETE'
    });
    if (res.error) setError(res.error);
    else setUsers(users.filter(u => u.id !== id));
  };

  return (
    <div>
      <h2>Utilizatori organizație</h2>
      {error && <p style={{color:'red'}}>{error}</p>}
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.email} ({user.role})
            <button onClick={() => handleRoleChange(user.id, 'manager')}>Setează Manager</button>
            <button onClick={() => handleRoleChange(user.id, 'medic')}>Setează Medic</button>
            <button onClick={() => handleRoleChange(user.id, 'asistent')}>Setează Asistent</button>
            <button onClick={() => handleDelete(user.id)}>Șterge</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OwnerUsers;
