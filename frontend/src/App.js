

import React, { useContext, useState } from 'react';
import { AuthProvider, AuthContext } from './AuthContext';
import Login from './Login';
import MainMenu from './MainMenu';
import SuperadminOrganizations from './SuperadminOrganizations';
import OwnerUsers from './OwnerUsers';
import MaterialsManager from './MaterialsManager';
import WorksManager from './WorksManager';
import AppointmentsManager from './AppointmentsManager';
import PatientsManager from './PatientsManager';
import ReportsManager from './ReportsManager';

function App() {
  const { user } = useContext(AuthContext);
  const [page, setPage] = useState(null);

  if (!user) return (
    <div>
      <h1>Cabinet Clinica Stomatologica</h1>
      <Login />
    </div>
  );

  let content = null;
  switch (page || user.role) {
    case 'organizations':
      content = <SuperadminOrganizations />; break;
    case 'users':
      content = <OwnerUsers />; break;
    case 'materials':
      content = <MaterialsManager />; break;
    case 'works':
      content = <WorksManager />; break;
    case 'appointments':
      content = <AppointmentsManager />; break;
    case 'patients':
      content = <PatientsManager />; break;
    case 'reports':
      content = <ReportsManager />; break;
    case 'superadmin':
      content = <SuperadminOrganizations />; break;
    case 'owner':
      content = <OwnerUsers />; break;
    case 'manager':
      content = <MaterialsManager />; break;
    case 'medic':
      content = <WorksManager />; break;
    case 'asistent':
      content = <AppointmentsManager />; break;
    default:
      content = <div>Dashboard</div>;
  }

  return (
    <div>
      <h1>Cabinet Clinica Stomatologica</h1>
      <MainMenu setPage={setPage} />
      {content}
    </div>
  );
}

export default function RootApp() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
