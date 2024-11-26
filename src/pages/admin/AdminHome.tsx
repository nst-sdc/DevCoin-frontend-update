import React from 'react';
import { Link } from 'react-router-dom';
import { adminAuth } from '../../services/adminAuth';

const AdminHome: React.FC = () => {
  const adminInfo = adminAuth.getAdminInfo();

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome, {adminInfo?.name}</h1>
        <p className="text-gray-600">Admin Control Panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* DevCoin Requests Card */}
        <Link to="/admin/requests" className="block">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">DevCoin Requests</h2>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-gray-600 mb-4">Manage DevCoin requests, approvals, and rejections</p>
            <div className="flex justify-between text-sm">
              <span className="text-yellow-600 bg-yellow-100 px-2 py-1 rounded">5 Pending</span>
              <span className="text-green-600 bg-green-100 px-2 py-1 rounded">12 Approved</span>
            </div>
          </div>
        </Link>

        {/* User Management Card */}
        <Link to="/admin/users" className="block">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">User Management</h2>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <p className="text-gray-600 mb-4">Manage users, roles, and permissions</p>
            <div className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded inline-block">
              25 Total Users
            </div>
          </div>
        </Link>

        {/* Statistics Card */}
        <Link to="/admin/stats" className="block">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Statistics</h2>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <p className="text-gray-600 mb-4">View system statistics and analytics</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-purple-600 bg-purple-100 px-2 py-1 rounded text-center">1.2k DevCoins</span>
              <span className="text-indigo-600 bg-indigo-100 px-2 py-1 rounded text-center">50 Active</span>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Activity Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">New DevCoin Request</p>
                <p className="text-sm text-gray-600">John Doe requested 50 DevCoins</p>
              </div>
              <span className="text-sm text-gray-500">2 minutes ago</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Request Approved</p>
                <p className="text-sm text-gray-600">Jane Smith's request for 30 DevCoins was approved</p>
              </div>
              <span className="text-sm text-gray-500">1 hour ago</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">New User Registration</p>
                <p className="text-sm text-gray-600">Alex Johnson joined as Frontend Developer</p>
              </div>
              <span className="text-sm text-gray-500">3 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
