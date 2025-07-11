import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.firstName || user?.username}!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* User Management Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">User Management</h3>
              <p className="text-sm text-gray-500">Create and manage users</p>
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={() => navigate('/user-management')}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Manage Users
            </button>
          </div>
        </div>

        {/* Teachers Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Teachers</h3>
              <p className="text-sm text-gray-500">View teacher information</p>
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={() => navigate('/teachers')}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              View Teachers
            </button>
          </div>
        </div>

        {/* Students Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Students</h3>
              <p className="text-sm text-gray-500">View student information</p>
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={() => navigate('/students')}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
            >
              View Students
            </button>
          </div>
        </div>

        {/* Attendance Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Attendance</h3>
              <p className="text-sm text-gray-500">Manage attendance records</p>
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={() => navigate('/attendance')}
              className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition"
            >
              View Attendance
            </button>
          </div>
        </div>

        {/* Parents Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Parents</h3>
              <p className="text-sm text-gray-500">View parent information</p>
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={() => navigate('/parents')}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              View Parents
            </button>
          </div>
        </div>

        {/* Calendar Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Calendar</h3>
              <p className="text-sm text-gray-500">View school calendar</p>
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={() => navigate('/calendar')}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
            >
              View Calendar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
