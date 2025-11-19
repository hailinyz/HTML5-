# Cloudflare 代理配置 - 解决 Vercel 国内访问问题

## 问题
Vercel 在国内访问不稳定或无法访问

## 解决方案
使用 Cloudflare CDN 代理，绕过限制

---

## 配置步骤

### 1. 登录 Cloudflare
访问：https://dash.cloudflare.com

### 2. 选择域名
点击 `hljs.qzz.io`

### 3. 进入 DNS 设置
点击左侧 **"DNS"** → **"Records"**

### 4. 修改 CNAME 记录

找到这条记录：
- Type: CNAME
- Name: dzy
- Target: cname.vercel-dns.com
- Proxy status: **DNS only**（灰色云朵）

点击记录，修改：
- Proxy status: 改为 **"Proxied"**（橙色云朵）✅
- 点击 **"Save"**

### 5. 配置 SSL/TLS

1. 点击左侧 **"SSL/TLS"** → **"Overview"**
2. 加密模式选择：**"Full (strict)"**
3. 保存

### 6. 优化设置（可选）

#### 6.1 开启 Auto Minify
- **"Speed"** → **"Optimization"**
- 勾选 JavaScript、CSS、HTML
- 自动压缩代码

#### 6.2 开启 Brotli 压缩
- **"Speed"** → **"Optimization"**
- 开启 Brotli

#### 6.3 配置缓存规则
- **"Caching"** → **"Configuration"**
- Browser Cache TTL: 4 hours
- 提升访问速度

### 7. 测试访问

等待 1-2 分钟后，访问：
- `https://dzy.hljs.qzz.io`

现在应该可以正常访问了！

---

## 工作原理

```
用户（国内）
    ↓
Cloudflare CDN（国内节点）✅ 可访问
    ↓
Vercel 服务器（国外）
```

流量通过 Cloudflare 中转，绕过了直连 Vercel 的限制。

---

## 注意事项

### 1. SSL 证书
- Vercel 的 SSL 证书仍然有效
- Cloudflare 会在外层再加一层 SSL
- 必须使用 "Full (strict)" 模式

### 2. 缓存问题
- Cloudflare 会缓存静态资源
- 更新网站后，可能需要清除缓存
- 在 Cloudflare 点击 **"Caching"** → **"Purge Everything"**

### 3. 访问速度
- 国内访问速度会明显提升
- 全球访问都会通过 Cloudflare CDN

---

## 对比

| 方案 | 国内访问 | 配置难度 | 成本 |
|------|---------|---------|------|
| Vercel 直连 | ❌ 不稳定 | 简单 | 免费 |
| Vercel + Cloudflare 代理 | ✅ 稳定 | 很简单 | 免费 |
| Cloudflare Pages | ✅ 很稳定 | 简单 | 免费 |
| 自己的服务器 | ✅ 最稳定 | 中等 | 付费 |

---

## 如果还是不行

### 检查 1：DNS 是否生效
```cmd
nslookup dzy.hljs.qzz.io
```

应该返回 Cloudflare 的 IP（不是 Vercel 的 IP）

### 检查 2：SSL 模式
确保 Cloudflare SSL/TLS 模式是 "Full (strict)"

### 检查 3：清除缓存
```cmd
ipconfig /flushdns
```

### 检查 4：使用其他网络
- 尝试用手机 4G/5G 访问
- 排除本地网络问题

---

## 完成！

配置完成后：
- ✅ 国内访问正常
- ✅ 访问速度提升
- ✅ 免费 CDN 加速
- ✅ DDoS 防护

访问地址：`https://dzy.hljs.qzz.io`
