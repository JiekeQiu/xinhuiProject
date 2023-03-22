// 引入路由
import { createRouter, createWebHashHistory } from "vue-router"

// 定义路由
const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        name: "login",
        path: '/login',
        component: () => import(/* webpackChunkName: "login" */ '../pages/login.vue'),
        meta:{title:"登陆页"}
    },
    {
        name: "home",
        path: '/home',
        component: () => import(/* webpackChunkName: "home" */ '../pages/home.vue'),
        children: [
            {
                path:"bill",
                name:"bill",
                component: () => import(/* webpackChunkName: "bill" */ '../components/bill/common/home.vue'),
                meta:{ title:"对账单"},
                children:[
                    {
                      path:"infolist",
                      name:'infolist',
                      component: () => import(/* webpackChunkName: "infolist" */ '../components/bill/pages/infoList.vue'),
                      meta:{title:'客户详单'} 
                    },{
                        path:"infomoney",
                        name:'infomoney',
                        component: () => import(/* webpackChunkName: "infomoney" */ '../components/bill/pages/infoMoney.vue'),
                        meta:{title:'客户订单金额'} 
                    },{
                        path:"infomonthlist",
                        name:'infomonthlist',
                        component: () => import(/* webpackChunkName: "infomonthlist" */ '../components/bill/pages/infoMonthList.vue'),
                        meta:{title:'客户月详单'} 
                    },{
                        path:"billmoney",
                        name:'billmoney',
                        component: () => import(/* webpackChunkName: "billmoney" */ '../components/bill/pages/billMoney.vue'),
                        meta:{title:'客户订单总金额'} 
                    }
                ]
            },
            {
                path:'received',
                component: () => import(/* webpackChunkName: "received" */ '../components/received.vue'),
                meta:{title:"入库"}
            },
            {
                path:'navigation',
                component: () => import(/* webpackChunkName: "navigation" */ '../components/navigation.vue'),
                meta:{title:"首页"}
            },{
                path:'inventory',
                component: () => import(/* webpackChunkName: "inventory" */ '../components/inventory.vue'),
                meta:{title:"库存盘点"}
            },{
                path:'goodlist',
                component: () => import(/* webpackChunkName: "goodlist" */ '../components/goodlist.vue'),
                meta:{title:"入库明细"}
            },
            {
                path:"material",
                name:"material",
                component: () => import(/* webpackChunkName: "material" */ '../components/material/common/home.vue'),
                meta:{ title:"原料仓库"},
                children:[
                    {
                        path:"materialhistory",
                        name:'materialhistory',
                        component: () => import(/* webpackChunkName: "materialhistory" */ '../components/material/pages/materialHistory.vue'),
                        meta:{title:'原料入库明细'} 
                    },
                    {
                        path:"materiallist",
                        name:'materiallist',
                        component: () => import(/* webpackChunkName: "materialList" */ '../components/material/pages/materialList.vue'),
                        meta:{title:'原料入库单'} 
                    },
                    {
                        path:"materialgoods",
                        name:'materialgoods',
                        component: () => import(/* webpackChunkName: "materialgoods" */ '../components/material/pages/materialGoods.vue'),
                        meta:{title:'原料库存盘点'} 
                    },
                    {
                        path:"information",
                        name:'information',
                        component: () => import(/* webpackChunkName: "delivery" */ '../components/material/pages/information.vue'),
                        meta:{title:'原料基础信息维护'} 
                    },
                    {
                        path:"delivery",
                        name:'delivery',
                        component: () => import(/* webpackChunkName: "delivery" */ '../components/material/pages/delivery.vue'),
                        meta:{title:'原料出库单'} 
                    },{
                        path:"materialdeliveryHistory",
                        name:'materialdeliveryHistory',
                        component: () => import(/* webpackChunkName: "materialdeliveryHistory" */ '../components/material/pages/materialdeliveryHistory.vue'),
                        meta:{title:'原料出库明细'} 
                    }
                ]
            },{
                path:"hardware",
                name:"hardware",
                component: () => import(/* webpackChunkName: "hardware" */ '../components/hardware/common/home.vue'),
                meta:{ title:"五金仓库"},
                children:[
                    {
                        path:"hardwarehistory",
                        name:'hardwarehistory',
                        component: () => import(/* webpackChunkName: "hardwarehistory" */ '../components/hardware/pages/hardwareHistory.vue'),
                        meta:{title:'五金入库明细'} 
                    },
                    {
                        path:"hardwarelist",
                        name:'hardwarelist',
                        component: () => import(/* webpackChunkName: "hardwareList" */ '../components/hardware/pages/hardwareList.vue'),
                        meta:{title:'五金入库单'} 
                    },
                    {
                        path:"hardwaregoods",
                        name:'hardwaregoods',
                        component: () => import(/* webpackChunkName: "hardwaregoods" */ '../components/hardware/pages/hardwareGoods.vue'),
                        meta:{title:'五金库存盘点'} 
                    },
                    {
                        path:"wjinformation",
                        name:'wjinformation',
                        component: () => import(/* webpackChunkName: "wjinformation" */ '../components/hardware/pages/wjinformation.vue'),
                        meta:{title:'五金基础信息维护'} 
                    },
                    {
                        path:"hardwaredelivery",
                        name:'hardwaredelivery',
                        component: () => import(/* webpackChunkName: "hardwaredelivery" */ '../components/hardware/pages/hardwaredelivery.vue'),
                        meta:{title:'五金出库单'} 
                    },{
                        path:"history",
                        name:'history',
                        component: () => import(/* webpackChunkName: "history" */ '../components/hardware/pages/history.vue'),
                        meta:{title:'五金出库明细'} 
                    }
                ]
            }
            ,{
                path:'buhuo',
                component: () => import(/* webpackChunkName: "buhuo" */ '../components/buhuo.vue'),
                meta:{title:"入库基础信息"}

            },{
                path:'output',
                component: () => import(/* webpackChunkName: "output" */ '../components/output.vue'),
                meta:{title:"出库单"},
                children:[
                    {
                        path:'ckaddlist',
                        component: () => import(/* webpackChunkName: "ckaddlist" */ '../components/ckAddList.vue'),
                    },{
                        path:'cklist',
                        component: () => import(/* webpackChunkName: "cklist" */ '../components/ckList.vue'),
                    },
                    {
                        path:'print',
                        component: () => import(/* webpackChunkName: "print" */ '../components/print.vue'),
                    }

                ]
            },{
                path:'messagelist',
                component: () => import(/* webpackChunkName: "messagelist" */ '../components/messageList.vue'),
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