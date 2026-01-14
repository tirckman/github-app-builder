import { create } from 'zustand';
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

export const useAppStore = create<AppStore>((set) => ({
  ...initialState,
  
  setAppType: (appType) => set({ selectedAppType: appType }),
  
  setTemplate: (template) => set({ selectedTemplate: template }),
  
  setCustomization: (customization) => set({ customization }),
  
  setDeployUrl: (url) => set({ deployUrl: url }),
  
  setDeployStatus: (status) => set({ deployStatus: status }),
  
  reset: () => set(initialState),
}));

