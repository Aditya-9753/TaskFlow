import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Calendar, AlertCircle } from 'lucide-react';

/**
 * Reusable form component for creating or editing a task (renders as a clean card)
 */
const TaskForm = ({
  onSubmit,
  onCancel,
  initialData = null,
  isLoading = false,
}) => {
  const isEditMode = !!initialData;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      priority: 'Medium',
      dueDate: '',
      status: 'Pending',
    },
  });

  // Prefill form fields when initialData updates (e.g. loading task details for editing)
  useEffect(() => {
    if (initialData) {
      // Format ISO Date to YYYY-MM-DD for input[type="date"]
      let formattedDate = '';
      if (initialData.dueDate) {
        formattedDate = new Date(initialData.dueDate).toISOString().split('T')[0];
      }

      reset({
        title: initialData.title || '',
        description: initialData.description || '',
        priority: initialData.priority || 'Medium',
        dueDate: formattedDate,
        status: initialData.status || 'Pending',
      });
    } else {
      reset({
        title: '',
        description: '',
        priority: 'Medium',
        dueDate: '',
        status: 'Pending',
      });
    }
  }, [initialData, reset]);

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <div className="bg-white dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl shadow-lg w-full max-w-lg mx-auto overflow-hidden transition-theme">
      {/* Header */}
      <div className="px-6 py-4 border-b border-light-border dark:border-dark-border">
        <h3 className="text-lg font-bold text-light-text-main dark:text-dark-text-main">
          {isEditMode ? 'Edit Task Details' : 'Create New Task'}
        </h3>
        <p className="text-xs text-light-text-muted dark:text-dark-text-muted mt-0.5">
          {isEditMode ? 'Modify fields below and click save.' : 'Fill in the information to add a task to your board.'}
        </p>
      </div>

      {/* Form body */}
      <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-4">
        
        {/* Title Field */}
        <div>
          <label className="block text-sm font-semibold text-light-text-main dark:text-dark-text-main mb-1.5">
            Task Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Complete presentation slides"
            className={`w-full px-3 py-2 border rounded-lg bg-transparent text-light-text-main dark:text-dark-text-main transition-theme ${
              errors.title
                ? 'border-red-500 focus:ring-red-500/20'
                : 'border-light-border dark:border-dark-border'
            }`}
            {...register('title', { required: 'Title is required' })}
            disabled={isLoading}
          />
          {errors.title && (
            <span className="flex items-center gap-1 mt-1 text-xs text-red-500 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.title.message}
            </span>
          )}
        </div>

        {/* Description Field */}
        <div>
          <label className="block text-sm font-semibold text-light-text-main dark:text-dark-text-main mb-1.5">
            Description
          </label>
          <textarea
            placeholder="Provide more context for this task..."
            rows="4"
            className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-transparent text-light-text-main dark:text-dark-text-main transition-theme resize-none"
            {...register('description')}
            disabled={isLoading}
          ></textarea>
        </div>

        {/* Grid for parameters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Priority Selector */}
          <div>
            <label className="block text-sm font-semibold text-light-text-main dark:text-dark-text-main mb-1.5">
              Priority
            </label>
            <select
              className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-white dark:bg-dark-card text-light-text-main dark:text-dark-text-main transition-theme cursor-pointer"
              {...register('priority')}
              disabled={isLoading}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Due Date Input */}
          <div>
            <label className="block text-sm font-semibold text-light-text-main dark:text-dark-text-main mb-1.5">
              Due Date
            </label>
            <div className="relative">
              <input
                type="date"
                className="w-full pl-10 pr-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-transparent text-light-text-main dark:text-dark-text-main transition-theme cursor-pointer"
                {...register('dueDate')}
                disabled={isLoading}
              />
              <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-light-text-muted dark:text-dark-text-muted pointer-events-none" />
            </div>
          </div>

        </div>

        {/* Status Selector (Only when editing) */}
        {isEditMode && (
          <div>
            <label className="block text-sm font-semibold text-light-text-main dark:text-dark-text-main mb-1.5">
              Status
            </label>
            <select
              className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-lg bg-white dark:bg-dark-card text-light-text-main dark:text-dark-text-main transition-theme cursor-pointer"
              {...register('status')}
              disabled={isLoading}
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-light-border dark:border-dark-border">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-light-text-main dark:text-dark-text-main text-sm font-semibold rounded-lg transition cursor-pointer"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-brand-primary hover:bg-brand-primary-hover text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition flex items-center gap-1.5 cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : null}
            <span>{isEditMode ? 'Save Changes' : 'Create Task'}</span>
          </button>
        </div>

      </form>
    </div>
  );
};

export default TaskForm;
