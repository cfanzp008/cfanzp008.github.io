# LiteLLM 入门指南：统一调用 100+ LLM 的 Python 库


# LiteLLM 入门指南：统一调用 100+ LLM 的 Python 库

## 背景

2023-2025 年是大模型爆发的几年，市面上涌现了 OpenAI、Anthropic、Google Gemini、Mistral、Groq、Cohere 等数十家模型提供商，每个厂商都有自己的 API 格式、鉴权方式和 SDK。这种碎片化给开发者带来了巨大的集成成本：

- 切换模型需要重写调用代码
- 不同厂商的错误处理机制不同
- 缺乏统一的成本追踪
- 多模型 fallback 需要自己实现重试逻辑

**LiteLLM** 就是为了解决这些问题而生的。它是一个轻量级的 Python 库（也提供 Proxy Server），把所有 LLM API 统一成 OpenAI 兼容格式，一行代码切换模型提供商。目前支持 **100+ 模型提供商**，包括主流的 OpenAI、Anthropic、Google、AWS Bedrock、Azure、Groq、Together AI 等。

<!--more-->

## 核心概念

LiteLLM 的核心设计哲学很简单：**用 OpenAI 的调用方式，调用所有模型**。

```
你的代码 → LiteLLM → 任意 LLM API
```

它的架构分为两层：

**Python SDK**：直接在代码中调用的库，提供 `completion()`、`embedding()`、`image_generation()` 等函数。适合需要在应用代码中直接控制模型调用的场景。

**Proxy Server**：一个 OpenAI 兼容的 API 网关服务，部署后可以作为一个统一的 API 端点，提供集中式认证、成本追踪、限流、负载均衡等功能。适合团队使用，或者需要将多个模型统一暴露为一个服务端的场景。

## 安装

```bash
pip install litellm
```

就是这么简单，没有额外的依赖安装步骤。如果你需要 Proxy Server：

```bash
pip install 'litellm[proxy]'
```

## 快速上手

### 设置 API Key

使用环境变量配置 API 密钥是推荐方式：

```python
import os

os.environ["OPENAI_API_KEY"] = "sk-xxx"       # OpenAI
os.environ["ANTHROPIC_API_KEY"] = "sk-ant-xxx" # Anthropic
os.environ["GEMINI_API_KEY"] = "AIza..."       # Google Gemini
os.environ["GROQ_API_KEY"] = "gsk_xxx"         # Groq
os.environ["TOGETHERAI_API_KEY"] = "xxx"       # Together AI
```

### 第一次调用

```python
from litellm import completion

response = completion(
    model="gpt-4o",
    messages=[
        {"role": "user", "content": "用一句话解释什么是 LiteLLM"}
    ]
)

print(response.choices[0].message.content)
```

返回的 `response` 对象与 OpenAI SDK 返回的结构完全一致，包含 `choices`、`usage`、`model` 等字段。

## 多模型调用示例

LiteLLM 最大的价值在于**一行代码切换模型**：

```python
from litellm import completion

messages = [{"role": "user", "content": "你好，请介绍一下你自己"}]

# OpenAI
response = completion(model="gpt-4o", messages=messages)
print("GPT-4o:", response.choices[0].message.content)

# Anthropic Claude
response = completion(model="claude-sonnet-4-20250514", messages=messages)
print("Claude:", response.choices[0].message.content)

# Google Gemini
response = completion(model="gemini/gemini-2.5-pro", messages=messages)
print("Gemini:", response.choices[0].message.content)

# Groq (开源模型)
response = completion(model="groq/llama-3.3-70b-versatile", messages=messages)
print("Groq Llama:", response.choices[0].message.content)

# Together AI
response = completion(model="together_ai/meta-llama/Llama-3.3-70B-Instruct-Turbo", messages=messages)
print("Together:", response.choices[0].message.content)
```

模型名称的格式为 `provider/model-name`，如果不加前缀（如直接写 `gpt-4o`），LiteLLM 会根据模型名自动匹配提供商。

### 支持的模型前缀

