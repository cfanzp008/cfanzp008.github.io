# Claude Relay Service - 自建 Claude API 中转服务


# Claude Relay Service - 自建 Claude API 中转服务

## 前言

[Claude Relay Service](https://github.com/Wei-Shaw/claude-relay-service)（简称 CRS）是一个开源的 Claude API 中转服务项目，在 GitHub 上已获得 **11k+ stars**，fork 数量达 **1.6k**，是目前最受欢迎的 Claude 自建服务方案之一。

## 这个项目适合谁？

如果你有以下需求，CRS 可能是你的解决方案：

- 🌍 **地区限制**：所在地区无法直接访问 Claude Code 服务
- 🔒 **隐私担忧**：担心第三方镜像服务会记录对话内容
- 👥 **成本分摊**：想和朋友一起分摊 Claude Code Max 订阅费用
- ⚡ **稳定性需求**：第三方镜像站经常不稳定，影响工作效率

## 核心功能

### 基础功能
- ✅ **多账户管理**：支持添加多个 Claude 账户自动轮换
- ✅ **自定义 API Key**：给每个人分配独立的 Key
- ✅ **使用统计**：详细记录每个人用了多少 Token

### 高级功能
- 🔄 **智能切换**：账户出问题自动切换到下一个
- 🚀 **性能优化**：连接池、缓存，减少延迟
- 📊 **监控面板**：Web 界面查看所有数据
- 🛡️ **安全控制**：访问限制、速率控制、客户端限制
- 🌐 **代理支持**：支持 HTTP/SOCKS5 代理

## 支持的模型

CRS 不仅支持 Claude，还支持多种主流 AI 服务：

| 服务 | 支持的模型 |
|------|-----------|
| Claude | Sonnet 4.5, Opus 4, Haiku 等 |
| Gemini | Gemini 2.5 Pro, Gemini 3 Pro |
| Codex | GPT-5 Codex |
| Droid | 自定义 Droid 账号池 |

## 技术架构

### 技术栈
- **后端**：Node.js 18+
- **数据库**：Redis 6+
- **前端**：Vue.js
- **部署**：Docker 支持

### 项目结构
```
claude-relay-service/
├── src/              # 后端源码
├── web/admin-spa/    # 管理后台前端
├── cli/              # CLI 工具
├── config/           # 配置文件
├── scripts/          # 脚本工具
└── docs/             # 文档
```

## 部署方式

### 方式一：脚本部署（推荐）

```bash
curl -fsSL https://pincc.ai/manage.sh -o manage.sh && chmod +x manage.sh && ./manage.sh install
```

安装完成后使用 `crs` 命令管理：

```bash
crs install   # 安装服务
crs start     # 启动服务
crs stop      # 停止服务
crs status    # 查看状态
crs update    # 更新服务
```

### 方式二：Docker 部署

```bash
curl -fsSL https://pincc.ai/crs-compose.sh -o crs-compose.sh && chmod +x crs-compose.sh && ./crs-compose.sh
docker-compose up -d
```

### 方式三：手动部署

需要依次安装 Node.js、Redis，克隆项目，配置环境变量，最后启动服务。

## 使用方法

### 1. 添加 Claude 账户

1. 访问管理界面：`http://你的服务器IP:3000/web`
2. 点击「Claude 账户」标签
3. 点击「生成授权链接」，完成 OAuth 授权

### 2. 创建 API Key

在管理后台创建 API Key，可设置：
- 速率限制
- 并发限制
- 模型限制
- 客户端限制（Claude Code、Gemini CLI 等）

### 3. 客户端配置

**Claude Code 配置：**

```bash
export ANTHROPIC_BASE_URL="http://你的服务器:3000/api/"
export ANTHROPIC_AUTH_TOKEN="后台创建的API密钥"
claude
```

**Gemini CLI 配置：**

```bash
CODE_ASSIST_ENDPOINT="http://你的服务器:3000/gemini"
GOOGLE_CLOUD_ACCESS_TOKEN="后台创建的API密钥"
GOOGLE_GENAI_USE_GCA="true"
GEMINI_MODEL="gemini-2.5-pro"
gemini
```

## 费用估算

| 项目 | 费用 |
|------|------|
| 服务器 | 30-60 元/月 |
| Claude 订阅 | 多人分摊 |
| 域名 | 可选 |

## 安全建议

- ⚠️ 使用本项目可能违反 Anthropic 服务条款
- 🔐 建议使用 HTTPS（可通过 Caddy 反向代理）
- 🔒 定期更换 JWT 和加密密钥
- 🛡️ 防火墙只开放必要端口

## 总结

Claude Relay Service 为技术爱好者提供了一个自建 AI API 服务的完整方案。它的优势在于：

1. **数据隐私**：所有请求直连 Anthropic API，不经过第三方
2. **成本透明**：用了多少 Token 一目了然
3. **灵活配置**：支持多种客户端和模型
4. **社区活跃**：11k+ stars，有完善的文档和问题解答

如果你有一定技术基础且有拼车需求，CRS 是一个值得考虑的选择。

---

**参考链接**：
- GitHub: https://github.com/Wei-Shaw/claude-relay-service
- 演示站点: https://demo.pincc.ai/admin-next/login
- 文档: https://pincc.ai/

---

> 作者: [](https://cfanzp008.github.io/about/)  
> URL: https://cfanzp008.github.io/claude-relay-service-introduction/  

