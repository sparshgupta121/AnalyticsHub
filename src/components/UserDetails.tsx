import { useSelector } from 'react-redux';
import { X, Mail, Activity, MapPin, Calendar } from 'lucide-react';
import { RootState } from '../store';

interface UserDetailsProps {
  userId: number;
  onClose: () => void;
}

export default function UserDetails({ userId, onClose }: UserDetailsProps) {
  const user = useSelector((state: RootState) =>
    state.users.users.find((u) => u.id === userId)
  );

  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold">User Details</h3>
            <button 
              onClick={onClose} 
              className="text-white hover:text-gray-200 transition-colors duration-150 ease-in-out"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <p className="mt-2 text-indigo-100">{user.name}</p>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="mt-1 text-sm text-gray-900">{user.email}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Activity className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-500">Status</p>
              <p className="mt-1 text-sm">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {user.status}
                </span>
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <MapPin className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-500">Region</p>
              <p className="mt-1 text-sm text-gray-900">{user.region}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Calendar className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-500">Registration Date</p>
              <p className="mt-1 text-sm text-gray-900">
                {new Date(user.registrationDate).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 px-6 py-4">
          <button
            onClick={onClose}
            className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150 ease-in-out"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

