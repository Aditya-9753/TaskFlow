import React from 'react';
import { Search, Filter, ArrowUpDown } from 'lucide-react';

/**
 * Filter panel for searching, filtering by status/priority, and sorting tasks
 */
const SearchBar = ({
  search,
  onSearchChange,
  status,
  onStatusChange,
  priority,
  onPriorityChange,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderChange,
}) => {
  return (
    <div className="bg-white dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl p-5 shadow-sm space-y-4 transition-theme">
      
      {/* Search Input Row */}
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search tasks by title or description..."
          className="w-full pl-10 pr-4 py-2.5 border border-light-border dark:border-dark-border bg-slate-50 dark:bg-slate-900/40 text-light-text-main dark:text-dark-text-main rounded-lg focus:bg-white dark:focus:bg-transparent transition-theme text-sm"
        />
        <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-light-text-muted dark:text-dark-text-muted" />
      </div>

      {/* Filter and Sort Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Status Filter */}
        <div className="flex flex-col">
          <label className="text-[11px] font-bold uppercase tracking-wider text-light-text-muted dark:text-dark-text-muted mb-1.5 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            Status
          </label>
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="px-3 py-2 border border-light-border dark:border-dark-border bg-white dark:bg-dark-card text-light-text-main dark:text-dark-text-main rounded-lg transition-theme text-sm cursor-pointer"
          >
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Priority Filter */}
        <div className="flex flex-col">
          <label className="text-[11px] font-bold uppercase tracking-wider text-light-text-muted dark:text-dark-text-muted mb-1.5 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            Priority
          </label>
          <select
            value={priority}
            onChange={(e) => onPriorityChange(e.target.value)}
            className="px-3 py-2 border border-light-border dark:border-dark-border bg-white dark:bg-dark-card text-light-text-main dark:text-dark-text-main rounded-lg transition-theme text-sm cursor-pointer"
          >
            <option value="">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Sort By Field */}
        <div className="flex flex-col">
          <label className="text-[11px] font-bold uppercase tracking-wider text-light-text-muted dark:text-dark-text-muted mb-1.5 flex items-center gap-1">
            <ArrowUpDown className="w-3 h-3" />
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
            className="px-3 py-2 border border-light-border dark:border-dark-border bg-white dark:bg-dark-card text-light-text-main dark:text-dark-text-main rounded-lg transition-theme text-sm cursor-pointer"
          >
            <option value="createdAt">Date Created</option>
            <option value="dueDate">Due Date</option>
            <option value="title">Title</option>
            <option value="priority">Priority</option>
          </select>
        </div>

        {/* Sort Order */}
        <div className="flex flex-col">
          <label className="text-[11px] font-bold uppercase tracking-wider text-light-text-muted dark:text-dark-text-muted mb-1.5 flex items-center gap-1">
            <ArrowUpDown className="w-3 h-3" />
            Order
          </label>
          <select
            value={sortOrder}
            onChange={(e) => onSortOrderChange(e.target.value)}
            className="px-3 py-2 border border-light-border dark:border-dark-border bg-white dark:bg-dark-card text-light-text-main dark:text-dark-text-main rounded-lg transition-theme text-sm cursor-pointer"
          >
            <option value="desc">Newest First / Descending</option>
            <option value="asc">Oldest First / Ascending</option>
          </select>
        </div>

      </div>

    </div>
  );
};

export default SearchBar;
