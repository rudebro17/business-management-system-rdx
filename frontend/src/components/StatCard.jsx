import React from 'react';

const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {/* Provide a default fallback icon if none provided */}
            {icon || (
              <div className={`rounded-md p-3 ${color ? color : 'bg-indigo-500 text-white'}`}>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            )}
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd>
                <div className="text-2xl font-semibold text-gray-900">{value}</div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
