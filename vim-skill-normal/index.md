# vim常用技巧


<!--more-->
# vim常用技巧
## 如何在多行结尾添加内容？
有的时候想把列表改成表格，这个时候，想在每行行末加上|怎么加呢，这里利用可视模式来解决问题:
1. 可视模式选中所有的行
2. `:`进入底行模式
3. `s/$/|/gc`

如果是想在行首插入|可以用列模式或者把第3步的`$`换成`^`

## 如何复制当前的单词到底行模式？
1. 命令模式用`yw`复制单词
2. `:`进入底行模式
3.  `Ctrl+r+Ctrl+w`粘贴
```
yw
:
Ctrl+R+Ctrl+w
```


## 如何复制当前行到底行模式？
1. 命令模式用`yy`复制当前行
2. `:`进入底行模式
3.  `Ctrl+r+"`粘贴
```
yw
:
Ctrl+r+"
```

1. 命令模式用`yw`复制单词

## 寄存器的使用
在 Vim 中，可以使用寄存器别名来方便地访问和操作不同的寄存器。以下是一些常用的寄存器别名：
- "a - "z：小写字母寄存器。可以使用这些寄存器进行复制、剪切和粘贴操作。
- "A - "Z：大写字母寄存器。与小写字母寄存器类似，但是在执行复制或剪切操作时，会追加到当前寄存器的内容后面。
- "0：数字 0 寄存器。保存最近复制的文本。可以使用 "0p 命令将其粘贴。
- ".：点号寄存器。保存最近插入的文本。可以使用 `"." 命令在插入模式下将其插入到光标位置。
- "%：百分号寄存器。保存当前文件名。可以使用 "%p 命令将文件名粘贴到光标位置。
- "_：无名寄存器。用于丢弃不需要的复制或删除操作。
- "* 和 "+：系统剪贴板寄存器。在支持系统剪贴板的环境中，可以使用这两个寄存器与外部应用程序共享剪贴板内容。
- 使用寄存器别名时，可以将其与 Vim 命令和操作符一起使用，例如 "<寄存器别名>yy 复制一行并将其保存到指定的寄存器中，"<寄存器别名>p 将寄存器内容粘贴到光标位置等。
- 要查看当前寄存器的内容，可以执行 :registers 命令或 "<寄存器别名>Ctrl+R 快捷键。
- 这些是 Vim 中常用的一些寄存器别名，可以根据实际需求进行调整和使用。

### 在光标处输出文件名
```
"%p
```

### 在底行模式处输出文件名
```
CTRL+R+%
```

### 在光标处输出最近复制的文本
```
"0p
```

### 在底行模式处输出文件名
```
CTRL+R+0
```




---

> 作者:   
> URL: http://111.230.8.71:8889/vim-skill-normal/  

