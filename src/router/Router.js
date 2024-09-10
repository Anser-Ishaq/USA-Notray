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
import UserManagement from '../pages/userManagement/index.js';
import NotarizationLogsTable from '../pages/notarizationLogs/index.js';
import MenuManagement from '../pages/menuManagement/menuManagement.jsx';
import ClientManegment from '../pages/clientManagment/index.js'
import DocLayout from '../pages/jobs/JobStatus/JobStatus.jsx';

const AppRouter = ( ) => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          <RedirectToDashboard>
            <LoginPage   />
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
          <Route path="job-view/:id" element={<DocLayout/>} />
          <Route path="create-job" element={<CreateJob />} />
          <Route path="notarize-a-document" element={<NotarizeDocument />} />
          <Route path="title-company" element={<TitleCompany />} />
          <Route path="notary-management" element={<NotaryManagement />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="services" element={<Services />} />
          <Route path="menu-management" element={<MenuManagement />} />
          <Route path="client-management" element={<ClientManegment/>} />
          <Route path="notarization-logs" element={<NotarizationLogsTable />} />
          <Route path="my-account" element={<MyAccount />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRouter
