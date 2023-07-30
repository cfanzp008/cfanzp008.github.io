# 使用sudo echo 写入文件提示 permmition denied如何解决？


<!--more-->
# sudo echo file permmition denied如何解决？
```bash
cat ./open_core.sh
sudo echo "alias vim=nvim" >> /etc/profile
./open_core.sh: line 1: /etc/profile: Permission denied
```

## 解决方法
- 方法1
```bash
echo "alias vim=nvim" |sudo tee -a /etc/profile
```

- 方法2
```bash
sudo sh -c 'echo "alias vim=nvim" >> /etc/profile'
```


## 参考
- https://blog.csdn.net/change_can/article/details/115128218


---

> 作者:   
> URL: https://cfanzp.com/sudo-echo-file-permmition-denied/  

