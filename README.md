# Ant Design Pro

官方文档 [Ant Design Pro](https://pro.ant.design). Follow is the quick guide for how to use.
<br>
### 前序准备
本项目基于pro v4 2020最新版开发 尽量以官网文档为准
<br/>
我们的技术栈基于 ES2015+、React、UmiJS、dva、g2 和 antd，提前了解和学习这些知识会非常有帮助
## Environment Prepare

Install `node_modules`:

```bash
npm install
```
or

```bash
yarn
```

### Start project

```bash
npm start
```

### Build project

```bash
npm run build
```

## 项目结构
```
   ├── config                   # umi 配置，包含路由，构建等配置
   ├── mock                     # 本地模拟数据
   ├── public
   │   └── favicon.png          # Favicon
   ├── src
   │   ├── assets               # 本地静态资源
   │   ├── components           # 业务通用组件
   │   ├── e2e                  # 集成测试用例
   │   ├── layouts              # 通用布局
   │   ├── models               # 全局 dva model
   │   ├── pages                # 业务页面入口和常用模板
   │   ├── services             # 后台接口服务
   │   ├── utils                # 工具库
   │   ├── global.less          # 全局样式
   │   └── global.ts            # 全局 JS
   ├── tests                    # 测试工具
   ├── README.md
   └── package.json
   
   
   
   BasicLayout 文件 有三处处理
   1）登录校验
           const isLogin = UserInfo && UserInfo.realName;
           //登录校验 (只简单做了 保存用户信息)
           if (!isLogin) {
               // history.push({
               //     pathname:"/user/login"
               // })
           }
   2) 从服务器请求菜单
            // dispatch({
               //   type:'menu/fetchRoutes'
               // });
            对应相应的model   
   3) 权限校验
            //服务端路由没有 && 文件路由有      -->403无权限
               if (!serveRoutes.includes(location.pathname) && baseRoutes.includes(location.pathname)) {
                   if (!authorized.authority) {
                       // setAuthorized(prev=>({...prev,authority:['lack']}))
                   }
               }         
   
   
```
## 代码块
```
——组件定义
1、展示组件（仅用于数据展示，无复杂逻辑，参考Example3.js）
import React from 'react';
const XXX = (props)=>{
    return (
        <>
            <h1>这是展示组件</h1>
        </>
    )
};
2、容器组件（一般一个页面对应一个容器组件，里面会引入其他的展示组件作为子组件，除了数据展示还有复杂的业务逻辑，参考Example1.js）
import React, { Component } from 'react';
class XXX extends Component {
    //定义业务逻辑
    xxx(){
    }
    render() {
        return (
            <div >
               这是容器组件
            </div>
        )
    }
}

——引入样式
1、每个页面都可以引入自己的私有的样式，比如：import '../style/Example1.css'
2、但是因为我们是单页面应用，所以会出现一个问题：样式冲突
    解决方法：1）每个页面组件都需要在根标签中添加一个以组件的名字命名的class，如Example2.js中根节点是<div className={'example2'}>
              2）然后在页面组件的私有样式文件中添加对应的class前缀，如Example2.css中，所有样式都含有.example2前缀





——引入图片等文件，参考Example2.js
1、import logo from '../../../media/images/exampleLogo.svg'
2、<img src={logo}/>




——使用fetch发起服务请求
1、不要用jquery的ajax，为了使用ajax就需要引入jQuery，不值得（对移动端来讲，jq有点大）
2、项目已经配置了一个工具的fetch API，
3、在util下的request对umi-request进行了一个二次封装，




——读取 state 的值，参考Example1.js
    1、首先需要配置mapStateToProps
    const mapStateToProps = (store, ownProps) => {
        return {
            exampleState:store.exampleState
        }
    };
    2、经过mapStateToProps方法的处理，exampleState 已经被添加到this.props中，所以可以直接使用this.props.exampleState读取到整个exampleState





——类型检测，参考Example3.js
引入：import PropTypes from 'prop-types';
使用：
Example3.propTypes = {
       name:PropTypes.string.isRequired,
       age:PropTypes.number
};




——获取路由的参数，参考Example2.js
1、路径参数（适合参数的个数固定不变的情况。比如详情页面带上id）
    1）路由格式：/product/:id
    2）获取：let name = this.props.match.params.id
2、查询参数（适合参数的个数不固定的情况。比如列表页面带上查询参数）
    1）路由格式：/xxxx?key=value
    2）获取：this.props.location.search，获取到的值是?key=value格式的字符串
    3）遗憾的是，我们不能this.props.location.search.age获取到age属性值，只能获取到一个字符串。最后需要自己手动解析成可读参数





——页面跳转(禁止使用a标签跳转，也禁止使用window.location.href手动跳转），参考Example2.js
    1、标签类型的跳转。使用Link，URL会更新，组件会被重新渲染，但是页面不会重新加载。
        1）引入Link：import { Link } from 'react-router-dom'
        2）使用：<Link to='/example1'>点我跳转到example1</Link>
        3）其中to的值就是MenuRouter中配置的路由值

    2、js类型的跳转。
        1）跳转到新页面：this.props.history.push('/example1')
        2）返回上一页：this.props.history.goBack();






——变量修饰符
1、const：定义常量时用
const name = "JasonWang";//const表示常量，类似java的final
name = "hello";//编译出错，常量不能被修改，必须在定义时赋值
2、var：现在一般放在方法外部使用
var name ;//在方法中定义作为局部变量，在方法外定义作为全局变量
name = "JasonWang";//var定义的变量可以修改，如果不初始化会输出undefined，不会报错。
3、let：局部变量尽量用let
let name = "JasonWang";//let是块级作用域，函数内部使用let定义后，对函数外部无影响。
name = "hello"//与var的主要区别就是作用域不同





——使用{}赋值，可同时赋值多个变量
var object = {
    name:"JasonWang",
    age:18,
    address:"xxx"
}
var {name,age} = object 等价 var name = object.name; var age = object.age;




——使用||给变量添加默认值（如果是数字的话，注意0的影响，在js中0会被当成false）
const name = state.name || 'JasonWang'
等价于
const name = state.name;
if (name === null || typeof name === 'undefined' || name === '' || name.length === 0){
    name = 'JasonWang'
}






——方法默认参数
function (a=1,b){}
等价于
function (a,b){
    if (typeof a === 'undefined'){
        a=1;
    }
}



——箭头函数，很多地方都可以使用箭头函数，方便快捷
1、name => console.log(name) 或 (name)=>{console.log(name)}
等价于
function(name){
    console.log(name)
}
2、(a,b) => return a+b
等价于
function(a,b){
    return a+b;
}

——时间格式化
    初始化：重新执行install.bat脚本
    导入：import moment from 'moment'
    使用：moment(order.createTime).format('YYYY-MM-DD HH:mm:ss')
    常用方法参考：http://momentjs.cn/



——对象合并
let data1 = {
    name:'Jason',
    address:'天河区猎德'
};
let data2={
    name:'Jason',
    age:18
};
//对象合并，类似java的 copyProperties(source, target)
let newObj = Object.assign({},data2, data1);
const copyObj = {...newObj}
console.log(data1);
console.log(data2);
console.log(newObj)



——map与forEach区别
let arr = [1, 2, 3, 4];
let mapArr = arr.map(item=>{
    return item * 2;
});
let eachArr = arr.forEach(item=>{
    return item * 2;
});
console.log(arr);// [1, 2, 3, 4]
console.log(mapArr);// [2, 4, 6, 8]
console.log(eachArr);// undefined



——数组追加
const arr1 = [1,2,3];
const arr2 = [4,5,6];
arr1.push(...arr2);
console.log(arr1);//[1,2,3,4,5,6]
```



