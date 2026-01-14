'use client';

import { motion } from 'framer-motion';
import { Globe, Monitor, Zap, Code } from 'lucide-react';
import Link from 'next/link';

export function ModeSelector() {
  return (
    <div className="bg-gradient-to-r from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900/50 dark:via-gray-800/50 rounded-2xl border-2 border-purple-200 dark:border-purple-800 p-6 mb-8">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <Zap className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
            选择你的开发模式
          </h3>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            {/* Web端 - 快速模式 */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-gray-800 rounded-xl border-2 border-purple-300 dark:border-purple-700 p-4"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                    Web端 - 快速模式
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    当前模式
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                ✅ 简单业务生成和部署<br />
                ✅ 3分钟快速上线<br />
                ✅ 无需下载，浏览器即可使用
              </p>
              <div className="px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-lg inline-block">
                适合：博客、待办、作品集等简单应用
              </div>
            </motion.div>

            {/* 桌面端 - 定制模式 */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-4"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <Monitor className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                    桌面端 - 定制模式
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    即将推出
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                🎨 可视化设计工具<br />
                💻 深度自定义开发<br />
                🔧 完整代码编辑器
              </p>
              <div className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-lg inline-block">
                适合：复杂业务、深度定制、专业开发
              </div>
              <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                💡 需要自定义开发？请下载桌面端客户端
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

