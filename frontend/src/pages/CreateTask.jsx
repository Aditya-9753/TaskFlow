import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TaskForm from '../components/TaskForm';
import { useTasks } from '../hooks/useTasks';
import { ArrowLeft } from 'lucide-react';

/**
 * Full page view for creating a new task
 */
const CreateTask = () => {
  const navigate = useNavigate();
  
  // Use tasks hook for creating mutation
  const { createTask, isCreating } = useTasks();

  const handleCreateSubmit = async (formData) => {
    try {
      await createTask(formData);
      navigate('/'); // Go back to dashboard on success
    } catch (error) {
      console.error('Failed to create task:', error);
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
            <h2 className="text-xl font-bold">Add New Task</h2>
            <p className="text-xs text-light-text-muted dark:text-dark-text-muted">
              Dashboard / Create Task
            </p>
          </div>
        </div>

        {/* Task Form mounting */}
        <div className="mt-4">
          <TaskForm
            onSubmit={handleCreateSubmit}
            onCancel={() => navigate('/')}
            isLoading={isCreating}
          />
        </div>

      </main>
    </div>
  );
};

export default CreateTask;
// Use default export
