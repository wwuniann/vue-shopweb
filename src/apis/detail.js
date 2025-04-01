import {httpInstance} from "@/utils/http";
import { linkEmits } from "element-plus";

export function getDetailAPI(id){
    return httpInstance({
        url:'/goods',
        params:{
            id
        }
    })
}

export function getHotGoodsAPI({id,type,limit = 3}){
    return httpInstance({
        url:'/goods/hot',
        params:{
            id,
            type,
            limit
        }
    })

}