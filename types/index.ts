// 应用类型
export type AppType = {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
};

// 模板
export type Template = {
  id: string;
  name: string;
  description: string;
  author: string;
  stars: number;
  language: string;
  githubUrl: string;
  previewUrl?: string; // 在线演示地址
  demoUrl?: string; // 演示地址（同previewUrl，为了兼容）
  thumbnail?: string; // 缩略图URL
  screenshot?: string; // 截图URL
  features: string[];
  tags: string[];
  score: number; // 评分 0-100
  isMock?: boolean; // 标记是否为模拟数据
};

// 定制化配置
export type CustomizationConfig = {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  features: {
    [key: string]: boolean | string[] | undefined;
  };
  settings: {
    [key: string]: any;
  };
};

// 应用构建状态
export type BuildState = {
  selectedAppType: AppType | null;
  selectedTemplate: Template | null;
  customization: CustomizationConfig | null;
  deployUrl: string | null;
  deployStatus: 'idle' | 'building' | 'deploying' | 'success' | 'error';
};

