# Cloudflare + Vercel 域名绑定指南

## 场景说明
- 主域名：`hljs.qzz.io`（托管在 Cloudflare）
- 子域名：`dzy.hljs.qzz.io`（要绑定到 Vercel 项目）
- 项目：部署在 Vercel 的 Vue 博客

---

## 第一步：在 Vercel 添加域名

### 1.1 登录 Vercel
访问：https://vercel.com/dashboard

### 1.2 进入项目设置
1. 选择你的项目（hailin-blog）
2. 点击 **"Settings"** 标签
3. 点击左侧 **"Domains"**

### 1.3 添加域名
1. 在输入框中输入：`dzy.hljs.qzz.io`
2. 点击 **"Add"** 按钮
3. Vercel 会显示需要配置的 DNS 记录

---

## 第二步：在 Cloudflare 配置 DNS

### 2.1 登录 Cloudflare
访问：https://dash.cloudflare.com

### 2.2 选择域名
点击 `hljs.qzz.io` 域名

### 2.3 进入 DNS 设置
点击左侧菜单 **"DNS"** → **"Records"**

### 2.4 添加 CNAME 记录

点击 **"Add record"** 按钮，填写：

| 字段 | 值 |
|------|-----|
| Type | CNAME |
| Name | dzy |
| Target | cname.vercel-dns.com |
| Proxy status | **DNS only**（灰色云朵，关闭代理）⚠️ 重要！ |
| TTL | Auto |

**重要提示：**
- ⚠️ **必须选择 "DNS only"（灰色云朵）**，不要开启 Cloudflare 代理（橙色云朵）
- 如果开启代理，Vercel 的 SSL 证书验证会失败

### 2.5 添加 TXT 记录（用于验证）

Vercel 会要求你添加一个 TXT 记录来验证域名所有权：

点击 **"Add record"** 按钮，填写：

| 字段 | 值 |
|------|-----|
| Type | TXT |
| Name | _vercel |
| Content | `vc-domain-verify=dzy.hljs.qzz.io,xxxxx...`（从 Vercel 复制完整内容）|
| TTL | Auto |

### 2.6 保存配置

点击 **"Save"** 按钮

---

## 第三步：等待验证

### 3.1 等待 DNS 生效
- Cloudflare 的 DNS 通常 1-5 分钟生效
- 比其他 DNS 服务商快很多

### 3.2 在 Vercel 刷新验证
1. 回到 Vercel 的 Domains 页面
2. 点击 **"Refresh"** 按钮
3. 等待几秒钟，验证成功后状态变为 **"Valid Configuration"**

### 3.3 自动配置 SSL
- Vercel 会自动为 `dzy.hljs.qzz.io` 配置 SSL 证书
- 通常需要 1-2 分钟

---

## 第四步：访问网站

验证成功后，访问：
- `https://dzy.hljs.qzz.io`

网站应该可以正常访问了！🎉

---

## 可选：开启 Cloudflare 代理（高级）

如果你想使用 Cloudflare 的 CDN 和防护功能：

### 方法一：使用 Cloudflare Pages（推荐）

不用 Vercel，直接部署到 Cloudflare Pages：
1. 访问：https://pages.cloudflare.com
2. 连接 GitHub 仓库
3. 自动部署
4. 可以开启橙色云朵代理

### 方法二：配置 Cloudflare 与 Vercel 共存

1. **在 Cloudflare 添加 CNAME 记录**（开启代理）：
   - Type: CNAME
   - Name: dzy
   - Target: cname.vercel-dns.com
   - Proxy status: **Proxied**（橙色云朵）

2. **在 Cloudflare SSL/TLS 设置**：
   - 点击 **"SSL/TLS"** → **"Overview"**
   - 加密模式选择：**"Full (strict)"**

3. **在 Vercel 配置**：
   - 确保域名已验证
   - Vercel 会自动适配 Cloudflare 代理

**注意：** 这种方式可能导致双重 CDN，访问速度不一定更快。

---

## 完整的 DNS 配置示例

在 Cloudflare DNS 管理页面，你应该有这些记录：

| Type | Name | Content | Proxy | TTL |
|------|------|---------|-------|-----|
| A | hljs.qzz.io | 60.205.195.58 | Proxied | Auto |
| CNAME | dzy | cname.vercel-dns.com | **DNS only** | Auto |
| TXT | _vercel | vc-domain-verify=... | - | Auto |

---

## 常见问题

### 1. 验证失败：Invalid Configuration

**原因：** DNS 记录配置错误

**解决：**
- 检查 CNAME 记录的 Name 是否为 `dzy`（不是 `dzy.hljs.qzz.io`）
- 检查 Target 是否为 `cname.vercel-dns.com`
- 确保 Proxy status 是 **"DNS only"**（灰色云朵）
- 等待 5-10 分钟让 DNS 生效

### 2. SSL 证书错误

**原因：** Cloudflare 代理开启了，但 SSL 模式不对

**解决：**
- 方案 A：关闭 Cloudflare 代理（灰色云朵）
- 方案 B：Cloudflare SSL/TLS 模式改为 "Full (strict)"

### 3. 访问显示 404 Not Found

**原因：** Vercel 项目没有正确部署

**解决：**
1. 检查 Vercel 项目是否部署成功
2. 访问 Vercel 默认域名测试（如 `xxx.vercel.app`）
3. 确认项目可以正常访问后再绑定域名

### 4. 页面刷新出现 404

**原因：** Vue Router 配置问题

**解决：** 在项目根目录创建 `vercel.json`：

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

提交代码后重新部署。

### 5. DNS 解析到错误的 IP

**原因：** 有多条冲突的 DNS 记录

**解决：**
1. 在 Cloudflare DNS 页面检查是否有多条 `dzy` 记录
2. 删除多余的 A 记录或 CNAME 记录
3. 只保留一条 CNAME 记录指向 `cname.vercel-dns.com`

---

## 检查 DNS 是否生效

### Windows 系统

```cmd
# 清除 DNS 缓存
ipconfig /flushdns

# 查询 DNS 记录
nslookup dzy.hljs.qzz.io

# 测试连接
ping dzy.hljs.qzz.io
```

### 在线工具

- DNS 检查：https://dnschecker.org
- 输入：`dzy.hljs.qzz.io`
- 类型：CNAME
- 查看全球解析情况

---

## 删除旧的 DNS 记录

如果之前配置过指向服务器的 A 记录：

1. 在 Cloudflare DNS 页面
2. 找到 `dzy` 的 A 记录（指向 60.205.195.58）
3. 点击 **"Edit"** → **"Delete"**
4. 确认删除

---

## 配置检查清单

- [ ] Vercel 项目已部署成功
- [ ] 在 Vercel 添加域名 `dzy.hljs.qzz.io`
- [ ] 在 Cloudflare 添加 CNAME 记录（dzy → cname.vercel-dns.com）
- [ ] CNAME 记录的 Proxy status 设置为 **"DNS only"**（灰色云朵）
- [ ] 在 Cloudflare 添加 TXT 记录（_vercel → vc-domain-verify=...）
- [ ] 删除旧的 A 记录（如果有）
- [ ] 等待 5-10 分钟 DNS 生效
- [ ] 在 Vercel 点击 Refresh 验证
- [ ] 域名状态显示 "Valid Configuration"
- [ ] 访问 `https://dzy.hljs.qzz.io` 正常

---

## Cloudflare 的优势

使用 Cloudflare 托管 DNS 的好处：
- ✅ DNS 解析速度快（1-5 分钟生效）
- ✅ 免费 CDN 加速
- ✅ DDoS 防护
- ✅ 免费 SSL 证书
- ✅ 页面规则和缓存控制
- ✅ 网站分析

---

## 完成后的访问地址

- **Vercel 默认域名**：`https://hailin-blog.vercel.app`
- **自定义域名**：`https://dzy.hljs.qzz.io`
- **主域名**：`https://hljs.qzz.io`（指向你的服务器）

所有域名都会自动配置 HTTPS！

---

## 下一步建议

1. **配置 Cloudflare 页面规则**：
   - 缓存静态资源
   - 设置浏览器缓存 TTL

2. **开启 Cloudflare Analytics**：
   - 查看网站访问数据
   - 完全免费

3. **配置 Cloudflare Workers**（可选）：
   - 边缘计算
   - 自定义请求处理

4. **设置 Cloudflare Email Routing**（可选）：
   - 免费邮箱转发
   - 如 admin@hljs.qzz.io

---

🎉 **完成！你的 Vercel 项目已成功绑定到 Cloudflare 托管的域名！**

访问地址：`https://dzy.hljs.qzz.io`
