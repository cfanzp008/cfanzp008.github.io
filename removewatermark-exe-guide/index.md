# RemoveWatermark.exe 完全指南：视频去水印工具的安装与使用


# RemoveWatermark.exe 完全指南：视频去水印工具的安装与使用

## 背景

"RemoveWatermark.exe" 是 Windows 平台上一类视频水印去除工具的统称。这类工具通常采用 FFmpeg 的 delogo 滤镜作为底层处理引擎，通过图形界面简化操作，支持批量去除视频中的固定水印和台标。

本文以最流行的开源工具 **multi-delogo**（即通常所说的 RemoveWatermark.exe）为例，详细介绍其安装、配置和实战用法。

<!--more-->

## 下载与安装

### 方式一：下载预编译的 EXE 文件

multi-delogo 项目托管在 GitHub，提供直接可运行的 exe 文件：

```bash
# 访问 GitHub Releases 页面
https://github.com/wernerturing/multi-delogo/releases

# 或者直接下载最新版 (v2.4.0)
# https://github.com/wernerturing/multi-delogo/releases/download/v2.4.0/multi-delogo-windows-2.4.0.zip
```

下载后解压到任意目录，直接运行 `multi-delogo.exe` 即可启动。

### 方式二：通过包管理器安装（macOS）

```bash
brew install wernerturing/multi-delogo/multi-delogo
```

### 方式三：从源码编译（Linux）

```bash
git clone https://github.com/wernerturing/multi-delogo.git
cd multi-delogo
./configure
make
make install
```

需要依赖：gtkmm、goocanvas、opencv、boost。

## 使用方法

### 快速上手：GUI 模式

打开 `multi-delogo.exe`，主界面如下：

```
┌─────────────────────────────────────┐
│  File  Edit  Tools  Help           │
├─────────────────────────────────────┤
│  ┌─────────────────────────────┐   │
│  │     [视频预览区域]           │   │
│  │                             │   │
│  │         水印区域            │   │
│  │        ┌──────┐             │   │
│  │        │水印  │             │   │
│  │        └──────┘             │   │
│  └─────────────────────────────┘   │
│  [添加文件]  [开始处理]  [预览]   │
└─────────────────────────────────────┘
```

**基本步骤：**

1. 点击菜单栏 **File > New project**（或 `Ctrl+N`）新建项目
2. 选择需要处理的视频文件（支持 MP4、AVI、MOV、MKV 等常见格式）
3. 视频的第一帧会自动加载到预览区
4. 使用鼠标 **框选水印区域**（按住左键拖拽即可）
5. 点击 **Encode** 按钮开始处理
6. 选择输出路径，等待处理完成

### 自动检测水印

multi-delogo 内置了自动水印检测功能，特别适合检测文字类水印：

```bash
# 菜单路径
Tools > Automatic Logo Detection
```

检测完成后，工具会自动标记水印位置，用户只需确认或微调即可。

### 处理移动水印

与水印位置固定的工具不同，multi-delogo 支持水印位置变化的情况。操作方式：

1. 通过进度条或时间输入切换到水印位置发生变化的帧
2. 在新的位置再次框选水印区域
3. 工具会自动在时间轴上创建多个过滤器 `[Filter 1] [Filter 2] ...`
4. 每个过滤器对应一个时间段的水印位置

## 实战案例

### 案例 1：去除视频角落台标

场景：下载的教学视频左上角有一个固定的频道台标。

```
操作步骤：
1. 打开 multi-delogo.exe
2. File > New project > 选择教学视频.mp4
3. 视频加载后，左上角可见台标
4. 鼠标拖拽框选台标区域
5. 点击 Encode
6. 选择输出路径，点击确定
7. 等待处理完成，输出无水印视频
```

### 案例 2：批量处理多个视频

通过项目文件实现批量处理：

```
1. 用上述方法处理第一个视频，创建项目
2. File > Save project 保存为 .mdpg 项目文件
3. 对第二个视频：
   - File > New project → 选择第二个视频
   - 如果水印位置相同，直接 Encode
   - 如果水印位置不同，重新框选
4. 逐一处理所有视频
```

### 案例 3：使用命令行模式

对于需要批量自动处理的场景，multi-delogo 提供命令行接口：

```bash
# 直接使用 FFmpeg delogo 滤镜
ffmpeg -i input.mp4 \
  -filter_complex "delogo=x=10:y=10:w=120:h=40" \
  -c:a copy \
  output.mp4
```

其中参数说明：
- `x`、`y`：水印左上角坐标
- `w`、`h`：水印区域的宽度和高度

还可以通过 multi-delogo 生成 FFmpeg 命令行的 filter script：

```
1. 在 GUI 中框选水印区域
2. Tools > Generate filter script
3. 会生成一个 .txt 文件，包含完整的 FFmpeg filter 参数
4. 在命令行中调用：

ffmpeg -i input.mp4 \
  -filter_complex_script "filter_script.txt" \
  -map "[out_v]" \
  -map 0:a \
  output.mp4

注意：-map "[out_v]" 指定处理过的视频流，
      -map 0:a   保留原始音频流。
```

### 案例 4：多个不同位置的水印

如果视频中有多个水印在不同时间段出现在不同位置：

