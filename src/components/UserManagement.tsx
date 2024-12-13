import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Trash2, Eye } from 'lucide-react';
import { fetchUsers, deleteUser, filterUsers, setCurrentPage } from '../store/slices/usersSlice';
import { RootState } from '../store';
import UserDetails from './UserDetails';

export default function UserManagement() {
  const dispatch = useDispatch();
  const { filteredUsers, loading, error, currentPage, totalPages } = useSelector(
    (state: RootState) => state.users
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchUsers() as any);
  }, [dispatch]);

  useEffect(() => {
    dispatch(filterUsers(searchTerm));
  }, [searchTerm, dispatch]);

  const handleDelete = (userId: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(userId));
    }
  };

  const getCurrentPageUsers = () => {
    const startIndex = (currentPage - 1) * 5;
    return filteredUsers.slice(startIndex, startIndex + 5);
  };

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-indigo-600"></div>
    </div>
  );
  
  if (error) return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md" role="alert">
      <p className="font-bold">Error</p>
      <p>{error}</p>
    </div>
  );

  return (
    <div className="space-y-8 p-8 bg-gradient-to-br from-gray-50 to-indigo-100 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <h2 className="text-4xl font-extrabold text-indigo-900 tracking-tight">User Management</h2>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
          />
        </div>
      </div>

      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-indigo-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider">
                  Region
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {getCurrentPageUsers().map((user) => (
                <tr key={user.id} className="hover:bg-indigo-50 transition-colors duration-150 ease-in-out">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.region}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setSelectedUser(user.id)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4 transition-colors duration-150 ease-in-out"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-600 hover:text-red-900 transition-colors duration-150 ease-in-out"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{(currentPage - 1) * 5 + 1}</span> to{' '}
          <span className="font-medium">{Math.min(currentPage * 5, filteredUsers.length)}</span> of{' '}
          <span className="font-medium">{filteredUsers.length}</span> results
        </p>
        <div className="flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => dispatch(setCurrentPage(page))}
              className={`px-4 py-2 rounded-md transition-colors duration-150 ease-in-out ${
                currentPage === page
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-indigo-600 hover:bg-indigo-100 border border-indigo-300'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>

      {selectedUser && (
        <UserDetails userId={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
}

