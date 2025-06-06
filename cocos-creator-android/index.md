# Cocos Creator Android


<!--more-->
# Cocos Creator Android环境搭建
## Android环境搭建
### windows环境下
#### 1. 下载jdk
- https://www.bookstack.cn/read/CocosCreatorV1.5.x/publish-publish-native.md
- https://docs.cocos.com/creator/manual/zh/editor/publish/setup-native-development.html
- 下载jdk需要账号登录怎么办?:  https://blog.csdn.net/u010180815/article/details/96479701
- 下载的jdk为:jdk-8u351-windows-x64.exe

#### 2. 配置JAVA_HOME环境变量
- https://blog.csdn.net/qq_42017152/article/details/90732057

#### 3. 下载安装Android Studio
- https://developer.android.google.cn/studio#downloads

- 解析出的windows下载地址为: https://r2---sn-ni57rn7k.gvt1.com/edgedl/android/studio/install/2021.3.1.17/android-studio-2021.3.1.17-windows.exe?cms_redirect=yes&mh=P9&mip=111.172.7.141&mm=28&mn=sn-ni57rn7k&ms=nvh&mt=1671528747&mv=m&mvi=2&pl=16&shardbypass=sd&smhost=r2---sn-ni57rn7y.gvt1.com
- android studio:android-studio-2021.3.1.17-windows.exe

#### 4. Windows环境下cocos-creator 配置原生路径为
- ndk:C:\Users\Administrator\AppData\Local\Android\Sdk\ndk\25.1.8937393
- android sdk: C:\Users\Administrator\AppData\Local\Android\Sdk
- JAVA_HOME:D:\Java\jdk1.8.0_351

### vscode配置vim
- https://www.cnblogs.com/YunyaSir/p/15522565.html
```
"vim.insertModeKeyBindings": [
{
    "before": [
        "j",
        "k"
    ],
    "after": [
        "<Esc>"
    ]
},
],
```

## ubuntu20.04 安装android studio
- https://blog.csdn.net/ayiya_Oese/article/details/114999552


## mac中cocos-creator环境搭建
### mac m1 jdk下载
- 地址: https://www.oracle.com/cn/java/technologies/downloads/#jdk19-mac
- m1下的jdk环境下载：
```
https://www.azul.com/downloads/?version=java-8-lts&os=macos&architecture=arm-64-bit&package=jdk
```
1. 安装cocos-creator
2. 安装jdk,下载的jdk为
```
jdk-8u351-macosx-x64.dmg
```
3. 安装Android-studio
### ndk安装路径
```
/Users/zp/Library/Android/sdk/ndk/25.1.8937393
```

### mac安装python2
安装的时候遇到需要python2的问题找了一些资料如下:
- https://www.jianshu.com/p/9475bd8ec36e
- https://developer.aliyun.com/article/1050722
- https://docs.cocos.com/creator/2.4/manual/zh/publish/short-tutorial-to-install-python.html

#### 使用pyenv安装python2
```
Installed Python-2.7.18 to /Users/zp/.pyenv/versions/2.7.18
```
- pyenv用法 https://www.cnblogs.com/wangxishan/p/6613746.html

### mac m1 android-studio 报错
```
Android Studio— Cause: error=86, Bad CPU type in executable
```
- 解决办法
Android Gradle Plugin版本升级4.2.2升级到7.1.2


### mac m1安装python2
```
brew install pyenv
pyenv install 2.7.18
export PATH="$(pyenv root)/shims:${PATH}"
pyenv global 2.7.18
python --version
如果一切顺利，将可以看到Python 2.8.18的输出。
需要将上述路径添加到环境变量里面，例如：
echo 'PATH=$(pyenv root)/shims:$PATH' >> ~/.zshrc
```
- 参考地址：https://www.wyr.me/post/658


---

> 作者:   
> URL: http://111.230.8.71:8889/cocos-creator-android/  

