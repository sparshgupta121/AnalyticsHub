import { useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { store } from './store';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import UserManagement from './components/UserManagement';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import PrivateRoute from './components/PrivateRoute';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="flex h-screen bg-gray-100">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                      <div className="container mx-auto px-6 py-8">
                        <Dashboard />
                      </div>
                    </main>
                  </div>
                </PrivateRoute>
              }
            >
              <Route path="users" element={<UserManagement />} />
              <Route path="analytics" element={<AnalyticsDashboard />} />
              <Route index element={<Navigate to="users" replace />} />
            </Route>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

