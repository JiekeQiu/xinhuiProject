<template>
    <view-page @queryParam="btn" :data="productRuleForm"></view-page>
</template>
<script>
import '@/assets/css/commo.css'
import viewPage from '../components/viewPage.vue';
import { getAxios } from '@/assets/js/base';
export default {
    components: {
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
                        unit: "公斤",
                        price: null,
                        money: null,
                        address: "",
                        remark: ""
                    }
                ]
            },
        }
    },
    methods: {
        btn(val) {
            val.type = 1
            let obj = JSON.stringify(val.tableData)
            let params = {
                type: val.type,
                tableData: obj,
                username: val.username,
                time: val.time,
                operation:val.operation
            }
            /**
             * 先在库存中保存，如果保存存成功则记录到历史记录表中
             * 传参type：1表示单款材料入库
             */
            getAxios("materialaddgood", params).then(res => {
                console.log("返回什么", res)
                if (res.state == 200) {
                    this.productRuleForm = {
                        username: '',
                        time: new Date(+new Date() + 8 * 3600 * 1000).toJSON().substr(0, 10),
                        tableData: [
                            {
                                name: "",
                                typeName: "",
                                num: null,
                                unit: "公斤",
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
