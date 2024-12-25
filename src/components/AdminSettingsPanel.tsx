import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Settings {
  pointsPerContribution: number;
  minPointsForReward: number;
  maxPointsPerDay: number;
  githubTokenEnabled: boolean;
  autoApproveContributions: boolean;
}

export const AdminSettingsPanel: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    pointsPerContribution: 10,
    minPointsForReward: 100,
    maxPointsPerDay: 50,
    githubTokenEnabled: true,
    autoApproveContributions: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          // No settings found, create default settings
          await saveSettings(settings);
        } else {
          throw error;
        }
      } else if (data) {
        setSettings(data);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      alert('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async (newSettings: Settings) => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('settings')
        .upsert([newSettings]);

      if (error) throw error;
      setSettings(newSettings);
      alert('Settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (key: keyof Settings, value: number | boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveSettings(settings);
  };

  if (loading) {
    return <div className="text-center py-4">Loading settings...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">System Settings</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6 space-y-6">
          <h3 className="text-lg font-medium">Points Configuration</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Points Per Contribution
            </label>
            <input
              type="number"
              value={settings.pointsPerContribution}
              onChange={(e) => handleInputChange('pointsPerContribution', parseInt(e.target.value))}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
            <p className="mt-1 text-sm text-gray-500">
              Number of points awarded for each contribution
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Minimum Points for Reward
            </label>
            <input
              type="number"
              value={settings.minPointsForReward}
              onChange={(e) => handleInputChange('minPointsForReward', parseInt(e.target.value))}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
            <p className="mt-1 text-sm text-gray-500">
              Minimum points required to claim rewards
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Maximum Points Per Day
            </label>
            <input
              type="number"
              value={settings.maxPointsPerDay}
              onChange={(e) => handleInputChange('maxPointsPerDay', parseInt(e.target.value))}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
            <p className="mt-1 text-sm text-gray-500">
              Maximum points a user can earn per day
            </p>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6 space-y-6">
          <h3 className="text-lg font-medium">System Configuration</h3>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">
                GitHub Token Required
              </label>
              <p className="mt-1 text-sm text-gray-500">
                Require users to provide GitHub token for authentication
              </p>
            </div>
            <div className="ml-4">
              <button
                type="button"
                onClick={() => handleInputChange('githubTokenEnabled', !settings.githubTokenEnabled)}
                className={`
                  relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer 
                  transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                  ${settings.githubTokenEnabled ? 'bg-blue-600' : 'bg-gray-200'}
                `}
              >
                <span className={`
                  pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200
                  ${settings.githubTokenEnabled ? 'translate-x-5' : 'translate-x-0'}
                `} />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Auto-approve Contributions
              </label>
              <p className="mt-1 text-sm text-gray-500">
                Automatically approve contributions without admin review
              </p>
            </div>
            <div className="ml-4">
              <button
                type="button"
                onClick={() => handleInputChange('autoApproveContributions', !settings.autoApproveContributions)}
                className={`
                  relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer 
                  transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                  ${settings.autoApproveContributions ? 'bg-blue-600' : 'bg-gray-200'}
                `}
              >
                <span className={`
                  pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200
                  ${settings.autoApproveContributions ? 'translate-x-5' : 'translate-x-0'}
                `} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};
