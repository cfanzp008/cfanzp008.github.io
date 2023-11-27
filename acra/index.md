# 开源的数据库加密解决方案--acra


<!--more-->
# acra
## 基础概念
- AcraCentor: AcraCentor是AcraServer的一个单独的防火墙模块，用于检查每个传入的SQL请求。
- AcraWriter: 将明文加密为AcraStruct并发送到AcraServer的库。
- AcraBlock: 它是一种加密格式
- AcraStruct: 它是一种数据格式,由AcraWriter生成。
- master key
- .acrakeys:key生成的默认目录
- KMS(Key Management Service):


## tools
- acra-keymaker:用于生成相关的key

## 目录结构

## 使用
```
sudo apt-get install git libssl-dev make build-essential
git clone https://github.com/cossacklabs/themis.git
cd themis
make
sudo make install
git clone https://github.com/cossacklabs/acra.git
```
### make key
```
acra-keymaker --keystore=v1 --generate_master_key=master.key
root@ca96fb4df685:/opt/casb/acra/build/bin# export ACRA_MASTER_KEY=$(cat master.key | base64)
root@ca96fb4df685:/opt/casb/acra/build/bin# echo $ACRA_MASTER_KEY
N83aD76oJK4T0rvW213efyOeGUFl6O1bw4A9+JSYGCI=
vim ~/.bashrc
export ACRA_MASTER_KEY='N83aD76oJK4T0rvW213efyOeGUFl6O1bw4A9+JSYGCI='
source ~/.bashrc
./acra-keymaker --client_id=python1 --keystore=v1
```


## github
- github: https://github.com/ACRA/acra


---

> 作者:   
> URL: https://cfanzp.com/acra/  

