import {onMounted, ref} from "vue"
import {onBeforeRouteUpdate, useRoute} from "vue-router"
import {categoryAPI} from "@/apis/category"

export default function (){

    const categoryData = ref({})
    const route = useRoute()
    //获取数据
    const getCategory = async (id = route.params.id)=>{
        //传参
        const res = await categoryAPI(id)
        categoryData.value = res.result
    }
    onMounted(()=>getCategory())
    //目标:路由参数变化的时候，重新发送分类数据
    onBeforeRouteUpdate((to)=>{
        getCategory(to.params.id)
    })

    return {
        categoryData
    }
}