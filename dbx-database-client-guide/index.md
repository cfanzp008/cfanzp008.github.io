# DBX：20MB 轻量级跨平台数据库客户端


# DBX：20MB 轻量级跨平台数据库客户端

说到数据库客户端，你可能会先想到 DBeaver（依赖 Java 运行时，动辄几百 MB）或 TablePlus（仅限 macOS）。而 **DBX** 给出了另一个答案：单个 20MB 的二进制文件，无需 Java、无需 Python 环境、不内嵌 Chromium，却能同时支持 70+ 种数据库，并且把 AI SQL 助手和 MCP Server 内建到了编辑器里。

本文基于 GitHub 上 [t8y2/dbx](https://github.com/t8y2/dbx) 项目官方文档编写，覆盖项目背景、安装方式、桌面端/Web 端/Docker 部署、CLI 与 MCP Server 用法。

<!--more-->

## DBX 是什么

DBX 是一个用 Rust 构建的开源跨平台数据库管理工具，核心卖点是"小而全"：

- **极致轻量**：安装包约 20MB，无 Java/Python 等运行时依赖，全平台可用
- **70+ 数据库**：MySQL、PostgreSQL、SQLite、Redis、MongoDB、DuckDB、ClickHouse、SQL Server、Oracle、达梦（DM）、OceanBase、openGauss、TiDB 等开箱即用，Agent 驱动还可扩展 Snowflake、Hive、Neo4j、Cassandra、DB2 等，并支持消息队列（Pulsar、Kafka、RocketMQ）
- **AI 原生**：内置 AI SQL 助手，支持自然语言生成 SQL、解释查询、优化 SQL，也支持解释执行计划
- **MCP 协议**：原生提供 MCP Server，Claude Code、Cursor、Windsurf 等 AI 编程助手可直接查询 DBX 中配置的连接
- **四种形态**：桌面端（macOS/Windows/Linux）、Docker 自托管、Web 版本、独立 CLI，共享同一套连接配置

常见误区澄清：DBX 不是 DBeaver 的替代插件，也不是只支持某一类数据库；它是一个独立的完整产品，AI 和 MCP 是原生内置功能而非第三方插件。

## 项目信息

| 项目 | 详情 |
|------|------|
| GitHub 仓库 | [t8y2/dbx](https://github.com/t8y2/dbx) |
| 开源协议 | Apache-2.0 |
| 技术栈 | Tauri 2 + Vue 3 + TypeScript + Rust（sqlx / tiberius / redis-rs / mongodb） |
| 安装包大小 | 约 20MB |
| 数据库支持 | 70+（原生驱动 + Agent/JDBC 驱动） |
| 界面语言 | 简体中文、English、Español |

## 安装 DBX

### 桌面端

从 [Releases 页面](https://github.com/t8y2/dbx/releases/latest) 下载对应系统的最新安装包即可，也可以用包管理器安装：

```bash
# macOS（Homebrew）
brew install --cask dbx

# Windows（Scoop）
scoop bucket add dbx https://github.com/t8y2/scoop-bucket
scoop install dbx

# Windows（WinGet）
winget install t8y2.dbx

# Linux（Flatpak）
flatpak remote-add --if-not-exists flatpark https://dl.flatpark.org/flatpark.flatpakrepo
flatpak install flatpark com.dbxio.dbx
```

> 银河麒麟 V10、统信 UOS 等国产系统推荐选择 **APM（AmberPM）版本**，可减少发行版依赖差异导致的安装问题。

### Docker 自托管

DBX 提供 Web 版本，一条命令即可部署到服务器供团队使用：

```bash
docker run -d --pull=always --name dbx -p 4224:4224 -v dbx-data:/app/data t8y2/dbx:latest
```

浏览器访问 `http://localhost:4224`。支持 amd64 / arm64 双架构镜像，中国大陆用户可换用 CNB 镜像 `docker.cnb.cool/dbxio.com/dbx:latest` 加速拉取。

如需通过 nginx 反向代理发布到 `/dbx` 子路径，设置环境变量 `DBX_PUBLIC_BASE_PATH=/dbx` 即可。

## 快速上手

启动 DBX 后，在连接列表中新建连接，选择数据库类型并填写主机、端口、用户名、密码即可。下面用一个 MySQL 例子演示基本操作流程：

1. **新建连接**：选择 MySQL，填写 `localhost:3306` 与账号密码，测试连接成功后保存
2. **浏览结构**：左侧边栏展开数据库，查看 Schema、表、字段、索引、外键、触发器，支持搜索和置顶
3. **查询数据**：在查询编辑器中输入 SQL，按 `Cmd+Enter`（Windows 为 `Ctrl+Enter`）执行，也支持只执行选中的 SQL

```sql
-- 在 DBX 查询编辑器中的示例
SELECT u.id, u.name, COUNT(o.id) AS order_count
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE u.created_at >= '2026-01-01'
GROUP BY u.id, u.name
ORDER BY order_count DESC;
```

执行结果以虚拟滚动表格展示，支持行内编辑（保存前预览 SQL）、排序、全文搜索、分页、列宽调整、DataGrip 风格过滤器，以及右键按 `LIKE` / `NOT LIKE` 过滤。结果可以一键导出或复制为 CSV、JSON、Markdown、XLSX 甚至 INSERT 语句。

## AI SQL 助手

这是 DBX 区别于传统客户端的核心功能。在编辑器中选中一张表，用自然语言描述需求，即可直接得到 SQL，全程无需在工具之间复制粘贴：

- **生成 SQL**：描述需求直接生成，例如"统计每月的销售额"
- **解释查询**：选中一段 SQL，让 AI 解释它的含义
- **优化 SQL**：分析慢查询并给出优化建议
- **修复错误**：执行报错时让 AI 自动修正
- **安全检查**：内置检查会在执行 AI 生成的 SQL 前审查，避免误操作

```text
用户输入：查询最近 30 天每天的新增用户数，按天分组
AI 生成：
SELECT DATE(created_at) AS day, COUNT(*) AS new_users
FROM users
WHERE created_at >= NOW() - INTERVAL 30 DAY
GROUP BY DATE(created_at)
ORDER BY day;
```

模型配置支持 Claude、OpenAI，以及任意 OpenAI 兼容端点；也可以通过 Ollama 接入本地模型，实现完全离线的 AI 辅助。数据库错误信息可以直接发送给 AI，让它基于实际报错内容给出修复建议。

## MCP Server：让 AI 编程助手直连数据库

DBX 原生支持 Model Context Protocol。安装 MCP Server 后，Claude Code、Cursor、Windsurf 等 AI 编程助手可以直接通过 DBX 中已配置的数据库连接查询数据，一次配置、处处可用：

```bash
npx @dbx-app/mcp-server
```

在项目的 `.mcp.json` 中添加配置：

```json
{
  "mcpServers": {
    "dbx": { "command": "npx", "args": ["-y", "@dbx-app/mcp-server"] }
  }
}
```

MCP Server 可以列出连接、浏览表、执行 SQL，还能直接在 DBX 界面中打开表。执行权限分为三档，在 DBX 的"设置 → MCP"中统一管理：

| 权限档位 | 说明 |
|---------|------|
| `read_only` | 只读查询，禁止任何写入 |
| `safe_write` | 允许安全的写操作 |
| `high_risk_write` | 允许高风险写操作（如 DROP、DELETE） |

如果连接的是 DBX Web 或 Docker 部署，需要让 MCP Server 指向 Web 后端 API；Web 登录页有密码时配置 `DBX_WEB_PASSWORD`：

```json
{
  "mcpServers": {
    "dbx": {
      "command": "npx",
      "args": ["-y", "@dbx-app/mcp-server"],
      "env": {
        "DBX_WEB_URL": "http://localhost:4224",
        "DBX_WEB_PASSWORD": "你的 Web 登录密码"
      }
    }
  }
}
```

## CLI 用法

DBX 提供独立 CLI 包，适合终端、脚本和 Codex 工作流：

```bash
# npm 全局安装
npm install -g @dbx-app/cli

# 或通过 Homebrew
brew tap t8y2/tap && brew install dbx-cli
```

CLI 共享桌面端的连接配置，常用命令示例：

```bash
# 列出所有连接
dbx connections list --json

# 对本地连接执行查询
dbx query local "select 1" --json
```

## 数据管理与 Schema 工具

除了基础的查询浏览，DBX 还内置了一批生产环境常用的数据工具：

- **数据导入**：从 CSV、Excel 导入数据
- **数据迁移**：在数据库之间迁移数据，支持跨异构数据库
- **数据对比**：对比两张表的数据差异，审查后同步结果
- **数据库导出**：完整导出整个数据库
- **SQL 文件执行**：直接执行 `.sql` 文件
- **文件预览**：拖入 Parquet、CSV、JSON 文件即时预览（基于 DuckDB）
- **连接导入**：从 DBeaver 或 Navicat 导入现有连接配置，迁移零成本
- **表结构编辑器**：对支持的数据库执行可审查的字段和索引变更
- **Schema 对比**：跨连接对比两张表的表结构差异
- **ER 关系图**：可视化展示表间关联关系
- **执行计划**：可视化查看 SQL 执行计划
- **字段血缘**：字段级血缘分析

### 专项浏览器

- **Redis**：支持模式匹配搜索、批量键操作、命令执行器、TTL 编辑，全数据类型支持（String、Hash、List、Set、ZSet、Stream）
- **MongoDB**：文档增删改查、分页浏览，支持 Atlas 和副本集 URL 直连

## 安全与企业能力

对于生产环境，DBX 提供以下安全特性：

- **SSH 隧道**：支持密钥和密码两种认证方式
- **危险操作确认**：执行 DROP、DELETE 等危险操作前弹出确认对话框
- **连接配置加密**：导出/导入连接配置时加密保护
- **断线自动重连**：网络抖动时自动恢复连接
- **离线驱动包**：内网环境可在有网机器下载离线驱动包，传输后在"设置 → 驱动管理"中导入
- **数据隐私**：不收集任何遥测数据，自动更新仅检查 GitHub Releases（可在设置中禁用）

## 常见问题

**DBX 是免费的吗？**

是的。DBX 基于 Apache-2.0 协议开源，所有功能均免费使用。

**DBX 和 DBeaver / TablePlus 有什么区别？**

DBX 仅 20MB，无需 Java/Python 运行时；AI 和 MCP 是原生内置功能而不是插件；单一代码库同时支持 70+ 数据库和桌面端、Docker、Web 三种形态。

**可以完全离线使用吗？**

可以。桌面端完全支持离线使用，AI 功能可通过 Ollama 使用本地模型。内网环境可通过离线驱动包安装数据库驱动。

**支持哪些数据库？**

MySQL、PostgreSQL、SQLite、Redis、MongoDB、DuckDB、ClickHouse、SQL Server、Oracle、达梦、OceanBase、openGauss、TiDB 等 70+ 数据库开箱即用，Agent 驱动还可扩展到 Snowflake、Hive、DB2、Neo4j、Cassandra 等，并支持 Pulsar、Kafka、RocketMQ 消息队列。

## 参考链接

- [DBX GitHub 仓库](https://github.com/t8y2/dbx)
- [DBX 官方文档](https://dbxio.com/cn/docs/what-is-dbx)
- [DBX Releases 下载页](https://github.com/t8y2/dbx/releases/latest)
- [MCP Server 说明](https://github.com/t8y2/dbx/tree/main/packages/mcp-server)
- [CLI 说明](https://github.com/t8y2/dbx/tree/main/packages/cli)

---

> 作者: [](https://cfanzp008.github.io/about/)  
> URL: https://cfanzp008.github.io/dbx-database-client-guide/  

