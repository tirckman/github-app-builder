# 🔍 调试检查清单

## 立即检查（最重要）

### 1. 环境变量配置 ✅

在Vercel控制台检查：
- [ ] `NEXT_PUBLIC_GITHUB_CLIENT_ID` = `Ov23lifXc91obKuO9Sac`
- [ ] `GITHUB_CLIENT_SECRET` = `d3716166de3964935dd121fcaf14ef8cdef7e3a6`
- [ ] `NEXT_PUBLIC_APP_URL` = `https://github-app-builder.vercel.app`

**检查方法**：
1. 访问：https://vercel.com/trickmens-projects/github-app-builder/settings/environment-variables
2. 确认3个变量都存在
3. 点击每个变量，检查值是否正确（没有多余空格）

### 2. GitHub OAuth App配置 ✅

在GitHub检查：
- [ ] Application name: `App Builder`（不能以GitHub开头）
- [ ] Homepage URL: `https://github-app-builder.vercel.app`
- [ ] Authorization callback URL: `https://github-app-builder.vercel.app/api/auth/github/callback`
- [ ] Client ID: `Ov23lifXc91obKuO9Sac`

**检查方法**：
1. 访问：https://github.com/settings/developers
2. 找到你的OAuth App
3. 检查配置是否完全匹配

### 3. 重新部署 ✅

**重要**：环境变量修改后必须重新部署！

- [ ] 在Vercel控制台点击"Redeploy"
- [ ] 等待部署完成（2-3分钟）

## 浏览器调试

### 4. 检查控制台错误

1. 打开网站：https://github-app-builder.vercel.app/deploy
2. 按F12打开开发者工具
3. 切换到Console标签
4. 查看是否有红色错误

**常见错误**：
- `GitHub Client ID not configured` → 环境变量未设置
- `Failed to fetch` → 网络问题或API错误
- Cookie相关错误 → Cookie设置问题

### 5. 检查Network请求

1. 按F12打开开发者工具
2. 切换到Network标签
3. 点击"连接GitHub账号"
4. 查看请求：
   - `/api/auth/github` → 应该返回302重定向到GitHub
   - `/api/auth/github/callback` → 应该返回302重定向到/deploy

### 6. 检查Cookie

1. 授权后，按F12打开开发者工具
2. 切换到Application标签
3. 查看Cookies → `https://github-app-builder.vercel.app`
4. 应该看到：
   - `github_token` (httpOnly, secure)
   - `github_user` (包含用户信息)

### 7. 检查localStorage

1. 按F12打开开发者工具
2. 切换到Application标签
3. 查看Local Storage → `https://github-app-builder.vercel.app`
4. 应该看到：
   - `github-app-builder-storage` → 包含模板和定制化信息

## 测试流程

### 完整测试步骤

1. **清除浏览器数据**（确保干净测试）
   - 清除Cookies
   - 清除Local Storage
   - 刷新页面

2. **测试完整流程**
   - 选择应用类型
   - 浏览模板
   - 选择模板
   - 定制化
   - 点击"继续到部署"

3. **在部署页面**
   - 检查是否显示"连接GitHub账号"按钮
   - 点击按钮
   - 应该跳转到GitHub授权页面

4. **授权后**
   - 应该返回 `/deploy?github_connected=true`
   - 应该显示GitHub用户信息
   - 应该自动进入下一步（创建仓库）

## 如果问题依然存在

### 检查日志

在浏览器控制台执行：

```javascript
// 检查环境变量（客户端可见的）
console.log('Client ID:', process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID);
console.log('App URL:', process.env.NEXT_PUBLIC_APP_URL);

// 检查localStorage
console.log('Storage:', localStorage.getItem('github-app-builder-storage'));

// 检查Cookie
console.log('Cookies:', document.cookie);
```

### 检查服务器日志

在Vercel控制台：
1. 访问：https://vercel.com/trickmens-projects/github-app-builder
2. 点击"Logs"标签
3. 查看是否有错误日志

## 最可能的问题

根据经验，最可能的问题是：

1. **环境变量未重新部署**（90%可能性）
   - 环境变量添加后必须重新部署
   - 检查Vercel部署历史，确认最近有重新部署

2. **Callback URL不匹配**（5%可能性）
   - GitHub OAuth App的Callback URL必须完全匹配
   - 检查是否有多余的空格或斜杠

3. **环境变量值错误**（5%可能性）
   - 检查值是否有多余空格
   - 检查Client ID和Secret是否正确

