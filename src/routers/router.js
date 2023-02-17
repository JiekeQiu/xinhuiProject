// 引入路由
import { createRouter, createWebHashHistory } from "vue-router"
//引入路由组件
import login from '../pages/login.vue'
import home from '../pages/home.vue'
// import message from '../components/message.vue'
import inventory  from '../components/inventory.vue'
import navigation from '../components/navigation.vue'
import received from '../components/received.vue'
import goodlist from '../components/goodlist.vue'
import material from '../components/material.vue'
import buhuo from '../components/buhuo.vue'
import output from '../components/output.vue'
import cklist from '../components/ckList.vue'
import ckaddlist from '../components/ckAddList.vue'
import messagelist from '../components/messageList.vue'
import print from '../components/print.vue'
import bill from "../components/bill/common/home.vue"
import infolist from "../components/bill/pages/infoList.vue"
import infomoney from "../components/bill/pages/infoMoney.vue"
import infomonthlist from "../components/bill/pages/infoMonthList.vue"
import billmoney from "../components/bill/pages/billMoney.vue"
import c from '../components/c.vue'


// 定义路由
const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        name: "login",
        path: '/login',
        component: login,
        meta:{title:"登陆页"}
    },
    {
        name: "home",
        path: '/home',
        component: home,
        children: [
            {
                path:"bill",
                name:"bill",
                component:bill,
                meta:{ title:"对账单"},
                children:[
                    {
                      path:"infolist",
                      name:'infolist',
                      component:infolist,
                      meta:{title:'客户详单'} 
                    },{
                        path:"infomoney",
                        name:'infomoney',
                        component:infomoney,
                        meta:{title:'客户订单金额'} 
                    },{
                        path:"infomonthlist",
                        name:'infomonthlist',
                        component:infomonthlist,
                        meta:{title:'客户月详单'} 
                    },{
                        path:"billmoney",
                        name:'billmoney',
                        component:billmoney,
                        meta:{title:'客户订单总金额'} 
                    }
                ]
            },
            {
                path:'received',
                component:received,
                meta:{title:"入库"}
            },
            {
                path:'navigation',
                component:navigation,
                meta:{title:"首页"}
            },{
                path:'inventory',
                component:inventory,
                meta:{title:"库存盘点"}
            },{
                path:'goodlist',
                component:goodlist,
                meta:{title:"入库明细"}
            },
            {
                path:'material',
                component:material,
                meta:{title:"原料入库"}

            },{
                path:'buhuo',
                component:buhuo,
                meta:{title:"入库基础信息"}

            },{
                path:'output',
                component:output,
                meta:{title:"出库单"},
                children:[
                    {
                        path:'ckaddlist',
                        component:ckaddlist
                    },{
                        path:'cklist',
                        component:cklist,
                    },
                    {
                        path:'print',
                        component:print
                    }

                ]
            },{
                path:'messagelist',
                component:messagelist,
                meta:{title:"客户信息"}

            }
        ]

    }
]
// 创建路由实例
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
router.beforeEach((to,from,next)=>{
    let isLogin = window.localStorage.getItem('user');
    // let token = JSON.parse(isLogin).token
    if(to.meta.title){//判断是否有标题
        document.title = to.meta.title
    }
    // console.log('是否登陆了',isLogin)
     if (isLogin) {
        //如果用户信息存在则往下执行。
        
         next()
     } else {
         //如果用户token不存在则跳转到login页面
         if (to.path === '/login') {
                next()
            } else {
                next('/login')
            }
        } 
  })
export default router