import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import toast from 'react-hot-toast';

/**
 * Custom React Query hook to manage task requests and state
 */
export const useTasks = (filters = {}) => {
  const queryClient = useQueryClient();

  // 1. Get tasks query
  const tasksQuery = useQuery({
    queryKey: ['tasks', filters],
    queryFn: async () => {
      const response = await api.get('/tasks', { params: filters });
      return response.data.data; // Structure: { tasks, totalPages, currentPage, totalRecords }
    },
    placeholderData: (previousData) => previousData, // Keeps old list visible during page changes/loading
  });

  // 2. Create task mutation
  const createTaskMutation = useMutation({
    mutationFn: async (taskData) => {
      const response = await api.post('/tasks', taskData);
      return response.data.data;
    },
    onSuccess: () => {
      toast.success('Task created successfully!');
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to create task';
      toast.error(message);
    },
  });

  // 3. Update task mutation
  const updateTaskMutation = useMutation({
    mutationFn: async ({ id, taskData }) => {
      const response = await api.put(`/tasks/${id}`, taskData);
      return response.data.data;
    },
    onSuccess: () => {
      toast.success('Task updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to update task';
      toast.error(message);
    },
  });

  // 4. Delete task mutation
  const deleteTaskMutation = useMutation({
    mutationFn: async (id) => {
      const response = await api.delete(`/tasks/${id}`);
      return response.data.data;
    },
    onSuccess: () => {
      toast.success('Task deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to delete task';
      toast.error(message);
    },
  });

  // 5. Toggle task status mutation
  const toggleStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const response = await api.patch(`/tasks/${id}/status`, { status });
      return response.data.data;
    },
    onSuccess: (updatedTask) => {
      toast.success(`Task marked as ${updatedTask.status}`);
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to toggle status';
      toast.error(message);
    },
  });

  return {
    tasksQuery,
    createTask: createTaskMutation.mutateAsync,
    isCreating: createTaskMutation.isPending,
    updateTask: updateTaskMutation.mutateAsync,
    isUpdating: updateTaskMutation.isPending,
    deleteTask: deleteTaskMutation.mutateAsync,
    isDeleting: deleteTaskMutation.isPending,
    toggleStatus: toggleStatusMutation.mutateAsync,
    isToggling: toggleStatusMutation.isPending,
  };
};

/**
 * Custom React Query hook to fetch a single task by ID
 */
export const useTask = (id) => {
  return useQuery({
    queryKey: ['task', id],
    queryFn: async () => {
      if (!id) return null;
      const response = await api.get(`/tasks/${id}`);
      return response.data.data;
    },
    enabled: !!id,
  });
};

export default useTasks;
