//封装购物车模块
import {defineStore} from "pinia"
import {ref,computed} from 'vue'
import {useUserStore} from "./user"
import {delCartAPI, findNewCartListAPI, insertCartAPI} from "../apis/cart"


export const useCartStore = defineStore('cart',()=>{
    const userStore = useUserStore()
    const isLogin = computed(()=>userStore.userInfo.token)
    //定义state
    const cartList = ref([])
    const updateNewList = async ()=>{
        const res = await findNewCartListAPI()
        cartList.value = res.result
    }
    //定义action
    const addCart = async (goods)=>{
        console.warn(isLogin.value);
        const {skuId,count} = goods
        if(isLogin.value){
            //加入购物车api
            await insertCartAPI({skuId,count})
            //覆盖pinia的cart
            updateNewList()
        }else{
            //如果添加购物车后的回调函数传入的goods与购物车离的cartList某一项匹配
            const item = cartList.value.find((item)=>goods.skuId === item.skuId)
            if(item){
                //匹配，则++
                item.count++
            }else{
                //不匹配，则新增一条
                cartList.value.push(goods)
            }
        }

    }
    //删除
    const delCart = async (skuId)=>{
        if(isLogin.value){
            //调用删除接口
            await delCartAPI([skuId])
            //覆盖pinia list
            updateNewList()

        }else{
            const idx = cartList.value.findIndex((item)=>item.skuId === skuId)
            cartList.value.splice(idx,1)
        }

    }
    //单选
    const singleCheck = (skuId,selected)=>{
        const item = cartList.value.find((item)=>item.skuId === skuId)
        item.selected = selected
    }
    //全选 设置全选框的属性都赋值给单选列表
    const allCheck = (selected)=>{
        cartList.value.forEach((item)=>item.selected=selected)
    }
    //清空购物车
    const clearCart = ()=>{
        cartList.value = []
    }



    //计算属性
    //计算属性得出总和
    const allCount = computed(()=>{
        cartList.value.reduce((a,c)=>a+c.count,0)
    })
    //计算属性得出总价
    const allPrice = computed(()=>cartList.value.reduce((a,c)=>a+c.count*c.price,0))
    //全选属性
    const isAll = computed(()=>cartList.value.every((item)=>item.selected))
    //选中数量合计
    const selectedCount =  computed(()=>cartList.value.filter((item)=>item.selected).reduce((a,c)=>a+c.count,0))
    const selectedPrice = computed(()=>cartList.value.filter((item)=>item.selected).reduce((a,c)=>a+c.count*c.price,0))
    return {
        cartList,
        allCount,
        allPrice,
        allCheck,
        addCart,
        delCart,
        singleCheck,
        isAll,
        selectedCount,
        selectedPrice,
        clearCart,
        updateNewList
    }
},{
    persist:true
})