# mac使用rename进行批量重命名


<!--more-->
# mac使用rename进行批量重命名
## 场景
遇到有大量文件有相同前缀，想把前缀替换掉例如
```bash
abc_xxx1.txt 换成 def_xxx2.txt
abc_xxx2.txt 换成 def_xxx2.txt
```

## 安装使用rename命令
```
brew install rename
rename 's/abc/def/'  *.txt
```


---

> 作者:   
> URL: https://cfanzp.com/mac-rename/  

