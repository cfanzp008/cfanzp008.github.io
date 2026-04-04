# last30days：AI 驱动的全网研究技能


# last30days：AI 驱动的全网研究技能

## 什么是 last30days

last30days 是一个 AI Agent 技能，专门用于在多个平台进行深度研究并合成有根据的总结。该项目在 GitHub 上已获得 **18,100+ 颗星**，是 AI 研究工具领域的热门开源项目。

### 核心理念

- **跨平台研究**：同时搜索 Reddit、X (Twitter)、YouTube、Hacker News、Polymarket 等平台
- **智能合成**：将分散的信息整合为结构化的总结报告
- **有据可查**：所有结论都基于真实数据，而非主观猜测
- **实时更新**：获取最近 30 天的最新信息

## 支持的平台

| 平台 | 用途 |
|-----|------|
| Reddit | 社区讨论、热门话题 |
| X (Twitter) | 实时动态、专家观点 |
| YouTube | 视频内容、教程 |
| Hacker News | 技术讨论、创业热点 |
| Polymarket | 预测市场、趋势分析 |
| Web Search | 通用搜索补充 |

## 核心功能

### 1. 智能研究

- 输入任意主题
- 自动在多个平台搜索相关信息
- 过滤噪音，提取关键信息

### 2. 趋势分析

- 识别热门话题
- 分析讨论趋势
- 预测未来走向

### 3. 多维度总结

- 技术角度分析
- 社区反馈汇总
- 市场情绪评估

### 4. 证据溯源

- 引用来源链接
- 数据可验证
- 避免虚假信息

## 安装配置

### 前置要求

- Python 3.8+
- Claude Code 或兼容的 AI 助手
- API 密钥（根据使用的平台）

### 安装步骤

```bash
# 克隆仓库
git clone https://github.com/mvanhorn/last30days-skill.git

# 进入目录
cd last30days-skill

# 查看安装说明
cat SKILL.md
```

### 配置 API 密钥

根据需要研究的平台，配置相应的 API 密钥：

```bash
# 环境变量设置
export REDDIT_CLIENT_ID="your-reddit-client-id"
export REDDIT_CLIENT_SECRET="your-reddit-client-secret"
export TWITTER_BEARER_TOKEN="your-twitter-bearer-token"
export YOUTUBE_API_KEY="your-youtube-api-key"
```

## 使用方法

### 基本用法

在 Claude Code 或其他 AI 助手中使用：

```
/last30days <你想研究的主题>

# 示例
/last30days AI 编程助手的最新发展趋势
/last30days 2026 年有哪些新技术值得关注
```

### 高级用法

```bash
# 指定平台
/last30days --platforms reddit,x,hn --topics AI趋势

# 指定时间范围
/last30days --days 7 "Rust 语言的最新动态"

# 排除某些平台
/last30days --exclude youtube "比特币价格分析"
```

### 输出格式

执行后会生成结构化报告，包括：

1. **执行摘要**：快速了解主题
2. **详细发现**：各平台的信息汇总
3. **趋势分析**：热度和发展方向
4. **来源链接**：所有引用的出处

## 应用场景

### 1. 技术调研

- 了解新技术发展趋势
- 评估技术栈优劣
- 寻找最佳实践

### 2. 市场分析

- 追踪行业动态
- 分析竞争对手
- 预测市场走向

### 3. 投资参考

- 研究新兴项目
- 了解社区情绪
- 分析预测市场

### 4. 内容创作

- 寻找创作素材
- 了解热门话题
- 获取第一手资料

## 与传统搜索对比

| 特性 | last30days | 传统搜索引擎 |
|-----|-----------|-------------|
| 搜索范围 | 多平台同时搜索 | 单一搜索 |
| 信息整合 | 自动合成总结 | 需手动整理 |
| 深度分析 | AI 智能分析 | 简单排序 |
| 时效性 | 最近 30 天 | 无限制 |
| 可靠性 | 引用来源 | 质量参差 |

## 注意事项

### 1. API 限制

部分平台有 API 调用限制，需要合理使用。

### 2. 数据时效

默认搜索最近 30 天的数据，确保信息新鲜度。

### 3. 结果验证

建议对重要信息进行二次验证。

## 总结

last30days 是一个强大的 AI 研究工具，特别适合：

- ✅ 技术调研和趋势分析
- ✅ 市场研究和竞争分析
- ✅ 内容创作素材收集
- ✅ 投资决策参考

如果你需要快速了解某个主题的全貌，last30days 是极佳的选择。

## 参考链接

- GitHub：https://github.com/mvanhorn/last30days-skill
- 技能文档：https://github.com/mvanhorn/last30days-skill/blob/main/SKILL.md
- 规格说明：https://github.com/mvanhorn/last30days-skill/blob/main/SPEC.md

---

> 作者: [](https://cfanzp008.github.io/about/)  
> URL: https://cfanzp008.github.io/last30days-skill-introduction/  

