<template>
    <div id="content-container" direction="vartical">
        <div class="interval">
            <h2 class="container-row font_title">新辉眼镜有限公司</h2>
            <h3 class="font_subheading">
                基础信息维护
            </h3>
        </div>
        <el-container class="container-row">
            <div class="input-tip">材料型号：</div>
            <div class="input-field">
                <el-input autofocus v-model.trim="searchValue.name"></el-input>
            </div>
            <div class="input-tip">材料规格：</div>
            <div class="input-field">
                <el-input v-model.trim="searchValue.typeName"></el-input>
            </div>
            <div class="input-tip"></div>
            <div class="input-field">
                <el-button type="primary" style="font-size: 16px; color: #000;" :disabled="disabled"
                    @click="search">搜&emsp;索</el-button>
                    <el-button type="primary" style="font-size: 16px; color: #000;"
                    @click="back">返回详单</el-button>
            </div>
        </el-container>
        <el-table border :data="goods">
            <el-table-column label="材料名称" prop="name"></el-table-column>
            <el-table-column label="材料型号" prop="typeName"></el-table-column>
            <el-table-column label="库存下限" prop="compare">
                <template #default="scope">
                    <span v-show="scope.row.flag ? false : true">
                        {{ scope.row.compare }}
                    </span>
                    <span v-show="scope.row.flag ? true : false">
                        <el-input v-model.trim="scope.row.compare"></el-input>
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="仓位" prop="address">
                <template #default="scope">
                    <span v-show="scope.row.flag ? false : true">
                        {{ scope.row.address }}
                    </span>
                    <span v-show="scope.row.flag ? true : false">
                        <el-input v-model.trim="scope.row.address"></el-input>
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="操作" prop="">
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.row)" :disabled="scope.row.flag">编辑</el-button>
                    <el-button size="small" type="success" :disabled="scope.row.flag ? false : true"
                        @click="save(scope.row, scope.$index)">保存</el-button>
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
import { renderList } from 'vue';
export default {
    data() {
        return {
            goods: [],
            total: 0,//总条数
            pageIndex: 1,//当前页数
            pageSize: 10,//一页展示10条,
            searchValue: {
                name: "",
                typeName: ""
            },
            isSearch:false,
            DataAll:[]
        }
    },
    created() {
        this.renderList()
    },
    methods: {
        // 点击页码跳转页面
        pageChange(pageIndex) {
            // this.historyList=[]
            let _that = this;
            if(_that.isSearch){
                if (_that.DataAll) {
                    if (_that.pageIndex) {
                        _that.pageIndex = pageIndex
                    }
                    _that.goods = _that.DataAll.slice((_that.pageIndex - 1) * _that.pageSize, _that.pageIndex * _that.pageSize)
                    
                }
            }else{
                if (_that.goods) {
                    if (_that.pageIndex) {
                        _that.pageIndex = pageIndex
                    }
                    let param = {
                        pageIndex: this.pageIndex,
                        pageSize: this.pageSize,
                        type: 7
                    }
                    getAxios('materialgood', param).then(res => {
                        if (res.state == 200) {
                            _that.goods = res.res
                        }
                    })

                }
            }
        },
        // 编辑
        handleEdit(row) {
            console.log(row.flag)
            row.flag = !row.flag
        },
        // 保存
        save(row, idx) {
            row.type=1
            getAxios("materialmessage", row).then(res => {
                if (res.state == 200) {
                    this.message(res.msg, "success")
                    this.total = 0
                    this.renderList()
                } else {
                    this.message(res.msg, "error")

                }
            })
        },
        // 搜索
        search() {
            this.searchValue.type = 4
            this.isSearch = true
            this.total = 0
            getAxios("materialsearch", this.searchValue).then(res => {
                if (res.state == 200) {
                    this.goods = []
                    this.DataAll = []
                    this.DataAll = res.res
                    this.total = res.res.length
                    this.goods = this.DataAll.slice((this.pageIndex - 1) * this.pageSize, this.pageIndex * this.pageSize)

                } else {
                    this.message(res.msg, "error")
                    this.goods = []
                }
            })
        },
        // 回到详单页
        back(){
            this.total=0
            this.renderList()
        },
        // 封装消息提醒
        message(msg, type) {
            this.$message({
                message: msg,
                type: type,
                duration: 4000
            })
        },
        //封装页面渲染
        renderList() {
            getAxios("materialgood", {
                type: 7,
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
            }).then(res => {
                if (res.state == 200) {
                    let arr = []
                    res.res.forEach(item => {
                        item.flag = false
                        arr.unshift(item)
                    })
                    this.total = res.count
                    this.goods = arr.slice((this.pageIndex - 1) * this.pageSize, this.pageIndex * this.pageSize)
                }
            })
        }
    },
    computed: {
        disabled() {
            return this.searchValue.name.length == 0 && this.searchValue.typeName.length == 0
        }
    }
}
</script>