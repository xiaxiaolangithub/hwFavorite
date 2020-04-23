<template>
    <div id="enterPage">
        <div class="banner" >
            <div class="banner_inner">
                <div class="swiper_conver">
                    <swiper :options="swiperOption" ref="mySwiper" v-if="isSwiperReaded">
                        <swiper-slide  v-for="(item,index) in bannerData" :key="index">
                            <div class="banner_background" :style="{background: `url(${item.bannerImg})`}"></div>
                        </swiper-slide>
                        
                    </swiper>
                </div>
                <!-- 广告模块 -->
                <ul class="promotion">
                    <li v-for="(item,index) in advertising " :key="index" style="height:50%;">
                        <img v-lazy="item.imgUrl" alt="" >
                    </li>
                </ul>
            </div>
        </div>
    </div> 
</template>


<script>

export default {
    name: 'enter',
    data() {
        return {
            bannerData: [
                {
                    bannerImg: 'http://img.xmvogue.com/ggao/1582454859.jpg?x-oss-process=style/yuan'
                },
                {
                    bannerImg: 'http://img.xmvogue.com/ggao/1582454859.jpg?x-oss-process=style/yuan'
                },
            ],
            advertising: [
                {
                    imgUrl:'http://img.xmvogue.com/ggao/1585203661.png?x-oss-process=style/yuan'
                },
                {
                    imgUrl:'http://img.xmvogue.com/ggao/1585203661.png?x-oss-process=style/yuan'
                },
            ],
            // 轮播配置
            swiperOption: {
                loop: true,
                autoplay:{
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.swiper-pagination',  // 分页
                    clickable: true,   // 分页小圆点可点击
                }
            },
            isSwiperReaded: false,
        }
    },
    mounted() {
        setTimeout(() => {
            this.isSwiperReaded = true;
        }, 500)
    },
    computed: {
        mySwiper() {
            return this.$refs.mySwiper.swiper
        },
    }

}
 
</script>
