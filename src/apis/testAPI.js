import httpInstance from "@/utils/http";

export function getaa () {
    return httpInstance({
        url:'home/category/head'
    })
}