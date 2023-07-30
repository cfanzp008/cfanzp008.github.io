# linux中jpg格式转化为png格式

# linux中jpg格式转化为png格式
linux中将jpg与png进行转化可以用parallel和convert命令
安装方法:
- 安装arallel
```bash
sudo apt-get install parallel
```
- 安装convert
```bash
sudo  apt-get install imagemagick
```

- cfanzp.jpg转化为cfanzp.png
```bash
parallel convert '{}' '{.}.png' ::: cfanzp.jpg
```


---

> 作者:   
> URL: https://cfanzp.com/linux-jpg2png/  

