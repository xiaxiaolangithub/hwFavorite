<template>
    <div id="external_container" @click="isLogin">
        <!-- 头部 -->
        <Header></Header>
        <!-- 中间内容 -->
        <div id="main-content">
            <keep-alive :include="keepAliveIncludes">
                <router-view v-if="isGetUserData"/>
            </keep-alive>
        </div>
        <fixed></fixed>
        <!-- 底部 -->
        <Footer></Footer>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import Footer from './footer.vue'
import Header from './header.vue'
import fixed from './fixed.vue'
import {setCookie} from  '@/assets/js/tool.js' 
import {getCookie} from  '@/assets/js/tool.js'
import {getNumBox} from  '@/assets/js/tool.js'
export default {
    components: {
        Header,
        Footer,
        fixed
       
    },
    data() {
        return {
            isShowClass: true,
            isGetUserinfo: true, // 修改为true
            isGetGoodsType: false,
            loginTips: '登录过期，2秒后自动为您跳转到登录页面',
            langSelect: '',
            keepAliveIncludes: ['enter', 'confirmed']
        }
    },

    computed: {
        // 获取到所有基础数据，再渲页面，请求其他数据
        isGetUserData() {
            return this.isGetUserinfo && this.isGetGoodsType;
        },
        i18n() {
            return this.$t('infoPage')
        },
    },
    created() {
        localStorage.langSelect = 0;
        this.langSelect = localStorage.langSelect;
        // 判断用户是否已登录 
        this.isLogin();
        // 获取商品分类
        this.getGoodsType();
         // 得到时间问候语
        this.getHello();
        // 得到用户数据
        this.getUserinfo();
        // 得到商品总数量
        this.getFavoriteNum({vm:this})
    },
    
    methods: {
        ...mapActions([
            'getFavoriteNum'
        ]),
        open(data) {
            this.isShowClass = data;
        },
        /**
         * 判断用户是否已登录
         */
        isLogin() {
            // if(localStorage.whuname === '') {
            //     // 未登录
            //     this.$Message.error({
            //         content: '登录过期，2秒后自动为您跳转到登录页面',
            //         duration: 3
            //     });
            //     this.$router.push({path: '/login'})
            //     return false;
            // } 
            // if(localStorage.whuname === undefined) {
            //     // 未登录
            //     this.$Message.error({
            //         content: '登录过期，2秒后自动为您跳转到登录页面',
            //         duration: 3
            //     });
            //     this.$router.push({path: '/login'})
            //     return false;
            // }

        },
        /**
         * 得到时间问候语
         */
        getHello() {
            var now = new Date();
            var hour = now.getHours(); 
            if(hour < 6){
                localStorage.helloDate = '凌晨好 ! ';
            }  else if (hour < 9){
                localStorage.helloDate = '早上好 ! ';
            }  else if (hour < 12){
                localStorage.helloDate = '上午好 ! ';
            }  else if (hour < 14){
                localStorage.helloDate = '中午好 ! ';
            }  else if (hour < 17){
                localStorage.helloDate = '下午好 ! ';
            } else if (hour < 19){
                localStorage.helloDate = '傍晚好 ! ';
            }  else if (hour < 22){
                localStorage.helloDate = '晚上好 ! ';
            } else {
                localStorage.helloDate = '深夜好 ! ';
            } 
        },
        /**
         * 得到用户数据
         */
        getUserinfo() {
            this.isGetUserinfo = true;
        },
        /**
         * 得到商品分类
         */
        getGoodsType() {
            this.isGetGoodsType = true;
        },
    }
}
</script>

<style lang="less" scoped>
    #main-content{
        background: #fff;
    }
    
</style>



