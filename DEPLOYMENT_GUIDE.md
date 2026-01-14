# 部署指南

> 完整的部署和配置指南

## 📋 部署前准备

### 1. 推送代码到GitHub

```bash
# 在项目根目录执行

# 初始化Git（如果还没有）
git init

# 添加所有文件
git add .

# 提交
git commit -m "feat: MVP完成 - 包含完整用户流程和AI助手"

# 在GitHub创建新仓库
# 访问：https://github.com/new
# 仓库名：github-app-builder
# 选择：Public
# 不要勾选任何初始化选项
# 点击 Create repository

# 关联远程仓库（替换为你的GitHub用户名）
git remote add origin https://github.com/YOUR_USERNAME/github-app-builder.git

# 推送
git branch -M main
git push -u origin main
```

---

## 🚀 部署到Vercel

### 步骤1：访问Vercel

访问：https://vercel.com

### 步骤2：导入项目

```
1. 点击右上角 "Add New..." → "Project"
2. 选择 "Import Git Repository"
3. 找到刚才创建的 github-app-builder
4. 点击 "Import"
5. 配置：
   - Framework Preset: Next.js (自动检测)
   - Root Directory: ./
   - Build Command: npm run build (默认)
   - Output Directory: .next (默认)
6. 点击 "Deploy"
```

### 步骤3：等待部署完成

等待2-3分钟，部署完成后会获得一个URL，例如：
`https://github-app-builder.vercel.app`

---

## 🔐 GitHub OAuth配置

### 步骤1：创建GitHub OAuth App

访问：https://github.com/settings/developers

**步骤**：
```
1. 点击 "New OAuth App"
2. 填写信息：
   - Application name: GitHub App Builder
   - Homepage URL: https://your-project.vercel.app
   - Authorization callback URL: https://your-project.vercel.app/api/auth/github/callback
3. 点击 "Register application"
4. 复制 Client ID
5. 点击 "Generate a new client secret"
6. 复制 Client Secret（只显示一次，请保存好）
```

### 步骤2：在Vercel配置环境变量

访问：`https://vercel.com/你的用户名/github-app-builder/settings/environment-variables`

**添加以下变量**：

```bash
# GitHub OAuth
NEXT_PUBLIC_GITHUB_CLIENT_ID=你的ClientID
GITHUB_CLIENT_SECRET=你的ClientSecret

# 应用URL
NEXT_PUBLIC_APP_URL=https://your-project.vercel.app
```

---

## ⚡ Vercel API配置（可选）

如果需要使用Vercel API自动部署：

### 步骤1：获取Vercel Token

访问：https://vercel.com/account/tokens

**步骤**：
```
1. 点击 "Create Token"
2. Token Name: GitHub App Builder Deploy
3. Scope: Full Account
4. Expiration: No Expiration
5. 点击 "Create"
6. 复制 Token（只显示一次，请保存好）
```

### 步骤2：在Vercel配置环境变量

添加：
```bash
VERCEL_TOKEN=你的VercelToken
VERCEL_TEAM_ID=你的TeamID  # 可选，如果是团队账号
```

---

## 🔄 重新部署

配置完环境变量后，需要重新部署：

### 方法1：在Vercel控制台

```
1. 访问项目页面
2. 点击 "Deployments" 标签
3. 点击最新的部署右侧的 "..." 菜单
4. 选择 "Redeploy"
```

### 方法2：推送新代码

```bash
# 修改代码后
git add .
git commit -m "chore: 更新配置"
git push

# Vercel会自动检测并重新部署
```

---

## ✅ 验证部署

### 1. 检查网站是否正常

访问你的Vercel URL，应该能看到首页。

### 2. 测试GitHub OAuth

```
1. 点击"开始创建"
2. 进入部署页面
3. 点击"连接GitHub账号"
4. 应该跳转到GitHub授权页面
5. 授权后应该返回并显示已连接状态
```

### 3. 测试完整流程

```
1. 首页 → 选择类型 → 浏览模板 → 定制化 → 部署
2. 连接GitHub
3. 创建仓库
4. 部署到Vercel（如果配置了Vercel API）
```

---

## 🐛 常见问题

### 问题1：GitHub OAuth不工作

**检查**：
- [ ] `NEXT_PUBLIC_GITHUB_CLIENT_ID` 是否正确
- [ ] `GITHUB_CLIENT_SECRET` 是否正确
- [ ] `NEXT_PUBLIC_APP_URL` 是否指向正确的Vercel URL
- [ ] GitHub OAuth App的回调URL是否正确

### 问题2：Vercel部署失败

**检查**：
- [ ] 构建日志中的错误信息
- [ ] 环境变量是否正确配置
- [ ] `VERCEL_TOKEN` 是否有效

### 问题3：图片不显示

**检查**：
- [ ] `next.config.ts` 中是否配置了图片域名
- [ ] Unsplash图片URL是否正确

---

## 📝 环境变量清单

### 必需的环境变量

```bash
# GitHub OAuth
NEXT_PUBLIC_GITHUB_CLIENT_ID=xxx
GITHUB_CLIENT_SECRET=xxx
NEXT_PUBLIC_APP_URL=https://your-project.vercel.app
```

### 可选的环境变量

```bash
# Vercel API（如果需要自动部署）
VERCEL_TOKEN=xxx
VERCEL_TEAM_ID=xxx  # 仅团队账号需要
```

---

## 🎯 下一步

部署完成后：

1. ✅ 测试完整用户流程
2. ✅ 测试GitHub OAuth
3. ✅ 测试部署功能
4. ✅ 收集用户反馈
5. ✅ 开始桌面端开发（Web端完成后）

---

**记住**：环境变量配置后，必须重新部署才能生效！

