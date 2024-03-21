import axios from 'axios'
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'
// import 'element-plus/theme-chalk/el-message.css'
import {useUserStore} from "@/stores/user"
import router from '@/router'
//创建实例
const httpInstance = axios.create({
    baseURL:'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout:5000
})

// axios请求拦截器
//// 在发送请求之前做些什么
httpInstance.interceptors.request.use(config=>{
    const userStore = useUserStore()
    console.log(userStore)
    const token = userStore.userInfo.token
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
},e => Promise.reject(e))
//axios响应拦截器
httpInstance.interceptors.response.use(res=> res.data,e=>{
    //统一错误提示
    ElMessage({
        type:'warning',
        message:e.response.data.message
    })
    //token失效 401接口返回报错
    if(e.response.status === 401){
        console.log('token invalid');
        //1.清除用户数据
        const userStore = useUserStore()
        userStore.clearUserInfo()
        //2.跳转登录页
        router.push('/login')
    }
    return Promise.reject(e)
})

export default httpInstance