# Vercel Token配置指南

## 🐛 问题

看到错误提示："Vercel token not configured"

**原因**：
- Vercel自动部署功能需要`VERCEL_TOKEN`环境变量
- 如果未配置，自动部署功能不可用
- 但可以手动在Vercel部署

## ✅ 解决方案

### 方案1：配置VERCEL_TOKEN（自动部署）⭐推荐

#### 步骤1：获取Vercel Token

1. 访问：https://vercel.com/account/tokens
2. 点击"Create Token"
3. 输入名称（如：`github-app-builder`）
4. 选择过期时间（建议：`No Expiration`）
5. 点击"Create Token"
6. **复制token**（只显示一次！）

#### 步骤2：在Vercel控制台配置

1. 访问：https://vercel.com/trickmens-projects/github-app-builder/settings/environment-variables
2. 点击"Add New"
3. 添加环境变量：
   - **Key**: `VERCEL_TOKEN`
   - **Value**: 你刚才复制的token
   - **Environment**: 选择"All Environments"
4. 点击"Save"
5. **重要**：点击"Redeploy"使环境变量生效

#### 步骤3：测试

1. 等待部署完成（2-3分钟）
2. 再次尝试自动部署
3. 应该可以正常工作了

---

### 方案2：手动部署（无需配置token）⭐简单

如果不想配置token，可以手动在Vercel部署：

#### 步骤1：创建GitHub仓库

在步骤2中创建GitHub仓库后，你会得到仓库URL，例如：
```
https://github.com/your-username/your-repo
```

#### 步骤2：在Vercel导入项目

1. 访问：https://vercel.com/new
2. 点击"Import Git Repository"
3. 选择你的GitHub仓库
4. 点击"Import"
5. Vercel会自动检测框架（Next.js）
6. 点击"Deploy"
7. 等待部署完成（2-3分钟）

#### 步骤3：获得网站链接

部署完成后，你会看到：
```
🎉 Congratulations! Your project is live!

Visit: https://your-repo.vercel.app
```

---

## 🎯 两种方案对比

| 特性 | 自动部署（方案1） | 手动部署（方案2） |
|------|----------------|----------------|
| 需要配置token | ✅ 是 | ❌ 否 |
| 部署速度 | ⚡ 快（一键） | 🐢 慢（多步骤） |
| 用户体验 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| 推荐度 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |

## 💡 建议

**对于开发者**：推荐方案1（配置token），体验更好

**对于普通用户**：可以使用方案2（手动部署），更简单

## 📝 当前状态

- ✅ 代码已修复
- ✅ 添加了手动部署选项
- ✅ 改进了错误提示
- ⏳ 等待你选择方案并配置

## 🚀 下一步

1. **如果想自动部署**：按照方案1配置VERCEL_TOKEN
2. **如果想手动部署**：按照方案2在Vercel导入项目

两种方案都可以成功部署你的应用！

