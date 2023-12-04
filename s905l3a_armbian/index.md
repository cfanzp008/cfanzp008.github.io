# S905l3a YST 安装armbian


<!--more-->
# S905l3a安装armbian
上周末把家里二手的电视盒子刷成了armbian,再安装上docker,docker上可以安装轻量级的nas和很多工具比如Home Assistant。
## 安装遇到问题
### 更新系统后无法进入系统了
- 这个问题很搞人，解决方案就是别更新armbian就可以了。

### 设置网络
- 用nmtui

### 安装portainer
```bash
root@armbian:~# cat install_portainer.sh 
#这个可不执行，搜索portainer镜像，我选portainer-ce
docker search portainer
#拉取portainer镜像
docker pull portainer/portainer-ce 
#创建一个名称为portainerTV端口为9000的容器，并运行。
docker run -d -p 9000:9000 --restart=always \
 -v /var/run/docker.sock:/var/run/docker.sock \
 --name portainerTV portainer/portainer-ce
```

## 参考
- https://www.right.com.cn/forum/thread-8246642-1-1.html


---

> 作者:   
> URL: https://cfanzp.com/s905l3a_armbian/  

