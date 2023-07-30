# test2


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
                "19-11",
                "20-01" , "20-06" , "20-07" , "20-08" , "20-09" ,
                "21-01" , "21-02" , "21-03"
            ]
        },
        "yAxis": { "type": "value" },

        "series": [

        {
            "name": "Step", "type": "line", "stack": "总量",
            "data": [
                19.47 ,
                14.16 , 18.81 , 22.99 , 15.98 , 21.85 ,
                11.68 , 14.78 , 16.63
            ]
        },

        {
            "name": "Min",
            "type": "line",
            "stack": "min",
            "data": [
                5 ,
                5 , 5 , 5 , 5 , 5 ,
                5 , 5 , 5
            ]
        },

        {
            "name": "Max",
            "type": "line",
            "stack": "max",
            "data": [
                13.9 ,
                13.9 , 13.9 , 13.9 , 13.9 , 13.9 ,
                13.9 , 13.9 , 13.9
            ]
        }
    ]
}
{{< /echarts >}}


---

> 作者: cfanzp  
> URL: https://cfanzp.com/record-data-info/tx/  

