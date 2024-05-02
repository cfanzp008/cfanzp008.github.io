# nvim的安装与使用


<!--more-->
# nvim的安装与使用
nvim 是vim的一个分支

## nvim
- nvim稳定版本下载地址: https://github.com/neovim/neovim/releases/tag/stable
- 官网地址: https://neovim.io/

## 安装
### centos安装Neovim
#### 安装官方编译的程序
- 先下载nvim-linux64.tar.gz:https://github.com/neovim/neovim/releases/tag/stable
```
tar xvf nvim-linux64.tar.gz
mv nvim-linux64 /usr/local/
cd /bin
ln -s /usr/local/nvim-linux64/bin/nvim nvim
```

#### 安装遇到问题
- 打开nvim提示:
```
./nvim: /lib64/libc.so.6: version `GLIBC_2.28' not found (required by ./nvim)
./nvim: /lib64/libm.so.6: version `GLIBC_2.29' not found (required by ./nvim)
```
- 这个问题需要安装对应的GLIBC库，安装过程中可能又会遇到其它问题。如果遇到这个问题建议更换安装方法。

#### 添加python3支持
```
pip3 install --user --upgrade pynvim
```

### yum安装
- centos7
- 参考：https://github.bnblogs.cc/centos%E5%AE%89%E8%A3%85nvim/#%E5%AE%89%E8%A3%85cocnvim
```
yum install -y https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
yum install -y neovim python3-neovim
```
- 安装后的版本为0.3.1(官方最新版本已经为0.8.1),太老了。
```
yum remove neovim
```

## 常见问题
- 在tmux中使用neovim ESC反应慢
```
nvim ~/.tmux.conf

set -s escape-time 0

#bash
tmux source-file ~/.tmux.conf
```

### ubuntu安装Neovim
- 下载
```
sudo wget https://github.com/neovim/neovim/releases/download/v0.8.1/nvim-linux64.deb
sudo apt remove neovim*
sudo apt install nvim
```

- 安装方法2
```
sudo snap install nvim --classic
```

## 安装插件
如果之前安装过nvim，可以将自己的.config目录下的nvim配置打包压缩保存一下,.vim目录下的plugged也压缩保存一下
```bash
tar -xcvf nvim.tar.gz nvim
tar -xcvf plugged.tar.gz plugged
```
在需要使用的服务器上上传相关配置和插件压缩包，或使用github,gitee等保存，然后同步下来
```
cd ~/.config/
tar -xzvf nvim.tar.gz
cd ~/.vim/
tar -xzvf plugged.tar.gz
```

## 按装插件相关依赖
### 安装tagbar依赖ctags
- 使用yum安装
```
yum install ctags -y
```

### 安装fzf
- 通过源码安装，按提示操作
```
git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf
~/.fzf/install
```
- 安装完了之后不要忘记了更新一下bash
```
source ~/.bashrc
```

## 检查健康状况
可以使用checkhealth命令来检查nvim的配置是否正常，然后根据提示进行修正
```
checkhealth
```

- 例如提示python2相关错误
```
- ERROR: Neovim Python client is not installed.
   Error: unable to load neovim Python module
   - ADVICE:
     - Run in shell: pip2 install neovim
```

- python3安装neovim报错解决
```
pip3 install neovim
greenlet.h:8:20: fatal error: Python.h: No such file or directory #99
yum install python3-devel
```

### FAQ
- 远程连接到linux服务器使用neovim的时候如何将neovim中的文本复制出来？
```
shift + 鼠标是一种解决方案
```

- vim配置文件提示：undefiend global 'vim'
```bash
vim /root/.config/nvim/lua/plugins/plugin-nvim-lspconfig.lua
diagnostics = {
    -- Get the language server to recognize the `vim` global
        globals = {'vim'},
},
    ```


---

> 作者:   
> URL: https://cfanzp.com/nvim/  

