import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DevCoinRequest, DevCoinRequestStatus } from '../types';

interface User {
  id: string;
  name: string;
  email: string;
  creditPoints: number;
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'requests'>('requests');
  const [users, setUsers] = useState<User[]>([]);
  const [requests, setRequests] = useState<DevCoinRequest[]>([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', creditPoints: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem('adminToken');
    if (!isAdmin) {
      navigate('/admin/login');
    }
    
    // Load mock data
    setUsers([
      { id: '1', name: 'John Doe', email: 'john@example.com', creditPoints: 100 },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com', creditPoints: 150 },
    ]);

    setRequests([
      {
        id: '1',
        userId: '1',
        userName: 'John Doe',
        amount: 50,
        reason: 'Code Review for Authentication System',
        status: 'pending',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        userId: '2',
        userName: 'Jane Smith',
        amount: 80,
        reason: 'Technical Blog on React Best Practices',
        status: 'pending',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      },
    ] as DevCoinRequest[]);
  }, [navigate]);

  const handleUpdateCredits = (userId: string, newPoints: number) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, creditPoints: newPoints } : user
    ));
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const newUserId = (users.length + 1).toString();
    setUsers([...users, { ...newUser, id: newUserId }]);
    setNewUser({ name: '', email: '', creditPoints: 0 });
  };

  const handleRequestAction = (requestId: string, status: DevCoinRequestStatus, comments?: string) => {
    const now = new Date().toISOString();
    const adminName = 'Admin'; // In real app, get from admin profile

    setRequests(requests.map(request => 
      request.id === requestId
        ? {
            ...request,
            status,
            reviewedAt: now,
            reviewedBy: adminName,
            comments
          }
        : request
    ));

    if (status === 'approved') {
      // Update user's credit points
      const request = requests.find(r => r.id === requestId);
      if (request) {
        setUsers(users.map(user =>
          user.id === request.userId
            ? { ...user, creditPoints: user.creditPoints + request.amount }
            : user
        ));
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-4 py-2 rounded ${
              activeTab === 'requests'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            DevCoin Requests
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded ${
              activeTab === 'users'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            User Management
          </button>
        </div>

        {activeTab === 'requests' ? (
          // DevCoin Requests Table
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requests.map((request) => (
                  <tr key={request.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{request.userName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{request.amount} DevCoins</td>
                    <td className="px-6 py-4">{request.reason}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        request.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : request.status === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(request.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {request.status === 'pending' && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleRequestAction(request.id, 'approved')}
                            className="text-green-600 hover:text-green-900"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleRequestAction(request.id, 'rejected')}
                            className="text-red-600 hover:text-red-900"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <>
            {/* Add New User Form */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-xl font-bold mb-4">Add New User</h2>
              <form onSubmit={handleAddUser} className="flex gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="flex-1 p-2 border rounded"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="flex-1 p-2 border rounded"
                  required
                />
                <input
                  type="number"
                  placeholder="Credit Points"
                  value={newUser.creditPoints}
                  onChange={(e) => setNewUser({ ...newUser, creditPoints: parseInt(e.target.value) })}
                  className="w-32 p-2 border rounded"
                  required
                />
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Add User
                </button>
              </form>
            </div>

            {/* Users List */}
            <div className="bg-white rounded-lg shadow-md">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DevCoins</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="number"
                          value={user.creditPoints}
                          onChange={(e) => handleUpdateCredits(user.id, parseInt(e.target.value))}
                          className="w-24 p-1 border rounded"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleUpdateCredits(user.id, user.creditPoints)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
