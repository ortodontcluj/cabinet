import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { fetchWithToken } from './api';

function WorksManager() {
  const { token, user } = useContext(AuthContext);
  const [works, setWorks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [categoryId, setCategoryId] = useState('');

  useEffect(() => {
    fetchWithToken('/works', token)
      .then(data => setWorks(data));
    fetchWithToken('/works/categories', token)
      .then(data => setCategories(data));
  }, [token]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    const res = await fetchWithToken('/works', token, {
      method: 'POST',
      body: JSON.stringify({ name, price, category_id: categoryId })
    });
    if (res.error) setError(res.error);
    else setWorks([...works, res]);
  };

  return (
    <div>
      <h2>Lucrări</h2>
      <form onSubmit={handleCreate}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Nume lucrare" required />
        <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} placeholder="Preț" required />
        <select value={categoryId} onChange={e => setCategoryId(e.target.value)} required>
          <option value="">Alege categorie</option>
          {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
        </select>
        <button type="submit">Adaugă lucrare</button>
      </form>
      {error && <p style={{color:'red'}}>{error}</p>}
      <ul>
        {works.map(work => (
          <li key={work.id}>
            {work.name} - {work.price} lei
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WorksManager;
