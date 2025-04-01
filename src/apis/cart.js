import {httpInstance} from "@/utils/http";

//添加购物车
export function insertCartAPI({ skuId,count}) {
    return httpInstance({
        url:'/member/cart',
        method:'POST',
        data:{
            skuId,
            count
        }
    })
}

//获取最新购物车列表
export function NewCartListAPI(){
    return httpInstance({
        url:'/member/cart'
    })
}

//删除购物车
export const delCartAPI = (ids) => {
    return httpInstance({
      url: '/member/cart',
      method: 'DELETE',
      data: {
        ids
      }
    })
  }

export function mergeCartAPI(data){
    return httpInstance({
        url:'/member/cart/merge',
        method:'POST',
        data
    })
}