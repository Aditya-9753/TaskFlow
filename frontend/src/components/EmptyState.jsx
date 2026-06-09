import React from 'react';
import { ClipboardList, Plus } from 'lucide-react';

/**
 * Reusable layout shown when the user has no tasks or no results match the filter
 */
const EmptyState = ({
  title = "No tasks found",
  message = "Add a task to start tracking your daily progress.",
  actionText = "Add Task",
  onActionClick,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 md:p-16 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-2xl shadow-sm transition-theme max-w-lg mx-auto">
      <div className="p-4 bg-brand-primary/10 rounded-full text-brand-primary mb-5 animate-float">
        <ClipboardList className="w-12 h-12" />
      </div>
      
      <h3 className="text-xl font-bold text-light-text-main dark:text-dark-text-main mb-2">
        {title}
      </h3>
      
      <p className="text-light-text-muted dark:text-dark-text-muted mb-6">
        {message}
      </p>

      {onActionClick && (
        <button
          onClick={onActionClick}
          className="flex items-center gap-2 px-5 py-2.5 bg-brand-primary hover:bg-brand-primary-hover text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-200"
        >
          <Plus className="w-5 h-5" />
          <span>{actionText}</span>
        </button>
      )}
    </div>
  );
};

export default EmptyState;
