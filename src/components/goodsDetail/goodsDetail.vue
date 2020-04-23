

<template>
    <div id="goodsDetail">
        <div class="pro_header" :class="{fixClass : scrollTop > 195}">
            <div class="proHeader_inner">
                <li @click="$router.push({path: '/enter'})" class="home_title">
                    <i class="icon-liuliangyunpingtaitubiao02 iconfont"></i> 首页 > </li>
                <li v-for="item in titleList" :key="item.cls" class="pro_name before_second" @click="$router.push({path: '/typeList', query: {cls_id: item.cls_no, name: item.title}})">{{item.cls_name}}
                    <Icon type="ios-arrow-forward" />
                </li>
                <li class="pro_name">{{item_name}}</li>
            </div>
        </div>
        <div class="pro_detail">
            <div class="detail_inner">
                <div class="pro_left summary" ref="box" v-show="isVideo">
                    <!-- scroll 放大时页面是否可滚动  淘宝放大镜插件-->
                    <pic-zoom :url="imgSrc" :scale="0" scroll show-edit @click.native="isShow=true"></pic-zoom>
                </div>
                <!-- 视频加载失败且不是预售商品都不能显示商品视频 object-fit:fill-->
                <div class="video_left" v-show="!isVideo && advance !=='1'" style="position:relative;/*需要用padding来维持16:9比例,也就是9除以16*/height: 0;">
                    <!-- position: absolute;top:0;left: 0; -->
                    <video :src="videoUrl" preload="auto" :poster="imgSrc" ref="video" controls="controls" controlslist="nodownload"  style="width: 800px;height: 100%;outline: none;"></video>
                </div>
                <div class="pro_right">
                    <h3 class="pro_name">
                        {{item_name}}
                    </h3>
                    <ul class="pro_list">
                        <li class="proCode" v-if="item_no">
                            <span class="dt">商品货号：</span>
                            <span>{{item_no}}</span>
                            <Icon type="md-copy" size="20" class="copy_icon" title="货号复制" v-clipboard:copy="item_no" v-clipboard:success="onCopy" v-clipboard:error="onError" />
                        </li>
                        <li class="pro_info" v-show="hs_code">
                            <span class="dt">海关编码：</span>
                            <span>{{hs_code}}</span>
                        </li>
                         <li class="pro_info" v-show="hs_code">
                            <span class="dt">搜索字段：</span>
                            <span>{{search_keyword}}</span>
                        </li>
                        <li class="pro_info" v-show="material" style="display:flex;">
                            <span class="dt" style="flex-shrink:0;">商品材质：</span>
                            <span>{{material}}</span>
                        </li>
                        <li class="pro_info" v-show="stuffing" style="display:flex;">
                            <span class="dt" style="flex-shrink:0;">填充材料：</span>
                            <span>{{stuffing}}</span>
                        </li>
                        <li class="pro_info" v-show="lwh">
                            <span class="dt">商品尺寸：</span>
                            <span>{{lwh}}</span>
                        </li>
                        <li class="pro_info" v-show="weight">
                            <span class="dt">商品重量：</span>
                            <span>{{weight}}</span>
                        </li>
                        <li class="pro_info" v-show="expiration && expiration !== 'NaN-NaN-NaN'">
                            <span class="dt">保质日期：</span>
                            <span>{{expiration}}</span>
                        </li>
                        <li class="pro_info">
                            <span class="dt">商品规格：</span>
                            <span>{{spec}}</span>
                        </li>
                        <li class="pro_info">
                            <span class="dt">箱规数量：</span>
                            <span>{{purchase_spec}}</span>
                        </li>
                        <li class="pro_info">
                            <span class="dt">销售价格：</span>
                            <span style="color:#d92524;font-weight:bold;">￥{{ sale_price}}</span>
                        </li>
                        <li class="handle">
                            <!-- advance为1表示预售商品详情 -->
                            <!-- 缺货、下线、预售商品 -->
                           <!--  <p v-if="surplus" class="shortage">
                                <Icon type="ios-alert-outline" color="yellow" size="26" />库存不足
                            </p> -->
                            <div class="collect_handle">
                                <p @click="collectHandle">
                                    <img src="@/assets/images/goodsDetail/lover2.png" alt="" v-if="favorite === 1">   <!-- 已收藏 -->
                                    <img src="@/assets/images/goodsDetail/lover.png" alt="" v-if="favorite === 0">   <!-- 未收藏 -->
                                    <span title="收藏商品" v-if="favorite === 0">收藏</span>
                                    <span title="取消收藏商品" v-if="favorite === 1">取消</span>
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- 商品详情图 -->
        <div class="pro-infomation">
            <div class="infomation_inner">
                <h3 class="info_title"><span>商品详情</span></h3>
                <div style="display:flex;justify-content: center;">
                    <div class="img_contanier">
                        <ul class="note">
                            <li v-if="features">
                                <label>特征：</label>
                                <span>{{features}}</span>
                            </li>
                            <li v-if="usage">
                                <label>用法：</label>
                                <span>{{usage}}</span>
                            </li>
                            <li v-if="notes">
                                <label>提醒：</label>
                                <span>{{notes}}</span>
                            </li>
                        </ul>
                        <div class="detail_video" v-show="isVideoDetail" style="position:relative;padding-bottom:56.25%;    /*需要用padding来维持16:9比例,也就是9除以16*/height: 0;">
                            <video :src="detailVideoUrl" :poster="imgSrc" ref="video2" controls preload controlslist="nodownload" style="position: absolute;top:0;left: 0;width: 100%;height: 100%;outline: none;"></video>
                        </div>
                        <div class="detail_img">
                            <img v-lazy="DetailImgUrl" alt="" @error="defImg()" style="width:800px;">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Modal v-model="isShow" title="图片" @on-cancel="isShow=false;" class="modal_big_click">
           <img :src="imgSrc" width="500px"/>
        </Modal>
    </div>
