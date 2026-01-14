# 状态持久化修复

## 🐛 问题描述

用户反馈：
1. 点击GitHub授权后，直接跳转到模板选择页面，没有提示授权
2. 点击部署后，直接跳转到模板选择页面

## 🔍 问题原因

**根本原因**：状态管理没有使用持久化，当OAuth回调跳转回来时，状态会丢失。

具体流程：
1. 用户在定制化页面选择模板 → 状态保存在内存中
2. 点击"继续到部署" → 跳转到 `/deploy`
3. 点击"连接GitHub账号" → 跳转到GitHub授权页面
4. GitHub授权后回调 → 跳转回 `/deploy?github_connected=true`
5. **问题**：页面刷新，内存中的状态丢失，`selectedTemplate` 变为 `null`
6. 部署页面检测到没有模板 → 跳转到 `/browse-templates`

## ✅ 修复方案

### 1. 添加状态持久化

使用 `zustand` 的 `persist` 中间件，将关键状态保存到 `localStorage`：

```typescript
export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      // ... store implementation
    }),
    {
      name: 'github-app-builder-storage',
      partialize: (state) => ({
        selectedAppType: state.selectedAppType,
        selectedTemplate: state.selectedTemplate,
        customization: state.customization,
        // deployUrl 和 deployStatus 不持久化（临时状态）
      }),
    }
  )
);
```

### 2. 改进状态检查逻辑

在部署页面，增加延迟并重新从store获取状态：

```typescript
useEffect(() => {
  const checkTemplate = setTimeout(() => {
    // 再次从store获取最新状态（可能已经从localStorage恢复）
    const currentState = useAppStore.getState();
    const currentTemplate = currentState.selectedTemplate;
    
    if (!currentTemplate) {
      // 跳转逻辑
    }
  }, 500); // 增加延迟，确保localStorage已恢复
}, [selectedTemplate, router]);
```

## 🎯 修复效果

**修复前**：
- OAuth回调后状态丢失
- 自动跳转到模板选择页面
- 用户体验差

**修复后**：
- OAuth回调后状态从localStorage恢复
- 正常显示部署页面
- 显示GitHub用户信息
- 用户体验流畅

## 📝 修改的文件

- `store/useAppStore.ts` - 添加persist中间件
- `app/deploy/page.tsx` - 改进状态检查逻辑

## 🚀 测试

部署后测试：
1. 选择模板 → 定制化 → 部署
2. 点击"连接GitHub账号"
3. 授权后应该：
   - ✅ 正常返回部署页面
   - ✅ 显示GitHub用户信息
   - ✅ 不再跳转到模板选择页面

