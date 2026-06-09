import React from 'react';
import { Calendar, Trash2, Edit3, Clock, AlertTriangle } from 'lucide-react';

/**
 * Renders a task card with controls to edit, delete, and toggle status.
 */
const TaskCard = ({ task, onToggleStatus, onEdit, onDelete }) => {
  const { title, description, status, priority, dueDate, createdAt } = task;
  const isCompleted = status === 'Completed';

  // Format Due Date
  const formatDate = (dateString) => {
    if (!dateString) return null;
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Determine if task is overdue
  const isOverdue = () => {
    if (!dueDate || isCompleted) return false;
    // Strip time for accurate day comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    return due < today;
  };

  // Color styles for priority badges
  const priorityStyles = {
    Low: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900/30',
    Medium: 'bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400 border border-amber-200/50 dark:border-amber-900/30',
    High: 'bg-rose-50 text-rose-700 dark:bg-rose-950/20 dark:text-rose-400 border border-rose-200/50 dark:border-rose-900/30',
  };

  return (
    <div
      className={`relative bg-white dark:bg-dark-card border rounded-xl p-5 shadow-sm hover:shadow-md transition-theme flex flex-col justify-between ${
        isCompleted
          ? 'border-light-border dark:border-dark-border opacity-75'
          : isOverdue()
          ? 'border-red-300 dark:border-red-950/50 ring-1 ring-red-100 dark:ring-red-950/20'
          : 'border-light-border dark:border-dark-border'
      }`}
    >
      {/* Upper Section */}
      <div className="space-y-3">
        {/* Badges and Dates */}
        <div className="flex justify-between items-start gap-2">
          {/* Priority */}
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${priorityStyles[priority] || priorityStyles.Medium}`}>
            {priority}
          </span>

          {/* Due date visualizer */}
          {dueDate && (
            <span
              className={`flex items-center gap-1 text-xs font-semibold ${
                isCompleted
                  ? 'text-light-text-muted dark:text-dark-text-muted'
                  : isOverdue()
                  ? 'text-rose-600 dark:text-rose-400 animate-[pulse_2s_infinite]'
                  : 'text-light-text-muted dark:text-dark-text-muted'
              }`}
            >
              {isOverdue() && !isCompleted ? <AlertTriangle className="w-3.5 h-3.5" /> : <Calendar className="w-3.5 h-3.5" />}
              <span>{formatDate(dueDate)}</span>
              {isOverdue() && !isCompleted && <span className="text-[10px] font-bold uppercase">(Overdue)</span>}
            </span>
          )}
        </div>

        {/* Title */}
        <h4
          className={`text-base font-bold text-light-text-main dark:text-dark-text-main break-words line-clamp-2 ${
            isCompleted ? 'line-through text-light-text-muted dark:text-dark-text-muted' : ''
          }`}
          title={title}
        >
          {title}
        </h4>

        {/* Description */}
        <p
          className={`text-sm text-light-text-muted dark:text-dark-text-muted break-words line-clamp-3 ${
            isCompleted ? 'line-through opacity-60' : ''
          }`}
        >
          {description || <span className="italic opacity-40 font-light text-xs">No description provided</span>}
        </p>
      </div>

      {/* Separator line */}
      <hr className="border-light-border dark:border-dark-border my-4" />

      {/* Footer controls */}
      <div className="flex justify-between items-center">
        {/* Toggle Status Checkbox */}
        <label className="flex items-center space-x-2.5 cursor-pointer select-none group">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={() => onToggleStatus(task)}
            className="w-5 h-5 border border-light-border dark:border-dark-border rounded text-brand-primary focus:ring-brand-primary bg-transparent focus:ring-offset-0 transition cursor-pointer"
          />
          <span
            className={`text-xs font-bold uppercase tracking-wider transition ${
              isCompleted
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-light-text-muted dark:text-dark-text-muted group-hover:text-light-text-main dark:group-hover:text-dark-text-main'
            }`}
          >
            {status}
          </span>
        </label>

        {/* Action Buttons */}
        <div className="flex items-center space-x-1">
          {/* Edit */}
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-light-text-muted hover:text-brand-primary dark:text-dark-text-muted dark:hover:text-brand-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
            title="Edit task"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          
          {/* Delete */}
          <button
            onClick={() => onDelete(task._id)}
            className="p-2 text-light-text-muted hover:text-red-600 dark:text-dark-text-muted dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
            title="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
