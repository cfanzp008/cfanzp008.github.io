# mac平铺式桌面管理器yabai


<!--more-->
# mac平铺式桌面管理器yabai
## 介绍
之前自己用的一台低配置的笔记本本来是装了i3自己用的，后来装回windows系统给家人用了，最近自己入手了一台mac,因为想用平铺式的桌面管理器于是关注了一下yabai。有空折腾一下，这里先记录一下。

## 安装步骤
### 关闭完整性保护
- 查看完整性保护状态
```bash
csrutil status
```

### 安装
```bash
brew install koekeishiya/formulae/yabai
```

### 设置
```
echo "$(whoami) ALL=(root) NOPASSWD: sha256:$(shasum -a 256 $(which yabai) | cut -d " " -f 1) $(which yabai) --load-sa"
zp ALL=(root) NOPASSWD: sha256:0c054aec0f8eeb0ba2328aa91654f5354eeacc53e9e679250afb7db1eaf062b3 /usr/local/bin/yabai --load-sa
```

### 修改配置文件/etc/sudoers
```
sudo vim /etc/sudoers
zp ALL=(root) NOPASSWD: sha256:0c054aec0f8eeb0ba2328aa91654f5354eeacc53e9e679250afb7db1eaf062b3 /usr/local/bin/yabai --load-sa
```

### 修改配置文件
```
vim ~/.yabairc
yabai -m signal --add event=dock_did_restart action="sudo yabai --load-sa"
sudo yabai --load-sa
```

### 开启调试日志
```
yabai -m config debug_output on
```

- 下载skhd的配置demo
```
curl https://raw.githubusercontent.com/koekeishiya/yabai/master/examples/yabairc --output ~/.yabairc_demo
```

### 安装键盘快捷键工具
```
brew install koekeishiya/formulae/skhd
skhd --start-service
```
- skhd用法
```
https://github.com/koekeishiya/skhd
```

- 下载skhd的配置demo
```
curl https://raw.githubusercontent.com/koekeishiya/yabai/master/examples/skhdrc --output ~/.skhdrc
# 推荐
curl wget https://raw.githubusercontent.com/pseudoyu/dotfiles/master/skhd/skhdrc --output ~/.skhrc
```

- 参考:https://github.com/pseudoyu/dotfiles/blob/master/skhd/skhdrc
```
# 窗口聚焦
alt - h : yabai -m window --focus west
alt - j : yabai -m window --focus south
alt - k : yabai -m window --focus north
alt - l : yabai -m window --focus east

# 交换窗口
shift + alt - h : yabai -m window --swap west
shift + alt - j : yabai -m window --swap south
shift + alt - k : yabai -m window --swap north
shift + alt - l : yabai -m window --swap east

# 移动窗口
shift + alt + ctrl - h : yabai -m window --warp west
shift + alt + ctrl - h : yabai -m window --warp south
shift + alt + ctrl - h : yabai -m window --warp north
shift + alt + ctrl - h : yabai -m window --warp east

# 旋转窗口布局
alt - r : yabai -m space --rotate 90

# 全屏
alt -f : yabai -m window --toggle zoom-fullscreen

# 设置/取消窗口 space
alt - g : yabai -m space --toggle padding; yabai -m space --toggle gap

# 挂起窗口至屏幕中央/取消挂起窗口
alt - t : yabai -m window --toggle float;\
          yabai -m window --grid 4:4:1:1:2:2

# 修改窗口切分方式
alt - e : yabai -m window --toggle split

# 重置窗口布局
shift + alt - 0 : yabai -m space --balance

# 移动窗口至特定桌面
shift + alt - 1 : yabai -m window --space 1; yabai -m space --focus 1
shift + alt - 2 : yabai -m window --space 2; yabai -m space --focus 2
shift + alt - 3 : yabai -m window --space 3; yabai -m space --focus 3
shift + alt - 4 : yabai -m window --space 4; yabai -m space --focus 4
shift + alt - 5 : yabai -m window --space 5; yabai -m space --focus 5
shift + alt - 6 : yabai -m window --space 6; yabai -m space --focus 6
shift + alt - 7 : yabai -m window --space 7; yabai -m space --focus 7
shift + alt - 8 : yabai -m window --space 8; yabai -m space --focus 8
shift + alt - 9 : yabai -m window --space 9; yabai -m space --focus 9

# 增加窗口大小
shift + alt - w : yabai -m window --resize top:0:-20
shift + alt - d : yabai -m window --resize left:-20:0

# 减少窗口大小
shift + alt - s : yabai -m window --resize bottom:0:-20
shift + alt - a : yabai -m window --resize top:0:20
```


### 启动
```
yabai --start-service
```

### 关闭
```
yabai --stop-service
```

## 参考
- https://blog.csdn.net/yuanzhenwei521/article/details/123311427
- github: https://github.com/koekeishiya/yabai
- https://sspai.com/post/73620


---

> 作者:   
> URL: http://111.230.8.71:8889/mac-yabai/  

