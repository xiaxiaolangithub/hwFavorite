<template>
    <div id="app_header">
        <div class="header_inner">
            <!-- 用户名，退出 -->
            <div class="slite_left">
                <Dropdown class="own_info">
                    <a href="javascript:void(0)">
                       您好! {{username}}
                        <Icon type="ios-arrow-down"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem class="list_footer">
                           <p class="login_out_header" @click="loginOut">退出登录</p>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                 <!-- 全屏显示、全屏退出 -->
                <i class="icon-Group- iconfont expand" title="退出全屏" v-show="fullscreen===true" @click="handleFullScreen"></i>
                <i class="icon-caozuo-quanping-zhankai iconfont expand" title="全屏显示" @click="handleFullScreen" v-show="fullscreen===false"></i>
            </div>
            <div class="slite_right" >
                <p @click="$router.push({path: '/order/personal', query: {key: '个人中心'}})">个人中心</p>
                <p @click="$router.push({path: '/order/favorite', query:{key: '我的收藏'}})">我的收藏 <span>( {{favoriteNum}} )</span></p>
            </div>
        </div>
        <div class="search">
            <div class="search_top">
                <div class="inner_top">
                    <div class="inner_left" title="返回首页">
                        <a @click="$router.push({path: '/enter'})" :class='animationType' @mouseenter="animateEnter"  @mouseleave="animateLeave">
                            <img src="@/assets/images/login/go_home.png" style="height:40px;"/>
                        </a>
                    </div>
                    <!-- 查询商品 -->
                    <div class="inner_right">
                       <div style="display:flex;">
                            <Input v-model="genrename" @on-enter="searchGoods('BB')" />
                            <Button slot="append" icon="ios-search" @click="searchGoods('BB')" style="z-index:99;"></Button>
                       </div>
                        <div>
                            <a class="newArrivals" v-for="(item,index) in lineList" :key="index" :title="item.label" @click="specialSearch(item.label, 'BB')">{{item.label}}</a>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div class="search_bottom">
                <div class="inner_bottom">
                    <ul class="inner_middle">
                        <li  @mouseenter="isShowGoods=true"  @mouseleave="allGoodsLeave" @click="searchGoods('AA')">
                            <a style="font-weight:bold;">全部商品</a>
                            <Icon type="arrow-down-b" size="16" style="color:#fff;"></Icon>
                        </li>
                        <li v-for="(item,index) in $root.goodsType" :key="index"  @click="goTypeList(item)">
                            <a>{{item.cls_name}}</a>
                        </li>
                    </ul>
                    <p class="signOut" @click="isLoginReady=true;">退出登录</p>
                    <div class="goods_list"  v-if="isShowGoods" :class="{objClass:$root.isAllGoods}"  @mouseleave="allGoodsLeave">
                        <div class="googs_inner" @mouseleave="mouseLeaveTitle" @mouseenter="goodsMouseEnter">
                            <ul class="goods_inner_title">
                                <li v-for="(item,index) in $root.goodsType" :key="index" :class=" {active:current === index}" :title="item.cls_name" @mouseenter="mouseOverTitle(item,index)" @click="goTypeList(item)">
                                    <a >
                                        {{item.cls_name}}
                                    </a>
                                    <Icon type="ios-arrow-forward" />
                                </li>
                            </ul>
                            <div class="list_type" v-if="isShowList">
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
        <Modal v-model="isLoginReady" draggable  title="温馨提示" @on-ok="loginOut" @on-cancel="isLoginReady=false;" class="app_header_loginOut">
            <p style="font-size:16px;">亲爱的，您确定要退出登录吗 ？</p>
        </Modal>
    </div>
</template>

