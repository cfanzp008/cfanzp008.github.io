# Vim


# Vim
使用Vim有很长时间了，Vim目前是我的首选编辑器。虽然用了很久Vim,但是对Vim的了解还很粗浅。Vim也在不断的进化，也出现了很多分支。因为自己对lua有一定地了解。现在把Vim也切换到NeoVim了。
## nvim配置
- [https://gitee.com/cfanzp/nvim-config.git](https://gitee.com/cfanzp/nvim-config.git)

### 字体
下载太大太慢了,建议使用国内镜像
- https://github.com/ryanoasis/nerd-fonts.git
- https://gitee.com/keyboardkiller/nerd-fonts
- https://gitee.com/keyboardkiller/nerd-fonts.git

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
  lazy.nvim-->tagbar
  lazy.nvim-->molokai
  lazy.nvim-->tabular
  lazy.nvim-->vim-surround
{{</ mermaid >}}


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
- [nvim安装与使用](/nvim/)


## Vim资源
### Vim插件
### NeoVim插件
- [lazy.nvim](https://github.com/folke/lazy.nvim)


---

> 作者: cfanzp  
> URL: https://cfanzp.com/vim/  

