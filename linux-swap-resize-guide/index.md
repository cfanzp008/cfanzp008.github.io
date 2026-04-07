# Linux Swap 分区大小修改指南


# Linux Swap 分区大小修改指南

## 什么是 Swap

Swap（交换空间）是 Linux 系统的一种虚拟内存技术。当物理内存不足时，系统会将不活跃的内存页面移动到 Swap 空间中，从而释放物理内存供活跃进程使用。

**Swap 的作用：**
- 扩展可用内存容量
- 防止内存耗尽导致系统崩溃
- 支持内存休眠（suspend to disk）
- 在内存压力时提供缓冲

## 修改 Swap 大小的三种方法

### 方法一：使用 swapfile（推荐）

这种方法最灵活，不需要重新分区。

#### 步骤 1：查看当前 Swap 状态

```bash
# 查看当前 Swap 使用情况
free -h

# 查看 Swap 文件位置
swapon --show

# 查看磁盘空间
df -h
```

#### 步骤 2：禁用现有 Swap

```bash
# 关闭 Swap
sudo swapoff -a

# 如果有多个 Swap，指定关闭特定文件
sudo swapoff /swapfile
```

**注意：** 关闭 Swap 前确保有足够的物理内存，否则可能导致程序崩溃。最好在系统负载低时操作。

#### 步骤 3：创建新的 Swap 文件

```bash
# 创建 4GB 的 Swap 文件（根据需要调整大小）
sudo fallocate -l 4G /swapfile

# 或者使用 dd 命令（更可靠）
sudo dd if=/dev/zero of=/swapfile bs=1M count=4096 status=progress

# 设置正确的权限（必须为 600）
sudo chmod 600 /swapfile

# 格式化为 Swap 空间
sudo mkswap /swapfile

# 启用 Swap
sudo swapon /swapfile
```

#### 步骤 4：设置为永久生效

```bash
# 添加到 /etc/fstab
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# 或者使用 UUID（更稳定）
sudo blkid /swapfile
sudo vim /etc/fstab
# 添加: UUID=xxx /swapfile none swap sw 0 0
```

### 方法二：调整现有 Swap 分区大小

适用于已经使用独立分区的系统。

#### 使用 gparted（图形界面）

```bash
# 安装 gparted
sudo apt install gparted

# 启动（需要图形界面）
sudo gparted
```

操作步骤：
1. 右键点击 Swap 分区 → 调整大小/移动
2. 拖动滑块调整大小
3. 点击"调整大小/移动"按钮应用

#### 使用命令行工具

```bash
# 查看分区表
sudo fdisk -l

# 使用 cfdisk 或 parted
sudo cfdisk /dev/sda
```

**警告：** 调整分区需要谨慎，确保有足够的未分配空间。

### 方法三：增加多个 Swap 文件

```bash
# 创建额外的 Swap 文件
sudo fallocate -l 2G /swapfile2
sudo chmod 600 /swapfile2
sudo mkswap /swapfile2
sudo swapon /swapfile2

# 添加到 fstab
echo '/swapfile2 none swap sw 0 0' | sudo tee -a /etc/fstab

# 查看所有 Swap
swapon --show
```

## 思维导图：Swap 修改决策流程

```
                         ┌─────────────────────────────────────────┐
                         │        Linux Swap 修改决策流程          │
                         └─────────────────────────────────────────┘
                                            │
                                            ▼
                          ┌───────────────────────────────────┐
                          │        需要修改 Swap 吗？         │
                          └───────────────────────────────────┘
                                            │
                         ┌──────────────────┴──────────────────┐
                         │                                        │
                         ▼                                        ▼
                     ┌─────────┐                            ┌─────────┐
                     │   是    │                            │   否    │
                     └─────────┘                            └─────────┘
                         │                                        │
                         ▼                                        ▼
          ┌─────────────────────────────┐         ┌─────────────────────────────┐
          │    当前是 Swap 文件还是分区？   │         │         操作完成             │
          └─────────────────────────────┘         └─────────────────────────────┘
                         │
          ┌──────────────┴──────────────┐
          │                             │
          ▼                             ▼
    ┌─────────────┐              ┌─────────────┐
    │  Swap 文件 │              │  Swap 分区  │
    └─────────────┘              └─────────────┘
          │                             │
          ▼                             ▼
    ┌──────────────────┐       ┌──────────────────────┐
    │ 方法一：重建 Swap │       │ 方法二：调整分区大小  │
    │ - swapoff         │       │ - gparted（图形）    │
    │ - 创建新文件      │       │ - fdisk/parted（命令行）│
    │ - mkswap          │       │ - 需要未分配空间      │
    │ - swapon          │       │ - 风险较高           │
    └──────────────────┘       └──────────────────────┘
          │                             │
          └─────────────┬───────────────┘
                        │
                        ▼
          ┌─────────────────────────────────────┐
          │         验证与配置                   │
          ├─────────────────────────────────────┤
          │ 1. swapon --show 验证启用           │
          │ 2. free -h 检查内存状态              │
          │ 3. /etc/fstab 配置永久生效           │
          │ 4. vm.swappiness 优化（可选）        │
          └─────────────────────────────────────┘
```

