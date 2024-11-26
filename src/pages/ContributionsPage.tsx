import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ContributionForm from '../components/ContributionForm';
import { Contribution } from '../types';
import { v4 as uuidv4 } from 'uuid';

const ContributionsPage: React.FC = () => {
  const [submissions, setSubmissions] = useState<Contribution[]>([]);

  const handleSubmit = (contributionData: Omit<Contribution, 'id' | 'status' | 'createdAt'>) => {
    const newContribution: Contribution = {
      ...contributionData,
      id: uuidv4(),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    // In a real app, this would be an API call
    setSubmissions([newContribution, ...submissions]);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Submit Contribution</h1>
          <p className="mt-2 text-sm text-gray-600">
            Submit your contributions to earn DevCoins. Your submission will be reviewed by an admin.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <ContributionForm onSubmit={handleSubmit} />
          </div>

          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Your Submissions</h2>
            <div className="space-y-4">
              {submissions.map((submission) => (
                <div
                  key={submission.id}
                  className="bg-white shadow rounded-lg p-4 border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-900">{submission.title}</h3>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        submission.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : submission.status === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {submission.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{submission.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">
                      {new Date(submission.createdAt).toLocaleDateString()}
                    </span>
                    <span className="font-medium text-indigo-600">
                      {submission.devCoins} DevCoins
                    </span>
                  </div>
                  {submission.comments && (
                    <div className="mt-2 text-sm">
                      <span className="font-medium text-gray-900">Admin Comments:</span>
                      <p className="text-gray-500">{submission.comments}</p>
                    </div>
                  )}
                </div>
              ))}

              {submissions.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-sm text-gray-500">No submissions yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContributionsPage;
