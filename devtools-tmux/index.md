# [vim-tmux]tmux基本配置及vim适配


# tmux基本配置
## tmux是什么？
tmux是一个终端复用工具。对于服务端开发的程序员或运维人员而言用处十分大。大大提高了工作效率。

## 下载
```
wget http://cznic.dl.sourceforge.net/project/tmux/tmux/tmux-1.9/tmux-1.9a.tar.gz
```

## 安装
- centos安装
```bash
yum install libevent-devel ncurses-devel
tar -zxvf tmux-1.9.tar.gz
cd tmux-1.9
./configure
make
make install
```

- ubuntu
```bash
sudo apt install tmux
```

- 查看版本号
```bash
tmux -V
```

## 使用
```
tmux #开启tmux
tmux ls #显示已有tmux列表（C-b s）
tmux attach-session -t 数字 #选择tmux
C-b c 创建一个新的窗口
C-b n 切换到下一个窗口
C-b p 切换到上一个窗口
C-b l 最后一个窗口,和上一个窗口的概念不一样哟,谁试谁知道
c-b w 通过上下键选择当前窗口中打开的会话
C-b 数字 直接跳到你按的数字所在的窗口
C-b & 退出当前窗口
C-b d 临时断开会话 断开以后,还可以连上的哟:)
C-b " 分割出来一个窗口
C-b % 分割出来一个窗口
C-b o 在小窗口中切换
C-b (方向键)
C-b ! 关闭所有小窗口
C-b x 关闭当前光标处的小窗口
C-b t 钟表
C-b pageup/pagedo
```

## 实用的tmux配置
### 一个实用的tmux配置文件分享
- 存放路径~/.tmux.conf
- 配置贴出来很简单：
- 2024-10-16日更新配置
```bash
root@VM-8-10-ubuntu:/opt/blog/tools/vim_tools# cat ~/.tmux.conf 
set -g default-terminal "tmux-256color"
set-option -a terminal-overrides '*256col*:Tc'

#支持 OSC52 ssh copy to local clipboard
set -g set-clipboard on

set-option allow-rename off
#for nvim
set-option -sg escape-time 10
set-option -g focus-events on
#-- base settings --#
set -g mode-keys vi
# prefix key (Ctrl+a)
set -g prefix ^a
unbind ^b
bind ^a send-prefix

#up
bind-key k select-pane -U
#down
bind-key j select-pane -D
#left
bind-key h select-pane -L
#right
bind-key l select-pane -R
```

### tmux插件配置文件分享
```bash
root@vpps:~/.tmux/plugins# cat ~/.tmux.conf 
set -g default-terminal "screen-256color"
#-- base settings --#
set -g mode-keys vi
set-option -g escape-time 50

set-environment -g EDITOR nvim

# prefix key (Ctrl+a)
set -g prefix ^a
unbind ^b
bind a send-prefix

#up
bind-key k select-pane -U
#down
bind-key j select-pane -D
#left
bind-key h select-pane -L
#right
bind-key l select-pane -R

unbind-key -Troot Enter

# List of plugins
set -g @plugin 'tmux-plugins/tpm'
#set -g @plugin 'tmux-plugins/tmux-sensible'
set -g @plugin 'tmux-plugins/tmux-open'
set -g @plugin 'tmux-plugins/tmux-urlview'
set -g @plugin 'tmux-plugins/tmux-yank'
set -g @plugin 'tmux-plugins/tmux-copycat'

set-option -g @urlview-command "nvim {}"
set -g @shell_mode 'vi'

# Other examples:
# set -g @plugin 'github_username/plugin_name'
# set -g @plugin 'github_username/plugin_name#branch'
# set -g @plugin 'git@github.com:user/plugin'
# set -g @plugin 'git@bitbucket.com:user/plugin'

# Initialize TMUX plugin manager (keep this line at the very bottom of tmux.conf)
run '~/.tmux/plugins/tpm/tpm'
run-shell  '~/.tmux/plugins/tmux-urlview/urlview.tmux'
run-shell '~/.tmux/plugins/tmux-open/open.tmux'
run-shell '~/.tmux/plugins/tmux-yank/yank.tmux'
run-shell '~/.tmux/plugins/tmux-copycat/copycat.tmux'
```

- tmux无需过多配置，用vim的同学绑定hjkl就特别好用了。

### 更新配置文件
- 当修改了.tmux.conf后不想重启tmux,可以使用下面的命令更新配置
```
tmux source-file ~/.tmux.conf
```

### 解决vim在tmux中显示颜色异常
- 设置session保存路径为~/.config/session.tmux,防止默认保存在/tmp/tmux-0/default的session被删掉。
```bash
# vim ~/.bashrc
alias tmux="TERM=screen-256color-bce tmux -S ~/.config/session.tmux"
```

### tmux中复制
tmux可以实现在终端中复制，方法很简单
```
Ctrl-a + [:进入复制模式
HJKL:选择需要复制的文本
Enter:复制并结束
Ctrl-a + ]:粘贴
```
### tmux支持多个prefix
在实际使用过程中会发现，有时和其它同事公用一台机器时，各人习惯不一致，有的喜欢用C-b,有的喜欢用C-a，这样会有冲突，解决方案是
在配置文件中加入同时支持2种方式的配置
```bash
set-option -g prefix C-a
set-option -g prefix2 C-b
```

### tmux插件
- [tmux-yank](https://github.com/tmux-plugins/tmux-yank)
- [tmux-copycat](https://github.com/tmux-plugins/tmux-copycat)
- [vim-tmux-navigator](https://github.com/christoomey/vim-tmux-navigator)
- [urlview](https://github.com/sigpipe/urlview)
- [tmux-open](https://github.com/tmux-plugins/tmux-open)


---

> 作者: cfanzp  
> URL: http://111.230.8.71:8889/devtools-tmux/  

