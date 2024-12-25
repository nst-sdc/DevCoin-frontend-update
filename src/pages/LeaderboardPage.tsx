import React, { useState, useEffect } from 'react';
import { Trophy, ArrowUp, ArrowDown } from 'lucide-react';
import { mockMembers } from '../types';

export default function LeaderboardPage() {
  const [timeFrame, setTimeFrame] = useState<'all' | 'month' | 'week'>('all');
  const [animateRank, setAnimateRank] = useState(false);

  useEffect(() => {
    setAnimateRank(true);
    const timer = setTimeout(() => setAnimateRank(false), 500);
    return () => clearTimeout(timer);
  }, [timeFrame]);

  const sortedMembers = [...mockMembers].sort((a, b) => b.devCoins - a.devCoins);

  return (
    <div className="py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Dev Club Leaderboard</h1>
        <div className="flex justify-center space-x-4">
          <TimeFrameButton
            active={timeFrame === 'all'}
            onClick={() => setTimeFrame('all')}
          >
            All Time
          </TimeFrameButton>
          <TimeFrameButton
            active={timeFrame === 'month'}
            onClick={() => setTimeFrame('month')}
          >
            This Month
          </TimeFrameButton>
          <TimeFrameButton
            active={timeFrame === 'week'}
            onClick={() => setTimeFrame('week')}
          >
            This Week
          </TimeFrameButton>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        {sortedMembers.map((member, index) => (
          <div
            key={member.id}
            className={`bg-white rounded-xl shadow-md mb-4 transform transition-all duration-300 ${
              animateRank ? 'translate-y-2 opacity-0' : 'translate-y-0 opacity-100'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="p-6 flex items-center space-x-4">
              <div className="flex-shrink-0 w-12 text-center">
                {index === 0 && <Trophy className="h-8 w-8 text-yellow-400 mx-auto" />}
                {index === 1 && <Trophy className="h-8 w-8 text-gray-400 mx-auto" />}
                {index === 2 && <Trophy className="h-8 w-8 text-amber-700 mx-auto" />}
                {index > 2 && (
                  <span className="text-xl font-bold text-gray-500">#{index + 1}</span>
                )}
              </div>
              
              <img
                src={member.avatar}
                alt={member.name}
                className="h-12 w-12 rounded-full object-cover"
              />
              
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-bold text-indigo-600">
                  {member.devCoins}
                </div>
                <div className="text-sm text-gray-500">DevCoins</div>
              </div>
              
              <div className="flex-shrink-0 w-8">
                {index === 0 ? (
                  <div className="text-green-500">
                    <ArrowUp className="h-5 w-5" />
                  </div>
                ) : index === sortedMembers.length - 1 ? (
                  <div className="text-red-500">
                    <ArrowDown className="h-5 w-5" />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TimeFrameButton({ 
  active, 
  onClick, 
  children 
}: { 
  active: boolean; 
  onClick: () => void; 
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg transition-colors ${
        active
          ? 'bg-indigo-600 text-white'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {children}
    </button>
  );
}