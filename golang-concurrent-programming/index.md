# Go语言并发编程指南


<!--more-->

# Go语言并发编程指南

Go语言以简洁高效的并发模型著称，通过Goroutine和Channel两大核心概念，让开发者能够轻松编写高并发程序。本文将深入讲解Go语言并发编程的基础知识和常用模式。

## Goroutine基础

### 什么是Goroutine

Goroutine是Go语言轻量级的并发执行单元，由Go运行时（Runtime）管理。与传统线程相比，Goroutine的创建成本极低（仅需约2KB栈空间），可以在一个进程中同时运行数百万个Goroutine。

### 创建Goroutine

使用`go`关键字即可轻松启动一个Goroutine：

```go
package main

import (
    "fmt"
    "time"
)

func say(s string) {
    for i := 0; i < 5; i++ {
        fmt.Println(s)
        time.Sleep(100 * time.Millisecond)
    }
}

func main() {
    // 普通函数调用
    go say("world")
    say("hello")
}
```

### 主Goroutine退出

需要注意的是，当主Goroutine结束时，所有子Goroutine也会随之终止：

```go
func main() {
    go func() {
        fmt.Println("这个可能不会输出")
    }()
    // 由于没有等待，上面的Goroutine可能来不及执行
}
```

## Channel基础

### 什么是Channel

Channel是Goroutine之间通信的管道，用于在Goroutine之间传递数据。Channel提供了一种安全的方式来实现并发实体之间的数据交换。

### 创建Channel

```go
// 创建无缓冲Channel
ch := make(chan int)

// 创建带缓冲的Channel
ch := make(chan int, 10)
```

### 发送和接收数据

```go
// 发送数据
ch <- value

// 接收数据
value := <-ch
```

### Channel基本示例

```go
func main() {
    ch := make(chan string)

    go func() {
        message := "Hello from goroutine"
        ch <- message  // 发送数据
    }()

    received := <-ch  // 接收数据
    fmt.Println(received)
}
```

### 关闭Channel

```go
close(ch)
```

关闭后的Channel：
- 不能再发送数据
- 可以继续接收数据，直到缓冲区为空
- 接收操作会返回零值

### Channel类型

| 类型 | 说明 |
|------|------|
| `chan T` | 无缓冲Channel，双向通信 |
| `chan<- T` | 只发送Channel |
| `<-chan T` | 只接收Channel |

```go
// 只发送Channel作为函数参数
func send(ch chan<- int) {
    ch <- 42
}

// 只接收Channel作为函数参数
func receive(ch <-chan int) {
    val := <-ch
    fmt.Println(val)
}
```

## Select语句

`select`语句类似于switch，但用于处理多个Channel的操作：

```go
select {
case msg1 := <-ch1:
    fmt.Println("Received from ch1:", msg1)
case msg2 := <-ch2:
    fmt.Println("Received from ch2:", msg2)
case <-time.After(time.Second):
    fmt.Println("Timeout")
default:
    fmt.Println("No message available")
}
```

`select`会阻塞直到某个case准备就绪，如果有多个case同时就绪，会随机选择。

## 常见并发模式

### 1. WaitGroup模式

使用`sync.WaitGroup`等待一组Goroutine完成：

```go
func main() {
    var wg sync.WaitGroup

    for i := 0; i < 5; i++ {
        wg.Add(1)  // 计数器加1
        go func(id int) {
            defer wg.Done()  // 完成后计数器减1
            fmt.Printf("Goroutine %d completed\n", id)
        }(i)
    }

    wg.Wait()  // 等待所有Goroutine完成
    fmt.Println("All goroutines completed")
}
```

### 2. 管道模式（Pipeline）

将多个处理阶段连接起来，数据像水流一样流经各阶段：

```go
func main() {
    // 生成数字
    generator := func(done <-chan struct{}) <-chan int {
        ch := make(chan int)
        go func() {
            defer close(ch)
            for i := 1; i <= 5; i++ {
                select {
                case ch <- i:
                case <-done:
                    return
                }
            }
        }()
        return ch
    }

    // 平方计算
    square := func(done <-chan struct{}, in <-chan int) <-chan int {
        ch := make(chan int)
        go func() {
            defer close(ch)
            for v := range in {
                select {
                case ch <- v * v:
                case <-done:
                    return
                }
            }
        }()
        return ch
    }

    done := make(chan struct{})
    defer close(done)

    // 组合管道
    ch := generator(done)
    out := square(done, ch)

    for v := range out {
        fmt.Println(v)
    }
}
```

### 3. 扇出扇入模式

多个Goroutine处理同一个Channel的数据（扇出），或多个Goroutine向同一个Channel发送数据（扇入）：

