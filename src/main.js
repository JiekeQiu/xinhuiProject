import { createApp } from 'vue'
// 引入路由
import router from './routers/router.js';
// 引入ele
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入eleIcon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//在main.js中引入中文方法即可
import locale from 'element-plus/lib/locale/lang/zh-cn'

//防多次点击，重复提交
// import preventReClick from './store/preventReClick' 
// 引入boostrap
// import "bootstrap"
// import "bootstrap/dist/css/bootstrap.css";
// 引入axios
import axios from 'axios';
import App from './App.vue'
// 引入vuex
import Store from "./store/Storage.js"
// 引入avue

import Avue from '@smallwei/avue'
// import '@smallwei/avue/lib/index.css
const app = createApp(App)
// 注册icon图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.config.globalProperties.$http = axios
// 全局挂载ele
app.use(ElementPlus,{ locale })
app.use(Avue)
app.use(Store)
// app.use(preventReClick)
// 全局挂载路由
app.use(router)
app.mount('#app')
