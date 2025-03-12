import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const useAddCartStore = defineStore('Cart', ()=>{
    const cartList =ref([])

    //添加购物车
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

    //删除购物车
    const delCart = (skuId) =>{
        //若其 skuId 不等于传入的 skuId，则保留该元素；反之则过滤掉该元素。
        cartList.value = cartList.value.filter((item) =>skuId !== item.skuId)
    }

    //结算购物车
    //总数
    const allCount = computed(() =>cartList.value.reduce((num,item) =>num+item.num,0))
    //总价
    const allprice = computed(() =>cartList.value.reduce((money,item) =>money+item.price*item.num,0))

    //单选功能
    const singleCheck =(skuId,slected) =>{
        const item = cartList.value.find((item) =>item.skuId ===skuId)
        item.slected = slected
    }
    
    //是否全选
    const isAll = computed(() =>cartList.value.every((item) => item.slected))

    //全选功能
    const allCheck = (slected) =>{
        cartList.value.forEach(item => item.slected =slected)
    }

    //已选择的数量
    const checkNum = computed(() => cartList.value.filter(item =>item.slected).reduce((num,item) =>num+item.num,0))

    //已选择的商品总价
    const checkPrice = computed(() => cartList.value.filter(item => item.slected).reduce((price,item)=>price+item.price*item.num,0)
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
        checkPrice
    }
    

},{
    persist: true,
})