```
1. 在第一个时间段，框选水印位置 → 自动创建 Filter 1
2. 拖动进度条到水印位置发生变化的时间点
3. 再次框选新位置 → 自动创建 Filter 2
4. 重复步骤 2-3，直到覆盖所有时间段的全部水印
5. 点击 Encode 开始处理
```

快捷键：
- `Ctrl+N`：新建项目
- `Ctrl+S`：保存项目
- `Ctrl+O`：打开项目
- `Space` / `Enter`：确认
- `Esc`：取消

## 高级功能

### 裁剪视频

除了去水印，multi-delogo 还内置了视频裁剪功能：

```
1. 在预览窗口按住鼠标中键拖拽 → 出现裁剪框
2. 释放鼠标 → 自动添加裁剪过滤器
3. 调整裁剪区域
4. Encode 输出
```

### 调整处理参数

multi-delogo 支持通过 FFmpeg 的参数微调处理效果：

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `band` | delogo 滤镜的模糊半径 | 1 |
| `t` | 处理强度（越大越模糊） | 1 |
| 输出格式 | 保持原始格式或选择特定格式 | 原始格式 |
| 编码质量 | CRF 值或比特率控制 | 原始质量 |

在 **Tools > Options** 中可以设置这些高级参数。

## 常见问题

### Q1：处理后的视频没有声音？

这是最常见的问题。如果用 FFmpeg 命令行处理，必须保留音频流：

```bash
# 正确命令（保留音频）
ffmpeg -i input.mp4 \
  -filter_complex "delogo=x=10:y=10:w=120:h=40[out_v]" \
  -map "[out_v]" \
  -map 0:a \
  -c:a copy \
  output.mp4

# 错误命令（会丢失音频）
ffmpeg -i input.mp4 \
  -filter_complex "delogo=x=10:y=10:w=120:h=40" \
  output.mp4
```

### Q2：处理效果不理想怎么办？

- 适当扩大框选区域（比水印实际大小略大）
- 在 Options 中调整 `band` 和 `t` 参数
- 对于半透明水印，可尝试增加 `t` 值至 2-3

### Q3：路径不能包含中文吗？

建议路径中不要包含中文和空格，否则 FFmpeg 可能无法正常处理。

### Q4：多个视频的水印位置不同？

每个视频需要单独框选水印位置。如果水印位置相同，可以用同一个项目文件批量处理。

### Q5：软件卡顿无响应？

处理过程中软件可能会显示"未响应"状态，这是正常现象。可以查看任务管理器确认 CPU/GPU 是否处于工作状态。也可以使用 **Generate filter script** 生成 FFmpeg 命令，在命令行中独立运行。

## 技术原理

RemoveWatermark.exe（multi-delogo）的核心原理：

1. **视频解码**：使用 FFmpeg 读取视频文件，解码为帧序列
2. **水印定位**：通过 OpenCV 分析画面差异，结合用户标记确定水印位置
3. **delogo 滤镜处理**：对标记区域应用 FFmpeg 的 delogo 滤镜，用周围像素插值填补
4. **视频编码**：将处理后的帧序列重新编码为视频文件

delogo 滤镜的插值算法可以简单理解为：取水印区域边界像素的颜色和亮度，通过渐变填充到水印区域内部，使处理后的画面看起来自然过渡。

## 与其他工具的对比

| 特性 | RemoveWatermark.exe (multi-delogo) | FFmpeg 命令行 | 在线工具 |
|------|-----------------------------------|--------------|---------|
| 图形界面 | ✅ 有 | ❌ 无 | ✅ 有 |
| 批量处理 | ✅ 支持 | ✅ 支持 | ❌ 有限制 |
| 移动水印 | ✅ 支持 | ❌ 需手动编写 | ❌ 不支持 |
| 自动检测 | ✅ 内置 | ❌ 无 | ✅ AI 检测 |
| 离线使用 | ✅ 完全离线 | ✅ 完全离线 | ❌ 需联网 |
| 文件大小限制 | ❌ 无限制 | ❌ 无限制 | ⚠️ 通常有限制 |
| 费用 | ✅ 免费开源 | ✅ 免费 | ⚠️ 部分付费 |
| 跨平台 | ❌ Windows + Linux + macOS | ✅ 全平台 | ✅ 浏览器 |

## 总结

RemoveWatermark.exe（multi-delogo）是一款实用的视频水印去除工具，它的核心优势在于：

- **免费开源**：无需付费，代码透明
- **支持移动水印**：同类工具中少有的功能
- **本地处理**：视频文件不上传云端，保护隐私
- **灵活的输出**：保持原始格式、编码和质量
- **GUI + CLI 双模式**：适合普通用户和自动化脚本

如果只是偶尔去除简单的固定水印，也可以直接使用 FFmpeg 命令行的 `delogo` 滤镜。但如果你需要处理移动水印、需要可视化操作、或者要批量处理大量视频，multi-delogo 是更合适的选择。

### 参考链接

- [multi-delogo GitHub 仓库](https://github.com/wernerturing/multi-delogo)
- [multi-delogo Releases](https://github.com/wernerturing/multi-delogo/releases)
- [FFmpeg delogo 滤镜文档](https://ffmpeg.org/ffmpeg-filters.html#delogo)
- [WatermarkRemover (Python LAMA 版)](https://github.com/lxulxu/WatermarkRemover)


---

> 作者: [](https://cfanzp008.github.io/about/)  
> URL: https://cfanzp008.github.io/removewatermark-exe-guide/  

