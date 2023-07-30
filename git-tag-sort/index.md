# git tag排序,解决默认看到的最后一个不是最新的tag的问题

# git tag排序,解决默认看到的最后一个不是最新的tag的问题
## git tag的问题
在使用git tag查看标签的时候，默认是按tag的字符串排序的，只有命名的顺序与字符串排序相同的时候,显示在最后的tag才是最新的,例如,有下面几个标签:
```
v0.9.0
v0.10.0
```
v0.10.0按字符串排序会默认显示在上面:
```
v0.10.0
v0.9.0
```
## git tag加上排序
让git按照打标签的时间进行排序，加上参数--sort=taggerdate
```
git tag -n --sort=taggerdate
```
- 为了方便平时输入在.gitconfig上加上缩写
```
[alias]
    stag = tag -n --sort=taggerdate
```
```
git tag -n --sort=taggerdate
```


---

> 作者:   
> URL: https://cfanzp.com/git-tag-sort/  

