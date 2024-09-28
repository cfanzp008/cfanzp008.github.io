# Vim


# Vim
使用Vim有很长时间了，Vim目前是我的首选编辑器。虽然用了很久Vim,但是对Vim的了解还很粗浅。Vim也在不断的进化，也出现了很多分支。因为自己对lua有一定地了解。现在把Vim也切换到NeoVim了。
## nvim配置
- [https://gitee.com/cfanzp/nvim-config.git](https://gitee.com/cfanzp/nvim-config.git)

## 代码跳转
- c++使用bear生成compile_commands.json,解决clangd代码跳转找不到头文件的问题。
- 在项目根目录如果有makefile文件运行bear make就会生成对应的compile_commands.json文件。
```
apt install bear
bear make
```

## 显示
### 配色方案
之前一直在使用molokai,最近在尝试使用onedark
- molokai
- onedark

### 字体
下载太大太慢了,建议使用国内镜像
- https://github.com/ryanoasis/nerd-fonts.git
- https://gitee.com/keyboardkiller/nerd-fonts
- https://gitee.com/keyboardkiller/nerd-fonts.git

- hasklig
```
wget https://github.com/ryanoasis/nerd-fonts/releases/download/v3.0.2/Hasklig.zip
unzip Hasklig.zip -d /usr/local/share/fonts/
fc-cache -fv
```

#### mac
```
brew tap homebrew/cask-fonts
brew install --cask font-ubuntu-nerd-font
```

#### ubuntu
```
https://blog.csdn.net/auteman_dan/article/details/128872671
```

## neovim lazy.nvim管理配置常用插件
{{< mermaid >}}
graph LR
  NeoVim-->lazy.nvim
  lazy.nvim-->nvim-lspconfig
  lazy.nvim-->neo-tree
  lazy.nvim-->telescope
  lazy.nvim-->Vista-替代tagbar
  lazy.nvim-->molokai
  lazy.nvim-->tabular
  lazy.nvim-->vim-surround
  lazy.nvim-->bufferline
  lazy.nvim-->lspsaga
{{</ mermaid >}}

### neovim 插件
- code_runner.vim - https://github.com/CRAG666/code_runner.nvim
- vista:liuchengxu/vista.vim https://github.com/liuchengxu/vista.vim
- lspsaga:https://github.com/nvimdev/lspsaga.nvim

## vim 之前常用插件
{{< mermaid >}}
graph LR
  Vim-->plug
  plug-->ag
  plug-->nerdtree
  plug-->fzf
  plug-->tagbar
  plug-->molokai
  plug-->tabular
  plug-->neocomplcache
  plug-->vim-surround
  plug-->syntastic
  plug-->LeaderF
{{</ mermaid >}}


## TODO
- [ ] 尝试配置改为使用lazy.nvim,看是否好用。
- [ ] 总结自己的neovim配置和使用心得。

## Vim学习笔记
- [vim实用技巧学习笔记](/book/vim/)
- [vim使用笔记](/categories/vim/)
- [nvim安装与使用](/nvim-install/)

## Nvim Lsp配置
### c++配置
- https://www.cnblogs.com/lanuage/p/16664221.html
- https://zhuanlan.zhihu.com/p/444836713

## Vim资源
### Vim插件
### NeoVim插件
- [lazy.nvim](https://github.com/folke/lazy.nvim)

## 值得一看的文章
- [2023年Vim的C++配置](https://martins3.github.io/My-Linux-Config/docs/nvim.html)

## 参考
- https://www.cnblogs.com/viiv/p/15729383.html
- https://gohalo.github.io/cn/blog/neovim-lsp-usage/


---

> 作者: cfanzp  
> URL: https://cfanzp.com/vim/  

