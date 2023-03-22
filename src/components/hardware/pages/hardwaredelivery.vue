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
                        unit: "",
                        price: null,
                        money: null,
                        address: "",
                        remark: ""
                    }
                ]
            }
        }
    },
    methods: {
        btn(val) {
            val.type = 2
            this.$confirm(
                "是否要出库?",
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            ).then(() => {
                let arr = []
                val.tableData.forEach(item => {
                    if (item.address == '') {
                        arr.push(item)
                    }
                })
                console.log("前端查看",val,arr)
                if (arr.length > 0) {
                    // 说明该材料是新料
                    arr.forEach(item => {
                        let msg = '仓库没有' + item.name + item.typeName + '请核对后在出库！'
                        this.message(msg, "warning")
                    })
                } else {
                    let obj = JSON.stringify(val.tableData)
                    let params = {
                        type: val.type,
                        tableData: obj,
                        username: val.username,
                        time: val.time,
                        operation: val.operation
                    }
                    getAxios("deliverylist", params).then(res => {
                        if (res.state == 200) {
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
                                };
                                this.message(res.msg, 'success')
                            }
                        }else{
                            this.message(res.msg,'error')
                        }
                    })

                }

            }).catch(() => {

            })

        },
        // 封装消息提醒
        message(msg, type) {
            this.$message({
                message: msg,
                type: type,
                duration: 4000
            })

        },
    }
}
</script>