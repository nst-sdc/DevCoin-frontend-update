import React from 'react';
import { Trophy, Medal } from 'lucide-react';
import { useDevCoin } from '../context/DevCoinContext';

export default function LeaderboardPage() {
  const { members } = useDevCoin();
  
  // Sort members by devCoins in descending order
  const sortedMembers = [...members].sort((a, b) => b.devCoins - a.devCoins);

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Leaderboard</h1>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          {/* Top 3 Winners */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {sortedMembers.slice(0, 3).map((member, index) => (
              <div
                key={member.id}
                className="bg-gradient-to-br from-indigo-50 to-white rounded-xl p-6 text-center shadow-sm"
              >
                <div className="flex justify-center mb-4">
                  {index === 0 ? (
                    <Trophy className="h-12 w-12 text-yellow-500" />
                  ) : index === 1 ? (
                    <Medal className="h-12 w-12 text-gray-400" />
                  ) : (
                    <Medal className="h-12 w-12 text-amber-600" />
                  )}
                </div>
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4"
                />
                <h3 className="font-semibold text-lg mb-2">{member.name}</h3>
                <p className="text-indigo-600 font-bold">{member.devCoins} CRDits</p>
              </div>
            ))}
          </div>

          {/* Full Leaderboard */}
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dev Coins
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedMembers.map((member, index) => (
                <tr key={member.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    #{index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={member.avatar}
                        alt={member.name}
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {member.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-indigo-600">
                    {member.devCoins} CRDits
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}