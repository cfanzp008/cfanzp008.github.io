# vscode的使用


# vscode使用笔记

### FAQ
## vscode必备插件有哪些？
- vim
- Lua
- Vscode-lua
- Go
- Rainbow Brackets
- Thunder Client

## 如何给vscode添加ruler?
按语言添加:
```json
"[lua]":{
    "editor.rulers":[80],
}
```

### vscode配置vim插件jk退出插入模式
- https://www.cnblogs.com/YunyaSir/p/15522565.html
```
"vim.insertModeKeyBindings": [
{
    "before": [
        "j",
        "k"
    ],
    "after": [
        "<Esc>"
    ]
},
],
```

### vscode 在mac上无法连续输入k如何解决？
```
defaults write com.microsoft.VSCode ApplePressAndHoldEnabled -bool false              # For VS Code
defaults write com.microsoft.VSCodeInsiders ApplePressAndHoldEnabled -bool false      # For VS Code Insider
defaults write com.visualstudio.code.oss ApplePressAndHoldEnabled -bool false         # For VS Codium
defaults write com.microsoft.VSCodeExploration ApplePressAndHoldEnabled -bool false   # For VS Codium Exploration users
defaults delete -g ApplePressAndHoldEnabled
```


---

> 作者:   
> URL: https://cfanzp.com/edit-vscode/  

