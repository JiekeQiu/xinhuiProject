<template>
    <view-page @queryParam="btn" :obj="queryParam"></view-page>
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
            queryParam: {
                username: "",
                operation: "",
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
        }
    },
    methods: {
        btn(val) {
            console.log(val)
            val.type = 1
            this.$confirm(
                "是否要出库" + val.name + '-' + val.typeName,
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            ).then(() => {
                getAxios("deliverylist", val).then(res => {
                    if (res.state == 200) {
                        val.type = 2
                        getAxios("deliverylist", val).then(res => {
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
                                })
                            }
                        })

                    }
                })

            }).catch(() => {
                this.queryParam.name = "";
                this.queryParam.typeName = ''
            })

        }
    }
}
</script>