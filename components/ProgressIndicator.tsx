'use client';

import { motion } from 'framer-motion';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps?: number;
}

const steps = [
  { number: 1, label: '选择类型' },
  { number: 2, label: '浏览模板' },
  { number: 3, label: '定制化' },
  { number: 4, label: '预览' },
  { number: 5, label: '部署' },
];

export function ProgressIndicator({ currentStep, totalSteps = 5 }: ProgressIndicatorProps) {
  return (
    <div className="mt-12 text-center">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full border border-gray-200 dark:border-gray-700">
        {steps.slice(0, totalSteps).map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ scale: 0.8 }}
            animate={{ scale: index < currentStep ? 1.2 : 1 }}
            className="flex items-center gap-2"
          >
            <div
              className={`w-2 h-2 rounded-full transition-all ${
                index < currentStep
                  ? 'bg-purple-600 dark:bg-purple-400'
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
            {index < totalSteps - 1 && (
              <div
                className={`w-8 h-0.5 ${
                  index < currentStep - 1
                    ? 'bg-purple-600 dark:bg-purple-400'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            )}
          </motion.div>
        ))}
        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
          步骤 {currentStep} / {totalSteps}
        </span>
      </div>
    </div>
  );
}

