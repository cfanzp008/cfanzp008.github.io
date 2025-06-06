# vim配置文件.vimrc

# vimrc配置文件.vimrc
下面是我的vim配置，这里记录一下
```vim
"set term=screen

set ruler
set laststatus=2                " make the last line where the status is two lines deep so you can see status always
set backspace=indent,eol,start  " make that backspace key work the way it should
set nocompatible                " vi compatible is LAME
set showmode                    " show the current mode
syntax on                       " turn syntax highlighting on by default

"set fdm=indent
"
""行号{
set nu!
"set relativenumber
"}
"

"set guifont=h12
set hls
"set background=dark
set t_Co=256
"设置配色方案{
left g:molokai_original = 1
let g:rehash256 = 1
"desert
"colorscheme solarized molokai github lucius desert
"}
" markdown theme
"let g:detorte_theme_mode = 'dark'

"tab{
set tabstop=2
set expandtab
""}

filetype off

call plug#begin('~/.vim/plugged')
Plug 'git://github.com/tomasr/molokai.git'
Plug 'preservim/nerdtree'
"jPlug 'preservim/nerdtree' |
"            \ Plug 'xuyuanp/nerdtree-git-plugin' |
"            \ Plug 'ryanoasis/vim-devicons'
Plug 'tiagofumo/vim-nerdtree-syntax-highlight'
Plug 'vim-airline/vim-airline'
Plug 'vim-airline/vim-airline-themes'
Plug 'michaelHL/awesome-vim-colorschemes'
Plug 'majutsushi/tagbar'
Plug 'godlygeek/tabular'
Plug 'ctrlpvim/ctrlp.vim'
"Plug 'ack.vim'

"Plug 'vim-scripts/luainspect.vim'
"Plug 'xolox/vim-misc'
"Plug 'xolox/vim-lua-ftplugin'

Plug 'Shougo/neocomplcache'
Plug 'nathanaelkane/vim-indent-guides'
Plug 'Yggdroot/indentLine'
Plug 'airblade/vim-gitgutter'
Plug 'gregsexton/gitv'
"Plug 'tpope/vim-fugitive'
Plug 'git://github.com/rking/ag.vim.git'

" Multiple Plug commands can be written in a single line using | separators
"Plug 'SirVer/ultisnips' | Plug 'honza/vim-snippets'
Plug 'tpope/vim-surround'
Plug 'scrooloose/syntastic'
Plug 'Chiel92/vim-autoformat'
Plug 'tpope/vim-commentary'

Plug 'junegunn/fzf', { 'dir': '~/.fzf', 'do': './install --all' }
"Plug '/usr/bin/fzf'
Plug 'junegunn/fzf.vim'
"Plug 'Yggdroot/LeaderF', { 'do': './install.sh' }
Plug 'mg979/vim-visual-multi'
"Plug 'voldikss/vim-browser-search'
Plug 'kien/rainbow_parentheses.vim'
Plug 'uarun/vim-protobuf'
"Plug 'tpope/vim-abolish'
"Plug 'fatih/vim-go'
"Plug 'w0rp/ale'

"Plug 'tamlok/detorte'
"Plug 'tamlok/vim-markdown'
Plug 'iamcco/mathjax-support-for-mkdp'
Plug 'iamcco/markdown-preview.vim'
"Plug 'neoclide/coc.nvim', {'branch': 'release'}

" Initialize plugin system
call plug#end()


colorscheme molokai "neon evening molokai solarized molokai github lucius

filetype plugin indent on     " required

"set runtimepath^=~/.vim/bundle/ag
set runtimepath^=~/.vim/plugged/ag

"path{
set path=./,../,
"set path=./,/usr/include,,..,../lualib,
"}
" vim-indent-guides {
"let g:indent_guides_enable_on_vim_startup = 1 "添加行，vim启动时启用
"let g:indent_guides_start_level = 1           "添加行，开始显示对齐线的缩进级别
"let g:indent_guides_guide_size = 1            "添加行，对齐线的宽度，（1字符）
"let g:indent_guides_tab_guides = 0            "添加行，对tab对齐的禁用
"}
"
"indentLine{
"let g:indentLine_char='|'
let g:indentLine_char='|'
let g:indentLine_enabled = 1
"}

"ctrlp{
let g:ctrlp_cmd = 'CtrlP'
let g:ctrlp_map = '<c-p>'
set wildignore+=*.o,*.exe,*.git,*.pdb,*.bak,*.so,*.a
let g:ctrlp_by_filename = 1 " only lookup file name
let g:ctrlp_max_height = 15
let g:ctrlp_clear_cache_on_exit = 0
let g:ctrlp_cache_dir = $HOME.'/.ctrlp/cache/'
let g:ctrlp_working_path_mode = 'rw'

let g:ctrlp_custom_ignore = {
            \ 'dir':  '\v[\/]\.(git|hg|svn)$',
            \ 'file': '\v\.(exe|so|dll|bak|gds|lib|suo|exp)$',
            \ 'link': 'SOME_BAD_SYMBOLIC_LINKS',
            \ }
"}


"调用ag进行搜索提升速度，同时不使用缓存文件
if executable('ag')
    set grepprg=ag\ --nogroup\ --nocolor
    let g:ctrlp_user_command = 'ag %s -l --nocolor -g ""'
    let g:ctrlp_use_caching = 0
endif


"ctags{
set tags=tags;
"set autochdir
nnoremap <silent> <F12> :A<CR>
":set grepprg=grep\ -nri
""""""""""""""""""""""""""""""
" Tag list (ctags)
" """"""""""""""""""""""""""""""
let Tlist_Ctags_Cmd = '/usr/bin/ctags'

"Tagbar
let g:tagbar_ctags_bin = '/usr/bin/ctags'
let Tlist_Show_One_File = 1
"不同时显示多个文件的tag，只显示当前文件的
"let Tlist_Exit_OnlyWindow = 1
"如果taglist窗口是最后一个窗口，则退出vim
let Tlist_Use_Right_Window = 1         "在右侧窗口中显示taglist窗口
let Tlist_File_Fold_Auto_Close=1
"让不被编辑的文件的方法列表自动折叠起来
let Tlist_Show_Menu=1                  "显示taglist菜单
let Tlist_Auto_Open=0                  "启动vim自动启动TagList

let g:NERDTreeWinSize = 30
let g:tagbar_width = 20
let g:tagbar_type_lua = {
            \ 'ctagstype' : 'lua',
            \ 'kinds' : [
            \ 'm:modules:0:0',
            \ 'f:functions:0:1',
            \ 'v:locals:0:0'
            \ ],
            \ 'sort' : 0
            \ }

let g:lua_inspect_events = ''

let mapleader=" "

" tips plug
"let g:pmenu_scheme = 'dark'
"let g:pmenu_scheme = 'macos'
"map <Tab>   <Plug>EasyCompTabTrigger
"imap <S-Tab> <Plug>EasyCompShiftTabTrigger
" easycompelte end============

" neocomplcache
let g:neocomplcache_enable_at_startup = 1
let g:neocomplcache_enable_auto_select = 1
"let g:neocomplcache_enable_quick_match = 1

let g:ag_prg='ag --column'
let g:ag_working_path_mode='r'

"git gutter
nmap ]c <Plug>GitGutterNextHunk
nmap [c <Plug>GitGutterPrevHunk

" syntastic
"set statusline+=%-10.3n
set statusline+=%#warningmsg#
set statusline+=%{SyntasticStatuslineFlag()}
set statusline+=%*

let g:syntastic_always_populate_loc_list = 1
let g:syntastic_auto_loc_list = 1
let g:syntastic_check_on_open = 1
let g:syntastic_check_on_wq = 0

"设置error和warning的标志
let g:syntastic_enable_signs = 1
let g:syntastic_error_symbol='✗'
let g:syntastic_warning_symbol='►'

"no-unused-args 忽略不使用的参数
"no-redefined 忽略重定义
"no-max-line-length 忽略每行最长的检测
"ignore 542 551 忽略if条件的body为空(如...elseif ret == nil then end，then和end中间没有语句)；忽略空语句(如;)，如果用了;则成对出现该语法检测warning
"有语法错误的一行左侧栏会有S&gt;标识，光标移动到改行，vim下发会给出提示。修改正确后保存，则该'S&gt;'会消失。
"let g:syntastic_lua_checkers = ["luac", "luacheck"]
let g:syntastic_lua_checkers = ["/use/bin/luac5.4.3", "luacheck"]
"let g:syntastic_lua_luacheck_args =
"--codes --no-max-comment-line-length --ignore 542 551"
let g:syntastic_lua_luacheck_args = "--codes"
"go checker
let g:syntastic_go_checkers = ["govet", "errcheck","go"]

"c
"let g:syntastic_c_compiler =['gcc', 'clang', 'make']
"let g:syntastic_c_compiler_options ='-Wpedantic -g'
let g:syntastic_c_compiler_options ='-std=gnu99'
let g:syntastic_c_include_dirs=['/usr/include/']
let g:syntastic_c_config_file='.syntastic_c_config_file'

"cpp
let g:syntastic_cpp_include_dirs = ['/usr/include/']
let g:syntastic_cpp_remove_include_errors = 1
let g:syntastic_cpp_check_header = 1
let g:syntastic_cpp_compiler = 'clang++'
let g:syntastic_cpp_compiler_options = '-std=c++11 -stdlib=libstdc++'
" syntastic end

"F3自动格式化代码并保存
noremap <F3> :Autoformat<CR>:w<CR>
let g:autoformat_verbosemode=1
"自动格式化lua代码，针对所有支持的文件
au BufWrite *.lua :Autoformat

" autoformat 操作符2边加空格
let g:formatdef_allman = '"astyle --style=allman --pad-oper"'
let g:autoformat_autoindent = 1
let g:autoformat_retab = 0
let g:autoformat_remove_trailing_spaces = 1

"指定lua格式化工具
let g:formatdef_my_lua= '"luafmt --stdin -l 80"'
let g:formatters_lua= ['my_lua']

"map <C-F12> :!ctags -R --c++-kinds=+p --fields=+iaS --extra=+q.<CR>
map <C-F12> :!ctags -R --fields=+iaS --extra=+q.<CR>
"Press space twice to jump to the next '<++>' and edit it
map <LEADER><LEADER> <Esc>/<++><CR>:nohlsearch<CR>c4l

set tabstop=4
set softtabstop=4
set shiftwidth=4
set noexpandtab
set expandtab
set autoindent
set cindent
set cc=80
set list
set listchars=tab:>-,trail:-

set nocompatible
set noswapfile
set nobackup
set nowritebackup
set noundofile
set fileencodings=ucs-bom,utf-8,cp936,gb18030,big5,euc-jp,euc-kr,latin1
" before vim 8.1 modellines bug
set modelines=0
set nomodeline
"inoremap :setl pastegi+:setl nopastegi
"
inoremap jk <ESC>

" vimdiff begin {
map silent<leader>1 :diffget 1<CR>:diffupdate<CR>
map silent<leader>2 :diffget 2<CR>:diffupdate<CR>
map silent<leader>3 :diffget 3<CR>:diffupdate<CR>
map silent<leader>4 :diffget 4<CR>:diffupdate<CR>
"} vimdiff end


" fzf_begin{
map <leader>f :Rg<CR>
map <leader>p :Files<CR>
map <leader>b :Buffers<CR>
" Empty value to disable preview window altogether
" let g:fzf_preview_window = ''
"
" Always enable preview window on the right with 60% width
let g:fzf_preview_window = 'right:60%'
command! -bang -nargs=* Ag
            \ call fzf#vim#ag(<q-args>,
            \                 <bang>0 ? fzf#vim#with_preview('up:60%')
            \                         : fzf#vim#with_preview('right:50%:hidden', '?'),
            \                 <bang>0)
let g:fzf_layout = {'down':'40%'}
map <leader>a :Ag<CR>
nnoremap <silent> <Leader>A :Ag<CR>
" fzf_end}

"{ Leaderf_begin
"let g:Lf_ShortcutF = '<C-P>'
let g:Lf_ShortcutF = '<C-F>'
map <leader>F :Leaderf! rg<CR>
"{ Leaderf_end

"{ rainbow_begin
let g:rbpt_colorpairs = [
            \ ['brown',       'RoyalBlue3'],
            \ ['Darkblue',    'SeaGreen3'],
            \ ['darkgray',    'DarkOrchid3'],
            \ ['darkgreen',   'firebrick3'],
            \ ['darkcyan',    'RoyalBlue3'],
            \ ['darkred',     'SeaGreen3'],
            \ ['darkmagenta', 'DarkOrchid3'],
            \ ['brown',       'firebrick3'],
            \ ['gray',        'RoyalBlue3'],
            \ ['darkmagenta', 'DarkOrchid3'],
            \ ['Darkblue',    'firebrick3'],
            \ ['darkgreen',   'RoyalBlue3'],
            \ ['darkcyan',    'SeaGreen3'],
            \ ['darkred',     'DarkOrchid3'],
            \ ['red',         'firebrick3'],
            \ ]

let g:rbpt_max = 16
let g:rbpt_loadcmd_toggle = 0
au VimEnter * RainbowParenthesesToggle
au Syntax * RainbowParenthesesLoadRound
au Syntax * RainbowParenthesesLoadSquare
au Syntax * RainbowParenthesesLoadBraces
"{ rainbow_end

"ale begin
"https://github.com/tvatter/ale#faq-quickfix
" Write this in your vimrc file
"let g:ale_set_loclist = 0
"let g:ale_set_quickfix = 1
"
"let g:ale_open_list = 1
" Set this if you want to.
" " This can be useful if you are combining ALE with
" " some other plugin which sets quickfix errors, etc.
"let g:ale_keep_list_window_open = 1
"nmap <silent> <C-k> <Plug>(ale_previous_wrap)
"nmap <silent> <C-j> <Plug>(ale_next_wrap)
"ale end

" 关闭json隐藏引号
let g:vim_json_conceal = 0

"path指定查找的路径，详情help path
" includeexpr是尝试替换路径名中的.为/，详情help includeexpr
set includeexpr=substitute(v:fname,'\\.','/','g')
" suffixesadd为尝试路径后缀，详情help suffixesadd
set suffixesadd=.lua
set suffixesadd+=.proto
if filereadable("./.workspace.vim")
    source ./.workspace.vim
endif

"""""""""""""""""""""""""""""""
"NerdTree setting
""""""""""""""""""
set encoding=utf-8
set termencoding=utf-8
set fileencoding=chinese
set fileencodings=ucs-bom,utf-8,chinese
set langmenu=zh_CN.utf-8
"language messages zh_cn.utf-8

"Show line number.
let g:NERDTreeShowlineNumber=1

"Show hide file.
let g:NERDTreeHidden=1

"Show Node model.
let NERDTreeDirArrows=0

"Delete help information at the top
let NERDTreeMinimalUI=1

let g:NERDTreeDirArrowExpandable = '|'
let g:NERDTreeDirArrowCollapsible = '/'

"""""""""""""""""""""""""""""""
"end NerdTree setting
"""""""""""""""""""""""""""""""

"""""""""""""""""""""""""""""""
"nerdtree-git-plugin setting
"""""""""""""""""""""""""""""""
let g:NERDTreeGitStatusIndicatorMapCustom = {
            \ "Modified"  : "✹",
            \ "Staged"    : "✚",
            \ "Untracked" : "✭",
            \ "Renamed"   : "➜",
            \ "Unmerged"  : "═",
            \ "Deleted"   : "✖",
            \ "Dirty"     : "✗",
            \ "Clean"     : "✔︎",
            \ "Unknown"   : "?"
            \ }
"""""""""""""""""""""""""""""""
"end nerdtree-git-plugin setting
"""""""""""""""""""""""""""""""

""""""""""""""""""""""""""""""
"vim-nerdtree-syntax-highlight settings
""""""""""""""""""""""""""""""
"Highlight full name (not only icons). You need to add this if you don't have vim-devicons and want highlight.
let g:NERDTreeFileExtensionHighlightFullName = 1
let g:NERDTreeExactMatchHighlightFullName = 1
let g:NERDTreePatternMatchHighlightFullName = 1

"Highlight full name (not only icons). You need to add this if you don't have vim-devicons and want highlight.
let g:NERDTreeHighlightFolders = 1

"highlights the folder name
let g:NERDTreeHighlightFoldersFullName = 1

"you can add these colors to your .vimrc to help customizing
let s:brown = "905532"
let s:aqua =  "3AFFDB"
let s:blue = "689FB6"
let s:darkBlue = "44788E"
let s:purple = "834F79"
let s:lightPurple = "834F79"
let s:red = "AE403F"
let s:beige = "F5C06F"
let s:yellow = "F09F17"
let s:orange = "D4843E"
let s:darkOrange = "F16529"
let s:pink = "CB6F6F"
let s:salmon = "EE6E73"
let s:green = "8FAA54"
let s:Turquoise = "40E0D0"
let s:lightGreen = "31B53E"
let s:white = "FFFFFF"
let s:rspec_red = "FE405F"
let s:git_orange = "F54D27"
let s:gray = "808A87"

let g:NERDTreeExtensionHighlightColor = {} " this line is needed to avoid error
let g:NERDTreeExtensionHighlightColor['o'] = s:gray " sets the color of o files to blue
let g:NERDTreeExtensionHighlightColor['h'] = s:blue " sets the color of h files to blue
let g:NERDTreeExtensionHighlightColor['c'] = s:green " sets the color of c files to blue
let g:NERDTreeExtensionHighlightColor['cpp'] = s:green " sets the color of cpp files to blue
let g:NERDTreeExtensionHighlightColor['c++'] = s:green " sets the color of c++ files to blue
""""""""""""""""""""""""""""""
"end vim-nerdtree-syntax-highlight settings
""""""""""""""""""""""""""""""

""""""""""""""""""""""""""""""
"vim-devicons settings
""""""""""""""""""""""""""""""`
set encoding=UTF-8

"Can be enabled or disabled
let g:webdevicons_enable_nerdtree = 1

"whether or not to show the nerdtree brackets around flags
let g:webdevicons_conceal_nerdtree_brackets = 1

"adding to vim-airline's tabline
let g:webdevicons_enable_airline_tabline = 1

"adding to vim-airline's statusline
let g:webdevicons_enable_airline_statusline = 1

""""""""""""""""""""""""""""""
"end vim-devicons settings
""""""""""""""""""""""""""""""`


" 开启搜索预览
set incsearch
```



---

> 作者: cfanzp  
> URL: http://111.230.8.71:8889/config-vimrc/  

