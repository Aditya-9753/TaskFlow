import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import TaskCard from '../components/TaskCard';
import ConfirmModal from '../components/ConfirmModal';
import Pagination from '../components/Pagination';
import EmptyState from '../components/EmptyState';
import SkeletonLoader from '../components/SkeletonLoader';
import { useTasks } from '../hooks/useTasks';
import { useDebounce } from '../hooks/useDebounce';
import { Plus, ListTodo, CheckCircle2, Clock } from 'lucide-react';

/**
 * Main application dashboard containing controls and grid listings
 */
const Dashboard = () => {
  const navigate = useNavigate();

  // 1. Local states for search, filters, pagination, and sorting
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [page, setPage] = useState(1);
  const limit = 6; // Tasks per page

  // Debounce search text to minimize query rate
  const debouncedSearch = useDebounce(search, 400);

  // Reset page to 1 when filters or searches change
  const handleFilterChange = (setter, value) => {
    setter(value);
    setPage(1);
  };

  // Compile filters to send to custom hook
  const activeFilters = {
    search: debouncedSearch,
    status,
    priority,
    sortBy,
    sortOrder,
    page,
    limit,
  };

  // 2. Load tasks query and operations from custom hook
  const {
    tasksQuery,
    deleteTask,
    isDeleting,
    toggleStatus,
  } = useTasks(activeFilters);

  const { data, isLoading, isFetching } = tasksQuery;
  
  // Destructure returned paginated structure
  const tasks = data?.tasks || [];
  const totalPages = data?.totalPages || 0;
  const totalRecords = data?.totalRecords || 0;

  // 3. Modal control states for task deletion
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingTaskId, setDeletingTaskId] = useState(null);

  // Trigger task form navigation (Create page)
  const handleAddTaskClick = () => {
    navigate('/tasks/new');
  };

  // Trigger task form navigation (Edit page)
  const handleEditTaskClick = (task) => {
    navigate(`/tasks/edit/${task._id}`);
  };

  // Trigger confirmation modal (Delete mode)
  const handleDeleteTaskClick = (id) => {
    setDeletingTaskId(id);
    setIsDeleteOpen(true);
  };

  // Delete confirm handler
  const handleDeleteConfirm = async () => {
    try {
      if (deletingTaskId) {
        await deleteTask(deletingTaskId);
        setIsDeleteOpen(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Status toggle handler
  const handleToggleStatus = async (task) => {
    try {
      const nextStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
      await toggleStatus({ id: task._id, status: nextStatus });
    } catch (err) {
      console.error(err);
    }
  };

  // Local helper to display page loading states
  const showSkeletons = isLoading && tasks.length === 0;

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text-main dark:text-dark-text-main transition-theme pb-12">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-6">
        
        {/* Top Header Row with Welcome and CTA */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Dashboard
            </h2>
            <p className="text-sm text-light-text-muted dark:text-dark-text-muted mt-1">
              Manage your tasks, track statuses, and organize your schedule.
            </p>
          </div>

          <button
            onClick={handleAddTaskClick}
            className="flex items-center gap-2 px-5 py-2.5 bg-brand-primary hover:bg-brand-primary-hover text-white font-bold rounded-lg shadow-md hover:shadow-lg transition duration-200 shrink-0 cursor-pointer"
          >
            <Plus className="w-5 h-5" />
            <span>Add Task</span>
          </button>
        </div>

        {/* Small Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Card 1: Total Tasks */}
          <div className="bg-white dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl p-5 shadow-sm flex items-center gap-4 transition-theme">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 rounded-lg">
              <ListTodo className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-light-text-muted dark:text-dark-text-muted">
                Total Tasks
              </p>
              <h3 className="text-2xl font-black mt-0.5">
                {isLoading ? '...' : totalRecords}
              </h3>
            </div>
          </div>

          {/* Card 2: Filter Summary */}
          <div className="bg-white dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl p-5 shadow-sm flex items-center gap-4 transition-theme">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 rounded-lg">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-light-text-muted dark:text-dark-text-muted">
                Current Filter Scope
              </p>
              <h3 className="text-sm font-bold mt-1.5 truncate max-w-[180px]">
                {status || 'All Statuses'}
                {priority && ` • ${priority} Priority`}
              </h3>
            </div>
          </div>

          {/* Card 3: Sorting Parameter */}
          <div className="bg-white dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl p-5 shadow-sm flex items-center gap-4 transition-theme">
            <div className="p-3 bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 rounded-lg">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-light-text-muted dark:text-dark-text-muted">
                Sorted By
              </p>
              <h3 className="text-sm font-bold mt-1.5 capitalize">
                {sortBy === 'createdAt' ? 'Date Created' : sortBy === 'dueDate' ? 'Due Date' : sortBy} ({sortOrder === 'asc' ? 'ascending' : 'descending'})
              </h3>
            </div>
          </div>
        </div>

        {/* Filter controls search panel */}
        <SearchBar
          search={search}
          onSearchChange={setSearch}
          status={status}
          onStatusChange={(val) => handleFilterChange(setStatus, val)}
          priority={priority}
          onPriorityChange={(val) => handleFilterChange(setPriority, val)}
          sortBy={sortBy}
          onSortByChange={(val) => handleFilterChange(setSortBy, val)}
          sortOrder={sortOrder}
          onSortOrderChange={(val) => handleFilterChange(setSortOrder, val)}
        />

        {/* Content State Handler */}
        {showSkeletons ? (
          <SkeletonLoader count={6} />
        ) : tasks.length === 0 ? (
          <EmptyState
            title={debouncedSearch || status || priority ? "No tasks match your filters" : "Your board is empty"}
            message={debouncedSearch || status || priority ? "Try tweaking your search term, priority filters, or status selections." : "Get started by adding your very first task above!"}
            onActionClick={debouncedSearch || status || priority ? null : handleAddTaskClick}
          />
        ) : (
          <div className="space-y-6">
            
            {/* Grid listing */}
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity ${isFetching && !isLoading ? 'opacity-60' : 'opacity-100'}`}>
              {tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onToggleStatus={handleToggleStatus}
                  onEdit={handleEditTaskClick}
                  onDelete={handleDeleteTaskClick}
                />
              ))}
            </div>

            {/* Pagination footer */}
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              totalRecords={totalRecords}
              limit={limit}
              onPageChange={setPage}
            />

          </div>
        )}

      </main>

      {/* Confirm deletion Modal */}
      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be reversed."
        confirmText="Yes, Delete"
        isLoading={isDeleting}
      />
    </div>
  );
};

export default Dashboard;
