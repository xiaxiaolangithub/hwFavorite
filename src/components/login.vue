


 <template>
    <div class="loginPage">
        <div class="header">
            <div class="header_inner">
                <img src='@/assets/images/login/go_home.png' alt="" style="height:45px;">
            </div>
        </div>
        <div class="content">
            <div class="content_inner">
                <div class="login">
                    <ul class="sign">
                        <li v-for="(item,index) in signData" :key="index" :class="{active: currentindex === index}" @click="currentClick(item,index)"><p>{{item.title}}</p></li>
                    </ul>
                    <Form ref="loginForm" :model="loginForm" :rules="ruleValidate" :label-width="20" class="loginForm">
                        <xmInput v-model="loginForm.mail" label="用户名" validateKey="mail" icon="icon-icoyonghuming" />
                        <div class="passInput">
                            <xmInput v-model="loginForm.password" label="密码" validateKey="password" icon="icon-mima1" :type="passType"/>
                            <i class="iconfont icon-htmal5icon08 noCheck" @click="passType='text'" v-if="passType==='password'"></i>
                            <i class="iconfont icon-chakan check" @click="passType='password'" v-else></i>
                        </div>
                        <FormItem class="code_img" prop="seccode" v-if="currentindex ===0">
                            <Input class="input" v-model="loginForm.seccode" @keyup.enter.native="submit('loginForm')"/>
                            <div class="divIdentifyingCode" @click="getIdentifyingCode(true)">
                                <img id="imgIdentifyingCode" alt="点击更换 !" title="点击更换 !" :src="imgSrc"/>
                            </div>
                        </FormItem>
                        <!-- <FormItem class="remember_pass">
                            <Checkbox v-model="remeberValue">记住密码</Checkbox>
                        </FormItem> -->
                        <FormItem>
                            <p class="submit" @click="submit('loginForm')">{{submitTitle}}</p>
                        </FormItem>
                    </Form>
                </div>
            </div>
        </div>
        <!-- 引入底部 -->
        <Footer></Footer>
    </div>
       
    
 </template>
 
 <script>
 import xmInput from '@/components/_common/xmInput'
import Footer from './footer.vue'

 export default {
    components: {
        xmInput,
        Footer
    },
    data () {
        return {
            signData: [
                {
                    title: '登录'
                },
                {
                    title: '注册'
                },
            ],
            currentindex: 0,
            // 表单内容
            loginForm: {
                mail: '',
                password: '',
                seccode: '',
            },
            // 表单验证
            ruleValidate1: {
                mail: [
                    { required: true, message: '用户名不能为空 !', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空 !', trigger: 'blur' },
                ],
                seccode: [
                    { required: true, message: '验证码不能为空 !', trigger: 'blur' },
                ]
            },
            ruleValidate2: {
                mail: [
                    { required: true, message: '用户名不能为空 !', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空 !', trigger: 'blur' },
                ],
            },
            ruleValidate: {},
            // 语言名称
            langText: 'English',
            // 默认密码
            passType: 'password',
            // 验证码图片
            imgSrc: '', 
            // 选中哪个语言 
            langSelect: 0,
            // 验证码是否通过
            isGoSubmit: false,
            // 是否记住密码
            remeberValue: false,
            isCheckYzm: false,
            submitTitle: '登录',
            
        }
    },
    mounted() {
        localStorage.langSelect = 0;
        // 验证码图片出现   等待页面结构渲染完毕再进行渲染验证码图片
        this.getIdentifyingCode(true);
    },
    created() {
        // 判断是否记住密码
        this.ruleValidate = this.ruleValidate1;
        this.loginForm.mail = '';
        this.loginForm.password = '';
        this.remeberPass();
    },
    methods: {
        /**
         * 登录注册切换
         */
        currentClick(item, index) {
            this.currentindex = index;
            this.submitTitle = index === 0 ? '登录' : '注册';
            this.ruleValidate = index === 0 ? this.ruleValidate1 : this.ruleValidate2;
        },
        /**
         * 判断是否记住密码
         */
        remeberPass() {
            let isRember = localStorage.remember;
            if(isRember === 'true') {
                this.remeberValue = true;
                this.loginForm.mail = localStorage.whname;
                this.loginForm.password = localStorage.whpass;
            } else {
                this.remeberValue = false;
                this.loginForm.mail = '';
                this.loginForm.password = '';
            }
        },
       /**
         * 窗口代码
         * @param {Boolean} bRefresh 是否刷新
         */
        getIdentifyingCode(bRefresh) {
            this.imgSrc = '';
            // let identifyCodeSrc = `${location.origin}/word/public/index.php?s=home/Login/Verification`;    
            let identifyCodeSrc = `http://order.xmvogue.com/choose/chooseGoods/public/index.php?s=choose/login/Verification`;  
            // 在数据变化后要执行的某个操作，而这个操作需要使用随数据改变而改变的DOM结构的时候，这个操作都应该放进Vue.nextTick()的回调函数中。
            this.$nextTick(()=>{
                this.imgSrc = identifyCodeSrc;
			})
        },
        /**
         * 回车登录
         */
        quickLogin() {

        },
        /**
         * 提交
         */
        submit(loginForm) {
            this.$refs.loginForm.validate((valid) => {
                if (valid ) {    
                    this.currentindex === 0 ? this.loginIn() : this.registerQuery();
                } else {
                    this.$Message.error({
                        content: '请把信息填入完整。',
                        duration: 3
                    });
                }
            })
        },
        /**
         * 登录请求
         */
        loginIn() {
            this.$resetAjax({
                type: 'POST',
                url: '/choose/Login/Login',
                data: { 
                    user: this.loginForm.mail.trim(),
                    password: this.loginForm.password.trim(),
                    code: this.loginForm.seccode.trim(),
                },
                success: (res) => {
                    let result = JSON.parse(res);
                    let tip = result.errorcode;
                    switch(tip) {
                        case 200 :
                            localStorage.whname = result.data;            // 登录用户名
                            localStorage.langSelect = '0';  // 语言
                            // 判断是否记住密码
                            /* if(this.remeberValue) {
                                localStorage.remember = true;
                                localStorage.whname = this.loginForm.mail;
                                localStorage.whpass = this.loginForm.password;
                            } else {
                                localStorage.remember = false;
                                localStorage.whname = '';
                                localStorage.whpass = '';
                            } */
                            this.$router.push('/enter');
                            break;
                        case 205:
                            this.$Message.error({
                                content: `${result.msg}`,
                                duration: 3
                            });
                            this.$router.push('/enter');
                            this.loginForm.seccode = '';
                            this.getIdentifyingCode(true);
                            break;
                        case 204:
                            this.$Message.error({
                                content: `账号不存在，请先注册。`,
                                duration: 3
                            });
                            break;
                        default :
                            this.$Message.error({
                                content: `${result.msg}。`,
                                duration: 3
                            });
                            break;
                    } 
                }
            })
        },
        /**
         * 注册请求
         */
        registerQuery() {
            this.$resetAjax({
                type: 'POST',
                url: '/choose/Login/adduser',
                data: {
                    name: this.loginForm.mail.trim(),
                    psw: this.loginForm.password.trim(),
                },
                success: (res) =>{
                    let result = JSON.parse(res);
                    if(result.errorcode === 200) {
                        this.$Message.success({
                            content: '用户注册成功。',
                            duration: 3
                        });
                    } else {
                        this.$Message.error({
                            content: `${result.msg}。`,
                            duration: 3
                        });
                    }
                }
            })
        }
    }
 }
 </script>
 