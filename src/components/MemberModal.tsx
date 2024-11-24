import React from 'react';
import { X, Github, Mail, Award, Link2 } from 'lucide-react';
import type { Member } from '../types';
import { useDevCoin } from '../context/DevCoinContext';

interface MemberModalProps {
  member: Member;
  onClose: () => void;
}

export default function MemberModal({ member: initialMember, onClose }: MemberModalProps) {
  const { members } = useDevCoin();
  // Get the latest member data from context
  const member = members.find(m => m.id === initialMember.id) || initialMember;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="text-center mb-6">
          <img
            src={member.avatar}
            alt={member.name}
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-900">{member.name}</h2>
          <p className="text-gray-500">{member.role}</p>
        </div>
            
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-indigo-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-indigo-600" />
              <span className="text-indigo-600 font-semibold">Dev Coins</span>
            </div>
            <div className="text-2xl font-bold mt-1">{member.devCoins}</div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <Github className="h-5 w-5 text-gray-600" />
              <span className="text-gray-600 font-semibold">GitHub</span>
            </div>
            <a
              href={`https://github.com/${member.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline mt-1 block"
            >
              {member.github}
            </a>
          </div>
        </div>

        <div className="space-y-4">
          {member.email && (
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <a
                href={`mailto:${member.email}`}
                className="text-gray-600 hover:text-gray-900"
              >
                {member.email}
              </a>
            </div>
          )}
          
          {member.adypuEmail && (
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <a
                href={`mailto:${member.adypuEmail}`}
                className="text-gray-600 hover:text-gray-900"
              >
                {member.adypuEmail}
              </a>
            </div>
          )}
          
          {member.linkedin && (
            <div className="flex items-center space-x-3">
              <Link2 className="h-5 w-5 text-gray-400" />
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900"
              >
                LinkedIn Profile
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}