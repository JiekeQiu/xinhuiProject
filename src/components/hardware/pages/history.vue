<template>
    <div id="content-container" direction="vartical">
        <div v-show="printView ? false : true">
            <div class="interval">
                <h2 class="container-row font_title">新辉眼镜有限公司</h2>
                <h3 class="font_subheading">
                    {{ $route.meta.title }}
                </h3>
            </div>
            <el-container class="container-row">
                <div class="input-tip">时间：</div>
                <div class="input-field">
                    <!-- <el-input v-model="searchValue.typeName"></el-input> -->
                    <el-date-picker v-model="searchValue.time" type="daterange" format="YYYY-MM-DD" range-separator="至"
                        start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"
                        value-format="YYYY-MM-DD" :default-time="defaultTime">
                    </el-date-picker>
                </div>
                <div class="input-tip">型号：</div>
                <div class="input-field">
                    <el-input autofocus v-model="searchValue.name" style="width:80px"></el-input>
                </div>
                <div class="input-tip">规格：</div>
                <div class="input-field">
                    <el-input v-model="searchValue.typeName" style="width:80px"></el-input>
                </div>
                <div class="input-tip">领取人：</div>
                <div class="input-field">
                    <el-input v-model="searchValue.username" style="width:80px"></el-input>
                </div>
                <div class="input-field">
                    <el-button type="primary" style="font-size: 16px; color: #000;" @click="search"
                        :disabled="disabled">搜&emsp;索</el-button>
                    <el-button type="primary" style="font-size: 16px; color: #000;" @click="back"
                        :disabled="disabled ? true : false">返回详单</el-button>
                    <el-button type="primary" style="font-size: 16px; color: #000;" @click="clearSearch"
                        :disabled="disabled">清空搜索</el-button>
                    <el-button type="primary" style="font-size: 16px; color: #000;" :disabled="isPrint"
                        @click="print">打印</el-button>
                </div>
            </el-container>
            <el-table border :data="historyList">
                <el-table-column prop="time" label="时间"></el-table-column>
                <el-table-column prop="name" label="材料型号">
                    <template #default="scope">
                        <span v-if="scope.row.flag">
                            <el-input v-model.trim="scope.row.name"></el-input>

                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="typeName" label="材料规格">
                    <template #default="scope">
                        <span v-if="scope.row.flag">
                            <el-input v-model.trim="scope.row.typeName"></el-input>

                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="num" label="数量">
                    <template #default="scope">
                        <span v-if="scope.row.flag">
                            <el-input v-model.trim="scope.row.num"></el-input>

                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="unit" label="单位" width="70"></el-table-column>
                <el-table-column prop="username" label="领取人" width="100">
                    <template #default="scope">
                        <span v-if="scope.row.flag">
                            <el-input v-model.trim="scope.row.username"></el-input>

                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="operation" label="接收人" width="100"></el-table-column>
                <el-table-column prop="remark" label="备注">
                    <template #default="scope">
                        <span v-if="scope.row.flag">
                            <el-input v-model.trim="scope.row.remark"></el-input>

                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="操作">
                    <template #default="scope">
                        <el-button size="small" @click="handleEdit(scope.row)" :disabled="scope.row.flag">编辑</el-button>
                        <el-button size="small" @click="save(scope.row, scope.$index)"
                            :disabled="scope.row.flag ? false : true">保存</el-button>
                        <el-button size="small" type="danger" @click="deleteEdit(scope.row)">删除</el-button>
                    </template>
                </el-table-column>

            </el-table>
            <div>
                <el-pagination id="page" background layout="prev, pager, next" prev-text='上一页' next-text="下一页"
                    @current-change="pageChange" :total="total" :default-page-size='pageSize'>
                </el-pagination>
            </div>
        </div>
        <div v-show="printView">
            <info-search :list="DataAll" @flag="isFlag"></info-search>
        </div>
    </div>
