import { loginAPI } from "@/apis/user";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore('user',()=>{
    const userInfo = ref({})
    const getUserInfo = async({account,password})=>{
        const res = await loginAPI({account,password})
        userInfo.value = res.result
    }

    //退出时清除用户信息
    const clearUserInfo = () =>{
        userInfo.value = {}
    }
    return{
        getUserInfo,
        userInfo,
        clearUserInfo
    }
},
//本地存储
{
    persist: true,
}
)