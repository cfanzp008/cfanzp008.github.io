# MySQL 与 PostgreSQL 深入对比：架构、特性与选型指南


# MySQL 与 PostgreSQL 深入对比：架构、特性与选型指南

MySQL 和 PostgreSQL 是当今最流行的两款开源关系型数据库。根据 Stack Overflow 2025 年的开发者调查，PostgreSQL 连续多年被评为"最受开发者喜爱的数据库"，而 MySQL 则是使用率常年位居前二的开源数据库。很多团队在技术选型时都会在这两者之间纠结，而网上大多数对比文章只停留在"功能列表"层面，很少讲清楚两者在设计哲学上的根本差异。

本文从架构层面切入，系统对比两者的存储引擎、并发控制、数据类型、索引、SQL 能力、复制方案与生态，最后结合 2026 年 8 月的版本现状给出选型建议。全文约 5000 字，建议收藏后按章节阅读。

<!--more-->

## 历史与定位

### MySQL 的血统

MySQL 诞生于 1995 年，由瑞典公司 MySQL AB 开发，2008 年被 Sun 收购，2010 年随 Sun 一起被 Oracle 收入囊中。它的设计目标从一开始就是"简单、快速、可靠"，优先考虑 Web 应用的读写性能和易用性，而非完整实现 SQL 标准。

MySQL 的成名之路与 LAMP（Linux + Apache + MySQL + PHP）架构深度绑定，几乎是 Web 时代的默认数据库。直到今天，WordPress 等主流 CMS 仍然默认使用 MySQL。

### PostgreSQL 的血统

PostgreSQL 的源头可以追溯到 1986 年加州大学伯克利分校的 POSTGRES 项目，1996 年更名为 PostgreSQL 并开放社区开发。它的设计目标是"最先进的开源关系型数据库"，追求 SQL 标准兼容、数据完整性、可扩展性。

PostgreSQL 由 PostgreSQL 全球开发组（PGDG）维护，不接受任何单一商业公司的主导，代码采用类似 MIT 的宽松许可证。近年来它人气飙升，从传统 Web 领域扩展到数据仓库、地理信息（PostGIS）、时序（TimescaleDB）等场景。

### 一眼看懂两者定位

| 维度 | MySQL | PostgreSQL |
|------|-------|-----------|
| 诞生时间 | 1995 年 | 1986 年（项目）/ 1996 年（更名） |
| 当前主导 | Oracle 公司 | 社区（PGDG） |
| 许可证 | GPLv2 双许可 | PostgreSQL License（兼容 MIT） |
| 设计目标 | 简单、快速、高可用 | 功能完整、符合标准、可扩展 |
| 架构风格 | 插件式存储引擎 | 单一存储引擎、内核高度集成 |

## 核心架构差异

### 进程模型

这是两者最本质的架构区别之一。

PostgreSQL 使用**多进程架构（process-per-connection）**：每个客户端连接对应一个独立的操作系统进程，另有 postmaster 主进程和若干后台进程（如 writer、checkpointer、WAL writer）。这种隔离性带来了出色的健壮性——单个客户端连接崩溃不会影响其他连接，但也意味着大量连接时内存开销和上下文切换成本较高，因此常有人说"PostgreSQL 连接很贵"。

MySQL（InnoDB）使用**多线程架构**：一个服务进程内运行多个线程，连接线程、IO 线程、purge 线程等共享进程内存。单机连接数可以开到数千甚至上万而不会像 PostgreSQL 那样吃紧，但线程间的隔离性较差，一个会话的崩溃可能影响整个服务。

> **结论**：连接密集型应用（大量短连接）天然亲近 MySQL；而 PostgreSQL 适合通过连接池（PgBouncer、pgpool）来管理连接。

### 存储引擎：插拔 vs 集成

MySQL 最核心的特色是**插件式存储引擎**。同一个 MySQL 实例里可以选择 InnoDB（事务）、MyISAM（非事务、压缩）、Memory、NDB 等不同的表存储引擎，默认使用 InnoDB，通过 `ENGINE=` 子句和系统变量 `default_storage_engine` 控制。InnoDB 承担了事务、行锁、崩溃恢复、MVCC 等核心能力，实际上可以说"MySQL 的事务能力 = InnoDB 的事务能力"，其他引擎根本不提供完整事务支持。

