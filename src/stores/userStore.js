import { loginAPI } from "@/apis/user";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useAddCartStore } from "./cartStore";
import { mergeCartAPI } from "@/apis/cart";

export const useUserStore = defineStore('user',()=>{
    const cartStore = useAddCartStore()
    const userInfo = ref({})
    //获取接口数据
    const getUserInfo = async({account,password})=>{
        const res = await loginAPI({account,password})
        userInfo.value = res.result
        //合并购物车操作
        mergeCartAPI(cartStore.cartList.map(item =>{
            return {
                skuId: item.skuId,
                selected: item.selected,
                count: item.count
            }
        }))
        cartStore.updateNewList()
    }

    //退出时清除用户信息
    const clearUserInfo = () =>{
        userInfo.value = {}
        //执行清除购物车的action
        cartStore.clearCart()
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