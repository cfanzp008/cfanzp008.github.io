# [nvim|c++]nvim-lspconfig配置c++开发环境


<!--more-->
# [nvim|c++]nvim-lspconfig配置c++开发环境
很多人觉得使用vim开发c++比较麻烦那是因为对应的插件没有配置好，比如说lsp的插件nvim-lspconfig。配置好nvim-lspconfig插件能够极大地提供工作效率
## 常用配置
### `ge`,`gq`使用lsp诊断错误输出到quickfix列表中
```lua

buf_set_keymap(bufnr, "n", "ge", "<cmd>lua vim.diagnostic.setloclist()<CR>", opts)
buf_set_keymap(bufnr, "n", "gq", "<cmd>lua vim.diagnostic.setqflist()<CR>", opts)
```

### `gr`查找所有的引用
```lua
buf_set_keymap(bufnr, 'n', 'gr', '<Cmd>lua vim.lsp.buf.references()<CR>', opts)
```

### `K`显示悬浮信息
```lua
buf_set_keymap(bufnr, 'n', 'K', '<Cmd>lua vim.lsp.buf.hover()<CR>', opts)
```

### `go`以浮窗形式显示错误
```lua
buf_set_keymap(bufnr, "n", "go", "<cmd>lua vim.diagnostic.open_float()<CR>", opts)
```

### `gp`转到上一个诊断信息
```lua
buf_set_keymap(bufnr, "n", "gp", "<cmd>lua vim.diagnostic.goto_prev()<CR>", opts)
```

### `gn`转到下一个诊断信息
```lua
buf_set_keymap(bufnr, "n", "gn", "<cmd>lua vim.diagnostic.goto_next()<CR>", opts)
```