PostgreSQL 没有"引擎"概念，**内核本身就集成了存储、事务、并发控制、索引的全部功能**，不存在"换引擎"的说法。换来的是深度的整合优化，核心技术上（比如索引类型、多版本）都是内建基础设施，还可以通过 FDW（外部数据包装器）连接 MySQL、MongoDB 等其他数据源。

### 写前日志：WAL 与 redo/undo

两者都有"先写日志再写数据"的 WAL 机制，名称不同但原理相似：

- MySQL（InnoDB）: `redo log` 保证已提交事务的持久性；**undo log** 记录旧版本以便回滚与 MVCC；另有 `binlog`（二进制日志）用于复制、备份与恢复。事务提交时需要把 redo log 刷到磁盘（可调 `innodb_flush_log_at_trx_commit`），binlog 默认也要在提交时写入磁盘并与 redo log 一致（`sync_binlog=1`）。
- PostgreSQL：**WAL（Write-Ahead Log）** 是唯一的一致性日志，没有 binlog 与 undo 的区分。MVCC 的多版本信息直接写在数据表中（见下节），不使用 undo 表空间；复制基于 WAL 流式传输。

WAL 两种设计没有绝对优劣，但带来后续一系列连锁差异。

### 多版本并发控制（MVCC）实现

MVCC 是两者实现高并发读的关键，但实现不同。

**MySQL/InnoDB**使用**undo log + 版本链**：

- 每行数据在 InnoDB 中有隐藏列 `DB_TRX_ID`（最近修改事务）和 `DB_ROLL_PTR`（指向 undo log 中的旧版本）。
- 更新一行时，旧版本复制到 undo log，通过回滚指针形成**版本链**；查询时根据**事务快照（read view）** 顺着版本链找到当前事务可见的版本。
- 旧版本的清理由后台 purge 线程执行，删除那些不再被任何活跃事务需要的版本（不阻塞其他事务）。

**PostgreSQL**：老版本直接**留在堆页面内**。每个页面内的行都有 `xmin`（插入/更新事务）和 `xmax`（删除/失效事务）隐藏列。更新一行时不是覆盖，而是在页面内追加新版本（空间不足时迁移到新页面），旧版本标记为失效（设置 `xmax`）。

两者比较有一个知名差异：**PostgreSQL 的 HOT（Heap-Only Tuple）机制**允许同一个页面内更新时不改索引条目，从而减少索引维护的开销和 WAL 量，这是 InnoDB 版本链所没有的；但代价是 PostgreSQL 需要 **VACUUM** 回收旧版本（dead tuples）并防止事务 ID 回绕，写压力大的表如果清理不及时，表会膨胀、变慢、甚至触及事务 ID 回绕的边界。InnoDB 用 undo log + purge 线程自动完成这些工作，所以长期看 InnoDB 的"自动维护"负担略小，但 PostgreSQL 的清理调度可通过 autovacuum 自动完成，且 18 版本还进一步改进了 freeze（冻结）行为。

| MVCC 维度 | MySQL/InnoDB | PostgreSQL |
|-----------|-------------|-----------|
| 多版本存放 | undo log（版本链） | 数据页内（xmin/xmax） |
| 旧版本清理 | purge 线程自动 | VACUUM / autovacuum |
| HOT 优化 | 无（回滚指针） | 有（同页更新免索引重写） |
| 事务 ID 回绕 | 无同类问题 | 需要冻结（防止事务 ID 回绕） |

## 数据类型对比

### 数值与字符串

两者都支持整数、浮点、DECIMAL/NUMERIC，但：

- PostgreSQL 的 `varchar(n)` 是可变长度，`char(n)` 是定长空白填充，长度限定只是约束；MySQL 的 `varchar` 以字节长度计入行大小限制（InnoDB 行最大约 65535 字节），且受行大小和编码（utf8mb4 四字节）限制更严格。
- MySQL 支持 `unsigned integer`（无符号整数），PostgreSQL 不支持（要模拟需用 `BIGINT` + CHECK 约束）。
- PostgreSQL 提供 `SMALLINT`、`INTEGER`、`BIGINT` 以及 `BYTEA`（字节串）、`TEXT` 等类型，且 `text` 与 `varchar` 在存储上没有区别。

### 大小写敏感差异

非常容易踩坑：**MySQL 默认在 utf8mb4 且根据排序规则（collation），字符串比较通常不区分大小写**（`utf8_general_ci` 等 `_ci` 结尾的排序规则），`WHERE name = 'Admin'` 会把 `admin` 也匹配出来；PostgreSQL 默认是区分大小写的（text 比较逐字节），除非显式使用 `citext` 扩展或 `ILIKE`。跨数据库迁移时这个行为会造成隐蔽的 bug。

