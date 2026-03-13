import React from 'react';

const TaskCard = ({ task, onDragStart }) => {
  const priorityColors = {
    Low: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    High: 'bg-red-100 text-red-800'
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      className="bg-white p-4 rounded shadow-sm border border-gray-200 mb-3 cursor-move hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold text-gray-800">{task.title}</h4>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${priorityColors[task.priority]}`}>
          {task.priority || 'Medium'}
        </span>
      </div>
      
      {task.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
      )}
      
      <div className="flex justify-between items-center text-xs text-gray-500">
        <div className="flex items-center">
            <svg className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="truncate max-w-[100px]">{task.assignedTo || 'Unassigned'}</span>
        </div>
        
        {task.deadline && (
            <div className="flex items-center text-red-500">
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {new Date(task.deadline).toLocaleDateString()}
            </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
