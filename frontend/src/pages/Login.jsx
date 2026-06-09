import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CheckSquare, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

/**
 * Screen containing user sign in form and auth validation
 */
const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      toast.success('Logged in successfully!');
      navigate('/');
    } catch (error) {
      toast.error(error || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg transition-theme px-4 relative overflow-hidden">
      
      {/* Background Decorative Blur Blobs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-indigo-400/20 dark:bg-indigo-600/10 rounded-full blur-3xl animate-[pulse_6s_infinite]"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-cyan-400/20 dark:bg-cyan-600/10 rounded-full blur-3xl animate-[pulse_4s_infinite]"></div>

      {/* Login Card */}
      <div className="w-full max-w-md glass-panel rounded-2xl shadow-xl p-8 z-10 transition-theme border border-white/20">
        
        {/* Header Branding */}
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 bg-brand-primary rounded-xl text-white shadow-lg shadow-brand-primary/20 mb-3 animate-float">
            <CheckSquare className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
            TaskFlow
          </h1>
          <p className="text-sm text-light-text-muted dark:text-dark-text-muted mt-2">
            Welcome back! Log in to manage your tasks.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          
          {/* Email input field */}
          <div>
            <label className="block text-sm font-semibold text-light-text-main dark:text-dark-text-main mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="you@example.com"
                className={`w-full pl-10 pr-4 py-2.5 border rounded-lg bg-transparent text-light-text-main dark:text-dark-text-main transition-theme ${
                  errors.email
                    ? 'border-red-500 focus:ring-red-500/20'
                    : 'border-light-border dark:border-dark-border'
                }`}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                disabled={isLoading}
              />
              <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-light-text-muted dark:text-dark-text-muted" />
            </div>
            {errors.email && (
              <span className="flex items-center gap-1 mt-1 text-xs text-red-500 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password input field */}
          <div>
            <label className="block text-sm font-semibold text-light-text-main dark:text-dark-text-main mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className={`w-full pl-10 pr-10 py-2.5 border rounded-lg bg-transparent text-light-text-main dark:text-dark-text-main transition-theme ${
                  errors.password
                    ? 'border-red-500 focus:ring-red-500/20'
                    : 'border-light-border dark:border-dark-border'
                }`}
                {...register('password', {
                  required: 'Password is required',
                })}
                disabled={isLoading}
              />
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-light-text-muted dark:text-dark-text-muted" />
              
              {/* Toggle reveal password */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-light-text-muted hover:text-light-text-main dark:text-dark-text-muted dark:hover:text-dark-text-main transition cursor-pointer"
                disabled={isLoading}
                tabIndex="-1"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <span className="flex items-center gap-1 mt-1 text-xs text-red-500 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-brand-primary hover:bg-brand-primary-hover text-white font-bold rounded-lg shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 mt-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <span>Sign In</span>
            )}
          </button>

        </form>

        {/* Footer Navigation Link */}
        <p className="text-center text-sm text-light-text-muted dark:text-dark-text-muted mt-6">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="font-bold text-brand-primary hover:text-brand-primary-hover hover:underline transition"
          >
            Register here
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;
