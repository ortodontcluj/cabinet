import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { fetchWithToken } from './api';

function AppointmentsManager() {
  const { token, user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');
  const [patientId, setPatientId] = useState('');
  const [scheduledAt, setScheduledAt] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (user.role === 'medic') {
      fetchWithToken('/appointments/me', token)
        .then(data => setAppointments(data));
    } else {
      fetchWithToken('/appointments/organization', token)
        .then(data => setAppointments(data));
    }
  }, [token, user]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    const res = await fetchWithToken('/appointments', token, {
      method: 'POST',
      body: JSON.stringify({ patient_id: patientId, user_id: user.id, scheduled_at: scheduledAt, notes })
    });
    if (res.error) setError(res.error);
    else setAppointments([...appointments, res]);
  };

  return (
    <div>
      <h2>Programări</h2>
      <form onSubmit={handleCreate}>
        <input value={patientId} onChange={e => setPatientId(e.target.value)} placeholder="ID pacient" required />
        <input type="datetime-local" value={scheduledAt} onChange={e => setScheduledAt(e.target.value)} required />
        <input value={notes} onChange={e => setNotes(e.target.value)} placeholder="Notițe" />
        <button type="submit">Adaugă programare</button>
      </form>
      {error && <p style={{color:'red'}}>{error}</p>}
      <ul>
        {appointments.map(app => (
          <li key={app.id}>
            Pacient: {app.patient_id}, Medic: {app.user_id}, Data: {app.scheduled_at}, Notițe: {app.notes}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AppointmentsManager;
