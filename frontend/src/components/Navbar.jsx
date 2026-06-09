import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, LogOut, CheckSquare } from 'lucide-react';

/**
 * Reusable main navbar with app logo, theme toggler, user info, and logout
 */
const Navbar = () => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 dark:bg-dark-card/80 border-b border-light-border dark:border-dark-border backdrop-blur-md transition-theme">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo & Branding */}
          <div className="flex items-center gap-2">
            <div className="p-2 bg-brand-primary rounded-lg text-white">
              <CheckSquare className="w-6 h-6" />
            </div>
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              TaskFlow
            </span>
          </div>

          {/* User Controls */}
          {user && (
            <div className="flex items-center gap-4">
              
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-light-text-main dark:text-dark-text-main rounded-lg transition-theme"
                aria-label="Toggle dark/light theme"
              >
                {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
              </button>

              {/* User Identity Info */}
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-sm font-bold text-light-text-main dark:text-dark-text-main">
                  {user.name}
                </span>
                <span className="text-xs text-light-text-muted dark:text-dark-text-muted truncate max-w-[150px]">
                  {user.email}
                </span>
              </div>

              {/* Avatar circle */}
              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-brand-primary font-bold text-sm border border-brand-primary/20">
                {user.name.charAt(0).toUpperCase()}
              </div>

              <hr className="h-6 w-[1px] border-r border-light-border dark:border-dark-border" />

              {/* Logout Button */}
              <button
                onClick={logout}
                className="flex items-center gap-1.5 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg font-semibold transition"
                aria-label="Logout account"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>

            </div>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
// Use default export
