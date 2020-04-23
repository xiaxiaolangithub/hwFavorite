<template>
    <div class="fixedPage">
        <ul  class="fixed_part">
            <Badge :count="favoriteNum">
                <li title="我的收藏" @mouseleave="animationType= 'animated bounce infinite'" @mouseenter="animationType= 'animated bounce'">
                    <Icon type="ios-heart"  :class="animationType" />
                </li>
            </Badge>
            <li v-for="(item) in fixedData" :key="item.id" @click="itemClick(item.id)" :title="item.title">
                <Icon :type="item.icon"></Icon>
            </li>
        </ul>
        <Modal v-model="isCheck" class="model_check" title="商品查询" draggable >
            <p>
                <Input v-model="searchCode" @on-enter="searchGoods" placeholder="请在此输入商品名称或商品编码 ..." />
                <span class="icon" @click="searchGoods"><Icon type="ios-search"></Icon></span>
            </p>
        </Modal>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations,mapActions } from 'vuex';
import "@/assets/style/animate.less"; 
export default {
    data() {
        return {
            // 固定数据
            fixedData: [
                {
                    icon: 'ios-search',
                    id: 2,
                    title: '全网搜索'
                },
                {
                    icon: 'ios-arrow-up',
                    id: 3,
                    title: '返回顶部'
                },
            ],
            // 是否显示查询框
            isCheck: false,
            // 编码查询字段
            searchCode: '',
            totalNum: 0,
            animationType:"animated bounce infinite",
        }
    },
    computed: {
        ...mapState([
            'favoriteNum'
        ]),
        ...mapGetters([
            'favoriteNum',
        ]),
    },
    created() {
        
    },
    watch: {
        isCheck(val) {
            if(!val) {
                this.searchCode = '';
            }
        }
    },
    methods: {
        ...mapMutations([
            'setFavoriteNum'
        ]),
        ...mapActions([
            'getFavoriteNum'
        ]),
        itemClick(id) {
            switch(id) {
                case 2:
                    this.isCheck = true;
                    this.goCheck();
                    break;
                case 3:
                    this.topBack();
                    break;
            }
        },
        goCheck() {

        },
        /**
         * 回到顶部
         */
        topBack() {
            let distance = document.documentElement.scrollTop || document.body.scrollTop; //获得当前高度
            let step = distance/50; //每步的距离
            (function jump(){
                if(distance > 0){
                    distance-=step;
                    window.scrollTo(0,distance);
                    setTimeout(jump,10)
                }
            })();
        },
        /**
         *  搜索商品
         */
        searchGoods() {
            if(this.searchCode === '') {
                this.$Message.warning({
                    content: '抱歉，查询的商品名称不能为空',
                    duration: 3
                });
                return false;
            }
            this.isCheck = false;
            this.$root.keywork = this.searchCode;
            this.$router.push({path: '/searchKey', query: {keyword: this.$root.keywork,select: 'BB'}});
            this.searchCode = '';
        },
    }
}
</script>