| 提供商 | 模型名格式 | 环境变量 |
|--------|-----------|---------|
| OpenAI | `gpt-4o`, `gpt-4o-mini` | `OPENAI_API_KEY` |
| Anthropic | `claude-sonnet-4-20250514`, `claude-haiku-3-5` | `ANTHROPIC_API_KEY` |
| Google | `gemini/gemini-2.5-pro`, `gemini/gemini-2.5-flash` | `GEMINI_API_KEY` |
| AWS Bedrock | `bedrock/anthropic.claude-3-5-sonnet` | `AWS_ACCESS_KEY_ID` + `AWS_SECRET_ACCESS_KEY` |
| Azure | `azure/gpt-4o` | `AZURE_API_KEY` + `AZURE_API_BASE` |
| Groq | `groq/llama-3.3-70b-versatile` | `GROQ_API_KEY` |
| Together AI | `together_ai/...` | `TOGETHERAI_API_KEY` |
| Mistral | `mistral/mistral-large` | `MISTRAL_API_KEY` |
| Cohere | `command-r-plus` | `COHERE_API_KEY` |
| HuggingFace | `huggingface/...` | `HF_TOKEN` |
| Ollama (本地) | `ollama/llama3` | 无需 API Key |

## 流式输出 (Stream)

流式输出的接口与 OpenAI 完全一致，只需传 `stream=True`：

```python
from litellm import completion

response = completion(
    model="gpt-4o",
    messages=[{"role": "user", "content": "讲一个简短的笑话"}],
    stream=True
)

for chunk in response:
    delta = chunk.choices[0].delta.content
    if delta:
        print(delta, end="", flush=True)
```

这对 Claude、Gemini、Groq 等所有支持流式输出的模型同样适用。

## Model Fallback（模型回退）

生产环境中，某个模型可能会因为限流、服务宕机等原因不可用。LiteLLM 内置了 fallback 机制：

```python
from litellm import completion

response = completion(
    model="gpt-4o",
    messages=[{"role": "user", "content": "写一段 Python 代码"}],
    fallbacks=[
        {"model": "gpt-4o-mini"},
        {"model": "claude-sonnet-4-20250514"}
    ]
)
```

当 `gpt-4o` 调用失败时，LiteLLM 自动尝试 `gpt-4o-mini`，如果还失败则尝试 `claude-sonnet-4`。整个过程对上层透明。

也可以使用 `model_list_fallback` 指定多个 fallback 的组合：

```python
response = completion(
    model="gpt-4",
    messages=[{"role": "user", "content": "测试"}],
    model_list_fallback=[["gpt-3.5-turbo", "claude-3-haiku"]]
)
```

## 使用 Router 进行负载均衡

对大规模生产环境，LiteLLM 提供了 `Router` 类，支持多 deployment 的负载均衡和自动重试：

```python
from litellm import Router

router = Router(model_list=[
    {
        "model_name": "gpt-4o-group",  # 自定义分组名
        "litellm_params": {
            "model": "openai/gpt-4o",
            "api_key": os.environ["OPENAI_API_KEY"],
            "api_base": "https://api.openai.com/v1"
        }
    },
    {
        "model_name": "gpt-4o-group",
        "litellm_params": {
            "model": "openai/gpt-4o",
            "api_key": os.environ["OPENAI_API_KEY2"],  # 另一个 Key
            "api_base": "https://api.openai.com/v1"
        }
    },
    {
        "model_name": "claude-group",
        "litellm_params": {
            "model": "anthropic/claude-sonnet-4-20250514",
            "api_key": os.environ["ANTHROPIC_API_KEY"]
        }
    }
])

# 使用 Router 调用，自动轮询或随机选择 deployment
response = router.completion(
    model="gpt-4o-group",
    messages=[{"role": "user", "content": "负载均衡测试"}]
)
```

Router 的特性：
- **轮询/随机/最低延迟**等多种调度策略
- 自动重试失败请求
- 限制失败 deployment 的权重（cooldown 机制）
- 支持模型分组的 fallback

## 成本追踪

LiteLLM 内置了所有主流模型的定价信息，调用后可以直接获取花费：

```python
from litellm import completion, completion_cost

response = completion(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Hello"}]
)

# 计算本次调用的成本
cost = completion_cost(response)
print(f"本次调用花费: ${cost}")
```

如果要获取详细的 token 用量：

```python
print(f"输入 tokens: {response.usage.prompt_tokens}")
print(f"输出 tokens: {response.usage.completion_tokens}")
print(f"总 tokens: {response.usage.total_tokens}")
```

## Proxy Server —— 统一 API 网关

如果你有多个后端服务都需要调用 LLM，或者需要为团队提供统一的模型访问入口，Proxy Server 是最佳实践。

### 启动 Proxy

```bash
# 简单的单模型模式
litellm --model gpt-4o

# 使用配置文件的多模型模式
litellm --config config.yaml
```

