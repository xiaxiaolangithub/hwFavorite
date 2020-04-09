<template>
    <div class="disPage">
        <div class="top">
            <div class="top_left">
                <p @click="show">新增</p>
            </div>
            <div class="top_select">
                <div class="item">
                    <span class="item_title">货号：</span>
                    <Input v-model="item_no" placeholder="请输入货号" style="width: 200px" @on-enter="blurCode" @on-blur="blurCode" />
                </div>
                <div class="item">
                    <span class="item_title">时间起始：</span>
                    <DatePicker v-model="time1" format="yyyy-MM-dd  HH:mm:ss" type="daterange" placement="bottom-end" placeholder="请选择时间" style="width: 320px" @on-change="changeDateRange1"></DatePicker>
                </div>
                <!-- <p class="lookup" @click="loadData">查询</p> -->
            </div>
        </div>
        <div class="table">
            <Table border :height="tableHeight" :columns="columns" :data="tableData"></Table>
        </div>
        <div class="pageContanier">
            <Page :total="total" :page-size="pageSize" :current="currentPage" @on-change="changePage" show-elevator show-total></Page>
        </div>
        <Drawer :title="titleName" v-model="value3" width="720" :styles="styles" class="adver_clos disPage_drawer" draggable>
            <Form :model="formData" ref="formData" :rules="ruleValidate">
                <Row :gutter="32">
                    <i-Col span="24">
                        <FormItem label="货号" prop="no" label-position="top">
                            <Input v-model="formData.no" placeholder="请输入货号" />
                        </FormItem>
                        <FormItem label="时间起始" prop="time2" label-position="top" class="discount_item">
                            <DatePicker v-model="formData.time2" format="yyyy-MM-dd" type="daterange" :options="options" placement="bottom-end" placeholder="请选择时间" @on-change="changeDateRange2"></DatePicker>
                        </FormItem>
                        <FormItem label="折扣价格" prop="discount" label-position="top" class="discount_item">
                            <InputNumber  :min="0.1" v-model="formData.discount" placeholder="请输入折扣价格"></InputNumber>
                        </FormItem>
                        <FormItem label="折扣力度" prop="rate" label-position="top">
                            <Input v-model="formData.rate" placeholder="请输入折扣力度" />
                        </FormItem>
                    </i-Col>
                </Row>
            </Form>
            <div class="demo-drawer-footer">
                <Button style="margin-right: 8px" @click="value3 = false">取消</Button>
                <Button type="primary" @click="submitJudge(formData)">提交</Button>
            </div>
        </Drawer>
    </div>
</template>

