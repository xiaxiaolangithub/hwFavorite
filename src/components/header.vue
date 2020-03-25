<template>
    <div id="app_header">
        <div class="header_inner">
            <!-- 用户名，退出 -->
            <div class="slite_left">
                <Dropdown class="own_info">
                    <a href="javascript:void(0)">
                       {{i18n.helloContent}} {{username}}
                        <Icon type="ios-arrow-down"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem class="list_footer">
                           <p class="login_out_header" @click="loginOut">{{i18n.signOut}}</p>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                 <!-- 全屏显示、全屏退出 -->
                <i class="icon-Group- iconfont expand" :title="i18n.outEXpand" v-show="fullscreen===true" @click="handleFullScreen"></i>
                <i class="icon-caozuo-quanping-zhankai iconfont expand" :title="i18n.expandShow" @click="handleFullScreen" v-show="fullscreen===false"></i>
            </div>
            <!-- 管理中心及切换语言 -->
            <div class="site_right">
                <!-- <p class="back-stage" @click="goBackStage">{{i18n.backmanagement}}</p> -->
                <p class="account">{{i18n.account}}<span>￥{{$root.account}}</span></p>
                <Dropdown>
                    <a href="javascript:void(0)">
                        {{i18n.management}} <Icon type="ios-arrow-down"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem>
                            <span @click="$router.push({path:'/order/confirmed', query: {name2: 'a',name3:'1',title: i18n.order}})">{{i18n.order}}</span>
                        </DropdownItem>
                        <DropdownItem>
                            <span @click="$router.push({path:'/order/salesFlow', query: {name2: 'b',name3:'3',title: i18n.salesFlow}})">{{i18n.StoreBusiness}}</span> 
                        </DropdownItem>
                        <DropdownItem>
                            <span @click="$router.push({path:'/order/personal', query: {name2: 'c',name3:'6',title: i18n.myPerson}})">{{i18n.personCenter}}</span> 
                        </DropdownItem>
                        <DropdownItem>
                            <span @click="$router.push({path:'/order/applyServices', query: {name2: 'd',name3:'11',title: i18n.applicationService}})">{{i18n.saleService}}</span>
                        </DropdownItem>
                        <!-- <DropdownItem class="list_footer">
                           <span @click="$router.push({path:'/order/salesFlow', query: {name2: 'b',name3:'3',title: '销售流水'}})">门店营业报表</span> 
                        </DropdownItem>
                        <DropdownItem class="list_footer">
                           <span @click="$router.push({path:'/order/favorite', query: {name2: 'c',name3:'8',title: '我的收藏夹'}})">个人中心</span> 
                        </DropdownItem>
                        <DropdownItem class="list_footer">
                           <span @click="$router.push({path:'/order/applyServices', query: {name2: 'd',name3:'11',title: '申请服务'}})">售后服务</span>
                        </DropdownItem> -->
                    </DropdownMenu>
                </Dropdown>
                <Dropdown style="margin-left: 20px" class="langChoice">
                    <a href="javascript:void(0)">
                        {{i18n.choice}}
                       <img :src="LangImg" alt="">
                       {{langText}}
                        <Icon type="ios-arrow-down"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem v-for="item in langList"  :key="item.value" @click.native="choiceDown(item)">
                            <img :src="item.src" alt="" style="width:30px;margin-right:10px;">{{item.label}}
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <!-- <p :title="i18n.signOut" @click="isLoginReady=true" class="shortcut">{{i18n.signOut}}</p> -->
                 <!-- <a href="">会员系统</a> -->
                <!-- <a @click="$router.push({path:'/order/favorite', query: {name2: 'c',name3:'8',title: '我的收藏夹'}})">收藏夹</a> -->
                <!-- <div class="shopcar_item" @mouseenter="isHasShopData"  @mouseleave="leaveCar" @click="$router.push({path: '/cart'})">
                     <img src="@/assets/images/enter/add_icon3.png"  class="shopcaricon" v-if="isShowEnter">
                     <img src="@/assets/images/enter/add_icon1.png"  class="shopcaricon" v-else>
                     <div>
                        <p style="display: flex;align-items: center;"><span style="font-size:10px;">数量：</span> <span style="margin-top: 2px;display: inline-block;margin-left:5px;">{{cartNum}} 件</span></p>
                        <p style="margin-top:-5px;"><span style="font-size:10px;margin-right: 5px;">金额：</span>{{totalPrice}}  元</p>
                     </div>
                </div> -->
                <!-- 购物车有数据 -->
                <!-- <ul class="shopcar_list">
                    <li v-for="(item,index) in headerCartData.list" :key="index" @mouseenter="item.shopDelIcon=true" @mouseleave="item.shopDelIcon=false;">
                        <div class="goods_image">
                            <img :src="item.imgUrl" alt="">
                        </div>
                        <span class="goods_title">{{item.item_name}}</span>
                        <span class="goods_price">{{item.price}} × {{item.num}}</span>
                        <Icon type="close-round" v-show="item.shopDelIcon" @click="delCartGoods(item)"></Icon>
                    </li>
                    <div class="go_carButton">
                        <div class="car_footer">
                            <p class="total_num">共 <span>{{cartNum}}</span> 件商品</p>
                            <p class="total_amount">合计 <span>{{totalPrice}} </span>元</p>
                        </div>
                        <Button class="go_shopCar" @click="$router.push({path: '/cart'})">去购物车结算</Button>
                    </div>
                </ul> -->
                
            </div>
        </div>
        <div class="search">
            <div class="search_top">
                <div class="inner_top">
                    <div class="inner_left" :title="i18n.goHome">
                        <a @click="$router.push({path: '/enter'})" :class='animationType' @mouseenter="animateEnter"  @mouseleave="animateLeave">
                            <img src="@/assets/images/login/go_home.png" style="height:40px;"/>
                        </a>
                    </div>
                    <!-- 查询商品 -->
                    <div class="inner_right">
                       <div style="display:flex;">
                            <Input v-model="genrename" @on-enter="searchGoods('BB')">
                                <Select v-model="genre" slot="prepend" :placeholder="i18n.placeholdertip" @on-change="changeGen(genre)">
                                    <Option v-for="item in genreList" :value="item.value" :key="item.value">{{item.name}}</Option>
                                </Select>
                            </Input>
                            <Button slot="append" icon="ios-search" @click="searchGoods('BB')" style="z-index:99;"></Button>
                       </div>
                        <!-- <Input v-model="$root.keywork" clearable @mousedown.stop.native="inputMousedown" @on-enter="searchGoods"/>
                        <Button slot="append" icon="ios-search" @click="searchGoods"></Button>
                        <div class="search-hot-words fade-in" v-if="$root.isKeyword">
                            <a v-for="(item, index) in inputData" :key="index">{{item.name}}</a>
                        </div>
                        <div class="keyword-list" v-if="isShowKeyList">
                            <ul class="result-list">
                                <li v-for="(item,index) in $root.keywordList" :key="index" @mousedown.stop="getKeyHistory(item)" @click="searchHis(item)">
                                    <a>
                                        <span class="keyword"></span>
                                        {{item.content}}
                                    </a>
                                </li>
                            </ul>
                        </div> -->
                        <div>
                            <a class="newArrivals" v-for="(item,index) in i18n.lineList" :key="index" :title="item.label" @click="$router.push({path: '/searchKey', query: {keyword: item.label, select: 'BB'}})">{{item.label}}</a>
                        </div>
                    </div>
                    <!-- 购物车 -->
                    <div @click="$router.push({path: '/cart'})" class="shopcar">
                        <!-- <Badge :count="pageNum" :title="i18n.cartNums"> -->
                        <!-- </Badge> -->
                        <!-- <span style="font-size:16px;margin-left:5px;">{{i18n.shopcar}}</span> -->
                        <div class="shopcart_left">
                            <i class="iconfont icon-gouwuche" style="font-size:36px;margin-right:10px;"></i>
                        </div>
                        <div class="shopcart_right">
                            <p>{{i18n.quality}}<span>{{pageNum}}</span></p>
                            <p>{{i18n.amount}}<span>￥{{listPrice}}</span></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="search_bottom">
                <div class="inner_bottom">
                    <ul class="inner_middle">
                        <!-- <li class="home_page" @click="$router.push({path: '/enter'})"><i class="icon-liuliangyunpingtaitubiao02 iconfont" style="font-size:20px;"></i>{{i18n.home}}</li> -->
                        <!-- v-if="$root.isAllGoods" -->
                        <li  @mouseenter="isShowGoods=true"  @mouseleave="allGoodsLeave" @click="searchGoods('AA')">
                            <a>{{i18n.classification}}</a>
                            <Icon type="arrow-down-b" size="16" style="color:#fff;"></Icon>
                        </li>
                        <li>
                            <i class="iconfont icon-xinpin" style="color:#f4ea2a;font-size: 22px;"></i>
                            <a class="newArrivals" @click="$router.push({path: '/searchKey', query: {keyword: i18n.NewArrivals, select: 'A'}})">{{i18n.NewArrivals}}</a>
                        </li>
                        <li>
                            <i class="iconfont icon-fangyikouzhaocopyx" style="color:#1afa29;font-size: 26px;"></i>
                            <a class="newArrivals" @click="$router.push({path: '/searchKey', query: {keyword: i18n.prevention, select: 'K'}})">
                                {{i18n.prevention}}
                            </a>
                        </li>
                        <li>
                            <i class="iconfont icon-yushouhuore" style="color:red;font-size: 22px;"></i>
                            <a class="newArrivals" @click="$router.push({path: '/searchKey', query: {keyword: i18n.advance, select: 'J'}})">
                                {{i18n.advance}}
                            </a>
                        </li>
                        <li v-if="$root.ipList.length!==0">
                            <Dropdown>
                                <a href="javascript:void(0)">
                                    {{i18n.IpGoods}}
                                    <Icon type="ios-arrow-down"></Icon>
                                </a>
                                <DropdownMenu slot="list" class="ipList">
                                    <DropdownItem v-for="item in $root.ipList" :key="item.id" @click.native="searchGoods(item.id)">{{item.name}}</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </li>
                         <li>
                            <a class="newArrivals" @click="$router.push({path: '/searchKey', query: {keyword: i18n.chinaProduct, select: 'F'}})">{{i18n.chinaProduct}}</a>
                        </li>
                        
                        <li>
                            <a class="newArrivals" @click="$router.push({path: '/searchKey', query: {keyword: i18n.Latest, select: 'B'}})">{{i18n.Latest}}</a>
                        </li>
                        <li>
                            <a class="newArrivals" @click="$router.push({path: '/searchKey', query: {keyword: i18n.oneOrder, select: 'E'}})">{{i18n.oneOrder}}</a>
                        </li>
                        <!-- <li>
                            <a class="newArrivals" @click="$router.push({path: '/searchKey', query: {keyword: i18n.clearance, select: 'D'}})">{{i18n.clearance}}</a>
                        </li> -->
                        <!-- <li v-for="(item,index) in $root.goodsType" :key="index" :title="item.cls_name"  @click="goTypeList(item)">
                            <a>{{item.cls_name}}</a>
                        </li> -->
                    </ul>
                    <!-- 上下轮播提示 -->
                    <!-- <vue-seamless-scroll :data="listData" :class-option="optionSingleHeight" class="seamless-warp">
                        <ul class="item">
                            <li v-for="(item,index) in listData" :key="index">
                                <span class="title" v-text="item.title"></span>
                            </li>
                        </ul>
                    </vue-seamless-scroll> -->
                    <p class="signOut" @click="isLoginReady=true;">{{i18n.signOut}}</p>
                    <div class="goods_list" v-if="isShowGoods" :class="{objClass:$root.isAllGoods}"  @mouseleave="allGoodsLeave">
                        <div class="googs_inner" @mouseleave="mouseLeaveTitle" @mouseenter="goodsMouseEnter">
                            <ul class="goods_inner_title">
                                <li v-for="(item,index) in $root.goodsType" :key="index" :class=" {active:current === index}" :title="item.cls_name" @mouseenter="mouseOverTitle(item,index)" @click="goTypeList(item)">
                                    <a >
                                        {{item.cls_name}}
                                    </a>
                                    <Icon type="ios-arrow-forward" />
                                </li>
                            </ul>
                            <div class="list_type"  v-if="isShowList">
                                <ul class="type_contanier">
                                    <li v-for="(item,index) in $root.goodsSmallType" :key="index" class="list_type_detail">
                                        <span class="detail_name">
                                            <a @click="goTypeList(item)" :title="item.cls_name" class="second_cla">{{item.cls_name}} </a>
                                            <Icon type="ios-arrow-forward" />
                                        </span>
                                        <a class="detail_item" v-for="(ele,i) in item.child" @click="goTypeList(ele)"  :key="i" :title="ele.cls_name">
                                            <a class="three_cla">{{ele.cls_name}}</a>
                                            <span> |</span>
                                        </a> 
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 退出提示 -->
        <Modal v-model="isLoginReady" draggable  :title="i18n.outTips" @on-ok="loginOut" @on-cancel="isLoginReady" class="app_header_loginOut">
            <p style="font-size:16px;">{{i18n.determine}}</p>
        </Modal>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations,mapActions } from 'vuex';
