# [nvim-colorscheme]在使用终端下使用nvim如何解决配色方案问题


<!--more-->
# nvim colorscheme
工作中大多数的场景都是直接连接到开发的server机器上打开vim开发。配色方案之前一直时用的molokai,最近尝试改用onedark。用了一段时间后还是改回来了。

## 痛点问题
在远程连接服务器开发时遇到了配色的问题
1. 在tmux中通过配置能够正常显示
2. 不开启tmux直接打开nvim配色异常，显示纯蓝色。画面没法看。
3. tmux配置
```bash
set -g default-terminal "tmux-256color"
```
4. ~/.bashrc配置
```bash
alias tmux="TERM=tmux-256color tmux"
export TERM=tmux-256color
```
## 如何解决xshell中配色无法正常显示的问题？
这里可以参考这篇文章
- 配置xshell开启True-Color
```bash
工具-->选项-->高级-->√使用本色*
```
## 查看当前的终端是否支持True Color
- 方法1
```bash
echo -e "\033[38;2;255;100;0mTrue Color Test\033[0m"
```

- 方法2
```bash
root@VM-8-10-ubuntu:/opt/blog/tools/vim_tools# cat ./check_true_color.sh
awk 'BEGIN{
    s="/\\/\\/\\/\\/\\"; s=s s s s s s s s;
    for (colnum = 0; colnum<77; colnum++) {
        r = 255-(colnum*255/76);
        g = (colnum*510/76);
        b = (colnum*255/76);
        if (g>255) g = 510-g;
        printf "\033[48;2;%d;%d;%dm", r,g,b;
        printf "\033[38;2;%d;%d;%dm", 255-r,255-g,255-b;
        printf "%s\033[0m", substr(s,colnum+1,1);
    }
    printf "\n";
}'
```

## 总结
- 使用xshell在terminal打开异常,需要配置xhell，在tmux打开nvim显示正常。
- 使用mobaterm在terminal或tmux中打开都正常。
- 使用tmux-256color设置能够使在有和没有TMUX的2种环境下都支持True-Color。

## 参考
- [Vim和Tmux开启256-Color和True-Color支持](https://www.cnblogs.com/Beavan/p/16563136.html)


---

> 作者:   
> URL: http://111.230.8.71:8889/nvim-colorscheme/  

