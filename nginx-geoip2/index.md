# Nginx获取客户端地理位置


<!--more-->
# Nginx获取客户端地理位置
## 如何在nginx中获取nginx的ip地址。
- 使用geoip2
- 使用ngx_http_geoip2_module模块

## 步骤
- 安装依赖
```bash
yum install geoip geoip-devel -y
```

- 安装mmdblookup环境
```bash
yum install -y libmaxminddb-devel
```

- 查看ip所属位置
```bash
mmdblookup --file /usr/local/geoip/GeoLite2-City/GeoLite2-City.mmdb --ip 183.195.99.161
```

- nginx配置
```nginx
 geoip2 /usr/local/geoip/GeoLite2-Country/GeoLite2-Country.mmdb{
        $geoip2_data_country_code  country  iso_code ;
        $geoip2_data_country_name  country names zh-CN;
    }
    geoip2 /usr/local/geoip/GeoLite2-City/GeoLite2-City.mmdb {
        $geoip2_data_country_code country iso_code;
        $geoip2_data_country_name country names zh-CN;
        $geoip2_data_city_name city names zh-CN;
        $geoip2_data_province_name subdivisions 0 names en;
        $geoip2_data_province_isocode subdivisions 0 iso_code;
        $geoip2_continent_code continent code;
	$geoip2_data_city_name default=China;
    }
```

- 日志中打印
```nginx
log_format  main escape=json '$remote_addr - $remote_user [$time_local] '
                        '"$geoip2_data_country_name" "$geoip2_data_city_name" ';

```

## 参考
- https://blog.csdn.net/GX_1_11_real/article/details/130034225
- https://blog.csdn.net/weixin_45761659/article/details/128971448


---

> 作者:   
> URL: http://111.230.8.71:8889/nginx-geoip2/  

