# 初始化ubuntu开发环境脚本


<!--more-->
# 初始化ubuntu开发环境脚本
```bash
ubuntu@VM-8-10-ubuntu:~/linux_note/config/ubuntu/script$ cat init_ubuntu.sh 
sudo apt install silversearcher-ag
sudo apt install tmux
sudo apt install fdclone
sudo apt install ripgrep
sudo apt install git
sudo apt install tig
sudo apt install ranger
sudo apt install global -y
sudo apt install fzf -y
sudo apt install git-ftp -y
sudo apt install gdb -y
sudo apt install cmake -y
sudo apt install unzip -y
sudo apt install proxychains4 -y
#./install_mdbook.sh
#wget https://github.com/gohugoio/hugo/releases/download/v0.101.0/hugo_extended_0.101.0_Linux-64bit.tar.gz
#tar -xzvf hugo_extended_0.101.0_Linux-64bit.tar.gz
sudo snap install hugo


## tmux init
cp ./.tmux.conf ~/
echo alias tmux=\"TERM=screen-256color-bce tmux\" >> ~/.bashrc
## gitconfig
cp ./.gitconfig ~/

## vim config
rm ~/.vimrc
touch ~/.vimrc
echo "inoremap jk <ESC>" >> ~/.vimrc
```


---

> 作者:   
> URL: http://111.230.8.71:8889/script-init-ubuntu-dev/  

