# Hugo主题FixIt简单介绍


<!--more-->
# Hugo主题FixIt
之前一直在用的是LoveIt主题,最近在搜索LoveIt主题的用法时，偶尔发现了FixIt主题，因为LoveIt已经有很久没有更新了，而FixIt主题是LoveIt主题的fork版本。目前我的主题已经切换到了FixIt主题了。

## 为什么会换成FixIt主题?
我换成FixIt主题的主要原因有以下几点原因。

###  1. 支持mermaid
这个遇到要画图的场景还是特别的有用的，具体可以参考一下这篇文章，介绍得非常清楚了: https://pre.fixit.lruihao.cn/zh-cn/extended-shortcode-mermaid/
- graph
```markdown
{{</* mermaid */>}}
graph LR
  Hugo-->FixIt
  FixIt-->支持子菜单
  FixIt-->支持memaid
{{</* /mermaid */>}}
```
效果图:
{{< mermaid >}}
graph LR
  Hugo-->FixIt
  FixIt-->支持子菜单
  FixIt-->支持memaid
{{</ mermaid >}}


- pie饼图:
```markdown
{{</* mermaid */>}}
pie
  "Linux" : 15
  "Skynet" : 8
  "Vim" : 6
{{</* /mermaid */>}}
```

{{< mermaid >}}
pie
  "Linux" : 15
  "Skynet" : 8
  "Vim" : 6
{{< /mermaid >}}

