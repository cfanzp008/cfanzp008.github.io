# MiniMax 模型接入 OpenCode 教程


# MiniMax 模型接入 OpenCode 教程

## 背景介绍

OpenCode 是一个强大的 AI 编程助手，支持多种大语言模型提供商。MiniMax 作为国内领先的 AI 平台，提供了性能优异的编程模型 M2 系列。本教程将详细介绍如何将 MiniMax 模型接入 OpenCode，实现本地 AI 辅助编程。

## 什么是 MiniMax

MiniMax 是专注于多语言编程能力的 AI 平台，提供以下优势：

- **强大的代码理解能力**：深度理解多种编程语言和框架
- **长上下文窗口**：支持高达 204,800 tokens 的上下文
- **高速输出**：M2.5-highspeed 模型可达 100 tps 输出速度
- **多模型选择**：支持 M2.5、M2.1、M2 等多个版本

支持的模型列表：

| 模型名称 | 上下文窗口 | 输出速度 |
|---------|-----------|---------|
| MiniMax-M2.5 | 204,800 | ~60 tps |
| MiniMax-M2.5-highspeed | 204,800 | ~100 tps |
| MiniMax-M2.1 | 204,800 | ~60 tps |
| MiniMax-M2.1-highspeed | 204,800 | ~100 tps |

## 前置条件

在开始配置之前，请确保：

1. 已安装 OpenCode（如果没有安装，可参考官方文档）
2. 已注册 MiniMax 平台账号并获取 API Key
3. 具备基本的命令行操作能力

### 获取 MiniMax API Key

1. 访问 [MiniMax 开放平台](https://platform.minimax.io/)
2. 注册并登录账号
3. 在个人中心或开发者设置中获取 API Key
4. 确保账户有足够的 API 调用额度

## 配置步骤

### 方法一：环境变量配置

最简单的方式是通过环境变量配置 MiniMax：

```bash
# 设置 MiniMax API Key
export ANTHROPIC_API_KEY="your-minimax-api-key"

# 设置 API 端点（可选，某些版本需要）
export ANTHROPIC_BASE_URL="https://api.minimax.io/anthropic"
```

### 方法二：配置文件配置

OpenCode 支持通过 `config.json` 或 `config.jsonc` 文件进行配置。

#### 配置文件位置

配置文件可以放在以下位置（按优先级排序）：

1. 当前目录：`./config.json` 或 `./config.jsonc`
2. 主目录：`~/.config/opencode/config.json`
3. XDG 标准目录：`~/.config/opencode/config.json`

#### 配置示例

创建或编辑配置文件，添加 MiniMax provider：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "minimax": {
      "npm": "@ai-sdk/anthropic",
      "options": {
        "baseURL": "https://api.minimax.io/anthropic/v1",
        "apiKey": "<YOUR_MINIMAX_API_KEY>"
      },
      "models": {
        "MiniMax-M2.5": {
          "name": "MiniMax-M2.5"
        }
      }
    }
  },
  "model": "minimax/MiniMax-M2.5"
}
```

#### 使用 JSONC 格式（支持注释）

如果你想使用带注释的配置，可以使用 JSONC 格式：

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  // 选择使用哪个模型
  "model": "minimax/MiniMax-M2.5",
  
  // 自动更新配置
  "autoupdate": true,
  
  // Provider 配置
  "provider": {
    "minimax": {
      // 使用 Anthropic SDK 兼容接口
      "npm": "@ai-sdk/anthropic",
      "options": {
        // MiniMax Anthropic 兼容 API 端点
        "baseURL": "https://api.minimax.io/anthropic/v1",
        // 你的 API Key（也可以通过环境变量 ANTHROPIC_API_KEY 设置）
        "apiKey": "your-api-key-here"
      },
      "models": {
        // 配置可用的模型
        "MiniMax-M2.5": {
          "name": "MiniMax-M2.5"
        },
        "MiniMax-M2.5-highspeed": {
          "name": "MiniMax-M2.5-highspeed"
        },
        "MiniMax-M2.1": {
          "name": "MiniMax-M2.1"
        }
      }
    }
  }
}
```

### 方法三：使用 /connect 命令

OpenCode 提供了交互式配置方式：

1. 在终端中运行 `opencode`
2. 使用 `/connect` 命令
3. 选择 MiniMax 作为 provider
4. 输入 API Key

## 验证配置

配置完成后，可以通过以下方式验证：

```bash
# 检查配置是否正确加载
opencode --doctor

# 或者直接启动并询问模型
opencode
```

在 OpenCode 中输入测试问题：

```
你好，请介绍一下你的能力
```

如果配置正确，模型应该能正常响应。

## 常见问题

### API 调用失败

如果遇到 API 调用错误：

1. **检查 API Key**：确认 API Key 正确且未过期
2. **检查网络**：确保能访问 `api.minimax.io`
3. **检查额度**：确认 MiniMax 账户有足够余额

### 模型名称错误

确保使用正确的模型名称：

- `MiniMax-M2.5`
- `MiniMax-M2.5-highspeed`
- `MiniMax-M2.1`
- `MiniMax-M2.1-highspeed`
- `MiniMax-M2`

### Base URL 配置错误

确认 baseURL 配置为：

```
https://api.minimax.io/anthropic/v1
```

注意末尾的 `/v1`，这是 Anthropic 兼容接口的版本路径。

## 性能优化建议

### 选择合适的模型

- **日常编程辅助**：使用 `MiniMax-M2.5-highspeed`，速度快
- **复杂问题处理**：使用 `MiniMax-M2.5`，性能更强
- **调试和推理**：使用 `MiniMax-M2.1`，专注于编程能力

### 使用缓存

MiniMax 支持 Prompt Caching，可以显著降低长对话的成本：

```python
# 首次请求会建立缓存
response1 = client.chat.completions.create(
    model="MiniMax-M2.5",
    messages=[...]
)

# 后续请求自动使用缓存，大幅降低延迟和成本
response2 = client.chat.completions.create(
    model="MiniMax-M2.5",
    messages=[...]
)
```

## 总结

通过以上配置，你就可以在 OpenCode 中使用 MiniMax 模型进行 AI 编程辅助。MiniMax 模型在代码理解、多轮对话和复杂推理方面表现出色，是一个值得尝试的选择。

如果你在配置过程中遇到问题，可以参考：

- [MiniMax 官方文档](https://platform.minimax.io/docs/)
- [OpenCode 官方文档](https://opencode.ai/docs/config/)

## 参考链接

- MiniMax 平台：https://platform.minimax.io/
- OpenCode 官方文档：https://opencode.ai/docs/
- GitHub Issue：https://github.com/code-yeongyu/oh-my-opencode/issues/1331


---

> 作者: [](https://cfanzp008.github.io/about/)  
> URL: https://cfanzp008.github.io/minimax-model-opencode-tutorial/  

