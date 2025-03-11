import { defineStore } from "pinia"
import { ref } from "vue"

export const useAddCartStore = defineStore('Cart', ()=>{
    const cartList =ref([])
    const addCart = (goods) =>{
        console.log('添加',goods)
        //添加购物车，已添加过：count+1 未添加过：直接push
        const item = cartList.value.find((item)=> goods.skuId ===item.skuId)
        if(item){
            //添加过
            item.num++
        }else{
            //没找到
            cartList.value.push(goods)
        }
    }
    return{
        cartList,
        addCart
    }
    
})