# git常见问题


# git常见问题

## FAQ

### git如何清除提交记录？
项目如果走过了一个很长的开发周期以后，提交历史会很长，如果提交记录不重要，这种情况下可以删除掉历时记录。
- 创建一个干净的分支 使用`--orphan`参数
- 添加当前的所有文件
- 提交注释
- 删除原来的分支master
- 把当前分支重命名为master
- 把当前分支强行推送到远端
```
git checkout --orphan test
git add .
git commit -m "init"
git branch -D master
git branch -m master
git push -f origin master

```

### git如何查看空间占用?
```bash
git count-objects -v # 查看 git 相关文件占用的空间
du -sh .git # 查看 .git 文件夹占用磁盘空间
```

### 如何查找git提交中涉及的大文件?
```bash
git rev-list --objects --all | grep "$(git verify-pack -v .git/objects/pack/*.idx | sort -k 3 -n | tail -5 | awk '{print$1}')"
```

### 如何删除大文件?
```bash
git filter-branch -f --prune-empty --index-filter 'git rm -rf --cached --ignore-unmatch big_file_name' --tag-name-filter cat -- --all

rm -Rf .git/refs/original
rm -Rf .git/logs/
git gc
git prune
git push --force
```

### 如何删除文件名为tags的文件
```bash
git filter-branch -f --prune-empty --index-filter 'git rm -rf --cached --ignore-unmatch tags' --tag-name-filter cat -- --all

rm -Rf .git/refs/original
rm -Rf .git/logs/
git gc
git prune
git push --force
```


### git如何查看文件?
```
git rev-list --objects --all | grep "$(git verify-pack -v .git/objects/pack/*.idx | sort -k 3 -n | tail -18 | awk '{print$1}')"
```

### git 使用config文件配置快捷访问
- 创建文件
```
touch ~/.ssh/config
```
- 配置文件
```
vim ~/.ssh/config
Host server1
  HostName 127.0.0.1
  Port 22
  User root
  IdentityFile ~/.ssh/id_rsa

Host server2
  HostName 192.168.0.1
  Port 22
  User root
  IdentityFile ~/.ssh/id_rsa
```

#### 使用
- 连接server1服务器
```
ssh server1
```

- 连接server2服务器
```
ssh server2
```

### git reset,git checkout 后依旧显示有修改,实际上没有修改怎么办？
- 比较被修改的文件，发现实际没有任何修改提示：
```
File mode changed from 100755 to 100644
```

- 原因：主要原因是因为文件的权限被修改了。
- 解决办法可参考: https://blog.csdn.net/qq_41872247/article/details/116457169
```
git config --global --add core.filemode false
```


## 参考
- [git 删除历史已提交的大文件](https://blog.csdn.net/Eric_LH/article/details/103378283)
- [Git删除历史记录（已提交）中的大文件](https://blog.csdn.net/weixin_45115705/article/details/90604963)
- [gitLab清理大文件_包括历史记录中的大文件](https://www.cnblogs.com/ziyue7575/p/45538b0b7dbe1cbbca5e4ca1a90810ca.html)
- [git-filter-repo](https://help.aliyun.com/document_detail/206833.html)


---

> 作者:   
> URL: https://cfanzp.com/git-faq/  

