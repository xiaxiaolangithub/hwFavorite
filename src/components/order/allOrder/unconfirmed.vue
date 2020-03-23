<template>
    <div class="unconfirmedPage">
        <p class="order_title">待确认订单 <span>一次不买你的错，二次不买我的错</span></p>
        <div v-if="isSpin" style="width: 100%;display:flex;justify-content: center;">
            <img style="width:500px; height:500px;" src="@/assets/images/gif/15475f70f1817ee6ccc8bf7f1110488b.gif" alt="">
        </div>
        <div class="waitpay" v-if="!isSpin&&isShowEmpty===false">
            <div class="pageSimple">
                <Page :total="total" :page-size="pageSize" @on-change="changePage" :current="currentPage" simple></Page>
            </div>
            <ul class="order_list">
                <li v-for="(item, index) in unConfirmedData" :key="index">
                    <div class="list_top">
                        <h3>
                            待确认
                            <p class="order_detail" @click="lookOrderDetail(item, 1)">订单详情</p>
                        </h3>
                        <div class="list_middle">
                            <div class="middle_left">
                                <span>{{item.oper_date}}</span> | <span>{{item.buyer}} </span> |  订单号：<span @click="lookOrderDetail(item, 1)" class="sheet">{{item.sheet_no}}</span>
                            </div>
                            <p class="sale">实付金额：<span>{{item.sheet_amt}}</span>元</p>
                        </div>
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
export default {
    data() {
        return {
             // 待确认订单数据
            unConfirmedData: [],
            // 商品总数
            total: 0,
            // 每页条数
            pageSize: 25,
             // 当前页码
            currentPage: 1,
            // 是否显示数据加载中提示
            isSpin: true,
            // 是否显示内容为空提示的图片
            isShowEmpty: true,
        }
        
    },

    created() {
        // 得到未确定订单列表
        this.getUnOrderList();
    },
    methods: {
        /**
         * 得到已确定订单列表
         */
        getUnOrderList() {
            this.isSpin = true;
            this.isShowEmpty = false;
            setTimeout(() => {
                this.$resetAjax({
                    type: 'POST',
                    url: '/index.php/Somego/User/orderList',
                    data: {
                        hdid : this.$root.userData.hdid,
                        p: this.currentPage
                    },
                    success: (res) => {
                        this.isSpin = false;
                        let result = JSON.parse(res);
                        if(result.list !== null && result.list.length !== 0) {
                            this.unConfirmedData = result.list;
                            this.total = Number(result.other.count);
                        } else {
                            this.unConfirmedData = [];
                            this.isShowEmpty = true;
                        }

                    },
                })
            }, 2000);
        },
         /**
         *  切换页面
         */
        changePage(index) {
            this.currentPage = index;
            this.getUnOrderList();
        },
        /**
        * 查看未确认订单详情
         */
        lookOrderDetail(item,num) {
            // 新开页面跳转到商品详情页面
            // this.$router.push({path: '/order/orderDetail',query: {sn: item.NUM, isUn:2}})

            let routeData = this.$router.resolve({ name: 'orderDetail', query: {sn: item.sheet_no, isUn:1}});
            window.open(routeData.href, '_blank');
        }
    }
}
</script>