### 完整配置
```lua
--plugin-nvim-lspconfig.lua
return {
    {
        "neovim/nvim-lspconfig",
        lazy = false,
        config = function()
            vim.lsp.set_log_level("debug")
            local nvim_lsp = require('lspconfig')
            nvim_lsp.clangd.setup({
                enure_installed = { "lua_ls"},
                --cmd = {
                --    "clangd",
                --    --"--query-driver=*arm-none-eabi*",
                --    -- NOTE：使用如下绝对路径时反而无效
                --    -- "--query-driver=${path_to_compiler}\\gcc-arm-none-eabi\\12.2.rel1\\bin\\arm-none-eabi*",
                --},
                cmd = { "clangd", "--log=verbose"},
                -- 将标准输出和标准错误重定向到日志文件
                filetypes = { "c", "cpp", "objc", "objcpp", "cuda", "proto" },
                -- 可选：配置 `on_attach` 函数来绑定 LSP 功能
                on_attach = function(client, bufnr)
                    -- 绑定快捷键
                    local buf_set_keymap = vim.api.nvim_buf_set_keymap
                    local opts = { noremap=true, silent=true }

                    -- 跳转到声明
                    -- buf_set_keymap(bufnr, "n", "gd", "<cmd>lua vim.lsp.buf.declaration()<CR>", opts)
                    -- buf_set_keymap(bufnr, "n", "gD", "<cmd>lua vim.lsp.buf.declaration()<CR>", opts)
                    -- 绑定跳转到定义
                    --buf_set_keymap(bufnr, 'n', 'gd', '<Cmd>lua vim.lsp.buf.definition()<CR>', opts)
                    buf_set_keymap(bufnr, 'n', 'gD', '<Cmd>lua vim.lsp.buf.definition()<CR>', opts)
                    -- 绑定查找所有引用
                    buf_set_keymap(bufnr, 'n', 'gr', '<Cmd>lua vim.lsp.buf.references()<CR>', opts)
                    -- 绑定显示悬停信息
                    buf_set_keymap(bufnr, 'n', 'K', '<Cmd>lua vim.lsp.buf.hover()<CR>', opts)
                    -- 跳转到实现
                    buf_set_keymap(bufnr, "n", "gi", "<cmd>lua vim.lsp.buf.implementation()<CR>", opts)
                    -- 以浮窗形式显示错误
                    buf_set_keymap(bufnr, "n", "go", "<cmd>lua vim.diagnostic.open_float()<CR>", opts)
                    buf_set_keymap(bufnr, "n", "gp", "<cmd>lua vim.diagnostic.goto_prev()<CR>", opts)
                    buf_set_keymap(bufnr, "n", "gn", "<cmd>lua vim.diagnostic.goto_next()<CR>", opts)
                    buf_set_keymap(bufnr, "n", "gq", "<cmd>lua vim.diagnostic.setqflist()<CR>", opts)
                    buf_set_keymap(bufnr, "n", "ge", "<cmd>lua vim.diagnostic.setloclist()<CR>", opts)

                end,
            })

            nvim_lsp.lua_ls.setup({
                cmd = {'lua-language-server'};
                settings = {
                    --settings = {
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
                    --}
                },

                -- 定义快捷键
                -- 根据官方的提示，这里我们使用 on_attach 表示当前缓冲加载服务端完成之后调用
                on_attach = function(client, bufnr)
                    -- 跳转到声明
                    --vim.api.nvim_buf_set_keymap(bufnr, "n", "gd", "<cmd>lua vim.lsp.buf.declaration()<CR>", {silent = true, noremap = true})
                    vim.api.nvim_buf_set_keymap(bufnr, "n", "gD", "<cmd>lua vim.lsp.buf.declaration()<CR>", {silent = true, noremap = true})
                    -- 跳转到定义
                    --vim.api.nvim_buf_set_keymap(bufnr, "n", "gD", "<cmd>lua vim.lsp.buf.definition()<CR>", {silent = true, noremap = true})
                    vim.api.nvim_buf_set_keymap(bufnr, "n", "gd", "<cmd>lua vim.lsp.buf.definition()<CR>", {silent = true, noremap = true})
                    -- 显示注释文档
                    vim.api.nvim_buf_set_keymap(bufnr, "n", "gh", "<cmd>lua vim.lsp.buf.hover()<CR>", {silent = true, noremap = true})
                    -- 跳转到实现
                    vim.api.nvim_buf_set_keymap(bufnr, "n", "gi", "<cmd>lua vim.lsp.buf.implementation()<CR>", {silent = true, noremap = true})
                    -- 跳转到引用位置
                    vim.api.nvim_buf_set_keymap(bufnr, "n", "gr", "<cmd>lua vim.lsp.buf.references()<CR>", {silent = true, noremap = true})
                    -- 以浮窗形式显示错误
                    vim.api.nvim_buf_set_keymap(bufnr, "n", "go", "<cmd>lua vim.diagnostic.open_float()<CR>", {silent = true, noremap = true})
                    vim.api.nvim_buf_set_keymap(bufnr, "n", "gp", "<cmd>lua vim.diagnostic.goto_prev()<CR>", {silent = true, noremap = true})
                    vim.api.nvim_buf_set_keymap(bufnr, "n", "gn", "<cmd>lua vim.diagnostic.goto_next()<CR>", {silent = true, noremap = true})
                end


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

## 更强配置，搭配telescope的配置
在keybandings.lua中配置快捷键
### `<leader>ff`查找文件,同Ctrl+p：通过Telescope插件来查找文件
```lua
vim.api.nvim_set_keymap('n', '<leader>ff', ':Telescope find_files<CR>', {noremap = true})
```

### `<leader>fg`很强大查找代码中的关键字
```lua
vim.api.nvim_set_keymap('n', '<leader>fg', ':Telescope live_grep<CR>', {noremap = true})
```

### `<leader>fb`在buffer(打开的文件中查找文件) 很实用
```lua
vim.api.nvim_set_keymap('n', '<leader>fb', ':Telescope buffers<CR>', {noremap = true})
```

### `<leader>fh`help_tags
```lua
vim.api.nvim_set_keymap('n', '<leader>fh', ':Telescope help_tags<CR>', {noremap = true})
```

## 相关的vim接口
```lua

-- 跳转到声明
lua vim.lsp.buf.declaration()
-- 跳转到定义
vim.lsp.buf.definition()
-- 显示注释文档
vim.lsp.buf.hover()
-- 跳转到实现
vim.lsp.buf.implementation()
-- 跳转到引用位置
vim.lsp.buf.references()
-- 以浮窗形式显示错误
vim.diagnostic.open_float()
vim.diagnostic.goto_prev()
vim.diagnostic.goto_next()
vim.diagnostic.setloclist()
vim.diagnostic.setqflist()
```


---

> 作者:   
> URL: http://111.230.8.71:8889/nvim-lspconfig-cpp/  

