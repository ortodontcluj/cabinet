import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { fetchWithToken } from './api';

function MaterialsManager() {
  const { token, user } = useContext(AuthContext);
  const [materials, setMaterials] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [stock, setStock] = useState(0);

  useEffect(() => {
    fetchWithToken('/materials', token)
      .then(data => setMaterials(data));
    fetchWithToken('/materials/categories', token)
      .then(data => setCategories(data));
  }, [token]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    const res = await fetchWithToken('/materials', token, {
      method: 'POST',
      body: JSON.stringify({ name, unit, category_id: categoryId, stock })
    });
    if (res.error) setError(res.error);
    else setMaterials([...materials, res]);
  };

  const handleStockUpdate = async (id, newStock) => {
    setError('');
    const res = await fetchWithToken(`/materials/${id}/stock`, token, {
      method: 'PUT',
      body: JSON.stringify({ stock: newStock })
    });
    if (res.error) setError(res.error);
    else setMaterials(materials.map(m => m.id === id ? { ...m, stock: newStock } : m));
  };

  return (
    <div>
      <h2>Materiale</h2>
      <form onSubmit={handleCreate}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Nume material" required />
        <input value={unit} onChange={e => setUnit(e.target.value)} placeholder="Unitate" required />
        <select value={categoryId} onChange={e => setCategoryId(e.target.value)} required>
          <option value="">Alege categorie</option>
          {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
        </select>
        <input type="number" value={stock} onChange={e => setStock(Number(e.target.value))} placeholder="Stoc" required />
        <button type="submit">Adaugă material</button>
      </form>
      {error && <p style={{color:'red'}}>{error}</p>}
      <ul>
        {materials.map(mat => (
          <li key={mat.id}>
            {mat.name} ({mat.unit}) - Stoc: {mat.stock}
            {user.role === 'owner' && (
              <input type="number" defaultValue={mat.stock} onBlur={e => handleStockUpdate(mat.id, Number(e.target.value))} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MaterialsManager;