<script>
import { changeday } from "@/assets/js/tool.js"; // 转化时间为2019-10-09 这样的格式
import { changeTime } from "@/assets/js/tool.js"; // 转化时间为2019-10-09 00:00:00这样的格式
import NProgress from "nprogress"; // 引入进度条
import "nprogress/nprogress.css"; // 引入进度条
export default {
  data() {
    return {
        // 用户名查询
        user: "",
        // 商品总数
        total: 0,
        // 每页条数
        pageSize: 20,
        // 当前页码
        currentPage: 1,
        // 表格高度
        tableHeight: 600,
        // 表格数据
        tableData: [],
        activeId: -1,
        modal1: false,
        timeStatus: false,
        //  日期选择限制
        options: {
            disabledDate (date) {
                return date && date.valueOf() < Date.now() - 86400000;
            }
        },
        status: 0, //提交状态
        resultData: [],
        //   侧边栏状态
        value3: false,
        //   身份列表
        typeList: [],
        //   侧面栏样式
        indeterminate: true,
        checkAll: false,
        styles: {
            height: "calc(100% - 55px)",
            overflow: "auto",
            paddingBottom: "53px",
            position: "static"
        },
        //   表单数据
        formData: {
            no: "",
            discount: 0.1,
            rate: "",
            time2: [],
        },
        //   验证
        ruleValidate: {
            no: [  { required: true, message: "请输入货号", trigger: "blur" }], 
            rate: [ { required: true, message: "请输入折扣力度", trigger: "blur" } ],
            time2: [ {
                    type: 'array',  required: true,  fields: {
                        0: {required: true, message: '时间不能为空', trigger: 'change', pattern: /.+/},
                        1: {required: true, message: '时间不能为空', trigger: 'change', pattern: /.+/},
                    } 
            }, ],
        },
        //   验证密码
        ruleValidate1: {},
        titleName: "新增",
        item_no: "",
        time1: [],
        // 表头
        columns: [
            {
                title: "货号",
                align: "center",
                key: "item_no"
            },

            {
                title: "名称",
                align: "center",
                key: "item_name"
            },

            {
                title: "售价",
                align: "center",
                key: "base_price"
            },
            {
                title: "折扣价",
                align: "center",
                key: "discount"
            },
            {
                title: "折扣力度",
                align: "center",
                key: "rate"
            },
            {
                title: "开始时间",
                align: "center",
                key: "stime"
            },
            {
                title: "结束时间",
                align: "center",
                key: "etime"
            },
            {
                title: "操作",
                key: "action",
                align: "center",
                render: (h, { row }) => {
                    return h("div", [
                    h("Icon", {
                        props: {
                            type: "md-cube",
                            size: "25",
                            color: "#218da0"
                        },
                        class: "look",
                        domProps: {
                            title: "点击查看商品详情"
                        },
                        on: {
                            click: () => {
                                this.getDetailData(row);
                            }
                        }
                    }),
                    h("span", [
                        h(
                        "Poptip",
                        {
                            class: "handle",
                            props: {
                                confirm: true,
                                transfer: true,
                                placement: "top",
                                title: "确定删除吗 ?",
                                type: "error",
                                size: "small",
                                width: "150",
                                vModel: true
                            },
                            domProps: {
                                title: "删除"
                            },
                            style: {
                                cursor: "pointer"
                            },
                            on: {
                                "on-ok": () => {
                                    this.delDis(row);
                                },
                                "on-cancel": () => {
                                    // 取消删除
                                }
                            }
                        },
                        [
                            h("Icon", {
                            props: {
                                type: "ios-trash",
                                size: "26",
                                color: "#333"
                            },
                            class: "delete"
                            })
                        ]
                        )
                    ])
                    ]);
                }
            }
        ]
    };
  },
    mounted() {
        setTimeout(() => {
            // 得到浏览器内容高度
            let windowHeight =
                document.documentElement.clientHeight || document.body.clientHeight;
            this.tableHeight = windowHeight - 220;
            }, 100);
            // 调整浏览器的时候
            $(window).on("resize", () => {
            let windowHeight =
                document.documentElement.clientHeight || document.body.clientHeight;
            this.tableHeight = windowHeight - 220;
        });
    },

    created() {
        this.loadData();
    },
    watch: {
        value3(val) {
            if(!val) {
                this.formData = {
                    no: "",
                    discount: 0.1,
                    rate: "",
                    time2: [],
                }
            }
        }
    },
    methods: {
        // 打开侧边栏
        show() {
            this.value3 = true;
            this.indeterminate = true;
            this.checkAll = false;
            this.ruleValue = [];
            this.status = 1;
        },
        // 获取商品列表
        loadData() {
            NProgress.start(); // 进度条开始
            let params;
            if (this.time1[0] == "" || this.time1[0] == undefined) {
                params = {
                    page: this.currentPage,
                    item_no: this.item_no
                };
            } else {
                params = {
                    page: this.currentPage,
                    item_no: this.item_no,
                    stime: changeTime(this.time1[0]),
                    etime: changeTime(this.time1[1])
                };
            }
            this.$resetAjax({
                type: "POST",
                url: "/Admin/Zhekou/index",
                data: params,
                success: res => {
                    NProgress.done(); // 进度条结束
                    let result = JSON.parse(res);
                    this.tableData = result.data;
                    this.total = Number(result.total);
                }
            });
        },
        /***
         * 货号输入
         */
        blurCode() {
            this.currentPage = 1;
            this.loadData();
        },
        /**
         * 选择时间
         */
        changeDateRange1(value) {
            this.currentPage = 1;
            this.tiem1 = value;
            this.timeStatus = true;
            this.loadData();
        },
        changeDateRange2(value) {
            this.tiem2 = value;
            this.timeStatus = true;
        },
        /**
         * 获取详情
         */
        getDetailData(row) {
            this.titleName = "编辑";
            this.status = 2; //1是新增，2是编辑
            this.formData.time2 = [changeTime(row.stime), changeTime(row.etime)];
            this.value3 = true;
            this.formData.no = row.item_no;
            this.formData.discount = row.discount;
            this.formData.rate = row.rate;
            this.activeId = row.d_id;
        },
        /**
         * 提交判断是否验证
         */
        submitJudge(formData) {
             this.$refs.formData.validate((valid) => {
                if (valid) {
                    this.submitQuery(formData);
                } 
            })
        },
        /**
         * 提交请求
         */
        submitQuery() {
            let url;
            let params;
            if (this.status == 1) {
                url = "/Admin/Zhekou/add";
                params = {
                    no: this.formData.no,
                    discount: this.formData.discount,
                    stime: changeTime(this.formData.time2[0]),
                    etime: changeTime(this.formData.time2[1]),
                    hdtitle: "zhe",
                    rate: this.formData.rate
                };
            } else {
                url = "/Admin/Zhekou/update";
                params = {
                    d_id: this.activeId,
                    no: this.formData.no,
                    discount: this.formData.discount,
                    stime: changeTime(this.formData.time2[0]),
                    etime: changeTime(this.formData.time2[1]),
                    hd_title: "zhe",
                    rate: this.formData.rate
                };
            }
            this.$resetAjax({
                type: "POST",
                url: url,
                data: params,
                success: res => {
                    let result = JSON.parse(res);
                    if (result.errorcode == "0") {
                        this.value3 = false;
                        this.time = [];
                        this.loadData();
                        this.$Message.success({
                            content: "提交成功",
                            duration: 2
                        });
                    } else {
                        this.value3 = true;
                        this.$Message.error({
                            content: result.msg,
                            duration: 2
                        });
                    }
                }
            });
        },
        /**
         * 删除
         */
        delDis(data) {
            this.$resetAjax({
                type: "POST",
                url: "/Admin/Zhekou/del",
                data: {
                    d_id: data.d_id
                },
                success: res => {
                    let result = JSON.parse(res);
                    if (result.errorcode == "0") {
                        this.loadData();
                    }
                }
            });
        },
        /**
         * 打开用户名弹窗
         */
        bindmodel(row) {
            this.activeId = row.id;
            this.ruleValue = [];
            this.indeterminate = true;
            this.checkAll = false;
            let list = row.rules.split(",");
            let ruleValue = this.ruleValue;
            let resultData = this.resultData;
            list.forEach(function(item, index) {
                resultData.forEach(function(data, num) {
                    if (item == data.id) {
                        ruleValue.push(data.id);
                    }
                });
            });
        },
        /**
         * 分页
         */
        changePage(index) {
            this.currentPage = index;
            this.loadData();
        }
    }
};
</script>
<style>
    .ivu-checkbox-group-item {
        display: inline-block;
        margin: 10px;
    }

    .ivu-modal-footer {
        display: none;
    }
    .demo-drawer-footer {
        border-top: 1px solid #e8e8e8;
        padding: 10px 16px;
        text-align: right;
        background: #fff;
    }
</style>
