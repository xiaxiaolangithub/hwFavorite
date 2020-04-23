<template>
    <div id="order">
        <div class="order_top">
            <div class="top_inner">
                <Breadcrumb separator="<b class='demo-breadcrumb-separator'>></b>">
                    <BreadcrumbItem to="/enter"><i class="icon-liuliangyunpingtaitubiao02 iconfont"></i>首页</BreadcrumbItem>
                    <BreadcrumbItem to="">{{titleBread}}</BreadcrumbItem>
                </Breadcrumb>
            </div>
        </div>
        <div class="order_contanier">
            <div class="contanier_inner">
                <div class="order_content">
                    <!-- 这里放入第三级路由 -->
                    <router-view />
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import {getUrlParams} from  '@/assets/js/tool.js'

export default {
    
    data() {
        return{
            value1:' 1',
            // 得到网址的参数对象
            urlParams: {},
            // 管理中心里面的面包屑数据
            orderBreadList: [],
            // 当前所点击的是哪一个
            currendIndex: '1',
            titleBread: '',
        }
       
    },

    watch: {
        $route(val) {
            if(val) {
                this.isSureLI()
            }
        }
    },
    created() {
        this.isSureLI();
    },
    methods: {
        /**
         * 根据网址传来的参数来确定选中哪个nav里内容
         */
        isSureLI() {
            this.urlParams = getUrlParams(); 
            this.titleBread = this.urlParams.key;
            
        },
        /**
         * 点击面包屑
         */
        clickBread(item, index) {
            this.isSureLI();
        },
        /**
         * 点击左侧导航栏上的li
         */
        clickNavLi(ele,item) {
            // 单击哪个li变色
            this.currendIndex = ele.id;
            this.navList.forEach(gn => {
                gn.lists.forEach(listItem => {
                    if(gn.id === item.id && listItem.id == ele.id) {
                        this.orderBreadList = [
                            {
                                name: `${gn.title}`,
                                // path: `/order/favorite?name2=${list.id}&name3=${listItem.name}`
                            },
                            {
                                name: `${listItem.name}`,
                                // path: `/order/favorite?name2=${list.id}&name3=${listItem.name}`
                            },
                        ]
                    }
                })
            });
           this.navSwitch();
        },
        /**
         * 跳转路由
         */
        navSwitch() {
            switch(this.currendIndex) {
                case '6':
                    this.$router.push({path: '/order/personal'});
                    break;
                case '8':
                    this.$router.push({path: '/order/favorite'});
                    break;
            }
        }
    }
}
</script>
