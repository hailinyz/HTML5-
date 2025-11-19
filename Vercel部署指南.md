# Vercel 部署指南

## 为什么选择 Vercel？

- ✅ **完全免费**：个人项目免费使用
- ✅ **自动部署**：推送代码自动构建部署
- ✅ **免费 HTTPS**：自动配置 SSL 证书
- ✅ **全球 CDN**：访问速度快
- ✅ **零配置**：自动识别 Vue/Vite 项目
- ✅ **自定义域名**：支持绑定 hljs.qzz.io

---

## 方法一：通过 Vercel 网站部署（推荐，最简单）

### 第一步：准备 Git 仓库

#### 1.1 初始化 Git（如果还没有）

在项目根目录打开终端，执行：

```bash
git init
git add .
git commit -m "Initial commit"
```

#### 1.2 推送到 GitHub

1. 在 GitHub 创建新仓库（https://github.com/new）
   - 仓库名：`hailin-blog`
   - 设置为 Public 或 Private（都可以）
   - 不要勾选任何初始化选项

2. 推送代码到 GitHub：

```bash
git remote add origin https://github.com/你的用户名/hailin-blog.git
git branch -M main
git push -u origin main
```

### 第二步：导入到 Vercel

#### 2.1 注册/登录 Vercel

1. 访问：https://vercel.com
2. 点击 **"Sign Up"** 或 **"Login"**
3. 选择 **"Continue with GitHub"**（用 GitHub 账号登录）
4. 授权 Vercel 访问你的 GitHub

#### 2.2 导入项目

1. 登录后，点击 **"Add New..."** → **"Project"**
2. 在 **"Import Git Repository"** 中找到 `hailin-blog`
3. 点击 **"Import"**

#### 2.3 配置项目

Vercel 会自动检测到这是 Vite 项目，配置如下：

- **Framework Preset**: Vite
- **Root Directory**: `./`（默认）
- **Build Command**: `npm run build`（自动填充）
- **Output Directory**: `dist`（自动填充）

**不需要修改任何配置**，直接点击 **"Deploy"**

#### 2.4 等待部署

- 部署过程大约 1-2 分钟
- 可以看到实时构建日志
- 部署成功后会显示 🎉 Congratulations!

#### 2.5 访问网站

部署成功后，Vercel 会自动分配一个域名：
- `https://hailin-blog.vercel.app`
- 或类似的随机域名

点击 **"Visit"** 按钮即可访问你的网站！

---

## 第三步：绑定自定义域名 hljs.qzz.io

### 3.1 在 Vercel 添加域名

1. 在项目页面，点击 **"Settings"** 标签
2. 点击左侧 **"Domains"**
3. 在输入框中输入：`hljs.qzz.io`
4. 点击 **"Add"**

### 3.2 配置 DNS 解析

Vercel 会提示你需要添加 DNS 记录，有两种方式：

#### 方式一：CNAME 记录（推荐）

在你的域名服务商（阿里云/腾讯云等）添加：

| 记录类型 | 主机记录 | 记录值 | TTL |
|---------|---------|--------|-----|
| CNAME | hljs | cname.vercel-dns.com | 600 |

#### 方式二：A 记录

如果不支持 CNAME，使用 A 记录：

| 记录类型 | 主机记录 | 记录值 | TTL |
|---------|---------|--------|-----|
| A | hljs | 76.76.21.21 | 600 |

### 3.3 等待验证

1. 添加 DNS 记录后，回到 Vercel
2. 点击 **"Refresh"** 或等待几分钟
3. 验证成功后，域名状态变为 **"Valid Configuration"**
4. Vercel 会自动配置 HTTPS 证书

### 3.4 访问网站

现在可以通过以下地址访问：
- `https://hljs.qzz.io`（你的自定义域名）
- `https://hailin-blog.vercel.app`（Vercel 默认域名）

---

## 方法二：通过 Vercel CLI 部署

### 第一步：安装 Vercel CLI

```bash
npm install -g vercel
```

### 第二步：登录 Vercel

```bash
vercel login
```

选择登录方式（GitHub/Email），按提示完成登录。

### 第三步：部署项目

在项目根目录执行：

```bash
vercel
```

按提示操作：
1. **Set up and deploy?** → 选择 `Y`
2. **Which scope?** → 选择你的账号
3. **Link to existing project?** → 选择 `N`
4. **What's your project's name?** → 输入 `hailin-blog`
5. **In which directory is your code located?** → 按回车（默认 `./`）
6. **Want to override the settings?** → 选择 `N`

等待部署完成，会显示部署的 URL。

### 第四步：生产环境部署

```bash
vercel --prod
```

---

## 自动部署配置

### 启用自动部署

Vercel 默认已启用自动部署：
- **推送到 main 分支** → 自动部署到生产环境
- **推送到其他分支** → 自动部署到预览环境
- **Pull Request** → 自动生成预览链接