### 2. 支持echats
{{< echarts >}}
{
    "title": {
        "text": "分类统计图",
            "top": "2%",
            "left": "center"
    },
        "tooltip": {
            "trigger": "axis"
        },
        "legend": {
            "data": ["Linux", "Skynet", "Vim"],
            "top": "10%"
        },
        "grid": {
            "left": "5%",
            "right": "5%",
            "bottom": "5%",
            "top": "20%",
            "containLabel": true
        },
        "toolbox": {
            "feature": {
                "saveAsImage": {
                    "title": "保存为图片"
                }
            }
        },
        "xAxis": {
            "type": "category",
            "boundaryGap": false,
            "data": ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        "yAxis": {
            "type": "value"
        },

        "series": [
        {
            "name": "Linux",
            "type": "line",
            "stack": "总量",
            "data": [150, 232, 201, 154, 190, 330, 410]
        },
        {
            "name": "Skynet",
            "type": "line",
            "stack": "总量",
            "data": [320, 332, 301, 334, 390, 330, 320]
        },
        {
            "name": "Vim",
            "type": "line",
            "stack": "总量",
            "data": [820, 932, 901, 934, 1290, 1330, 1320]
        }
    ]
}
{{< /echarts >}}


### 2. config配置支持添加公安备案
### 3. 配置文件更加简洁
### 4. 菜单更友好
- 菜单支持icon
- 可以配置二级菜单,二级菜单设置好parent属性，parent的值设置为父级菜单的identifier属性就可以了。
```toml
[menu]
  [[menu.main]]
    identifier = "posts"
    # you can add extra information before the name (HTML format is supported), such as icons
    pre = ""
    # you can add extra information after the name (HTML format is supported), such as icons
    post = ""
    name = "所有文章"
    url = "/posts/"
    # title will be shown when you hover on this menu link
    title = ""
    weight = 1
    [menu.main.params]
      icon = "fa-solid fa-archive"

  [[menu.main]]
    identifier = "categories"
    pre = ""
    post = ""
    name = "分类"
    url = "/categories/"
    title = ""
    weight = 2
    [menu.main.params]
      icon = "fa-solid fa-th"


  [[menu.main]]
    parent = "categories"
    identifier = "linux"
    pre = "<i class='fa-brands fa-readme fa-fw fa-sm'></i>"
    post = ""
    name = "linux"
    url = "/categories/linux/"
    title = ""
    weight = 201


  [[menu.main]]
    parent = "categories"
    identifier = "skynet"
    pre = "<i class='fa-brands fa-readme fa-fw fa-sm'></i>"
    post = ""
    name = "skynet"
    url = "/categories/skynet/"
    title = ""
    weight = 202

  [[menu.main]]
    parent = "categories"
    identifier = "vim"
    pre = "<i class='fa-brands fa-readme fa-fw fa-sm'></i>"
    post = ""
    name = "vim"
    url = "/categories/vim/"
    title = ""
    weight = 203


  [[menu.main]]
    parent = "categories"
    identifier = "development-manual"
    pre = "<i class='fa-brands fa-readme fa-fw fa-sm'></i>"
    post = ""
    name = "开发手册"
    url = "/categories/development-manual/"
    title = ""
    weight = 204

  [[menu.main]]
    identifier = "tags"
    pre = ""
    post = ""
    name = "标签"
    url = "/tags/"
    title = ""
    weight = 3
    [menu.main.params]
      icon = "fa-solid fa-tags"
  [[menu.main]]
    identifier = "about"
    pre = ""
    post = ""
    name = "关于"
    url = "/about/"
    title = ""
    weight = 7
    [menu.main.params]
    icon = "fa-solid fa-user-tie"
  [[menu.main]]
    identifier = "search"
    pre = "<i class='fas fa-fw fa-search'></i>"
    post = ""
    name = "搜索"
    url = "/search/"
    title = "搜索"
    weight = 8
```

### echats demo
demo1:
{{< echarts >}}
{
    "title": {
        "text": "统计图",
            "top": "2%",
            "left": "center"
    },
        "tooltip": {
            "trigger": "axis"
        },
        "legend": {
            "data": ["Baseline","Step"],
            "top": "10%"
        },
        "grid": {
            "left": "5%",
            "right": "5%",
            "bottom": "5%",
            "top": "20%",
            "containLabel": true
        },
        "toolbox": {
            "feature": {
                "saveAsImage": {
                    "title": "保存为图片"
                }
            }
        },
        "xAxis": {
            "type": "category",
            "boundaryGap": false,
            "data": ["9.1", "9.2", "9.3", "9.4", "9.5", "9.6", "9.7","9.8"]
        },
        "yAxis": {
            "type": "value"
        },

        "series": [
        {
            "name": "BaseLine",
            "type": "line",
            "stack": "check",
            "data": [10000, 10000, 10000, 10000, 10000,10000, 10000,10000]
        },

        {
            "name": "Step",
            "type": "line",
            "stack": "总量",
            "data": [6845, 3235, 6463, 5283, 2823,9137, 13155,10898]
        }
    ]
}
{{< /echarts >}}

demo2:

{{< echarts >}}
{
    "title": {
        "text": "统计图",
            "top": "2%",
            "left": "center"
    },
        "tooltip": {
            "trigger": "axis"
        },
        "legend": {
            "data": ["BaseLine","Step"],
            "top": "10%"
        },
        "grid": {
            "left": "5%",
            "right": "5%",
            "bottom": "5%",
            "top": "20%",
            "containLabel": true
        },
        "toolbox": {
            "feature": {
                "saveAsImage": {
                    "title": "保存为图片"
                }
            }
        },
        "xAxis": {
            "type": "category",
            "boundaryGap": false,
            "data": ["9.1", "9.2", "9.3", "9.4", "9.5", "9.6", "9.7","9.8"]
        },
        "yAxis": {
            "type": "value"
        },

        "series": [
        {
            "name": "BaseLine",
            "type": "bar",
            "stack": "check",
            "data": [10000, 10000, 10000, 10000, 10000,10000, 10000,10000]
        },

        {
            "name": "Step",
            "type": "bar",
            "stack": "总量",
            "data": [6845, 3235, 6463, 5283, 2823,9137, 13155,10898]
        }
    ]
}
{{< /echarts >}}


demo3:

{{< echarts >}}
{
    "title": {
        "text": "tags-2022-09-09",
        "top": "2%",
        "left": "center"
    },
    "tooltip": {
        "trigger": "item"
    },
    "legend": {
        "bottom":"0",
            "left": "center"
    },
    "toolbox": {
        "feature": {
            "saveAsImage": {
                "title": "保存为图片"
            }
        }
    },

    "series": [{
        "name": "tags",
        "type": "pie",
        "stack": "count",
        "data": [
            {"value":17, "name":"linux"},
            {"value":9, "name":"skynet"},
            {"value":8, "name":"lua"},
            {"value":7, "name":"devtools"},
            {"value":6, "name":"terminal"},
            {"value":5, "name":"nginx"},
            {"value":4, "name":"git"},
            {"value":2, "name":"config"},
            {"value":2, "name":"go"},
            {"value":2, "name":"hugo"},
            {"value":2, "name":"i3wm"},
            {"value":2, "name":"mac"},
            {"value":2, "name":"mysql"},
            {"value":2, "name":"tmux"},
            {"value":2, "name":"ubuntu"},
            {"value":2, "name":"快捷键"},
            {"value":1, "name":"ag"},
            {"value":1, "name":"bc"},
            {"value":1, "name":"du"},
            {"value":1, "name":"fixit"},
            {"value":1, "name":"flameshot"},
            {"value":1, "name":"ftp"},
            {"value":1, "name":"github"},
            {"value":1, "name":"gitlab"},
            {"value":1, "name":"health"},
            {"value":1, "name":"http"},
            {"value":1, "name":"i3status"},
            {"value":1, "name":"image"},
            {"value":1, "name":"joplin"},
            {"value":1, "name":"language"},
            {"value":1, "name":"硬件"}
        ]
    }
    ]
}
{{< /echarts >}}



demo4:

{{< echarts >}}
{
    "title": {
        "text": "categories-2022-09-09",
        "top": "2%",
        "left": "center"
    },
    "tooltip": {
        "trigger": "item"
    },
    "legend": {
        "bottom":"0",
            "left": "center"
    },
    "toolbox": {
        "feature": {
            "saveAsImage": {
                "title": "保存为图片"
            }
        }
    },

    "series": [{
        "name": "categories",
        "type": "pie",
        "stack": "count",
        "data": [
            {"value":17, "name":"linux"},
            {"value":15, "name":"开发工具"},
            {"value":9, "name":"lua"},
            {"value":9, "name":"skynet框架"},
            {"value":7, "name":"vim"},
            {"value":5, "name":"nginx"},
            {"value":5, "name":"terminal"},

            {"value":4, "name":"language"},

            {"value":2, "name":"git"},
            {"value":2, "name":"go"},

            {"value":2, "name":"hugo"},
            {"value":2, "name":"mac"},
            {"value":2, "name":"tmux"},

            {"value":1, "name":"health"},
            {"value":1, "name":"i3wm"},
            {"value":1, "name":"lsof"},
            {"value":1, "name":"mysql"},
            {"value":1, "name":"redis"},

            {"value":1, "name":"硬件"}
        ]
    }
    ]
}
{{< /echarts >}}





## 总结
目前我自己也只是粗略地了解了一下Hugo和它的FixIt主题，其中还有许多细节的东西还不是特别地清楚。后续有空了再折腾一下细节。

## 参考
- https://pre.fixit.lruihao.cn/zh-cn/posts/
- https://lruihao.cn/posts/
- https://pre.fixit.lruihao.cn/zh-cn/extended-shortcode-echarts/


---

> 作者:   
> URL: http://111.230.8.71:8889/hugo-theme-fixit/  

