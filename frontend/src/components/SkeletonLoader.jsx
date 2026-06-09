import React from 'react';

/**
 * Reusable premium skeleton placeholders for tasks list
 */
const SkeletonLoader = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl p-5 shadow-sm space-y-4 animate-pulse"
        >
          {/* Header Row (Priority and Due Date) */}
          <div className="flex justify-between items-center">
            <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
            <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded"></div>
          </div>

          {/* Title Placeholder */}
          <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-700 rounded mt-2"></div>

          {/* Description Placeholder */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded"></div>
            <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-700 rounded"></div>
          </div>

          <hr className="border-light-border dark:border-dark-border" />

          {/* Footer Controls Placeholder */}
          <div className="flex justify-between items-center pt-2">
            {/* Status toggle checkbox mock */}
            <div className="flex items-center space-x-2">
              <div className="h-5 w-5 bg-slate-200 dark:bg-slate-700 rounded"></div>
              <div className="h-4 w-12 bg-slate-200 dark:bg-slate-700 rounded"></div>
            </div>

            {/* Actions button mocks */}
            <div className="flex space-x-3">
              <div className="h-8 w-8 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
              <div className="h-8 w-8 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
