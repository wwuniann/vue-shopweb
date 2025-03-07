//封装分类数据业务的逻辑代码
import { getCategoryAPI } from "@/apis/category"
import { onMounted,ref } from "vue"
import { useRoute,onBeforeRouteUpdate } from "vue-router"



export function useCategory(){
    const categoryDate = ref({})
    const route = useRoute()
    const getCategory = async(id = route.params.id) => {
    const res = await getCategoryAPI(id)
    categoryDate.value = res.result
    console.log(categoryDate)
}
onMounted(() => getCategory())
//路由参数变化时，把分类数据接口重新发送
onBeforeRouteUpdate((to) =>{
  //存在问题：需要使用最新的路由参数请求最新的分类数据，但前面传入的route.params.id具有滞后性
  getCategory(to.params.id)
})
return{
    categoryDate
}

}