# [nvim[nvim配置AI插件vim-ai-doubao


<!--more-->
# [nvim[nvim配置AI插件vim-ai-doubao

## 安装步骤
1. 下载插件放入~/.local/share/nvim/lazy/目录下
2. 配置插件~/.config/nvim/lua/plugins/plugin-vim-ai-duobao.lua
```lua
root@ubuntu:/opt/blog# cat ~/.config/nvim/lua/plugins/plugin-vim-ai-duobao.lua
return {
    {
        "chenxuan520/vim-ai-doubao"
    }
}
```

3. 配置启用星火:vim ~/.config/nvim/lua/basic.lua 添加下面的配置
```lua
--let g:vim_ai_name="xinhuo" " xinhuo ,doubao ,tongyi ,openai
vim.g.vim_ai_name="xinhuo"
```

4. 打开配置文件，配置插件的token(星火api密码)
```vim
:AIEdit
```

5. 注册星火账号，修改配置
```json
root@ubuntu:~/.config# cat vim-ai-token.json
{
    "xinhuo": {"token": "xxx", "endpoint_url": "https://spark-api-open.xf-yun.com/v1/chat/completions", "model": "lite"},
    "xinhuo_bak": {"token": "", "endpoint_url": "https://spark-api-open.xf-yun.com/v1/chat/completions", "model": "generalv3"},
    "openai": {"token": "", "endpoint_url": "https://api.openai.com/v1/chat/completions", "model": "gpt-3.5-turbo"},
    "doubao": {"token": "", "endpoint_url": "https://ark.cn-beijing.volces.com/api/v3/chat/completions", "model": ""},
    "tongyi": {"token": "", "endpoint_url": "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions", "model": "qwen-long"}
}

```

## 插件下载
- [https://github.com/chenxuan520/vim-ai-doubao](https://github.com/chenxuan520/vim-ai-doubao)


## 总结
- 简单配置了一下，可以使用，优点是在vim中就可以使用AI大模型，不需要再打开网页了。
- 代码可以直接俄在vim中复制，非常简单实用。


---

> 作者:   
> URL: http://111.230.8.71:8889/nvim-plugin-vim-ai-doubao/  

