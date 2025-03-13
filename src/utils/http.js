//axios基础的封装
import axios from "axios";
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { useUserStore } from "@/stores/userStore";
import router from "@/router";

//配置接口基地址，可配置多个
const httpInstance = axios.create({
    baseURL:'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout:5000
})

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
  const userStore = useUserStore()
  //获取token
  const token = userStore.userInfo.token
  if(token){
    //拼接token
    config.headers.Authorization = `Bearer ${token}`
  }
    return config
  }, e => Promise.reject(e))
  
// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
  //统一错误提示
  const userStore = useUserStore()
  ElMessage({
    type:'warning',
    message:e.response.data.message
  })
  //token失效处理：清除本地用户数据，跳转到登录页
  if(e.response.status ===401){
    userStore.clearUserInfo()
    router.push('/login')
  }
  return Promise.reject(e)
  })

export default httpInstance