- MySQL：`SELECT 'a' = 'a'` 返回 1，`SELECT 'a' = 'A'` 在 utf8_general_ci 下也返回 1。
- PostgreSQL：`SELECT 'a' = 'A'` 返回 false，用 `ILIKE` / `LOWER()` 显式处理。

### 高级类型：PostgreSQL 的「瑞士军刀」

PostgreSQL 在类型系统上甩开 MySQL 至少两个时代：

- **数组**：`integer[]`、`text[]` 开箱即用，支持 `array_agg(k)`、`unnest`。
- **范围类型**：`tsrange`、`int4range` 等，配合 `&&`（重叠）、`@>` 等操作符做时间段重叠检查，非常方便。
- **网络类型**：`inet`、`cidr`（内含 IP 匹配逻辑），MySQL 没有对应原生。
- **UUID**：原生 `uuid` 类型 + 18 版本新增 `uuidv7()` 时序排序 UUID 函数；MySQL 只有 `UUID()` 函数，存为字符串 `char(36)`，比较低效。
- **自定义类型**：`CREATE TYPE`、`enum`、复合类型、域（domain）。

MySQL 在这些方面只能靠 `JSON`、`BLOB` 或应用层处理。

### JSON 支持

| JSON 维度 | MySQL | PostgreSQL |
| --------- | ----- | ---------- |
| 类型 | `JSON`（二进制优化） | `json`（纯文本）/ `jsonb`（二进制、按 key 排序） |
| 索引 | JSON 列不可直接建索引，需**生成列 + 普通索引**或函数索引 | jsonb 可直接建 **GIN 索引**（含表达式索引） |
| 查询 | `JSON_EXTRACT()`、`->`、`->>`、`JSON_TABLE` | `->`/`->>`/`#>`, `@>`、`?|` 各类操作符，jsonb_path_query |
| 更新 | JSON_SET / JSON_ARRAY 等函数 | `jsonb_set`、级联路径更新 |
| 性能 | 解析为文本再处理 | jsonb 为二进制（预处理），查询速度明显优势 |

MySQL 8.0 之后 JSON 功能大幅增强（`JSON_TABLE`、多值索引）但在查询能力、索引与标准性上与 jsonb 的差距仍然存在。

## SQL 能力对比

深入到 SQL 语言层面，两者的差距比功能列表看起来更大。

### SQL 标准兼容性

PostgreSQL 是最接近 SQL 标准的开源数据库，在**窗口函数、`WITH`（CTE）、`GROUPING SETS`、`ROLLUP`、`CUBE`、`MERGE`（15+）、`RETURNING`** 等标准特性上支持较完整；MySQL 8.0 之后补齐了 `CTE`、窗口函数、`MERGE`（8.0.19+）等，但某些行为仍与标准有差异（比如对 `LIMIT` 子句的宽容解析、组内排序的默认行为等）。

这里给出几个高频差异点：

**1. 多行插入的返回**

PostgreSQL:
```sql
INSERT INTO users (name) VALUES ('a'), ('b')
RETURNING id, name;
```
MySQL 要用 `LAST_INSERT_ID()` 变通，没有原生单条语句返回多行。

**2. `ON DUPLICATE KEY` vs `ON CONFLICT`**

MySQL:
```sql
INSERT INTO t (k, v) VALUES (1, 'x')
ON DUPLICATE KEY UPDATE v = VALUES(v);
```
PostgreSQL（9.5+，更规范）:
```sql
INSERT INTO t (k, v) VALUES (1, 'x')
ON CONFLICT (k) DO UPDATE SET v = EXCLUDED.v;
```
`ON CONFLICT` 可精确指定冲突的列，还可以 `DO NOTHING`，语义更清晰。

**3. 全外连接 FULL OUTER JOIN**

PostgreSQL 直接支持；MySQL **不支持** `FULL OUTER JOIN`（只能 UNION 模拟）。MySQL 8.0 的模拟写法又长又绕，做全量外连接时很别扭。

**4. 更新表结构/事务**

PostgreSQL 的 `ALTER TABLE` 可以在事务内执行并回滚：

```sql
BEGIN;
ALTER TABLE t ADD COLUMN c int;
-- 发现不对
ROLLBACK;  -- 变更被回滚
```

