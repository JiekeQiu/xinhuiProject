<template>
    <div>
        <el-table border style="width：100%" :data="list">
            <el-table-column label="客户名称" prop="username" min-width="120px"></el-table-column>
            <el-table-column label="总数量" prop="num" min-width="120px"></el-table-column>
            <el-table-column label="总金额" prop="money" min-width="120px"></el-table-column>
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
            list:[]
        }
    },
    methods:{
        search(val){
            getAxios("/billmoney",val).then(res=>{
                console.log("看看res",res)
                if(res.state===200){
                    
                //   let arr = res.res
                //  var arr1 = [];
                //     var k = true;
                //     for(var i in arr){
                //         k = true;
                //         var tableData = eval('(' + arr[i].tableData + ')');
                        
                //         if(arr1.length>0){
                //             for(var t in arr1){
                //                 if(arr1[t].name == arr[i].name){
                //                     arr1[t].list.push.apply(arr1[t].list,tableData)
                //                     k = false;
                //                 }
                //                 if(k&&arr1.length-1 == t){
                //                     arr1.push({name:arr[i].name,list:tableData});
                //                 }
                //             }
                //         }else{
                //             arr1.push({name:arr[i].name,list:tableData});
                //         }
                //     }
                //     let resArr = []

                //     for(var i in arr1){
                //         var numTxt = 0;
                //         let money = 0
                //         let arrs = []

                //         for(var m in arr1[i].list){
                //             let num = 0
                //             // console.log("看看这是",arr1[i].list[m].All)
                //             arrs.push(arr1[i].list[m].All)


                //             // money = money+arr1[i].list[m].All*1
                //             if(arr1[i].list[m].unit=="只"){
                //                 num =arr1[i].list[m].num/2;
                //                 numTxt= numTxt +num
                //             }else{
                //                 numTxt =numTxt+ arr1[i].list[m].num*1;
                //             }
                            
                            
                //         }
                //         function countSum(arr){
                //             if (!arr.length) return 0;
                //             arr = arr.map((v) => {
                //                 if (v && !Number.isNaN(Number(v))) return Math.round(v * 100);
                //                 return 0;
                //             });
                //             const result =  arr.reduce((prev, curr) => {
                //                 return prev + curr
                //             }, 0);
                //             return result / 100;

                //         }
                //         resArr.push({
                //             username:arr1[i].name,
                //             money:countSum(arrs),
                //             num:numTxt
                //         })
                        this.list = res.res
                        let billmoney = JSON.stringify(res.res)
                        localStorage.setItem("billmoney",billmoney)
                        this.$store.commit("increment1",this.list)
                //     }
                }else if(res.state===404){
                     this.$message({
                        type:"warning",
                        message:res.msg,
                    })
                }
            })
        }
    },
    created() {
        console.log("看看有咩有",this.$store.state.list_msg)
        let billMoney = localStorage.getItem('billmoney')

        if(billMoney){
            this.list = JSON.parse(billMoney);
            if(this.list.length>0){
                this.$store.state.flag = false
            }
        }
    },
}
</script>