# 快速开始指南

> 5分钟快速部署到Vercel

## 🚀 快速部署步骤

### 1. 推送代码到GitHub（2分钟）

```bash
# 在项目根目录
git init
git add .
git commit -m "feat: MVP完成"
git branch -M main

# 在GitHub创建新仓库：https://github.com/new
# 仓库名：github-app-builder
# 然后执行：
git remote add origin https://github.com/YOUR_USERNAME/github-app-builder.git
git push -u origin main
```

### 2. 部署到Vercel（1分钟）

1. 访问：https://vercel.com
2. 点击 "Add New..." → "Project"
3. 选择你的 `github-app-builder` 仓库
4. 点击 "Import" → "Deploy"
5. 等待2-3分钟完成

### 3. 配置GitHub OAuth（2分钟）

1. 访问：https://github.com/settings/developers
2. 点击 "New OAuth App"
3. 填写：
   - Application name: `GitHub App Builder`
   - Homepage URL: `https://your-project.vercel.app`
   - Callback URL: `https://your-project.vercel.app/api/auth/github/callback`
4. 复制 Client ID 和 Client Secret

### 4. 配置环境变量（1分钟）

在Vercel项目设置中添加：
- `NEXT_PUBLIC_GITHUB_CLIENT_ID` = 你的ClientID
- `GITHUB_CLIENT_SECRET` = 你的ClientSecret
- `NEXT_PUBLIC_APP_URL` = https://your-project.vercel.app

### 5. 重新部署

在Vercel控制台点击 "Redeploy"

---

## ✅ 完成！

现在可以：
- ✅ 访问你的网站
- ✅ 测试GitHub OAuth
- ✅ 测试完整部署流程

---

## 📚 详细文档

查看 `DEPLOYMENT_GUIDE.md` 获取完整部署指南。