MySQL 的 DDL 会触发隐式提交，一旦执行无法撤销（`ALGORITHM=INSTANT` 也只解决部分变更）。这是开发环境最有感知的差异之一，也是 MySQL 的 `pt-online-schema-change`（Percona Toolkit）等工具流行的原因。

**5. `LATERAL` 子查询**

两者都支持（MySQL 8.0+ 加入），PostgreSQL 语义更规范。

### 查询优化器

PostgreSQL 的优化器是**基于代价的完备方案**（估算 CPU、I/O、连接方式），提供 `EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)` 全套观察手段，复杂 JOIN 与子查询处理更聪明。MySQL 近年优化器也在成长，但有一个长期吐槽点：子查询的处理策略不如 PostgreSQL 稳定，有时出现慢子查询需要改写（`EXISTS` vs `IN` 等）。

## 索引体系

### PostgreSQL：类型最全

PostgreSQL 原生提供多种索引类型：

- **B-Tree**：默认，最常用。
- **GiST / SP-GiST**：地理（配合 PostGIS）、范围类型。
- **GIN**：JSONB、数组、全文检索，反向索引。
- **BRIN**：块范围索引，按物理顺序记录每个数据块的值范围，适合大数据仓库场景下超大的只读表。
- **部分索引（partial index）**、**表达式索引**（`create index on t (lower(name))`）。

### MySQL：单一通用 B-Tree（InnoDB）

InnoDB 默认 B+Tree（聚簇索引），另有全文索引（FULLTEXT，InnoDB/MyISAM 均支持）、HASH 索引（仅 Memory 引擎可用）。MySQL 8.0+ 支持**函数索引**（通过生成列实现），但整体与 PostgreSQL 相比缺乏 GiST/GIN 这类专用索引，复杂 JSON 或数组查询只能走 B-Tree + 表达式索引，优化空间有限。

### 两者的经典优化点

**MySQL 的优势点**：`REPLACE INTO`、`INSERT IGNORE`、`ON DUPLICATE KEY` 这类"简单粗暴"的写法方便；`EXPLAIN EXTENDED` 输出直观；`SELECT ... LOCK IN SHARE MODE` / `FOR UPDATE` 的加锁语义简单直接。

**PostgreSQL 的优势点**：基于代价估算 + 索引类型丰富的前提下，通常只需合理建索引，极少出现"优化器乱走"的舆论级问题；`UNION ALL`、大 JOIN、复杂聚合的原生支持好。

## 事务与隔离级别

| 维度 | MySQL/InnoDB | PostgreSQL |
| ---- | ----------- | ---------- |
| 默认隔离级别 | REPEATABLE READ（可重复读） | READ COMMITTED（读已提交） |
| 实现方式 | MVCC + 快照读，配合当前读加锁 | MVCC（每个语句获取快照） |
| 幻读处理 | 快照读无幻读；当前读用 next-key lock（gap lock）避免 | READ COMMITTED 下语句级快照；SERIALIZABLE 用 SSI 防止 |
| SERIALIZABLE | 基于锁实现（间隙锁近似） | 基于 SSI（可串行化快照隔离），冲突时回退 |
| 行锁粒度 | InnoDB 行锁 + gap/next-key 锁 | 行级锁 + 谓词锁（无 gap 锁，锁粒度更精细） |
| 死锁 | 自动检测（8.0+ `innodb_deadlock_detect`） | 自动检测/唤醒超时（lock timeout） |

**重点差异解释：**

1. **默认隔离级**：MySQL 默认 RR（可重复读）且在这个级别下可以做到"select 一致读"快照，不用担心幻读（InnoDB 用 gap 锁保证）；PostgreSQL 默认 READ COMMITTED，即每条语句都重新创建快照，事务内的不同语句可能看到不同版本（不可重复读），如果应用假设事务内一致，需要显式 `BEGIN ISOLATION LEVEL REPEATABLE READ`。
2. **锁的实现**：InnoDB 的 gap/next-key 锁（MySQL `RR` 下防幻读、`SELECT ... FOR UPDATE` 区间加锁）会**相互阻塞插入**；PostgreSQL 没有 gap 锁，两个并发事务插入不相交的范围不会互相阻塞（更"乐观"），这是高并发插入场景里 PostgreSQL 写并发表现更好的原因之一。
3. **可串行化**：PostgreSQL 通过 SSI（Serializable Snapshot Isolation）实现真正的可串行化，出现冲突时回滚其中一个事务，语义上比 InnoDB 的实现更严谨。MySQL 的 SERIALIZABLE 仍基于锁型，性能影响更大。

