
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

//测试接口函数
// import { getaa } from './apis/testAPI'
// getaa().then(res => {
//     console.log(res)
// })

//引入初始化样式文件
import '@/styles/common.scss'


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

//定义全局指令
import { useIntersectionObserver } from '@vueuse/core'

//检测图片是否被监听到
app.directive('img-lazy', {
    mounted (el,binding) {
        //el: 指令绑定的那个元素 img
        //binding: binding.value 指令等于后面绑定的表达式的值 图片url
        useIntersectionObserver(
            el,
            ([ entry ]) => {
              console.log(entry.isIntersecting)
              //返回true则图片被监听到，这时就发送请求获取图片
              if(entry.isIntersecting){
                el.src = binding.value
              }
            },
          )
    }
    })
