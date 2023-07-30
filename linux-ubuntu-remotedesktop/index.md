# ubuntu-远程连接windows的几种方法


# ubuntu 远程连接windows的几种方法
## 1. 使用rdesktop
- 安装
```
sudo apt install rdesktop
```

- 使用举例
```
rdesktop -g 1024x768 -a 16 -u Administrator -p your_password -0 192.168.2.189:3389
```

- 常用使用参数
```
-f 全屏
-g 桌面大小
-a 16 16位色深
-u 用户名
-p 密码
-r clipboard 表示允许在远程主机和本机之间共享剪切板，可以复制粘贴
-r clipboard:PRIMARYCLIPBOARD 共享剪贴板，连接到window7
-r disk:share=/home 共享/home目录
ctrl+alt+enter 退出全屏
```

### 使用rdesktop常见问题
#### 1. 连接失败,提示如下:
```
Connecting to server using NLA...
Core(warning): Certificate received from server is NOT trusted by this system, an exception has been added by the user to trust this specific certificate.
               TLS  Session info: (TLS1.2)-(RSA)-(AES-256-GCM)

               Failed to initialize NLA, do you have correct Kerberos TGT initialized ?
               Failed to connect using NLA, trying with SSL
               Failed to connect, CredSSP required by server (check if server has disabled old TLS versions, if yes use -V option).
```

- 解决方法是:
```
1.先通过其他方式远程连接服务器。
2.右键我的电脑-->属性-->远程设置-->远程
3.取消勾选 仅允许运行使用网络界别身份验证的远程桌面的计算机连接(建议)(N)
```

#### 2. 如何共享磁盘？
- 加上 -r disk:share_home=/home参数（Ubuntu 20.04.4 LTS 测试正常）
```
rdesktop -g 1024x768 -a 16 -u Administrator -p your_password -0 192.168.2.189:3389 -r clipboard:PRIMARYCLIPBOARD -r disk:share_home=/home
```

### 扩展使用
- 使用i3wm桌面管理器时，该方法同样可用
- manjaro中可用

### 参考链接
- https://blog.csdn.net/weixin_39895167/article/details/116716315

## 2. xfreerdp

## 3. Remmina 桌面共享客户端
### 1. 安装
```
sudo apt-get install remmina remmina-plugin-*
```

## 总结
- 目前就个人而言，如果是在终端里面我个人比较喜欢用的是rdesktop和xfreerdp。
- GUI管理工具的话，Remmina目前也在用，感觉还是挺不错的，推荐给大家。
- 如果大家有更好的linux远程windows的工具，欢迎推荐。


---

> 作者: cfanzp  
> URL: https://cfanzp.com/linux-ubuntu-remotedesktop/  

