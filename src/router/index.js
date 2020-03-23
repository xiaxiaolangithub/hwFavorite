import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home';

import write from '@/components/enter/write'
import login from '@/components/login' 
import xmAnimation from '@/components/xmAnimation' 







import enter from '@/components/enter/enter'                                                        // 首页
import typeList from '@/components/typeList/typeList'                                               // 点击单个商品类目进入的页面
import searchKey from '@/components/searchKey/searchKey'                                            // 搜索商品结果页面
import livePage from '@/components/livePage/livePage'                                               // 商品活动页面  
import goodsDetail from '@/components/goodsDetail/goodsDetail'                                      // 商品详情页                            
import cart from '@/components/cart/cart'                                                           // 购物车
import replenishment from '@/components/replenishment/replenishment'                                // 销售补货页面
import order from '@/components/order/order'                                                        // 订单中心
import unconfirmed from '@/components/order/allOrder/unconfirmed'                                   // 未确定订单
import confirmed from '@/components/order/allOrder/confirmed'                                       // 确定订单 
import orderDetail from '@/components/order/allOrder/orderDetail'                                   // 订单详情页面
import reverse from '@/components/order/allOrder/reverse'                                           // 预售商品订单 
// 门店营业报表                         
import salesFlow from '@/components/order/salesFlow/salesFlow'                                      // 销售流水 
import stock from '@/components/order/salesFlow/stock'                                              // 库存统计 
import sellWell from '@/components/order/salesFlow/sellWell'                                        // 热销排名
// 个人中心                         
import personal from '@/components/order/personal/personal'                                         // 我的个人中心
import favorite from '@/components/order/personal/favorite'                                         // 我的收藏 
import coupon from '@/components/order/personal/coupon'                                             // 代金劵 
import address from '@/components/order/personal/address'                                           // 收货地址
// 售后服务
import applyServices from '@/components/order/services/applyServices'                               // 申请服务
import servicesRecords from '@/components/order/services/servicesRecords'                           // 服务记录表
import servicesDetail from '@/components/order/services/servicesDetail'                             // 服务记录详情
import sendBack from '@/components/order/services/sendBack'                                         // 寄回产品 
import sendBackList from '@/components/order/services/sendBackList'                                 // 寄回产品记录 
import sendDetail from '@/components/order/services/sendDetail'                                     // 寄回产品记录详情
import network from '@/components/order/services/network'                                           // 极速找网管申请填表单
import supportRecords from '@/components/order/services/supportRecords'                             // 极速找网管里的服务记录
import supportDetail from '@/components/order/services/supportDetail'                               // 极速找网管里的服务记录单条服务详情 

// 公告版
import news from '@/components/news/news'
import website from '@/components/news/website/website'                                              // 网站公告
// 后台管理 

