# InfluxDB CLI 使用笔记


# InfluxDB CLI 使用笔记

## 什么是 InfluxDB CLI

InfluxDB CLI 是 InfluxData 官方提供的命令行客户端工具，用于与 InfluxDB 服务器进行交互。通过 CLI，用户可以执行数据查询、写入、管理配置等操作，无需使用 Web 界面或 API。

CLI 工具支持 InfluxDB 1.x 和 2.x 版本，是运维人员和开发者的必备工具。

## 主要功能

### 1. 数据操作

- 写入数据（行协议）
- 查询数据（InfluxQL/Flux）
- 删除数据
- 导入/导出数据

### 2. 资源管理

- 数据库管理
- 用户和权限管理
- 保留策略管理
- 连续查询管理

### 3. 配置管理

- 配置连接参数
- 设置默认组织
- 管理 API Token

### 4. 交互模式

- 交互式 shell
- 非交互式批量执行
- 支持管道输入

## 下载安装

### Windows（x64）

从官方下载 InfluxDB CLI：

- **官方文档**：https://docs.influxdata.com/influxdb/v2/tools/influx-cli/

```bash
# Windows (PowerShell)
# 下载最新版本
Invoke-WebRequest -Uri https://influxdb.com/downloads/influxdb2-client-2.7.5-windows-amd64.zip -OutFile influxdb2-client.zip

# 解压
Expand-Archive -Path influxdb2-client.zip -DestinationPath C:\InfluxCLI

# 添加到 PATH（可选）
$env:PATH += ";C:\InfluxCLI"
```

### macOS

```bash
# 使用 Homebrew
brew install influxdb-client

# 或手动下载
curl -sL https://influxdb.com/downloads/influxdb2-client-stable.tar.gz | tar xzf -
```

### Linux

```bash
# Ubuntu/Debian
sudo apt-get install influxdb-client

# 或下载二进制
curl -sL https://influxdb.com/downloads/influxdb2-client-stable.tar.gz | tar xzf -
sudo cp influxx /usr/local/bin/
```

## 配置连接

### 初始化配置

```bash
# 配置 InfluxDB 2.x
influx config create -n local \
  -u http://localhost:8086 \
  -o my-org \
  -t my-token
```

### 常用配置命令

```bash
# 列出所有配置
influx config list

# 切换配置
influx config set local

# 查看当前配置
influx config
```

## 常用命令

### 数据写入

```bash
# 写入单行数据
influx write -b my-bucket -o my-org "cpu,host=server01 value=50"

# 从文件写入
influx write -b my-bucket -o my-org -f data.txt

# 批量写入
influx write -b my-bucket -o my-org <<EOF
cpu,host=server01 value=50 1640000000000000000
cpu,host=server02 value=30 1640000001000000000
EOF
```

### 数据查询

```bash
# 使用 InfluxQL 查询 (1.x)
influx -database mydb -execute "SELECT * FROM cpu LIMIT 10"

# 使用 Flux 查询 (2.x)
influx query 'from(bucket:"my-bucket") |> range(start: -1h)'

# 执行文件中的查询
influx query -f query.flux
```

### 数据库操作

```bash
# 创建数据库 (1.x)
influx -execute "CREATE DATABASE mydb"

# 查看数据库
influx -execute "SHOW DATABASES"

# 创建 Bucket (2.x)
influx bucket create -n my-bucket -o my-org --retention 30d
```

### 用户管理

```bash
# 创建用户 (1.x)
influx -execute "CREATE USER admin WITH PASSWORD 'password' WITH ALL PRIVILEGES"

# 查看用户
influx -execute "SHOW USERS"
```

## 使用技巧

### 1. 行协议格式

InfluxDB 使用行协议写入数据，格式如下：

```
measurement,tag_key=tag_value field_key=field_value timestamp
```

示例：
```
cpu,host=server01,region=us-west usage=75.5 1640000000000000000
```

### 2. 批量写入性能

- 使用缓冲区批量写入
- 避免频繁 small writes
- 考虑使用 gzip 压缩

### 3. 查询优化

- 使用时间范围限制
- 适当使用 LIMIT
- 利用 GROUP BY 聚合

### 4. 脚本集成

```bash
#!/bin/bash
# 定时写入脚本
HOST="server01"
VALUE=$(curl -s http://localhost:9090/metrics | grep cpu_usage | awk '{print $2}')

influx write -b my-bucket -o my-org "monitor,host=$HOST value=$VALUE"
```

## 常见问题

### 1. 认证失败

确保 Token 正确且有足够权限：

```bash
influx auth create \
  --org my-org \
  --description "CLI Token" \
  --read-buckets \
  --write-buckets \
  --read-dashboards \
  --write-dashboards
```

### 2. 连接超时

检查服务器地址和端口：

```bash
influx ping
influx health
```

### 3. 时区问题

InfluxDB 默认使用 UTC，查询时注意时区转换：

```flux
from(bucket: "my-bucket")
  |> range(start: 2024-01-01T00:00:00Z, stop: 2024-01-02T00:00:00Z)
```

## 与其他工具对比

| 特性 | InfluxDB CLI | InfluxDBStudio | API |
|-----|--------------|----------------|-----|
| 平台 | 跨平台 | Windows | 跨平台 |
| 自动化 | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ |
| 交互体验 | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |
| 功能完整 | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |

## 适用场景

1. **自动化运维**：脚本化数据写入和查询
2. **数据导入**：批量导入历史数据
3. **监控集成**：集成到监控告警系统
4. **快速调试**：快速验证数据写入和查询

## 总结

InfluxDB CLI 是管理 InfluxDB 的强大工具，特别适合需要自动化操作的场景。虽然图形界面更直观，但 CLI 在批量处理、脚本集成方面具有不可替代的优势。

掌握 InfluxDB CLI 可以大大提高工作效率，建议在日常工作中多加练习。

## 参考链接

- 官方文档：https://docs.influxdata.com/influxdb/v2/tools/influx-cli/
- 行协议文档：https://docs.influxdata.com/influxdb/v2/reference/syntax/line-protocol/

---

> 作者: [](https://cfanzp008.github.io/about/)  
> URL: https://cfanzp008.github.io/influxdb2-cli-usage/  

