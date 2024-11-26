import React, { useState } from 'react';
import { ContributionType, Contribution } from '../types';
import { useAuth } from '../context/AuthContext';

const CONTRIBUTION_TYPES: { value: ContributionType; label: string }[] = [
  { value: 'CODE_REVIEW', label: 'Code Review' },
  { value: 'BUG_FIX', label: 'Bug Fix' },
  { value: 'FEATURE', label: 'New Feature' },
  { value: 'DOCUMENTATION', label: 'Documentation' },
  { value: 'TESTING', label: 'Testing' },
  { value: 'MENTORING', label: 'Mentoring' },
  { value: 'OTHER', label: 'Other' }
];

const DEVCOIN_VALUES = {
  CODE_REVIEW: 20,
  BUG_FIX: 30,
  FEATURE: 50,
  DOCUMENTATION: 25,
  TESTING: 25,
  MENTORING: 40,
  OTHER: 20
};

interface ContributionFormProps {
  onSubmit: (contribution: Omit<Contribution, 'id' | 'status' | 'createdAt'>) => void;
}

const ContributionForm: React.FC<ContributionFormProps> = ({ onSubmit }) => {
  const { currentUser } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contributionType, setContributionType] = useState<ContributionType>('CODE_REVIEW');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) return;

    const contribution = {
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      title,
      description,
      contributionType,
      devCoins: DEVCOIN_VALUES[contributionType],
    };

    onSubmit(contribution);
    
    // Reset form
    setTitle('');
    setDescription('');
    setContributionType('CODE_REVIEW');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Contribution Type
        </label>
        <select
          value={contributionType}
          onChange={(e) => setContributionType(e.target.value as ContributionType)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {CONTRIBUTION_TYPES.map(({ value, label }) => (
            <option key={value} value={value}>
              {label} ({DEVCOIN_VALUES[value]} DevCoins)
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Brief title of your contribution"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Detailed description of your contribution"
          required
        />
      </div>

      <div className="flex items-center justify-between bg-gray-50 p-4 rounded">
        <div>
          <h4 className="text-sm font-medium text-gray-900">DevCoins to be awarded</h4>
          <p className="text-sm text-gray-500">Upon admin approval</p>
        </div>
        <span className="text-2xl font-bold text-indigo-600">
          {DEVCOIN_VALUES[contributionType]}
        </span>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit Contribution
      </button>
    </form>
  );
};

export default ContributionForm;
