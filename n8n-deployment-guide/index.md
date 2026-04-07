# n8n 自部署指南：开源工作流自动化平台


# n8n 自部署指南：开源工作流自动化平台

## 什么是 n8n

n8n（发音为 "n-eight-n"）是一个开源的工作流自动化平台，被称为"自托管的 Zapier 替代品"。它允许用户通过可视化的节点编辑器创建自动化工作流，连接不同的应用程序和服务，实现业务流程的自动化。

**n8n 的核心特点：**
- **开源免费**：MIT 许可证，可自托管
- **可视化编辑器**：无需编码，通过拖拽创建工作流
- **丰富集成**：支持 400+ 应用集成
- **灵活部署**：支持 Docker、Kubernetes、本地部署
- **定时执行**：支持手动、定时、事件触发

截至目前，n8n 在 GitHub 上已获得超过 37000 个 Star，是最受欢迎的自动化工作流工具之一。

## 部署方式选择

n8n 支持多种部署方式：

| 部署方式 | 适用场景 | 难度 |
|---------|---------|------|
| Docker Compose（SQLite） | 个人使用、小团队 | 简单 |
| Docker Compose（PostgreSQL） | 生产环境、多用户 | 中等 |
| Node.js (npm) | 本地开发测试 | 简单 |
| Kubernetes | 大规模生产部署 | 复杂 |

## Docker Compose 部署（推荐）

### 环境要求

- 服务器：Ubuntu 22.04+ 或其他 Linux 发行版
- 资源：建议 2GB+ 内存，20GB+ 存储
- Docker 和 Docker Compose 已安装

### 简单版（SQLite）

创建项目目录和配置文件：

```bash
mkdir -p ~/n8n && cd ~/n8n

cat > docker-compose.yml <<'YAML'
services:
  n8n:
    image: n8nio/n8n:latest
    container_name: n8n
    restart: unless-stopped
    ports:
      - "5678:5678"
    environment:
      - N8N_HOST=automation.example.com
      - N8N_PORT=5678
      - N8N_PROTOCOL=https
      - WEBHOOK_URL=https://automation.example.com/
      - N8N_ENCRYPTION_KEY=${N8N_ENCRYPTION_KEY}
      - GENERIC_TIMEZONE=Asia/Shanghai
    volumes:
      - ./n8n_data:/home/node/.n8n
YAML
```

设置加密密钥并启动：

```bash
export N8N_ENCRYPTION_KEY=$(openssl rand -hex 32)
docker compose up -d
```

### 生产版（PostgreSQL）

对于团队使用或生产环境，建议使用 PostgreSQL：

```bash
mkdir -p ~/n8n && cd ~/n8n

cat > docker-compose.yml <<'YAML'
services:
  n8n:
    image: n8nio/n8n:latest
    container_name: n8n
    restart: unless-stopped
    depends_on:
      - postgres
    ports:
      - "5678:5678"
    environment:
      - N8N_HOST=automation.example.com
      - N8N_PORT=5678
      - N8N_PROTOCOL=https
      - WEBHOOK_URL=https://automation.example.com/
      - N8N_ENCRYPTION_KEY=${N8N_ENCRYPTION_KEY}
      - GENERIC_TIMEZONE=Asia/Shanghai
      - DB_TYPE=postgresdb
      - DB_POSTGRESDB_HOST=postgres
      - DB_POSTGRESDB_PORT=5432
      - DB_POSTGRESDB_DATABASE=n8n
      - DB_POSTGRESDB_USER=n8n
      - DB_POSTGRESDB_PASSWORD=${POSTGRES_PASSWORD}
    volumes:
      - ./n8n_data:/home/node/.n8n

  postgres:
    image: postgres:15
    container_name: n8n_postgres
    restart: unless-stopped
    environment:
      - POSTGRES_USER=n8n
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DB=n8n
    volumes:
      - ./pg_data:/var/lib/postgresql/data
YAML
```

设置密钥并启动：

```bash
export N8N_ENCRYPTION_KEY=$(openssl rand -hex 32)
export POSTGRES_PASSWORD=$(openssl rand -hex 24)
docker compose up -d
```

## 添加 SSL（可选）

使用 Nginx 反向代理并配置 SSL：