## 性能与使用场景

"谁更快"没有绝对的结论，取决于场景：

### MySQL 更强的场景

- **读多写少**、简单 SQL 的 Web 服务。MySQL 使用代价估算优化器 + 聚簇索引读很快，配合缓存层（Redis）是常见架构。
- **海量连接**：多线程模型下默认万级连接可接受；配合代理连接权重，运维简单。
- **大量 Insert / Replace / 批插入**：原生支持 `INSERT ... VALUES(...),(...),(...)` 多行高效。
- **常见主从复制**：复制是 MySQL 的老牌能力，工具链成熟（Replication、半同步、MGR）。

### PostgreSQL 更强的场景

- **写密集型、高并发写入**：基于其 MVCC 实现与无 gap 锁的设计，PostgreSQL 在高并发写入下表现更稳。
- **JSONB 动态数据**、复杂查询、窗口函数/CTE 复杂分析。
- **空间 / 时序 / 全文检索**（依靠 PostGIS、TimescaleDB 等扩展）。
- **运维严格性**：数据完整性（外键、检查约束、非空断言）默认严格执行。

### Benchmark 参考

官方与社区多次做过基准测试（如 PostgreSQL 自带的 `pgbench`、MySQL 生态的 `sysbench`）。大致结论：

- **纯点查 / 读多写少**：MySQL 小优化胜出（`只读`场景）。
- **写多读少且并发高**：PostgreSQL 在锁与 MVCC 上更稳。
- **复杂 JOIN 与聚合**：PostgreSQL 明显占优。
- **内存规格**：两者都极度依赖 IO/内存配置，真实差距会小于配置差距。

结论是：如果不通过压测定结论，不要只听江湖传闻，用你自己的 schema + 工作负载压测（`pgbench` / `sysbench`）验证。

## 复制与高可用

### MySQL：binlog 复制

- **主从复制（binlog）**：默认异步，主库写 binlog 后即返回，从库拉取日志，延迟是常态。
- **半同步复制**：保证至少一个从库收到 binlog 才确认提交。
- **组复制 Group Replication（MGR，8.0+）**：基于 Paxos 的多主 / 单主，自动故障检测。
- 高可用生态：MHA、Orchestrator 等老牌工具。

### PostgreSQL：WAL 流复制 + 逻辑复制

- **流复制**（物理级）：从库通过 WAL 流同步，支持同步/异步级别；`primary_conninfo` 指定主库连接。
- **级联复制**：从库可再级联（如 2 级）；同步级别可选 `any`（任一从库同步即提交）。
- **逻辑复制**（10+ 官方发布-订阅）：支持跨版本、跨平台的表级复制，可做分库拆迁移。
- **pg_createsubscriber**（17+）自动创建订阅。
- 高可用工具链：`repmgr`、Patroni（自动故障切换）。

| | MySQL | PostgreSQL |
| --- | --- | --- |
| 原生复制 | binlog 逻辑复制、MGR 组复制 | 物理流复制 + 逻辑复制（发布-订阅） |
| 复制数据源 | 基于 binlog（逻辑层） | 基于 WAL（物理层，一致性更强） |
| 高可用方案 | MHA / Orchestrator / MGR | Patroni / repmgr / 内置 `pg_auto_failover` |
| 数据一致性 | 半同步 / 组复制保障 | 同步复制 / 逻辑订阅更严谨 |

## 版本现状（2026 年 8 月）

写这篇文章时（2026-08-08），两者的版本情况如下，供选型参考：

### MySQL

- 2026 年 7 月，Oracle 发布了 **MySQL 26.7.0（Innovation）**，宣布启用**日历版本号**新模型（YY.M）：今后 Innovation 版本号直接反映发布年月（如 26.7、26.10、27.1），不再是 8.x/9.x 顺序号。
- 当前的 **LTS 两条线**：**MySQL 8.4 LTS**（8.4.11）与 **MySQL 9.7 LTS**（9.7.2，2026 年）同时维护。
- Innovation 版 = 新功能首发、下个季度替换；LTS = 长期支持、稳定升级。
- 对企业用户：选择 LTS（8.4 或 9.7）；开发环境追新尝鲜可以用 Innovation。

