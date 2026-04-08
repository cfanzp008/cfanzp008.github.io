# Linux dd 命令详解：用法与使用场景


# Linux dd 命令详解：用法与使用场景

## 什么是 dd 命令

`dd`（disk dump / data definition）是 Linux 系统中一个强大的底层数据复制工具。它的名称常被戏称为"disk destroyer"（磁盘毁灭者），因为它可以直接操作原始设备，处理不当可能导致数据丢失。

与 `cp` 命令不同，`dd` 可以：
- 复制原始设备（raw device）
- 跳过文件系统直接读写数据
- 灵活控制数据块大小和转换方式
- 创建指定大小的文件

## 基本语法

```bash
dd if=<来源> of=<目标> bs=<块大小> count=<块数量> [选项]
```

| 参数 | 说明 |
|------|------|
| `if` | 输入文件（input file），如 `/dev/zero`、`/dev/sda` |
| `of` | 输出文件（output file），如 `output.txt`、`/dev/sdb` |
| `bs` | 块大小（block size），如 `1M`、`2G` |
| `count` | 复制的块数量 |
| `skip` | 跳过输入文件开头的块数 |
| `seek` | 跳过输出文件开头的块数 |
| `status` | 显示进度信息（`progress`） |

## 思维导图：dd 命令使用场景

```
                         ┌─────────────────────────────────────────┐
                         │          dd 命令使用场景                │
                         └─────────────────────────────────────────┘
                                            │
          ┌─────────────────────────────────┼─────────────────────────────────┐
          │                                 │                                 │
          ▼                                 ▼                                 ▼
┌─────────────────────┐        ┌─────────────────────┐        ┌─────────────────────┐
│    文件操作         │        │    磁盘操作         │        │    系统操作         │
│                     │        │                     │        │                     │
└─────────────────────┘        └─────────────────────┘        └─────────────────────┘
          │                                 │                                 │
          ├─生成测试文件                     ├─磁盘全量备份                   ├─制作启动盘
          ├─创建空文件                       ├─磁盘克隆                       ├─系统镜像
          ├─生成随机文件                     ├─分区复制                       └─文件系统修复
          └─文件截断                        └─清除磁盘数据
                                           └─磁盘速度测试
                                           
                                           ▼
                              ┌─────────────────────────────────┐
                              │        常用块大小单位           │
                              ├─────────────────────────────────┤
                              │ • 1K = 1024 字节                │
                              │ • 1M = 1024 * 1024             │
                              │ • 1G = 1024 * 1024 * 1024       │
                              │ • 2G = 2 * 1024 * 1024 * 1024   │
                              └─────────────────────────────────┘
```

## 常用场景示例

### 1. 生成指定大小的测试文件

```bash
# 生成 1 个 2GB 的文件（用 /dev/zero 填充）
dd if=/dev/zero of=output.txt bs=2G count=1

# 生成 100MB 的测试文件
dd if=/dev/zero of=test_100MB.img bs=1M count=100

# 生成 1GB 的文件
dd if=/dev/zero of=1GB_file.img bs=1G count=1
```

**简化写法：**
```bash
# 使用简化语法
dd if=/dev/zero of=output.txt bs=2G count=1

# 等价于
dd if=/dev/zero of=output.txt bs=1G count=2
```

### 2. 创建空文件或截断文件

```bash
# 创建一个 1MB 的空文件
dd if=/dev/zero of=empty_file.img bs=1M count=1

# 将文件截断为 0 字节（清空文件内容但保留文件）
dd if=/dev/null of=existing_file.img bs=0 count=0

# 将文件截断为指定大小
dd if=/dev/zero of=file.img bs=1M count=10 seek=5 conv=notrunc
```

### 3. 生成随机数据文件

```bash
# 使用 /dev/urandom 生成随机数据（较慢但更安全）
dd if=/dev/urandom of=random_file.img bs=1M count=100

# 生成随机字节用于加密测试
dd if=/dev/urandom of=random.bin bs=64 count=1
```

**注意：** `/dev/urandom` 比较慢，生产大文件可能需要很长时间。

### 4. 磁盘/分区备份与恢复

```bash
# 备份整个磁盘到镜像文件
dd if=/dev/sda of=/backup/sda_image.img bs=4M status=progress

# 备份单个分区
dd if=/dev/sda1 of=/backup/partition_backup.img bs=4M

# 从镜像恢复磁盘
dd if=/backup/sda_image.img of=/dev/sda bs=4M status=progress

# 使用 gzip 压缩备份（节省空间）
dd if=/dev/sda | gzip > /backup/sda_image.img.gz

# 解压恢复
gzip -dc /backup/sda_image.img.gz | dd of=/dev/sda bs=4M
```

### 5. 制作启动 U 盘

```bash
# 将 ISO 镜像写入 U 盘（注意：/dev/sdb 是 U 盘设备）
dd if=ubuntu.iso of=/dev/sdb bs=4M status=progress

# 写入后同步
sync
```

**警告：** 目标设备必须是 U 盘本身（如 `/dev/sdb`），而不是分区（如 `/dev/sdb1`）。

### 6. 磁盘速度测试

```bash
# 测试写入速度（写入 1GB 数据）
dd if=/dev/zero of=/tmp/test bs=1M count=1024 oflag=direct

# 测试读取速度
dd if=/tmp/test of=/dev/null bs=1M count=1024 iflag=direct

# 完整测试（同时测试读写）
dd if=/dev/zero of=/tmp/test bs=1M count=1024 conv=fdatasync
dd if=/tmp/test of=/dev/null bs=1M count=1024
```

### 7. 清除磁盘数据（安全擦除）

