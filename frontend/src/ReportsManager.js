import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { fetchWithToken } from './api';

function ReportsManager() {
  const { token, user } = useContext(AuthContext);
  const [worksReport, setWorksReport] = useState([]);
  const [materialsReport, setMaterialsReport] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (['owner', 'manager'].includes(user.role)) {
      fetchWithToken('/reports/works', token)
        .then(data => setWorksReport(data));
      fetchWithToken('/reports/materials', token)
        .then(data => setMaterialsReport(data));
    }
  }, [token, user]);

  return (
    <div>
      <h2>Rapoarte</h2>
      {error && <p style={{color:'red'}}>{error}</p>}
      <h3>Lucrări</h3>
      <ul>
        {worksReport.map(w => (
          <li key={w.id}>{w.name} - {w.price} lei</li>
        ))}
      </ul>
      <h3>Consum materiale</h3>
      <ul>
        {materialsReport.map(m => (
          <li key={m.id}>Lucrare: {m.work_id}, Material: {m.material_id}, Cantitate: {m.quantity}</li>
        ))}
      </ul>
    </div>
  );
}

export default ReportsManager;
