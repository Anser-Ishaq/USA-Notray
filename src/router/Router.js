import React from 'react'
import LoginPage from '../pages/auth/login/index.jsx'
import MyAccount from '../pages/myAccount';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from '../layout/dashboardLayout';
import ProtectedRoute from './ProtectedRoute.js';
import RedirectToDashboard from './RedirectToDashboard.js';
import NotarizeDocument from '../pages/notarizeDocument/index.js';
import CreateJob from '../pages/createJob/index.js';
import Jobs from '../pages/jobs/index.js';
import TitleCompany from '../pages/titleCompany/titleCompany.jsx';
import Services from '../pages/services/services.jsx';
import NotaryManagement from '../pages/notaryManagement/notaryManagement.jsx';

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
          <Route path="" element={<Jobs />} />
          <Route path="dashboard" element={<Jobs />} />
          <Route path="jobs-list" element={<Jobs />} />
          <Route path="create-job" element={<CreateJob />} />
          <Route path="notarize-a-document" element={<NotarizeDocument />} />
          <Route path="title-company" element={<TitleCompany />} />
          <Route path="notary-management" element={<NotaryManagement />} />
          <Route path="user-management" element={<div>User Management</div>} />
          <Route path="services" element={<Services />} />
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
