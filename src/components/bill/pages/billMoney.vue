<template>
    <div>
        <el-table border style="width：100%" :data="list">
            <el-table-column label="日期" prop="date" width="120px"></el-table-column>
            <el-table-column label="客户名称" prop="name" width="120px"></el-table-column>
            <el-table-column label="总数量" prop="num" width="120px"></el-table-column>
            <el-table-column label="总金额" prop="money"></el-table-column>
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
                    console.log("这个的顺序",res.res)
                    let arr = []
                    res.res.forEach(ele=>{
                        arr.unshift(ele)
                    })
                    this.list = arr
                    let obj = {}
                    let money = 0
                    let num = 0
                    res.res.forEach(item=>{
                        money += item.money*1
                        num += item.num*1
                        
                    })
                    let a = money.toFixed(2)
                    let b = num.toFixed(0)
                    this.list.push({
                        date:"总计",
                        num:b,
                        money:a
                    })
                    let billmoney = JSON.stringify(this.list)
                    localStorage.setItem("billmoney", billmoney)
                    console.log("拿到是吗",res.res)

                     // 把内容转换成我想要的
                     let arrList = []
                    this.list.forEach(item=>{
                        let obj = {
                            "送货日期":item.date,
                            "客户名称":item.name,
                            "总数量":item.num,
                            "金额":item.money
                        }
                        arrList.push(obj)
                        
                    })
                    this.$store.commit("increment3",arrList)
                    this.$store.commit("increment1",this.list)




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