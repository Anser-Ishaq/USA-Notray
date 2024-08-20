import React from 'react';
import { Navigate } from 'react-router-dom';

const RedirectToDashboard = ({ children }) => {
  const isAuth = localStorage.getItem('auth') === 'true';

  return isAuth ? <Navigate to="/dashboard" /> : children;
};

export default RedirectToDashboard;