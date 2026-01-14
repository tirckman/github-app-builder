# GitHub OAuth 循环问题修复

## 🐛 问题描述

用户遇到的问题是：
1. 显示授权请求信息
2. 自动返回应用创建的页面
3. 创建完成后，又进入授权页面
4. 授权后，又返回应用创建的页面
5. **循环了**

## 🔍 问题原因

1. `useEffect` 依赖 `deployStep`，导致每次状态变化都重新检查GitHub连接
2. Cookie可能在OAuth回调后还没有完全设置好就被读取
3. 没有标志来防止重复检查

## ✅ 修复方案

### 1. 添加检查标志
```typescript
const [hasCheckedGitHub, setHasCheckedGitHub] = useState(false);
```

### 2. 检测OAuth回调
```typescript
const urlParams = new URLSearchParams(window.location.search);
const isOAuthCallback = urlParams.get('github_connected') === 'true';
```

### 3. 清理URL参数
```typescript
if (isOAuthCallback) {
  window.history.replaceState({}, '', '/deploy');
}
```

### 4. 增加延迟
```typescript
const delay = isOAuthCallback ? 500 : 100;
```

### 5. 修复Cookie路径
在OAuth回调路由中，添加 `path: '/'` 确保cookie在所有路径都可用。

## 🚀 部署

修复已提交并推送到GitHub，Vercel会自动重新部署。

等待部署完成后，测试：
1. 访问：https://github-app-builder.vercel.app/deploy
2. 点击"连接 GitHub 账号"
3. 授权后应该正常返回，不再循环

