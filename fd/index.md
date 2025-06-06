# find的替代命令fd


<!--more-->
# find的替代命令fd

## ubuntu20.04 如何安装
```bash
apt install fdfind
ln -s /usr/bin/fdfind /usr/bin/fd
```

## fd用法
```bash
ecs-123:/data/linux_dev_blog# fd --help
fd 7.4.0 
USAGE:
    fd [FLAGS/OPTIONS] [<pattern>] [<path>...]
FLAGS:
    -H, --hidden
            Include hidden directories and files in the search results (default: hidden files and directories are skipped). Files and directories are considered to be hidden if their name starts with a `.` sign (dot).
    -I, --no-ignore 
            Show search results from files and directories that would otherwise be ignored by '.gitignore', '.ignore' or '.fdignore' files.
        --no-ignore-vcs
            Show search results from files and directories that would otherwise be ignored by '.gitignore' files.
    -s, --case-sensitive
            Perform a case-sensitive search. By default, fd uses case-insensitive searches, unless the pattern contains an uppercase character (smart case).
    -i, --ignore-case
            Perform a case-insensitive search. By default, fd uses case-insensitive searches, unless the pattern contains an uppercase character (smart case).
    -g, --glob
            Perform a glob-based search instead of a regular expression search.
        --regex
            Perform a regular-expression based seach (default). This can be used to override --glob.
    -F, --fixed-strings
            Treat the pattern as a literal string instead of a regular expression.
    -a, --absolute-path
            Shows the full path starting from the root as opposed to relative paths.
    -L, --follow    
            By default, fd does not descend into symlinked directories. Using this flag, symbolic links are also traversed.
    -p, --full-path
            By default, the search pattern is only matched against the filename (or directory name). Using this flag, the pattern is matched against the full path.
    -0, --print0
            Separate search results by the null character (instead of newlines). Useful for piping results to 'xargs'.
        --show-errors
            Enable the display of filesystem errors for situations such as insufficient permissions or dead symlinks.
    -h, --help
            Prints help information
    -V, --version
            Prints version information
```
## fzf配置fd
```bash
vim ~/.bashrc
export FZF_DEFAULT_COMMAND='fd --type file --follow --hidden --exclude .git --color=always'
export FZF_DEFAULT_OPTS="--ansi"
```

## 参考
- fd github地址: https://github.com/sharkdp/fd


---

> 作者:   
> URL: http://111.230.8.71:8889/fd/  

