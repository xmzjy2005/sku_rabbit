import httpInstance from "@/utils/http"

export function getBannerAPI(params = {}){
    const {distributionSite = '1'} = params
    return httpInstance({
        url:'/home/banner',
        params:{
            distributionSite
        }
    })
}

//新鲜好物
export const newAPI = ()=>{
    return httpInstance({
        url:'/home/new'
    })
}
//人气推荐
export const hotAPI = ()=>{
    return httpInstance({
        url:'home/hot'
    })
}
//首页产品
export const goodsAPI = () =>{
    return httpInstance({
        url:'home/goods'
    })
}