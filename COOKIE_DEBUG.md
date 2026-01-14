# Cookie调试指南

## 🔍 问题分析

从控制台看到：`GitHub状态检查完成,未连接`

这说明：
- ✅ 环境变量可能配置正确（否则会有其他错误）
- ❌ GitHub OAuth回调后，cookie没有正确设置或读取

## 🧪 调试步骤

### 步骤1：检查Cookie是否设置

1. 按F12打开开发者工具
2. 切换到 **Application** 标签（或"应用程序"）
3. 左侧菜单选择 **Cookies** → `https://github-app-builder.vercel.app`
4. 查看是否有以下cookie：
   - `github_token` (httpOnly, secure)
   - `github_user` (包含用户信息)

**如果没有这些cookie**：
- Cookie没有设置成功
- 可能是secure flag的问题

### 步骤2：检查Network请求

1. 按F12打开开发者工具
2. 切换到 **Network** 标签（或"网络"）
3. 点击"连接GitHub账号"
4. 查看请求：

**关键请求**：
- `/api/auth/github` → 应该返回302，重定向到GitHub
- `/api/auth/github/callback?code=...` → 应该返回302，重定向到/deploy
- 查看这个请求的 **Response Headers**，检查是否有 `Set-Cookie` 头

### 步骤3：检查OAuth回调

授权后，检查URL：
- 应该跳转到：`/deploy?github_connected=true`
- 如果跳转到其他页面，说明有问题

### 步骤4：手动检查Cookie

在浏览器控制台执行：

```javascript
// 检查所有cookie
console.log('All cookies:', document.cookie);

// 检查是否有github_token（注意：httpOnly的cookie无法通过JavaScript读取）
// 但可以检查github_user
const cookies = document.cookie.split('; ');
const githubUser = cookies.find(c => c.startsWith('github_user='));
console.log('GitHub user cookie:', githubUser);

// 检查localStorage
const storage = localStorage.getItem('github-app-builder-storage');
console.log('Storage:', storage ? JSON.parse(storage) : 'empty');
```

## 🐛 可能的问题

### 问题1：Cookie的secure flag

在production环境，cookie设置了 `secure: true`，这要求：
- ✅ 网站必须是HTTPS（Vercel默认是HTTPS，应该没问题）
- ✅ 浏览器必须支持secure cookies

### 问题2：Cookie的httpOnly flag

`github_token` 设置了 `httpOnly: true`，这意味着：
- ✅ JavaScript无法读取（这是安全的）
- ✅ 只能通过服务器端读取
- ❌ 但客户端检查函数 `isGitHubConnected()` 可能无法读取

让我检查一下 `isGitHubConnected()` 的实现...

## 🔧 修复方案

如果cookie设置了 `httpOnly: true`，客户端的 `getGitHubToken()` 函数无法读取它！

**解决方案**：需要创建一个API路由来检查GitHub连接状态。