## Swap 大小建议

| 物理内存 | 推荐 Swap 大小 | 休眠需要 |
|---------|---------------|---------|
| ≤ 2GB | 2x 物理内存 | 3x 物理内存 |
| 2GB - 8GB | 等于物理内存 | 2x 物理内存 |
| 8GB - 64GB | 0.5x 物理内存 | 1.5x 物理内存 |
| > 64GB | 至少 4GB | 不建议使用休眠 |

## 注意事项

### 1. 操作前准备

- **备份重要数据**：虽然修改 Swap 不会丢失数据，但以防万一
- **确保系统稳定**：在低负载时操作
- **检查可用空间**：确保有足够未分配的磁盘空间

### 2. 操作中注意事项

```bash
# 不要在内存不足时关闭 Swap
# 关闭前检查可用内存
free -h
# 确保 Available > 当前 Swap 使用量
```

### 3. 常见风险

- **数据丢失风险**：操作分区时可能丢失数据，务必备份
- **系统不稳定**：Swap 关闭期间可能导致 OOM（内存耗尽）
- **性能影响**：过小的 Swap 会导致频繁交换，影响性能

### 4. 验证步骤

```bash
# 1. 验证 Swap 已启用
swapon --show

# 2. 检查内存状态
free -h

# 3. 测试 Swap 读写
sudo dd if=/dev/zero of=/dev/null bs=1M count=100 status=progress

# 4. 检查 fstab 配置
cat /etc/fstab | grep swap
```

## 优化 Swap 性能

### 调整 swappiness 参数

`swappiness` 值决定系统何时使用 Swap（0-100，值越高越倾向于使用 Swap）：

```bash
# 查看当前值
cat /proc/sys/vm/swappiness

# 临时修改
sudo sysctl vm.swappiness=10

# 永久修改
sudo vim /etc/sysctl.conf
# 添加: vm.swappiness=10
```

**建议值：**
- 桌面系统：60（默认值）
- 服务器：10（减少 Swap 使用，优先使用物理内存）
- 内存充足时：0（完全禁用 Swap）

### 其他优化

```bash
# 清除 Swap（将数据移回内存，需要足够物理内存）
sudo swapoff -a && sudo swapon -a

# 查看 Swap 使用情况
sudo swapon --show
top -o %MEM
```

## 常见问题

### Q: Swap 文件比 Swap 分区慢吗？

A: 现代 SSD 上，差异几乎可以忽略。但机械硬盘上，分区可能稍快。

### Q: 可以同时使用多个 Swap 文件吗？

A: 可以，但建议将最快的设备放在前面。

### Q: 如何完全禁用 Swap？

```bash
# 关闭所有 Swap
sudo swapoff -a

# 注释掉 fstab 中的 Swap 行
sudo vim /etc/fstab
# 在 /swap 行前加 # 注释
```

### Q: Swap 使用率很高正常吗？

A: 如果物理内存充足但 Swap 使用高，可能是 swappiness 值过高。如果物理内存不足，需要增加物理内存或 Swap。

## 总结

修改 Swap 大小是一个相对简单的操作，但需要谨慎：

1. **优先使用 Swap 文件方法**，风险最低
2. **操作前确保数据备份**
3. **在低负载时操作**
4. **完成后验证和配置永久生效**
5. **根据系统需求调整 swappiness**

合理配置 Swap 可以显著提升系统性能和稳定性。

## 参考命令汇总

```bash
# 查看 Swap 状态
free -h
swapon --show

# 关闭/启用 Swap
sudo swapoff -a
sudo swapon -a

# 创建 Swap 文件
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# 配置永久生效
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# 调整 swappiness
sudo sysctl vm.swappiness=10

---

> 作者: [](https://cfanzp008.github.io/about/)  
> URL: https://cfanzp008.github.io/linux-swap-resize-guide/  

