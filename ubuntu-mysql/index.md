# ubuntu安装mysql


<!--more-->
# ubuntu安装mysql

## ubuntu 安装mysql5.6.51
```bash
wget https://downloads.mysql.com/archives/get/p/23/file/mysql-server_5.6.51-1debian9_amd64.deb-bundle.tar
tar -xvf mysql-server_5.6.51-1debian9_amd64.deb-bundle.tar

sudo dpkg -i mysql-common_5.6.51-1debian9_amd64.deb

sudo dpkg -i libmysqlclient18_5.6.51-1debian9_amd64.deb
sudo dpkg -i libmysqlclient-dev_5.6.51-1debian9_amd64.deb
sudo dpkg -i libmysqld-dev_5.6.51-1debian9_amd64.deb

sudo dpkg -i mysql-community-client_5.6.51-1debian9_amd64.deb
sudo dpkg -i mysql-client_5.6.51-1debian9_amd64.deb

sudo dpkg -i mysql-community-server_5.6.51-1debian9_amd64.deb
sudo dpkg -i mysql-server_5.6.51-1debian9_amd64.deb

sudo dpkg -i mysql-community-bench_5.6.51-1debian9_amd64.deb
sudo dpkg -i mysql-community-source_5.6.51-1debian9_amd64.deb

sudo dpkg -i mysql-community-test_5.6.51-1debian9_amd64.deb
sudo dpkg -i mysql-testsuite_5.6.51-1debian9_amd64.deb
```


---

> 作者:   
> URL: https://cfanzp.com/ubuntu-mysql/  

