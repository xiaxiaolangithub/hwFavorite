<template>
  <div id="app">
		<keep-alive>
			<router-view v-if="$route.meta.keepAlive" include="typeList" v-wechat-title='$route.meta.title'>
			<!-- 这里是会被缓存的视图组件 -->
			</router-view>
        </keep-alive>
        <!--  这里是不会被缓存的视图组件 -->
		<router-view v-if="!$route.meta.keepAlive" v-wechat-title='$route.meta.title'></router-view>
  </div>
</template>

<script>
export default {
  	name: "App",
	provide(){
		return{
			reload: this.reload
		}
	},
	data(){
		return{
			isRouterAlive: true
		}
	},
	created() {
        // 查看用户是否登录
        // this.isLogin();
	},
	
	methods: {
         /**
         * 查看用户是否登录
         */
        /*isLogin() {
            this.$resetAjax({
                type: 'GET',
                url: '/home/login/check_login',
                success: (res) => {
                    if(res === '1') {
                        if(location.href.includes('backStage')) {
                            this.$router.push({path:'/backStage'})
                            // location.href = 'http://order.xmvogue.com/main.html#/backSupport'  // 线上放开
                        } else{
                            // 表示已经登录过，可以直接登录到页面里
                            this.$router.push({path:'/enter'})
                            // location.href = 'http://order.xmvogue.com/main.html#/login'  // 线上放开
                        }
                    }
                }
            })
        }, */
		reload() {
			this.isRouterAlive = false;
			this.$nextTick(function () {
				this.isRouterAlive=true;
			})
		},
    }
};
</script>


<style>
    #app {
        position: relative;
        background: #fff;
        font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif !important;
        
    }
    #nprogress .bar {
        background-image: linear-gradient( 135deg, #73d5e6 10%, yellow 50%, #e66465 100%) !important; 
        height: 3px;
    }
</style>
