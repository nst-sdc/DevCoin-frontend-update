import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/supabase';

type Profile = Database['public']['Tables']['profiles']['Row'];

export const AdminLeaderboardPanel: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('points', { ascending: false });
      
      if (error) throw error;
      setLeaderboard(data || []);
    } catch (error) {
      console.error('Error loading leaderboard:', error);
      alert('Failed to load leaderboard');
    } finally {
      setLoading(false);
    }
  };

  const updatePoints = async (userId: string, points: number) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ points })
        .eq('id', userId);

      if (error) throw error;
      await loadLeaderboard();
    } catch (error) {
      console.error('Error updating points:', error);
      alert('Failed to update points');
    }
  };

  const updateContributions = async (userId: string, contributions: number) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ contributions })
        .eq('id', userId);

      if (error) throw error;
      await loadLeaderboard();
    } catch (error) {
      console.error('Error updating contributions:', error);
      alert('Failed to update contributions');
    }
  };

  const resetAllPoints = async () => {
    if (!confirm('Are you sure you want to reset all points? This action cannot be undone.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ points: 0 })
        .neq('id', '');

      if (error) throw error;
      await loadLeaderboard();
      alert('All points have been reset');
    } catch (error) {
      console.error('Error resetting points:', error);
      alert('Failed to reset points');
    }
  };

  const recalculatePoints = async () => {
    try {
      // This is a placeholder for your point calculation logic
      // You would implement this based on your specific rules
      alert('Points recalculation would happen here based on your rules');
    } catch (error) {
      console.error('Error recalculating points:', error);
      alert('Failed to recalculate points');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Leaderboard Management</h2>
        <div className="space-x-4">
          <button
            onClick={() => setEditMode(!editMode)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {editMode ? 'View Mode' : 'Edit Mode'}
          </button>
          <button
            onClick={recalculatePoints}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Recalculate Points
          </button>
          <button
            onClick={resetAllPoints}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Reset All Points
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-4">Loading leaderboard...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Points
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contributions
                </th>
                {editMode && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leaderboard.map((user, index) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editMode ? (
                      <input
                        type="number"
                        value={user.points}
                        onChange={(e) => updatePoints(user.id, parseInt(e.target.value))}
                        className="w-24 p-1 border rounded"
                      />
                    ) : (
                      user.points
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editMode ? (
                      <input
                        type="number"
                        value={user.contributions}
                        onChange={(e) => updateContributions(user.id, parseInt(e.target.value))}
                        className="w-24 p-1 border rounded"
                      />
                    ) : (
                      user.contributions
                    )}
                  </td>
                  {editMode && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => updatePoints(user.id, 0)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Reset Points
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