```go
func fanOut() {
    jobs := make(chan int, 100)
    results := make(chan int, 100)

    // 启动3个Worker（扇出）
    for w := 1; w <= 3; w++ {
        go worker(w, jobs, results)
    }

    // 发送任务
    go func() {
        for j := 1; j <= 10; j++ {
            jobs <- j
        }
        close(jobs)
    }()

    // 收集结果（扇入）
    for a := 1; a <= 10; a++ {
        <-results
    }
}

func worker(id int, jobs <-chan int, results chan<- int) {
    for j := range jobs {
        fmt.Printf("Worker %d processing job %d\n", id, j)
        results <- j * 2
    }
}
```

### 4. 互斥锁模式

保护共享资源的并发访问：

```go
type Counter struct {
    mu sync.Mutex
    count int
}

func (c *Counter) Inc() {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.count++
}

func (c *Counter) Value() int {
    c.mu.Lock()
    defer c.mu.Unlock()
    return c.count
}
```

### 5. 读写锁模式

对于读多写少的场景，使用`sync.RWMutex`提高性能：

```go
type SafeCounter struct {
    mu sync.RWMutex
    m  map[string]int
}

func (c *SafeCounter) Get(key string) int {
    c.mu.RLock()
    defer c.mu.RUnlock()
    return c.m[key]
}

func (c *SafeCounter) Set(key string, value int) {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.m[key] = value
}
```

### 6. 上下文模式（Context）

使用`context.Context`管理Goroutine的生命周期：

```go
func main() {
    ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
    defer cancel()

    done := make(chan string)

    go func() {
        // 模拟长时间运行的任务
        time.Sleep(2 * time.Second)
        done <- "Task completed"
    }()

    select {
    case result := <-done:
        fmt.Println(result)
    case <-ctx.Done():
        fmt.Println("Context timeout:", ctx.Err())
    }
}
```

### 7. 错误传播模式

在Pipeline中正确传播错误：

```go
func pipeline() (<-chan int, <-chan error) {
    out := make(chan int)
    errc := make(chan error, 1)

    go func() {
        defer close(out)
        defer close(errc)
        // 处理逻辑
        for i := 0; i < 5; i++ {
            if i == 3 {
                errc <- fmt.Errorf("error at %d", i)
                return
            }
            out <- i
        }
    }()

    return out, errc
}
```

## 并发安全

### 竞态条件

当多个Goroutine并发访问共享资源时，可能出现竞态条件：

```go
// 不安全的代码
var counter int

func increment() {
    counter++  // 非原子操作
}
```

### 检测竞态

使用`-race`标志运行程序：

```bash
go run -race main.go
go test -race ./...
```

### 使用Mutex保护共享资源

```go
var (
    mu sync.Mutex
    counter int
)

func increment() {
    mu.Lock()
    defer mu.Unlock()
    counter++
}
```

### 使用Atomic操作

对于简单的计数器，可以使用`sync/atomic`包：

```go
var counter atomic.Int64

func increment() {
    counter.Add(1)
}

func getCounter() int64 {
    return counter.Load()
}
```

## 最佳实践

### 1. 始终为Channel提供释放机制

```go
// 使用context控制生命周期
func worker(ctx context.Context, jobs <-chan int) {
    for {
        select {
        case <-ctx.Done():
            return
        case job := <-jobs:
            // 处理任务
        }
    }
}
```

### 2. 防止Goroutine泄漏

确保Goroutine有退出路径：

```go
func producer(ch chan<- int) {
    for i := 0; i < 10; i++ {
        ch <- i
    }
    close(ch)  // 记得关闭Channel
}

func consumer(ch <-chan int) {
    for v := range ch {
        fmt.Println(v)
    }
}
```

### 3. 合理设置Buffer大小

根据实际场景选择合适的缓冲大小：

```go
// 小缓冲：控制并发数量
ch := make(chan Task, runtime.NumCPU())

// 大缓冲：批量处理
ch := make(chan Result, 1000)
```

### 4. 避免嵌套select

嵌套的select难以理解和维护，考虑重构。

### 5. 使用结构化并发

```go
func main() {
    ctx, cancel := context.WithCancel(context.Background())
    defer cancel()

    results := make(chan int)

    // 启动多个worker
    for i := 0; i < 3; i++ {
        go worker(ctx, i, results)
    }

    // 收集结果
    for r := range collect(ctx, results, 10) {
        fmt.Println(r)
    }
}
```

## 总结

Go语言的并发模型以简洁著称，通过Goroutine和Channel，开发者可以用直观的方式编写高性能并发程序。掌握这些基础概念和常用模式，能够帮助我们更好地利用Go语言的并发能力，构建高效、可靠的系统。

在实际开发中，需要注意：
- 使用`context`管理Goroutine生命周期
- 避免竞态条件，使用Mutex或Atomic
- 使用`-race`参数检测并发问题
- Channel应该由发送方关闭
- 合理使用WaitGroup、Channel等同步机制

希望本文能帮助你更好地理解和应用Go语言的并发编程！


---

> 作者:   
> URL: https://cfanzp008.github.io/golang-concurrent-programming/  

