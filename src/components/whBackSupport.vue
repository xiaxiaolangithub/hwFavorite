<template>
<div class="whBackSupportPage">
    <div class="whBackSupportPage_inner">
        <h3>注册用户</h3>
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
            <FormItem prop="user">
                <Input type="text" v-model="formInline.user" placeholder="Username">
                    <Icon type="ios-contact" slot="prepend"/>
                </Input>
            </FormItem>
            <FormItem prop="password">
                <Input type="password" v-model="formInline.password" placeholder="Password">
                    <Icon type="md-lock" slot="prepend"/>
                </Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formInline')">申请</Button>
            </FormItem>
        </Form>
    </div>
</div>
</template>
<script>
    export default {
        data () {
            return {
                formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码.', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不能少于6位数', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.submit();
                    } else {
                        this.$Message.error('请把信息填完整.');
                    }
                })
            },
            submit() {
                this.$resetAjax({
                    type: 'POST',
                    url: '/choose/Login/adduser',
                    data: {
                        name: this.formInline.user,
                        psw: this.formInline.password,
                    },
                    success: (res) =>{
                        let result = JSON.parse(res);
                        if(result.errorcode === 200) {
                            this.$Message.success({
                                content: '用户注册成功.',
                                duration: 3
                            });
                        } else {
                            this.$Message.error({
                                content: `${result.msg}`,
                                duration: 3
                            });
                        }
                    }
                })
            }
        }
    }
</script>




