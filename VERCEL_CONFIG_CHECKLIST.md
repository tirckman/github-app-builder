# Vercel 配置检查清单

## ✅ 部署状态
- [x] 代码已推送到GitHub
- [x] 项目已部署到Vercel
- [x] 网站可以正常访问：https://github-app-builder.vercel.app

## 🔧 需要配置的环境变量

### 1. GitHub OAuth（必需）

在 Vercel 项目设置中添加：

```
NEXT_PUBLIC_GITHUB_CLIENT_ID = 你的GitHub Client ID
GITHUB_CLIENT_SECRET = 你的GitHub Client Secret
NEXT_PUBLIC_APP_URL = https://github-app-builder.vercel.app
```

**获取方式**：
1. 访问：https://github.com/settings/developers
2. 创建新的 OAuth App
3. Callback URL: `https://github-app-builder.vercel.app/api/auth/github/callback`

### 2. Vercel API（可选）

如果需要使用Vercel API进行自动部署：

```
VERCEL_TOKEN = 你的Vercel Token
VERCEL_TEAM_ID = 你的Team ID（如果有）
```

**获取方式**：
1. 访问：https://vercel.com/account/tokens
2. 创建新的 Token
3. 复制 Token 值

## 📋 配置步骤

### 步骤1：创建GitHub OAuth App

1. 访问：https://github.com/settings/developers
2. 点击 "New OAuth App"
3. 填写：
   - **Application name**: `App Builder` 或 `Quick App Builder` 或 `智能应用构建器`（不能以"GitHub"或"Gist"开头）
   - **Homepage URL**: `https://github-app-builder.vercel.app`
   - **Authorization callback URL**: `https://github-app-builder.vercel.app/api/auth/github/callback`
4. 点击 "Register application"
5. **复制 Client ID 和 Client Secret**

### 步骤2：在Vercel添加环境变量

1. 访问你的Vercel项目：https://vercel.com/dashboard
2. 选择 `github-app-builder` 项目
3. 点击 "Settings" → "Environment Variables"
4. 添加以下变量：

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `NEXT_PUBLIC_GITHUB_CLIENT_ID` | 你的Client ID | GitHub OAuth Client ID |
| `GITHUB_CLIENT_SECRET` | 你的Client Secret | GitHub OAuth Client Secret |
| `NEXT_PUBLIC_APP_URL` | `https://github-app-builder.vercel.app` | 应用URL |

5. 点击 "Save"
6. **重要**：点击 "Redeploy" 使环境变量生效

### 步骤3：验证配置

1. 等待重新部署完成（约2-3分钟）
2. 访问：https://github-app-builder.vercel.app/deploy
3. 点击 "连接 GitHub 账号"
4. 应该能正常跳转到GitHub授权页面

## ✅ 测试清单

配置完成后，测试以下功能：

- [ ] 访问首页：https://github-app-builder.vercel.app
- [ ] 点击"开始创建"能正常跳转
- [ ] 选择应用类型页面正常
- [ ] 浏览模板页面显示正常
- [ ] 定制化页面功能正常
- [ ] **GitHub OAuth登录功能正常**
- [ ] 创建仓库功能正常
- [ ] AI助手能正常打开和回答问题

## 🐛 常见问题

### 问题1：GitHub OAuth跳转失败

**原因**：环境变量未配置或配置错误

**解决**：
1. 检查Vercel环境变量是否正确
2. 确认 `NEXT_PUBLIC_APP_URL` 与Callback URL匹配
3. 重新部署项目

### 问题2：提示"GitHub Client ID not configured"

**原因**：`NEXT_PUBLIC_GITHUB_CLIENT_ID` 未设置

**解决**：
1. 在Vercel添加环境变量
2. 点击 "Redeploy"

### 问题3：授权后无法获取用户信息

**原因**：`GITHUB_CLIENT_SECRET` 配置错误

**解决**：
1. 检查Client Secret是否正确
2. 确认没有多余的空格
3. 重新部署

## 📞 需要帮助？

如果遇到问题，检查：
1. Vercel部署日志
2. 浏览器控制台错误
3. GitHub OAuth App配置

---

**配置完成后，你的应用就可以完整使用了！** 🎉

