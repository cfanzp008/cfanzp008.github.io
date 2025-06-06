# Ant Design Pro


<!--more-->
# Ant Design Pro
- 官网: [https://pro.ant.design/zh-CN](https://pro.ant.design/zh-CN/docs/overview/)
- umijs: [https://v3.umijs.org/zh-CN/api](https://pro.ant.design/zh-CN/docs/overview/)

## 需要学习什么？
- Ant Design
- ReactJS

## ReactJS
### Mode
#### 分层
- 后端
  - Controller
  - Service
  - Data Access

- 前端
  - Page
  - Model:负责处理业务逻辑，为Page做数据、状态的读写、变换、暂存等
  - Service

#### 使用DVA进行数据分层
- 官网:dvajs.com
- 仅有6个api
- elm
- 插件机制
- umi已经对dva进行了整合
- 开启dav,修改config.js，加入
```javascript
export default {
plugins: [
    [ 'umi-plugini-react',{
       dva:true
    }]
  ]
};
```

- 在umi中，约定在src/models文件夹中定义model
  - src/models/ListData.js
```javascript
export default{
    namespace: 'list',
       state: {
           data:[1,2,3],
           maxNum:3
   },
  reducers: {
    addNewData(state) {
        let maxNum = state.maxNum + 1;
        left list = [...state.data,maxNum];
        return {
            data : list,
            maxNum:maxNum
        }
    }
 }
}
```

- 导入数据,connect包裹的数据将保存到this.props中, 调用reducers更新数据
```javascript
// 第一个回调函数将page层和model层进行链接，返回model中的数据，并且将放回的数据绑定到this.props
const namespace = "list";
import {connect} from 'dva';
@connect((state)=>{
    return {
        dataList : state['namespace'].data,
        maxNum : state['namespace'].maxNum
    }
},(dispatch)->{ // dispatch可以调用model层定义的函数
    return add : function () { // 将返回的函数绑定到this.props中

    }
})
```

- 调用this.props.add

- ReactJS调用Render渲染

- effects异步加载数据

- umi mock

## 参考
- [Ant Design以及Ant Design Pro入门](https://www.bilibili.com/video/BV164411s7kE)


---

> 作者:   
> URL: http://111.230.8.71:8889/ant-design-pro/  

