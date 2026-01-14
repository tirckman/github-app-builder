'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Sparkles, Zap, Rocket } from 'lucide-react';
import { getRecommendationsByAppType } from '@/data/recommendations';
import type { RecommendedComponent } from '@/data/recommendations';
import { useState } from 'react';

interface ComponentRecommendationsProps {
  appTypeId: string;
  selectedComponents: string[];
  onToggleComponent: (componentId: string) => void;
}

export function ComponentRecommendations({
  appTypeId,
  selectedComponents,
  onToggleComponent,
}: ComponentRecommendationsProps) {
  const recommendations = getRecommendationsByAppType(appTypeId);

  if (recommendations.length === 0) {
    return null;
  }

  const essential = recommendations.filter((c) => c.category === 'essential');
  const recommended = recommendations.filter((c) => c.category === 'recommended');
  const advanced = recommendations.filter((c) => c.category === 'advanced');

  const renderCategory = (
    title: string,
    components: RecommendedComponent[],
    icon: React.ReactNode,
    color: string
  ) => {
    if (components.length === 0) return null;

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          {icon}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h3>
        </div>
        <div className="space-y-3">
          {components.map((component) => {
            const isSelected = selectedComponents.includes(component.id);
            const isRequired = component.required;

            return (
              <motion.div
                key={component.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`p-4 rounded-lg border-2 transition-all ${
                  isSelected || isRequired
                    ? `${color} border-opacity-50`
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700'
                }`}
              >
                <label className="flex items-start gap-3 cursor-pointer">
                  <div className="mt-0.5">
                    {isRequired ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                    ) : (
                      <button
                        onClick={() => !isRequired && onToggleComponent(component.id)}
                        className="focus:outline-none"
                      >
                        {isSelected ? (
                          <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        {component.name}
                      </span>
                      {isRequired && (
                        <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded">
                          已包含
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {component.description}
                    </p>
                  </div>
                </label>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
          为你的应用推荐以下功能
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          根据你的应用类型，我们为你推荐了这些常用组件。你可以选择需要的功能。
        </p>
      </div>

      {renderCategory(
        '✅ 必备组件',
        essential,
        <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />,
        'bg-green-50 dark:bg-green-900/10'
      )}

      {renderCategory(
        '⭐ 推荐添加',
        recommended,
        <Sparkles className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />,
        'bg-yellow-50 dark:bg-yellow-900/10'
      )}

      {renderCategory(
        '🚀 进阶功能',
        advanced,
        <Rocket className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
        'bg-purple-50 dark:bg-purple-900/10'
      )}
    </div>
  );
}

