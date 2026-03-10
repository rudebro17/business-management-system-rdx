import React from 'react';

const ActiveUsersList = ({ activeCount }) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300 mt-6 md:mt-0">
      <div className="p-5 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Active Users
        </h3>
      </div>
      <div className="px-5 py-8 flex flex-col items-center justify-center text-center">
        <div className="relative inline-block">
          <svg className="h-16 w-16 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-green-400 ring-2 ring-white"></span>
        </div>
        <div className="mt-4">
          <p className="text-3xl font-bold text-gray-900">{activeCount}</p>
          <p className="text-sm font-medium text-gray-500 mt-1">Users currently online</p>
        </div>
      </div>
    </div>
  );
};

export default ActiveUsersList;
