import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { useUserStore } from "./userStore"
import { insertCartAPI } from "@/apis/cart"
import { NewCartListAPI } from "@/apis/cart"
import { delCartAPI } from "@/apis/cart"

export const useAddCartStore = defineStore('Cart', ()=>{
    const cartList =ref([])
    const userStore = useUserStore()
    const isLogin = computed(() =>userStore.userInfo.token)


    //更新购物车功能
    const updateNewList =async() =>{
        const res = await NewCartListAPI()
        cartList.value = res.result
    }

    //添加购物车
    const addCart = async(goods) =>{
        console.log('添加成功')
        const {skuId,count} = goods
        if(isLogin.value){
            //通过接口加入购物车
            await insertCartAPI({skuId,count})
            updateNewList()
        }else{
             //添加本地购物车，已添加过：num+1 未添加过：直接push
        const item = cartList.value.find((item)=> goods.skuId ===item.skuId)
        if(item){
            //添加过
            item.count++
        }else{
            //没找到
            cartList.value.push(goods)
        }
        }
       
    }

    //删除购物车
    const delCart = async (skuId) =>{
    if(isLogin.value){
        await delCartAPI([skuId])
        updateNewList()
    }else{
    //若其 skuId 不等于传入的 skuId，则保留该元素；反之则过滤掉该元素。
    cartList.value = cartList.value.filter((item) =>skuId !== item.skuId)
        }
    }

    //退出登录时清空购物车数据
    const clearCart = () =>{
    cartList.value=[]
    }
    
    

    //结算购物车
    //总数
    const allCount = computed(() =>cartList.value.reduce((count,item) =>count+item.count,0))
    //总价
    const allprice = computed(() =>cartList.value.reduce((money,item) =>money+item.price*item.count,0))

    //单选功能
    const singleCheck =(skuId,selected) =>{
        const item = cartList.value.find((item) =>item.skuId ===skuId)
        item.selected = selected
    }
    
    //是否全选
    const isAll = computed(() =>cartList.value.every((item) => item.selected))

    //全选功能
    const allCheck = (selected) =>{
        cartList.value.forEach(item => item.selected =selected)
    }

    //已选择的数量
    const checkNum = computed(() => cartList.value.filter(item =>item.selected).reduce((count,item) =>count+item.count,0))

    //已选择的商品总价
    const checkPrice = computed(() => cartList.value.filter(item => item.selected).reduce((price,item)=>price+item.price*item.count,0)
 )

    return{
        cartList,
        addCart,
        delCart,
        allCount,
        allprice,
        singleCheck,
        isAll,
        allCheck,
        checkNum,
        checkPrice,
        clearCart,
        updateNewList
    }
    

},
{
    persist: true,
}
)