import httpInstance from "@/utils/http"

export function getCategoryFilerAPI(id){
    return httpInstance({
        url:"/category/sub/filter",
        params:{
            id
        }
    })
}