```bash
# 安装 Nginx 和 Certbot
sudo apt update && sudo apt install -y nginx certbot python3-certbot-nginx

# 配置 Nginx
sudo tee /etc/nginx/sites-available/n8n > /dev/null <<'NGINX'
server {
    listen 80;
    server_name automation.example.com;
    
    location / {
        proxy_pass http://127.0.0.1:5678;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
NGINX

# 启用配置
sudo ln -s /etc/nginx/sites-available/n8n /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# 获取 SSL 证书
sudo certbot --nginx -d automation.example.com --redirect
```

## 快速测试（Docker Run）

用于本地快速测试：

```bash
docker run -it --rm \
  -p 5678:5678 \
  -e N8N_HOST=localhost \
  -e N8N_PORT=5678 \
  -e N8N_PROTOCOL=http \
  -e WEBHOOK_URL=http://localhost:5678/ \
  -e N8N_ENCRYPTION_KEY=$(openssl rand -hex 32) \
  n8nio/n8n:latest
```

## 思维导图：n8n 部署流程

```
                         ┌─────────────────────────────────────────┐
                         │        n8n 部署流程总览                 │
                         └─────────────────────────────────────────┘
                                            │
          ┌─────────────────────────────────┼─────────────────────────────────┐
          │                                 │                                 │
          ▼                                 ▼                                 ▼
┌─────────────────────┐        ┌─────────────────────┐        ┌─────────────────────┐
│     环境准备        │        │    选择部署方式      │        │     配置优化        │
│                     │        │                     │        │                     │
└─────────────────────┘        └─────────────────────┘        └─────────────────────┘
          │                                 │                                 │
          ├─安装 Docker                    ├─Docker Compose SQLite          ├─设置加密密钥
          ├─安装 Docker Compose           ├─Docker Compose PostgreSQL      ├─配置时区
          ├─准备服务器                    ├─Node.js (npm)                 ├─配置 SMTP
          └─配置域名                      └─Kubernetes                   ├─配置备份
                                                                      ├─配置 SSL
                                           ▼
                              ┌─────────────────────────────────┐
                              │        核心环境变量             │
                              ├─────────────────────────────────┤
                              │ • N8N_HOST - 主机名            │
                              │ • N8N_PORT - 端口              │
                              │ • N8N_PROTOCOL - 协议          │
                              │ • WEBHOOK_URL - Webhook 地址   │
                              │ • N8N_ENCRYPTION_KEY - 加密密钥 │
                              │ • GENERIC_TIMEZONE - 时区      │
                              └─────────────────────────────────┘
```

## 常见使用案例

### 案例 1：自动收集社交媒体数据

**场景**：每天自动收集 Twitter/X 和 Reddit 的特定话题讨论

**工作流节点**：
1. **Schedule Trigger** - 每天早上 8 点触发
2. **HTTP Request** - 调用 Twitter API 获取话题推文
3. **HTTP Request** - 调用 Reddit API 获取帖子
4. **Function** - 合并和格式化数据
5. **Gmail** - 发送每日报告到指定邮箱

**配置示例**：
```
触发器：每天 8:00
  ↓
Twitter: 搜索关键词 "AI automation"
  ↓
Reddit: 搜索 subreddit "programming"
  ↓
数据处理：JSON 合并去重
  ↓
Gmail: 发送报告到 user@example.com
```

### 案例 2：自动化客户支持

**场景**：新客户提交表单后自动创建支持工单

**工作流节点**：
1. **Webhook Trigger** - 接收网站表单提交
2. **IF** - 判断客户类型（VIP/普通）
3. **Mattermost** - 发送通知到客服频道
4. **Google Sheets** - 记录客户信息
5. **Slack** - 向对应客服发送提醒

### 案例 3：定时备份数据

**场景**：每天自动备份 MySQL 数据库到云存储

**工作流节点**：
1. **Schedule Trigger** - 每天凌晨 2 点
2. **MySQL** - 执行备份查询
3. **Function** - 压缩数据
4. **Google Drive** - 上传到指定文件夹
5. **Discord** - 发送备份完成通知

### 案例 4：AI 内容创作助手

**场景**：输入主题关键词，自动生成并发布文章

