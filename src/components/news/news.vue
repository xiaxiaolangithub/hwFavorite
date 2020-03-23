<template>
    <div class="newsPage">
        <div class="news_top">
            <div class="top_inner">
                <Breadcrumb separator="<b class='demo-breadcrumb-separator'>></b>">
                    <BreadcrumbItem to="/enter">首页</BreadcrumbItem>
                    <BreadcrumbItem to="" v-for="(item,index) in orderBreadList" :key="index">{{item.name}}</BreadcrumbItem>
                </Breadcrumb>
            </div>
        </div>
        <div class="middle">
            <div class="middle_inner">
                <!-- 左边导航栏 -->
                <div class="news_nav">
                    <Collapse v-model="value" accordion>
                        <Panel v-for="(item, index) in newsList" :name="String(index+1)" :key="index" :class="{select: panelIndex == item.cid}">
                            {{item.cname}}
                            <p slot="content" v-for="(ele, i) in item.pannelData" :class="{select: slotIndex == ele.id}" :key="i" @click="getNavContent(ele,i,item)" :title="`发布时间: ${ele.ctime}`">{{ele.title}}</p>
                        </Panel>
                    </Collapse>
                </div>
                <!-- 右侧内容区 -->
                <div class="news_contanier">
                    <h3>
                        <p>{{newsTitle}}</p>
                        <span>{{newsDate}}</span>
                    </h3>
                    <div v-html='text' :class="className"></div>
                    <!-- <router-view /> -->
                </div>
            </div>
        </div>
        <BackTop></BackTop>
    </div>
</template>

<script>
import {getUrlParams} from  '@/assets/js/tool.js'
export default {
    data() {
        return {
            // 网址的参数
            urlParams: '',
            // 面包屑数据
            orderBreadList:[],
            // 折叠面板默认打开第几个
            value: '1',
            // 新闻标题列表
            newsList: [],
            // 选中哪个导航栏标题
            panelIndex: '',
            // 选中哪个新闻
            slotIndex: '84',
            // 右侧新闻标题
            newsTitle: '',
            // 右侧新闻的发布时间
            newsDate: '',
            // 右侧新闻的样式名
            className: '',
            // 右侧新闻内容
            text: '',
        }
    },

    created() {
        // 获取网址参数
        this.getParmasUrl();
        // 获取左侧导航栏信息
        this.getNavList();
    },
    methods: {
        /**
         * 获取网址参数
         */
        getParmasUrl() {
            this.urlParams = getUrlParams(); 
            
        },
        /**
        * 获取左侧导航栏信息
        */
        getNavList() {
            this.$resetAjax({
                type: 'GET',
                url: `/index.php/Somego/Article/show?id=${this.urlParams.id}`,
                success: (res) => {
                    let result = JSON.parse(res);
                    // 从首页进来默认得到右侧对应的内容展示
                    let info = result.info;
                    this.text = info.contents;
                    this.newsDate = info.ctime;
                    this.newsTitle = info.title;
                    this.slotIndex = info.id;
                    // 从首页进来默认得到面包屑
                    this.orderBreadList = [
                        {
                            name: `${info.catename}`
                        },
                        {
                            name: `${info.title}`
                        }
                    ];
                    // 从首页进来默认选中哪个导航栏大标题显示红色
                    this.panelIndex = String(info.cid);
                    result.catelist.forEach((ele, i) => {
                        this.$resetAjax({
                            type: 'GET',
                            url: `/index.php/Somego/Article/index?id=${ele.cid}`,
                            success: (res) => {
                                ele.pannelData = JSON.parse(res).list;
                                if(ele.cname === info.catename) {
                                    this.value = i + 1;
                                }
                            },
                        })
                    });

                    // 得到各个导航栏里的小导航
                    this.newsList = result.catelist;
                },
            })
        },
        /**
         * 得到各个导航栏里的小导航
         */
        getNavContent(ele,i,item) {
            this.panelIndex = ele.cid;
            this.text = ele.contents;
            this.slotIndex = ele.id;
            this.newsTitle = ele.title;
            this.newsDate = ele.ctime;
            this.className = `className${ele.id}`;
            this.orderBreadList = [
                {
                    name: `${item.cname}`
                },
                {
                    name: `${ele.title}`
                }
            ]
        },
    }
}
</script>
