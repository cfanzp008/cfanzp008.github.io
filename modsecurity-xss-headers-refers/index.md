# Modsecurity防护Headers Referer XSS攻击


<!--more-->
# Modsecurity防护Headers Referer XSS攻击
## modsecurity防护XSS攻击
- modsecurity可以防护请求中Referer字段中包含XSS攻击。

## 测试
```
curl 'http://localhost/' -H 'Referer:http://localhost/?search=<scritp>alert('xss');</script>' -I
```


---

> 作者:   
> URL: http://111.230.8.71:8889/modsecurity-xss-headers-refers/  

