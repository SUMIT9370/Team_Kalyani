import React from 'react';
import { motion } from 'motion/react';
import { Bell, Moon, Sun, LogOut, Search, Sparkles } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export function Header() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="h-16 bg-white/70 dark:bg-gray-900/70 backdrop-blur-2xl border-b border-gray-200/50 dark:border-gray-700/50 px-4 md:px-6 flex items-center justify-between sticky top-0 z-40"
    >
      {/* Logo for mobile */}
      <div className="md:hidden flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <span className="text-gray-900 dark:text-white">ChatSum AI</span>
      </div>

      {/* Search */}
      <div className="hidden md:block flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search summaries..."
            className="pl-10 bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 rounded-xl h-10"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Theme toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className="w-10 h-10 rounded-xl bg-gray-100/50 dark:bg-gray-800/50 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 flex items-center justify-center transition-colors"
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          ) : (
            <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          )}
        </motion.button>

        {/* Notifications */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 rounded-xl bg-gray-100/50 dark:bg-gray-800/50 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 flex items-center justify-center transition-colors relative"
        >
          <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full" />
        </motion.button>

        {/* User menu */}
        <div className="flex items-center gap-3 ml-2">
          <Avatar>
            <AvatarImage src={user?.avatar} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              {user?.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:block">
            <p className="text-gray-900 dark:text-white">{user?.name}</p>
            <p className="text-gray-500 dark:text-gray-400">{user?.email}</p>
          </div>
        </div>

        {/* Logout */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={logout}
          className="w-10 h-10 rounded-xl bg-red-100/50 dark:bg-red-900/20 hover:bg-red-200/50 dark:hover:bg-red-900/30 flex items-center justify-center transition-colors"
        >
          <LogOut className="w-5 h-5 text-red-600 dark:text-red-400" />
        </motion.button>
      </div>
    </motion.header>
  );
}