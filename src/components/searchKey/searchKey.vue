<template>
    <div class="searchKey">
         <!-- 导航栏 -->
        <div class="type_top">
            <div class="top_inner">
                <Breadcrumb separator=">" class="bg_title">
                    <BreadcrumbItem to="/enter"><i class="icon-liuliangyunpingtaitubiao02 iconfont"></i>首页</BreadcrumbItem>
                    <BreadcrumbItem class="title_name">{{keywordName}}</BreadcrumbItem>
                </Breadcrumb>
            </div>
        </div>
        <!-- 商品列表 -->
        <div class="goods_content">
            <!-- 中国仓的时候会展示商品大类 -->
            <div class="content_inner">
                <!-- 商品分大类 -->
                <div class="cals" v-show="typeValue === 'F'">
                    <span>商品大类：</span>
                    <ul>
                        <li v-for="(item,index) in classList" :key="item.cls_id" :title="item.cls_name" @click="goodsClass(item.cls_id,index)" :class="{active: currentIndex === index}">{{ item.cls_name }}</li>
                    </ul>
                </div>
                <!-- 配送价选择 -->
                <!-- heat,是热销产品，rec是推荐产品，J是预售产品，这些查询出来的不要配送价选择。 -->
                <div class="clas_price" v-show="typeValue !== 'heat' && typeValue !== 'rec' && typeValue !== 'J' && typeValue !== 'BB'">
                        <span>零售价：</span>
                        <ul class="price_right">
                            <li v-for="(item, index) in distributionData" :key="index" :class="{disSelect: disIndex == index}" @click="selectDis(item, index)">{{item.price}}</li>
                        </ul>
                    </div>
                <h3 class="recommend">
                    <p>推荐</p>
                    <!-- 查看模式、列表、网格两种模式 -->
                    <div class="recommed_right" style="display:flex;align-items: center;">
                        <span class="check_type" :class="{selected: iconIndex === index}" :title="item.title" v-for="(item,index) in iconList"  :key="index" @click="changeClass(item,index)" style="margin-right:5px;">
                            <Icon :type="item.icon" size="24"></Icon>
                        </span>
                        <Page  :total="total" :page-size="pageSize" @on-change="changePage" :current="currentPage" simple style="margin-left:15px;"></Page>
                    </div>
                </h3>
                <!-- 商品展示页面 -->
                <ul :class="ulClassStr">
                    <li v-for="(item,index) in goodsData" :key="index">
                        <div style="margin: 0px 0px 18px;border: 1px solid #DEDEDE;position: relative;transition: all .2s ease 0s;">
                            <div class="prod_top" @click="goGoodsDetail(item)">
                                <img v-lazy="item.imgUrl" alt="" @mouseenter="item.isShow='block_class'" @mouseleave="item.isShow='mouse_img'">
                            </div>
                            <!-- 鼠标移入商品大图 -->
                            <div :class="item.isShow" v-if="ulClassStr === 'content_List'">
                                <img :src="item.imgUrl" alt="">
                            </div>
                            <!-- 收藏功能 -->
                            <p class="isLike"  @click="collectHandle(item)">
                                <Icon type="ios-heart" size="30" color="red" v-if="item.favorite" />
                                <Icon type="ios-heart" size="30" color="rgb(83, 210, 232)" v-else />
                            </p>
                            <div class="prod_info">
                                <!-- 商品编码 -->
                                <div class="prod_title" v-if="item.item_no">
                                    <h3>
                                        <span >{{item.item_no}}</span>
                                        <span style="width: 24px;height:20px;display:inline-block;">
                                            <Icon type="md-copy" size="20" class="copy_icon" title="货号复制" v-clipboard:copy="item.item_no" v-clipboard:success="onCopy" v-clipboard:error="onError" />
                                        </span>
                                    </h3>
                                </div>
                                <div class="prod_name" title="查看商品详情" @click="goGoodsDetail(item)">
                                    <a>{{item.item_name}}</a>
                                </div>
                                <div class="prod_price">
                                    零售价：<span>￥{{item.sale_price }}</span>
                                </div>
                                <div class="collect_handle " v-if="item.favorite === 0" @click="collectHandle(item, item.favorite)" title="收藏商品"><span>收藏</span></div>
                                <div class="cancel_handle" v-else @click="collectHandle(item, item.favorite)" title="取消收藏"><span>取消</span></div>
                            </div>
                        </div>
                    </li>
                </ul>
                <!-- 如果商品数据为空时显示 -->
                <div class="empty_content" v-show="isShowEmpty" style="display: flex;justify-content: center;font-size: 20px;margin: 100px 0 30px 0;color: #0e434c;">
                    <p>新品更新中，敬请期待...</p>
                </div>
                <div class="pageContanier" v-if="isPageShow&&total!==0">
                    <Page :total="total" :page-size="pageSize" @on-change="changePage" :current="currentPage" show-elevator show-total></Page>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import {getUrlParams} from  '@/assets/js/tool.js'
import { mapActions } from 'vuex';
import NProgress from 'nprogress'   // 引入进度条
import 'nprogress/nprogress.css'    // 引入进度条
export default {
    data() {
        return {
            // 配送价数据
            distributionData: [
                {
                    price: '全部价格',
                    min_price: '',
                    max_price: '',
                },
                {
                    price: '0元 ~ 10元 ',
                    max_price: '10',
                    min_price: '0'
                },
                {
                    price: '11元 ~ 20元  ',
                    max_price: '20',
                    min_price: '11'
                },
                {
                    price: '21元 ~ 40元 ',
                    max_price: '40',
                    min_price: '21'
                },
                {
                    price: '41元 ~ 60元 ',
                    max_price: '60',
                    min_price: '41'
                },
                {
                    price: '61元以上 ',
                    min_price: '61',
                    max_price: '',
                },
            ],
            // 商品大类选择
            calssValue: "",
            // 选择到哪个价格
            disIndex:0,
            // 中国仓时商品大类的数据
            classList: [],
            // 商品大类选中哪个
            currentIndex: 0,
            // 得到网址的参数对象
            urlParams: {},
            defaultImg: 'http://dh.xmcpcn.com/Public/images/none.jpg',
            // 查看模式
            iconList: [
                {
                    title: '网格模式',
                    icon: 'grid'
                },
                {
                    title: '列表模式',
                    icon: 'navicon-round'
                }
            ],
            // 点击选中哪个查看模式
            iconIndex: 0,
            // 商品展示样式名称
            ulClassStr: 'line_list',
            // 商品数据
            goodsData: [],
            // 商品总数
            total: 0,
            // 每页条数
            pageSize: 50,
             // 当前页码
            currentPage: 1,
            // 是否显示内容为空提示的图片
            isShowEmpty: false,
            // 带过来的关键词
            keyword: '',
            // 是否要分页展示
            isPageShow: true,
            // 活动和搜索各自区分
            typeValue: '',
            price_min:'',
            price_max:'',
            // 打折商品折扣
            discountID: '',
            keywordName: '',
        }
    },

    created() {
        // 得到网址参数
        this.getUrlParams();
    },
    watch: {
        '$route' (to, from) {
            // 配送价点击显示
            this.disIndex = 0;
            // 最低价格
            this.price_min = "";
            // 最高价格
            this.price_max = "";
            // 商品类别选择
            this.calssValue = '';
            // 商品大类点击显示为0
            this.currentIndex = 0;
            this.getUrlParams();
        }
    },
    methods: {
        defImg() {
            let img = event.srcElement;
            img.src = this.defaultImg;
            img.onerror = null; //防止闪图
        },
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
        /**
         * 打开证书图标大图
         */
        windowOpen(url) {
            window.open(url)
        },
        /**
         * 选择类别
         */
        goodsClass(cls_id,index) {
            this.currentIndex = index;
            this.calssValue = cls_id;
            this.currentPage = 1;
            this.sameQuery("1", 0);
        },
        /**
         * 根据网址参数进行分析
         */
        getUrlParams() {
            this.urlParams = getUrlParams(); 
            this.keyword = this.urlParams.keyword;
            this.keywordName = this.keyword;
            this.typeValue = this.urlParams.select;  
            this.discountID = this.typeValue === 'D' ? this.urlParams.discount : '';
            NProgress.start();  // 进度条开始
            this.isShowEmpty = false;
            this.currentPage = 1;
            this.switchList();
        },
        /**
         * 得到搜索商品结果数据
         */
        getGoodsData() {
            NProgress.start(); // 进度条结束
            this.$resetAjax({
                type: 'GET',
                url: `/choose/goods/getlist`,
                data: {
                    cls: '',
                    keyword: this.keyword.trim(),
                    page: this.currentPage,
                    price_min: this.price_min,      // 最小价格
                    price_max: this.price_max,      // 最大价格
                },
                success: (res) => {
                    NProgress.done(); // 进度条结束
                    let result = JSON.parse(res).data;
                    if(result.list.data !== null && result.list.data.length !== 0) {
                        result.list.data.forEach(ele => {
                            ele.imgUrl = `https://ximiphoto.oss-cn-hangzhou.aliyuncs.com/thumb/${ele.item_no}.jpg?x-oss-process=style/300`;
                            ele.isShow = 'mouse_img';
                        });
                        this.goodsData = result.list.data;
                        // 复杂分页里的商品总数
                        this.isPageShow = true;
                        this.total = Number(result.list.total);
                    } else {
                        this.goodsData = [];
                        this.isShowEmpty = true;
                        this.total = 0;
                    }
                },
            })
        },
        /**
         * 收藏、取消收藏操作
         */
        collectHandle(item,favorite) {
            NProgress.start(); // 进度条结束
            this.$resetAjax({
                type: 'POST',
                url: '/choose/goods/add_favorite',
                data: {
                    type: favorite === 0 ? 1 : 2,   // 1收藏、2取消收藏
                    item_no: item.item_no
                },
                success: (res) => {
                    NProgress.done(); // 进度条结束
                    let result = JSON.parse(res);
                    item.favorite = favorite === 0 ? 1 : 0;
                    this.$Message.success({
                        duration: 3,
                        content: favorite === 0 ? '收藏商品成功 !' : ' 取消商品收藏成功 !'
                    });
                    this.getFavoriteNum({vm: this})
                }
            })
        },
        /**
         * 点击查看模式
         */
        changeClass(item,index) {
            this.iconIndex = index;
            if(index === 0) {
                // 网格形式
                this.ulClassStr = 'line_list';
            } else {
                // 列表形式
                this.ulClassStr = 'content_List';
            }
        },
        /**
         * 点击面包屑
         */
        clickBread(item, index) {
            if(item.name === '首页') {
                this.$root.keyword = '';
            }
            this.getGoodsData(item.name);
        },
        /**
         * 跳转到商品详情
         */
        goGoodsDetail(item) {
            let nonum;
            if(this.typeValue === 'J') {
                // 预售商品没有item_no,商品编码
                nonum = item.id;
                // this.$router.push({path: '/goodsDetail',query: {item_no:nonum,advance: 1}})
                var routeData = this.$router.resolve({ name: 'goodsDetail', query: {item_no:nonum,advance: 1}});
                window.open(routeData.href, '_blank');
            } else {
                nonum = item.item_no;
                // 新开页面跳转到商品详情页面
                // this.$router.push({path: '/goodsDetail',query: {item_no:nonum}})
                var routeData = this.$router.resolve({ name: 'goodsDetail', query: {item_no:nonum}});
                window.open(routeData.href, '_blank');
            }
        },
         /**
         *  切换页面
         */
        changePage(index) {
            this.currentPage = index;
            NProgress.start(); // 进度条结束
            this.isShowEmpty = false;
            this.isPageShow = false;
            // 查看是哪种商品列表
            this.switchList()
        },
        /**
         * 单击配送价里的价格区间
         */
        selectDis(item, index) {
            this.urlParams = getUrlParams(); 
            this.disIndex = index;
            this.currentPage = 1;
            this.price_min = item.min_price;
            this.price_max = item.max_price;
            this.switchList();
        },
        /**
         * 判断是哪一个接口请求
         */
        switchList() {
            switch(this.typeValue) {
                case 'BB':
                    // 输入的关键字
                    this.isPageShow = true;
                    this.getGoodsData();  // 要分页
                    break;
                case 'AA':
                    // 查询所有商品
                    this.isPageShow = true;
                    this.keyword = '';
                    this.keywordName = '全部商品'
                    this.getGoodsData();
                    break;
                case '0':
                    // 固定查询输入的关键字
                    this.isPageShow = true;
                    this.getGoodsData();  // 要分页
                    break;
            }
        }
    },

    
}
</script>