### Proxy 配置文件

```yaml
# config.yaml
model_list:
  - model_name: gpt-4o
    litellm_params:
      model: openai/gpt-4o
      api_key: os.environ/OPENAI_API_KEY

  - model_name: claude-sonnet
    litellm_params:
      model: anthropic/claude-sonnet-4-20250514
      api_key: os.environ/ANTHROPIC_API_KEY

  - model_name: gemini-pro
    litellm_params:
      model: gemini/gemini-2.5-pro
      api_key: os.environ/GEMINI_API_KEY

  - model_name: deepseek
    litellm_params:
      model: openai/deepseek-chat
      api_key: os.environ/DEEPSEEK_API_KEY
      api_base: https://api.deepseek.com/v1

litellm_settings:
  master_key: os.environ/LITELLM_MASTER_KEY   # 保护 Proxy 自己的访问
  drop_params: true                            # 忽略不支持的参数
```

### 从客户端调用 Proxy

启动 Proxy 后（默认监听 `http://localhost:4000`），任何支持 OpenAI SDK 的工具可以无缝接入：

```python
from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:4000/v1",
    api_key="your-litellm-master-key"  # 对应 config 中的 master_key
)

response = client.chat.completions.create(
    model="gpt-4o",              # config.yaml 中定义的 model_name
    messages=[{"role": "user", "content": "Hello via LiteLLM Proxy"}]
)
```

重点是：**不需要安装任何额外的 Python 包**，只要支持 OpenAI 格式的客户端都可以直接用。这也意味着你可以用 curl 调用：

```bash
curl http://localhost:4000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-litellm-master-key" \
  -d '{
    "model": "claude-sonnet",
    "messages": [{"role": "user", "content": "Hello"}]
  }'
```

## 实战案例：构建一个多模型评测脚本

下面是一个完整的示例，对比不同模型在同一个问题上的响应时间和成本：

```python
import time
import os
from litellm import completion, completion_cost

# 配置 API Key
os.environ["OPENAI_API_KEY"] = "sk-xxx"
os.environ["ANTHROPIC_API_KEY"] = "sk-ant-xxx"
os.environ["GEMINI_API_KEY"] = "AIza..."
os.environ["GROQ_API_KEY"] = "gsk_xxx"

models = [
    "gpt-4o-mini",
    "gpt-4o",
    "claude-sonnet-4-20250514",
    "gemini/gemini-2.5-flash",
    "groq/llama-3.3-70b-versatile"
]

question = "解释一下什么是 CAP 定理，用 100 字以内。"

results = []

for model in models:
    start = time.time()

    response = completion(
        model=model,
        messages=[{"role": "user", "content": question}],
        max_tokens=300
    )

    elapsed = time.time() - start
    cost = completion_cost(response)
    answer = response.choices[0].message.content

    results.append({
        "model": model,
        "time": round(elapsed, 2),
        "cost": round(cost, 6),
        "tokens": response.usage.total_tokens,
        "answer": answer[:80] + "..." if len(answer) > 80 else answer
    })

# 打印结果对比表
print(f"{'Model':<35} {'时间(s)':<10} {'成本($)':<12} {'Tokens':<8}")
print("-" * 65)
for r in results:
    print(f"{r['model']:<35} {r['time']:<10} {r['cost']:<12} {r['tokens']:<8}")
```

输出类似：

```
Model                               时间(s)     成本($)       Tokens
gpt-4o-mini                         1.23        0.000123     148
gpt-4o                              2.45        0.001521     156
claude-sonnet-4-20250514            3.12        0.004203     162
gemini/gemini-2.5-flash             1.87        0.000035     143
groq/llama-3.3-70b-versatile        0.95        0.000000     151
```

## 实战案例：Proxy 实现多模型 API 网关

假设你的团队同时使用 GPT-4o、Claude 和 DeepSeek，希望统一管理访问：

**服务端配置** (`config.yaml`)：

```yaml
model_list:
  - model_name: fast-model
    litellm_params:
      model: openai/gpt-4o-mini
      api_key: os.environ/OPENAI_API_KEY
      rpm: 1000                         # 每分钟最多 1000 请求

  - model_name: strong-model
    litellm_params:
      model: anthropic/claude-sonnet-4-20250514
      api_key: os.environ/ANTHROPIC_API_KEY
      rpm: 100

  - model_name: code-model
    litellm_params:
      model: openai/deepseek-chat
      api_key: os.environ/DEEPSEEK_API_KEY
      api_base: https://api.deepseek.com/v1
      rpm: 500

litellm_settings:
  master_key: os.environ/LITELLM_MASTER_KEY
  set_verbose: False

general_settings:
  # 启用成本追踪数据库
  custom_db: true
  database_url: os.environ/DATABASE_URL
```

