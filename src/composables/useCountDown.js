import {ref,computed,onUnmounted} from 'vue'
import dayjs from 'dayjs'
export const useCountDown = ()=>{
    let timer = null
    //显示时间
    const time = ref(0)
    //将秒数改为时间
    const formatTime = computed(()=>dayjs.unix(time.value).format('mm分ss秒'))
    //倒计时方法
    const start = (currentTime)=>{
        time.value = currentTime
        timer = setInterval(()=>{
            time.value--
        },1000)
    }
    //组件清除时候，清除定时器
    onUnmounted(()=>{
        timer && clearInterval(timer)
    })
    return {
        formatTime,
        start
    }
}