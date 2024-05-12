# nvim插件:nvim-lspconfig


<!--more-->
# nvim插件:nvim-lspconfig
## github下载地址
- https://github.com/neovim/nvim-lspconfig

## lsp是什么?
- LSP是Language Server Protocol的缩写。

## 应用场景有哪些？
- 代码补全
- 转到定义
- 查找引用
- 代码诊断
- 重构工具

## nvim-lspconfig是什么?

## 有哪些lspconfig服务器？

## nvim-lspconfig如何使用？

## 其它vim lsp插件有哪些？
1. vim-lisp:https://gitcode.com/prabirshrestha/vim-lsp

## nvim lazy插件中如何安装nvim-lspconfig?
- vim ~/.config/nvim/lua/plugins/plugin-nvim-lspconfig.lua
```bash
return {
    {
        "neovim/nvim-lspconfig",
        lazy = false,
        config = function()
            vim.lsp.set_log_level("debug")
            local nvim_lsp = require('lspconfig')
            nvim_lsp.clangd.setup({
                enure_installed = { "lua_ls"},
                cmd = {
                    "clangd",
                    --"--query-driver=*arm-none-eabi*",
                    -- NOTE：使用如下绝对路径时反而无效
                    -- "--query-driver=${path_to_compiler}\\gcc-arm-none-eabi\\12.2.rel1\\bin\\arm-none-eabi*",
                },
                filetypes = { "c", "cpp", "objc", "objcpp", "cuda", "proto" },
            })

            nvim_lsp.lua_ls.setup({
                cmd = {'lua-language-server'};
                settings = {
                    settings = {
                        Lua = {
                            runtime = {
                                -- Tell the language server which version of Lua you're using (most likely LuaJIT in the case of Neovim)
                                version = 'LuaJIT',
                                -- Setup your lua path
                                path = vim.split(package.path, ';'),
                            },
                            diagnostics = {
                                -- Get the language server to recognize the `vim` global
                                globals = {'vim'},
                            },
                            --workspace = {
                            --    -- Make the server aware of Neovim runtime files
                            --    library = {
                            --        [vim.fn.expand('$VIMRUNTIME/lua')] = true,
                            --        [vim.fn.expand('$VIMRUNTIME/lua/vim/lsp')] = true,
                            --    },
                            --},
                            -- Do not send telemetry data containing a randomized but unique identifier
                            telemetry = {
                                enable = false,
                            },
                        },
                    }
                },

            })

            --gopls for go
            nvim_lsp.gopls.setup({
                cmd = {'gopls'};
                --settings = {
                --    gopls = {
                --        --ui = {
                --        --    completion = {
                --        --        usePlaceholders = true,
                --        --    },
                --        --},
                --    },
                --}
            })

        end
    }
}
```


---

> 作者:   
> URL: https://cfanzp.com/nvim-plugin-nvim-lspconfig/  

