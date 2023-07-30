# ubuntu20.04中升级gcc,g++到gcc-11,g++11


<!--more-->
# ubuntu20.04中升级gcc,g++到gcc-11,g++11

## 添加工具链
```
sudo add-apt-repository ppa:ubuntu-toolchain-r/test
sudo apt update
sudo apt upgrade
```

## 安装
```
sudo apt install gcc-11 g++-11
```

## 降低旧版本优先级
```
sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-9 10
sudo update-alternatives --install /usr/bin/g++ g++ /usr/bin/g++-9 10
```

## 给予新版本更高的优先级
```
sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-11 20
sudo update-alternatives --install /usr/bin/g++ g++ /usr/bin/g++-11 20
```

- 参考：https://www.cnblogs.com/airchip/p/16280320.html


---

> 作者:   
> URL: https://cfanzp.com/cpp-ubuntu2004-gcc11/  

