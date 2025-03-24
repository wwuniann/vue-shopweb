
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// 配置 nprogress
NProgress.configure({ showSpinner: false });


//测试接口函数
// import { getaa } from './apis/testAPI'
// getaa().then(res => {
//     console.log(res)
// })

//引入初始化样式文件
import '@/styles/common.scss'


const app = createApp(App)

app.use(router)
app.mount('#app')

//引入懒加载指令插件并且注册
import { lazyPlugin } from '@/directives/index'
app.use(lazyPlugin)

//引入全局组件插件并注册
import { componentPlugin } from './components'
app.use(componentPlugin)

//引入pinia插件并注册
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

