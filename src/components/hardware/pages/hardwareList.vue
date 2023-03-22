<template>
    <view-page :data="productRuleForm" @queryParam="btn"></view-page>
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
            productRuleForm: {
                username: '',
                time: new Date(+new Date() + 8 * 3600 * 1000).toJSON().substr(0, 10),
                tableData: [
                    {
                        name: "",
                        typeName: "",
                        num: null,
                        unit: "",
                        price: null,
                        money: null,
                        address: "",
                        remark: ""
                    }
                ]
            },
        }
    },
    mounted() {


    },
    methods:{
        btn(val){
            val.type = 2
            let obj = JSON.stringify(val.tableData)
            let params = {
                type: val.type,
                tableData: obj,
                username: val.username,
                time: val.time,
                operation:val.operation
            }
            getAxios("materialaddgood", params).then(res => {
                if (res.state == 200) {
                    this.productRuleForm = {
                        username: '',
                        time: new Date(+new Date() + 8 * 3600 * 1000).toJSON().substr(0, 10),
                        tableData: [
                            {
                                name: "",
                                typeName: "",
                                num: null,
                                unit: "",
                                price: null,
                                money: null,
                                address: "",
                                remark: ""
                            }
                        ]
                    },
                        this.$message({
                            type: "success",
                            message: res.msg,
                            duration: 2000
                        });

                } else {
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
