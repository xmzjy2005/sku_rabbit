import request from '@/utils/http'
//订单也信息
export const checkOutInfoAPI = ()=>{
    return request({
        url:'/member/order/pre'
    })
}

//创建订单
export const createOrderAPI = (data)=>{
    return request({
        url:'/member/order',
        method:'POST',
        data
    })
}