import axios from "axios";
import { ElMessage } from 'element-plus';
import 'element-plus/theme-chalk/el-message.css';
import { useUserStore } from "@/stores/userStore";
import router from "@/router";

// 封装添加拦截器的函数
const addInterceptors = (instance) => {
    // axios 请求拦截器
    instance.interceptors.request.use(config => {
        const userStore = useUserStore();
        // 获取 token
        const token = userStore.userInfo.token;
        if (token) {
            // 拼接 token
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, e => Promise.reject(e));

    // axios 响应式拦截器
    instance.interceptors.response.use(res => res.data, e => {
        // 统一错误提示
        const userStore = useUserStore();
        ElMessage({
            type: 'warning',
            message: e.response.data.message
        });
        // token 失效处理：清除本地用户数据，跳转到登录页
        if (e.response.status === 401) {
            userStore.clearUserInfo();
            router.push('/login');
        }
        return Promise.reject(e);
    });
    return instance;
};

// 配置接口基地址，创建不同的 Axios 实例
const httpInstance = addInterceptors(axios.create({
    baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout: 10000
}));

const local = addInterceptors(axios.create({
    baseURL: 'http://127.0.0.1:5000',
    timeout: 2000
}));

export {
    httpInstance,
    local
};    