<script>
import bus from '@/assets/js/eventBus.js'
import {delCookie} from  '@/assets/js/tool.js'
import "@/assets/style/animate.less";                             // 引入动画样式
import { mapState, mapGetters, mapMutations,mapActions } from 'vuex';
export default {
    data(){
        return {
            animationType:"animated bounce infinite",
            lineList: [
                {
                    label: '口红'
                },
                {
                    label: '面膜'
                },
                {
                    label: '香水'
                },
                {
                    label: '饰品'
                },
                {
                    label: '拖鞋'
                },
                {
                    label: '玩具'
                },
                {
                    label: '毛巾'
                },
                {
                    label: '包包'
                },
                {
                    label: '数据线'
                },
                {
                    label: '耳机'
                },
            ],
            // 是否显示退出登录提示框
            isLoginReady: false,
            current: 0,
            // 初始的动画效果
            animationType:"animated", 
            // 用户名
            username: localStorage.whname,
            // 选中哪个语言 
            langSelect: 0,
            // 语言名称
            langText: '',
            // 商品类别
            genre: '',
            // 搜索框关键词
            genrename: '',
            // 是否显示商品分类
            isShowList: false,
            // 是否显示左侧大的商品分类数据
            isShowGoods: false,
            // 时间延迟
            mousetimer: null,
            // 是否是全屏显示
            fullscreen: false,
        }
    },
    mounted() {
        $(document).on('mousedown.input', () => {
            this.$root.isKeyword = true;
        });
    },
    destroyed() {
        $(document).off('mousedown.input');
    },
    computed: {
        ...mapState([
            'favoriteNum'
        ]),
        ...mapGetters([
            'favoriteNum',
        ]),
             
    },
    watch: {
        isShowGoods(val) {
            if(!val) {
                this.current = -1;
            }
        }

    },
   created() {
        this.username = localStorage.whname;
        localStorage.langSelect = 0;
        // 获取商品类别
        this.getAllCategories();
   },
    methods: {
        ...mapMutations([
            'setFavoriteNum'
        ]),
        ...mapActions([
            'getFavoriteNum'
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
        specialSearch(label, num) {
            $('.ivu-select-selected-value').text('请选择')
            this.$router.push({path: '/searchKey', query: {keyword: label, select: num}})
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
        * 退出登录 
         */
        loginOut() {
            this.$resetAjax({
                type: 'GET',
                url: `/choose/Login/logout`,
                success: (res) => {
                    let result = JSON.parse(res);
                    let code = result.errorcode;
                    switch(code) {
                        case 200:
                            localStorage.whname = '';       // 用户姓名
                            localStorage.langSelect = '0';  
                             this.$Message.success({
                                content: '退出登录成功',
                                duration: 1.5
                            });
                            // // 判断是否记住密码
                            // if(localStorage.remember === 'true') {
                            //     localStorage.whname = localStorage.whname;
                            //     localStorage.whpass = localStorage.whpass;
                            // } else {
                            //     localStorage.whname = '';
                            //     localStorage.whpass = '';
                            // }
                            setTimeout(() => {
                                this.$router.push('/login');
                                this.$nextTick(() => {
                                    location.reload();
                                })
                            }, 1800);
                            break;
                        default:
                            this.$Message.error('退出登录失败！');
                            break;
                    }
                },
            })
        },
        /**
         * 获取商品类别
         */
        getAllCategories() {
            if(this.$root.goodsType.length !== 0) {
                return false;
            }
            this.$resetAjax({
                type: 'POST',
                url: '/choose/goods/getcls',
                success: (res) => {
                    let result = JSON.parse(res).data;
                    result.forEach(ele => {
                        ele.isSelected = false; // 添加一个属性，让商品每一个大分类为false，方便后续鼠标经过大分类里的小分类大分类颜色为红色
                    });
                    this.$root.goodsType = result;   // 得到商品大分类
                }
            })
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
         *  搜索商品
         */
        searchGoods(data) {
            $('.ivu-select-selected-value').text('请选择')
            $('.ivu-select-placeholder').text('请选择')
            // 全部商品
            if(data === 'AA') {
                let name =  '全部商品';
                this.$router.push({path: '/searchKey', query: {keyword: name, select: 'AA'}});
                return false;
            }
            // 商品查询
            if(data === 'BB') {
                if(this.genrename === '') {
                    this.$Message.warning({
                        content: '抱歉，查询的商品名称不能为空',
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
        },
        /**
         * 跳转到商品分类页面
         */
        goTypeList(item) {
            $('.ivu-select-selected-value').text('请选择')
            this.isShowGoods = false; //鼠标点击商品分类时把商品分类显示左右商品分类隐藏 
            this.genrename = this.$root.keywork = '';
            this.$router.push({path: '/typeList', query: {cls_id: item.cls_id,name: item.cls_name}})
        },
        
    }
    
}
</script>

