# AI Stupid Level - AI 模型实时基准测试平台


# AI Stupid Level - AI 模型实时基准测试平台

## 简介

AI Stupid Level 是一个实时 AI 模型基准测试和排名平台。它追踪 50+ 主流 AI 模型，通过 7 维度评分体系对模型进行客观评测对比。

> 网站：https://aistupidlevel.info/

## 核心功能

### 7 维度评分体系

平台采用 7 个维度评估 AI 模型：

| 维度 | 说明 |
|------|------|
| 正确性 | 答案准确程度 |
| 规范遵循 | 符合指令要求 |
| 代码质量 | 代码规范和可维护性 |
| 效率 | 响应速度和资源消耗 |
| 稳定性 | 输出一致性 |
| 拒绝率 | 不当请求处理 |
| 特色功能 | 特殊能力支持 |

### 追踪模型

平台追踪 50+ 主流 AI 模型，包括：

- OpenAI GPT-5 / GPT-4 / GPT-3.5
- Anthropic Claude Opus 4 / Sonnet 4
- Google Gemini 2.5 系列
- xAI Grok 4
- 以及其他主流模型

### 实时更新

- 速度测试：每 4 小时更新
- 深度推理测试：每日更新
- 95% 置信区间统计

## Smart Router API

### 功能特点

智能路由 API 可以自动选择最佳模型：

- OpenAI 兼容 API
- 统一 API Key（格式：`aism_xxxxx`）
- 6 种路由策略
- 自动故障转移

### 使用方式

```bash
# 标准 OpenAI 兼容请求
curl -X POST https://aistupidlevel.info/v1/chat/completions \
  -H "Authorization: Bearer aism_your_key" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "auto",
    "messages": [{"role": "user", "content": "Hello"}]
  }'
```

### API 端点

```bash
# 获取模型列表
GET https://aistupidlevel.info/v1/models

# 获取排行榜数据
GET https://aistupidlevel.info/api/dashboard

# 获取历史数据
GET https://aistupidlevel.info/api/dashboard?period=7d
```

## 使用场景

### 1. 基准测试数据

- 查看实时模型排名
- 对比不同模型性能
- 访问历史性能数据

### 2. 智能路由

- 注册账户添加多个 Provider Key
- 生成统一 API Key
- 替换现有 OpenAI 端点使用

### 3. 开发者集成

- API 编程访问
- 集成到现有工具
- 开源项目贡献

## 使命与价值观

- **透明度**：所有方法和代码开源
- **统计严谨**：置信区间和显著性测试
- **社区驱动**：持续改进
- **成本优化**：帮助用户优化 AI 支出

## 总结

AI Stupid Level 为开发者和研究人员提供了客观、透明的 AI 模型性能对比工具。通过 7 维度评分和实时追踪，可以更好地了解各模型优劣，选择适合的 AI 解决方案。

**网站：** https://aistupidlevel.info/

---

> 作者: [](https://cfanzp008.github.io/about/)  
> URL: https://cfanzp008.github.io/aistupidlevel-ai-benchmark/  

