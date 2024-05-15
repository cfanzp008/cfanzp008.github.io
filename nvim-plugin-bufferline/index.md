# [nvim插件]Bufferline

<!--more-->

# [nvim插件]bufferline
## 插件作用
- 插件可以方便显示buffer到顶部

## bufferline插件配置
```lua
return {
    {
        'akinsho/bufferline.nvim',
        version = "*",
        --dependencies = {"nvim-tree/nvim-web-devicons"},
        config = function()
            -- calling `setup` is optional for customization
            vim.opt.termguicolors = true
            require("bufferline").setup{
                options = {
                    -- 使用 nvim 内置lsp
                    --diagnostics = "nvim_lsp",
                    numbers = function(opts)
                        return string.format(' %s/%s', vim.fn['tabpagenr'](), opts.ordinal)
                    end,

                    -- 左侧让出 nvim-tree 的位置
                    offsets = {{
                        filetype = "NvimTree",
                        text = "File Explorer",
                        highlight = "Directory",
                        text_align = "left"
                    },
                    {
                        filetype = 'vista',
                        text = function()
                            return vim.fn.getcwd()
                        end,
                        highlight = "Tags",
                        text_align = "right"
                    }

                }
            }
        }
    end
  }
}
```

## 配置插件的快捷键
```lua
-- bufferline
-- -- bufferline 左右Tab切换
--map("n", "<C-h>", ":BufferLineCyclePrev<CR>", opt)
--map("n", "<C-l>", ":BufferLineCycleNext<CR>", opt)
vim.api.nvim_set_keymap('n', '<C-h>', ':BufferLineCyclePrev<CR>', {noremap = true})
vim.api.nvim_set_keymap('n', '<C-l>', ':BufferLineCycleNext<CR>', {noremap = true})

```



---

> 作者:   
> URL: https://cfanzp.com/nvim-plugin-bufferline/  

