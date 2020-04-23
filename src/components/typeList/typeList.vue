<template>
    <div id="typeList">
        <div class="inner">
            <!-- 导航栏 -->
            <Breadcrumb separator=">" class="bg_title">
                <BreadcrumbItem to="/enter" class="home_title"><i class="icon-liuliangyunpingtaitubiao02 iconfont"></i> 首页</BreadcrumbItem>
                <BreadcrumbItem v-for="(item,index) in breadName" :key="index"  :class="item.breadClass" @click.native="clickBread(item,index)">{{item.cls_name}}</BreadcrumbItem>
            </Breadcrumb>
            <div class="typeList_content">
                <!-- 左侧导航栏 -->
                <div class="type_nav">
                    <Collapse v-model="panelValue">
                        <Panel v-for="(item,index) in panelData" :name="String(index+1)" :hide-arrow="false"  :key="index" >
                            <p class="pannel_name"  @click="panelClick(item.cls_id)"  :title="item.cls_name">{{item.cls_name}}</p>
                            <span class="icon_more" ></span>
                            <p slot="content" v-for="ele in item.child" v-show="item.child.length !== 0"  :key="ele.cls_id" :class="{'active':ind === ele.cls_id}" @click="changeBgc(ele.cls_id)" >
                                <span class="spot"></span>
                                <span>{{ele.cls_name}}</span>
                            </p>
                        </Panel>
                    </Collapse>
                </div>
                <!-- 右侧商品列表 -->
                <div class="type_container">
                    <div class="type_middle">
                        <div class="price_left">销售价：</div>
                        <ul class="price_right">
                            <li v-for="(item, index) in distributionData" :key="index" :class="{disSelect: disIndex == index}" @click="selectDis(item, index)">{{item.price}}</li>
                        </ul>
                    </div>
                    <div class="type_top">
                        <p>推荐</p>
                        <div class="top_right">
                            <span class="check_type" :class="{selected: iconIndex === index}" :title="item.title" v-for="(item,index) in iconList"  :key="index" @click="changeClass(item,index)" style="margin-right:5px;">
                                <Icon :type="item.icon" size="24"></Icon>
                            </span>
                            <Page :total="total" :page-size="pageSize" @on-change="changePage" class="simple_Page" :current="currentPage" simple style="display:flex;justify-content: flex-end;padding: 10px;"></Page>
                        </div>
                    </div>
                    <!-- 如果商品数据为空时显示 -->
                    <div class="empty_content" v-show="isShowEmpty" style="display: flex;justify-content: center;font-size: 20px;margin-top: 100px;color: #0e434c;">
                        <p>新品更新中，敬请期待...</p>
                    </div>
                    <ul :class="ulClass">
                        <li v-for="(item,index) in goodsData" :key="index">
                            <div class="item_content">
                                <div class="prod_top" @click="goGoodsDetail(item.item_no)"   @mouseenter="item.isShow=true" @mouseleave="item.isShow=false">
                                    <img v-lazy="item.imgUrl" alt="" title="点击查看商品详情">
                                </div>
                                <!-- 鼠标移入商品大图 -->
                                <div class="mouse_img">
                                    <img :src="item.imgUrl" alt="" v-if="item.isShow && ulClass === 'content_List'">
                                </div>
                                <p class="isLike" @click="collectHandle(item, item.favorite)">
                                    <Icon type="ios-heart" size="30" color="red" v-if="item.favorite" />
                                    <Icon type="ios-heart" size="30" color="rgb(83, 210, 232)" v-else />
                                </p>
                                <div class="prod_info">
                                    <h3 class="prod_code">
                                        {{item.item_no}}
                                        <span style="width: 24px;height:20px;display:inline-block;">
                                            <Icon type="md-copy" size="20" class="copy_icon" title="货号复制" v-clipboard:copy="item.item_no" v-clipboard:success="onCopy" v-clipboard:error="onError" />
                                        </span>
                                    </h3>
                                    <h3 class="prod_name" :title="item.item_name">{{item.item_name}}</h3>
                                    <div class="prod_price" :class="langClass">
                                        <p class="export">
                                            <span class="unit_title">售价：</span>
                                            <span>￥{{item.sale_price }}</span>
                                        </p>
                                    </div>
                                    <div class="prod_handle">
                                        <a class="cancel_handle" v-if="item.favorite === 0" @click="collectHandle(item, item.favorite)" title="收藏商品">收藏</a>
                                        <a class="add_handle" v-else @click="collectHandle(item, item.favorite)" title="取消收藏">取消</a>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="pageContanier" v-show="total !== 0">
                        <Page :total="total" :page-size="pageSize" @on-change="changePage" :current="currentPage" show-elevator show-total></Page>
                    </div>
                </div>
            </div>
        </div>
        <!-- 全部加入购物车 请输入最小起订量倍数-->
        <Modal v-model="modal"  draggable title="请输入最小起订量倍数" class="addAllModal">
            <input  v-model="num" style="width: 100%; padding: 5px 15px;border:1px solid #218da0;" type="number" min="1" placeholder="请输入最小起订量倍数">
            <div class="ivu-modal-footer-own">
                <button class="ivu-btn ivu-btn-text" @click="modal=false">
                    <span>取消</span>
                </button> 
                <Button :loading="loading"  class="ivu-btn ivu-btn-primary" @click="addAll">
                    <span>确定</span>
                </Button>
            </div>
        </Modal>
    </div>
