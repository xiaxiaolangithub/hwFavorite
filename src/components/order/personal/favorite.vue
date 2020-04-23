<template>
    <div class="favoritePage">
        <p class="order_title">我的收藏</p>
        <div class="clear">
            <div class="clear_left">
                <span style="min-width: 50px;font-size: 16px;font-weight: bold;"> 查询：</span>
                <Input v-model="keyword" placeholder="请输入商品名称或商品条码..." style="width: 300px" @on-enter="getKeyword" @on-blur="getKeyword"/>
            </div>
            <div class="clear_right">
                <Page v-if="isClearLover"  :total="total" :page-size="pageSize" @on-change="changePage" :current="currentPage" simple style="margin-left:15px;"></Page>
                <p @click="modal1 = true" class="clearLover" v-if="isClearLover">清空</p>
                <p class="clearLover" v-if="isClearLover" @click="exportFavorite">导出</p>
            </div>
        </div>
        <div class="empty" v-if="!isClearLover">
            <img class="empty_left" src="@/assets/images/favorite/empty_favorite.png" alt="">
            <div class="empty_right">
                <p class="emptyTips">很抱歉，你还没收藏过宝贝哦</p>
                <p class="empty_go">
                    <a @click="goAll">去随便逛逛吧</a>
                    <span style="margin-bottom: 15px;color: #868686;font-size: 16px;">，看看有没有喜欢的</span>
                </p>
            </div>
        </div>
        <ul class="collect_list" v-if="isClearLover">
            <li v-for="(item,index) in collectData" :key="item.item_no" class="list">
                <div class="item_li">
                    <div class="img">
                        <img v-lazy="item.imgUrl" alt="" title="点击查看商品详情" @click="goGoodsDetail(item.item_no)">
                    </div>
                    <div class="info">
                        <p class="code" v-if="item.item_no">
                            {{item.item_no}}
                            <span style="width: 24px;height:20px;display:inline-block;">
                                <Icon type="md-copy" size="20" class="copy_icon" title="货号复制" v-clipboard:copy="item.item_no" v-clipboard:success="onCopy" v-clipboard:error="onError" />
                            </span>
                        </p>
                        <p class="name" title="点击查看商品详情" @click="goGoodsDetail(item.item_no)">{{item.item_name}}</p>
                        <div class="price">
                            <span class="unit_title">售价：</span>
                            <span>￥{{item.sale_price}}</span>
                        </div>
                        <div class="handle prod_handle">
                            <p class="del" @click="delColldct(item, index)" title="取消收藏">删除</p>
                            <p class="check" @click="goGoodsDetail(item.item_no)" title="查看商品详情">详情</p>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <div class="pageContanier" v-if="isClearLover">
            <Page :total="total" :page-size="pageSize" @on-change="changePage" :current="currentPage" show-elevator show-total></Page>
        </div>
        <Modal v-model="modal1" draggable  title="提示" @on-ok="clearLover" @on-cancel="modal1=false" class="clearCollect">
            <p>您确定要清空收藏夹所有商品数据？</p>
        </Modal>
    </div>
</template>


<script>
import { mapActions } from 'vuex';
import NProgress from 'nprogress'   // 引入进度条
import 'nprogress/nprogress.css'    // 引入进度条
export default {
    data() {
        return {
            // 选择是否是预售
            advanceValue: 1,
            // 收藏的数据
            collectData:[],
            modal1: false,
            // 是否显示清空收藏夹按钮
            isClearLover: false,
            defaultImg: 'http://dh.xmcpcn.com/Public/images/none.jpg',
            // 所有收藏数据
            favoriteData: {},
            // 当前页码
            currentPage: 1,
            // 搜索关键词
            keyword: '',
            pageSize: 50,
            total: 0,
        }
    },
    created() {
        // 获取收藏数据
        this.getCollectData();
    },

    methods: {
        ...mapActions([
            'getFavoriteNum'
        ]),
        // 复制成功时的回调函数
        onCopy (e) {
            this.$Message.success({
                content: '货号已复制到剪切板 !',
                duration: 3
            });
        },
        // 复制失败时的回调函数
        onError (e) {
            this.$Message.error({
                content: '抱歉，复制失败  !',
                duration: 3
            });
        },
        defImg() {
            let img = event.srcElement;
            img.src = this.defaultImg;
            img.onerror = null; //防止闪图
        },
        /**
         * 去全部商品页面
         */
        goAll() {
            this.$router.push({path: '/searchKey', query: {keyword: '全部商品', select: 'AA'}});
        },
        /**
         *  切换页面
         */
        changePage(index) {
            this.currentPage = index;
            this.getCollectData()
        },
        getKeyword() {
            this.currentPage = 1;
            this.getCollectData();
        },
        /**
         * 查看商品详情
         */
        goGoodsDetail(nonum) {
            // 新开页面跳转到商品详情页面
            this.$router.push({path: '/goodsDetail',query: {item_no:nonum}})
            // let routeData2 = this.$router.resolve({ name: 'goodsDetail', query: {item_no:nonum}});
            // window.open(routeData2.href, '_blank');
        },
        /**
         * 获取收藏数据
         */
        getCollectData() {
            NProgress.start();
            this.$resetAjax({
                type: 'GET',
                url: '/choose/goods/favorite',
                data: {
                    keyword: this.keyword.trim(),
                    page: this.currentPage,
                },
                success: (res) => {
                    NProgress.done();
                    this.favoriteData = JSON.parse(res).data;
                    this.transRoutine();
                },
            })
        },
        exportFavorite() {
            window.open(`http://order.xmvogue.com/choose/chooseGoods/public/index.php?s=choose/goods/download`)
        },
        /**
         * 常规商品收藏数据处理
         */
        transRoutine() {
            let result = this.favoriteData.data;
            switch(result.length) {
                case 0:
                    this.isClearLover = false;
                    this.collectData = [];
                    break;
                default:
                    this.isClearLover = true;
                    result.forEach(ele => {
                        ele.imgUrl = `http://hwimg.xmvogue.com/thumb/${ele.item_no}.jpg?x-oss-process=style/440`,
                        ele.carNum = Number(ele.spec);
                    });
                    this.collectData = result;
                    this.total = this.favoriteData.total;
            }
        },
        /**
         * 取消收藏请求
         */
        delColldct(item,index) {
            NProgress.start();
            this.$resetAjax({
                type: 'POST',
                url: '/choose/goods/add_favorite',
                data: {
                    type: 2,   // 1收藏、2取消收藏
                    item_no: item.item_no
                },
                success: (res) => {
                    NProgress.done();
                    let result = JSON.parse(res);
                    item.favorite = 0;
                    this.$Message.success({
                        duration: 3,
                        content: ' 取消商品收藏成功 !'
                    });
                    this.getCollectData();
                    this.getFavoriteNum({vm: this})
                }
            })
        },
        /**
         * 清空收藏夹请求
         */
        clearLover() {
            this.modal1 = false;
            NProgress.start();
            this.$resetAjax({
                type: 'GET',
                url: '/choose/goods/del_favorite',
                success: (res) => {
                    NProgress.done();
                    let result = JSON.parse(res);
                    if(result.errorcode ===  200) {
                        this.$Message.success({
                            content: '很不舍，您成功清空收藏夹',
                            duration: 3
                        });
                        this.isClearLover = false;
                        this.getCollectData();
                        this.getFavoriteNum({vm: this})
                    }
                },
            })
        }
    }
}
</script>
