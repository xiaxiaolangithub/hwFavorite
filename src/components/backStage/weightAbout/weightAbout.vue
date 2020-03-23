<template>
    <div class="weightPage">
        <div class="top">
            温馨提示：在下面的空白文本框中输入商品编码，一行一个商品编码进行回车输入，最后再点击导出按钮，便可以进行商品海关编码、重量、材质三项属性导出。
        </div>
        <div class="middle">
            <Input v-model="value" type="textarea" placeholder="请输入商品编码，一行一个编码" />
            <Button type="primary" @click="exportWeight">导出</Button>
        </div>
    </div>

</template>

<script>
// 数组去重函数
import {unique} from "@/assets/js/tool.js";
export default {
    data() {
        return {
            // 商品货号
            value: '',
        }
    },
    methods: {
        /**
         * 重量导出提交 
         */
        exportWeight() {
            // 字符串转化成数组
            if(this.value.length === 0) {
                this.$Message.warning({
                    content: '商品编码不能为空 !',
                    duration: 4
                });
                return false;
            }
            let arr = this.value.split('\n');
            if(arr.length > 500) {
                this.$Message.warning({
                    content: '商品编码不能超过200个，请删减一部分 !',
                    duration: 4
                });
                return false;
            }
            // 数组去重再转化成字符串
            let str = unique(arr).join(',')
            location.href = `http://order.xmvogue.com/word/public/index.php?s=admin/dingdan/dao_weight&its=${str}`;
        }
        
    }
}
</script>

