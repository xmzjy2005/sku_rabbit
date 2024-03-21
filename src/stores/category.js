import {getCategoryAPI} from "@/apis/layout"
import {ref} from 'vue'
import {defineStore} from "pinia"

//定义存储key category 和调取方法
export const useCategoryStore = defineStore('category',()=>{
    //定义存储列表数据
    const categoryList = ref([])
    //action 获取导航数据的方法
    const getCategory =async ()=>{
        const res = await getCategoryAPI()
        categoryList.value = res.result
    }
    return {
        categoryList,
        getCategory
    }
})