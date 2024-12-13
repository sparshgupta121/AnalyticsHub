import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LogOut, Bell, Settings, Menu } from 'lucide-react';
import { logout } from '../store/slices/authSlice';
import { RootState } from '../store';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Header({ sidebarOpen, setSidebarOpen }: HeaderProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white lg:hidden">
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-2xl font-bold text-white tracking-tight ml-4 lg:ml-0">Dashboard</h1>
          </div>

          <div className="flex items-center space-x-4">
            <button className="text-indigo-200 hover:text-white transition duration-300 hidden sm:block">
              <Bell className="h-6 w-6" />
            </button>
            <button className="text-indigo-200 hover:text-white transition duration-300 hidden sm:block">
              <Settings className="h-6 w-6" />
            </button>

            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-600 font-bold shadow-md sm:flex">
                {user?.username ? user.username[0].toUpperCase() : "U"}
              </div>

              <div className="flex flex-col items-end">
                <span className="text-sm font-medium text-white">
                  {user?.username ? user.username.charAt(0).toUpperCase() + user.username.slice(1) : "Guest"}
                </span>
                <span className="text-xs text-indigo-200 hidden sm:inline-block">Administrator</span>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-white text-slate-600 hover:bg-indigo-100 font-medium rounded-lg shadow transition duration-300"
              >
                <LogOut className="h-5 w-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

