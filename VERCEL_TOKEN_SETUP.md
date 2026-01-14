# Vercel Token配置详细步骤

## 🎯 目标
配置`VERCEL_TOKEN`环境变量，实现一键自动部署功能。

## 📋 完整步骤

### 步骤1：获取Vercel Token

1. **访问Vercel Token页面**
   - 打开：https://vercel.com/account/tokens
   - 或者：登录Vercel → 点击右上角头像 → Settings → Tokens

2. **创建新Token**
   - 点击"Create Token"按钮
   - 输入Token名称（例如：`github-app-builder-auto-deploy`）
   - 选择过期时间：
     - ✅ **推荐**：选择"No Expiration"（永不过期）
     - 或者选择自定义过期时间
   - 点击"Create Token"

3. **复制Token** ⚠️ 重要
   - Token只显示一次！
   - **立即复制**并保存到安全的地方
   - 格式类似：`xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

---

### 步骤2：在Vercel项目配置环境变量

1. **访问项目设置**
   - 打开：https://vercel.com/trickmens-projects/github-app-builder/settings/environment-variables
   - 或者：
     - 访问：https://vercel.com/trickmens-projects/github-app-builder
     - 点击"Settings"标签
     - 点击左侧菜单"Environment Variables"

2. **添加环境变量**
   - 点击"Add New"按钮
   - 填写以下信息：
     ```
     Key: VERCEL_TOKEN
     Value: [粘贴你刚才复制的token]
     Environment: All Environments (Production, Preview, Development)
     ```
   - 点击"Save"

3. **确认添加成功**
   - 应该看到`VERCEL_TOKEN`在环境变量列表中
   - 值应该显示为`••••••••`（隐藏显示）

---

### 步骤3：重新部署使环境变量生效

**重要**：环境变量添加后必须重新部署才能生效！

1. **触发重新部署**
   - 在Vercel控制台，点击"Deployments"标签
   - 找到最新的部署
   - 点击右侧的"..."菜单
   - 选择"Redeploy"
   - 或者：直接点击项目页面的"Redeploy"按钮

2. **等待部署完成**
   - 部署时间：约2-3分钟
   - 状态会显示：Building → Deploying → Ready

---

### 步骤4：测试自动部署功能

1. **访问部署页面**
   - 打开：https://github-app-builder.vercel.app/deploy
   - 确保已经完成：
     - ✅ 步骤1：授权GitHub
     - ✅ 步骤2：创建GitHub仓库

2. **测试自动部署**
   - 在步骤3（部署到Vercel）页面
   - 点击"一键自动部署"按钮
   - 应该可以正常部署，不再显示"Vercel token not configured"错误

3. **查看部署结果**
   - 如果成功，会进入步骤4（部署中）
   - 显示部署进度
   - 最终进入步骤5（部署成功）

---

## ✅ 配置检查清单

- [ ] 已获取Vercel Token
- [ ] Token已复制并保存
- [ ] 在Vercel控制台添加了`VERCEL_TOKEN`环境变量
- [ ] 环境变量设置为"All Environments"
- [ ] 已重新部署项目
- [ ] 部署已完成
- [ ] 测试自动部署功能成功

---

## 🐛 常见问题

### 问题1：找不到Token页面
**解决**：
- 直接访问：https://vercel.com/account/tokens
- 或者：Settings → Tokens

### 问题2：Token创建后找不到
**解决**：
- Token只显示一次，如果没复制，需要重新创建
- 建议：创建后立即复制到记事本

### 问题3：环境变量添加后不生效
**解决**：
- 必须重新部署！
- 在Vercel控制台点击"Redeploy"
- 等待部署完成

### 问题4：自动部署仍然失败
**检查**：
- Token是否正确（没有多余空格）
- 环境变量是否设置为"All Environments"
- 是否已重新部署
- 查看Vercel部署日志，检查错误信息

---

## 📝 Token安全提示

⚠️ **重要**：
- Token具有完全访问权限，请妥善保管
- 不要分享给他人
- 不要提交到Git仓库
- 如果泄露，立即在Vercel删除并重新创建

---

## 🎉 配置完成后

配置完成后，你就可以：
- ✅ 一键自动部署到Vercel
- ✅ 无需手动操作
- ✅ 更好的用户体验

如果遇到任何问题，告诉我具体的错误信息，我会帮你解决！

