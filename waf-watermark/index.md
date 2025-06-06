# [WAF]WAF如何实现页面水印？


<!--more-->
# [WAF]WAF如何实现网页水印功能？
最近在研究WAF如何实现网页水印这里有一点想法先记录一下。
## 实现思路
通过nginx在html页面中插入一段水印的代码，例如插入如下代码:
```html
/* 示例代码 */
<div class="watermark"></div>
.watermark::before {
  content: "我是水印";
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.5;
  font-size: 48px;
  color: #ccc;
  pointer-events: none;
}
```


## 参考资料
- [前端实现水印效果的多种方案](https://segmentfault.com/a/1190000044280609)
- [Nginx实现html页面注入浏览器监控js代码片段](https://blog.csdn.net/xyz_dream/article/details/135695345)
- [前端web页面防截屏水印生成方案（网页水印+图片水印）](https://blog.csdn.net/sunny243788557/article/details/102460327)


---

> 作者:   
> URL: http://111.230.8.71:8889/waf-watermark/  

