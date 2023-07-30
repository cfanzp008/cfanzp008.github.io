# 解决mac系统中vscode中使用vim插件，按下某个键不连续输入的问题


<!--more-->
# 解决mac系统中vscode中使用vim插件，按下某个键不连续输入的问题
## 问题
在mac系统中,如果给vscode中安装vim插件，按下某个键不放下会发现无法连续输入，或移动光标。如果是这个效果的话，插件就是个鸡肋了。

## 解决办法
- 查了一些资料后发现解决方法也很简单
```bash
# Disable Mac's "Press&Hold" feature
$ defaults write NSGlobalDomain ApplePressAndHoldEnabled -bool false
```
- 恢复
```bash
# Re-enable this feature
$ defaults write NSGlobalDomain ApplePressAndHoldEnabled -bool true
```

- 注意需要重启vscode才会生效


## 参考
- https://www.jianshu.com/p/75cc293ae399


---

> 作者:   
> URL: https://cfanzp.com/vscode-vim-key-fix/  

