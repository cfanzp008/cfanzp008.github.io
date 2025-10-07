# 如何使用命令查看ip地址归属地？


<!--more-->
# 如何使用命令查看ip地址归属地？
### 访问ipinfo.io,不支持中文
```bash
root@VM-ubuntu:/# curl ipinfo.io/8.8.8.8
{
  "ip": "8.8.8.8",
  "hostname": "dns.google",
  "city": "Mountain View",
  "region": "California",
  "country": "US",
  "loc": "37.4056,-122.0775",
  "org": "AS15169 Google LLC",
  "postal": "94043",
  "timezone": "America/Los_Angeles",
  "readme": "https://ipinfo.io/missingauth",
  "anycast": true
}
```

### 访问ip-api.com,添加参数lang=zh-CN支持中文
```bash
root@VM-ubuntu:/# curl ip-api.com/114.114.114.114?lang=zh-CN
{
  "status"       : "success",
  "continent"    : "亚洲",
  "continentCode": "AS",
  "country"      : "中国",
  "countryCode"  : "CN",
  "region"       : "SD",
  "regionName"   : "山东",
  "city"         : "青岛市",
  "district"     : "",
  "zip"          : "266000",
  "lat"          : 36.0662,
  "lon"          : 120.383,
  "timezone"     : "Asia/Shanghai",
  "offset"       : 28800,
  "currency"     : "CNY",
  "isp"          : "China Unicom Shandong Province network",
  "org"          : "NanJing XinFeng Information Technologies, Inc.",
  "as"           : "AS137702 Nanjing, Jiangsu Province, P.R.China.",
  "asname"       : "CHINATELECOM-JIANGSU-NANJING-IDC",
  "mobile"       : false,
  "proxy"        : false,
  "hosting"      : false,
  "query"        : "114.114.114.114"
}
```

### 将nginx访问日志中的ip找出归属地存放到文件中
```bash
tail access.log  -n 100 | grep "remote_addr" | awk -F'remote_addr' '{print $2}' | awk -F'remote_user' '{print $1}' | awk -F '"' '{print $3}'| sort | uniq | xargs -I {} curl ip-api.com/{}?lang=zh-CN >> /tmp/ip.txt
```


---

> 作者:   
> URL: http://111.230.8.71:8889/ip-search/  

