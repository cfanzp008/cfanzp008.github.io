# linux消息队列的使用


<!--more-->
# linux 消息队列
## 发送端
```c
//q3.c
#include <pthread.h>
#include <mqueue.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <fcntl.h>           /* For O_* constants */
#include <sys/stat.h>        /* For mode constants */
#include <string.h>

int main(int argc, char *argv[]) {
    mqd_t mq_cmd;
    struct mq_attr attr;
    char msgbuffer[1000] = {0};
    memcpy(msgbuffer,"boots",5);

    /* Open the message queue for reading */
    attr.mq_flags = 0;
    attr.mq_maxmsg = 10;
    attr.mq_msgsize = 1000;
    attr.mq_curmsgs = 0;

    mq_cmd = mq_open("/mq_test", O_WRONLY|O_CREAT, 0666, &attr); //为什么要加 / ，否则打开失败
    if (mq_cmd < 0){
        printf("mq_open error: %d \n",mq_cmd);
    }else{
        printf("mq_open success: %d \n",mq_cmd);
    }

    int nbytes = mq_send(mq_cmd, (char *)msgbuffer, sizeof(msgbuffer), 0);
    if (nbytes < 0){
        printf("mq_send error: %d \n",nbytes);
    }else{
        printf("mq_send success: %d \n",nbytes);
    }

    if (mq_close(mq_cmd) < 0){
        printf("mq_close error! \n");
    }else{
        printf("mq_close success! \n");
    }

    //mq_unlink("/mq_test");
}
```
- make
```bash
gcc q3.c -o q3 -lrt
```

## 接收端
```c
//q4.c
#include <pthread.h>
#include <mqueue.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <fcntl.h>           /* For O_* constants */
#include <sys/stat.h>        /* For mode constants */

int main(int argc, char *argv[]) {
    mqd_t mq_cmd;
    struct mq_attr attr;
    char msgbuffer[1000] = {0};

    /* Open the message queue for reading */
    attr.mq_flags = 0;
    attr.mq_maxmsg = 10;
    attr.mq_msgsize = 1000;
    attr.mq_curmsgs = 0;

    mq_cmd = mq_open("/mq_test", O_RDONLY|O_CREAT, 0666, &attr); //为什么要加 / ，否则打开失败
    if (mq_cmd < 0){
        printf("mq_open error: %d \n",mq_cmd);
    }else{
        printf("mq_open success: %d \n",mq_cmd);
    }

    int nbytes = mq_receive(mq_cmd,msgbuffer, 1000, NULL); //这里的20, 表示长度大于或等于mq_msgsize，否则返回 -1
    if (nbytes < 0){
        printf("mq_receive error: %d \n",nbytes);
    }else{
        printf("mq_receive success: %s\n",msgbuffer);
    }

    if (mq_close(mq_cmd) < 0){
        printf("mq_close error! \n");
    }else{
        printf("mq_close success! \n");
    }

}
```

- make
```bash
gcc q4.c -o q4 -lrt
```

## c++ 读取消息队列
```c++
#include <iostream>
#include <thread>
#include <sys/types.h>
#include <sys/ipc.h>
#include <sys/msg.h>

// 定义消息队列的键值
const key_t queueKey = 1234;

// 定义消息结构体
struct Message {
    long mtype;  // 消息类型
    char mtext[1024];  // 消息内容
};

// 读取消息队列的线程函数
void ReadMessageQueue() {
    // 创建或连接到消息队列
    int queueId = msgget(queueKey, IPC_CREAT | 0666);
    if (queueId == -1) {
        std::cerr << "Failed to create or connect to the message queue." << std::endl;
        return;
    }

    // 循环读取消息队列
    while (true) {
        // 接收消息
        Message message;
        int ret = msgrcv(queueId, &message, sizeof(message.mtext), 0, 0);
        if (ret == -1) {
            std::cerr << "Failed to receive message from the message queue." << std::endl;
            break;
        }

        // 处理消息（这里只简单打印）
        std::cout << "Received message: " << message.mtext << std::endl;
    }

    // 删除消息队列
    if (msgctl(queueId, IPC_RMID, NULL) == -1) {
        std::cerr << "Failed to remove the message queue." << std::endl;
    }
}

int main() {
    // 创建读取消息队列的线程
    std::thread readerThread(ReadMessageQueue);

    // 等待线程结束
    readerThread.join();

    return 0;

}
```



---

> 作者:   
> URL: http://111.230.8.71:8889/linux_queue/  

