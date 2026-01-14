# GitHub集成手动安装指南

## 🐛 问题

点击GitHub集成链接显示404错误。

## ✅ 解决方法：手动安装GitHub集成

### 方法1：通过Vercel控制台（推荐）

#### 步骤1：登录Vercel控制台

1. 访问：https://vercel.com
2. 登录你的账号

#### 步骤2：进入设置页面

**方式A：通过导航栏**
1. 点击右上角头像
2. 选择 "Settings"

**方式B：直接访问**
```
https://vercel.com/account
```

#### 步骤3：找到集成设置

在Settings页面中，查找以下选项之一：
- "Integrations"（集成）
- "Connected Accounts"（已连接的账户）
- "GitHub" 或 "Git Providers"

#### 步骤4：连接GitHub

1. 点击 "Add Integration" 或 "Connect GitHub"
2. 如果没有看到，尝试：
   - 点击 "Git Providers"
   - 或访问：https://vercel.com/account/git

3. 选择 "GitHub"
4. 点击 "Connect" 或 "Install"

#### 步骤5：授权GitHub

1. 会跳转到GitHub授权页面
2. 选择要授权的仓库范围：
   - ✅ **推荐**：选择 "All repositories"（所有仓库）
   - 或选择 "Only select repositories"（仅选定的仓库）
3. 点击 "Authorize" 或 "Install"

#### 步骤6：完成

1. 授权完成后，会返回Vercel
2. 应该看到GitHub已连接
3. 返回部署页面，重新尝试部署

---

### 方法2：通过项目设置

#### 步骤1：进入项目设置

1. 访问你的项目：https://vercel.com/trickmens-projects/github-app-builder
2. 点击 "Settings" 标签
3. 找到 "Git" 或 "Git Repository" 部分

#### 步骤2：连接GitHub仓库

1. 点击 "Connect Git Repository" 或 "Add Git Repository"
2. 选择 "GitHub"
3. 如果没有看到GitHub选项，说明需要先安装GitHub集成
4. 按照提示安装GitHub集成

---

### 方法3：通过新建项目

#### 步骤1：访问新建项目页面

1. 访问：https://vercel.com/new
2. 点击 "Import Git Repository"

#### 步骤2：连接GitHub

1. 如果没有看到GitHub选项，会提示安装GitHub集成
2. 点击提示中的链接安装GitHub集成
3. 完成授权后返回

---

## 🔍 如果找不到集成设置

### 检查点：

1. **确认已登录**：
   - 检查右上角是否显示你的头像
   - 如果没有，先登录

2. **检查账号类型**：
   - 个人账号：Settings → Integrations
   - 团队账号：Team Settings → Integrations

3. **尝试直接访问**：
   ```
   https://vercel.com/account/git
   https://vercel.com/integrations
   https://vercel.com/dashboard/integrations
   ```

---

## 📝 安装后的验证

安装完成后，验证：

1. **检查集成状态**：
   - 访问：https://vercel.com/account
   - 应该看到GitHub已连接

2. **测试自动部署**：
   - 返回部署页面
   - 重新尝试自动部署
   - 应该可以正常工作

---

## 🎯 常见问题

### 问题1：找不到集成设置

**解决**：
- 尝试访问：https://vercel.com/account/git
- 或通过项目设置 → Git → Connect Repository

### 问题2：授权后仍然失败

**解决**：
- 检查是否选择了正确的仓库范围
- 确保仓库是公开的，或者你选择了私有仓库权限
- 重新授权，选择"All repositories"

### 问题3：404错误

**解决**：
- 确认已登录Vercel
- 尝试通过项目设置连接
- 或使用手动部署方式

---

## 💡 推荐流程

**最简单的方法**：

1. 访问：https://vercel.com/new
2. 点击 "Import Git Repository"
3. 如果没有GitHub选项，会提示安装
4. 按照提示安装GitHub集成
5. 完成授权
6. 返回部署页面重新尝试

这样就能确保GitHub集成已正确安装！

