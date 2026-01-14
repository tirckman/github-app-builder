# 环境变量问题排查

## 🎯 最可能的问题

根据你的描述，**90%的可能性是环境变量配置问题**。

## ✅ 立即检查清单

### 1. 检查Vercel环境变量

访问：https://vercel.com/trickmens-projects/github-app-builder/settings/environment-variables

**必须确认**：
- [ ] `NEXT_PUBLIC_GITHUB_CLIENT_ID` 存在且值 = `Ov23lifXc91obKuO9Sac`
- [ ] `GITHUB_CLIENT_SECRET` 存在且值 = `d3716166de3964935dd121fcaf14ef8cdef7e3a6`
- [ ] `NEXT_PUBLIC_APP_URL` 存在且值 = `https://github-app-builder.vercel.app`

**常见错误**：
- ❌ 变量名拼写错误（大小写、下划线）
- ❌ 值有多余空格
- ❌ 值没有正确保存

### 2. 检查是否重新部署

**重要**：环境变量修改后必须重新部署！

- [ ] 在Vercel控制台点击"Redeploy"
- [ ] 等待部署完成（2-3分钟）
- [ ] 检查部署日志，确认没有错误

### 3. 测试环境变量

访问这个URL测试环境变量是否生效：
```
https://github-app-builder.vercel.app/api/test-env
```

应该返回：
```json
{
  "status": "ok",
  "env_check": {
    "hasClientId": true,
    "hasClientSecret": true,
    "hasAppUrl": true,
    "appUrl": "https://github-app-builder.vercel.app"
  },
  "message": "所有环境变量已配置"
}
```

如果返回 `hasClientId: false` 或 `hasClientSecret: false`，说明环境变量未正确配置。

### 4. 检查GitHub OAuth App

访问：https://github.com/settings/developers

**必须确认**：
- [ ] Application name: `App Builder`（不能以GitHub开头）
- [ ] Homepage URL: `https://github-app-builder.vercel.app`
- [ ] Authorization callback URL: `https://github-app-builder.vercel.app/api/auth/github/callback`
- [ ] Client ID: `Ov23lifXc91obKuO9Sac`

**重要**：Callback URL必须**完全匹配**，包括：
- ✅ 协议：`https://`
- ✅ 域名：`github-app-builder.vercel.app`
- ✅ 路径：`/api/auth/github/callback`
- ❌ 不能有多余的斜杠或空格

## 🔍 问题诊断步骤

### 步骤1：测试环境变量API

1. 访问：https://github-app-builder.vercel.app/api/test-env
2. 查看返回的JSON
3. 如果 `hasClientId: false`，说明环境变量未设置

### 步骤2：检查浏览器控制台

1. 访问：https://github-app-builder.vercel.app/deploy
2. 按F12打开开发者工具
3. 切换到Console标签
4. 点击"连接GitHub账号"
5. 查看是否有错误

**常见错误**：
- `GitHub Client ID not configured` → 环境变量未设置
- `redirect_uri_mismatch` → Callback URL不匹配

### 步骤3：检查Network请求

1. 按F12打开开发者工具
2. 切换到Network标签
3. 点击"连接GitHub账号"
4. 查看 `/api/auth/github` 请求：
   - 状态码应该是 `302`（重定向）
   - 应该重定向到 `https://github.com/login/oauth/authorize?...`

如果状态码是 `500`，说明环境变量有问题。

## 🐛 常见问题及解决方案

### 问题1：环境变量未生效

**症状**：访问 `/api/test-env` 返回 `hasClientId: false`

**原因**：环境变量添加后没有重新部署

**解决**：
1. 在Vercel控制台点击"Redeploy"
2. 等待部署完成
3. 再次测试

### 问题2：Callback URL不匹配

**症状**：授权后显示 `redirect_uri_mismatch` 错误

**原因**：GitHub OAuth App的Callback URL与代码中的不匹配

**解决**：
1. 检查GitHub OAuth App的Callback URL
2. 确保与 `NEXT_PUBLIC_APP_URL/api/auth/github/callback` 完全一致
3. 注意：不能有多余的斜杠或空格

### 问题3：环境变量值错误

**症状**：OAuth请求失败

**原因**：Client ID或Secret值不正确

**解决**：
1. 在Vercel中重新检查环境变量值
2. 确保没有多余空格
3. 确保值完全正确

## 📝 快速检查命令

在浏览器控制台执行：

```javascript
// 检查客户端环境变量（只有NEXT_PUBLIC_开头的可以在客户端访问）
console.log('Client ID:', process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID);
console.log('App URL:', process.env.NEXT_PUBLIC_APP_URL);

// 检查localStorage
const storage = localStorage.getItem('github-app-builder-storage');
console.log('Storage:', storage ? JSON.parse(storage) : 'empty');

// 检查Cookie
console.log('Cookies:', document.cookie);
```

## 🎯 最可能的问题

根据经验，**90%的可能性是环境变量添加后没有重新部署**。

**立即行动**：
1. 访问Vercel控制台
2. 点击"Redeploy"
3. 等待部署完成
4. 再次测试