**客户端使用**：团队成员通过统一的 API 端点调用，不用自己管理各种 API Key：

```python
from openai import OpenAI

client = OpenAI(
    base_url="http://litellm-gateway.company.com:4000/v1",
    api_key="team-key-xxx"
)

# 简单任务用 fast-model
quick_reply = client.chat.completions.create(
    model="fast-model",
    messages=[{"role": "user", "content": "翻译：Hello world"}]
)

# 复杂任务用 strong-model
analysis = client.chat.completions.create(
    model="strong-model",
    messages=[{"role": "user", "content": "写一篇深度的技术分析"}]
)

# 编程任务用 code-model
code = client.chat.completions.create(
    model="code-model",
    messages=[{"role": "user", "content": "写一个 Python 装饰器"}]
)
```

Proxy 会追踪每个用户的 token 消耗和花费，方便做成本分摊和限流。

## 嵌入（Embedding）和图片输入

LiteLLM 也支持 embedding 和 multimodal 输入：

### Embedding

```python
from litellm import embedding

response = embedding(
    model="text-embedding-3-small",
    input=["LiteLLM 是一个很棒的库"]
)

print(len(response.data[0].embedding))  # 1536
```

### 图片输入

```python
from litellm import completion

response = completion(
    model="gpt-4o",
    messages=[
        {
            "role": "user",
            "content": [
                {"type": "text", "text": "这张图里有什么？"},
                {
                    "type": "image_url",
                    "image_url": {
                        "url": "https://example.com/photo.jpg"
                    }
                }
            ]
        }
    ]
)
```

## 常见问题

### LiteLLM 和 LangChain 的关系是什么？

LangChain 是一个更上层的 AI 应用框架（包含 chain、agent、tool 等抽象），而 LiteLLM 专注于**模型调用层**的统一。两者可以配合使用：LiteLLM 作为 LangChain 底层的 LLM 调用后端。

### 是否支持 OpenAI 兼容的私有部署模型？

支持。通过 `openai/` 前缀加 `api_base` 参数，可以调用任何兼容 OpenAI 接口的私有部署模型（如 vLLM、TGI、Ollama 等）：

```python
response = completion(
    model="openai/custom-model",
    api_base="http://localhost:8000/v1",
    api_key="sk-xxx",  # 随意填
    messages=[{"role": "user", "content": "Hello"}]
)
```

### 如何处理不同模型支持的参数差异？

不同模型对参数的支持不同（比如 `top_p`、`frequency_penalty` 等）。LiteLLM 默认会过滤掉目标模型不支持的参数。也可以在调用时设置 `drop_params=True` 让它自动丢弃不支持的参数。

### Proxy Server 的性能如何？

LiteLLM Proxy 本身只是一个轻量级的转发层，延迟开销通常在 1-5ms 之间（不包括 LLM 本身的时间）。在大流量场景下可以水平扩展，通过数据库共享配置和用量数据。

### 成本追踪是否准确？

LiteLLM 内置了 100+ 模型的定价表，并且持续更新。对于大部分主流模型，成本计算是准确的。如果你使用的是私有部署或自定义模型，可以手动注册成本参数。

## 总结

LiteLLM 解决了多 LLM 提供商集成中的核心痛点：**统一接口、自动容错、成本追踪**。它有两种使用方式：

- **Python SDK**：适合在代码中直接控制模型调用，提供 `completion()`、`embedding()`、`Router` 等功能
- **Proxy Server**：适合团队级统一网关，提供集中认证、限流、成本分摊、用量监控等功能

如果你正在开发多模型应用、构建 AI 网关，或者厌倦了为每个模型提供商写不同的适配代码，LiteLLM 值得一试。

### 参考资源

- [LiteLLM GitHub](https://github.com/BerriAI/litellm)
- [LiteLLM 官方文档](https://docs.litellm.ai)
- [LiteLLM Proxy 文档](https://litellm.vercel.app/docs/proxy/quick_start)


---

> 作者: [](https://cfanzp008.github.io/about/)  
> URL: https://cfanzp008.github.io/litellm-introduction/  

