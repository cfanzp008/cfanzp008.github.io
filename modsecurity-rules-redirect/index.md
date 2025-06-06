# Modsecurity拦截非法请求后跳转到指定页面


<!--more-->
# Modsecurity拦截非法请求后跳转到指定页面
## nginx+Modsecurity如何在拦截了请求后跳转到指定页面？
- 修改modsecurity配置文件
```bash
ecDefaultAction "phase:1,deny,log,noauditlog,status:302,redirect:http://www.modsecurity.cn/practice/intercept.html?url=%{REQUEST_FILENAME}&intercept_domain=%{request_headers.host}"
SecDefaultAction "phase:2,deny,log,noauditlog,status:302,redirect:http://www.modsecurity.cn/practice/intercept.html?url=%{REQUEST_FILENAME}&intercept_domain=%{request_headers.host}"
```

## 参考
- http://www.modsecurity.cn/practice/post/8.html


---

> 作者:   
> URL: http://111.230.8.71:8889/modsecurity-rules-redirect/  

