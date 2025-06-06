# 使用python开发一个简单的邮件发送脚本


<!--more-->
# 使用python开发一个简单的邮件发送脚本
- 废话不多说，直接上代码demo
```python
# -*- coding: utf-8 -*- 
import time
import socket
import httplib
import json
import datetime
import os
import commands
import subprocess

import sys
#========================================== 
# 导入smtplib和MIMEText 
#========================================== 
from email.mime.text import MIMEText 
import smtplib 
#========================================== 
# send to,split by','
#========================================== 
mailto_list=["xxx@qq.com"] 
#========================================== 
#========================================== 
mail_host="smtp.qq.com"
mail_user="QQ number"
mail_pass="QQ pass key"
mail_postfix="qq.com"
#========================================== 
# 发送邮件 
#========================================== 
def send_mail(to_list,sub,content): 
  ''''' 
  to_list:des email address
  sub:subject
  content:content
  send_mail("qq@qq.com","sub","content") 
  '''
  me=mail_user+"<"+mail_user+"@"+mail_postfix+">"
  msg = MIMEText(content) 
  msg['Subject'] = sub 
  msg['From'] = me 
  msg['To'] = ";".join(to_list) 
  try: 
    s = smtplib.SMTP() 
    s.connect(mail_host) 
    s.starttls() 
    s.login(mail_user,mail_pass) 
    s.sendmail(me, to_list, msg.as_string()) 
    s.close()
    print("ok")
    return True
  except Exception, e:
    print(e)
    return False

        
if __name__ == "__main__":
    print os.path.abspath(os.curdir)
    argc = len(sys.argv)
    if argc != 3:
        print("argc:",argc)
        sys.exit()
    title = sys.argv[1]
    body = sys.argv[2]
    print("title,body:",title,body)
    if title != "" and body != "":
        send_mail(mailto_list,title,body)
        #send_mail(mailto_list,"在线人数",players.decode("ascii").encode("utf-8"))
```


---

> 作者:   
> URL: http://111.230.8.71:8889/python_mail/  

