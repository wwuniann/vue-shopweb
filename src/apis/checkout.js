import httpInstance from "@/utils/http";

//获取接口详情
export function getCheckout(){
    return httpInstance({
        url:'/member/order/pre'
    })
}


//创建订单
export function createOrderAPI(data){
    return httpInstance(({
        url:'/member/order',
        method: 'POST',
        data
    }))
}

