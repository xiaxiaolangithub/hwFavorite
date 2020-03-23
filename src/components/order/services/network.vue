<template>
    <div class="network">
        <div class="order_title">
            <p class="support">技术支持 </p>
            <span class="line">| </span>
            <p class="records" @click="$router.push({path:'supportRecords'})">服务记录</p>
            <span class="stip">对待客户要热心、对待工作要细心、解答问题要耐心、听取意见要虚心、改进工作要诚心。</span>
        </div>
        <div class="fill">
            <h3>填写服务信息</h3>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" >
                <FormItem label="远程ID" prop="remoteID">
                    <Input v-model="formValidate.remoteID" class="remote"/> 
                </FormItem>
                <FormItem label="远程密码" prop="password">
                    <Input v-model="formValidate.password" class="remote"/> 
                </FormItem>
                <FormItem label="联系电话" prop="phoneNum">
                    <Input v-model="formValidate.phoneNum" class="remote"/> 
                </FormItem>
                <FormItem label="QQ号码" prop="qqNum">
                    <Input v-model="formValidate.qqNum" class="remote"/> 
                </FormItem>
                <FormItem label="问题描述" prop="question" class="remote item5">
                    <Input v-model="formValidate.question" type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="请在此输入您申请售后原因。。。" />
                </FormItem>
            </Form>
            <!-- 图片上传 -->
            <div>
                <p class="label_title">上传照片（不超过3MB，支持 jpg、png 格式）</p>
                <!-- 上传照片 -->
                <div class="demo-upload-list" v-for="(item,index) in uploadList" :key="index">
                    <template v-if="item.status === 'finished'">
                        <img :src="item.url">
                        <div class="demo-upload-list-cover">
                            <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                            <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                        </div>
                    </template>
                    <template v-else>
                        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                    </template>
                </div>
                <Upload
                    ref="upload"
                    :show-upload-list="false"
                    :default-file-list="defaultList"
                    :on-success="handleSuccess"
                    :format="['jpg','jpeg','png']"
                    :max-size="2048"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    :before-upload="handleBeforeUpload"
                    multiple
                    type="drag"
                    :data="uploadData" 
                    :action="action"
                    style="display: inline-block;width:58px;">
                    <div style="width: 58px;height:58px;line-height: 58px;">
                        <Icon type="camera" size="20"></Icon>
                    </div>
                </Upload>
                <Modal title="查看图片"  draggable v-model="visible">
                    <img :src="imgUrl" v-if="visible" style="width: 100%">
                </Modal>
            </div>
            </div>
            <div class="submit" @click="submitApply">提交</div>
        </div>
    
</template>

<script>
export default {
    data() {
        return {
            // 表单内容
            formValidate: {
                // 远程id
                remoteID: '',
                // 远程密码
                password: '',
                // 电话
                phoneNum: '',
                // QQ号
                qqNum: '',
                // 问题描述
                question: '',
                
            },
            // 验证规则 
            ruleValidate:{
                remoteID: [
                    { required: true, message: '远程ID不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '远程密码不能为空', trigger: 'blur' }
                ],
                phoneNum: [
                    { required: true, message: '联系电话不能为空', trigger: 'blur' }
                ],
                question: [
                    { required: true, message: '问题描述不能为空', trigger: 'blur' }
                ],

            },
            defaultList: [],
            // 当前查看图片弹窗里图片url
            imgUrl: '',
            // 是否显示查看图片弹窗
            visible: false,
            // 上传的图片数据
            uploadList: [],
            uploadData:{},
            action: `/index.php/Somego/User/uppic`,
            // 已经申请的数据
            applyData: [],
        }
    },
    created() {
        // 得到申请数据
        this.getApplyData();
    },
    mounted () {
        this.uploadList = this.$refs.upload.fileList;
    },
    methods: {
        /**
         * 得到申请数据
         */
        getApplyData() {
            this.$resetAjax({
                type: 'POST',
                url: `/index.php/Somego/User/sh_express`,
                data:{
                    hdid: this.$root.userData.hdid,
                },
                success: (res) => {
                    // let 
                },
            })
        },
        /**
         * 提交当前申请
         */
        submitApply() {
            this.$refs.formValidate.validate((valid) => {
                let data = {
                    hdid: this.$root.userData.hdid,
                    uname: this.$root.userData.uname,
                    remoteid: this.formValidate.remoteID,
                    remotepass: this.formValidate.password,
                    qq: this.formValidate.qqNum,
                    tel: this.formValidate.phoneNum,
                    problem: this.formValidate.question
                }
                if (valid) {
                    this.$resetAjax({
                        type: 'POST',
                        url: `/index.php/Somego/User/supporter`,
                        data,
                        success: (res) => {
                            let result = JSON.parse(res).result
                            if(result === 'ok') {
                                this.$Message.success('提交成功,我们将在10分钟后联系您');
                                this.$router.push({path:'/order/supportRecords'})
                            }
                        },
                    })
                }
            })
        },
        /**
         * 查看上传的图片
         */
        handleView (item) {
            this.imgUrl = item.url;
            this.visible = true;
        },
        /**
         * 删除上传的图片
         */
        handleRemove (file) {
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        },
        /**
         * 上传的图片成功返回图片的信息
         */
        handleSuccess (res, file) {
            file.url = res;
        },
        /**
         * 对上传的图片进行格式判断
         */
        handleFormatError (file) {
            this.$Notice.warning({
                title: '图片格式不正确',
                desc: '上传图片格式不正确，请选择JPG或PNG.'
            });
        },
        /**
         * 对上传的图片进行大小判断
         */
        handleMaxSize (file) {
            this.$Notice.warning({
                title: '上传的图片超出文件大小限制',
                desc: '图片太大，不能超过2M.'
            });
        },
        /**
         * 对上传的图片进行数量限制
         */
        handleBeforeUpload () {
            this.uploadData = {
                hdid: this.$root.userData.hdid,
            }
            let promise = new Promise((resolve) => {
                this.$nextTick(function () {
                    resolve(true);
                });
            });
            return promise; //通过返回一个promis对象解决
            this.upLoadImage();
            const check = this.uploadList.length < 10;
            if (!check) {
                this.$Notice.warning({
                    title: '最多可以上传10张图片。'
                });
            }
            return check;
        },
        /**
         * 上传图片请求接口
         */
        upLoadImage() {
            this.$resetAjax({
                type: 'POST',
                url: `/index.php/Somego/User/uppic?item_no=${this.goodsCode}`,
                data: {
                    hdid: this.$root.userData.hdid
                },
                success: (res) => {
                },
            })
        },
    }
}
</script>
