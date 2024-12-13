import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Users, UserCheck, UserMinus, Calendar } from 'lucide-react';
import { fetchAnalytics, setDateRange, setSelectedRegion } from '../store/slices/analyticsSlice';
import { RootState } from '../store';

const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444'];

export default function AnalyticsDashboard() {
  const dispatch = useDispatch();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const {
    totalUsers,
    activeUsers,
    deletedUsers,
    registrationTrend,
    usersByStatus,
    usersByRegion,
    loading,
    error,
    dateRange,
    selectedRegion,
  } = useSelector((state: RootState) => state.analytics);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchAnalytics({
        startDate: dateRange.start,
        endDate: dateRange.end,
        region: selectedRegion,
      }) as any);
      setIsInitialLoad(false);
    };

    fetchData();
  }, [dispatch, dateRange, selectedRegion]);

  const handleDateRangeChange = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    
    if (startDate > endDate) {
      alert('Start date cannot be after end date');
      return;
    }

    dispatch(setDateRange({
      start: startDate.toISOString(),
      end: endDate.toISOString(),
    }));
  };

  const handleRegionChange = (region: string) => {
    dispatch(setSelectedRegion(region === '' ? null : region));
  };

  const processRegionData = () => {
    if (!selectedRegion) {
      return [...usersByRegion]
        .sort((a, b) => b.count - a.count)
        .slice(0, 10)
        .map(item => ({
          ...item,
          count: item.count,
          average: usersByRegion.reduce((acc, curr) => acc + curr.count, 0) / usersByRegion.length
        }));
    }
    return usersByRegion
      .filter(item => item.region === selectedRegion)
      .map(item => ({
        ...item,
        count: item.count,
        average: usersByRegion.reduce((acc, curr) => acc + curr.count, 0) / usersByRegion.length
      }));
  };

  const processedRegionData = processRegionData();

  // Centered loading state for initial and subsequent loads
  if (isInitialLoad || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mb-4"></div>
          <p className="text-gray-600 text-lg">Loading Analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
        <div className="bg-white border-l-4 border-red-500 text-red-700 p-6 rounded-lg shadow-lg" role="alert">
          <p className="font-bold text-lg mb-2">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen relative p-4 sm:p-8">
      {/* Optional: Loading Overlay for subsequent loads */}
      {!isInitialLoad && loading && (
        <div className="fixed inset-0 bg-black bg-opacity-20 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-indigo-600 mb-4"></div>
            <p className="text-gray-600">Updating data...</p>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:scale-105">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Users</p>
              <p className="mt-2 text-3xl font-extrabold text-gray-900">{totalUsers}</p>
            </div>
            <div className="p-3 bg-indigo-100 rounded-full">
              <Users className="h-6 w-6 text-indigo-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-sm font-medium text-green-600">↑ 12%</span>
            <span className="ml-2 text-sm text-gray-500">from last month</span>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:scale-105">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Active Users</p>
              <p className="mt-2 text-3xl font-extrabold text-gray-900">{activeUsers}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <UserCheck className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-sm font-medium text-green-600">↑ 8%</span>
            <span className="ml-2 text-sm text-gray-500">from last month</span>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:scale-105">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Deleted Users</p>
              <p className="mt-2 text-3xl font-extrabold text-gray-900">{deletedUsers}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <UserMinus className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-sm font-medium text-red-600">↓ 3%</span>
            <span className="ml-2 text-sm text-gray-500">from last month</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <Calendar className="h-6 w-6 text-indigo-600" />
            <h3 className="text-xl font-semibold text-gray-900">Registration Trend</h3>
          </div>
          <div className="flex flex-wrap gap-4">
            <input
              type="date"
              value={dateRange.start.split('T')[0]}
              onChange={(e) => handleDateRangeChange(e.target.value, dateRange.end)}
              className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              max={dateRange.end.split('T')[0]}
            />
            <input
              type="date"
              value={dateRange.end.split('T')[0]}
              onChange={(e) => handleDateRangeChange(dateRange.start, e.target.value)}
              className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              min={dateRange.start.split('T')[0]}
            />
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={registrationTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip contentStyle={{ backgroundColor: 'white', borderRadius: '0.375rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="count" 
              stroke="#4f46e5" 
              strokeWidth={3}
              dot={{ fill: '#4f46e5', strokeWidth: 2 }}
              activeDot={{ r: 8 }}
              name="Registrations"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Users by Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={usersByStatus}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {usersByStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: 'white', borderRadius: '0.375rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Users by Region</h3>
            <select
              value={selectedRegion || ''}
              onChange={(e) => handleRegionChange(e.target.value)}
              className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">All Regions</option>
              {usersByRegion.map((region) => (
                <option key={region.region} value={region.region}>
                  {region.region}
                </option>
              ))}
            </select>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={processedRegionData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="region" 
                stroke="#6b7280"
                angle={-45}
                textAnchor="end"
                height={60}
                interval={0}
              />
              <YAxis stroke="#6b7280" />
              <Tooltip contentStyle={{ backgroundColor: 'white', borderRadius: '0.375rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }} />
              <Legend />
              <Bar 
                dataKey="count" 
                fill="#4f46e5" 
                name="Users"
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="average" 
                fill="#10b981" 
                name="Average"
                radius={[4, 4, 0, 0]}
                opacity={0.5}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

