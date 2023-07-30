# Linux 中如何让ls目录、可执行文件等显示不同的颜色？


<!--more-->
# Linux 中如何让ls目录、可执行文件等显示不同的颜色？
## ubuntu 20.04配置方法
```bash
echo alias ls='ls --color=auto' >> ~/.bashrc
source ~/.bashrc
```

## mac m1配置方法
```bash
vim ~/.bash_profile
export LS_OPTIONS='--color=auto'          # 如果没有指定，则自动选择颜色
export CLICOLOR='Yes'                    #是否输出颜色
export LSCOLORS='CxfxcxdxbxegedabagGxGx' #指定颜色
source ~/.bash_profile
```


---

> 作者:   
> URL: https://cfanzp.com/ls-color/  

