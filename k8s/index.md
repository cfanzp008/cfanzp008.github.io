# k8s学习笔记


<!--more-->
# k8s学习笔记
## 基本概念
- statefulset
- helm
- pod
- configmap
- kubeadm
- 二进制安装
- bootstrapping
- kubelet

### 0宕机
- startupprobe
- Pod三种探针


### 资源调度
- Deployment
- 有状态的应用管理StatefulSet
- 守护进程服务DaemonSet
- HAP自动扩容

### 服务发布
- Label Selector
- Ingress
- Sevice


### 配置管理
- ConfigMap
- Secret


### 持久化存储
- Volumes
- Volumes HostPath挂载宿主路径
- Volumes EmptyDir实现数据共享
- NFS
- 持久化PV&PVC

### 高级调度
- CronJob计划任务
- 污点和容忍Taint&Toleration
- initContainer
- Affinity亲和力入门
- 节点亲和力NodeAffinity
- Pod亲和力和反亲和力
- Topology拓扑域
- Topology实现多地多机房部署
- 临时容器
- 临时容器在线debug

### 准入控制及细力度权限控制
- RBAC权限管理
- Ratel
- 准入控制
- 服务质量Qos
- PodPreset
- Dashboard基于用户名密码认证

## 高级篇
### 云原生存储
- Rook
- Ceph
- StorageClass
- Rook Ceph xfs_repair问题


### 中间件容器化以及Helm
- Redis Operator
- Redis集群部署
- Helm v3(yum)
- 编写Helm部署RabbitMQ

### 源码修改
- Kubeadm源码修改(默认证书只有1年)

### 组件
- APISERVER
- ControllerManager
- Scheduler
- ETCD
- Kubelet
- Kube-proxy
- CORENDS
- DASHBOARD
- INGRESS CONTROLLER
- FEDERATION
- PROMETHEUS
- ELK

### Pod
### 
- ReplicationController
- ReplicaSet


## 运维
- EFK日志收集
- Filebeat 收集容器内日志
- prometheus
- prometheus告警



## 游戏中实践
- https://longzhiri.github.io/Game+Servers+k8s+practice.html

## 参考
- https://www.bilibili.com/video/BV1JR4y1B7oa

## 哪些公司在用k8s
- 参考: https://blog.csdn.net/xueshenlaila/article/details/118895406
- 京东
- 知呼
- 天猫
- 阿里巴巴
- 诺基亚
- 永辉超市
- 美团: https://tech.meituan.com/2019/08/22/kubernetes-cluster-management-practice.html
- 网易: https://blog.csdn.net/NetEaseResearch/article/details/108279775
- 字节跳动: http://science.china.com.cn/2022-06/14/content_42001803.htm
- 联通: https://www.alauda.cn/news/detail/id/526.html
- 中国移动: https://blog.51cto.com/u_15127420/3213363
- 中国电信: https://www.linkedin.cn/incareer/jobs/view/k8s%E5%AE%B9%E5%99%A8%E5%8C%96%E5%BC%80%E5%8F%91%E5%B7%A5%E7%A8%8B%E5%B8%88-mj000003-at-%E4%B8%AD%E5%9B%BD%E7%94%B5%E4%BF%A1%E9%9B%86%E5%9B%A2%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8-3488457311
- 腾讯: https://cloud.tencent.com/developer/article/1761279
- 奇虎360
- 新浪微博
- 金山云
- 滴滴出行
- 新东方
- 小红书
- 百度
- 华为
- 快手
- 国家电网
- 小米
- 汽车之家
- 爱奇异
- 同城旅游

### 游戏公司
- 途游游戏: https://www.zhipin.com/job_detail/3aa179d364ffab8d1nN739u6EFdY.html?lid=3VSJoP8D3j.search.117&securityId=Fc1F1o44tKNcn-J1I-29BpFzWhOqCNClK9-RM_g-qa2f82Hvr1XJQJm9WiOHiVU2oY2RdkgwO_KwGMkMP_Ds9zG7FYgGu4_68Al1ibHcJAOlVoOp&sessionId=
- 乐游科技: https://www.zhipin.com/job_detail/d0a714b4821a42171XF83dq-E1BT.html?lid=3VSJoP8D3j.search.171&securityId=YN-f3a5ndWKe7-Y11SZn4a-XEs6T67zWva4U7rb0fWXTBCFYTQgvN6EL-P6IucnCpxzZdqYTFqdKykmMWJApgj0acw1aiE183M-AXpb2r0M1D-69hw~~&sessionId=
- 乐城堡: https://www.zhipin.com/job_detail/584ce224107695a61XF-3tq-ElJT.html?lid=46RGh1G3vA.search.3&securityId=FOsKEPbMI48vt-w15pvM_RmhwkmGC-0Xi2a-P2e98OfnSEedhLgfofmHYxuyWC0jXd56ui4pN91cXj9h0WEwFhTGMyRcYFP_jEmVl7UzjDrGPBvB0XnuFeZkWuRuB_CDW6GnK7mX3EXcBL4S3sIttw~~&sessionId=


---

> 作者:   
> URL: https://cfanzp.com/k8s/  

