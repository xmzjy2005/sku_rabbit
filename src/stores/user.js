//管理用户数据相关
import {defineStore} from 'pinia'
import {loginAPI} from '@/apis/user'
import {ref} from 'vue'
import {useCartStore} from "./cart"
import {mergeCartAPI} from "../apis/cart"
export const useUserStore = defineStore('user',()=>{
    const cartStore = useCartStore()
    //1.定义state
    const userInfo = ref({})
    //2.定义获取接口数据的action函数
    const getUserInfo = async ({account,password})=>{
        const res = await loginAPI({account,password})
        userInfo.value = res.result
        //调取合并接口
        await mergeCartAPI(cartStore.cartList.map((item)=>{
            return {
                skuId:item.skuId,
                selected:item.selected,
                count:item.count
            }
        }))
        //重新从api覆盖到pinia 的list
        cartStore.updateNewList()
    }
    //3.以对象的格式把state 跟 action return
    const clearUserInfo = ()=>{
        userInfo.value = {}
        cartStore.clearCart()
    }
    return {
        userInfo,
        clearUserInfo,
        getUserInfo
    }
},{
    persist: true,
})