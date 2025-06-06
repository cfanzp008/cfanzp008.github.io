# Ant Design Pro Install


<!--more-->
# Ant Design Pro Install
## install nodejs
```bash
curl -sL https://deb.nodesource.com/setup_20.x | sudo -E bash -
apt-get install nodejs -y
```
## 下载安装
```bash
git clone https://github.com/ant-design/ant-design-pro.git --depth 1
apt install npm
npm -v
6.14.4
npm install yarn tyarn -g
+ tyarn@0.3.8
+ yarn@1.22.22

tyarn install
tyarn start
```


## 常见问题
- error: RPC failed; curl 92 HTTP/2 stream 0 was not closed cleanly: CANCEL (err 8)
- git clone时添加--depth 1

- nodejs版本太低
```
# tyarn install
yarn install v1.22.22
info No lockfile found.
[1/5] Validating package.json...
error ant-design-pro@6.0.0: The engine "node" is incompatible with this module. Expected version ">=12.0.0". Got "10.19.0"
error Found incompatible module.
info Visit https://yarnpkg.com/en/docs/cli/install for documentation about this command.
```

## 常见组建
- ProComponents
- antd

## 开源项目
- newbee-ltd


---

> 作者:   
> URL: http://111.230.8.71:8889/ant-design-pro-install/  

