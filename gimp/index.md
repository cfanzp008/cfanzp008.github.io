# gimp的使用


<!--more-->
# gimp的使用
## 如果在 Windows 10 中启动 GIMP 2.10.34 时遇到 "fatal error: unhandled exception"如何处理？
- AIJ建议
```
如果在 Windows 10 中启动 GIMP 2.10.34 时遇到 "fatal error: unhandled exception" 错误，你可以尝试以下方法进行解决：

安装 Microsoft Visual C++ Redistributable：GIMP 2.10.34 可能依赖于某些 Microsoft Visual C++ Redistributable 组件。尝试下载并安装最新版本的 Visual C++ Redistributable。你可以在 Microsoft 的官方网站上找到这些组件。

禁用图形加速：有些显卡驱动程序与 GIMP 2.10.34 不兼容，可能导致启动错误。尝试禁用图形加速功能，然后重新启动 GIMP。要禁用图形加速，请右键点击桌面上的空白区域，选择 "显示设置"（Display settings），然后滚动到屏幕底部的 "高级显示设置"（Advanced display settings）。在 "高级显示设置" 对话框中，选择 "显示适配器属性"（Display adapter properties），然后切换到 "驱动程序"（Driver）选项卡，最后点击 "属性"（Properties）。在弹出的对话框中，选择 "驱动程序"（Driver），然后禁用 "启用硬件加速"（Enable hardware acceleration）选项。

兼容性模式：尝试将 GIMP 2.10.34 设置为与较旧版本的 Windows 兼容的模式。右键点击 GIMP 2.10.34 的可执行文件，选择 "属性"，切换到 "兼容性" 选项卡，并勾选 "以兼容模式运行此程序"（Run this program in compatibility mode for）选项。从下拉菜单中选择较旧的 Windows 版本，例如 Windows 7 或 Windows 8，然后点击 "应用" 和 "确定" 保存更改。

检查错误日志：GIMP 2.10.34 可能生成错误日志，其中记录了启动过程中的详细信息。你可以尝试查找并检查 GIMP 的日志文件，该文件通常位于用户目录下的隐藏文件夹中（例如，在 Windows 上，路径可能是 C:\Users\YourUsername.gimp-2.10\session.log）。查找其中的错误消息，这可能有助于确定问题所在。

完全卸载和重新安装：如果上述方法均无效，尝试完全卸载 GIMP 2.10.34，并重新下载安装最新版本的 GIMP。确保在卸载之前备份你的工作文件和设置。

如果问题仍然存在，建议向 GIMP 官方论坛或社区寻求帮助。他们可能能够提供更具体的解决方案或调试步骤来解决启动错误。
```

- 实际解决方案:修改为win7兼容模式运行。


---

> 作者:   
> URL: http://111.230.8.71:8889/gimp/  

