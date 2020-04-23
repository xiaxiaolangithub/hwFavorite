<template>
    <div class="personal">
        <p class="order_title">我的个人中心</p>
        <div class="top">
            <h3 class="item"><span>个人信息</span></h3>
            <p class="item_p info"> 姓名：<span>{{uname}}</span></p>
        </div>
        <div class="handle">
            <h3 class="item"><span>密码操作</span></h3>
            <p class="item_p update" @click="getChange" title="密码修改">修改</p> 
        </div>
        <!-- 密码修改模态框 -->
        <Modal v-model="passModel"  draggable title="修改密码" @on-cancel="passModel=false;" class="passModel">
            <Form  ref="formValidate" :model="formValidate" :rules="ruleValidates" :label-width="100"> 
                <FormItem label="新密码" prop="newPass"> 
                    <Input v-model="formValidate.newPass" type="text" />
                </FormItem> 
                <FormItem label="确认密码" prop="againPass"> 
                    <Input v-model="formValidate.againPass" type="password"/>
                </FormItem> 
            </Form>
            <div class="set-goods-footer" slot="footer">
                <Button type="success"  @click="submitPassword('formValidate')">提交</Button>
                <Button @click="passModel=false;">取消</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 用户名
            uname: '',
            // 是否显示密码修改框
            passModel: false,
            // 密码弹框
            formValidate:{
                newPass:'',
                againPass:''
            },
            // 表单认证
            ruleValidates:{
                newPass: [
                    { required: true, message: '请输入新密码', trigger: 'blur' }
                ],
                againPass: [
                    { required: true, message: '请再次输入新密码', trigger: 'blur' }
                ],
            },
        }
    },
    watch: {
        passModel(val) {
            if(!val) {
                this.formValidate = {
                    oldPass:'',
                    newPass:'',
                    againPass:''
                }
            }
        }
    },

    created() {
        this.uname = localStorage.whname;
    },
    methods: {
        getChange() {
            this.passModel = true;
            this.formValidate.newPass = '';
            this.formValidate.againPass = '';
        },
        /**
         * 查看密码表单是否验证
         */
        submitPassword(formValidate) {
            this.$refs[formValidate].validate((valid) => {
                if (valid) {
                    this.somePassVer();
                }
            })
        },
        /**
         * 验证两次密码输入是否相同 
         */
        somePassVer() {
            if(this.formValidate.againPass !== this.formValidate.newPass) {
                this.$Message.success({
                    content: '两次输入的密码不一致，请重新输入。',
                    duration: 3
                });
                setTimeout(() => {
                    this.formValidate.againPass = '';
                }, 2000);
            } else {
                this.checkPass();
            }
        },
        /**
         * 提交密码更改
         */
        checkPass() {
            this.$resetAjax({
                type: 'POST',
                url: '/choose/Login/setpsw',
                data:{
                    psw: this.formValidate.newPass,
                },
                success: (res) => {
                    let result = JSON.parse(res);
                    if(result.errorcode === 200) {
                        this.passModel = false;
                        this.$Message.success({
                            content: '修改成功，2秒后跳转到登录页面。',
                            duration: 3
                        });
                        setTimeout(() => {
                           this.$router.push('/login');
                        }, 4000);
                    } else {
                        this.$Message.error({
                            content: '密码修改失败。',
                            duration: 3
                        });
                    }
                }
            })
        },
    }
}
</script>

