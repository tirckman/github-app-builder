import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppType, Template, CustomizationConfig, BuildState } from '@/types';

interface AppStore extends BuildState {
  // Actions
  setAppType: (appType: AppType) => void;
  setTemplate: (template: Template) => void;
  setCustomization: (customization: CustomizationConfig) => void;
  setDeployUrl: (url: string) => void;
  setDeployStatus: (status: BuildState['deployStatus']) => void;
  reset: () => void;
}

const initialState: BuildState = {
  selectedAppType: null,
  selectedTemplate: null,
  customization: null,
  deployUrl: null,
  deployStatus: 'idle',
};

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      ...initialState,
      
      setAppType: (appType) => set({ selectedAppType: appType }),
      
      setTemplate: (template) => set({ selectedTemplate: template }),
      
      setCustomization: (customization) => set({ customization }),
      
      setDeployUrl: (url) => set({ deployUrl: url }),
      
      setDeployStatus: (status) => set({ deployStatus: status }),
      
      reset: () => set(initialState),
    }),
    {
      name: 'github-app-builder-storage', // localStorage key
      // 只持久化关键状态，不持久化部署状态（因为部署状态是临时的）
      partialize: (state) => ({
        selectedAppType: state.selectedAppType,
        selectedTemplate: state.selectedTemplate,
        customization: state.customization,
        // deployUrl 和 deployStatus 不持久化
      }),
      // 跳过hydration，避免SSR/CSR不匹配
      skipHydration: true,
    }
  )
);

