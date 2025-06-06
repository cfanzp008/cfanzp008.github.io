# 如何在terminal中使用Joplin并像vim一样移动?


# 如何在terminal中使用Joplin并像vim一样移动?
## 安装
### mac 安装方法
```bash
brew install node
NPM_CONFIG_PREFIX=~/.joplin-bin npm install -g joplin
sudo ln -s ~/.joplin-bin/bin/joplin /usr/bin/joplin
[zp@localhost bin]$ sudo ln -s ~/.joplin-bin/bin/joplin /usr/bin/joplin
ln: /usr/bin/joplin: Read-only file system
sudo ln -s ~/.joplin-bin/bin/joplin /usr/local/bin/joplin
```

### ubuntu 安装方法
```bash
#Important: First, install Node 12+.
NPM_CONFIG_PREFIX=~/.joplin-bin npm install -g joplin
sudo ln -s ~/.joplin-bin/bin/joplin /usr/bin/joplin
```
我安装的时候`nodejs`版本是:`v10.19.0`,建议按官方要求使用Node `12+`

进入
```bash
joplin
```

## 配置文件同步
同步方式建议用文件同步，尝试了用坚果云的WebDav同步效果不是很好，手机可以采用WebDav,电脑还是用文件同步更稳定些。
```
:config sync.target 2
:config sync.2.path /home/cfanzp/jgy/joplin
```
配置将会被保存在下面文件中
```
~/.config/joplin/settings.json
```

## 快捷键配置
```
~/.config/joplin/keymap.json
```
### 快捷键配置demo keymap.json
```json
[
  { "keys": [":"], "type": "function", "command": "enter_command_line_mode" },
  { "keys": ["TAB"], "type": "function", "command": "focus_next" },
  { "keys": ["SHIFT_TAB"], "type": "function", "command": "focus_previous" },
  { "keys": ["UP"], "type": "function", "command": "move_up" },
  { "keys": ["DOWN"], "type": "function", "command": "move_down" },
  { "keys": ["PAGE_UP"], "type": "function", "command": "page_up" },
  { "keys": ["PAGE_DOWN"], "type": "function", "command": "page_down" },
  { "keys": ["ENTER"], "type": "function", "command": "activate" },
  { "keys": ["DELETE", "BACKSPACE"], "type": "function", "command": "delete" },
  { "keys": [" "], "command": "todo toggle $n" },
  { "keys": ["n"], "type": "function", "command": "next_link" },
  { "keys": ["b"], "type": "function", "command": "previous_link" },
  { "keys": ["o"], "type": "function", "command": "open_link" },
  { "keys": ["tc"], "type": "function", "command": "toggle_console" },
  { "keys": ["tm"], "type": "function", "command": "toggle_metadata" },
  { "keys": ["/"], "type": "prompt", "command": "search \"\"", "cursorPosition": -2 },
  { "keys": ["mn"], "type": "prompt", "command": "mknote \"\"", "cursorPosition": -2 },
  { "keys": ["mt"], "type": "prompt", "command": "mktodo \"\"", "cursorPosition": -2 },
  { "keys": ["mb"], "type": "prompt", "command": "mkbook \"\"", "cursorPosition": -2 },
  { "keys": ["yn"], "type": "prompt", "command": "cp $n \"\"", "cursorPosition": -2 },
  { "keys": ["dn"], "type": "prompt", "command": "mv $n \"\"", "cursorPosition": -2 }
]

```

### vim快捷键配置demo keymap.json
```json
[
  { "keys": [":"], "type": "function", "command": "enter_command_line_mode" },
  { "keys": ["TAB","l"], "type": "function", "command": "focus_next" },
  { "keys": ["SHIFT_TAB","h"], "type": "function", "command": "focus_previous" },
  { "keys": ["UP","k"], "type": "function", "command": "move_up" },
  { "keys": ["DOWN","j"], "type": "function", "command": "move_down" },
  { "keys": ["PAGE_UP","{"], "type": "function", "command": "page_up" },
  { "keys": ["PAGE_DOWN","}"], "type": "function", "command": "page_down" },
  { "keys": ["ENTER"], "type": "function", "command": "activate" },
  { "keys": ["DELETE", "BACKSPACE"], "type": "function", "command": "delete" },
  { "keys": [" "], "command": "todo toggle $n" },
  { "keys": ["tc"], "type": "function", "command": "toggle_console" },
  { "keys": ["tm"], "type": "function", "command": "toggle_metadata" },
  { "keys": ["/"], "type": "prompt", "command": "search \"\"", "cursorPosition": -2 },
  { "keys": ["mn"], "type": "prompt", "command": "mknote \"\"", "cursorPosition": -2 },
  { "keys": ["mt"], "type": "prompt", "command": "mktodo \"\"", "cursorPosition": -2 },
  { "keys": ["mb"], "type": "prompt", "command": "mkbook \"\"", "cursorPosition": -2 },
  { "keys": ["yn"], "type": "prompt", "command": "cp $n \"\"", "cursorPosition": -2 },
  { "keys": ["dn"], "type": "prompt", "command": "mv $n \"\"", "cursorPosition": -2 }
]
```

vim快捷键添加e进入Vim编辑
```json
{ "keys": ["ENTER","e"], "type": "function", "command": "activate" },
```

vim快捷键添加q退出
```json
 { "keys": ["dn"], "type": "prompt", "command": "exit", "cursorPosition": -1 }
```

#### 主要快捷键

| key     | note                 | cmd             |
| --      | --                   | --              |
| hjkl    | 移动                 | -               |
| (SPACE) | 完成todo项目         | :todo toggle $n |
| /       | 搜索                 | :search         |
| mn      | make note 创建笔记   | :mknote         |
| mt      | make todo 创建待办   | :mktodo         |
| mb      | make book 创建笔记本 | :mkbook         |
| yn      | cp当前项目           | cp       $n     |
| dn      | 删除当前项目         | :mv $n          |
| q       | 退出                 | :exit           |


### 配置默认编辑器为Vim
在命令行中执行:
```bash
joplin config editor "/usr/bin/vim"
```

或在jopliin内部命令行模式
```
:config editor "/usr/bin/vim"
```

## 参考
- https://joplinapp.org/terminal
- https://zhuanlan.zhihu.com/p/107334649


---

> 作者: [](https://cfanzp.com/about/)  
> URL: http://111.230.8.71:8889/joplin-terminal/  