</template>

<script>
import { getUrlParams } from "@/assets/js/tool.js";
import { mapActions } from "vuex";
import PicZoom from "vue-piczoom"; // 引入图片放大组件
import NProgress from "nprogress"; // 引入进度条
import "nprogress/nprogress.css"; // 引入进度条
export default {
    components: {
        PicZoom // 图片放大组件
    },
    data() {
        return {
            // 是否显示图片
            isShow: false,
            // 当前商品货号
            currentNo: "",
            // 得到网址的参数对象
            urlParams: {},
            // 商品名称
            item_name: "",
            // 商品详情里的购物车数量
            goodsCnum: 0,
            // 商品货号
            item_no: "",
            usage: '',
            features: '',
            notes: '',
            // 材质
            material: "",
            // 海关编码
            hs_code: "",
            // 关键字段搜索
            search_keyword: '',
            // 尺寸：
            lwh: "",
            // 条形码
            barcode: "",
            // 库存数量
            stock_num: 0,
            // 商品是否上下线
            display_falg: false,
            // 商品是否可以加入购物车，是否有足购的货物加入购物车
            surplus: false,
            // 商品填充物
            stuffing: "",
            // 重量
            weight: "",
            // defaultImg: "http://dh.xmcpcn.com/Public/images/none.jpg",
            defaultImg: 'https://uh.edu/pharmacy/_images/directory-staff/no-image-available.jpg',
            // 商品规格
            spec: 0,
            // 购物车已有当前商品的数量
            cnum: 0,
            // 预售商品是否有预定功能
            isDead: false,
            // 箱规数量
            purchase_spec: 0,
            // 销售价
            sale_price: "",
            // 注意事项
            expiration: "",
            // 商品其他款式数据
            otherData: [],
            // 商品产品图
            imgSrc: "",
            // 商品详情图片
            DetailImgUrl: "",
            // 是否喜欢
            favorite: -1,
            // 评价内容
            content: "",
            // 滚动条高度
            scrollTop: "0",
            // 商品详情类别分类数据
            titleList: [],
            // 判断是不是预售商品
            advance: 0,
            // 在售商品视频是否加载成功
            isVideo: true,
            // 主图视频地址
            videoUrl: '',
            playerOptions : {
                playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                autoplay: false, //如果true,浏览器准备好时开始回放。
                muted: false, // 默认情况下将会消除任何音频。
                loop: false, // 导致视频一结束就重新开始。
                preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: 'zh-CN',
                aspectRatio: '4:3', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [{
                    type: "",
                    src: ''//url地址   
                    // src: "" //url地址
                }],
                poster: '', //你的封面地址
                // width: document.documentElement.clientWidth,
                notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                controlBar: {
                    timeDivider: true,
                    durationDisplay: true,
                    remainingTimeDisplay: false,
                    fullscreenToggle: true  //全屏按钮
                }
            },
            // 详情商品视频配置
            detailOptions:{
                playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                autoplay: false, //如果true,浏览器准备好时开始回放。
                muted: false, // 默认情况下将会消除任何音频。
                loop: false, // 导致视频一结束就重新开始。
                preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: 'zh-CN',
                aspectRatio: '4:3', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [{
                    type: "",
                    src: ''//url地址   
                    // src: "" //url地址
                }],
                poster: '', //你的封面地址
                // width: document.documentElement.clientWidth,
                notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                controlBar: {
                    timeDivider: true,
                    durationDisplay: true,
                    remainingTimeDisplay: false,
                    fullscreenToggle: true  //全屏按钮
                }
            },
            // 是否显示详情视频
            isVideoDetail: false,
            // 详情视频地址
            detailVideoUrl: '',
            // 英文下的样式
            langClass: '',
        }
    },

    created() {
        // 得到网址的参数
        this.getUrlData();
    },
    watch: {
        $route(val) {
            // 解决由当前商品详情页面跳转到其他页面时，还会用undefined来请求商品详情。
            if (val.name !== "goodsDetail") {
                return false;
            }
            this.getUrlData();
        }
    },
    mounted() {
        // 禁止视频画中画、下载功能
        this.$refs.video["disablePictureInPicture"] = true;
        this.$refs.video2["disablePictureInPicture"] = true;
        window.addEventListener("scroll", this.btn_pos);
    },
    methods: {
        /**
         *  图片加载失败后的图片路径取值
         */
        defImg() {
            let img = event.srcElement;
            img.src = this.defaultImg;
            img.onerror = null; //防止闪图
        },
        /**
         *  商品收藏的总数
         */
        ...mapActions([
            "getFavoriteNum"
        ]),
        /*
        * 复制成功时的回调函数
        */ 
        onCopy(e) {
            this.$Message.success({
                content: '货号已复制到剪切板 !',
                duration: 3
            });
        },
        /*
        * 复制失败时的回调函数
        */
        onError(e) {
            this.$Message.error({
                content: '抱歉，复制失败  !',
                duration: 3
            });
        },
        /**
         * 得到网址的参数
         */
        getUrlData() {
            this.urlParams = getUrlParams();
            this.advance = this.urlParams.advance;
            this.getGoodsInfo(this.urlParams.item_no);
            this.currentNo = this.urlParams.item_no;
        },
        /**
         * 得到商品详情
         */
        getGoodsInfo(item_no) {
            NProgress.start(); // 进度条开始
            let type;
            let url;
            let data;
            (type = "POST"),
            (url = `/choose/goods/getinfo&item_no=${item_no}`),
            (data = {
                item_no: item_no,
            });
            this.$resetAjax({
                type,
                url,
                data,
                success: res => {
                    NProgress.done(); // 进度条结束
                    let result = JSON.parse(res);
                    // 商品详情处理
                    this.transOrdinary(result);
                }
            });
        },
        /**
         * 商品详情数据处理
         */
        transOrdinary(result) {
            // 商品详情里商品分类导航栏数据处理
            this.transGoodsCls(result.data.Breadcrumbs);
            // 商品详情商品基本信息数据处理
            this.transBasic(result);
            // 商品同款属性对照表
            let contrast = result.list_attr;
            // 商品同款属性数据处理
            if(result.list_attr && result.attr) {
                this.specArr(result.list_attr, result.attr);
            }
        },
        /**
         * 商品详情里商品类别导航栏数据处理
         * @param {Object} data 商品类别处理
         */
        transGoodsCls(data) {
            if(data.length !== 0) {
                this.titleList = data;
            } else {
                var clsResult = [];
                this.titleList = [];
            }
        },
        /**
         *  商品详情商品基本信息数据处理
         *  @param {Object} data 商品基本信息数据处理
         */
        transBasic(data) {
            let info = data.data;
            this.item_name = info.item_name; // 商品名称
            this.barcode = `http://order.xmvogue.com/word/public/index.php?s=home/Cart/barcode_create&sn=${info.item_no}`;
            this.item_no = info.item_no;            // 商品id
            this.sale_price = info.sale_price;      // 售价
            this.material = info.material;          // 材质
            this.search_keyword = info.keyword;
            this.hs_code = info.hs_code;            // 海关编码
            this.weight = info.weight;              // 重量
            this.lwh = info.lwh;                    // 尺寸：
            this.advance = '0'             
            this.favorite = info.favorite;
            this.features = info.features;
            this.usage = info.usage;
            this.notes = info.notes;
            this.spec = Number(info.purchase_spec);                      // 规格
            this.purchase_spec = Number(info.lot_spec);         // 箱规数量
            this.stock_num = Number(info.stock_num);
            // 商品是否下线 1表示上线
            this.display_falg = info.display_flag === 1 ? true : false;
            // 判断是否可以加入第三种判断
            if( (Number(info.sale_num) + Number(info.cnum) - this.stock_num) < 0 && this.display_falg && this.advance !== '1' && this.stock_num !== 0) {
                // 说明要显示不能加购的提示按钮
                this.surplus = false;
            } else {
                // 说明要显示提示可以加够的按钮
                this.surplus = true;
            }
             // 查看图片是否可以显示
            let img = new Image();
            img.src = `https://ximiphoto.oss-cn-hangzhou.aliyuncs.com/thumb/${info.item_no}.jpg?x-oss-process=style/440`;
            img.onload = () => {
                // 图片可以展示显示图片
                this.imgSrc = `https://ximiphoto.oss-cn-hangzhou.aliyuncs.com/thumb/${info.item_no}.jpg?x-oss-process=style/440`; // 商品产品图
            };
            img.onerror = () => {
                // 图片不可以展示显示默认图片
                // this.imgSrc = "http://dh.xmcpcn.com/Public/images/none.jpg";
                this.imgSrc = 'https://uh.edu/pharmacy/_images/directory-staff/no-image-available.jpg'
            };
            this.playerOptions.poster = info.img;
            if(info.video) {
                this.detailVideoUrl = info.video;
                this.detailOptions['sources'][0]['src'] = info.video;
                this.isVideoDetail = true;
            } else {
                this.isVideoDetail = false;
            }
            this.videoUrl = `https://ximiphoto.oss-cn-hangzhou.aliyuncs.com/video/${info.item_no}.mp4`;
            this.DetailImgUrl = `http://hwimg.xmvogue.com/detail/${info.item_no}-.jpg?x-oss-process=style/800`; // 商品详情图片
            // 判断视频是否加载成功
            this.isVideoShow()
        },
        /**
         * 判断在售商品视频是否加载成功
         * @param videoUrl {String} 商品条码拼接成的视频地址
         * @param infoImg {String} 商品条码拼接成的主图地址
         */
        isVideoShow() {
            let that = this;
            var video = document.createElement('video');
            video.onload = function() {
            }
            video.onerror = function() {
                that.isVideo = true;
                that.playerOptions.poster =  '';
                that.playerOptions['sources'][0]['src'] = '';
            }
            video.src = that.videoUrl;
            //不同浏览器情况不同，这里判断在该浏览器是否可以播放
            video.oncanplaythrough = function() {
                that.isVideo = false;
                that.playerOptions.poster = that.imgSrc;
                that.playerOptions['sources'][0]['src'] = that.videoUrl;
            };
        },
       /**
         * 收藏、取消收藏操作
         */
        collectHandle() {
            this.$resetAjax({
                type: 'POST',
                url: '/choose/goods/add_favorite',
                data: {
                    type: this.favorite === 0 ? 1 : 2,   // 1收藏、2取消收藏
                    item_no: this.item_no
                },
                success: (res) => {
                    let result = JSON.parse(res);
                    this.favorite = this.favorite === 0 ? 1 : 0;
                    this.$Message.success({
                        duration: 3,
                        content: this.favorite === 0 ?  ' 取消商品收藏成功 !' : '收藏商品成功 !'
                    });
                    this.getFavoriteNum({vm: this})
                }
            })
        },
        /*
        * 获取滚动条高度
        */
        btn_pos() {
            //滚动条的高度
            this.scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        },
    },

    destroyed() {
        //离开这个界面之后，删除，不然会有问题
        window.removeEventListener("scroll", this.btn_pos);
    }
};
</script>

<style lang="less" scoped>
/deep/ .ivu-tooltip-inner{
max-width: 500px;
}
</style>