### PostgreSQL

- 2025 年 9 月发布 **PostgreSQL 18**，当前最新稳定版（18.x）。Release 18 的核心增强：
  - 新的异步 I/O（AIO）子系统，顺序扫描、位图堆扫描、vacuum 等 I/O 路径下最多 3 倍读性能提升。
  - `uuidv7()` 时序递增 UUID 生成、虚拟生成列（计算型列，读取时计算）、B-tree skip scan。
  - 内置 OAuth 2.0 认证；`md5` 验证已弃用（后续移除；建议 SCRAM）。
  - pg_upgrade 保留优化器统计信息、合并迁移体验。
  - Wire protocol 版本升级到 3.2。
- PostgreSQL 大约每年发布一个大版本（传统上 9 月底发布）。

## 选型建议

### 什么时候选 MySQL

1. 传统 LAMP/WordPress 栈，团队已有 MySQL 运维经验。
2. **读多写少**的典型 CRUD、页面服务，配缓存即可。
3. 对**高并发短连接**有执念，不想要强约束的复杂事务级别。
4. 依赖成熟的复制、MHA、云 RDS 开箱产品。
5. 公司强制投入 Oracle 全家桶或已有数据资产。

### 什么时候选 PostgreSQL

1. 数据模型包含 **JSONB 与动态字段**、数组、网络类型。
2. 需要复杂查询（窗口函数、CTE、复杂 JOIN、聚合）。
3. 写并发高、对**可串行化**要求严格。
4. 需要**扩展开源生态**：PostGIS（地理）、TimescaleDB（时序）、pgvector（向量检索 / AI 应用）。
5. 想要尽量贴近 SQL 标准、避免方言混淆。
6. 从 MySQL 迁移数据，改造 `ON DUPLICATE KEY`、`AUTO_INCREMENT` 等 MySQL 独有语法的成本可控。

### 迁移提醒

| 迁移点 | MySQL → PostgreSQL 常见坑 |
| ----- | ------------------------- |
| 大小写比较 | `_ci` 排序规则 → 默认区分大小写，需 `citext` 或 `LOWER()` |
| 自增主键 | `AUTO_INCREMENT` → `SERIAL/BIGSERIAL` 或 `GENERATED AS IDENTITY` |
| 布尔 | 0/1 只做真值 → `BOOLEAN` 类型，注意比较写法 |
| 字符串 | `VARCHAR(n)` 细节 → 无默认长度限制 |
| DDL 行为 | 隐式提交 → 事务内 DDL 可回滚 |
| `ON DUPLICATE KEY` | → `ON CONFLICT(...) DO UPDATE` |
| `LIMIT` / 分页 | 语法兼容 |
| 存储过程 | 语法不同需改写 |

## 总结

MySQL 和 PostgreSQL 都是生产级开源数据库，没有绝对的高下，选择由你的工作负载、团队技能与生态决定。

**核心一句话**：如果你要的是"即开即用、读多写少、社区资源最足的数据库"，MySQL 从不让你失望；如果你要的是**"不仅是数据库，更是数据平台"**（扩展性强、类型丰富、查询强悍、标准严谨），PostgreSQL 是更值得长期投入的方向。而且从版本趋势看，PostgreSQL 在性能（AIO）、扩展（生态）上的追赶已经使其成为越来越多新项目（尤其 AI/JSON/时空数据）的首选。建议新项目默认选 PostgreSQL，老项目基于 MySQL 的成熟生态继续深耕，两者都有光辉的前景。

最后给一个实操：

```bash
# 用 SQL 记录两个数据库的版本号（示例）
mysql --version   # 例如 8.4.11 LTS / 9.7.x
psql --version    # 例如 18.x
```

## 参考与延伸

- PostgreSQL 18 Release Notes: https://www.postgresql.org/docs/release/18.0/
- PostgreSQL 18 Press Kit: https://www.postgresql.org/about/press/presskit18/
- MySQL 发布模型（Innovation & LTS）: https://dev.mysql.com/doc/refman/9.7/en/mysql-releases.html
- MySQL 9.7 Release Notes: https://dev.mysql.com/doc/relnotes/mysql/9.7/en/
- MySQL 官方升级指南: https://dev.mysql.com/doc/refman/9.7/en/upgrading.html

---

> 作者: [](https://cfanzp008.github.io/about/)  
> URL: https://cfanzp008.github.io/mysql-vs-postgresql/  

