# ubuntu c/c++如何获取cpu内存使用率？


<!--more-->
# ubuntu c/c++如何获取cpu使用率？
## 编写cpu使用率的函数
```c++
#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
#include <unistd.h>

double getCPUUsage() {
    std::ifstream statFile("/proc/stat");
    if (!statFile) {
        std::cerr << "Failed to open /proc/stat." << std::endl;
        return 0.0;
    }

    std::string line;
    std::getline(statFile, line); // 读取第一行，即总体 CPU 统计信息

    std::istringstream iss(line);
    std::string cpuLabel;
    unsigned long long user, nice, system, idle, iowait, irq, softirq, steal, guest, guest_nice;

    iss >> cpuLabel >> user >> nice >> system >> idle >> iowait >> irq >> softirq >> steal >> guest >> guest_nice;

    unsigned long long totalTime = user + nice + system + idle + iowait + irq + softirq + steal;
    unsigned long long totalIdle = idle + iowait;

    // 等待一段时间以获取下一个时间戳
    sleep(1); // 可根据需要调整时间间隔

    statFile.seekg(std::ios_base::beg); // 将文件指针返回开头，准备读取下一个时间戳的数据
    std::getline(statFile, line); // 再次读取第一行，即新的 CPU 统计信息

    std::istringstream iss2(line);
    std::string cpuLabel2;
    unsigned long long user2, nice2, system2, idle2, iowait2, irq2, softirq2, steal2, guest2, guest_nice2;

    iss2 >> cpuLabel2 >> user2 >> nice2 >> system2 >> idle2 >> iowait2 >> irq2 >> softirq2 >> steal2 >> guest2 >> guest_nice2;

    unsigned long long totalTime2 = user2 + nice2 + system2 + idle2 + iowait2 + irq2 + softirq2 + steal2;
    unsigned long long totalIdle2 = idle2 + iowait2;

    // 计算 CPU 使用率
    double usagePercentage = static_cast<double>(totalTime2 - totalTime) / (totalTime2 + totalIdle2 - totalTime - totalIdle) * 100.0;
    return usagePercentage;
}
```

## 包含必要的头文件
```c
#include <sys/sysinfo.h>
#include <iostream>
```

## 编写获取内存使用率的函数：
```c
double getMemoryUsage() {
    struct sysinfo memInfo;
    if (sysinfo(&memInfo) == -1) {
        std::cerr << "Failed to get memory info." << std::endl;
        return 0.0;
    }

    unsigned long totalMemory = memInfo.totalram;
    unsigned long freeMemory = memInfo.freeram;
    unsigned long usedMemory = totalMemory - freeMemory;

    double usagePercentage = (static_cast<double>(usedMemory) / static_cast<double>(totalMemory)) * 100.0;
    return usagePercentage;
}
```

## 该函数使用 sysinfo 结构和 sysinfo() 函数从系统获取内存信息，然后计算出内存使用率。

在主程序中调用该函数并打印结果：
```c
int main() {
    double memoryUsage = getMemoryUsage();
    std::cout << "Memory Usage: " << memoryUsage << "%" << std::endl;
    return 0;
}
```

## 注意
-  需要注意的是，sysinfo() 函数返回的内存值以字节为单位。如果你想要以其他单位表示，比如兆字节（MB），可以进行相应的转换。此外，这种方法获取的是整个系统的内存使用率，如果你需要获取某个特定进程的内存使用率，需要使用其他 API 或工具来实现。


---

> 作者:   
> URL: https://cfanzp.com/cpp_cpuusage/  

