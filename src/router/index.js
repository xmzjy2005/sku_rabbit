//createRouter 创建router的实例对象
//createWebHashHistory 创建history模式的路由 模式有hash跟history
import {createRouter,createWebHistory} from "vue-router"
//导入组件
import Login from '@/views/Login/index.vue'
import Layout  from '@/views/Layout/index.vue'
import Category from '@/views/Category/index.vue'
import Home from '@/views/Home/index.vue'
import SubCategory from '@/views/SubCategory/index.vue'
import Detail from '@/views/Detail/index.vue'
import CartList from '@/views/CartList/index.vue'
import CheckOut from '@/views/CheckOut/index.vue'
import Pay from '@/views/Pay/index.vue'
import PayBack from '@/views/Pay/PayBack.vue'
import Member from '@/views/Member/index.vue'
//D:\front_end_project\vue_rabbit\src\views\Member\Components\UserInfo.vue
import UserInfo from '@/views/Member/Components/UserInfo.vue'
import UserOrder from '@/views/Member/Components/UserOrder.vue'

const router = createRouter({
    history:createWebHistory((import.meta.env.BASE_URL)),
    routes:[
        {
            path:'/',//一级路由
            component:Layout,
            children:[//二级路由
                {
                    path:'',
                    component:Home
                },
                {
                    path:'category/:id',
                    component:Category
                },
                {
                    path:'category/sub/:id',
                    component:SubCategory
                },
                {
                    path:'detail/:id',
                    component:Detail
                },
                //购物车
                {
                    path:'cartList',
                    component:CartList
                },
                //订单确认页
                {
                    path:'checkout',
                    component:CheckOut
                },
                {
                    path:'pay',
                    component:Pay
                },
                {
                    path:'paycallback',
                    component:PayBack
                },
                {
                    path:'member',
                    component:Member,
                    children:[
                        {
                            path:'',
                            component:UserInfo
                        },
                        {
                            path:'order',
                            component:UserOrder
                        },
                    ]
                }


            ]
        },
        {
            path:'/login',
            component:Login
        }
    ],
    scrollBehavior(){
        return {
            top:0
        }
    }
})

export default router