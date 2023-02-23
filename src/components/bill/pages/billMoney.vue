<template>
    <div>
        <el-table border style="width：100%" :data="list">
            <el-table-column label="客户名称" prop="name" width="120px"></el-table-column>
            <el-table-column label="日期" prop="date" width="120px"></el-table-column>
            <el-table-column label="总数量" prop="num" width="120px"></el-table-column>
            <el-table-column label="总金额" prop="money" width="120px"></el-table-column>
        </el-table>
        <div v-show="this.$store.state.flag">
            <info-search @search="search"></info-search>
        </div>
    </div>
</template>
<script>
import infoSearch from "../common/search.vue"
import { getAxios } from "../../../assets/js/base.js";
export default {
    components: {
        infoSearch
    },
    data() {
        return {
            list: []
        }
    },
    methods: {
        search(val) {
            getAxios("/billmoney", val).then(res => {
                console.log("看看res", res)
                if (res.state === 200) {
                    this.list = res.res
                    let obj = {}
                    let money = 0
                    let num = 0
                    res.res.forEach(item=>{
                        money += item.money*1
                        num += item.num*1
                        
                    })
                    let a = money.toFixed(2)
                    let b = money.toFixed(0)
                    res.res.push({
                        name:"总计",
                        num:b,
                        money:a
                    })
                    let billmoney = JSON.stringify(res.res)
                    localStorage.setItem("billmoney", billmoney)
                    this.$store.commit("increment1", this.list)




                } else if (res.state === 404) {
                    this.$message({
                        type: "warning",
                        message: res.msg,
                    })
                }
            })
        }
    },
    created() {
        console.log("看看有咩有", this.$store.state.list_msg)
        let billMoney = localStorage.getItem('billmoney')

        if (billMoney) {
            this.list = JSON.parse(billMoney);
            if (this.list.length > 0) {
                this.$store.state.flag = false
            }
        }
    },
}
</script>