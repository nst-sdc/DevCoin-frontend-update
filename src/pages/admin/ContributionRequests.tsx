import React, { useState, useEffect } from 'react';
import { Contribution, DevCoinRequestStatus } from '../../types';
import { format } from 'date-fns';

interface ContributionRequestsProps {
  contributions: Contribution[];
  onApprove: (id: string, comments?: string) => void;
  onReject: (id: string, comments?: string) => void;
}

const ContributionRequests: React.FC<ContributionRequestsProps> = ({
  contributions,
  onApprove,
  onReject,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [comments, setComments] = useState('');
  const [filter, setFilter] = useState<DevCoinRequestStatus>('pending');

  const filteredContributions = contributions.filter(
    (contribution) => contribution.status === filter
  );

  const handleAction = (action: 'approve' | 'reject') => {
    if (!selectedId) return;

    if (action === 'approve') {
      onApprove(selectedId, comments);
    } else {
      onReject(selectedId, comments);
    }

    setSelectedId(null);
    setComments('');
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Contribution Requests</h1>
          <p className="mt-2 text-sm text-gray-700">
            Review and manage contribution requests from team members
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as DevCoinRequestStatus)}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">User</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Type</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Title</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">DevCoins</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredContributions.map((contribution) => (
                    <tr key={contribution.id}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <div className="font-medium text-gray-900">{contribution.userName}</div>
                        <div className="text-gray-500">{contribution.userEmail}</div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {contribution.contributionType}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500">
                        <div className="font-medium text-gray-900">{contribution.title}</div>
                        <div className="text-gray-500 truncate max-w-xs">{contribution.description}</div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {contribution.devCoins}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {format(new Date(contribution.createdAt), 'MMM d, yyyy')}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span
                          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            contribution.status === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : contribution.status === 'rejected'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {contribution.status}
                        </span>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        {contribution.status === 'pending' && (
                          <div className="space-x-2">
                            <button
                              onClick={() => setSelectedId(contribution.id)}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Review
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {selectedId && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Review Contribution</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Comments (optional)
              </label>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                rows={3}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Add any comments about your decision..."
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setSelectedId(null);
                  setComments('');
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAction('reject')}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Reject
              </button>
              <button
                onClick={() => handleAction('approve')}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContributionRequests;
