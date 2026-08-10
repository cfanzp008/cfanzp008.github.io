# zhihu-cli 使用指南：终端里的知乎客户端


# zhihu-cli 使用指南：终端里的知乎客户端

知乎是中文互联网最大的问答社区，但日常浏览往往要打开浏览器或 App。如果你习惯泡在终端里（比如我是 Vim + tmux 重度用户），或者你正在写 AI Agent 想集成知乎能力，那么 **zhihu-cli** 这类命令行工具就能帮你把知乎搬进终端：搜索问题、看热榜、读回答、甚至发布文章和想法，全程不离开键盘。

本文基于 GitHub 上最活跃的同名项目 [BAIGUANGMEI/zhihu-cli](https://github.com/BAIGUANGMEI/zhihu-cli)（PyPI 包名 `pyzhihu-cli`）编写，覆盖安装、登录、常用命令与实战示例。

<!--more-->

## zhihu-cli 是什么

zhihu-cli 是一个用 Python 编写的知乎命令行客户端，通过知乎 V4 API 获取数据，用 Rich 库在终端渲染成漂亮的表格输出。它把知乎的主要功能搬进了终端：

- **搜索**：按关键词搜索问题、回答、文章，支持按类型（话题、用户）过滤
- **浏览**：热榜、问题详情、回答详情及评论、首页推荐、话题
- **用户**：查看用户资料、回答列表、文章列表、粉丝与关注
- **互动**：赞同/取消赞同回答，关注/取消关注问题
- **创作**：发布提问、发布想法、发布图文文章（支持 HTML 富文本）
- **管理**：查看收藏夹、通知，删除自己发布的内容

## 项目信息

动手之前先看下项目基本面：

| 项目 | 详情 |
|------|------|
| GitHub 仓库 | [BAIGUANGMEI/zhihu-cli](https://github.com/BAIGUANGMEI/zhihu-cli) |
| PyPI 包名 | `pyzhihu-cli` |
| 开发语言 | Python 3.10+（Click + Requests + Rich） |
| 许可证 | Apache-2.0 |
| Star / Fork | 65 / 17 |
| 安装方式 | `uv` / `pipx` / 源码 |
| 登录方式 | 二维码扫码 或 手动粘贴 Cookie |

> **注意**：GitHub 上存在多个同名"zhihu-cli"项目（如基于知乎开放平台的 Node.js 版本、仿 curl 的 Rust 版本 zhurl 等）。本文介绍的 `pyzhihu-cli` 功能最全、持续维护，且不需要申请开放平台密钥，开箱即用。

## 安装

需要 Python 3.10 及以上版本，推荐使用 uv 或 pipx 安装（自动隔离依赖）：

```bash
# 推荐：使用 uv
uv tool install pyzhihu-cli

# 或使用 pipx
pipx install pyzhihu-cli

# 从源码安装（开发用）
git clone https://github.com/BAIGUANGMEI/zhihu-cli.git
cd zhihu-cli
pip install -e .
```

验证安装：

```bash
zhihu --version
zhihu --help
```

安装成功后 `zhihu` 命令即可使用。依赖只有 `requests`、`rich`、`click`、`qrcode`，二维码登录无需 Playwright。

## 登录与认证

zhihu-cli 支持两种登录方式，登录态保存在 `~/.zhihu-cli/cookies.json`（文件权限 0600，仅当前用户可读）。

### 方式一：二维码扫码（推荐）

```bash
# 执行后终端会渲染一个二维码
zhihu login --qrcode
```

扫码过程中二维码也会保存为 `~/.zhihu-cli/login_qrcode.png`，方便你在手机上用知乎 App 扫码，或者由 AI Agent 读取后发送给用户。

### 方式二：手动粘贴 Cookie

```bash
# Cookie 至少包含 z_c0、_xsrf、d_c0 这三个字段
zhihu login --cookie "z_c0=xxx; _xsrf=yyy; d_c0=zzz"
```

Cookie 可以从浏览器开发者工具中复制，注意该方式不会自动获取浏览器 Cookie。

### 登录状态管理

```bash
# 检查登录状态（仅检查本地 cookie，不发网络请求）
zhihu status

# 查看当前登录用户资料
zhihu whoami
zhihu whoami --json

# 退出登录
zhihu logout
```

## 常用命令与示例

### 搜索内容

```bash
# 搜索问题/回答/文章
zhihu search "Python 学习"

# 按类型过滤：搜索话题、用户
zhihu search "机器学习" --type topic
zhihu search "张三" --type people

# JSON 输出，方便脚本处理
zhihu search "Python" --json
```

### 浏览热榜

```bash
# 全部热榜 + 每条附带 3 条热门回答
zhihu hot

# 只看前 10 条热榜
zhihu hot -l 10

# 每条热榜带 5 条回答
zhihu hot -a 5

# 只要标题列表，不带回答
zhihu hot -a 0

# JSON 输出
zhihu hot --json
```

### 查看问题与回答

```bash
# 查看问题详情
zhihu question <question_id>

# 连带回答一起看
zhihu question <question_id> --answers

# 限制回答数量（默认全部）
zhihu question <question_id> --answers --limit 10

# 查看回答详情
zhihu answer <answer_id>

# 展开评论（默认显示全部）
zhihu answer <answer_id> --comments
zhihu answer <answer_id> -c

# 限制评论数量
zhihu answer <answer_id> -c -l 5
```

### 用户相关

用户查询使用 **URL Token**，即知乎个人主页路径中的部分，比如 `zhihu.com/people/zhang-san` 中的 `zhang-san`：

```bash
# 查看用户资料
zhihu user <url_token>

# 查看该用户全部回答（可按赞同数排序）
zhihu user-answers <url_token>
zhihu user-answers <url_token> --sort voteups

# 查看用户文章
zhihu user-articles <url_token>

# 粉丝与关注列表
zhihu followers <url_token>
zhihu following <url_token>
```

### 推荐流与话题

```bash
# 推荐列表（ID、类型、标题、作者）
zhihu feed
zhihu feed --limit 5

# 推荐 + 内容 + 评论
zhihu feeds
zhihu feeds -l 3        # 只看 3 条推荐
zhihu feeds -c 5        # 每条带 5 条评论
zhihu feeds -c 0        # 不带评论

# 话题详情及热门问题
zhihu topic <topic_id> --questions
```

### 互动：赞同与关注

```bash
# 赞同回答
zhihu vote <answer_id>

# 取消赞同
zhihu vote <answer_id> --undo

# 关注问题
zhihu follow-question <question_id>

# 取消关注
zhihu follow-question <question_id> --undo
```

### 创作：发布提问、想法、文章

发布内容时，描述与正文都支持 HTML 富文本（如 `<p>`、`<strong>`、`<a>`）：

```bash
# 发布提问
zhihu ask "如何学习 Python？"
zhihu ask "什么是机器学习？" -d "请详细解释" -t 19550517 -t 19551275

# 发布想法（标题 + 可选正文）
zhihu pin "今天天气真好！"
zhihu pin "标题" -c "想法正文内容"

# 发布文章
zhihu article "文章标题" "文章内容"
zhihu article "标题" "内容" -t 19550517

# 带图片发布（-i 可重复使用添加多张图片）
zhihu ask "求推荐" -d "详情" -i photo.jpg
zhihu pin "标题" -c "正文" -i image1.jpg -i image2.jpg
zhihu article "标题" "内容" -i cover.jpg
```

### 删除自己发布的内容

```bash
# 删除前会确认，加 -y 直接跳过确认
zhihu delete-question <问题ID>
zhihu delete-pin <想法ID>
zhihu delete-article <文章ID>
zhihu delete-question 12345678 -y
```

### 其他实用命令

```bash
# 收藏夹列表
zhihu collections

# 通知消息
zhihu notifications

# 调试日志输出
zhihu -v search "Python"

# 完整帮助
zhihu --help
```

## 实战：一条命令看今日热榜

下面用一个完整示例演示 zhihu-cli 的实际效果。假设我们要看看今天知乎上大家在讨论什么：

```bash
# 1. 登录（只需一次）
zhihu login --qrcode

# 2. 查看热榜前 5 条，每条带 3 条回答
zhihu hot -l 5 -a 3

# 3. 挑一条热门问题看详情 + 前 10 条回答
zhihu question 12345678 --answers --limit 10

# 4. 把热榜以 JSON 形式导出，供脚本分析
zhihu hot --json > hot.json
```

配合 `jq` 可以做更多自动化：

```bash
# 只提取热榜标题
zhihu hot --json | jq -r '.[].title'
```

## 工作原理

zhihu-cli 的架构很清晰，三层分工：

```
CLI (click) → ZhihuClient (requests)
                  ↓ API 请求
              Zhihu V4 API → JSON 响应
```

```
zhihu_cli/
├── config.py      # 集中配置：路径、URL、统一 UA/Chrome 版本
├── auth.py        # Cookie 管理、QR 码登录、scan_info 轮询
├── client.py      # ZhihuClient — 所有 API 调用封装
├── display.py     # Rich 终端输出
└── commands/      # Click 子命令
```

执行流程大致为：

1. **认证**：通过二维码扫码或手动 Cookie 完成登录，登录态保存到 `~/.zhihu-cli/cookies.json`
2. **校验**：通过 `/api/v4/me` 接口验证会话有效性
3. **取数**：用 requests 请求知乎 V4 API，获取结构化 JSON
4. **展示**：用 Rich 渲染成表格、带颜色的终端输出

值得留意的是它的**反爬与风控设计**：全局统一 Chrome 浏览器指纹（`User-Agent`、`sec-ch-ua`、`sec-ch-ua-platform` 版本号一致，集中管理在 `config.CHROME_VERSION`），登录与写操作带 CSRF token（`_xsrf` / `x-xsrftoken`），能有效降低被风控拦截的概率。

## 网络安全设计

项目在 README 中专门说明了安全设计，使用前值得了解：

- **凭证仅存本地**：Cookie 只写入本机 `~/.zhihu-cli/cookies.json`，权限 0600，不会上传给任何第三方
- **全程 HTTPS**：所有请求只发往知乎官方域名（`www.zhihu.com`、`api.zhihu.com`）
- **无密码落地**：仅支持二维码扫码或 Cookie 登录，不收集、不存储账号密码
- **最小权限**：只请求完成当前命令所需的 API，不额外拉取数据
- **可审计**：项目开源，依赖在 `pyproject.toml` 声明，无闭源运行时

> 建议只在可信环境使用，妥善保管本地 Cookie 文件，退出后可用 `zhihu logout` 清除登录态。

## 常见问题 FAQ

**Q: 登录后报"请先登录"？**
A: 检查 `zhihu status` 是否显示已登录。手动粘贴的 Cookie 里必须包含 `z_c0`、`_xsrf`、`d_c0` 三个字段，缺一不可，注意 Cookie 过期后需要重新登录。

**Q: 发布的文字可以格式化吗？**
A: 可以。提问描述、想法正文、文章内容都支持 HTML 富文本，比如 `<strong>加粗</strong>`、`<a href="...">链接</a>`。

**Q: 如何彻底退出登录并清除数据？**
A: `zhihu logout` 会清除本地保存的登录态，同时可手动删除 `~/.zhihu-cli/cookies.json` 文件。

**Q: 能发布回答和评论吗？**
A: 目前还不能，官方路线图里"发布回答、发布评论、发布视频"还在后续开发中。

**Q: 浏览器指纹版本号怎么更新？**
A: 所有指纹版本号集中管理在 `config.py` 的 `CHROME_VERSION` 常量，当知乎风控收紧时更新这一处即可全局生效。

## 总结

zhihu-cli 把知乎的核心浏览与创作能力带进了终端，安装一条命令、登录扫码一次即可使用。对程序员来说，最实用的组合是 `zhihu search` + `zhihu hot --json` + `jq`：随时在终端查资料、抓热榜做数据分析；对 AI Agent 来说，它提供了一套纯 API 的知乎访问通道，配合 JSON 输出可以轻松集成到工作流里。

感兴趣的读者可以进一步关注：

- 项目主页：https://github.com/BAIGUANGMEI/zhihu-cli
- PyPI 页面：https://pypi.org/project/pyzhihu-cli/
- 知乎开放平台（官方 API，供学习参考）：https://developer.zhihu.com

---

> 作者: [](https://cfanzp008.github.io/about/)  
> URL: https://cfanzp008.github.io/zhihu-cli-usage-guide/  

