import httpInstance from "@/utils/http"

export function getCategoryFilerAPI(id){
    return httpInstance({
        url:"/category/sub/filter",
        params:{
            id
        }
    })
}

export function getSubCategoryAPI(data){
    return httpInstance({
        url: "/category/goods/temporary",
        method: 'POST',
        data
    })
}