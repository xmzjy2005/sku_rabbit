

import { createApp } from 'vue'
import { createPinia } from "pinia"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from "./router"

//引入初始化样式文件
import '@/styles/common.scss'
import {lazyPlugin} from "@/directives"


//创建vue应用实例，传入根组件
const app = createApp(App)
//安装插件
//安装pinia 存储库
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
//使用懒加载插件
app.use(lazyPlugin)
//将实例挂载在一个容器元素中
app.mount('#app')


