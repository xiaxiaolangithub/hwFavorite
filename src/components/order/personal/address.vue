<template>
    <div class="address">
        <p class="order_title">收货地址<span>没有方向的人生叫流浪，有方向的人生叫远航，没有目标的人生叫折腾，有目标的人生叫奔腾</span></p>
        <ul class="detail" v-for="(item,index) in addressData" :key="index">
            <li class="title"> 店名 <span>{{item.NAME}}</span> </li>
            <li>门店编码： {{item.CODE}}</li>
            <li>门店地址： {{item.ADDRESS}}</li>
        </ul>
        <p>{{date}}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 地址数据
            addressData: [],
            date:  new Date(),
        }
    },
     mounted() {
    let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(() => {
      _this.date = new Date(); // 修改数据date
    }, 1000)
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  },
    created() {
        // 获取收货地址数据
        this.getAddress();
    },

    methods: {
       /**
        * 获取收货地址数据
        */
        getAddress() {
            this.$resetAjax({
                type: 'POST',
                url: `/index.php/Somego/User/Address`,
                data: {
                    hdid: this.$root.userData.hdid,
                    uid: this.$root.userData.uid,
                },
                success: (res) => {
                    let result = JSON.parse(res)
                    if(result.result === 'error') {
                        this.$Message.warning(result.msg);
                    } else{
                        this.addressData = result;
                    }
                }
            })
        }
    }
}
</script>
