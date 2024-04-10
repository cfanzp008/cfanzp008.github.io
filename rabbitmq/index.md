# Rabbitmq实战


<!--more-->
# Rabbitmq实战
## 背景
- 最近有一个项目用到了rabbitmq,rabbbitmq的生产者由另外一批同学维护。我们这边负责消费端的业务逻辑。由于相关协议都是我们这边主导，为了测试方便，我自己尝试搭建了一套rabbitmq的测试环境。

## 测试消费端代码
```python
#!/usr/bin/python3
import pika

credentials = pika.PlainCredentials('guest', 'guest')
parameters = pika.ConnectionParameters('127.0.0.1',
                                       port=5673,  # RabbitMQ 服务器的端口
                                       virtual_host='/',
                                       credentials=credentials)

# 连接到 RabbitMQ 服务器
connection = pika.BlockingConnection(parameters)
# 连接到 RabbitMQ 服务器
#connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()

# 声明一个队列
channel.queue_declare(queue='a1',auto_delete=False, arguments={'x-message-ttl': 10001})

def callback(ch, method, properties, body):
        print(" [x] Received %r" % body)

# 告诉 RabbitMQ 使用 callback 来接收消息
channel.basic_consume(queue='a1', on_message_callback=callback, auto_ack=True)

print(' [*] Waiting for messages. To exit press CTRL+C')

# 开始接收消息
channel.start_consuming()
```

## 测试生产者端代码
```python
#!/usr/bin/python3
import pika
import json

def read_json(file_name):
    # 读取 JSON 文件内容
    with open(file_name, 'r') as file:
        data_str = file.read()
        data = json.loads(data_str)
        return data

credentials = pika.PlainCredentials('guest', 'guest')
parameters = pika.ConnectionParameters('127.0.0.1',
                                       port=5673,  # RabbitMQ 服务器的端口
                                       virtual_host='/',
                                       credentials=credentials)

# 连接到 RabbitMQ 服务器
connection = pika.BlockingConnection(parameters)
# 连接到 RabbitMQ 服务器
channel = connection.channel()
print("channel:",channel)

# 声明一个队列
channel.queue_declare(queue='a1',auto_delete=True, arguments={'x-message-ttl': 10001})

# 发送消息
channel_id = 3
# 发布一条消息，指定 channel_id
#curbody='{"msgType":"TestMessage","messageData":{"messageTime":"2024-04-10 11:24:22"}}'
curbody_json=read_json("/tmp/test.json")
curbody = json.dumps(curbody_json)
print("curbody:",curbody)
channel.basic_publish(exchange='', routing_key='a1', body=curbody, properties=pika.BasicProperties(
        content_type='application/json',
        delivery_mode=2,  # make message persistent
        headers={'channel_id': channel_id}))

print(" [x] Sent 'Hello RabbitMQ!'")

# 关闭连接
connection.close()
```

## rabbitmq docker 安装
```bash
docker pull rabbitmq
docker run -d --hostname my-rabbit --name rabbit -p 15672:15672 -p 5673:5672 rabbitmq
docker ps
#enter container
docker exec -it aeda0fc7b9b2 /bin/bash
rabbitmq-plugins enable rabbitmq_management
# enter web
http://10.168.27.133:15672/
# pwd
guest/guest
```

## c++中使用rabbitmq
- https://github.com/akalend/amqpcpp
- https://github.com/bloomberg/rmqcpp

## 参考
- [docker安装RabbitMQ教程](https://blog.csdn.net/Relievedz/article/details/131081440)


---

> 作者:   
> URL: https://cfanzp.com/rabbitmq/  

