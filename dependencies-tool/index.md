# Dependencies：现代 Windows DLL 依赖查看器


# Dependencies：现代 Windows DLL 依赖查看器

## 什么是 Dependencies

**Dependencies** 是对经典软件 **Dependency Walker** 的现代化重写，由开发者 lucasg 用 C# 编写。Dependency Walker 曾是 Windows SDK 附带的工具，用于分析和查看 PE（可执行文件）的依赖关系，但其开发在 2006 年左右停止。Dependencies 在继承原版功能的基础上，添加了许多现代化改进。

该项目在 GitHub 上已获得 **11,400+ 颗星**，是 Windows 开发者必备的调试工具之一。

## 为什么需要 Dependencies

在 Windows 开发中，DLL 依赖问题是最常见也是最棘手的问题之一：

- **找不到 DLL**：程序运行时提示找不到某个动态链接库
- **版本冲突**：不同版本的同名 DLL 导致程序崩溃
- **依赖缺失**：缺少必要的 Visual C++ 运行库或其他系统组件
- **32/64 位混用**：32 位程序加载了 64 位 DLL，反之亦然

Dependencies 可以帮助开发者：

- 可视化查看 PE 文件的所有导入和导出
- 追踪 DLL 依赖链
- 识别缺失或无法加载的依赖
- 分析 API Set 重定向

## 主要功能特性

### 1. GUI 和 CLI 双版本

- **DependenciesGui.exe**：图形界面版本，适合日常分析和调试
- **Dependencies.exe**：命令行版本，适合自动化脚本和 CI/CD 集成

### 2. 导入/导出分析

- 显示 PE 文件的导入表（Imports）
- 显示 PE 文件的导出表（Exports）
- 支持直接依赖、转发依赖和延迟加载依赖

### 3. API Set 支持

从 1.5 版本开始支持 Windows API Set Schema 解析，可以正确解析现代 Windows 中的虚拟 DLL 重定向。

### 4. SxS（并行）支持

支持解析 Windows Side-by-Side 程序集的私有清单。

### 5. CLR 程序集支持

能够枚举 .NET 程序集的依赖项。

### 6. 符号去混淆

集成了 LLVM demangler，可以将 mangled C++ 符号还原为可读格式。

### 7. 过滤器支持

API 和模块列表支持过滤，方便在大项目中快速定位目标。

## 安装和使用

### 前置要求

Dependencies 需要以下组件才能正常运行：

- **Visual C++ Redistributable**：因为项目使用 /clr 编译，需要 VC++ 运行库

### 安装步骤

1. 访问 GitHub Releases 页面下载最新版本：
   - https://github.com/lucasg/Dependencies/releases

2. 下载 `Dependencies_x64_Release.zip`（或 x86 版本）

3. 解压到任意目录

4. 运行 `DependenciesGui.exe`

> **注意**：由于程序未经过代码签名，Windows SmartScreen 可能会发出警告，点击「更多信息」→「仍要运行」即可。

### 常见用法

```bash
# 使用 GUI 查看依赖
DependenciesGui.exe myapp.exe

# 使用 CLI 查看依赖
Dependencies.exe --help
```

## 树构建行为配置

Dependencies 提供了三种树构建模式，可在「选项 → 属性 → Tree build behaviour」中配置：

### 1. ChildOnly（默认）

只处理 PE 的直接子依赖，不递归处理更深层的依赖。这是最节省内存的模式。

### 2. RecursiveOnlyOnDirectImports

不处理 delayload DLL 的递归依赖。

### 3. Recursive

完整的递归分析。注意：这会消耗大量内存，简单分析就可能超过 7GB。

## 与原版 Dependency Walker 的对比

| 特性 | Dependencies | Dependency Walker |
|-----|-------------|-------------------|
| 开发状态 | 活跃维护 | 已停止（约 2006 年）|
| 平台支持 | Windows 7+ | 较旧的 Windows |
| API Set 解析 | ✅ | ❌ |
| SxS 解析 | ✅ | 有限 |
| .NET 支持 | ✅ | ❌ |
| 去混淆 | LLVM | 有限 |
| CLI 工具 | ✅ | ❌ |
| 语言 | C# | C++ |
| Stars | 11K+ | - |

## 下载地址

### 官方下载

- **GitHub Releases**：https://github.com/lucasg/Dependencies/releases

直接下载：
- **x64 版本**：https://github.com/lucasg/Dependencies/releases/download/v1.11.1/Dependencies_x64_Release.zip
- **x86 版本**：https://github.com/lucasg/Dependencies/releases/download/v1.11.1/Dependencies_x86_Release.zip

### 替代下载（避免 AV 误报）

如果不方便使用主下载链接，可以使用不包含 peview.exe 的版本：
- https://github.com/lucasg/Dependencies/releases/download/v1.11.1/Dependencies_x64_Release_.without.peview.exe.zip

## 适用场景

### 1. 开发调试

- 排查程序启动失败原因
- 分析缺少哪些 DLL
- 验证依赖项是否正确

### 2. 部署检查

- 打包应用前检查所有依赖
- 确保目标机器有所需的运行库

### 3. 逆向分析

- 分析未知可执行文件的依赖
- 了解程序使用了哪些系统 API

### 4. 故障排查

- 解决「找不到入口点」错误
- 处理 DLL Hell 问题

## 局限性

目前 Dependencies 有以下局限性：

1. **不支持 LoadLibrary 动态加载**：只分析静态导入的依赖
2. **最小 SxS 支持**：仅支持私有清单搜索
3. **内存消耗**：递归模式下内存占用较大

## 技术栈

- **语言**：C# (78%), C++ (17.8%), PowerShell (3.2%)
- **UI 框架**：WPF
- **核心库**：ProcessHacker2 的 phlib（PE 解析）
- **UI 库**：Dragablz（可停靠/拖拽界面）

## 总结

Dependencies 是一个功能强大且维护活跃的现代化依赖查看工具。对于 Windows 开发者来说，它是替代已停止更新的 Dependency Walker 的最佳选择。无论是日常开发调试还是复杂的部署问题排查，Dependencies 都能提供有力的帮助。

如果你在 Windows 开发中遇到 DLL 依赖问题，强烈推荐试试 Dependencies。

## 参考链接

- GitHub 仓库：https://github.com/lucasg/Dependencies
- 官方网站：https://lucasg.github.io/Dependencies/
- 下载地址：https://github.com/lucasg/Dependencies/releases

---

> 作者: [](https://cfanzp008.github.io/about/)  
> URL: https://cfanzp008.github.io/dependencies-tool/  

