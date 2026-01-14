'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { appTypes } from '@/data/mockData';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import { ArrowLeft, Check } from 'lucide-react';

export default function SelectTypePage() {
  const router = useRouter();
  const { selectedAppType, setAppType } = useAppStore();

  const handleSelect = (appType: typeof appTypes[0]) => {
    setAppType(appType);
    // 延迟跳转，让用户看到选中效果
    setTimeout(() => {
      router.push('/browse-templates');
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            选择应用类型
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            你想创建什么类型的应用？
          </p>
        </motion.div>

        {/* App Types Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {appTypes.map((appType, index) => (
            <motion.button
              key={appType.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(appType)}
              className={`relative p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border-2 transition-all duration-200 text-left ${
                selectedAppType?.id === appType.id
                  ? 'border-purple-600 dark:border-purple-400 shadow-xl'
                  : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700'
              }`}
            >
              {selectedAppType?.id === appType.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 right-4 w-6 h-6 bg-purple-600 dark:bg-purple-400 rounded-full flex items-center justify-center"
                >
                  <Check className="w-4 h-4 text-white" />
                </motion.div>
              )}
              
              <div className="text-4xl mb-4">{appType.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                {appType.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {appType.description}
              </p>
            </motion.button>
          ))}
        </div>

        {/* Progress Indicator */}
        <ProgressIndicator currentStep={1} />
      </div>
    </div>
  );
}

