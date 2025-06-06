# test1


### steps
{{< echarts >}}
{
    "title": {
        "text": "steps",
            "top": "2%",
            "left": "center"
    },
        "tooltip": {
            "trigger": "axis"
        },
        "legend": {
            "data": ["Min","Max","Step"],
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
            "type": "category", "boundaryGap": false,
            "data": [
                "19-10" , "19-11" , "19-12" ,
                "20-01" , "20-06" , "20-07" , "20-08" , "20-09" , "20-12",
                "21-06" , "21-07" ,
                "22-01" , "22-05"
            ]
        },
        "yAxis": { "type": "value" },

        "series": [

        {
            "name": "Step", "type": "line", "stack": "总量",
            "data": [
                456, 470, 365,
                418, 634, 214, 263, 287, 258,
                499, 338,
                355, 419
            ]
        },

        {
            "name": "Min",
            "type": "line",
            "stack": "min",
            "data": [
                150, 150, 150,
                150, 150,150, 150,150, 150,
                150,150,
                150,150
            ]
        },

        {
            "name": "Max",
            "type": "line",
            "stack": "max",
            "data": [
                430, 430, 430,
                430, 430,430, 430,430, 430,
                430,430,
                430,430
            ]
        }
    ]
}
{{< /echarts >}}


---

> 作者: cfanzp  
> URL: http://111.230.8.71:8889/record-data-info/ls/  

