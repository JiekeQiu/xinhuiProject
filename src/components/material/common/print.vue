<template>
    <div id="print">
        <div style="padding:30px">
        <table border="1" cellspacing="0" cellpadding="0" style="font-size:9pt;" width="1040px" align="center"
            class="table_box">
            <thead style="display:table-header-group;font-weight:bold;">
                <tr>
                    <td colspan="10" align="center" style="font-weight:bold;border:none" class="head_top">
                        <img src="../../../assets/images/logo1.jpg" class="title_logo" title="这里是logo">
                        <div class="title">
                            <p>鹰潭市新辉眼镜有限公司</p>
                            <p class="title_msg">{{ this.$route.meta.title }}</p>
                        </div>
                        <!-- <el-container class="top_msg">
                            <span>列印人：</span>
                            <span>{{ list[0].operation }}</span>
                            <span>列印日期：</span>
                            <span>{{ date }}</span>
                        </el-container>    -->
                    </td>
                </tr>
                <tr v-show="this.$route.meta.title == '原料入库明细'">
                    <td>时间</td>
                    <td>材料型号</td>
                    <td>材料规格</td>
                    <td>数量</td>
                    <td>单位</td>
                    <td>单价</td>
                    <td>金额</td>
                    <td>来源</td>
                    <td>备注</td>
                </tr>
                <tr v-show="this.$route.meta.title == '五金入库明细'">
                    <td>时间</td>
                    <td>材料型号</td>
                    <td>材料规格</td>
                    <td>数量</td>
                    <td>单位</td>
                    <td>单价</td>
                    <td>金额</td>
                    <td>来源</td>
                    <td>备注</td>
                </tr>
                <tr v-show="this.$route.meta.title == '原料出库明细'">
                    <td>时间</td>
                    <td>材料型号</td>
                    <td>材料规格</td>
                    <td>数量</td>
                    <td>单位</td>
                    <td>单价</td>
                    <td>金额</td>
                    <td>领取人</td>
                    <td>备注</td>
                </tr>
                <tr v-show="this.$route.meta.title == '五金出库明细'">
                    <td>时间</td>
                    <td>材料型号</td>
                    <td>材料规格</td>
                    <td>数量</td>
                    <td>单位</td>
                    <td>单价</td>
                    <td>金额</td>
                    <td>领取人</td>
                    <td>备注</td>
                </tr>
            </thead>
            <tbody style="text-align:center;" v-show="this.$route.meta.title == '原料入库明细'">
                <tr v-for="item in list">
                    <td>{{ item.time }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.typeName }}</td>
                    <td>{{ item.num }}</td>
                    <td>{{ item.unit }}</td>
                    <td>{{ item.price }}</td>
                    <td>{{ item.money }}</td>
                    <td>{{ item.username }}</td>
                    <td>{{ item.remark }}</td>
                </tr>
            </tbody>
            <tbody style="text-align:center;" v-show="this.$route.meta.title == '五金入库明细'">
                <tr v-for="item in list">
                    <td>{{ item.time }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.typeName }}</td>
                    <td>{{ item.num }}</td>
                    <td>{{ item.unit }}</td>
                    <td>{{ item.price }}</td>
                    <td>{{ item.money }}</td>
                    <td>{{ item.username }}</td>
                    <td>{{ item.remark }}</td>
                </tr>
            </tbody>
            <tbody style="text-align:center;" v-show="this.$route.meta.title == '原料出库明细'">
                <tr v-for="item in list">
                    <td>{{ item.time }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.typeName }}</td>
                    <td>{{ item.num }}</td>
                    <td>{{ item.unit }}</td>
                    <td>{{ item.price }}</td>
                    <td>{{ item.money }}</td>
                    <td>{{ item.username }}</td>
                    <td>{{ item.remark }}</td>
                </tr>
            </tbody>
            <tbody style="text-align:center;" v-show="this.$route.meta.title == '五金出库明细'">
                <tr v-for="item in list">
                    <td>{{ item.time }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.typeName }}</td>
                    <td>{{ item.num }}</td>
                    <td>{{ item.unit }}</td>
                    <td>{{ item.price }}</td>
                    <td>{{ item.money }}</td>
                    <td>{{ item.username }}</td>
                    <td>{{ item.remark }}</td>
                </tr>
            </tbody>
        </table>
    </div>
        <div style="padding:100px 0 0 50px">
            <input type="button" value=" 打 印 " @click="print" style="width:80px;height:30px;margin-right:20px">
            <input type="button" value=" 取消 " style="width:80px;height:30px;margin-right:20px" @click="goback">

        </div>
    </div>
</template>

<script>
export default {
    props: {
        list: Array
    },
    data() {
        return {
            date: new Date(+new Date() + 8 * 3600 * 1000)
                .toJSON()
                .substr(0, 19)
                .replace("T", " "),
           
        }
    },
    mounted() {

    },
    methods: {
        // 打印
        print() {
            window.print()
        },
        // 取消打印
        goback() {
            this.$emit("flag",false)
        }
    }
}
</script>

<style scoped>
#print {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    /* background: rgba(0, 0, 0, 0.6); */
    background: #fff;
    z-index: 100;
    display: flex;
}

.head_top {
    width: 400px;
    height: 140px;
    border: none;
}

.head_top .title_logo {
    padding-top: 30px;
    padding-left: 10px;
    height: 50px;
    width: 200px;
    float: left;
}

.head_top .title p:first-child {
    font-size: 28px;
    line-height: 50px;
    width: 340px;
    text-align: left;
    padding-left: 30px;
    padding-top: 30px;
}

.head_top .title .title_msg {
    font-size: 20px;
    margin-bottom: 20px;
}

.top_msg span {
    display: inline-block;
    width: 80px;
    height: 30px;
    font-size: 14px;
}

.top_msg span:nth-child(2),
.top_msg span:nth-child(4) {
    text-align: left;
}

.top_msg span:nth-child(4) {
    width: 200px;
}

.table_box {
    border: none;
}

.table_box td {
    height: 40px;
    font-size: 20px;
    border: 1px solid #000;
}

.foot_msg {
    height: 30px;
    text-align: left;
    padding: 10px 0 0 20px;
}

.foot_msg:last-child {
    padding-bottom: 10px;
}

@media print {
    input {
        display: none;
    }

    table {
        font-size: 14px;
    }

    @page {
        margin: 0cm 0cm 0.3cm 1cm;
    }

    tbody tr td {
        height: 25px;
        font-size: 14px;
    }

    body {
        margin: 0cm;
    }
}</style>