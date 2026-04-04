# iperf3 网络带宽测试工具用法及使用场景


# iperf3 网络带宽测试工具用法及使用场景

## 什么是 iperf3

iperf3 是一个用于测量网络带宽的开源工具，支持 TCP、UDP 和 SCTP 协议。它可以测试网络的最大可实现带宽、延迟抖动和数据包丢失等指标，是网络性能测试和故障诊断的常用工具。

### 主要特点

- 支持 TCP、UDP、SCTP 协议
- 可调节与时序、协议和缓冲区相关的参数
- 报告吞吐量、丢包率、延迟等指标
- 支持多线程并行测试
- 支持 IPv4 和 IPv6
- 客户端/服务器架构

## 安装 iperf3

### Ubuntu/Debian

```bash
sudo apt-get update
sudo apt-get install iperf3
```

### CentOS/RHEL

```bash
sudo yum install iperf3
```

### macOS

```bash
brew install iperf3
```

### Windows

可以从 ESnet 官网下载预编译的 Windows 版本：

```powershell
# 使用 Chocolatey
choco install iperf3
```

### Android

在 Android 设备上使用 iperf3 有两种方式：安装 APP 或通过 Termux 运行。

#### 方法一：安装 iPerf3 Speed Test App（推荐）

1. 从 Google Play 商店下载 [iPerf3 Speed Test](https://play.google.com/store/apps/details?id=com.pluscubed.iperf) 或从 [F-Droid](https://f-droid.org/packages/com.pluscubed.iperf/) 下载
2. 安装后打开应用
3. 点击右上角菜单可以选择「Use as Server」或「Use as Client」

#### 方法二：使用 Termux（命令行）

```bash
# 安装 Termux（从 F-Droid 或 Play 商店）
# 启动 Termux 后：

# 更新仓库
pkg update

# 安装 iperf3
pkg install iperf3

# 查看版本
iperf3 --version
```

##### 作为服务器运行

```bash
# 基本服务器模式
iperf3 -s

# 指定端口
iperf3 -s -p 5202

# 绑定特定 IP
iperf3 -s -B 192.168.1.100
```

##### 作为客户端运行

```bash
# 测试到服务器
iperf3 -c 192.168.1.100

# 指定端口
iperf3 -c 192.168.1.100 -p 5202

# TCP 并行测试
iperf3 -c 192.168.1.100 -P 4

# UDP 测试
iperf3 -c 192.168.1.100 -u -b 100M
```

##### 注意事项

- Android 7.0 及以上需要授予 Termux 存储权限
- 部分设备可能需要 ROOT 权限才能绑定特定端口
- 测试时建议关闭 VPN 和省电模式

### iOS

从 App Store 下载 [iPerf3 - Speed Test](https://apps.apple.com/app/iperf3-speed-test/id1460196574) 应用，使用方法与 Android 类似。

## 基本用法

iperf3 采用客户端/服务器模式工作，需要在两台机器上分别运行。

### 1. 启动服务器端

```bash
# 默认监听 5201 端口
iperf3 -s

# 指定端口
iperf3 -s -p 5202

# 后台运行
iperf3 -s -D

# 绑定特定 IP
iperf3 -s -B 192.168.1.100
```

### 2. 客户端连接测试

```bash
# 基本测试（默认 TCP）
iperf3 -c 192.168.1.100

# 指定端口
iperf3 -c 192.168.1.100 -p 5202

# 反向测试（服务器发送，客户端接收）
iperf3 -c 192.168.1.100 -R
```

## 常用参数详解

### 测试时间相关

```bash
# 测试持续时间（秒），默认 10 秒
iperf3 -c 192.168.1.100 -t 30

# 预热时间（秒）
iperf3 -c 192.168.1.100 -t 30 -w 5
```

### 并行流相关

```bash
# 并行流数量（测试网络并发能力）
iperf3 -c 192.168.1.100 -P 4

# 每个流的并行连接数
iperf3 -c 192.168.1.100 -P 4 -CC
```

### 缓冲区相关

```bash
# 缓冲区大小（字节）
iperf3 -c 192.168.1.100 -w 512k

# TCP 窗口大小
iperf3 -c 192.168.1.100 -w 1M
```

### 协议相关

```bash
# UDP 测试
iperf3 -c 192.168.1.100 -u

# UDP 带宽（默认 1 Mbps）
iperf3 -c 192.168.1.100 -u -b 100M

# SCTP 协议
iperf3 -c 192.168.1.100 -S
```

### 输出格式

```bash
# JSON 格式输出
iperf3 -c 192.168.1.100 -J

# 详细输出
iperf3 -c 192.168.1.100 -V

# 兼容模式输出
iperf3 -c 192.168.1.100 -f m
```

## 典型使用场景

### 场景一：测试局域网带宽

**服务器端：**
```bash
iperf3 -s
```

**客户端：**
```bash
# TCP 测试
iperf3 -c 192.168.1.100

# 使用 4 个并行流
iperf3 -c 192.168.1.100 -P 4

# 双向测试
iperf3 -c 192.168.1.100 -R
```

### 场景二：测试 UDP 丢包率和抖动

```bash
# UDP 测试，指定带宽
iperf3 -c 192.168.1.100 -u -b 100M -t 30
```

输出示例：

```
[ ID] Interval           Transfer     Bandwidth       Jitter    Lost/Total Datagrams
[  4]  0.0-30.0 sec   357 MBytes   100 Mbits/sec  0.001 ms  0/459203 (0%)
```

### 场景三：测试带宽上限

```bash
# 使用大窗口和并行流
iperf3 -c 192.168.1.100 -w 2M -P 8 -t 60
```

### 场景四：双向带宽测试

```bash
# 同时测试两个方向
iperf3 -c 192.168.1.100 -d
```

### 场景五：测试NAT/路由器性能

在路由器两侧分别运行服务器和客户端，测试NAT转发性能：

```bash
# 路由器内
iperf3 -s

# 路由器外
iperf3 -c 192.168.1.1
```

### 场景六：测试无线网络性能

```bash
# 较长的测试时间（无线网络不稳定）
iperf3 -c 192.168.1.100 -t 60 -P 4

# 多次测试取平均值
for i in {1..5}; do
  iperf3 -c 192.168.1.100
done
```

## 输出结果解读

```
[SUM]   0.0-10.0  sec  1.10 GBytes   943 Mbits/sec  sender
[SUM]   0.0-10.0  sec  1.10 GBytes   943 Mbits/sec  receiver
```

- **Transfer**：传输数据总量
- **Bandwidth**：传输带宽
- **Jitter**：UDP 测试时的抖动
- **Lost/Total Datagrams**：UDP 丢包率
- **sender**：发送端统计
- **receiver**：接收端统计

## 常见问题

### 1. 防火墙阻止

如果测试失败，检查防火墙：

```bash
# Ubuntu
sudo ufw allow 5201/tcp
sudo ufw allow 5201/udp

# CentOS
sudo firewall-cmd --add-port=5201/tcp
sudo firewall-cmd --add-port=5201/udp
```

### 2. 测试结果不理想

- 检查是否有其他网络流量
- 尝试增加并行流数量
- 调整 TCP 窗口大小
- 确保测试两端使用有线连接（排除 Wi-Fi 干扰）

### 3. 双向测试不对称

某些网络设备（如负载均衡器）可能导致双向带宽不同，使用 `-d` 参数分别测试。

## 高级技巧

### 1. 使用公开 iperf3 服务器

```bash
# 测试到公网服务器
iperf3 -c iperf.he.net
```

### 2. 创建测试脚本

```bash
#!/bin/bash
# bandwidth-test.sh

SERVER=$1
PORT=${2:-5201}

echo "Testing bandwidth to $SERVER:$PORT"
iperf3 -c $SERVER -p $PORT -t 30 -P 4 -f M
```

### 3. 持续监控

```bash
# 每小时测试一次
while true; do
  iperf3 -c 192.168.1.100 -t 60 -J > /var/log/iperf/$(date +%Y%m%d-%H%M%S).json
  sleep 3600
done
```

### 4. 测试 MTU 影响

```bash
# 使用不同缓冲区大小测试
for size in 64k 128k 256k 512k 1M; do
  echo "Testing with -w $size"
  iperf3 -c 192.168.1.100 -w $size
done
```

## 总结

iperf3 是网络性能测试的利器，其主要应用场景包括：

1. **网络故障诊断**：定位带宽瓶颈
2. **网络设备测试**：评估路由器、交换机性能
3. **带宽验收测试**：确认网络是否达到预期带宽
4. **长期监控**：记录网络性能变化
5. **Wi-Fi 测试**：评估无线网络稳定性

掌握 iperf3 的使用方法，能够帮助开发者和管理员更好地了解和优化网络性能。

## 参考链接

- 官方文档：https://software.es.net/iperf/
- iperf.fr：https://iperf.fr/
- Ubuntu Manpage：https://manpages.ubuntu.com/manpages/jammy/man1/iperf3.1.html


---

> 作者: [](https://cfanzp008.github.io/about/)  
> URL: https://cfanzp008.github.io/iperf3-usage-and-scenarios/  

