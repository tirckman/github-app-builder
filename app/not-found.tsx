'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          className="text-8xl mb-6"
        >
          404
        </motion.div>

        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          页面未找到
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mb-8">
          抱歉，你访问的页面不存在
        </p>

        <div className="flex gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <Home className="w-4 h-4" />
            返回首页
          </Link>

          <Link
            href="/select-type"
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Search className="w-4 h-4" />
            开始创建
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

