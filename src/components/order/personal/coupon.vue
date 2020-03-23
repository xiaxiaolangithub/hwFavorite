<template>
    <div class="coupon">
        <p class="order_title">代金劵<span>给您优惠、最大程度为您节省；错过这，你将后悔一生；</span></p>
        <Tabs>
            <TabPane label="未使用" icon="heart">
                <ul class="img">
                    <li v-for="(item, index) in notUsedCoupon" :key="index">
                        <div class="left">
                            <div class="date">
                                <p><span>开始：</span>{{item.start}}</p>
                                <p><span>结束：</span>{{item.end}}</p>
                            </div>
                            <h3>代金券</h3>
                            <span class="subheading">最终解释权归 Somego 所有</span>
                        </div>
                        <div class="right">
                            <h3 class="noUsed">{{item.status}}</h3>
                            <p>{{item.money}} <span>元</span></p>
                            <span class="subtitle">CASH COUPON</span>
                        </div>
                    </li>
                </ul>
            </TabPane>
            <TabPane label="已使用" icon="android-done-all">
                <ul class="img">
                    <li v-for="(item, index) in alreadyCoupon" :key="index">
                        <div class="left">
                            <div class="date">
                                <p><span>开始：</span>{{item.start}}</p>
                                <p><span>结束：</span>{{item.end}}</p>
                            </div>
                            <h3>代金券</h3>
                            <span class="subheading">最终解释权归 Somego 所有</span>
                        </div>
                        <div class="right">
                            <h3>{{item.status}}</h3>
                            <p>{{item.money}} <span>元</span></p>
                            <span class="subtitle">CASH COUPON</span>
                        </div>
                    </li>
                </ul>
            </TabPane>
            <TabPane label="已失效" icon="alert-circled">
                <ul class="img">
                    <li v-for="(item, index) in failureCoupon" :key="index">
                        <div class="left">
                            <div class="date">
                                <p><span>开始：</span>{{item.start}}</p>
                                <p><span>结束：</span>{{item.end}}</p>
                            </div>
                            <h3>代金券</h3>
                            <span class="subheading">最终解释权归 Somego 所有</span>
                        </div>
                        <div class="right">
                            <h3>{{item.status}}</h3>
                            <p>{{item.money}} <span>元</span></p>
                            <span class="subtitle">CASH COUPON</span>
                        </div>
                    </li>
                </ul>
            </TabPane> 
        </Tabs>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 未使用代金劵数据
            notUsedCoupon: [
                {
                    start: '2019-08-19 17:13:29',
                    end: '2019-09-19 17:13:29',
                    money: '200',
                    status: '领取',
                },
                {
                    start: '2019-08-19 17:13:29',
                    end: '2019-09-19 17:13:29',
                    money: '100',
                    status: '领取',
                },
            ],
            // 已使用代金劵数据
            alreadyCoupon: [
                {
                    start: '2019-08-19 17:13:29',
                    end: '2019-09-19 17:13:29',
                    money: '500',
                    status: '已使用',
                },
                {
                    start: '2019-08-19 17:13:29',
                    end: '2019-09-19 17:13:29',
                    money: '500',
                    status: '已使用',
                },
            ],
            // 已失效代金劵数据
            failureCoupon: [
                {
                    start: '2019-08-19 17:13:29',
                    end: '2019-09-19 17:13:29',
                    money: '300',
                    status: '已失效',
                },
                {
                    start: '2019-08-19 17:13:29',
                    end: '2019-09-19 17:13:29',
                    money: '300',
                    status: '已失效',
                },
            ]
        }
    },
    created() {
        // 得到优惠券数据
        this.getCouponData();
    },
    methods: {
        /**
        * 得到优惠券数据
        */
        getCouponData() {
            this.$resetAjax({
                type: 'POST',
                url: '/index.php/Somego/Coupon/index',
                data: {
                    hdid: this.$root.userData.hdid
                },
                success: (res) => {
                    let result = JSON.parse(res);
                    result.forEach((ele,i) => {
                        if((ele.data.type.expire === 1) && (ele.data.type.not_used === '1')) {
                        }
                    });
                }
            })
        },
    }
}
</script>
