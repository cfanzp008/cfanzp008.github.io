# Shell单元测试框架Bach


<!--more-->
# Shell单元测试框架Bach
## 关于Shell单元测试
- 最近负责的项目部分逻辑需要用Shell脚本和Python脚本来写部分逻辑。平时很少写脚本代码，因为脚本是需要再线上运行的，因此有必要写一下单元测试的逻辑。
- Bach是一个比较好用的单元测试框架，还没深度体验，这里先记录一下入门的用法.
## Bach
- github: https://github.com/bach-sh/bach
- 下载: https://bach.sh/
```
git clone https://github.com/bach-sh/bach.git
```

## 使用demo
- demo
```bash
root@VM-8-10-ubuntu:/opt/test/bach/tests# cat ./test-assert-fail.test.sh 
#!/usr/bin/env bash
set -euo pipefail
curr_dir="$(cd "$(dirname "$BASH_SOURCE")"; pwd -P)"
source "${curr_dir}"/../bach.sh

test-ASSERT-FAIL-exit-1-should-success() {
    @echo This test case SHOULD SUCCESS!
    @echo Because the exit code is non-zero.
    do-something
    exit 1
}
```
- 运行结果
```bash
root@VM-8-10-ubuntu:/opt/test/bach/tests# ./test-assert-fail.test.sh 
1..1
ok 1 - ASSERT FAIL exit 1 should success
# -----
# All tests: 1, failed: 0, skipped: 0
```

## 其它Shell测试框架
- Bats: https://zhuanlan.zhihu.com/p/356437164
- Shunit2: https://www.jianshu.com/p/605e81d1bf29

## python测试框架
- unittest: https://blog.csdn.net/qq_18874531/article/details/119210872
- python unittest doc: https://docs.python.org/zh-tw/3.6/library/unittest.html


---

> 作者:   
> URL: https://cfanzp.com/shell-test/  

