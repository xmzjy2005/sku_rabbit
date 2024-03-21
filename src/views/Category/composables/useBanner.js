import {onMounted, ref} from "vue"
import {getBannerAPI} from "@/apis/home"
export default function(){
    //获取banner
    const bannerList = ref([])
    const getBannerList = async () =>{
        const res = await getBannerAPI({
            distributionSite: '2'
        })
        bannerList.value = res.result
    }
    onMounted(()=>getBannerList())

    return {
        bannerList
    }

}