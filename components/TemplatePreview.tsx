'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { X, ExternalLink, Maximize2, Minimize2, Loader2 } from 'lucide-react';
import type { Template } from '@/types';

interface TemplatePreviewProps {
  template: Template | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TemplatePreview({ template, isOpen, onClose }: TemplatePreviewProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (isOpen && template) {
      setIsLoading(true);
      setLoadError(false);
    }
  }, [isOpen, template]);

  // 如果模板不存在或未打开，不渲染
  if (!template || !isOpen) return null;

  const demoUrl = template.demoUrl || template.previewUrl;

  const handleLoad = () => {
    setIsLoading(false);
    setLoadError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setLoadError(true);
  };

  // 检测iframe是否被阻止加载（X-Frame-Options）
  useEffect(() => {
    if (!isOpen || !demoUrl) return;

    // 设置超时检测，如果5秒后还在加载，可能是被阻止了
    const timeout = setTimeout(() => {
      if (isLoading) {
        // 超时后仍然在加载，可能是被X-Frame-Options阻止
        setLoadError(true);
        setIsLoading(false);
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [isOpen, demoUrl, isLoading]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 遮罩层 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* 预览窗口 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`fixed z-50 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
              isFullscreen 
                ? 'inset-0 rounded-none' 
                : 'inset-4 md:inset-8 lg:inset-16'
            }`}
          >
            {/* 头部 */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {template.name}
                </h3>
                {demoUrl && (
                  <a
                    href={demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    在新窗口打开
                  </a>
                )}
              </div>
              <div className="flex items-center gap-2">
                {/* 全屏切换按钮 */}
                <button
                  onClick={toggleFullscreen}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  title={isFullscreen ? '退出全屏' : '全屏'}
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  ) : (
                    <Maximize2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  )}
                </button>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>

            {/* 预览内容 */}
            <div className="flex-1 overflow-hidden relative bg-gray-100 dark:bg-gray-900">
              {isLoading && !loadError && (
                <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-800 z-10">
                  <div className="text-center">
                    <Loader2 className="w-8 h-8 text-purple-600 dark:text-purple-400 animate-spin mx-auto mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">正在加载预览...</p>
                  </div>
                </div>
              )}
              
              {loadError ? (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
                  <div className="text-center p-8 max-w-md">
                    <div className="text-6xl mb-4">🚫</div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      无法在预览窗口中加载
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      该网站不允许在iframe中嵌入。请点击下方按钮在新窗口中打开查看。
                    </p>
                    <div className="flex flex-col gap-3 items-center">
                      {demoUrl && (
                        <a
                          href={demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                        >
                          <ExternalLink className="w-5 h-5" />
                          在新窗口打开预览
                        </a>
                      )}
                      {template.githubUrl && (
                        <a
                          href={template.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <ExternalLink className="w-5 h-5" />
                          查看 GitHub 仓库
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ) : demoUrl ? (
                <iframe
                  src={demoUrl}
                  className="w-full h-full border-0"
                  title={`${template.name} 预览`}
                  onLoad={handleLoad}
                  onError={handleError}
                  style={{ display: isLoading || loadError ? 'none' : 'block' }}
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
                  <div className="text-center p-8">
                    <div className="text-6xl mb-4">🖼️</div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      暂无在线演示
                    </p>
                    {template.githubUrl && (
                      <a
                        href={template.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        查看 GitHub 仓库
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* 底部信息 */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
              <div className="flex items-center justify-between text-sm flex-wrap gap-2">
                <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 flex-wrap">
                  {template.author && <span>作者: {template.author}</span>}
                  {template.language && <span>语言: {template.language}</span>}
                  {template.stars && <span>⭐ {template.stars.toLocaleString()}</span>}
                </div>
                <div className="flex gap-2 flex-wrap">
                  {template.features && Array.isArray(template.features) && template.features.slice(0, 3).map((feature: string, index: number) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
