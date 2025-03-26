//createRouter: 创建router实例对象
//createWebHistory: 创建history模式的路由

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import SubCategory from '@/views/SubCategory/index.vue'
import Detail from '@/views/Detail/index.vue'
import CartList from '@/views/CartList/index.vue'
import Checkout from '@/views/Checkout/index.vue'
import Pay from '@/views/Pay/index.vue'
import PayBack from '@/views/Pay/PayBack.vue'
import Member from '@/views/Member/index.vue'
import UserInfo from '@/views/Member/components/UserInfo.vue'
import UserOrder from '@/views/Member/components/UserOrder.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  //path和component（组件）对应关系的位置
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          //二级路由地址置空即可同一页面展示
          path: '',
          component: Home
        },
        {
          path: 'category/:id',
          component: Category
        },
        {
          path: 'category/sub/:id',
          component: SubCategory
        },
        {
          path:'detail/:id',
          component: Detail
        },
        {
          path:'cartList',
          component: CartList
        },
        {
          path:'checkout',
          component: Checkout
        },
        {
          path:'pay',
          component: Pay
        },
        {
          path:'paycallback',
          component: PayBack
        },
        {
          path:'member',
          component: Member,
          children: [

            {
              path:'',
              component: UserInfo
            },
            {
              path:'userorder',
              component: UserOrder
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      component: Login
    }
  ],

  //设置在不同路由切换时，可以自动滚动到页面顶部，而不是停留再原先的位置
  scrollBehavior(){
    return {top: 0}
  }
})

// 路由前置守卫，开始加载动画
router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});
// 路由后置守卫，结束加载动画
router.afterEach(() => {
  NProgress.done();
});

export default router
