<template>
    <div>
        <el-table border :data="info_list" style="width: 100%">
            <el-table-column label="送货日期" prop="time" width="120px"></el-table-column>
            <el-table-column label="送货单号" prop="No" width="120px"></el-table-column>
            <el-table-column label="客户名称" prop="username" width="100px"></el-table-column>
            <el-table-column label="产品名称" prop="name" width="130px"></el-table-column>
            <el-table-column label="产品规格" prop="typeNmae" width="130px"></el-table-column>
            <el-table-column label="单位" prop="unit" width="60px"></el-table-column>
            <el-table-column label="数量" prop="num" width="100px"></el-table-column>
            <el-table-column label="单价" prop="money" width="100px"></el-table-column>
            <el-table-column label="总金额" prop="All" width="100px"></el-table-column>
            <el-table-column label="备注" prop="remark" width="140px"></el-table-column>
        </el-table>
        <div v-show="this.$store.state.flag">
            <info-search @search="search"></info-search>
        </div>
    </div>
</template>
<script>
import { getAxios } from "../../../assets/js/base.js";
import infoSearch from "../common/search.vue" 
export default {
    components:{
        infoSearch
    },
    data(){
        return {
            info_list:[],
            // flag:this.$store.state.flag
        }
    },
    methods:{
        // show(val){
        //     this.flag = val
        // },
        search(val){
            console.log("看看子组件传什么过来",val)
            let params=val
            getAxios("/findbill",params).then(res=>{
                console.log("返回什么",res)
                if(res.state===200){
                    let num = 0
                    let All = 0
                    res.arr.forEach(item=>{
                        let nums
                        if(item.unit=="只"){
                            nums =Math.ceil(item.num/2)
                        }else{
                            nums = item.num
                        }
                        let number = Number(nums)
                        let numAll = Number(item.All)
                        num+=number
                        All += numAll

                    })
                  let a = All.toFixed(2)
                    res.arr.push({
                        time:"总计",
                        num:num,
                        All:a
                    })
                    this.info_list = res.arr
                    this.$store.commit("isTime",val)
                    let list = JSON.stringify(res.arr)
                    localStorage.setItem("list",list)
                    this.$store.commit("increment1",this.info_list)
                }else if(res.state===404){
                    // 没有查到相应数据
                    this.$message({
                        type:"warning",
                        message:"没有找到该订单",
                    })

                }
            })
        }
    },
    created(){
        // 如果有查询内容刷新这不会跳出搜索弹窗
        let list = localStorage.getItem("list")
        console.log("进来",this.$store.state.list_msg)
        if(list){
            this.info_list = JSON.parse(list)
            if(this.info_list.length>0){
                this.$store.state.flag = false
            }

        }
    }
}
</script>