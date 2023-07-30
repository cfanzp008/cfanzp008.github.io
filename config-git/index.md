# git配置文件.gitconfig


# git配置文件.gitconfig
.gitconfig 配置
```gitconfig
[alias]
    co = checkout
    ci = commit
    st = status
    sh = stash
    sa = stash apply
    sp = stash pop
    ap = add -p
    br = branch
    cp = checkout -p
    cv = commit -v
    dc = diff --cached
    d = difftool
    pr = pull --rebase
    ps = push
    l = log --graph --pretty=format:'%C(yellow)%h%Creset %C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --date=short --all
    lg = log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --all
    lgfile = log --name-status --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --all
[user]
    email = cfanzp@qq.com
    name = mac_zp
[diff]
    tool = vimdiff
[difftool]
    prompt = false

[color]
    status = auto
    diff = auto
    branch = auto
    interactive = auto
[core]
    editor = vim
    whitespace = cr-at-eol
    autocrlf = input
```


---

> 作者: cfanzp  
> URL: https://cfanzp.com/config-git/  

