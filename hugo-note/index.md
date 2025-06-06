# Hugo学习笔记

# hugo学习笔记
## hugo 下载
#### linux,ubuntu
```bash
wget https://github.com/gohugoio/hugo/releases/download/v0.101.0/hugo_0.101.0_Linux-64bit.tar.gz
```
扩展版本
```bash
wget https://github.com/gohugoio/hugo/releases/download/v0.101.0/hugo_extended_0.101.0_Linux-64bit.tar.gz
```

#### macos
```bash
wget https://github.com/gohugoio/hugo/releases/download/v0.101.0/hugo_0.101.0_macOS-64bit.tar.gz
```
如果是需要使用custom.scss配置需要使用扩展版本:
```bash
wget https://github.com/gohugoio/hugo/releases/download/v0.101.0/hugo_extended_0.101.0_macOS-64bit.tar.gz
```

##### m1
- https://github.com/gohugoio/hugo/releases/download/v0.111.3/hugo_extended_0.111.3_darwin-universal.tar.gz

### hugo集成搜索
hugo在集成搜索的时候还是有多种方案的，LoveIt默认的方案个人不太喜欢。这里个人测试了`hugo-search-fuse-js`的方案和`gcse`的方案，目前在使用的是`hugo-search-fuse-js`的方案。

{{< admonition >}}
hugo-search-fuse-js 在配置搜索时，默认显示有点不正常,需要添加一点自定义的css样式到_custom.scss中。
这里的hugo需要安装`扩展版本`的。
{{< /admonition >}}

- [hugo集成hugo-search-fuse-js](https://cloud.tencent.com/developer/article/1932812)
- hugo-search-fuse-js:https://github.com/kaushalmodi/hugo-search-fuse-js
- [添加站内搜索(gcse)](https://blog.csdn.net/justheretobe/article/details/51622204)

#### mac m1 hugo-search-fuse-js报错
```
Error: Error building site: failed to render pages: render of "page" failed: "/linux_dev_blog/themes/hugo-search-fuse-js/layouts/_default/search.html:124:66": execute of template failed: template: _default/search.html:124:66: executing "footer" at <fingerprint>: error calling fingerprint: <nil> can not be transformed
```


### 默认启动端口
- 1313

### hugo推荐主题LoveIt
- [LoveIt](https://hugoloveit.com/)

### LoveIt主题使用demo网站
- https://hugoloveit.com/
- https://dillonzq.com/
- https://lewky.cn/
- https://cfanzp.com
- https://i.scwy.net/
- https://kevin-shi.gitee.io/




---

> 作者:   
> URL: http://111.230.8.71:8889/hugo-note/  

