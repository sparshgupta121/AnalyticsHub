import { NavLink } from 'react-router-dom';
import { Users, BarChart2, Layout, X } from 'lucide-react';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  return (
    <div className={`lg:flex ${sidebarOpen ? 'flex' : 'hidden'}`}>
      <div className="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
      <div className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'}`}>
        <div className="flex items-center justify-between flex-shrink-0 p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-500 p-2 rounded-lg">
              <Layout className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Analytics Hub</h1>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-md lg:hidden">
            <X className="h-6 w-6 text-white" />
          </button>
        </div>
        
        <nav className="mt-10 px-6 space-y-4">
          <NavLink
            to="/dashboard/users"
            className={({ isActive }) =>
              `flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ease-in-out ${
                isActive 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-gray-300 hover:bg-gray-700/50 hover:text-white hover:translate-x-1'
              }`
            }
          >
            <Users className="h-5 w-5 flex-shrink-0" />
            <span className="font-medium">User Management</span>
          </NavLink>
          
          <NavLink
            to="/dashboard/analytics"
            className={({ isActive }) =>
              `flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ease-in-out ${
                isActive 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-gray-300 hover:bg-gray-700/50 hover:text-white hover:translate-x-1'
              }`
            }
          >
            <BarChart2 className="h-5 w-5 flex-shrink-0" />
            <span className="font-medium">Analytics</span>
          </NavLink>
        </nav>
      </div>
    </div>
  );
}

