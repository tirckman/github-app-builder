# Vercel 环境变量配置详细步骤

## 📍 找到环境变量设置的位置

### 方法1：通过导航栏（推荐）

1. **在Vercel项目页面**（你现在的位置）
2. **点击顶部导航栏的 "Settings" 标签**
   - 在 "Overview", "Deployments", "Analytics" 等标签中
   - 找到 "Settings" 并点击
3. **在左侧菜单中找到 "Environment Variables"**
   - Settings页面打开后，左侧会有一个菜单
   - 找到 "Environment Variables" 选项并点击

### 方法2：直接访问URL

直接访问这个链接（替换为你的项目路径）：
```
https://vercel.com/trickmens-projects/github-app-builder/settings/environment-variables
```

---

## 🔧 添加环境变量步骤

### 步骤1：进入环境变量页面

按照上面的方法进入 "Environment Variables" 页面

### 步骤2：添加第一个变量

1. 在页面顶部找到 "Add New" 或 "+" 按钮
2. 点击后会出现一个表单，填写：

```
Key: NEXT_PUBLIC_GITHUB_CLIENT_ID
Value: Ov23lifXc91obKuO9Sac
Environment: ✅ Production ✅ Preview ✅ Development (全部勾选)
```

3. 点击 "Save" 或 "Add"

### 步骤3：添加第二个变量

再次点击 "Add New"，填写：

```
Key: GITHUB_CLIENT_SECRET
Value: d3716166de3964935dd121fcaf14ef8cdef7e3a6
Environment: ✅ Production ✅ Preview ✅ Development (全部勾选)
```

点击 "Save"

### 步骤4：添加第三个变量

再次点击 "Add New"，填写：

```
Key: NEXT_PUBLIC_APP_URL
Value: https://github-app-builder.vercel.app
Environment: ✅ Production ✅ Preview ✅ Development (全部勾选)
```

点击 "Save"

---

## ✅ 验证已添加的变量

添加完成后，你应该看到3个环境变量：

1. ✅ `NEXT_PUBLIC_GITHUB_CLIENT_ID`
2. ✅ `GITHUB_CLIENT_SECRET`
3. ✅ `NEXT_PUBLIC_APP_URL`

---

## 🔄 重新部署（重要！）

环境变量添加后，**必须重新部署才能生效**。

### 方法1：在Deployments页面

1. 点击顶部导航栏的 **"Deployments"** 标签
2. 找到最新的部署（最上面的那个）
3. 点击部署右侧的 **"..."** 菜单（三个点）
4. 选择 **"Redeploy"**
5. 确认重新部署

### 方法2：推送新代码

```bash
# 在项目目录执行
git commit --allow-empty -m "chore: 触发重新部署以应用环境变量"
git push
```

---

## 🎯 完整配置清单

- [ ] 进入 Settings → Environment Variables
- [ ] 添加 `NEXT_PUBLIC_GITHUB_CLIENT_ID` = `Ov23lifXc91obKuO9Sac`
- [ ] 添加 `GITHUB_CLIENT_SECRET` = `d3716166de3964935dd121fcaf14ef8cdef7e3a6`
- [ ] 添加 `NEXT_PUBLIC_APP_URL` = `https://github-app-builder.vercel.app`
- [ ] 所有变量都勾选了 Production, Preview, Development
- [ ] 点击 "Redeploy" 重新部署
- [ ] 等待部署完成（2-3分钟）

---

## 🐛 如果找不到Settings

### 检查1：确认你在项目页面

URL应该是：
```
https://vercel.com/trickmens-projects/github-app-builder
```

### 检查2：查看顶部导航栏

应该能看到这些标签：
- Overview
- Deployments
- Analytics
- **Settings** ← 点击这个

### 检查3：权限问题

如果你不是项目所有者，可能没有权限修改环境变量。需要：
- 联系项目所有者添加你为成员
- 或者使用项目所有者的账号

---

## ✅ 配置完成后测试

1. 等待重新部署完成（约2-3分钟）
2. 访问：https://github-app-builder.vercel.app/deploy
3. 点击 "连接 GitHub 账号"
4. 应该能正常跳转到GitHub授权页面

---

## 📸 如果还是找不到

请告诉我：
1. 你在Vercel的哪个页面？
2. 顶部导航栏能看到哪些标签？
3. 有没有看到 "Settings" 这个标签？

我可以根据你的具体情况提供更精确的指导！

