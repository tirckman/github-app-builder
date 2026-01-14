# Vercel Token填写指南

## 📝 填写步骤

### 1. TOKEN NAME（已完成）
✅ 你已经填写了：`github-app-builder-auto-deploy`
这个可以保持不变，或者改成你喜欢的名称。

---

### 2. SCOPE（作用域）- 必须选择

**点击"SCOPE"下拉菜单，选择：**

✅ **推荐选择**：`Full Account` 或 `All Projects`

**选项说明**：
- `Full Account` - 完全访问权限（推荐，最简单）
- `All Projects` - 所有项目权限
- `Specific Projects` - 特定项目（需要额外选择项目）

**如果看不到这些选项**，尝试：
- 点击下拉菜单
- 查看是否有"Full Account"或"All Projects"选项
- 选择权限最大的选项

---

### 3. EXPIRATION（过期时间）- 必须选择

**点击"EXPIRATION"下拉菜单，选择：**

✅ **推荐选择**：`No Expiration`（永不过期）

**选项说明**：
- `No Expiration` - 永不过期（推荐，最简单）
- `Custom Date` - 自定义日期（需要选择具体日期）
- `30 days` - 30天后过期
- `90 days` - 90天后过期
- `1 year` - 1年后过期

**建议**：选择`No Expiration`，这样就不需要定期更新token。

---

### 4. 创建Token

填写完成后：
1. 检查两个字段都没有红色错误提示
2. 点击右下角的黑色"Create"按钮
3. **立即复制显示的token**（只显示一次！）

---

## ✅ 完整填写示例

```
TOKEN NAME: github-app-builder-auto-deploy
SCOPE: Full Account (或 All Projects)
EXPIRATION: No Expiration
```

---

## 🐛 如果遇到问题

### 问题1：SCOPE下拉菜单是空的
**解决**：
- 刷新页面重试
- 检查是否登录了正确的Vercel账号
- 尝试选择"Full Account"

### 问题2：EXPIRATION下拉菜单是空的
**解决**：
- 刷新页面重试
- 尝试选择"No Expiration"

### 问题3：创建按钮是灰色的
**解决**：
- 确保SCOPE和EXPIRATION都已选择
- 没有红色错误提示
- 两个字段都填写正确后，按钮会变成可点击状态

---

## 💡 提示

- **SCOPE**：选择权限最大的选项（Full Account），这样自动部署功能才能正常工作
- **EXPIRATION**：选择"No Expiration"，避免定期更新token的麻烦
- **Token安全**：创建后立即复制并保存，不要分享给他人

填写完成后告诉我，我继续帮你配置环境变量！

