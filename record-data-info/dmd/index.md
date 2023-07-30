# test3


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
            "data": ["Limit","Min","Max","Step"],
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
                "19-09-1" , "19-10-1" , "19-10-2" , "19-10-3" ,
                "19-11"   , "19-12-1" , "19-12-2" ,
                "20-01"   , "20-05"   , "20-06"   , "20-07"   , "20-08"   ,
                "20-09"   , "20-12"   ,
                "20-01"   , "20-02"   , "21-06"   , "21-07"   ,
                "22-01"   , "22-05"
            ]
        },
        "yAxis": { "type": "value" },

        "series": [

        {
            "name": "Step", "type": "line", "stack": "总量",
            "data": [
                5.9  , 3.35 , 2.95   , 2.50 ,
                2.82 , 3.24 , 3.49,
                3.01 , 3.50 , 3.26 , 2.52 , 2.76 ,
                2.67 , 0.81 ,
                0.89 , 1.30 , 1.33 , 1.19 ,
                2.44 , 1.53
            ]
        },

        {
            "name": "Min",
            "type": "line",
            "stack": "min",
            "data": [
                2.2 , 2.2 , 2.2 , 2.2 ,
                2.2 , 2.2 , 2.2 ,
                2.2 , 2.2 , 2.2 , 2.2 , 2.2,
                2.2 , 2.2 ,
                2.2 , 2.2 , 2.2 , 2.2 ,
                2.2 , 2.2
            ]
        },

        {
            "name": "Max",
            "type": "line",
            "stack": "max",
            "data": [
                3.1 , 3.1 , 3.1 , 3.1 ,
                3.1 , 3.1 , 3.1 ,
                3.1 , 3.1 , 3.1 , 3.1 , 3.1,
                3.1 , 3.1 ,
                3.1 , 3.1 , 3.1 , 3.1 ,
                3.1 , 3.1
            ]
        },


        {
            "name": "Limit",
            "type": "line",
            "stack": "limit",
            "data": [
                1.4 , 1.4 , 1.4 , 1.4 ,
                1.4 , 1.4 , 1.4 ,
                1.4 , 1.4 , 1.4 , 1.4 , 1.4,
                1.4 , 1.4 ,
                1.4 , 1.4 , 1.4 , 1.4 ,
                1.4 , 1.4
            ]
        }

    ]
}
{{< /echarts >}}


---

> 作者: cfanzp  
> URL: https://cfanzp.com/record-data-info/dmd/  

