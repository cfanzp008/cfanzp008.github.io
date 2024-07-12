# 在mac m1上搭建c++ Vim开发环境


<!--more-->
# 在mac m1上搭建c++ Vim开发环境
## vim安装
这里就不介绍如何安装了，详细的步骤可以看我的vim相关文章或者自行查阅相关文档。

## vim 配置c++插件syntastic
装好vim后需要配置对应的提示插件,vimrc中添加如下配置
```
"cpp
let g:syntastic_cpp_include_dirs = ['/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/c++/v1']
" let g:syntastic_cpp_include_dirs = ['/usr/include/']
let g:syntastic_cpp_remove_include_errors = 1
let g:syntastic_cpp_check_header = 1
let g:syntastic_cpp_compiler = 'clang++'
let g:syntastic_cpp_compiler_options = '-std=c++11 -stdlib=libstdc++'
" syntastic end
```

- 其中需要注意的是 `syntastic_cpp_include_dirs`的配置,这里用到了clang++可以用`clang++ --version`来查看相关路径

## 测试一下环境
### 写一个简单的c++程序
```cpp
// touch main.cpp
// vim main.cpp
#include <iostream>
using namespace std;
int main() {
    cout << "Hello world!" << endl;
    return 0;
}
```

## 参考
- m1 c++环境搭建：https://blog.csdn.net/qq_42678864/article/details/115560757


---

> 作者:   
> URL: https://cfanzp.com/cpp-m1-env-vim/  

