<template>
    <div id="content-container" direction="vartical">
        <div class="interval">
            <h2 class="container-row font_title">新辉眼镜有限公司</h2>
            <h3 class="font_subheading">
                {{ $route.meta.title }}
            </h3>
        </div>
        <el-row>
            <el-col :span="16" :offset="4">
                <el-container class="container-row">
                    <div class="input-tip">来&emsp;源：</div>
                    <div class="input-field">
                        <el-input v-model.trim="obj.username" autofocus></el-input>
                    </div>
                    <div class="input-tip">操作人：</div>
                    <div class="input-field">
                        <el-input v-model.trim="obj.operation"></el-input>
                    </div>
                    <div class="input-tip">时&emsp;间：</div>
                    <div class="input-field">
                        <el-input v-model.trim="obj.time"></el-input>
                    </div>
                </el-container>
                <div>
                    <el-container class="container-row">
                        <div class="input-tip">名&emsp;称：</div>
                        <div class="input-field">
                            <el-input v-model.trim="obj.name" @blur="getAddress"></el-input>
                        </div>

                        <div class="input-tip">规&emsp;格：</div>
                        <div class="input-field">
                            <el-input v-model.trim="obj.typeName" @blur="getAddress"></el-input>
                        </div>
                        <div class="input-tip">单&emsp;位：</div>
                        <div class="input-field">
                            <el-input v-model.trim="obj.unit"></el-input>
                        </div>


                    </el-container>
                    <el-container class="container-row">
                        <div class="input-tip">单&emsp;价：</div>
                        <div class="input-field">
                            <el-input v-model.trim="obj.price" @blur="calculate"></el-input>
                        </div>
                        <div class="input-tip">数&emsp;量：</div>
                        <div class="input-field">
                            <el-input v-model.trim="obj.num" @blur="calculate"></el-input>
                        </div>
                        <div class="input-tip">金&emsp;额：</div>
                        <div class="input-field">
                            <el-input v-model.trim="obj.money"></el-input>
                        </div>

                    </el-container>
                    <el-container>
                        <div class="input-tip">品&emsp;牌：</div>
                        <div class="input-field">
                            <el-input v-model.trim="obj.brand"></el-input>
                        </div>
                        <div class="input-tip">仓&emsp;位：</div>
                        <div class="input-field">
                            <el-input v-model.trim="obj.address"></el-input>
                        </div>
                        <div class="input-tip">备&emsp;注：</div>
                        <div class="input-field">
                            <el-input v-model.trim="obj.remark"></el-input>
                        </div>
                    </el-container>
                </div>
            </el-col>
            <el-col :span="2">
                <el-container class="container-row">
                    <el-container>
                        <el-button type="primary" @click="btn" :disabled="!flag">数据提交</el-button>
                    </el-container>
                </el-container>
                <el-container class="container-row">
                    <el-container>
                        <el-button type="primary" @click="batch">批量入库</el-button>
                    </el-container>
                </el-container>
            </el-col>
            <el-col :span="6">
                <div style="height: 100px;"></div>
            </el-col>
        </el-row>

    </div>
</template>
<script>
import { getAxios } from '@/assets/js/base'
export default {
    props: {
        obj: Object
    },
    data() {
        return {
            queryParam: this.obj
        }
    },
    methods: {
        // 点击提交上传参数
        btn() {
            this.$emit("queryParam", this.queryParam)
        },
        // 失去焦点计算总价
        calculate() {
            let price = this.queryParam.price
            let num = this.queryParam.num
            this.queryParam.money = price * num

        },
        // 失去焦点获取仓位
        getAddress() {
            /**
             * 业务逻辑
             *      在name和typeName同时有值的情况下才能发起请求，这样可以减少请求次数
             * type:1表示查询仓位
             */
            if (this.queryParam.name && this.queryParam.typeName) {
                // 每次请求前清空仓位
                this.queryParam.address = ""
                console.log("获取仓位")
                let params = {
                    name: this.queryParam.name,
                    typeName: this.queryParam.typeName,
                    type: 1
                }
                getAxios("/materialgood", params).then(res => {
                    console.log(res.res)
                    if (res.state == 200) {
                        this.queryParam.address = res.res[0].address
                    } else {
                        if (this.$route.meta.title == "原料入库单") {
                            this.$confirm(
                                this.queryParam.name + '-' + this.queryParam.typeName + '是新材料，确定要入库',
                                {
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    type: 'warning',
                                }
                            ).then(() => {
                                // ElMessage({
                                //     type: 'success',
                                //     message: 'Delete completed',
                                // })
                            }).catch(() => {
                                this.queryParam.name = "";
                                this.queryParam.typeName = ''
                            })
                        } else if (this.$route.meta.title == "原料出库单") {
                            this.$confirm(
                                '没有找到'+this.queryParam.name + '-' + this.queryParam.typeName+"不能出库",
                                {
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    type: 'warning',
                                }
                            ).then(() => {
                                // ElMessage({
                                //     type: 'success',
                                //     message: 'Delete completed',
                                // })
                            }).catch(() => {
                                this.queryParam.name = "";
                                this.queryParam.typeName = ''
                            })
                        }

                    }
                })

            }

        },
        // 批量入库
        batch() {
            window.alert("功能待开发，请耐心等待")
        }
    },
    mounted() {

        // 拿到操作人员信息
        let user = localStorage.getItem("user")
        let username = JSON.parse(user).username
        this.queryParam.operation = username
    },
    computed: {
        flag: function () {
            if (this.$route.meta.title == "原料入库单") {
                let arr = JSON.parse(JSON.stringify(this.queryParam));
                let keyobj = JSON.parse(JSON.stringify(arr))
                delete keyobj.remark
                delete keyobj.price
                console.log(this.obj)
                var item = 0
                for (var key in keyobj) {

                    if (keyobj[key] == "") {
                        item++;
                    }
                }
                if (item > 0) {
                    return false
                } else {
                    return true
                }
            } else if (this.$route.meta.title == '原料出库单') {
                let arr = JSON.parse(JSON.stringify(this.obj));
                let keyobj = JSON.parse(JSON.stringify(arr))
                delete keyobj.remark
                delete keyobj.price
                delete keyobj.money
                delete keyobj.brand
                delete keyobj.address

                var item = 0
                for (var key in keyobj) {

                    if (keyobj[key] == "") {
                        item++;
                    }
                }
                if (item > 0) {
                    return false
                } else {
                    return true
                }
            }
        }
    }
}
</script>