import bus from '@/assets/js/eventBus.js'
import {delCookie} from  '@/assets/js/tool.js'
import "@/assets/style/animate.less";                             // 引入动画样式

export default {
    data(){
        return {
            listData: [
                {
                    'title': '商品一',
                    'date': '2017-12-16'
                }, 
                {
                    'title': '商品二',
                    'date': '2017-12-16'
                }, 
                {
                    'title': '商品三',
                    'date': '2017-12-16'
                }, 
                {
                    'title': '商品四',
                    'date': '2017-12-16'
                },
                {
                    'title': '商品五',
                    'date': '2017-12-16'
                }, 
            ],
            // 是否显示退出登录提示框
            isLoginReady: false,
            current: -1,
            // 初始的动画效果
            animationType:"animated", 
            helloText:'',
            // 用户名
            username: localStorage.uname,
            // 退出失败提示
            loginOutTip: this.$t('headerPage').loginOutTip,
            // 选中哪个语言 
            langSelect: 3,
            // 语言图片
            LangImg: require('@/assets/images/ovearheader/china.png'),
            // 语言名称
            langText: '',
            // 语言数据
            langList: [
                {
                    value: 0,
                    label: '中文',
                    src: require('@/assets/images/ovearheader/china.png'),
                },
                {
                    value: 1,
                    label: 'English',
                    src: require('@/assets/images/ovearheader/usa.png'),
                },
            ],
            // 商品类别
            genre: '',
            // 活动数据
            genreList: this.$t('headerPage').genreList,
            // 搜索框关键词
            genrename: '',
            // 推荐商品
            recommendList: this.$t('headerPage').recommendList,
            // 不能输入空商品名查询
            keyworkTip: this.$t('headerPage').keyworkTip,
            // 输入框里固定数据
            inputData: [],
             // 活动数据
            liveData: [
                {
                    title: '新品上架',
                    name: '新品上架'                                  
                },
                {
                    title: '最新补货',
                    name: '最新补货'
                },
                {
                    title: '地区最畅销商品',
                    name: '地区最畅销商品'
                },
                {
                    title: '按店铺销售补货',
                    name: '按店铺销售补货'
                },
                {
                    title: '1折特价清仓(不退换)',
                    name: '1折特价清仓(不退换)'
                },
                {
                    title: '一件起订',
                    name: '一件起订'
                },
            ],
            isShowCar: false,
            // 是否显示搜索记录
            isShowKeyList: false,
            // 是否显示商品分类
            isShowList: false,
            // 是否显示左侧大的商品分类数据
            isShowGoods: false,
            // 时间延迟
            mousetimer: null,
            // 鼠标移入购物车白色购物车是否存在
            isShowEnter: true,
            // 退出登录成功提示
            loginOutSuccess: this.$t('headerPage.loginOutSuccess'),
            // ip系列数据
            IpListData: [],
            // 是否是全屏显示
            fullscreen: false
        }
    },
    mounted() {
        $(document).on('mousedown.input', () => {
            this.isShowKeyList = false;
            this.$root.isKeyword = true;
        });
    },
    destroyed() {
        $(document).off('mousedown.input');
    },
    computed: {
        // 引入headerPage里的中英文
        i18n() {
            return this.$t('headerPage') 
        },
        ...mapState([
            'headerCartData',
        ]),
        ...mapGetters([
            'totalPrice',
            'cartNum',
            'listNum',
            'pageNum',
            'listPrice',
        ]),
        optionSingleHeight () {
            return {
                 // （什么都不设置默认的）
                // singleHeight: 40,     // （带停顿的）
                waitTime:3500 ,        // （停顿时间）
                // direction: 0 ,         // （从上往下的）
                // // direction:2,           // （左右的）
                step:1,           //  （调整速度的）0
                // hoverStop:false       //  (鼠标停留停止 离开继续运行（反之则停止）)
            }
        }
             
    },
    watch: {
        /* '$root.isAllGoods'(val) {
            console.log(val, this.$root.isAllGoods)
            this.isShowGoods = !val;
        }, */
        isShowGoods(val) {
            if(!val) {
                this.current = -1;
            }
        }

    },
   created() {
        this.isShowGoods = false;
        // 获取头部购物车商品总数量和总金额
        this.getCartInfo({
            vm: this
        });
        this.username = localStorage.uname;
        // 判断登录进来选中哪种语言
        this.judgeLanguage();
        // 获取商品类别
        this.getAllCategories();
        // 获取推荐商品
        this.getCommendData();
        // 得到ip类型数据
        this.getIpList();
   },
    methods: {
        ...mapMutations([
            'setCartDataList',
            'setCartDataListNum',
            'setTotalPrice',
            'setCartDataCartTypeCate',
            'setPageNum',
        ]),
        ...mapActions([
            'getDataCard',
            'getCartInfo'
        ]),
        /**
         * 全屏显示
         */
        handleFullScreen(){
            let element = document.documentElement;
            if (this.fullscreen) {
                if (document.exitFullscreen) {
                document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
                }
            } else {
                if (element.requestFullscreen) {
                element.requestFullscreen();
                } else if (element.webkitRequestFullScreen) {
                element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                // IE11
                element.msRequestFullscreen();
                }
            }
            this.fullscreen = !this.fullscreen;
        },
        /**
         * 背景图动起来
         */
        animateEnter() {
            this.animationType = 'animated pulse'
        },
        /**
         * 背景图恢复原样
         */
        animateLeave() {
            this.animationType = 'animated bounce'
        },
        /**
         * 去后台页面
         */
        goBackStage() {
            localStorage.langBack = localStorage.langSelect;
            this.$router.push({path: '/backStage'});
        },
        /**
         * 得到ip类型数据
         */
        getIpList() {
            this.$resetAjax({
                type: 'GET',
                url: `/home/Goods/get_all_ip`,
                success: (res) => {
                    let arr = [];
                    let result = JSON.parse(res);
                    result.forEach(ele => {
                        switch(localStorage.langSelect) {
                            case '0':
                                arr.push({
                                    id: ele.id,
                                    name: ele.name
                                }) ;
                                break;
                            case '1':
                                arr.push({
                                    id: ele.id,
                                    name: ele.name_en
                                }) ;
                                break;
                        }
                    })
                    this.IpListData = arr;
                    this.$root.ipList = arr;
                }
            })
        },
        /**
         * 判断登录进来选中哪种语言
         */
        judgeLanguage() {
            let lang = localStorage.language;
            switch(lang) {
                case 'zh':
                    this.langSelect = 0;
                    localStorage.langSelect = this.langSelect;
                    this.LangImg = require('@/assets/images/ovearheader/china.png');
                    this.langText = '中文';
                    break;
                case 'en': 
                    this.langSelect = 1;
                    localStorage.langSelect = this.langSelect;
                    this.langText = 'English';
                    this.LangImg = require('@/assets/images/ovearheader/usa.png');
                    break;
            }
            
        },
        /**
        * 退出登录 
         */
        loginOut() {
            this.$resetAjax({
                type: 'POST',
                url: `/Home/Login/logout`,
                data: {
                    uid: localStorage.uid,
                },
                success: (res) => {
                    let result = JSON.parse(res);
                    let code = result.res;
                    switch(code) {
                        case 'code0':
                            localStorage.uid = '';         // 用户uid
                            localStorage.hdid = '';        // 用户hdid
                            localStorage.isvip = '';       // 用户是否是vip用户
                            localStorage.max_buy = '';     // 用户最大购物商品数量
                            localStorage.language = '';  // 用户在用语言
                            localStorage.uname = '';       // 用户姓名
                            localStorage.account = '';     // 用户余额
                            localStorage.collectLen = '';  // 用户收藏商品数量
                            localStorage.integral = '';    // 用户积分
                            localStorage.cartNum = '';     // 购物车数量
                            localStorage.langSelect = '';   // 默认英文
                            localStorage.cost_num = ''; // 用户因为私货被扣款的金额
                             localStorage.firstPlayFlag = "0"; // firstPlayFlag用来判断私货提示框是否已提醒过（只能提醒一次），0表示未提醒过，1表示已提醒 
                             this.$Message.success({
                                content: this.loginOutSuccess,
                                duration: 1.5
                            });
                            // 判断是否记住密码
                            if(localStorage.remember === 'true') {
                                localStorage.user = localStorage.user;
                                localStorage.pass = localStorage.pass;
                            } else {
                                localStorage.user = '';
                                localStorage.pass = '';
                            }
                            setTimeout(() => {
                                this.$router.push('/login');
                                this.$nextTick(() => {
                                    location.reload();
                                })
                            }, 1800);
                            break;
                        case 'code1':
                            this.$Message.error(this.loginOutTip);
                            break;
                    }
                },
            })
        },
        /**
         * 获取商品类别
         */
        getAllCategories() {
            this.$resetAjax({
                type: 'POST',
                url: '/Home/Category/categories_tree1',
                data: {
                    type: localStorage.langSelect,  // 中英文
                },
                success: (res) => {
                    let result = JSON.parse(res)
                    result.forEach(ele => {
                        ele.isSelected = false; // 添加一个属性，让商品每一个大分类为false，方便后续鼠标经过大分类里的小分类大分类颜色为红色
                    });
                    this.$root.goodsType = result;   // 得到商品大分类
                }
            })
        },
        /**
        * 获取推荐商品
        */
        getCommendData() {
            this.$resetAjax({
                type: 'POST',
                url: '/Home/Goods/Recommend',
                data: {
                    lang: localStorage.langSelect,
                    uid: localStorage.uid
                },
                success: (res) => {
                    let result = JSON.parse(res);
                    result.forEach(ele => {
                        ele.imgUrl = `https://ximiphoto.oss-cn-hangzhou.aliyuncs.com/thumb/${ele.item_no}.jpg?x-oss-process=style/800`;
                        ele.spec = Number(ele.purchase_spec);
                        ele.carNum = Number(ele.purchase_spec);
                    });
                    this.$root.commendList = result;
                },
            })
        },
        /*
        *   切换语言
        */
        choiceDown(item) {
            location.reload();
            localStorage.language = '';
            this.$i18n.locale = (item.value === 0) ? 'zh' : 'en';
            localStorage.language = this.$i18n.locale;
            this.langSelect = item.value;
            localStorage.langSelect = this.langSelect;
            this.judgeLanguage();
        },
        /**
         * 得到表头里的购物车商品数据
         */
        /* getCartData() {
            this.$resetAjax({
                type: 'POST',
                url: '/index.php/Home/Cart/index',
                data: {
                    uid: localStorage.uid,
                    lang: localStorage.langSelect,
                },
                success: (res) => {
                    let result = JSON.parse(res);
                    if(result.list.length !== 0) {
                        let result = result.list;
                        result.list.forEach(ele => {
                            ele.imgUrl = `https://ximiphoto.oss-cn-hangzhou.aliyuncs.com/thumb/${ele.item_no}.jpg?x-oss-process=style/80`;
                            ele.content = '';
                        });
                        this.setCartDataList(result.list);
                        // 购物车商品总数量
                        this.setCartDataListNum(result.spnum);
                        // 购物车总金额
                        this.setCartDataListPrice(result.spprice);
                    }
                },
            })
        }, */
        /**
         * 判断是否有购物车数据，显示哪个内容
         */
        isHasShopData() {
            this.isShowEnter = false;
            if(this.$root.headerCartData.list.length === 0) {
                this.$root.headerCartData.isHasNoCar = true;
                this.$root.headerCartData.isShowCar = false;
            } else {
                this.$root.headerCartData.isHasNoCar = false;
                this.$root.headerCartData.isShowCar = true;
            }
        },
        /**
         * 鼠标移出购物车头部
         */
        leaveCar() {
            this.$root.headerCartData.isHasNoCar = false;
            this.isShowEnter = true;
        },
        /**
         *  鼠标移入大盒子商品数据
         */
        goodsMouseEnter() {
            clearTimeout(this.mousetimer)
        },
        /**
         * 离开所有商品
         */
        allGoodsLeave() {
            this.mousetimer = setTimeout(() => {
                this.isShowGoods = false;
            }, 100);
        },
        /**
         * 鼠标移入商品标题
         */
        mouseOverTitle(item,index) {
            // 得到商品小分类
            this.current = index;
            this.$root.goodsSmallType = item.child;
            this.isShowList = true;
        },
        /**
         * 鼠标移出商品标题
         */
        mouseLeaveTitle() {
            this.isShowList = false;
            if(this.$root.isAllGoods) {
                this.isShowGoods = false;
            }
        },
        /**
         *  鼠标弹下搜索框里
         */
        inputMousedown() {
            this.isShowKeyList = true;
            this.$root.isKeyword = false;
        },
        /**
         *  获取本地搜索关键字记录
         */
        getKeyHistory(item) {
        },
        /**
         * 快捷商品查询
         */
        goReCommend(item) {
            this.genrename = item.name;
            this.$root.keywork = this.genrename;
            this.$root.isKeyword = false; // 让输入框里的默认关键词消失
            this.$router.push({path: '/searchKey', query: {keyword: this.$root.keywork, select: 0}})
        },
        /**
         * 查询框左边下拉框
         */
        changeGen(value) {
            let name = '';
            this.genreList.forEach(ele => {
                if(ele.value === value) {
                    name = ele.name;
                }
            })
            $('.ivu-select-selected-value').text(this.i18n.placeholdertip)
            switch(value) {
                case 'A':
                    // 新产品上线
                    this.$router.push({path: '/searchKey', query: {keyword:name, select:'A'}});
                    break;
                case'B':
                    // 最新补货
                    this.$router.push({path: '/searchKey', query: {keyword:name, select: 'B'}});
                    break;
                /* case 3:
                    // 地区最畅销商品
                    this.$router.push({path: '/searchKey', query: {keyword:name, select: 3}});
                    break; */
                case 'C':
                    // 3折特价清仓(不退换)
                    this.$router.push({path: '/searchKey', query: {keyword:name, select: 'C'}});
                    break;
                case 'D':
                    // 1折特价清仓(不退换)
                    this.$router.push({path: '/searchKey', query: {keyword:name, select: 'D'}});
                    break;
                case 'E':
                    // 一件起订
                    this.$router.push({path: '/searchKey', query: {keyword:name, select: 'E'}});
                    break;
                case 'F':
                    // 中国仓产品
                    this.$router.push({path: '/searchKey', query: {keyword:name, select:'F'}});
                    break;
            }
        },
        /**
         *  搜索商品
         */
        searchGoods(data) {
            this.genre = '';
            // 全部商品
            if(data === 'AA') {
                let name = '';
                if(localStorage.langSelect === '0') {
                    name = '全部商品';
                } else {
                    name = 'All merchandise'
                }
                this.$router.push({path: '/searchKey', query: {keyword: name, select: 'AA'}});
                return false;
            }
            // 商品查询
            if(data === 'BB') {
                if(this.genrename === '') {
                    this.$Message.warning({
                        content: this.keyworkTip,
                        duration: 3
                    });
                    return false;
                }
                this.$root.keywork = this.genrename;
                this.$root.isKeyword = false; // 让输入框里的默认关键词消失
                let value = 0;
                this.genrename = "";
                this.$router.push({path: '/searchKey', query: {keyword: this.$root.keywork, select: 'BB'}})
                return false;
            }
            // IP系列
            let ipName = '';
            this.$root.ipList.forEach(ele => {
                if(ele.id === data) {
                    ipName = ele.name;
                }
            })
            this.$router.push({path: '/searchKey', query: {keyword: ipName, select: data}})
        },
        /**
         * 通过搜索历史记录关键词来搜索商品
         */
        searchHis(item) {
            this.$root.isKeyword = false; // 让输入框里的默认关键词消失
            this.$root.keywork = item.content;
            this.$router.push({path: '/searchKey', query: {keyword: this.$root.keywork}})
        },
        /**
         * 鼠标经过购物车弹窗里面的li
         */
        mouseenterLi(item) {
            item.shopDelIcon = true;
        },
         /**
         * 去显示所有商品列表
         */
        getAllGoods() {
            this.$root.keywork = '';
            this.$router.push({path: '/typeList', query: {cls_id: 0}})
        },
        /**
         * 跳转到商品分类页面
         */
        goTypeList(item) {
            this.isShowGoods = false; //鼠标点击商品分类时把商品分类显示左右商品分类隐藏 
            this.genrename = this.$root.keywork = '';
            this.$router.push({path: '/typeList', query: {cls_id: item.cls_id,name: item.cls_name}})
        },
        /**
         * 去销售补货页面
         */
        goreplensh() {
            this.$root.keywork = '';
            this.$router.push({path: '/replenishment', query: {title: '按销售补货'}})
        },
        /**
         * 跳转到活动商品页面
         */
        goLivePage(item) {
            this.$root.keywork = '';
            let title = item.title;
            this.$router.push({path: '/livePage',query:{title: `${title}`}})
        },
        /**
         * 点击删除购物车数据
         */
        /* delCartGoods(item) {
            this.$resetAjax({
                type: 'POST',
                url: `/index.php/Somego/Cart/delGoods?sn=${item.item_no}`,
                data: {
                    uid: this.$root.userData.uid,
                },
                success: (res) => {
                    let result = JSON.parse(res).result;
                    if(result === 'ok') {
                        this.$Message.success('很不舍, 由于您成功删除了该项商品');
                        this.getCartData();
                    } else{
                        this.$Message.error('抱歉亲亲, 删除失败');
                    }
                },
            })
        }, */
        
        
    }
    
}
</script>

