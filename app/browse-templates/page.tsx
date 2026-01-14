'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { getTemplatesByAppType } from '@/data/mockData';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import { TemplatePreview } from '@/components/TemplatePreview';
import { ArrowLeft, Star, ExternalLink, Check, Eye } from 'lucide-react';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function BrowseTemplatesPage() {
  const router = useRouter();
  const { selectedAppType, selectedTemplate, setTemplate } = useAppStore();
  const [templates, setTemplates] = useState<any[]>([]);
  const [previewTemplate, setPreviewTemplate] = useState<any | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    if (selectedAppType) {
      const fetchedTemplates = getTemplatesByAppType(selectedAppType.id);
      setTemplates(fetchedTemplates);
    } else {
      // 如果没有选择类型，返回首页
      router.push('/select-type');
    }
  }, [selectedAppType, router]);

  const handleSelect = (template: typeof templates[0]) => {
    setTemplate(template);
    setTimeout(() => {
      router.push('/customize');
    }, 300);
  };

  const handlePreview = (template: typeof templates[0]) => {
    setPreviewTemplate(template);
    setIsPreviewOpen(true);
  };

  if (!selectedAppType) {
    return null;
  }

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
            href="/select-type"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回上一步
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            浏览推荐模板
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            为你推荐 3 个最佳 {selectedAppType.name} 模板
          </p>
        </motion.div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className={`relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border-2 overflow-hidden transition-all duration-200 ${
                selectedTemplate?.id === template.id
                  ? 'border-purple-600 dark:border-purple-400 shadow-xl'
                  : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700'
              }`}
            >
              {selectedTemplate?.id === template.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 right-4 z-10 w-6 h-6 bg-purple-600 dark:bg-purple-400 rounded-full flex items-center justify-center"
                >
                  <Check className="w-4 h-4 text-white" />
                </motion.div>
              )}

              {/* Score Badge */}
              <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-purple-600 dark:bg-purple-400 text-white text-xs font-semibold rounded-full">
                评分 {template.score}
              </div>

              {/* Thumbnail with Preview */}
              <div className="relative h-48 bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 overflow-hidden group">
                {template.screenshot ? (
                  <Image
                    src={template.screenshot}
                    alt={template.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-6xl">{selectedAppType.icon}</div>
                  </div>
                )}
                
                {/* 预览遮罩层 */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center">
                  <button
                    onClick={() => handlePreview(template)}
                    className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200 px-4 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2 hover:bg-white dark:hover:bg-gray-800"
                  >
                    <Eye className="w-4 h-4" />
                    快速预览
                  </button>
                </div>

                {/* 在线演示按钮 */}
                {(template.demoUrl || template.previewUrl) && (
                  <a
                    href={template.demoUrl || template.previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-2 right-2 px-3 py-1.5 bg-purple-600 dark:bg-purple-500 text-white text-xs font-medium rounded-lg hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors flex items-center gap-1.5 shadow-lg"
                  >
                    <ExternalLink className="w-3 h-3" />
                    在线演示
                  </a>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  {template.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                  {template.description}
                </p>

                {/* Meta Info */}
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{template.stars.toLocaleString()}</span>
                  </div>
                  <span>{template.language}</span>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {template.features.slice(0, 3).map((feature: string) => (
                      <span
                        key={feature}
                        className="px-2 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-xs rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSelect(template)}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                  >
                    选择此模板
                  </button>
                  <button
                    onClick={() => handlePreview(template)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-1"
                    title="预览模板"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  {template.githubUrl && (
                    <a
                      href={template.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      title="查看 GitHub"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Progress Indicator */}
        <ProgressIndicator currentStep={2} />
      </div>

      {/* Preview Modal */}
      <TemplatePreview
        template={previewTemplate}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
    </div>
  );
}