</template>


<script>
import collImg from '@/assets/images/enter/lover.png'  // 引入取消收藏图标 
import cancelImg from '@/assets/images/goodsDetail/lover2.png'  // 引入收藏图标  
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
            // 查看模式
            iconList: [
                {
                    title: '网格模式',
                    icon: 'ios-apps'
                },
                {
                    title: '列表模式',
                    icon: 'md-menu'
                },
            ],
            // 点击选中哪个价格
            disIndex: 0,
            // 快捷加购时确定按钮是否加载显示
            loading: false,
            // 得到网址的参数对象
            urlParams: {},
            // 商品面包屑
            breadName: [],
            // 左侧折叠面板默认选中哪个
            tst: '1',
            panelValue:'1',
            panelData: [],
            defaultImg: 'http://dh.xmcpcn.com/Public/images/none.jpg',
            ind: '',
            indac: '',
            // 点击分类里变色
            typeIndex: -1,
            // 配送价点击变色
            disIndex: 0,
            // 点击选中哪个查看模式
            iconIndex:0,
            // 商品展示样式名称
            ulClass: 'type_list',
            // 商品分类数据
            typeListData: [],
            // 商品数据
            goodsData: [],
            isFirstEnter: true,
            // 价格区间最小值
            min_price: '',
            // 价格区间最大值
            max_price: '', 
            // 商品总数
            total: 0,
            // 每页条数
            pageSize: 50,
             // 当前页码
            currentPage: 1,
            // 是否显示数据加载中
            isSpin: true,
            // 是否显示内容为空提示的图片
            isShowEmpty: false,
            flag:true,
            // 弹出框
            modal:false,
            // 全部加入购物车数量
            num:'1',
            // 分类的id
            cateId:'',
            arr:[],
            // 英文下的样式
            langClass: '',

        }
    },
    /* filters: {
        flt(val) {
            return val
        }
    }, */
    watch: {
        $route(val,oldval) {
            this.currentPage = 1;
            this.min_price = '';
            this.max_price = '';
            this.disIndex = 0;
            let that = this;
            this.getGoodsType(function () {
                that.getUrlData(val.query.cls_id);
            });
        },
        modal(val) {
            if(!val) {
                this.loading = false;
            }
        }
    },
    mounted() {
        this.langClass = '';
    },
    created() {
        this.urlParams = getUrlParams(); 
        let that = this;
        this.getGoodsType(function () {
            // 得到网址的参数
            that.getUrlData(that.urlParams.cls_id);
        });
        document.addEventListener('keydown', this.handleKeyDown)
        document.addEventListener('keyup', this.handleKeyUp)
    },
    destroyed() {
        document.removeEventListener('keydown', this.handleKeyDown)
        document.removeEventListener('keyup', this.handleKeyUp)
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
                content:  '抱歉，复制失败  !',
                duration: 3
            });
        },
        /**
         * 得到商品分类
         */
        getGoodsType(callback) {
            this.$resetAjax({
                type: 'POST',
                url: '/choose/goods/getcls',
                success: (res) => {
                    let result = JSON.parse(res).data;
                    result.forEach(ele => {
                        ele.isSelected = false; // 添加一个属性，让商品每一个大分类为false，方便后续鼠标经过大分类里的小分类大分类颜色为红色
                    });
                    this.$root.goodsType = result;   // 得到商品大分类
                    typeof callback === 'function' && callback();
                }
            })
        },
        /**
         * 得到网址的参数
         */
        getUrlData(cls_id){
            this.cateId = cls_id;
            this.typeListData = []; 
            let clsLen = cls_id.length;
            this.panelData = [];
            switch(clsLen) {
                case 2:
                    this.$root.goodsType.forEach(ele =>  {
                        if(ele.cls_id === this.cateId) {
                            this.panelData = ele.child;
                            this.panelValue = '1';
                        }
                    })
                    break;
                case 4:
                    this.$root.goodsType.forEach(item => {
                        (item.child || []).forEach(list =>{
                            if(list.cls_id === cls_id) {
                                this.panelData.push(list); // 分类数据
                                this.ind = cls_id;
                                this.panelValue = '1';
                            }
                        })
                    })
                    break;
                case 6:
                    this.$root.goodsType.forEach(ele =>  {
                        (ele.child || []).forEach(item => {
                            (item.child || []).forEach(list => {
                                if(list.cls_id === cls_id) {
                                    this.panelData.push(item); // 分类数据
                                    this.ind = cls_id;
                                    this.panelValue = '1';
                                }
                            })
                        })
                        
                    })
                    break;
            }
            this.getTypeLists(cls_id);
        },
        /**
         * 一级点击
         */
        panelClick(cls_id) {
            this.cateId = cls_id;
            this.currentPage = 1;
            this.ind = '';
            this.min_price = '';
            this.max_price = '';
            this.disIndex = 0;
            this.getTypeLists(this.cateId)
        },
        /**
         * 二级点击
         */
        changeBgc (cls_id) {
            this.currentPage = 1;
            this.ind = cls_id;
            this.cateId = cls_id;
            this.min_price = '';
            this.max_price = '';
            this.disIndex = 0;
            this.getTypeLists(cls_id)
        },
        /**
         * 生成样式
         */
        clickBgc (index) {
            this.indac = index;
        },
        // 快捷键
        handleKeyDown(e) {
            if(this.arr.length > 0) { // a-z按键长按去重
                if(this.arr.indexOf(e.key.toLowerCase()) >= 0) {
                    return
                }
            }
            this.arr.push(e.key.toLowerCase())
            this.keydown = this.arr.join('+');
            if(this.keydown === 'control+enter') {
                this.keydown = '';
                this.modal = true;
            }
        },
        handleKeyUp(e) {
            this.arr.splice(this.arr.indexOf( e.key.toLowerCase() ),1);
            this.keydown = this.arr.join('+');
        },
        /**
         *  全部加入购物车
         */ 
        addAll() {
            this.loading = true;
        },
        /**
         * 得到分类商品数据 (新)
         */
        getTypeLists(id) {
            this.isSpin = true;
            this.isShowEmpty = false;
            NProgress.start();  // 进度条开始
            this.$resetAjax({
                type: 'GET',
                url: `/choose/goods/getlist`,
                data: {
                    page: this.currentPage,      // 页码
                    cls: id,                    // 商品类别码
                    price_min: this.min_price,  // 最小价格
                    price_max: this.max_price,  // 最大价格
                    keyword: '',                // 搜索关键词
                },
                success: (res) => {
                    NProgress.done();  // 进度条开始
                    let result = JSON.parse(res).data;
                    let lenName = result.Breadcrumbs.length;
                    result.Breadcrumbs.forEach((ele,index) => {
                        ele.breadClass = index === lenName - 1 ? '' : 'title_name';
                    }) 
                    this.breadName = result.Breadcrumbs;
                    if(result.list.data.length === 0) {
                        this.goodsData = [];
                        this.total = 0;
                        this.isShowEmpty = true;
                        return false;
                    } 
                    result.list.data.forEach(item => {
                        item.imgUrl = `http://hwimg.xmvogue.com/thumb/${item.item_no}.jpg?x-oss-process=style/440`;
                        item.isShow = false;
                    })
                    this.total = Number(result.list.total);
                    this.goodsData  = result.list.data;
                },
            })
        },
        /**
         * 收藏、取消收藏操作
         */
        collectHandle(item,favorite) {
            NProgress.start();  // 进度条开始
            this.$resetAjax({
                type: 'POST',
                url: '/choose/goods/add_favorite',
                data: {
                    type: favorite === 0 ? 1 : 2,   // 1收藏、2取消收藏
                    item_no: item.item_no
                },
                success: (res) => {
                    NProgress.done();  // 进度条开始
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
                this.ulClass = 'type_list';
                if(localStorage.langSelect === '1') {
                    this.langClass = 'enClass';
                }
            } else {
                // 列表形式
                this.ulClass = 'content_List';
                this.langClass = '';
            }
        },
        /**
         * 单击配送价里的价格区间
         */
        selectDis(item, index) {
            this.disIndex = index;
            this.currentPage = 1;
            this.min_price = item.min_price;
            this.max_price = item.max_price;
            this.getTypeLists(this.cateId)
        },
        /**
         * 单击分类里的商品名称
         */
        selectGoodsType(item, index) {
            this.urlParams.cls_id = item.cls_id;
            this.currentPage = 1;
            this.typeIndex = index ;
            this.$router.push({path: `/typeList?cls_id=${item.cls_id}`});
        },
         /**
         *  切换页面
         */
        changePage(index) {
            this.currentPage = index;
            this.getTypeLists(this.cateId)
        },
        /**
         * 跳转到商品详情
         */
        goGoodsDetail(nonum) {
            // 新开页面跳转到商品详情页面
            // this.$router.push({path: '/goodsDetail', query: {item_no: nonum}})
            let routeData = this.$router.resolve({ name: 'goodsDetail', query: {item_no:nonum}});
            window.open(routeData.href, '_blank');
        },
        /**
         * 点击面包屑
         */
        clickBread(item,index) {
            // 当该面包屑索引大于2时，点击第一个没有反应，强制让它请求。
            if(item.cls_no === this.urlParams.cls_id && this.breadName.length > 2) {
                this.getUrlData(this.urlParams.cls_id)
                return false;
            }
            if(item.breadClass === "title_name") {
                this.$router.push({path: '/typeList', query: {cls_id: item.cls_no,name: item.cls_name}})
            }
        }
    },
}
</script>
