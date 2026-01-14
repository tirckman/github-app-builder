# 🚀 部署步骤指南

## ✅ 已完成
- ✅ Git仓库已初始化
- ✅ 代码已提交（49个文件，12433行代码）

## 📋 下一步操作

### 步骤1：创建GitHub仓库（2分钟）

1. 访问：https://github.com/new
2. 填写仓库信息：
   - **Repository name**: `github-app-builder`
   - **Description**: `智能应用生成平台 - 让普通人3分钟创建应用`
   - **Visibility**: 选择 Public 或 Private
   - **不要**勾选 "Initialize this repository with a README"（我们已经有了）
3. 点击 "Create repository"

### 步骤2：推送代码到GitHub（1分钟）

在项目目录执行以下命令（**替换 YOUR_USERNAME 为你的GitHub用户名**）：

```powershell
# 添加远程仓库
git remote add origin https://github.com/YOUR_USERNAME/github-app-builder.git

# 推送代码
git push -u origin main
```

**或者使用SSH（如果你配置了SSH密钥）：**
```powershell
git remote add origin git@github.com:YOUR_USERNAME/github-app-builder.git
git push -u origin main
```

### 步骤3：部署到Vercel（2分钟）

1. 访问：https://vercel.com
2. 使用GitHub账号登录
3. 点击 "Add New..." → "Project"
4. 选择你的 `github-app-builder` 仓库
5. 点击 "Import"
6. **配置项目**：
   - Framework Preset: Next.js（自动检测）
   - Root Directory: `./`（默认）
   - Build Command: `npm run build`（默认）
   - Output Directory: `.next`（默认）
7. 点击 "Deploy"
8. 等待2-3分钟完成部署

### 步骤4：配置GitHub OAuth（3分钟）

1. **获取Vercel部署URL**
   - 部署完成后，Vercel会给你一个URL，例如：`https://github-app-builder-xxx.vercel.app`

2. **创建GitHub OAuth App**
   - 访问：https://github.com/settings/developers
   - 点击 "New OAuth App"
   - 填写信息：
     - **Application name**: `GitHub App Builder`
     - **Homepage URL**: `https://your-project.vercel.app`（使用你的Vercel URL）
     - **Authorization callback URL**: `https://your-project.vercel.app/api/auth/github/callback`
   - 点击 "Register application"
   - **复制 Client ID 和 Client Secret**

3. **在Vercel配置环境变量**
   - 在Vercel项目页面，点击 "Settings" → "Environment Variables"
   - 添加以下变量：
     ```
     NEXT_PUBLIC_GITHUB_CLIENT_ID = 你的ClientID
     GITHUB_CLIENT_SECRET = 你的ClientSecret
     NEXT_PUBLIC_APP_URL = https://your-project.vercel.app
     ```
   - 点击 "Save"
   - **重要**：点击 "Redeploy" 使环境变量生效

### 步骤5：测试部署（2分钟）

1. 访问你的Vercel URL
2. 测试完整流程：
   - ✅ 首页加载正常
   - ✅ 选择应用类型
   - ✅ 浏览模板
   - ✅ 定制化配置
   - ✅ GitHub OAuth登录
   - ✅ 创建仓库
   - ✅ 部署到Vercel

## 🎉 完成！

现在你的应用已经：
- ✅ 部署到Vercel
- ✅ GitHub OAuth已配置
- ✅ 可以正常使用

## 📝 后续优化

- [ ] 配置自定义域名
- [ ] 添加更多模板
- [ ] 优化性能
- [ ] 添加分析工具

## ❓ 遇到问题？

查看 `DEPLOYMENT_GUIDE.md` 获取详细帮助。