```bash
# 用零填充整个磁盘（简单擦除）
dd if=/dev/zero of=/dev/sdb bs=4M status=progress

# 用随机数据覆盖（更安全，但耗时）
dd if=/dev/urandom of=/dev/sdb bs=4M status=progress
```

**注意：** 这会永久删除磁盘上的所有数据，请谨慎使用！

### 8. 文件转换操作

```bash
# 转换大写为小写
dd if=input.txt of=output.txt conv=lcase

# 转换小写为大写
dd if=input.txt of=output.txt conv=ucase

# 追加数据（不覆盖）
dd if=new_data.txt of=existing_file.txt conv=notrunc

# 跳过前 100 块
dd if=input.img of=output.img bs=512 skip=100

# 从第 100 块开始写入
dd if=input.img of=output.img bs=512 seek=100

# 截断输出文件
dd if=input.img of=output.img bs=1M count=10 conv=trunc
```

### 9. 制作交换文件

```bash
# 创建一个 2GB 的交换文件
dd if=/dev/zero of=/swapfile bs=1M count=2048

# 设置权限
chmod 600 /swapfile

# 格式化为交换空间
mkswap /swapfile

# 启用交换文件
swapon /swapfile

# 添加到 /etc/fstab 永久生效
echo '/swapfile none swap sw 0 0' >> /etc/fstab
```

### 10. 备份 MBR

```bash
# 备份 MBR（包含分区表）
dd if=/dev/sda of=mbr_backup.bin bs=512 count=1

# 恢复 MBR
dd if=mbr_backup.bin of=/dev/sda bs=512 count=1

# 只恢复 MBR 代码（不包括分区表）
dd if=mbr_backup.bin of=/dev/sda bs=446 count=1
```

## 常用参数详解

### 块大小（bs）常用单位

| 单位 | 含义 | 字节数 |
|------|------|--------|
| `B` | 字节 | 1 |
| `K` | 千字节 | 1024 |
| `M` | 兆字节 | 1048576 |
| `G` | 吉字节 | 1073741824 |
| `T` | 太字节 | 1099511627776 |

### 常用转换选项（conv）

| 选项 | 说明 |
|------|------|
| `lcase` | 转换为小写 |
| `ucase` | 转换为大写 |
| `notrunc` | 不截断输出文件 |
| `noerror` | 遇到错误继续执行 |
| `sync` | 用零填充错误块 |
| `trunc` | 截断输出文件 |

### 进度显示

```bash
# 显示详细进度
dd if=/dev/zero of=test.img bs=1G count=1 status=progress
```

输出示例：
```
记录了1073741824字节（1.0 GB，954 MB），用时 3 秒，306 MB/秒
```

## 实际应用案例

### 案例 1：快速生成测试文件

```bash
# 生成 2GB 测试文件用于磁盘IO测试
dd if=/dev/zero of=2GB_test.img bs=2G count=1

# 查看生成的文件大小
ls -lh 2GB_test.img
```

### 案例 2：备份并压缩整个系统

```bash
# 备份整个磁盘并压缩
dd if=/dev/sda bs=4M | gzip -c > /backup/system_backup.img.gz

# 恢复到新磁盘
gzip -dc /backup/system_backup.img.gz | dd of=/dev/sdb bs=4M status=progress
```

### 案例 3：安全擦除旧硬盘

```bash
# 用随机数据覆盖 3 次（符合 DoD 标准）
dd if=/dev/urandom of=/dev/sdc bs=4M
dd if=/dev/urandom of=/dev/sdc bs=4M
dd if=/dev/zero of=/dev/sdc bs=4M
```

## 注意事项

1. **数据安全**：`dd` 操作是直接读写原始设备，一旦执行就无法撤销。请务必确认目标设备！
2. **设备路径**：在 Linux 中，磁盘设备通常是 `/dev/sda`、`/dev/nvme0n1` 等
3. **权限问题**：操作磁盘设备需要 root 权限（使用 `sudo`）
4. **进度监控**：大文件操作时使用 `status=progress` 查看进度
5. **同步数据**：操作完成后使用 `sync` 确保数据写入磁盘

## 常见问题

### Q: 为什么 dd 比 cp 慢？

A: `dd` 默认块大小较小，可以增大 `bs` 值提高速度，如 `bs=4M`。

### Q: 如何判断 dd 是否完成？

A: 使用 `status=progress` 参数查看进度，或使用 `ps aux | grep dd` 检查进程。

### Q: dd 可以通过网络传输吗？

A: 可以，结合 SSH 实现远程备份：
```bash
dd if=/dev/sda | ssh user@remote "dd of=/backup.img"
```

### Q: 如何终止正在运行的 dd？

A: 使用 `Ctrl + C` 或 `kill -15 <PID>`，然后检查数据完整性。

## 总结

`dd` 是 Linux 系统中最强大但也最危险的工具之一。掌握其用法可以完成：

- 生成指定大小的测试文件
- 磁盘全量备份与恢复
- 制作启动 U 盘
- 安全擦除磁盘数据
- 性能测试

**核心命令模板：**
```bash
dd if=<输入> of=<输出> bs=<块大小> count=<数量> status=progress
```

## 参考命令汇总

```bash
# 生成 2GB 测试文件
dd if=/dev/zero of=output.txt bs=2G count=1

# 磁盘备份
dd if=/dev/sda of=/backup.img bs=4M status=progress

# 制作启动盘
dd if=ubuntu.iso of=/dev/sdb bs=4M status=progress

# 性能测试
dd if=/dev/zero of=/tmp/test bs=1M count=1024 oflag=direct

# 备份 MBR
dd if=/dev/sda of=mbr.bin bs=512 count=1
```

---

> 作者: [](https://cfanzp008.github.io/about/)  
> URL: https://cfanzp008.github.io/linux-dd-command-usage/  

