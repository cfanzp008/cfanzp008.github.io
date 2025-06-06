# nginx如何检查配置文件是否正确？

# nginx如何检查配置文件是否正确？
nginx如何检查配置文件是否正确？当然是靠自己了，只有自己才知道自己想用nginx干啥，当然你还可叫上你的同事、朋友帮你看看配置是否有错。nginx其实可以帮助你检查一些基础的语法错误。命令很简单:
```nginx
nginx -t -c /etc/nginx/nginx.conf
```

## 有些情况线上需要修改配置文件怎么办？
保险的做法是:
- 先检查一下配置文件
```nginx
nginx -t
```
- 然后热加载配置
```nginx
nginx -s reload
```
- 最后去检查一下业务是否能够正常访问


---

> 作者:   
> URL: http://111.230.8.71:8889/nginx-config-check/  

