import React, { useState, useEffect } from 'react';
import { AdminProjectPanel } from './AdminProjectPanel';
import { useAuth } from '../contexts/AuthContext';
import { isAdmin } from '../lib/supabase';

type TabType = 'projects' | 'users' | 'leaderboard' | 'settings';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('projects');
  const [isAdminUser, setIsAdminUser] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      if (user?.id) {
        const admin = await isAdmin(user.id);
        setIsAdminUser(admin);
      }
    };
    checkAdmin();
  }, [user]);

  if (!isAdminUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
          <p className="mt-2">You don't have permission to access this area.</p>
        </div>
      </div>
    );
  }

  const tabs: { id: TabType; label: string }[] = [
    { id: 'projects', label: 'Projects' },
    { id: 'users', label: 'Users' },
    { id: 'leaderboard', label: 'Leaderboard' },
    { id: 'settings', label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-2xl font-bold text-gray-900">DevCoin Admin</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    py-4 px-8 font-medium text-sm
                    ${
                      activeTab === tab.id
                        ? 'border-b-2 border-blue-500 text-blue-600'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'projects' && <AdminProjectPanel />}
            {activeTab === 'users' && <AdminUserPanel />}
            {activeTab === 'leaderboard' && <AdminLeaderboardPanel />}
            {activeTab === 'settings' && <AdminSettingsPanel />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
