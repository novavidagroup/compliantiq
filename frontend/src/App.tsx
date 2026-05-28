import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import DashboardPage from './pages/DashboardPage'
import ComplaintsListPage from './pages/ComplaintsListPage'
import NewComplaintPage from './pages/NewComplaintPage'
import ComplaintDetailPage from './pages/ComplaintDetailPage'
import AgentTrackerPage from './pages/AgentTrackerPage'
import AgentDetailPage from './pages/AgentDetailPage'
import DNCListPage from './pages/DNCListPage'
import TemplatesPage from './pages/TemplatesPage'
import ReportsPage from './pages/ReportsPage'
import SettingsPage from './pages/SettingsPage'
import LoginPage from './pages/LoginPage'

export default function App() {
  return (
      <BrowserRouter>
            <Routes>
                    <Route path="/login" element={<LoginPage />} />
                            <Route path="/" element={<Layout />}>
                                      <Route index element={<DashboardPage />} />
                                                <Route path="complaints" element={<ComplaintsListPage />} />
                                                          <Route path="complaints/new" element={<NewComplaintPage />} />
                                                                    <Route path="complaints/:id" element={<ComplaintDetailPage />} />
                                                                              <Route path="agents" element={<AgentTrackerPage />} />
                                                                                        <Route path="agents/:id" element={<AgentDetailPage />} />
                                                                                                  <Route path="dnc" element={<DNCListPage />} />
                                                                                                            <Route path="templates" element={<TemplatesPage />} />
                                                                                                                      <Route path="reports" element={<ReportsPage />} />
                                                                                                                                <Route path="settings" element={<SettingsPage />} />
                                                                                                                                          <Route path="*" element={<Navigate to="/" replace />} />
                                                                                                                                                  </Route>
                                                                                                                                                        </Routes>
                                                                                                                                                            </BrowserRouter>
                                                                                                                                                              )
                                                                                                                                                              }
