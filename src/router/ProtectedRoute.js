import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuth = localStorage.getItem('auth') === 'true';
  const token = localStorage.getItem('token');
  return isAuth && token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
  