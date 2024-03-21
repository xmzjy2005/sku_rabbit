//懒加载插件

import {useIntersectionObserver} from "@vueuse/core/index"

export const lazyPlugin = {
    install(app,options){
        app.directive('img-lazy',(el,bind)=>{
            const {stop} = useIntersectionObserver(
                el,
                ([{ isIntersecting }], observerElement) => {
                    console.log(isIntersecting)
                    if(isIntersecting){
                        el.src = bind.value
                        stop()
                    }
                },
            )
        })
    }
}