**工作流节点**：
1. **Manual Trigger** - 手动触发
2. **HTTP Request** - 调用 OpenAI API 生成大纲
3. **HTTP Request** - 调用 OpenAI API 生成正文
4. **WordPress** - 发布到博客
5. **Gmail** - 发送发布通知

### 案例 5：自动化代码部署

**场景**：GitHub PR 合并后自动部署到服务器

**工作流节点**：
1. **GitHub Webhook** - 监听 PR 合并事件
2. **GitHub** - 获取最新代码
3. **SSH** - 连接到服务器
4. **Command** - 执行部署命令
5. **Discord** - 发送部署结果

### 案例 6：定时数据同步

**场景**：每小时同步 CRM 数据到数据分析工具

**工作流节点**：
1. **Schedule Trigger** - 每小时
2. **HTTP Request** - 获取 CRM API 数据
3. **Transform** - 转换数据格式
4. **PostgreSQL** - 写入分析数据库
5. **Wait** - 等待下一次同步

## 常用节点介绍

| 节点类别 | 常用节点 | 功能 |
|---------|---------|------|
| 触发器 | Schedule, Webhook, Manual | 工作流启动条件 |
| 通信 | Gmail, Slack, Discord, Telegram | 消息通知 |
| 数据 | HTTP Request, JSON, Function | 数据处理 |
| 存储 | Google Sheets, PostgreSQL, MySQL | 数据存储 |
| AI | OpenAI, Anthropic | AI 能力集成 |
| 开发工具 | GitHub, GitLab, SSH | 代码和部署 |
| 营销 | WordPress, Mailchimp | 营销自动化 |

## 配置优化建议

### 生产环境必须配置

```bash
# 关键环境变量
N8N_ENCRYPTION_KEY=${N8N_ENCRYPTION_KEY}    # 必须设置强密钥
N8N_PROTOCOL=https                          # 生产环境必须 HTTPS
WEBHOOK_URL=https://your-domain.com/        # 正确的 Webhook 地址
GENERIC_TIMEZONE=Asia/Shanghai              # 设置正确时区
```

### 备份策略

```bash
# 备份 SQLite 数据
tar -czf n8n_backup_$(date +%Y%m%d).tar.gz ./n8n_data

# 备份 PostgreSQL 数据
docker exec n8n_postgres pg_dump -U n8n n8n > backup.sql
```

### 更新 n8n

```bash
# 拉取最新镜像
docker compose pull

# 重启服务
docker compose up -d
```

## 常见问题

### Q: 如何实现 HTTPS 访问？

A: 使用 Nginx 反向代理 + Let's Encrypt SSL 证书，或使用 Traefik 自动配置。

### Q: 工作流在哪里运行？

A: 在 n8n 服务器上运行，可以是本地服务器、云服务器或 Docker 环境。

### Q: 如何实现多个工作流？

A: n8n 支持创建多个独立的工作流，每个工作流可以有不同的触发条件和动作。

### Q: 是否需要编程基础？

A: 不需要。n8n 提供可视化界面，通过连接节点即可创建工作流。复杂逻辑可使用 Function 节点编写 JavaScript。

### Q: 免费版 vs 收费版区别？

A: 自托管版本功能完全免费。官方云服务有收费版，主要区别在于托管便利性和支持服务。

## 总结

n8n 是一个功能强大且灵活的开源工作流自动化平台。通过 Docker 部署，可以快速搭建自己的自动化服务，实现业务流程的自动化和效率提升。

**部署要点：**
1. 生产环境使用 Docker Compose + PostgreSQL
2. 配置 SSL 和加密密钥
3. 定期备份数据
4. 及时更新版本

**使用建议：**
1. 从简单工作流开始
2. 充分利用定时执行功能
3. 结合 AI 节点实现智能化
4. 做好数据备份

## 参考资源

- [n8n 官网](https://n8n.io/)
- [n8n GitHub](https://github.com/n8n-io/n8n)
- [n8n 文档](https://docs.n8n.io/)
- [n8n 社区](https://community.n8n.io/)

---

> 作者: [](https://cfanzp008.github.io/about/)  
> URL: https://cfanzp008.github.io/n8n-deployment-guide/  

