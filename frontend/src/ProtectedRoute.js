import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';

function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useContext(AuthContext);
  if (!user) return <div>Acces restricționat. Autentifică-te!</div>;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <div>Acces interzis pentru rolul tău.</div>;
  }
  return children;
}

export default ProtectedRoute;