### 工作流程

1. 本地修改代码
2. 提交并推送到 GitHub：
   ```bash
   git add .
   git commit -m "更新内容"
   git push
   ```
3. Vercel 自动检测到推送，开始构建部署
4. 1-2 分钟后，网站自动更新

---

## 项目配置文件（可选）

### 创建 vercel.json

在项目根目录创建 `vercel.json`，用于自定义配置：

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

这个配置：
- 支持 Vue Router 的 History 模式
- 配置静态资源缓存

---

## 环境变量配置（如果需要）

如果项目需要环境变量：

### 在 Vercel 控制台配置

1. 项目页面 → **Settings** → **Environment Variables**
2. 添加变量：
   - **Key**: `VITE_API_URL`
   - **Value**: `https://api.example.com`
   - **Environment**: 选择 `Production`
3. 点击 **"Save"**
4. 重新部署项目

### 在本地使用

创建 `.env.production` 文件：

```env
VITE_API_URL=https://api.example.com
```

---

## 性能优化建议

### 1. 启用 Vercel Analytics（可选）

1. 项目页面 → **Analytics** 标签
2. 点击 **"Enable"**
3. 免费查看网站访问数据

### 2. 配置缓存策略

在 `vercel.json` 中配置：

```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*).html",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    }
  ]
}
```

### 3. 图片优化

使用 Vercel Image Optimization（需要升级到 Pro）或使用外部图床。

---

## 常见问题

### 1. 部署失败：Build Error

**原因**：构建过程出错

**解决**：
1. 查看 Vercel 的构建日志
2. 本地测试构建：`npm run build`
3. 检查 `package.json` 中的依赖版本
4. 确保 Node.js 版本兼容（Vercel 默认使用 Node 18）

### 2. 页面刷新出现 404

**原因**：没有配置 SPA 路由重写

**解决**：创建 `vercel.json` 文件（见上方配置）

### 3. 域名验证失败

**原因**：DNS 解析未生效

**解决**：
1. 检查 DNS 记录是否正确
2. 等待 10-30 分钟
3. 清除本地 DNS 缓存：`ipconfig /flushdns`
4. 使用在线工具检查：https://dnschecker.org

### 4. 自动部署不工作

**原因**：GitHub 集成问题

**解决**：
1. 项目页面 → **Settings** → **Git**
2. 检查 GitHub 连接状态
3. 重新连接 GitHub 仓库

### 5. 构建时间过长

**原因**：依赖包太多或网络慢

**解决**：
1. 清理不必要的依赖
2. 使用 `pnpm` 代替 `npm`（更快）
3. 在 Vercel 设置中配置 Node.js 版本

---

## Vercel vs 宝塔面板对比

| 特性 | Vercel | 宝塔面板 |
|------|--------|---------|
| 价格 | 免费 | 需要服务器（付费）|
| 部署速度 | 1-2分钟 | 5-10分钟 |
| 自动部署 | ✅ 支持 | ❌ 需手动 |
| HTTPS | ✅ 自动配置 | 需手动申请 |
| CDN | ✅ 全球加速 | ❌ 单服务器 |
| 域名绑定 | ✅ 简单 | ✅ 简单 |
| 访问速度 | 🚀 很快 | 取决于服务器 |
| 适合场景 | 静态网站、前端项目 | 全栈项目、需要后端 |

**推荐**：纯前端项目用 Vercel，有后端需求用宝塔。

---

## 部署检查清单

- [ ] 代码已推送到 GitHub
- [ ] 项目已导入到 Vercel
- [ ] 部署成功，可以访问 Vercel 默认域名
- [ ] 已添加自定义域名 hljs.qzz.io
- [ ] DNS 记录已配置（CNAME 或 A 记录）
- [ ] 域名验证成功
- [ ] HTTPS 自动配置完成
- [ ] 所有路由页面正常访问
- [ ] 自动部署已测试

---

## 快速命令参考

```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录
vercel login

# 部署到预览环境
vercel

# 部署到生产环境
vercel --prod

# 查看部署列表
vercel ls

# 查看项目信息
vercel inspect

# 删除部署
vercel rm [deployment-url]
```

---

## 下一步

部署成功后，你可以：

1. **配置 Analytics**：查看网站访问数据
2. **设置 Webhook**：集成其他服务
3. **配置 Preview Deployments**：为每个 PR 生成预览
4. **添加团队成员**：协作开发
5. **升级到 Pro**：获得更多功能（可选）

---

## 有用的链接

- Vercel 官网：https://vercel.com
- Vercel 文档：https://vercel.com/docs
- Vercel CLI 文档：https://vercel.com/docs/cli
- Vercel 状态页：https://vercel-status.com

---

🎉 **完成！你的博客已部署到 Vercel，享受自动部署和全球 CDN 加速吧！**

访问地址：`https://hljs.qzz.io`
