<template>
    <div>
        <el-table border :data="list_msg" style="width:100%">
            <el-table-column label="送货单号" prop="No" width="120px"></el-table-column>
            <el-table-column label="客户名称" prop="name" width="120px"></el-table-column>
            <el-table-column label="送货日期" prop="time" width="120px"></el-table-column>
            <el-table-column label="订单号" prop="No" width="120px"></el-table-column>
            <el-table-column label="金额" prop="AllMoney" width="200px"></el-table-column>
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
     components:{
        infoSearch
    },
    data(){
        return {
            list_msg:[]
        }
    },
    methods:{
        search(val){
            getAxios("/findmoney",val).then(res=>{
                console.log("测试",res.arr)
                if(res.state===200){
                     let num = 0
                    res.arr.forEach(item=>{
                        let number = Number(item.AllMoney)
                        num+=number
                    })
                  let a = num.toFixed(2)
                    res.arr.push({
                        date:"总订单数："+res.arr.length,
                        AllMoney:"总金额："+a,
                    })
                    this.list_msg = res.arr

                    let list_msg = JSON.stringify(res.arr)
                    // let msg = JSON.stringify(val)
                    localStorage.setItem("list_msg",list_msg)
                    // localStorage.setItem("msg",msg)
                    this.$store.commit("increment1",this.list_msg)
                }else if(res.state===404){
                     this.$message({
                        type:"warning",
                        message:res.msg,
                    })
                }
            })
        }
    },
     created(){
        // 如果有查询内容刷新这不会跳出搜索弹窗
        let list = localStorage.getItem("list_msg")
        console.log("加速度",this.$store.state.list_msg)
        if(list){
            this.list_msg = JSON.parse(list)
            if(this.list_msg.length>0){
                this.$store.state.flag = false
            }

        }
    }
}
</script>
<style scoped>

</style>