<template>
    <div class="backOrderDetail">
        <p class="order_title">{{i18n.pageTitle}}</p>
        <div class="orD_main">
            <h3 class="orD_title">{{status}}</h3>
            <div class="orD_top">
                <p class="orD_order">{{i18n.orderNum}}：<span>{{orderId}}</span> </p>
                <div class="order_stastu">{{i18n.time}}：<span>{{oper_date}}</span> </div>
            </div>
            <h3 class="orD_goods">{{i18n.commodity}}</h3>
            <ul>
                <li v-for="(item, index) in orderDetailData.goodsData" :key="index">
                    <div class="img" :title="i18n.lookDetail" @click="goDetail(item.item_no)">
                        <img v-lazy="item.imgUrl" alt="">
                    </div>
                    <p class="orD_name" :title="i18n.lookDetail" @click="goDetail(item.item_no)">{{item.item_name}}</p>
                    <p class="encoded" :title="i18n.lookDetail">{{item.item_no}}</p>
                    <p class="orD_num">{{item.price}}{{i18n.yuan}} × {{item.item_num}}</p>
                    <p class="orD_total">{{item.sub_amt}}{{i18n.yuan}}</p>
                </li>
            </ul>
            <div class="explain">{{i18n.totalPrice}}： <span class="totalPrice">{{totalPrice}}</span><span></span>{{i18n.yuan}}</div>
        </div>
    </div>
</template>


<script>
import {getUrlParams} from  '@/assets/js/tool.js'
export default {
    data() {
        return {
            // 得到网址的参数对象
            urlParams: {},
            // 当前订单的状态
            type: 0,
            // 订单详情数据
            orderDetailData: {
                goodsData: []
            },
            // 订单状态
            status: '',
            // 订单完成时间
            oper_date: '',
            // 订单号
            orderId: '',
            // 该订单详情总价
            totalPrice: '0',
            orderSuccess: this.$t('backOrderDetail.orderSuccess') ,
            adopt:this.$t('backOrderDetail.adopt') ,
            distributing:this.$t('backOrderDetail.distributing') ,
            shipped: this.$t('backOrderDetail.shipped') ,
            transportation: this.$t('backOrderDetail.transportation') ,
            receiving: this.$t('backOrderDetail.receiving') ,
            fulfillment: this.$t('backOrderDetail.fulfillment') ,
            void: this.$t('backOrderDetail.void') ,
            pretrial: this.$t('backOrderDetail.pretrial') ,
        }
    },

    created() {
        // 得到网址的参数
        this.getUrlData();
    },
    computed: {
        i18n() {
            return this.$t('backOrderDetail')
        }
    },
    methods: {
        /**
         * 得到网址的参数
         */
        getUrlData() {
            this.urlParams = getUrlParams();
            this.type = this.urlParams.type;
            this.getDetailData();
        },
        /**
         * 得到订单详情数据
         */
        getDetailData() {
            this.$resetAjax({
                type: 'POST',
                url: '/Admin/Dingdan/orderView',
                data: {
                    sn: this.urlParams.sn,
                    type: this.type, // 订单类型
                    lang: localStorage.langSelect,
                    uid: localStorage.uid,
                },
                success: (res) => {
                    let result = JSON.parse(res);
                    switch(this.type) {
                        case '1':
                            this.unfinished(result);
                            break;
                        case '0':
                            this.completed(result);
                    }
                },
            })
        },
        /**
         * 待传输详情
         */
        unfinished (data) {
        },
        /**
         * 已完成订单详情
         */
        completed(data) {
        },
        changePanel() {

        },
    }
}
</script>
