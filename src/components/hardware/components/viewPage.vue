<template>
    <div id="content-container" direction="vartical">
        <div class="interval">
            <h2 class="container-row font_title">新辉眼镜有限公司</h2>
            <h3 class="font_subheading">
                {{ $route.meta.title }}
            </h3>
        </div>
        <el-row style="margin-bottom: 20px;">
            <el-col :span="3" :offset="3">
                <el-container>
                    <span style="display:inline-block;width:120px;line-height: 30px;font-size: 18px;">{{ $route.meta.title
                        == "五金入库单" ? "来源：" : "领取人：" }}</span>
                    <el-input v-model="data.username"></el-input>
                </el-container>
            </el-col>
            <el-col :span="8" :offset="7" style="font-size: 18px;">
                <span>日期：</span>
                <span>{{ data.time }}</span>
            </el-col>
        </el-row>
        <el-row v-show="$route.meta.title == '五金入库单' ? true : false">
            <el-col :span="16" :offset="3">
                <el-form :model="data" ref="productRuleForm" @keydown.enter="addTable">
                    <el-table :data="data.tableData" border style="width: 100%" @row-dblclick="singleShot">
                        <el-table-column prop="name" label="型号" width="150">
                            <template #default="scope">
                                <el-form-item :prop="'tableData.' + scope.$index + '.name'">
                                    <el-input v-model.trim="scope.row.name" ref="No1" @keydown.right="inputDown('No1')"
                                        @blur="getAddress"></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column prop="typeName" label="规格" width="150">
                            <template #default="scope">
                                <el-form-item :prop="'tableData.' + scope.$index + '.typeName'">
                                    <el-input v-model.trim="scope.row.typeName" ref="No2"
                                        @keydown.right="inputDown('No2')" @keydown.left="inputDownLeft('No2')"
                                        @blur="getAddress"></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>

                        <el-table-column prop="num" label="数量">
                            <template #default="scope">
                                <el-form-item :prop="'tableData.' + scope.$index + '.num'">
                                    <el-input v-model.trim="scope.row.num" ref="No3" @keydown.right="inputDown('No3')"
                                        @keydown.left="inputDownLeft('No3')" @blur="calculate"></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>

                        <el-table-column prop="unit" label="单位" width="80">
                            <template #default="scope">
                                <el-form-item :prop="'tableData.' + scope.$index + '.unit'">
                                    <el-input v-model.trim="scope.row.unit" ref="No4" @keydown.right="inputDown('No4')"
                                        @keydown.left="inputDownLeft('No4')"></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column prop="price" label="单价" width="100">
                            <template #default="scope">
                                <el-form-item :prop="'tableData.' + scope.$index + '.price'">
                                    <el-input v-model.trim="scope.row.price" ref="No5" @keydown.right="inputDown('No5')"
                                        @keydown.left="inputDownLeft('No5')" @blur="calculate"></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column prop="money" label="金额" width="170">
                            <template #default="scope">
                                <el-form-item :prop="'tableData.' + scope.$index + '.money'">
                                    <el-input v-model.trim="scope.row.money" ref="No6" @keydown.right="inputDown('No6')"
                                        @keydown.left="inputDownLeft('No6')"></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column prop="address" label="仓位" width="170">
                            <template #default="scope">
                                <el-form-item :prop="'tableData.' + scope.$index + '.address'">
                                    <el-input v-model.trim="scope.row.address" ref="No7" @keydown.right="inputDown('No7')"
                                        @keydown.left="inputDownLeft('No7')"></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column prop="remark" label="备注" width="170">
                            <template #default="scope">
                                <el-form-item :prop="'tableData.' + scope.$index + '.remark'">
                                    <el-input v-model.trim="scope.row.remark" ref="No8"
                                        @keydown.left="inputDownLeft('No8')"></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form>
            </el-col>
            <el-col :span="2" :offset="1">
                <el-container class="container-row">
                    <el-container>
                        <!-- <el-button type="primary" @click="btn" :disabled="!flag">数据提交</el-button> -->
                        <el-button type="primary" @click="btn" :disabled="!flag">数据提交</el-button>
                    </el-container>
                </el-container>
                <el-container class="container-row">
                    <el-container>
                        <!-- <el-button type="primary" @click="empty">清空数据</el-button> -->
                    </el-container>
                </el-container>
            </el-col>
            <el-col :span="6">
                <div style="height: 100px;"></div>
            </el-col>
        </el-row>
        <el-row v-show="$route.meta.title == '五金出库单' ? true : false">
            <el-col :span="16" :offset="3">
                <el-form :model="data" ref="productRuleForm" @keydown.enter="addTable">
                    <el-table :data="data.tableData" border style="width: 100%" @row-dblclick="singleShot">
                        <el-table-column prop="name" label="型号" width="150">
                            <template #default="scope">
                                <el-form-item :prop="'tableData.' + scope.$index + '.name'">
                                    <el-select v-model="scope.row.name" filterable remote reserve-keyword placeholder="请输入五金型号"
                                        :remote-method="remoteMethod" :loading="loading" allow-create clearable ref="No14"
                                        @keydown.right="inputDown('No14')" @change="getAddress">
                                        <el-option v-for="item in options" :key="item.value" :label="item.label"
                                            :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column prop="typeName" label="规格" width="150">
                            <template #default="scope">
                                <el-form-item :prop="'tableData.' + scope.$index + '.typeName'">
                                    <el-select v-model="scope.row.typeName" filterable remote reserve-keyword placeholder="请输入五金规格"
                                        :remote-method="remoteMethod" :loading="loading" allow-create clearable ref="No15"
                                        @keydown.right="inputDown('No15')" @change="getAddress">
                                        <el-option v-for="item in options" :key="item.value" :label="item.label"
                                            :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </template>
                        </el-table-column>

                        <el-table-column prop="num" label="数量">
                            <template #default="scope">
                                <el-form-item :prop="'tableData.' + scope.$index + '.num'">
                                    <el-input v-model.trim="scope.row.num" ref="No16" @keydown.right="inputDown('No16')"
                                        @keydown.left="inputDownLeft('No16')" @blur="calculate"></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>

                        <el-table-column prop="unit" label="单位" width="80">
                            <template #default="scope">
                                <el-form-item :prop="'tableData.' + scope.$index + '.unit'">
                                    <el-input v-model.trim="scope.row.unit" ref="No17" @keydown.right="inputDown('No17')"
                                        @keydown.left="inputDownLeft('No17')"></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column prop="price" label="单价" width="100">
                            <template #default="scope">
                                <el-form-item :prop="'tableData.' + scope.$index + '.price'">
                                    <el-input v-model.trim="scope.row.price" ref="No18" @keydown.right="inputDown('No18')"
                                        @keydown.left="inputDownLeft('No18')" @blur="calculate"></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column prop="money" label="金额" width="170">
                            <template #default="scope">
                                <el-form-item :prop="'tableData.' + scope.$index + '.money'">
                                    <el-input v-model.trim="scope.row.money" ref="No19" @keydown.right="inputDown('No19')"
                                        @keydown.left="inputDownLeft('No19')"></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column prop="address" label="仓位" width="170">
                            <template #default="scope">
                                <el-form-item :prop="'tableData.' + scope.$index + '.address'">
                                    <el-input v-model.trim="scope.row.address" ref="No20" @keydown.right="inputDown('No20')"
                                        @keydown.left="inputDownLeft('No20')"></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column prop="remark" label="备注" width="170">
                            <template #default="scope">
                                <el-form-item :prop="'tableData.' + scope.$index + '.remark'">
                                    <el-input v-model.trim="scope.row.remark" ref="No21"
                                        @keydown.left="inputDownLeft('No21')"></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form>
            </el-col>
            <el-col :span="2" :offset="1">
                <el-container class="container-row">
                    <el-container>
                        <!-- <el-button type="primary" @click="btn" :disabled="!flag">数据提交</el-button> -->
                        <el-button type="primary" @click="btn" :disabled="!flag">数据提交</el-button>
                    </el-container>
                </el-container>
                <el-container class="container-row">
                    <el-container>
                        <!-- <el-button type="primary" @click="empty">清空数据</el-button> -->
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
        data: Object
    },
    data() {
        return {
            queryParam: this.data,
            loading: false,
            options: [],
            tableData: [],
            typeName: [],
            list: [],
            states: [],
            
        }
    },
    methods: {
        remoteMethod(query) {
            if (query !== "") {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    this.options = this.list.filter(item => {
                        return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
                    });
                }, 200);
            } else {
                this.options = [];
            }
        },
        // 点击提交上传参数
        btn() {
            // this.$emit("queryParam", this.data)
            console.log("看看", this.flag)
            if (this.flag) {
                let user = localStorage.getItem("user")
                let username = JSON.parse(user).username
                this.data.operation = username
                this.$emit("queryParam", this.data)

            } else {
                return
            }
            this.flag = true
            setTimeout(() => {
                this.flag = false
            }, 3000)
        },
        // 失去焦点计算总价
        calculate() {
            this.data.tableData.forEach(item => {
                let AllMoney = item.num * item.price
                item.money = AllMoney.toFixed(2)
            })

        },
        // 失去焦点获取仓位
        getAddress() {
            /**
             * 业务逻辑
             *      在name和typeName同时有值的情况下才能发起请求，这样可以减少请求次数
             * type:1表示查询仓位
             */

            this.data.tableData.forEach((item, idx) => {
                console.log('查看',this.tableData)
                // this.data.tableData[idx].name = this.tableData
                // this.data.tableData[idx].typeName = this.typeName
                if (this.data.tableData[idx].name && this.data.tableData[idx].typeName) {
                    // 每次请求前清空仓位
                    // this.data.tableData[idx].address = ""
                    let params = {
                        name: this.data.tableData[idx].name,
                        typeName: this.data.tableData[idx].typeName,
                        type: 6
                    }
                    getAxios("/materialgood", params).then(res => {
                        console.log(res.res)
                        if (res.state == 200) {
                            this.data.tableData[idx].address = res.res[0].address
                            if(this.$route.meta.title == '五金出库单'){
                                this.data.tableData[idx].unit = res.res[0].unit
                            }else{
                                this.data.tableData[idx].unit = ''
                            }
                        } else {
                            this.data.tableData[idx].address = ''
                        }
                       
                    })

                }
            })

        },
        // 回车新增一栏
        addTable() {
            if (this.data.tableData.length < 9) {
                let arr;
                let len = this.data.tableData.length;
                for (let i = 0; i < len; i++) {
                    arr = this.data.tableData[i];
                }
                if (arr.name && arr.typeName && arr.money && arr.num && arr.unit) {
                    this.data.tableData.push({
                        name: "",
                        typeName: "",
                        num: null,
                        unit: "",
                        price: null,
                        money: null,
                        address: "",
                        remark: ""
                    });
                } else {
                    window.alert("没有输入完");
                }
            } else {
                this.$alert("最多可以出9条，请保存后再出库", "温馨提示", {
                    confirmButtonText: '确定',
                })
            }
        },
        //ele的单击事件（row代表拿到具体点击所对应的数据）
        singleShot(row, column) {
            // row参数为点击某条时返回对应的数据
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                // // 删除点击的那一行
                this.data.tableData.splice(row.date - 1, 1);

                // 删除后date需要改变长度
                this.data.tableData.forEach((item, idx) => {
                    this.data.tableData[idx].date = idx + 1;
                });
            })
                .catch((error) => {
                    console.log("看看", error);
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
            // console.log("column:", column);
            // console.log("cell:", cell);
            // console.log("event:", event);
        },
        // 键盘按键跳转到一下个input里(代替tab键的功能)
        inputDown(e) {
            let noNum = e.slice(2);
            let no = e.slice(0, 2);
            let No = no + noNum;
            if (e) {
                e = no + ++noNum;
                this.$refs[e].focus();
            }
        },
        // 键盘按下跳转到上一个input里
        inputDownLeft(e) {
            let noNum = e.slice(2);
            let no = e.slice(0, 2);
            let No = noNum + no;
            if (e) {
                e = no + --noNum;
                this.$refs[e].focus();
            }
        },
    },
    mounted() {

        // 拿到操作人员信息
        let user = localStorage.getItem("user")
        let username = JSON.parse(user).username
        this.data.operation = username
        getAxios("materialgood", { type: 5 }).then(res => {
            this.list = res.res
            res.res.map(itme => {
                var a = itme.name;
                var b = itme.typeName;
                var c = itme.operating;
                return this.states.splice(0, 0, a, b, c);
            });
            // 过滤重复的数据,这样下拉选项中就不会有太长的数据了
            this.states = this.states.filter((item, idx, arr) => {
                res = arr.indexOf(item) === idx;
                return res;
            });
            this.list = this.states.map(item => {
                //  console.log(item)
                return { value: `${item}`, label: `${item}` };
            });
        })
    },
    computed: {
        flag: function () {
            if (this.$route.meta.title == "五金入库单") {
                // let arr = JSON.parse(JSON.stringify(this.data.tableData));
                let keyobj = JSON.parse(JSON.stringify(this.data.tableData))

                var item = 0
                for (var key in keyobj) {
                    delete keyobj[key].remark
                    delete keyobj[key].price
                    for (var keys in keyobj[key]) {
                        if (keyobj[key][keys] == "") {
                            item++;
                        }
                    }
                }

                if (item > 0) {
                    return false
                } else {
                    return true
                }
            } else if (this.$route.meta.title == '五金出库单') {
                let arr = JSON.parse(JSON.stringify(this.data));
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