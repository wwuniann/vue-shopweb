//把components中的组件进行全局注册化
//通过插件的方式
import ImageView from '@/components/ImageView/index.vue'
import JxSku from '@/components/JxSku/index.vue'

export const componentPlugin = {
    install(app){
        app.component('JxImageView',ImageView)
        app.component('JxSku',JxSku)
    }
}