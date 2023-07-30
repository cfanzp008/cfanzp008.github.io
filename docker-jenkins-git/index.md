# 基于Docker+Jenkins+Git的发布环境


<!--more-->
# 基于Docker+Jenkins+Git的发布环境
- 通过Docker管理Jenkins资源。
- 通过Jenkins创建Docker镜像。

## 发布流程
- 开发人员使用git提交代码到git服务器
- git hook触发Jenkiins
- Jenkiins使用shell脚本控制docker操作:网站的部署、运行与更新

## 安装Jenkins


---

> 作者:   
> URL: https://cfanzp.com/docker-jenkins-git/  

