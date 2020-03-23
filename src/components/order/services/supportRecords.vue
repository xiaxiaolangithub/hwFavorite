<template>
    <div class="supportRecords">
        <div class="order_title">
            <p class="support" @click="$router.push({path:'/order/network'})">技术支持 </p>
            <span class="line">| </span>
            <p class="records">服务记录</p>
            <span class="stip">您的需要就是我的义务，您的意见就是我的服务方向，用我们真诚的微笑换取您对我们服务的满意。</span>
        </div>
        <div v-if="isSpin" style="width: 100%;display:flex;justify-content: center;">
            <img style="width:500px; height:500px;" src="@/assets/images/gif/15475f70f1817ee6ccc8bf7f1110488b.gif" alt="">
        </div>
        <div class="waitpay" v-if="!isSpin&&isShowEmpty===false">
            <div class="pageSimple">
                <Page :total="total" :page-size="pageSize" @on-change="changePage" :current="currentPage" simple></Page>
            </div>
            <ul class="list">
                <li v-for="(item,index) in recordData" :key="index">
                    <h3>
                        <p>申请人：<span>{{item.store}}</span></p>
                        <p class="check" @click="checkSupportDetail(item)">查看详情</p>
                    </h3>
                    <div class="top">
                        <p>申请：&nbsp;&nbsp;&nbsp;<span>{{item.qtime}}</span></p>
                        <p style="color:#757575;">回复：<span style="display: inline-block;width: 132px;">{{item.rtime}}</span></p>
                    </div>
                    <div class="middle">
                        <p>问题：&nbsp;&nbsp;&nbsp;<span>{{item.problem}}</span></p>
                    </div>
                    <div class="bottom">
                        <p>信息员：<span>{{item.wangguan}}</span></p>
                        <p>评分： <Rate disabled  show-text v-model="item.grade"></Rate></p>
                    </div>
                </li>
            </ul>
            <div class="page">
                <Page :total="total" :page-size="pageSize" @on-change="changePage" :current="currentPage" show-elevator show-total></Page>
            </div>
        </div>
        <!-- 如果商品数据为空时显示 -->
        <div class="empty_content" v-show="isShowEmpty">
            <div class="emprt_inner" style="width:100%px;margin:0 auto;display:flex;justify-content: center;">
                <img style="width:400px;height:400px;" src="https://img.zcool.cn/community/01b35f5b320c11a80120b95969bc40.gif" alt="">
            </div>
        </div>
    </div>
</template>

<script>
import NProgress from 'nprogress'   // 引入进度条
import 'nprogress/nprogress.css'    // 引入进度条
export default {
    data() {
        return {
            // 技术支持记录
            recordData: [],
            // 当前页码
            currentPage: 1,
            // 条数
            pageSize: 20,
            // 总条数
            total: 0,
            // 是否显示数据加载中提示
            isSpin: true,
            // 是否显示内容为空提示的图片
            isShowEmpty: true,

        }
    },
    created() {
        // 得到服务记录数据
        this.getSupportData();
    },
    methods: {
         /**
         *  切换页面
         */
        changePage(index) {
            this.currentPage = index;
            this.getSupportData();
        },
        /**
         * 得到服务记录数据
         */
        getSupportData() {
            NProgress.start();
            this.isSpin = true;
            this.isShowEmpty = false;
            this.$resetAjax({
                type: 'POST',
                url: `/index.php/Somego/User/support_list?p=${this.currentPage}`,
                data: {
                    hdid: this.$root.userData.hdid,
                },
                success: (res) => {
                    NProgress.done();
                    this.isSpin = false;
                    let result = JSON.parse(res);
                    if(result.list !== null && result.list.length !== 0) {
                        result.list.forEach(ele => {
                            if(ele.rtime === null) {
                                ele.rtime = '回复中...'
                            }
                            ele.grade = Number(ele.grade);
                        });
                        this.recordData = result.list;
                        this.total = Number(result.other.total)
                    } else {
                        this.recordData = [];
                        this.isShowEmpty = true;
                    }
                },
            })
        },
        /**
         * 查看服务详情
         */
        checkSupportDetail(item) {
            this.$router.push({path: '/order/supportDetail', query: {id: item.id}})
        }
    }
}
</script>
