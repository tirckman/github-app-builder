# GitHub App Builder

> 一个智能应用生成平台，让普通人（不懂编程的人）通过简单的对话和选择，就能快速创建应用。

## 📚 项目文档

- **[项目路线图](./PROJECT_ROADMAP.md)** - 完整的项目规划和功能清单
- **[项目状态](./PROJECT_STATUS.md)** - 快速查看当前进度
- **[部署指南](./DEPLOYMENT_GUIDE.md)** - 完整的部署和配置指南
- **[快速开始](./QUICK_START.md)** - 5分钟快速部署
- **[测试指南](./TESTING_GUIDE.md)** - 功能测试清单

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

## 📊 项目状态

**Web端进度**：95% ✅
**桌面端进度**：0% ⏳

**当前阶段**：Web端优化和完善

> 查看 [PROJECT_STATUS.md](./PROJECT_STATUS.md) 获取最新状态

## 🎯 核心功能

### Web端（快速模式）

- ✅ 完整的用户流程（5个核心页面）
- ✅ 模板预览功能
- ✅ 智能推荐系统
- ✅ AI问答助手
- ✅ 一键部署功能

### 桌面端（定制模式）

- ⏳ 等待Web端完成后开始
- 规划中：Electron + VS Code集成
- 规划中：可视化设计工具
- 规划中：深度定制功能

## 🛠️ 技术栈

### Web端
- **框架**：Next.js 16.1.1 (App Router)
- **语言**：TypeScript
- **样式**：Tailwind CSS
- **状态管理**：Zustand
- **动画**：Framer Motion
- **UI组件**：shadcn/ui

### 桌面端（规划中）
- **框架**：Electron
- **编辑器**：Monaco Editor (VS Code核心)
- **UI框架**：React + Tailwind CSS
- **设计工具**：Excalidraw（嵌入式）
- **终端**：xterm.js

## 📁 项目结构

```
github-app-builder/
├── app/                    # Next.js页面
│   ├── page.tsx           # 首页
│   ├── select-type/       # 选择类型
│   ├── browse-templates/  # 浏览模板
│   ├── customize/         # 定制化
│   └── deploy/            # 部署
├── components/            # React组件
│   ├── AIAssistant.tsx    # AI助手
│   ├── TemplatePreview.tsx # 模板预览
│   └── ...
├── data/                  # 数据文件
│   ├── mockData.ts        # 模拟数据
│   └── recommendations.ts # 推荐数据
├── lib/                   # 工具库
│   └── aiKnowledge.ts     # AI知识库
├── store/                 # 状态管理
│   └── useAppStore.ts     # Zustand store
├── types/                 # 类型定义
│   └── index.ts
├── PROJECT_ROADMAP.md     # 项目路线图（重要！）
└── PROJECT_STATUS.md      # 项目状态（重要！）
```

## 📝 开发规范

1. **完成功能后**：在 `PROJECT_ROADMAP.md` 中标记 ✅
2. **更新进度**：修改 `PROJECT_STATUS.md`
3. **重要决策**：记录在路线图中
4. **不要跳跃**：按阶段顺序开发

## 🎯 开发路线

1. **Web端完善**（当前阶段）
   - 优化AI助手
   - 扩展知识库
   - 性能优化
   - 测试和修复

2. **桌面端开发**（Web端完成后）
   - Electron框架搭建
   - VS Code集成
   - 可视化设计工具
   - AI深度集成

## 📖 详细文档

查看 [PROJECT_ROADMAP.md](./PROJECT_ROADMAP.md) 获取：
- 完整的功能清单
- 开发阶段规划
- 桌面端详细计划
- 技术实现方案

## 🤝 贡献指南

1. 查看 `PROJECT_ROADMAP.md` 了解当前任务
2. 选择未完成的功能
3. 开发完成后标记 ✅
4. 更新 `PROJECT_STATUS.md`

## 📄 License

MIT

---

**记住**：每次完成功能后，记得在 `PROJECT_ROADMAP.md` 中标记 ✅！
