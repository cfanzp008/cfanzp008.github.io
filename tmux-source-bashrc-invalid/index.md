# ubuntu20.04中source .bashrc后在tmux中无效？


<!--more-->
# ubuntu20.04中source .bashrc后在tmux中无效？
## 使用场景
- 最近使用nvim比较多，想在.bashrc中加一条
```
alias vim='nvim'
```
- 加完之后bash中source一下
```bash
source ~/.bashrc
```
- 把所有的tmux全部关闭，重新进去，发现.bashrc中的配置不生效，需要再source一下.bashrc，每次打开一个新的窗口都需要重新source一下。

## 解决方案
- 如果你在Ubuntu 20.04上使用Bash作为默认Shell，那么它会首先加载.bash_profile（如果存在），如果没有.bash_profile，则加载.bashrc
- 如果存在.bash_profile文件，在文件中加入如下配置
```bash
if [ -f ~/.bashrc ]; then
    . ~/.bashrc
fi
```



---

> 作者:   
> URL: http://111.230.8.71:8889/tmux-source-bashrc-invalid/  

