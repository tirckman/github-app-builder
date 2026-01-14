'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import { ComponentRecommendations } from '@/components/ComponentRecommendations';
import { useState, useEffect } from 'react';
import { ArrowLeft, Palette, Settings, Eye } from 'lucide-react';

export default function CustomizePage() {
  const router = useRouter();
  const { selectedTemplate, selectedAppType, customization, setCustomization } = useAppStore();
  const [colors, setColors] = useState({
    primary: '#8b5cf6',
    secondary: '#6366f1',
    accent: '#ec4899',
  });
  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);

  useEffect(() => {
    if (!selectedTemplate) {
      router.push('/browse-templates');
    }
    // 初始化已选组件（包含所有必需组件）
    if (selectedAppType) {
      const requiredComponents = selectedComponents.filter((id) => {
        // 这里应该从推荐数据中获取必需组件
        return true; // 暂时全部包含
      });
      setSelectedComponents(requiredComponents);
    }
  }, [selectedTemplate, selectedAppType, router]);

  const handleColorChange = (key: string, value: string) => {
    const newColors = { ...colors, [key]: value };
    setColors(newColors);
    setCustomization({
      colors: newColors,
      features: {
        ...customization?.features,
        selectedComponents: selectedComponents,
      },
      settings: {},
    });
  };

  const handleToggleComponent = (componentId: string) => {
    setSelectedComponents((prev) => {
      const newComponents = prev.includes(componentId)
        ? prev.filter((id) => id !== componentId)
        : [...prev, componentId];
      return newComponents;
    });
  };

  // 同步组件选择到定制化配置
  useEffect(() => {
    if (selectedComponents.length > 0 || Object.keys(colors).length > 0) {
      setCustomization({
        colors: colors,
        features: {
          selectedComponents: selectedComponents,
        },
        settings: {},
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedComponents, colors]);

  const handleDeploy = () => {
    router.push('/deploy');
  };

  if (!selectedTemplate) {
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
            href="/browse-templates"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回上一步
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            定制化配置
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            调整颜色和功能，实时预览效果
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto space-y-8">
          {/* Component Recommendations */}
          {selectedAppType && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 p-6"
            >
              <ComponentRecommendations
                appTypeId={selectedAppType.id}
                selectedComponents={selectedComponents}
                onToggleComponent={handleToggleComponent}
              />
            </motion.div>
          )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Customization Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Color Customization */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Palette className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  颜色配置
                </h2>
              </div>
              
              <div className="space-y-4">
                {Object.entries(colors).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 capitalize">
                      {key}
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={value}
                        onChange={(e) => handleColorChange(key, e.target.value)}
                        className="w-16 h-16 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handleColorChange(key, e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Settings className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  功能配置
                </h2>
              </div>
              
              <div className="space-y-3">
                {selectedTemplate.features.map((feature: string) => (
                  <label
                    key={feature}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-5 h-5 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                    />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </label>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Preview Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="sticky top-8 h-fit"
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Eye className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  实时预览
                </h2>
              </div>
              
              {/* Preview Box */}
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                <div
                  className="rounded-lg p-6 text-white"
                  style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
                >
                  <h3 className="text-2xl font-bold mb-2">{selectedTemplate.name}</h3>
                  <p className="text-white/90 mb-4">{selectedTemplate.description}</p>
                  <div className="flex gap-2">
                    <div
                      className="px-4 py-2 rounded-lg text-sm font-medium"
                      style={{ backgroundColor: colors.accent }}
                    >
                      按钮示例
                    </div>
                  </div>
                </div>
              </div>

              {/* Deploy Button */}
              <button
                onClick={handleDeploy}
                className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                确认并部署
              </button>
            </div>
          </motion.div>
        </div>
        </div>

        {/* Progress Indicator */}
        <ProgressIndicator currentStep={3} />
      </div>
    </div>
  );
}

