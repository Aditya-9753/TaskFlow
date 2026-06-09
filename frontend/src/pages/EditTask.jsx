import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TaskForm from '../components/TaskForm';
import Loader from '../components/Loader';
import { useTask, useTasks } from '../hooks/useTasks';
import { ArrowLeft, AlertCircle } from 'lucide-react';

/**
 * Full page view for editing an existing task
 */
const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 1. Fetch the single task details by ID
  const { data: task, isLoading, isError, error } = useTask(id);

  // 2. Load the tasks operations hook for update mutation
  const { updateTask, isUpdating } = useTasks();

  const handleEditSubmit = async (formData) => {
    try {
      await updateTask({ id, taskData: formData });
      navigate('/'); // Redirect back to dashboard on success
    } catch (err) {
      console.error('Failed to update task:', err);
    }
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text-main dark:text-dark-text-main transition-theme pb-12">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-6">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition text-light-text-muted hover:text-light-text-main dark:text-dark-text-muted dark:hover:text-dark-text-main cursor-pointer"
            aria-label="Back to dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl font-bold">Edit Task Details</h2>
            <p className="text-xs text-light-text-muted dark:text-dark-text-muted">
              Dashboard / Edit Task
            </p>
          </div>
        </div>

        {/* Form State Handler */}
        <div className="mt-4">
          {isLoading ? (
            <div className="py-12 flex justify-center">
              <Loader size="lg" />
            </div>
          ) : isError ? (
            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 p-6 rounded-xl text-center max-w-lg mx-auto space-y-3">
              <AlertCircle className="w-10 h-10 mx-auto" />
              <h3 className="font-bold">Error Loading Task</h3>
              <p className="text-sm">
                {error?.response?.data?.message || 'Task details could not be loaded. It may have been deleted or you do not have permission to view it.'}
              </p>
              <button
                onClick={() => navigate('/')}
                className="mt-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-light-text-main dark:text-dark-text-main text-sm font-semibold rounded-lg hover:bg-slate-200"
              >
                Go Back Home
              </button>
            </div>
          ) : (
            <TaskForm
              initialData={task}
              onSubmit={handleEditSubmit}
              onCancel={() => navigate('/')}
              isLoading={isUpdating}
            />
          )}
        </div>

      </main>
    </div>
  );
};

export default EditTask;
// Use default export
