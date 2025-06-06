# 如何在centos7.6中源码安装Vim8?


<!--more-->
## 如何在centos7.6中源码安装Vim8?
1. 卸载老版本的vim7.4
```
yum remove vim
```

2. 下载vim8的源码
```
wget -O vim8.2.0139.zip https://github.com/vim/vim/archive/v8.2.0139.zip
```

3. 安装新版本的vim8
```
unzip v8.2.0.139.zip
unzip vim8.2.0139.zip  && cd vim-8.2.0139/src
./configure --prefix=/usr/local/vim8/ --enable-pythoninterp=yes --with-python-config-dir=/usr/lib64/python2.7/config
make && make install
ln -s /usr/local/vim8/bin/vim /usr/bin/vim
vim --version
```
4. 配置vim,安装vim的依赖项目
```
sudo yum install -y yum-utils
sudo yum-config-manager --add-repo=https://copr.fedorainfracloud.org/coprs/carlwgeorge/ripgrep/repo/epel-7/carlwgeorge-ripgrep-epel-7.repo
sudo yum install -y ripgrep
sudo yum install -y ctags
#git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf
#~/.fzf/install
```
5. 安装配置vim的插件(可以把自己之前配置好的插件打包保存下来，下次就不用再下载了)
```
#curl -fLo ~/.vim/autoload/plug.vim --create-dirs  https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
#wget https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
mkdir ~/.vim/
mkdir ~/.vim/autoload/
cp plug.vim ~/.vim/autoload
cp plugged.tar.gz  ~/.vim/
cd ~/.vim/
tar -xzvf plugged.tar.gz
cd -
```


---

> 作者:   
> URL: http://111.230.8.71:8889/install-vim8/  

