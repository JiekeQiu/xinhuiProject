<template>
    <view-page @queryParam="btn" :obj="queryParam"></view-page>
</template>
<script>
import '@/assets/css/commo.css'
import viewPage from '../components/viewPage.vue';
import { getAxios } from '@/assets/js/base';
export default {
    components:{
        viewPage
    },
    data() {
        return {
            queryParam:{
                username:"",
                operation:"",
                time:new Date(+new Date() + 8 * 3600 * 1000).toJSON().substr(0, 10),
                name:"",
                typeName:"",
                unit:"",
                price:null,
                num:null,
                money:null,
                brand:"",
                address:"",
                remark:""
            }
        }
    },
   methods:{
    btn(val){
            val.type = 1
            /**
             * 先在库存中保存，如果保存存成功则记录到历史记录表中
             * 传参type：1表示单款材料入库
             */
            getAxios("materialaddgood",val).then(res=>{
                if(res.state==200){
                    val.type = 2
                    getAxios('materialaddgood',val).then(res=>{
                        if (res.state == 200) {
                            this.queryParam = {
                                username: val.username,
                                operation: val.operation,
                                time: new Date(+new Date() + 8 * 3600 * 1000).toJSON().substr(0, 10),
                                name: "",
                                typeName: "",
                                unit: "",
                                price: null,
                                num: null,
                                money: null,
                                brand: "",
                                address: "",
                                remark: ""
                            }
                            this.$message({
                                type: "success",
                                message: res.msg,
                                duration: 2000
                            });
                        }
                        
                    })
                }else{
                    this.$message({
                        type: "error",
                        message: res.msg,
                        duration: 2000
                    });
                }
            })
        }
   }
}
</script>