import backSupport from '@/components/backSupport'                                                    // 后台登录页面
import backStage from '@/components/backStage/backStage'
import backOrder from '@/components/backStage/backOrder'                                              // 后台订单管理   
import retrieveOrder from '@/components/backStage/retrieveOrder/retrieveOrder'                        // 找回订单
import backOrderDetail from '@/components/backStage/backOrderDetail'
import materiel from '@/components/backStage/materiel/materiel'                                       // 物料补货
import Advertisement from '@/components/backStage/Advertisement/Advertisement'                        // 后台广告管理
import commodity from '@/components/backStage/commodity/commodity'                                    // 后台商品管理 
import storesMent from '@/components/backStage/storesMent/storesMent'                                 // 门店管理 
import aftermarket from '@/components/backStage/aftermarket/aftermarket'                              // 后台售后
import account from '@/components/backStage/account/account'                                          // 账号管理
import role from '@/components/backStage/role/role'                                                   // 身份管理
import authority from '@/components/backStage/authority/authority'                                    // 权限管理 
import langPack from '@/components/backStage/langPack/langPack'                                       // 语言包管理  
import certificate from '@/components/backStage/certificate/certificate'                              // 证书类型管理
import credentials from '@/components/backStage/credentials/credentials'                              // 证书管理 
import discount from '@/components/backStage/discount/discount'                                       // 折扣管理 
import series from '@/components/backStage/series/series'                                             // 系列管理 
import seriesCommodity from '@/components/backStage/seriesCommodity/seriesCommodity'                  // 系列商品管理   
import comType from '@/components/backStage/comType/comType'                                          // 商品类别管理    
import Attribute from '@/components/backStage/Attribute/Attribute'                                    // 商品属性管理    
import reserve from '@/components/backStage/reserve/reserve'                                          // 商品预定 
import bgAdvance from '@/components/backStage/bgAdvance/bgAdvance'                                    // 商品预定的订单 
import weightAbout from '@/components/backStage/weightAbout/weightAbout'                              // 商品重量导出 
import imgLoad from '@/components/backStage/imgLoad/imgLoad'                                          // 订单商品图片查看  retrieve
import retrieve from '@/components/backStage/retrieve/retrieve'                                       // 找回购物车  
import cpfr from '@/components/backStage/cpfr/cpfr'                                                   // 物料补货查询
import Journal from '@/components/backStage/Journal/Journal'                                          // 物料补货查询
import bgPersonal from '@/components/backStage/bgPersonal/bgPersonal'                                 // 后台个人中心





 
 

  










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
                title: localStorage.langSelect === '0' ? '登录-熙美订货' : 'Login-XIMIVOGUE'   // 标题设置
            }
        },
        {
            path: 'enter',
            name: 'enter',
            component: enter,
            meta: {
                keepAlive: true, // 需要缓存
                title: localStorage.langSelect === '0' ? '首页-熙美订货' : 'Home page-XIMIVOGUE'
            },
        },
        {
            path: 'typeList',
            name: 'typeList',
            component: typeList,
            meta: {
                keepAlive: true ,// 需要缓存
                title: localStorage.langSelect === '0' ? '商品分类-熙美订货' : 'Commodity classification-XIMIVOGUE'
            } 
        },
        {
            path: 'searchKey',
            name: 'searchKey',
            component: searchKey,
            meta: {
                keepAlive: true, // 需要缓存
                title: localStorage.langSelect === '0' ? '商品活动、查询-熙美订货' : 'Commodity activity, search-XIMIVOGUE'
            } 
        },
        {
            path: 'livePage',
            name: 'livePage',
            component: livePage,
            meta: {
                keepAlive: true // 需要缓存
            }   
        },
        {
            path: 'goodsDetail',
            name: 'goodsDetail',
            component: goodsDetail,
            meta: {
                keepAlive: true, // 需要缓存
                title: localStorage.langSelect === '0' ? '商品详情-熙美订货' : 'Commodity details-XIMIVOGUE'
            } 
        },
        {
            path: 'replenishment',
            name: 'replenishment',
            component: replenishment,
            meta: {
                keepAlive: true, // 需要缓存
            }  
        },
        {
            path: 'cart',
            name: 'cart',
            component: cart ,
            meta: {
                keepAlive: true, // 需要缓存
                title: localStorage.langSelect === '0' ? '购物车-熙美订货' : 'Shopping Cart-XIMIVOGUE'
            }  
        },
        {
            path: 'order',
            name: 'order',
            component: order,
            children: [
                {
                    path: 'unconfirmed',
                    name: 'unconfirmed',
                    component: unconfirmed,    // 未确定订单
                    meta: {
                        keepAlive: true // 需要缓存
                    }
                },
                {
                    path: 'confirmed',
                    name: 'confirmed',
                    component: confirmed,     // 已确定订单
                    meta: {
                        keepAlive: true, // 需要缓存
                        title: localStorage.langSelect === '0' ? '在售商品订单-熙美订货' : 'Orders for goods on sale-XIMIVOGUE'
                    }
                },
                {
                    path: 'reverse',
                    name: 'reverse',
                    component: reverse,     // 已确定订单
                    meta: {
                        keepAlive: true, // 需要缓存
                        title: localStorage.langSelect === '0' ? '预售商品订单-熙美订货' : 'Pre Orders-XIMIVOGUE'
                    }
                },
                {
                    path: 'orderDetail',
                    name: 'orderDetail',
                    component: orderDetail,     // 订单详情
                    meta: {
                        keepAlive: true, // 需要缓存
                        title: localStorage.langSelect === '0' ? '订单详情-熙美订货' : 'Order details-XIMIVOGUE'
                    }
                },
                {
                    path: 'personal',
                    name: 'personal',
                    component: personal,     // 我的个人中心
                    meta: {
                        keepAlive: true, // 需要缓存
                        title: localStorage.langSelect === '0' ? '我的个人中心-熙美订货' : 'My personal Center-XIMIVOGUE'
                    }
                },
                {
                    path: 'coupon',
                    name: 'coupon',
                    component: coupon,   // 代金劵
                    meta: {
                        keepAlive: true // 需要缓存
                    } 
                },
                {
                    path: 'address',
                    name: 'address',
                    component: address,   // 收货地址
                    meta: {
                        keepAlive: true // 需要缓存
                    } 
                },
                {
                    path: 'favorite',
                    name: 'favorite',
                    component: favorite,     // 我的收藏
                    meta: {
                        keepAlive: true, // 需要缓存
                        title: localStorage.langSelect === '0' ? '我的收藏-熙美订货' : 'My collection-XIMIVOGUE'
                    }
                },
                {
                    path: 'salesFlow',
                    name: 'salesFlow',
                    component: salesFlow,     // 销售流水
                    meta: {
                        keepAlive: true, // 需要缓存
                        title: localStorage.langSelect === '0' ? '销售流水-熙美订货' : 'Sales flow-XIMIVOGUE'
                    } 
                },
                {
                    path: 'stock',
                    name: 'stock',
                    component: stock,     // 库存统计
                    meta: {
                        keepAlive: true, // 需要缓存
                        title: localStorage.langSelect === '0' ? '库存统计-熙美订货' : 'Inventory statistics-XIMIVOGUE'
                    } 
                }, 
                {
                    path: 'sellWell',
                    name: 'sellWell',
                    component: sellWell,     // 热销排名
                    meta: {
                        keepAlive: true // 需要缓存
                    } 
                }, 
                {
                    path: 'applyServices',
                    name: 'applyServices',
                    component: applyServices,     // 申请售后 
                    meta: {
                        keepAlive: true, // 需要缓存
                        title: localStorage.langSelect === '0' ? '申请售后-熙美订货' : 'Application for after sale-XIMIVOGUE'
                    } 
                },
                {
                    path: 'servicesRecords',
                    name: 'servicesRecords',
                    component: servicesRecords,     // 售后记录记录表
                    meta: {
                        keepAlive: true, // 需要缓存
                        title: localStorage.langSelect === '0' ? '售后记录-熙美订货' : 'After sales records-XIMIVOGUE'
                    }
                },
                {
                    path: 'servicesDetail',
                    name: 'servicesDetail',
                    component: servicesDetail,     // 服务记录详情
                    meta: {
                        keepAlive: true, // 需要缓存
                        title: localStorage.langSelect === '0' ? '售后记录详情-熙美订货' : 'After sales record details-XIMIVOGUE'
                    } 
                },
                {
                    path: 'sendBack',
                    name: 'sendBack',
                    component: sendBack,     // 寄回产品
                    meta: {
                        keepAlive: true, // 需要缓存
                        title: localStorage.langSelect === '0' ? '申请寄回产品-熙美订货' : 'Apply to send back the product-XIMIVOGUE'
                    } 
                },
                {
                    path: 'sendBackList',
                    name: 'sendBackList',
                    component: sendBackList,     // 寄回产品记录
                    meta: {
                        keepAlive: true, // 需要缓存
                        title: localStorage.langSelect === '0' ? '寄回产品记录-熙美订货' : 'Send back product record-XIMIVOGUE'
                    } 
                },
                {
                    path: 'sendDetail',
                    name: 'sendDetail',
                    component: sendDetail,     // 寄回产品记录详情
                    meta: {
                        keepAlive: true, // 需要缓存
                        title: localStorage.langSelect === '0' ? '寄回产品记录详情-熙美订货' : 'Send back product record details-XIMIVOGUE'
                    } 
                },
                
                {
                    path: 'network',
                    name: 'network',
                    component: network,     // 极速找网管  
                    meta: {
                        keepAlive: true // 需要缓存
                    } 
                },
                {
                    path: 'supportRecords',
                    name: 'supportRecords',
                    component: supportRecords,     // 极速找网管里的服务记录
                    meta: {
                        keepAlive: true // 需要缓存
                    } 
                },
                {
                    path: 'supportDetail',
                    name: 'supportDetail',
                    component: supportDetail,     // 极速找网管里的服务记录单条服务详情
                    meta: {
                        keepAlive: true // 需要缓存
                    } 
                },
            ]
        },
        {
            path: 'news',
            name: 'news',
            component: news,
            children: [
                {
                    path: 'website',   
                    name: 'website',
                    component: website  // 网站公告
                }
            ]
        }
      ]
    },
    {
      path:'/login',
      name:'login',
      component:login,
      meta: {
        title: localStorage.langSelect === '0' ? '登录-熙美订货' : 'Login-XIMIVOGUE',   // 标题设置
        type: '' // 不需要鉴权
    }
    },
    {
      path: '/write',
      name: 'write',
      component: write  
    },
    {
        path: '/xmAnimation',
        name: 'xmAnimation',
        component: xmAnimation  
      },
    {
        
        path: '/backSupport',
        name: 'backSupport',
        component: backSupport,   // 后台登录页面
        meta: {
            keepAlive: true, // 需要缓存
            title: '登录-订货系统后台'
        }
    },
    {
        path: '/backStage',
        name: 'backStage',
        component: backStage,
        children: [
            {
                path: 'backOrder',
                name: 'backOrder',
                component: backOrder,
                meta: {
                    title: '订单列表-订货系统后台',
                    keepAlive: true // 需要缓存
                }
            },
            {
                path: 'materiel',
                name: 'materiel',
                component: materiel,
                meta: {
                    title: '物料补货-订货系统后台',
                    keepAlive: true // 需要缓存
                }
            },
            {
                path: 'backOrderDetail',
                name: 'backOrderDetail',
                component: backOrderDetail,
                meta: {
                    title: '订单详情-订货系统后台',
                    keepAlive: true // 需要缓存
                }
            },
            {
                path: 'retrieveOrder',
                name: 'retrieveOrder',
                component: retrieveOrder,
                meta: {
                    title: '找回订单-订货系统后台',
                    keepAlive: true // 需要缓存
                }
            },
            {
                path: 'Advertisement',
                name: 'Advertisement',
                component: Advertisement,
                meta: {
                    title: '广告管理-订货系统后台',
                    keepAlive: true // 需要缓存
                }
            }, 
            {
                path: 'commodity',
                name: 'commodity',
                component: commodity,
                meta: {
                    title: '商品管理-订货系统后台',
                    keepAlive: true // 需要缓存
                }
            }, 
            {
                path: 'storesMent',
                name: 'storesMent',
                component: storesMent,
                meta: {
                    title: '门店管理-订货系统后台',
                    keepAlive: true // 需要缓存
                }
            }, 
            {
                path: 'aftermarket',
                name: 'aftermarket',
                component: aftermarket,
                meta: {
                    title: '售后管理-订货系统后台',
                    keepAlive: true // 需要缓存
                }
            }, 
            {
                path:'account',
                name:'account',
                component:account,
                meta: {
                    title: '账号管理-订货系统后台',
                    keepAlive: true // 需要缓存
                }
            },
            {
                path:'role',
                name:'role',
                component:role,
                meta: {
                    title: '身份管理-订货系统后台',
                    keepAlive: true // 需要缓存
                }
            },
            {
                path:'Attribute',
                name:'Attribute',
                component:Attribute,
                meta: {
                    title: '属性管理-订货系统后台',
                    keepAlive: true // 需要缓存
                }
            },
            {
                path:'reserve',
                name:'reserve',
                component:reserve,
                meta: {
                    title: '预售商品-订货系统后台',
                    keepAlive: true // 需要缓存
                }
            },
            {
                path:'bgAdvance',
                name:'bgAdvance',
                component:bgAdvance,
                meta: {
                    title: '预售订单-订货系统后台',
                    keepAlive: true // 需要缓存
                }
            },
            {
                path:'weightAbout',
                name:'weightAbout',
                component:weightAbout,
                meta: {
                    title: '商品重量导出-订货系统后台',
                    keepAlive: true // 需要缓存
                }
            },
            {
                path:'imgLoad',
                name:'imgLoad',
                component:imgLoad,
                meta: {
                    title: '订单商品图片-订货系统后台',
                    keepAlive: true // 需要缓存
                }
            },
            {
                path:'retrieve',
                name:'retrieve',
                component:retrieve,
                meta: {
                    title: '找回购物车-订货系统后台',
                    keepAlive: true // 需要缓存
                }
            },
            {
                path:'cpfr',
                name:'cpfr',
                component:cpfr,
                meta: {
                    title: '物料补货-订货系统后台',
                    keepAlive: true // 需要缓存
                }
            },
            {
                path:'Journal',
                name:'Journal',
                component:Journal,
                meta: {
                    title: '操作日志-订货系统后台',
                    keepAlive: true // 需要缓存
                }
            },
            {
                path:'bgPersonal',
                name:'bgPersonal',
                component:bgPersonal,
                meta: {
                    title: '个人中心-订货系统后台',
                    keepAlive: true // 需要缓存
                }
            },
            {
                path:'authority',
                name:'authority',
                component:authority,
                meta: {
                    title: '权限管理-订货系统后台',
                    keepAlive: true // 需要缓存
                }
            },
            {
                path:'langPack',
                name:'langPack',
                component:langPack,
                meta: {
                    title: '语言包管理-订货系统后台',
                    keepAlive: true // 需要缓存
                }
            },
            {
                path:'certificate',
                name:'certificate',
                component:certificate,
                meta: {
                    title: '认证类型管理-订货系统后台',
                    keepAlive: true // 需要缓存
                }
            },
            {
                path:'credentials',
                name:'credentials',
                component:credentials,
                meta: {
                    title: '认证文件管理-订货系统后台',
                    keepAlive: true // 需要缓存
                }
            },
            {
                path: 'discount',
                name: 'discount',
                component: discount,
                meta: {
                    title: '折扣商品-订货系统后台',
                    keepAlive: true // 需要缓存
                }
            },
            {
                path: 'series',
                name: 'series',
                component: series,
                meta: {
                    title: '系列管理-订货系统后台',
                    keepAlive: true // 需要缓存
                }
            },
            {
                path: 'seriesCommodity',
                name: 'seriesCommodity',
                component: seriesCommodity,
                meta: {
                    title: '系列商品列表-订货系统后台',
                    keepAlive: true // 需要缓存
                }
            },
            {
                path: 'comType',
                name: 'comType',
                component: comType,
                meta: {
                    title: '类别管理-订货系统后台',
                    keepAlive: true // 需要缓存
                }
            },

            
        ]
    }
  ]
})
