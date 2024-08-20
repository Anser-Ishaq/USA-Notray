import React from 'react'
import LoginPage from '../pages/login'
import MyAccount from '../pages/myAccount';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from '../layout/dashboardLayout';
import ProtectedRoute from './ProtectedRoute.js';
import RedirectToDashboard from './RedirectToDashboard.js';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          <RedirectToDashboard>
            <LoginPage />
          </RedirectToDashboard>} 
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="" element={<div>Dashboard</div>} />
          <Route path="dashboard" element={<div>Dashboard</div>} />
          <Route path="job-management" element={<div>Job Management</div>} />
          <Route path="title-company" element={<div>Title Company</div>} />
          <Route path="notary-management" element={<div>Notary Management</div>} />
          <Route path="user-management" element={<div>User Management</div>} />
          <Route path="services" element={<div>Services</div>} />
          <Route path="client-management" element={<div>Client Management</div>} />
          <Route path="menu-management" element={<div>Menu Management</div>} />
          <Route path="notarization-logs" element={<div>Notarization Logs</div>} />
          <Route path="my-account" element={<MyAccount />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRouter
