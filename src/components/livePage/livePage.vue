<template>
    <div class="livePage">
         <!-- 导航栏 -->
        <div class="type_top">
            <div class="top_inner">
                <Breadcrumb separator="<b class='demo-breadcrumb-separator'>></b>">
                    <BreadcrumbItem :to="item.path" v-for="(item,index) in breadList" :key="index" @click.native="clickBread(item, index)">{{item.name}}</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="type_middle">
                <div class="middle_inner" >
                    <div class="inner_top"  v-if="isShowClick">
                        <div class="top_left">配送价：</div>
                        <ul class="top_right">
                            <li v-for="(item, index) in distributionData" :key="index" :class="{disSelect: disIndex == index}" @click="selectDis(item, index)">{{item.price}}</li>
                        </ul>
                    </div>
                    <div class="inner_bottom"  v-if="isShowClick">
                        <div class="bottom_left">分类：</div>
                        <ul class="bottom_right">
                            <li v-for="(item, index) in $root.goodsType" :key="index" :class="{selected: typeIndex == index}" @click="selectGoodsType(item, index)">{{item.cls_name}}</li>
                        </ul>
                    </div>
                    <!-- 点击一折专区时显示 -->
                    <p v-if="!isShowClick" class="live_tip">温馨提示：<span>福利大放送，一折专区，尽情购物，小本生意，不退不换</span></p>
                </div>
            </div>
        </div>
        <!-- 数据加载中 -->
        <div v-if="isSpin" style="width: 100%;display:flex;justify-content: center;">
            <img style="width:400px; height:400px;" src="@/assets/images/gif/5a69d591e14e73ce7aeccf9bd00ce91b.gif" alt="">
        </div>
        <!-- 商品列表 -->
        <div class="goods_content" v-if="!isSpin&&isShowEmpty===false">
            <div class="content_inner">
                   <h3 class="recommend">
                    <p>{{goodsListTitle}}</p>
                    <div class="recommed_right" style="display:flex;align-items: center;">
                        <span class="check_type" :class="{selected: iconIndex === index}" :title="item.title" v-for="(item,index) in iconList"  :key="index" @click="changeClass(item,index)" style="margin-right:5px;"><Icon :type="item.icon" size="20"></Icon></span>
                        <Page :total="total" :page-size="pageSize" @on-change="changePage" :current="currentPage" simple style="margin-left:15px;"></Page>
                    </div>
                </h3>
                <ul :class="ulClass">
                    <li v-for="(item,index) in goodsData" :key="index">
                        <div class="img" @click="goGoodsDetail(item.item_no)">
                            <img :src="item.imgUrl" alt="" class="img_content" @error="defImg()">
                            <div class="goods_info">
                                <h3>{{item.item_name}}</h3>
                                <p>{{item.item_no}}</p>
                            </div>
                        </div>
                        <div class="add_shop">
                            <div class="add_left">
                                <p>零售：<span class="retail">￥{{item.ling}}</span></p>
                            </div>
                            <div class="add_right">
                                <addCartPrice :multipleNum="item.spec" :InitPrice="item.spec" @onChange="shopChange($event,item)"></addCartPrice>
                                <img src="@/assets/images/enter/add_icon.png" alt="" @click="addShop(item)" title="加入购物车">
                                <span class="cnum" :title="item.cnumTitle" @click="addShop(item)" v-if="item.cnum !== 0">{{item.cnum}}</span>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="pageContanier">
                    <Page :total="total" :page-size="pageSize" @on-change="changePage" :current="currentPage" show-elevator show-total></Page>
                </div>
            </div>
        </div>
        <!-- 如果商品数据为空时显示 -->
        <div class="empty_content" v-show="isShowEmpty" style="background:#fff;">
            <div class="emprt_inner" style="width:1200px;margin:0 auto;display:flex;justify-content: center;">
                <img style="width:400px;height:400px;" src="https://img.zcool.cn/community/01b35f5b320c11a80120b95969bc40.gif" alt="">
            </div>
        </div>
        <BackTop></BackTop>
    </div>
</template>

<script>
import {getUrlParams} from  '@/assets/js/tool.js'
import addCartPrice from '../common/addCart-price.vue'   // 引入input加购购物车
import { mapState, mapActions } from 'vuex';
export default {
    components: {
        addCartPrice
    },
    data() {
        return {
            // 得到网址的参数对象
            urlParams: {},
            defaultImg: 'http://dh.xmcpcn.com/Public/images/none.jpg',
            // 点击分类里的li
            typeIndex: -1,
            // 面包屑数据
            breadList: [{
                name: '首页',
                path: '/enter'
            }],
            // 是否显示数据加载中
            isSpin: true,
            // 分类id
            typeId: '',
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
            // 商品展示样式名称
            ulClass: 'content_List',
            // 点击选中哪个查看模式
            iconIndex: 0,
            // 商品数据
            goodsData: [],
            // 配送价数据
            distributionData: [
                {
                    price: '全部 ',
                    min_price: '',
                    max_price: '',
                },
                {
                    price: '0~10 元 ',
                    max_price: '10',
                    min_price: '0'
                },
                {
                    price: '11~20 元 ',
                    max_price: '20',
                    min_price: '11'
                },
                {
                    price: '21~40 元 ',
                    max_price: '40',
                    min_price: '21'
                },
                {
                    price: '41~60 元 ',
                    max_price: '60',
                    min_price: '41'
                },
                {
                    price: '60 元以上 ',
                    min_price: '60',
                    max_price: '',
                },
            ], 
             // 价格区间最小值
            min_price: '',
            // 价格区间最大值
            max_price: '',
            // 配送价点击变色
            disIndex: 0,
            // 商品总数
            total: 0,
            // 每页条数
            pageSize: 20,
             // 当前页码
            currentPage: 1,
            // 是否显示内容为空提示的图片
            isShowEmpty: false,
            // 是否显示配送区间和商品分类点击项选择
            isShowClick: true,
            // 商品分类名
            goodsListTitle: '',
        }
    },
    watch: {
        $route(val) {
            this.getAnalysis(val.query.title)
        }
    },
    created() {
        // 得到网址参数
        this.urlParams = getUrlParams(); 
        // 分析面包屑
        this.getAnalysis(this.urlParams.title);
    },
    computed: {
        ...mapState([
            'headerCartData'
        ]),
        // 购物车页面展示数据
        cartData() {
            let data = {
                list: [],
                num: 0,
                totalPrice: 0
            };
            data.list.forEach(item => {
                data.num += Number(item.num);
                // 放大100倍，防止js小数点计数有问题
                data.totalPrice += Number(item.org_xj) * 100;
            });
            data.totalPrice = data.totalPrice / 100;
            return data;
        }
    },


    methods: {
        defImg() {
            let img = event.srcElement;
            img.src = this.defaultImg;
            img.onerror = null; //防止闪图
        },
        ...mapActions([
            'getDataCard'
        ]),
        /**
         * 分析面包屑
         */
        getAnalysis(title) {
            this.breadList = [
                {
                    name: '首页',
                    path: '/enter'  
                },
                {
                    path: `/livePage?title=${title}`,
                    name: `${title}`,
                    title: `${title}`  
                },
            ];
            // 判断是哪个活动
            this.judgeLive(title);
        },
        /*
        * 判断是哪个活动
        */ 
        judgeLive(title) {
            switch(title) {
                case '新品上架':
                    this.isShowClick = true;  // 显示配送区间和商品分类点击项选择
                    this.getNewGoodsUp();
                    break;
                case '最新补货':
                    this.isShowClick = true;  // 显示配送区间和商品分类点击项选择
                    this.latestReplenishment();
                    break;
                case '按店铺销售补货':
                    this.isShowClick = true;  // 是显示配送区间和商品分类点击项选择
                    this.salesReplenishment();
                    break;
                case '地区最畅销商品':
                    this.isShowClick = true;  // 是显示配送区间和商品分类点击项选择
                    this.bestSeller();
                    break;
                case '1折特价清仓(不退换)':
                    this.isShowClick = false;  // 不显示配送区间和商品分类点击项选择
                    this.discountClearance();
                    break;
                case '一件起订':
                    this.isShowClick = true;   // 显示配送区间和商品分类点击项选择
                    this.oneOrder();
                    break;
            }
        },
        /**
         * 得到新品上架数据
         */
        getNewGoodsUp() {
            this.isSpin = true;
            this.isShowEmpty = false;
            this.$resetAjax({
                type: 'GET',
                url: `/index.php/Somego/Category/new_goods`,
                data: {
                    p: this.currentPage,  // 页码
                    min_price: this.min_price, // 最小价格
                    max_price: this.max_price,  // 最大价格
                    cls: this.typeId, // 分类里各个的id
                },
                success: (res) => {
                    this.isSpin = false;
                    let result = JSON.parse(res);
                    if(result.list !== null && result.list.length !== 0) {
                        result.list.forEach(ele => {
                            ele.imgUrl = `https://ximiphoto.oss-cn-hangzhou.aliyuncs.com/thumb/${ele.item_no}.jpg?x-oss-process=style/300`,
                            ele.spec = Number(ele.spec);
                            ele.carNum = ele.spec;
                            ele.cnumTitle =`购物车已有${ele.cnum}件`;
                        });
                        this.goodsData = result.list;
                        // 复杂分页里的商品总数
                        this.total = result.other.count;
                        this.goodsListTitle = result.nav[1].title;
                    } else {
                        this.goodsData = [];
                        this.isShowEmpty = true;
                    }
                }
            })
        },
        /**
         *  得到最新补货数据
         */
        latestReplenishment() {
            this.isSpin = true;
            this.isShowEmpty = false;
            this.$resetAjax({
                type: 'POST',
                url: `/index.php/Somego/Category/bu_goods?p=${this.currentPage}&min_price=${this.min_price}&max_price=${this.max_price}&cls=${this.typeId}`,
                data: {
                    uid: this.$root.userData.uid,
                    hdid: this.$root.userData.hdid,
                },
                success: (res) => {
                    this.isSpin = false;
                    let result = JSON.parse(res);
                    if(result.list !== null && result.list.length !== 0) {
                        result.list.forEach(ele => {
                            ele.imgUrl = `https://ximiphoto.oss-cn-hangzhou.aliyuncs.com/thumb/${ele.item_no}.jpg?x-oss-process=style/300`,
                            ele.spec = Number(ele.spec);
                            ele.carNum = ele.spec;
                            ele.cnumTitle =`购物车已有${ele.cnum}件`;
                        });
                        this.goodsData = result.list;
                        // 复杂分页里的商品总数
                        this.total = result.other.count;
                        this.goodsListTitle = result.nav[1].title;
                    } else {
                        this.isShowEmpty = true;
                        this.goodsData = [];
                    }
                }
            })
        },
        /**
         * 得到按店铺销售补货数据
         */
        salesReplenishment() {
            this.isSpin = true;
            this.isShowEmpty = false;
            this.$resetAjax({
                type: 'POST',
                url: `/index.php/Somego/Category/get_sale?min_price=${this.min_price}&max_price=${this.max_price}&cls=${this.typeId}`,
                data: {
                    uid: this.$root.userData.uid,
                    hdid: this.$root.userData.hdid,
                },
                success: (res) => {
                    this.isSpin = false;
                    let result = JSON.parse(res);
                    if(result.list !== null && result.list.length !== 0) {
                        result.list.forEach(ele => {
                            ele.imgUrl = `https://ximiphoto.oss-cn-hangzhou.aliyuncs.com/thumb/${ele.item_no}.jpg?x-oss-process=style/300`,
                            ele.spec = Number(ele.spec);
                            ele.carNum = ele.spec;
                            ele.cnumTitle =`购物车已有${ele.cnum}件`;
                        });
                        this.goodsData = result.list;
                        // 复杂分页里的商品总数
                        this.total = result.other.count;
                        this.goodsListTitle = result.nav[1].title;
                    } else {
                        this.goodsData = [];
                        this.isShowEmpty = true;
                    }
                }
            })
        },
        /**
         * 得到地区最畅销商品数据
         */
        bestSeller() {
            this.isSpin = true;
            this.isShowEmpty = false;
            this.$resetAjax({
                type: 'POST',
                url: `/index.php/Somego/Category/get_province_sale?min_price=${this.min_price}&max_price=${this.max_price}&cls=${this.typeId}`,
                data: {
                    uid: this.$root.userData.uid,
                    hdid: this.$root.userData.hdid,
                },
                success: (res) => {
                    this.isSpin = false;
                    let result = JSON.parse(res);
                    if(result.list !== null && result.list.length !== 0) {
                        result.list.forEach(ele => {
                            ele.imgUrl = `https://ximiphoto.oss-cn-hangzhou.aliyuncs.com/thumb/${ele.item_no}.jpg?x-oss-process=style/300`,
                            ele.spec = Number(ele.spec);
                            ele.carNum = ele.spec;
                            ele.cnumTitle =`购物车已有${ele.cnum}件`;
                        });
                        this.goodsData = result.list;
                        // 复杂分页里的商品总数
                        this.total = result.other.count;
                        this.goodsListTitle = result.nav[1].title;
                    } else {
                        this.isShowEmpty = true;
                        this.goodsData = [];
                    }
                }
            })
        },
        /**
         * 得到一折清仓数据
         */
        discountClearance() {
            this.isSpin = true;
            this.isShowEmpty = false;
            this.$resetAjax({
                type: 'POST',
                url: `/index.php/Somego/Promotion/dis?p=${this.currentPage}`,
                data: {
                    uid: this.$root.userData.uid,
                },
                success: (res) => {
                    this.isSpin = false;
                    let result = JSON.parse(res);
                    if(result.list !== null && result.list.length !== 0) {
                        result.list.forEach(ele => {
                            ele.imgUrl = `https://ximiphoto.oss-cn-hangzhou.aliyuncs.com/thumb/${ele.item_no}.jpg?x-oss-process=style/300`,
                            ele.spec = Number(ele.spec);
                            ele.carNum = ele.spec;
                            ele.cnumTitle =`购物车已有${ele.cnum}件`;
                        });
                        this.goodsData = result.list;
                        // 复杂分页里的商品总数
                        this.total = result.other.count;
                        this.goodsListTitle = result.nav[2].title;
                    } else {
                        this.isShowEmpty = true;
                        this.goodsData = [];
                    }
                }
            })
        },
        /**
         * 得到一折起订数据
         */
        oneOrder() {
            this.isSpin = true;
            this.isShowEmpty = false;
            this.$resetAjax({
                type: 'POST',
                url: `/index.php/Somego/Promotion/min?min_price=${this.min_price}&max_price=${this.max_price}&p=${this.currentPage}&cls=${this.typeId}`,
                data: {
                    uid: this.$root.userData.uid,
                },
                success: (res) => {
                    this.isSpin = false;
                    let result = JSON.parse(res);
                    if(result.list !== null && result.list.length !== 0) {
                        result.list.forEach(ele => {
                            ele.imgUrl = `https://ximiphoto.oss-cn-hangzhou.aliyuncs.com/thumb/${ele.item_no}.jpg?x-oss-process=style/300`,
                            ele.spec = Number(ele.spec);
                            ele.carNum = ele.spec;
                            ele.cnumTitle =`购物车已有${ele.cnum}件`;
                        });
                        this.goodsData = result.list;
                        // 复杂分页里的商品总数
                        this.total = result.other.count;
                        this.goodsListTitle = result.nav[2].title;
                    } else {
                        this.isShowEmpty = true;
                        this.goodsData = [];
                    }
                }
            })
        },
        /**
         * 单击配送价里的价格区间
         */
        selectDis(item, index) {
            this.urlParams = getUrlParams(); 
            this.disIndex = index;
            this.currentPage = 1;
            this.min_price = item.min_price;
            this.max_price = item.max_price;
            this.getAnalysis(this.urlParams.title);
        },
        /**
         * 单击分类里的商品名称
         */
        selectGoodsType(item, index) {
            this.urlParams = getUrlParams(); 
            this.typeId = item.cls_id;
            this.currentPage = 1;
            this.typeIndex = index ;
            this.getAnalysis(this.urlParams.title);
        },
        /**
         * 点击面包屑
         */
        clickBread(item, index) {
            this.currentPage = 1;
            this.min_price = '';
            this.max_price = '';
            this.disIndex = 0;
            this.typeIndex = -1;
            this.id = '';
            this.urlParams = getUrlParams(); 
            this.getAnalysis(this.urlParams.title);
        },
        /**
         * 跳转到商品详情
         */
        goGoodsDetail(nonum) {
            // 新开页面跳转到商品详情页面
            let routeData = this.$router.resolve({ name: 'goodsDetail', query: {item_no:nonum}});
            window.open(routeData.href, '_blank');
        },
        /**
         * 更该商品的数量
         */
        shopChange(val, item) {
            item.carNum = val;
        },
        /**
         * 加入购物车请求
         */
        addShop(item) {
            this.$resetAjax({
                type: 'POST',
                url: '/index.php/Somego/Cart/addCart',
                data: {
                    sn: item.item_no,
                    num: item.carNum,
                    uid: this.$root.userData.uid,
                    hdid: this.$root.userData.hdid,
                    max_buy: 40, //最大数量加购物
                },
                success: (res) => {
                    if(JSON.parse(res).msg === 'ok') {
                        item.cnumTitle = `购物车已有${item.cnum}件`
                        this.$Message.success('添加成功');
                        this.getDataCard({
                            vm: this,
                            inland: '',
                            page: 1
                        }); 
                        item.cnum = Number(item.carNum) + Number(item.cnum)
                    } else {
                        this.$Message.error(JSON.parse(res).msg);
                    }
                },
            })
        },
        /**
         * 点击查看模式
         */
        changeClass(item,index) {
            this.iconIndex = index;
            if(index === 0) {
                // 网格形式
                this.ulClass = 'content_List';
            } else {
                // 列表形式
                this.ulClass = 'line_list';
            }
        },
         /**
         *  切换页面
         */
        changePage(index) {
            this.currentPage = index;
            this.getAnalysis(this.urlParams.title);
        },
    }
}
</script>
