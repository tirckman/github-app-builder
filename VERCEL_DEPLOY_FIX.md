# Vercel部署API修复

## 🐛 问题

错误信息：`Invalid request: gitSource missing required property repoId`

**原因**：
- Vercel API v13需要先有项目才能部署
- 直接使用gitSource部署时，需要repoId或先创建项目

## ✅ 修复方案

### 修复内容

1. **先创建或检查项目**
   - 检查项目是否存在
   - 如果不存在，先创建项目（关联GitHub仓库）
   - 如果存在，使用现有项目

2. **然后创建部署**
   - 使用项目名称来部署
   - 这样就不需要repoId了

### 修复后的流程

```
1. 检查项目是否存在
   ↓
2. 如果不存在 → 创建项目（关联GitHub仓库）
   ↓
3. 使用项目名称创建部署
   ↓
4. 返回部署结果
```

## 🚀 测试

修复后，自动部署应该可以正常工作：

1. **访问部署页面**：
   ```
   https://github-app-builder.vercel.app/deploy
   ```

2. **完成前两步**：
   - ✅ 步骤1：授权GitHub
   - ✅ 步骤2：创建GitHub仓库

3. **测试自动部署**：
   - 在步骤3点击"一键自动部署"
   - 应该可以正常部署，不再显示repoId错误

## 📝 注意事项

- 确保GitHub仓库已经创建
- 确保VERCEL_TOKEN已配置
- 如果GitHub仓库未连接到Vercel，创建项目时会自动连接

## 🎉 修复完成

代码已修复并提交，等待Vercel自动部署（约2-3分钟）后即可测试！

