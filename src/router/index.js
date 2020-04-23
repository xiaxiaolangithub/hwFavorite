import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home';

import login from '@/components/login' 







import enter from '@/components/enter/enter'                                                        // 首页
import typeList from '@/components/typeList/typeList'                                               // 点击单个商品类目进入的页面
import searchKey from '@/components/searchKey/searchKey'                                            // 搜索商品结果页面
import goodsDetail from '@/components/goodsDetail/goodsDetail'                                      // 商品详情页  
import order from '@/components/order/order'                                                        // 订单中心

// 个人中心                         
import personal from '@/components/order/personal/personal'                                         // 我的个人中心
import favorite from '@/components/order/personal/favorite'                                         // 我的收藏 



import whBackSupport from '@/components/whBackSupport' 





 
 

  










Vue.use(Router)
export default new Router({
    routes: [
    {
      path: '/',
      component: home,
      children: [
        {
            path: '',
            redirect: 'login',  // 路由重定向到首页
            meta: {
                title: '登录-熙美商品'
            }
        },
        {
            path: 'enter',
            name: 'enter',
            component: resolve => require(['@/components/enter/enter'], resolve),
            meta: {
                keepAlive: true, // 需要缓存
                title: '首页-熙美商品'
            },
        },
        {
            path: 'typeList',
            name: 'typeList',
            component: resolve => require(['@/components/typeList/typeList'], resolve),
            meta: {
                keepAlive: true ,// 需要缓存
                title: '商品分类-熙美商品'
            } 
        },
        {
            path: 'searchKey',
            name: 'searchKey',
            component: resolve => require(['@/components/searchKey/searchKey'], resolve),
            meta: {
                keepAlive: true, // 需要缓存
                title: '商品活动、查询-熙美商品'
            } 
        },
        {
            path: 'goodsDetail',
            name: 'goodsDetail',
            component: resolve => require(['@/components/goodsDetail/goodsDetail'], resolve),
            meta: {
                keepAlive: true, // 需要缓存
                title: '商品详情-熙美商品'
            } 
        },
        {
            path: 'order',
            name: 'order',
            component: order,
            children: [
               
                {
                    path: 'personal',
                    name: 'personal',
                    component: resolve => require(['@/components/order/personal/personal'], resolve),     // 我的个人中心
                    meta: {
                        keepAlive: true, // 需要缓存
                        title: '我的个人中心-熙美商品'
                    }
                },
                {
                    path: 'favorite',
                    name: 'favorite',
                    component: resolve => require(['@/components/order/personal/favorite'], resolve),   // 我的收藏
                    meta: {
                        keepAlive: true, // 需要缓存
                        title: '我的收藏-熙美商品'
                    }
                },
               
            ]
        },
      ]
    },
    {
      path:'/login',
      name:'login',
      component: resolve => require(['@/components/login'], resolve),
      meta: {
        title: '登录-熙美商品',   // 标题设置
        type: '' // 不需要鉴权
    },
    
},
{
    path: '/whBackSupport',
    name:'whBackSupport',
    component: resolve => require(['@/components/whBackSupport'], resolve),
    meta: {
      title: '账号-熙美商品',   // 标题设置
      type: '' // 不需要鉴权
    }
}
  ]
})
