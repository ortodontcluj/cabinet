import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';

function MainMenu({ setPage }) {
  const { user, logout } = useContext(AuthContext);
  if (!user) return null;

  const menuByRole = {
    superadmin: [
      { label: 'Organizații', page: 'organizations' }
    ],
    owner: [
      { label: 'Utilizatori', page: 'users' },
      { label: 'Materiale', page: 'materials' },
      { label: 'Lucrări', page: 'works' },
      { label: 'Programări', page: 'appointments' },
      { label: 'Pacienți', page: 'patients' },
      { label: 'Rapoarte', page: 'reports' }
    ],
    manager: [
      { label: 'Materiale', page: 'materials' },
      { label: 'Programări', page: 'appointments' },
      { label: 'Rapoarte', page: 'reports' }
    ],
    medic: [
      { label: 'Lucrări', page: 'works' },
      { label: 'Programări', page: 'appointments' },
      { label: 'Pacienți', page: 'patients' }
    ],
    asistent: [
      { label: 'Programări', page: 'appointments' },
      { label: 'Pacienți', page: 'patients' }
    ]
  };

  return (
    <nav>
      <ul>
        {menuByRole[user.role]?.map(item => (
          <li key={item.page}>
            <button onClick={() => setPage(item.page)}>{item.label}</button>
          </li>
        ))}
        <li><button onClick={logout}>Logout</button></li>
      </ul>
    </nav>
  );
}

export default MainMenu;
