<template>
    <div id="content-container" direction="vartical">
        <div class="interval">
            <h2 class="container-row font_title">新辉眼镜有限公司</h2>
            <h3 class="font_subheading">
                {{ $route.meta.title }}
            </h3>
        </div>
        <el-container class="container-row">
            <div class="input-tip">材料名称：</div>
            <div class="input-field">
                <el-input autofocus v-model="searchValue.name"></el-input>
            </div>
            <div class="input-tip">材料型号：</div>
            <div class="input-field">
                <el-input v-model="searchValue.typeName"></el-input>
            </div>
            <div class="input-tip"></div>
            <div class="input-field">
                <el-button type="primary" style="font-size: 16px; color: #000;" @click="search" :disabled="disabled">搜&emsp;索</el-button>
                <el-button type="primary" style="font-size: 16px; color: #000;" @click="back">返回详单</el-button>
                <el-button type="primary" style="font-size: 16px; color: #000;" @click="msg">基础信息维护</el-button>
            </div>
        </el-container>
        <el-table border :data="goods">
            <el-table-column label="材料名称" prop="name"></el-table-column>
            <el-table-column label="材料型号" prop="typeName"></el-table-column>
            <el-table-column label="数量" prop="num"></el-table-column>
            <el-table-column label="单位" prop="unit"></el-table-column>
            <el-table-column label="仓位" prop="address"></el-table-column>
            <el-table-column label="补货提示" prop="">
                <template #default="scope">
                    <span style="color:red;font-size: 18px;" v-show="scope.row.flag">
                        需要备货
                    </span>
                </template>
            </el-table-column>
        </el-table>
        <div>
            <el-pagination id="page" background layout="prev, pager, next" prev-text='上一页' next-text="下一页"
                @current-change="pageChange" :total="total" :default-page-size='pageSize'>
            </el-pagination>
        </div>
    </div>
</template>
<script>
import '@/assets/css/commo.css'
import { getAxios } from '@/assets/js/base';
export default {
    data() {
        return {
            goods: [],
            total: 0,//总条数
            pageIndex: 1,//当前页数
            pageSize: 10,//一页展示10条
            searchValue: {
                name: "",
                typeName: ""
            },
            isSearch: false,
            DataAll: []
        }
    },
    mounted() {
        // 渲染页面
        this.RenderList()
    },
    methods: {
        // 点击页码跳转页面
        pageChange(pageIndex) {
            // this.historyList=[]
            let _that = this;
            if (_that.isSearch) {
                if (_that.DataAll) {
                    if (_that.pageIndex) {
                        _that.pageIndex = pageIndex
                    }
                    _that.goods=[]
                    let list = _that.DataAll.slice((_that.pageIndex - 1) * _that.pageSize, _that.pageIndex * _that.pageSize)
                    list.forEach(item => {
                        if (item.num <= item.compare) {
                            item.flag = true
                        } else {
                            item.flag = false
                        }
                        _that.goods.unshift(item)
                    })
                }
            } else {
                if (_that.goods) {
                    if (_that.pageIndex) {
                        _that.pageIndex = pageIndex
                    }
                    let param = {
                        pageIndex: this.pageIndex,
                        pageSize: this.pageSize,
                        type: 3
                    }
                    _that.goods = []
                    getAxios('materialgood', param).then(res => {
                        if (res.state == 200) {
                            // _that.goods = res.res
                            res.res.forEach(item => {
                                if (item.num <= item.compare) {
                                    item.flag = true
                                } else {
                                    item.flag = false
                                }
                                _that.goods.unshift(item)
                            })

                        }
                    })

                }
            }
        },
        // 进入到基础信息维护界面
        msg() {
            this.$router.push("/home/material/information")
        },
        // 搜索
        search() {
            this.searchValue.type = 2
            this.isSearch = true
            this.total = 0
            getAxios("materialsearch", this.searchValue).then(res => {
                if (res.state == 200) {
                    this.goods = []
                    this.DataAll = []
                    this.DataAll = res.res
                    res.res.forEach(item => {
                        if (item.num*1 <= item.compare*1) {
                            item.flag = true
                        } else {
                            item.flag = false
                        }
                        // arr.unshift(item)
                    })
                    this.total = res.res.length
                    this.goods = this.DataAll.slice((this.pageIndex - 1) * this.pageSize, this.pageIndex * this.pageSize)
                    
                } else {
                    this.message(res.msg, "error")
                    this.goods = []
                }
            })
        },
        // 返回详情也
        back() {
            this.isSearch = false
            this.total = 0
            this.RenderList()
        },
        // 封装渲染页面
        RenderList() {
            getAxios("materialgood", {
                type: 3,
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
            }).then(res => {
                if (res.state == 200) {
                    // let arr = []
                    res.res.forEach(item => {
                        if (item.num <= item.compare) {
                            item.flag = true
                        } else {
                            item.flag = false
                        }
                        // arr.unshift(item)
                    })
                    this.total = res.count
                    this.goods = res.res.slice((this.pageIndex - 1) * this.pageSize, this.pageIndex * this.pageSize)
                }
            })
        },
        // 封装消息提醒
        message(msg, type) {
            this.$message({
                message: msg,
                type: type,
                duration: 4000
            })

        },
    },
    computed: {
        disabled() {
            return this.searchValue.name.length == 0 && this.searchValue.typeName.length == 0
        }
    }
}
</script>