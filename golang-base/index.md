# Golang基础


<!--more-->
# Golang基础
## 安装最新版本的golang
```
wget https://go.dev/dl/go1.21.4.linux-amd64.tar.gz
tar -C /usr/local -xzf go1.21.4.linux-amd64.tar.gz
vim ~/.bashrc
export PATH=$PATH:/usr/local/go/bin
export GOPROXY=https://goproxy.cn
source ~/.bashrc
go version
```

## 基础语法
### 字符串
```golang
package main

import "fmt"

func main() {
	// 定义字符串变量
	str1 := "Hello, World!"
	fmt.Println("str1:", str1)

	// 字符串拼接
	str2 := "Hello, " + "Golang!"
	fmt.Println("str2:", str2)

	// 获取字符串长度
	length := len(str1)
	fmt.Println("Length of str1:", length)

	// 字符串索引访问
	char := str1[0]
	fmt.Println("First character of str1:", char)

	// 遍历字符串
	for i := 0; i < len(str1); i++ {
		fmt.Println("Character at index", i, ":", str1[i])
	}

	// 使用反引号创建原始字符串
	str3 := `This is a raw string \n`
	fmt.Println("str3:", str3)

	// 字符串切片
	slice := str1[7:12]
	fmt.Println("Slice of str1:", slice)

	// 字符串替换
	str4 := "Hello, Golang!"
	newStr := replaceString(str4, "Golang", "World")
	fmt.Println("New string:", newStr)
}

func replaceString(s, old, new string) string {
	return s[:5] + new + s[12:]
}

```

### 切片
```golang
package main

import "fmt"

func main() {
	// 创建一个切片
	var slice1 []int
	fmt.Println("slice1:", slice1)

	// 使用make函数创建切片
	slice2 := make([]int, 3)
	fmt.Println("slice2:", slice2)

	// 通过切片字面量创建切片
	slice3 := []int{1, 2, 3, 4, 5}
	fmt.Println("slice3:", slice3)

	// 对切片进行切割
	slice4 := slice3[1:3]
	fmt.Println("slice4:", slice4)

	// 修改切片中的元素
	slice4[0] = 9
	fmt.Println("slice3:", slice3) // 原始切片的对应位置也被修改了

	// 向切片追加元素
	slice3 = append(slice3, 6)
	fmt.Println("slice3:", slice3)

	// 复制切片
	slice5 := make([]int, 3)
	copy(slice5, slice3)
	fmt.Println("slice5:", slice5)
}
```

### map
```golang
package main

import "fmt"

func main() {
	// 创建一个空的map
	var m1 map[string]int
	fmt.Println("m1:", m1)

	// 使用make函数创建一个map
	m2 := make(map[string]int)
	fmt.Println("m2:", m2)

	// 添加键值对到map中
	m2["apple"] = 3
	m2["banana"] = 5
	fmt.Println("m2:", m2)

	// 使用字面量创建map
	m3 := map[string]int{"apple": 3, "banana": 5}
	fmt.Println("m3:", m3)

	// 获取map中的值
	quantity := m3["apple"]
	fmt.Println("Quantity of apple:", quantity)

	// 修改map中的值
	m3["apple"] = 10
	fmt.Println("Updated m3:", m3)

	// 删除map中的键值对
	delete(m3, "banana")
	fmt.Println("After deletion:", m3)

	// 遍历map
	for key, value := range m3 {
		fmt.Println(key, ":", value)
	}

	// 检查map中是否存在某个键
	_, exists := m3["apple"]
	fmt.Println("Exists:", exists)
}
```

### chan
```golang
package main

import "fmt"

func square(numbers []int, c chan int) {
	for _, num := range numbers {
		c <- num * num // 将计算结果发送到通道
	}
	close(c) // 关闭通道，表示没有更多的值会被发送
}

func main() {
	numbers := []int{1, 2, 3, 4, 5}

	c := make(chan int) // 创建一个整数类型的通道

	go square(numbers, c) // 启动一个goroutine来执行square函数

	// 从通道接收数据，直到通道关闭
	for result := range c {
		fmt.Println(result)
	}
}
```

### goroutine
```golang
package main

import (
	"fmt"
	"time"
)

func sayHello() {
	for i := 0; i < 5; i++ {
		fmt.Println("Hello, 世界")
		time.Sleep(100 * time.Millisecond)
	}
}

func main() {
	// 启动一个新的 goroutine 执行 sayHello 函数
	go sayHello()

	// main 函数继续执行自己的逻辑
	for i := 0; i < 3; i++ {
		fmt.Println("Main 函数")
		time.Sleep(200 * time.Millisecond)
	}
}
```

## go package
- context
- bytes
- net/http
- net/http/pprof
- logrus
- bolt
- flag
- os/signal
- sync
- go-redis


---

> 作者:   
> URL: https://cfanzp.com/golang-base/  

