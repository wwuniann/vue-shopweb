import {httpInstance} from "@/utils/http";

export function getCategoryAPI(id){
    return httpInstance({
        url:"/category",
        //请求参数
        params:{
            id
        }
    })
}