</template>
<script>
import '@/assets/css/commo.css'
import { getAxios } from '@/assets/js/base'
import infoSearch from '../../material/common/print.vue'
export default {
    components: {
        infoSearch
    },
    data() {
        return {
            historyList: [],
            total: 0,//总条数
            pageIndex: 1,//当前页数
            pageSize: 10,//一页展示10条
            isSearch: false,
            DataAll: [],
            searchValue: {
                name: "",
                typeName: "",
                time: null,
                username: ''
            },
            defaultTime: [
                new Date(2000, 1, 1, 7, 30, 0),
                new Date(2000, 2, 1, 19, 30, 0)
            ],
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
            isPrint: true,//是否打印
            printView: false,//显示打印界面
        }
    },
    created() {
        this.RenderList()
    },
    methods: {
        // 点击页码跳转页面
        pageChange(pageIndex) {
            // this.historyList=[]
            let _that = this;
            if (this.isSearch) {
                if (_that.DataAll) {
                    if (_that.pageIndex) {
                        _that.pageIndex = pageIndex
                    }
                    _that.historyList = _that.DataAll.slice((_that.pageIndex - 1) * _that.pageSize, _that.pageIndex * _that.pageSize)
                }
            } else {
                if (_that.historyList) {
                    if (_that.pageIndex) {
                        _that.pageIndex = pageIndex
                    }
                    let param = {
                        pageIndex: this.pageIndex,
                        pageSize: this.pageSize,
                        type: 9
                    }
                    getAxios('materialgood', param).then(res => {
                        if (res.state == 200) {
                            _that.historyList = res.res
                        }
                    })

                }
            }
        },
        // 打开编辑
        handleEdit(row) {
            row.flag = !row.flag
        },
        // 保存更改
        save(row, idx) {
            // 拿到修改前的数据
            let list = JSON.parse(sessionStorage.getItem("historyList"))
            let obj = list[idx]
            delete obj.flag
            delete row.flag
            let pre_edit = JSON.stringify(obj)
            let end_edit = JSON.stringify(row)
            if (pre_edit == end_edit) {
                this.$confirm(`内容没有修改，不能保存！`)
                    .then(() => {
                    })
                    .catch(() => {
                        // catch error
                    })
            } else {
                row.type = 2
                getAxios("edithardware", row).then(res => {
                    console.log(res)
                    if (res.state == 200) {
                        this.RenderList()
                        this.message(res.msg, "success")
                    } else {
                        this.RenderList()
                        this.message(res.msg, "warning")
                    }
                })
            }

        },
        // 删除
        deleteEdit(row) {
            this.$confirm(`删除有风险，是否需要删除？`, "警告提示", {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    getAxios("deletehardware", { _id: row._id, name: row.name, typeName: row.typeName, num: row.num, type: 2 }).then(res => {
                        if (res.state == 200) {
                            this.message(res.msg, 'success')
                            // 重新渲染页面
                            this.RenderList()
                        } else {
                            this.message(res.msg, "error")
                        }
                    })
                })
                .catch(() => {
                    // catch error
                    this.message('取消删除', 'success')

                })

        },
        // 搜索
        search() {
            this.isSearch = true
            this.total = 0
            this.searchValue.type = 6
            if (this.searchValue.time == null) {
                console.log("参数", this.searchValue)
                this.searchValue.start = ''
                this.searchValue.end = ''
            } else {
                this.searchValue.start = this.searchValue.time[0]
                this.searchValue.end = this.searchValue.time[1]
                delete this.searchValue.time

            }
            getAxios("materialsearch", this.searchValue).then(res => {

                if (res.state == 200) {
                    this.historyList = []
                    this.DataAll = []
                    this.DataAll = res.res
                    this.total = res.res.length
                    this.historyList = this.DataAll.slice((this.pageIndex - 1) * this.pageSize, this.pageIndex * this.pageSize)
                    this.isPrint = false

                } else {
                    this.message(res.msg, "error")
                    this.historyList = []
                }
            })
        },
        // 返回详单
        back() {
            this.isSearch = false
            this.total = 0
            this.searchValue = {
                name: "",
                typeName: ""

            }
            this.RenderList()
        },
        // 清除搜索
        clearSearch() {
            this.searchValue = {
                name: "",
                typeName: "",
                time: null,
                username: ''
            }
        },
        // 打印
        print() {
            this.printView = true

        },
        //接收子组件传过来的状态值
        isFlag(val) {
            this.printView = val
        },
        // 封装渲染列表
        RenderList() {
            getAxios("materialgood", {
                type: 9, pageIndex: this.pageIndex,
                pageSize: this.pageSize
            }).then(res => {
                if (res.state == 200) {
                    let list = []
                    res.res.forEach(item => {
                        item.flag = false
                        list.unshift(item)
                    })
                    this.total = res.count
                    this.historyList = list.slice((this.pageIndex - 1) * this.pageSize, this.pageIndex * this.pageSize)
                    sessionStorage.setItem("historyList", JSON.stringify(list))

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
            return this.searchValue.name.length == 0 && this.searchValue.typeName.length == 0 && this.searchValue.time == null && this.searchValue.username.length == 0
        }
    }
}
</script>