# GitHub Token读取修复

## 🐛 问题描述

用户反馈：授权点击过了，还是提示"请先连接GitHub账号"

**问题原因**：
- `github_token` cookie设置了 `httpOnly: true`
- JavaScript无法读取httpOnly cookie
- `getGitHubToken()` 返回 `null`
- 导致误判为未连接

## ✅ 修复方案

### 修复1：前端检查逻辑

**文件**：`app/deploy/page.tsx`

```typescript
// 修改前：检查httpOnly的token（无法读取）
const token = getGitHubToken();
if (!token) {
  alert('请先连接GitHub账号');
  return;
}

// 修改后：检查可读的github_user cookie
if (!isGitHubConnected()) {
  alert('请先连接GitHub账号');
  return;
}
```

### 修复2：API路由从cookie读取token

**文件**：`app/api/github/create-repo/route.ts`

```typescript
// 修改前：从请求体获取token
const { name, token } = await request.json();

// 修改后：从httpOnly cookie读取token
const { name } = await request.json();
const token = request.cookies.get('github_token')?.value;
```

## 🎯 修复效果

**修复前**：
- ❌ JavaScript无法读取httpOnly token
- ❌ 误判为未连接
- ❌ 显示"请先连接GitHub账号"

**修复后**：
- ✅ 检查可读的github_user cookie
- ✅ API从httpOnly cookie读取token
- ✅ 正确判断连接状态
- ✅ 可以正常创建仓库

## 📝 修改的文件

1. `app/deploy/page.tsx` - 修改token检查逻辑
2. `app/api/github/create-repo/route.ts` - 从cookie读取token

## 🚀 测试

部署后测试：
1. 授权GitHub账号
2. 进入步骤2（创建仓库）
3. 输入仓库名称
4. 点击"创建仓库"
5. 应该能正常创建，不再提示"请先连接GitHub账号"

