# golang mutex用法


<!--more-->
# golang mutex用法
```golang
package main

import (
	"fmt"
	"sync"
)

var (
	counter int
	mutex   sync.Mutex
)

func incrementCounter() {
	mutex.Lock()         // 获取互斥锁
	defer mutex.Unlock() // 在函数返回时释放互斥锁
	counter++            // 访问共享资源
}

func main() {
	wg := sync.WaitGroup{}
	for i := 0; i < 1000; i++ {
		wg.Add(1)
		go func() {
			incrementCounter()
			wg.Done()
		}()
	}
	wg.Wait()

	fmt.Println("Counter:", counter)
}
```
在上面的示例中，
- 首先定义了一个全局变量counter和一个互斥锁mutex。
- 然后编写了一个incrementCounter函数，该函数对counter进行递增操作。
- 在主函数main中，启动了1000个goroutine并发地调用incrementCounter函数来增加counter的值。
- 通过使用互斥锁，确保了对counter的安全访问，避免了竞争条件的发生。

- 需要注意的是，在使用互斥锁时，需要在临界区的开始处调用Lock方法获取锁，并在临界区结束时调用Unlock方法释放锁。
- 为了确保锁一定会被释放，可以使用defer语句来延迟执行Unlock方法。


---

> 作者:   
> URL: http://111.230.8.71:8889/golang-mutex/  

