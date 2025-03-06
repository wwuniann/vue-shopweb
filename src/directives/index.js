//定义懒加载插件
import { useIntersectionObserver } from '@vueuse/core'

export const lazyPlugin = {
    install (app) {
        //懒加载指令逻辑
        app.directive('img-lazy', {
            mounted (el,binding) {
                //el: 指令绑定的那个元素 img
                //binding: binding.value 指令等于后面绑定的表达式的值 图片url
                const { stop } = useIntersectionObserver(
                    el,
                    ([ entry ]) => {
                      console.log(entry.isIntersecting) //打印true或者false值即是否监听到
                      //返回true则图片被监听到，这时就发送请求获取图片
                      if(entry.isIntersecting){
                        el.src = binding.value
                        //监听完毕后停止监听
                        stop()
                      }
                    },
                  )
            }
            })
    }
}