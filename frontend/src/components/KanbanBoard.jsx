import React, { useState } from 'react';

const KanbanBoard = ({ tasks, onTaskDrop, onDeleteTask, loading }) => {
  const columns = [
    { id: 'todo', title: 'To Do', bgColor: 'bg-gray-50', headerColor: 'text-gray-600', dotColor: 'bg-gray-400', borderColor: 'border-gray-200' },
    { id: 'inprogress', title: 'In Progress', bgColor: 'bg-blue-50', headerColor: 'text-blue-700', dotColor: 'bg-blue-500', borderColor: 'border-blue-200' },
    { id: 'completed', title: 'Completed', bgColor: 'bg-green-50', headerColor: 'text-green-700', dotColor: 'bg-green-500', borderColor: 'border-green-200' }
  ];

  const [draggingOver, setDraggingOver] = useState(null);

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('taskId', taskId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, colId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDraggingOver(colId);
  };

  const handleDragLeave = () => setDraggingOver(null);

  const handleDrop = (e, status) => {
    e.preventDefault();
    setDraggingOver(null);
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId && onTaskDrop) {
      onTaskDrop(taskId, status);
    }
  };

  const priorityColors = {
    Low: 'bg-green-100 text-green-700 border border-green-200',
    Medium: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
    High: 'bg-red-100 text-red-700 border border-red-200'
  };

  if (loading) {
    return (
      <div className="flex justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 h-full pb-8">
      {columns.map((column) => {
        const columnTasks = tasks.filter(t => t.status === column.id);
        return (
          <div
            key={column.id}
            className={`${column.bgColor} rounded-xl border ${draggingOver === column.id ? 'border-indigo-400 shadow-lg shadow-indigo-100' : column.borderColor} flex flex-col min-h-[500px] transition-all duration-200`}
            onDragOver={(e) => handleDragOver(e, column.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            {/* Column Header */}
            <div className="px-4 py-3 flex justify-between items-center border-b border-white/50">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${column.dotColor}`}></span>
                <h3 className={`font-bold text-sm tracking-wide uppercase ${column.headerColor}`}>{column.title}</h3>
              </div>
              <span className={`${column.bgColor} border ${column.borderColor} text-xs font-bold px-2 py-0.5 rounded-full ${column.headerColor}`}>
                {columnTasks.length}
              </span>
            </div>

            {/* Cards */}
            <div className="flex-1 p-3 space-y-2 overflow-y-auto">
              {columnTasks.map(task => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id)}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-move hover:shadow-md hover:border-indigo-200 active:scale-95 transition-all group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800 text-sm leading-tight pr-2">{task.title}</h4>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityColors[task.priority] || priorityColors.Medium}`}>
                        {task.priority || 'Medium'}
                      </span>
                      {onDeleteTask && (
                        <button
                          onClick={(e) => { e.stopPropagation(); onDeleteTask(task.id); }}
                          className="opacity-0 group-hover:opacity-100 ml-1 text-red-400 hover:text-red-600 transition-all"
                          title="Delete task"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>

                  {task.description && (
                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">{task.description}</p>
                  )}

                  <div className="flex justify-between items-center text-xs text-gray-400 pt-1 border-t border-gray-50">
                    <div className="flex items-center gap-1">
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="truncate max-w-[100px]">{task.assignedTo || 'Unassigned'}</span>
                    </div>
                    {task.deadline && (
                      <div className="flex items-center gap-1 text-red-400">
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {new Date(task.deadline).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {columnTasks.length === 0 && (
                <div className={`border-2 border-dashed ${draggingOver === column.id ? 'border-indigo-400 bg-indigo-50' : 'border-gray-200'} rounded-xl h-24 flex items-center justify-center text-gray-400 text-xs transition-colors`}>
                  Drop tasks here
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KanbanBoard;
