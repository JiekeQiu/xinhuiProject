<template>
    <div id="box">
        <el-table :data="list">
            <el-table-column prop="No" label="序号"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="brand" label="品牌"></el-table-column>
            <el-table-column prop="typeName" label="型号"></el-table-column>
            <el-table-column prop="kind" label="仓库归类"></el-table-column>
            <el-table-column prop="unit" label="单位"></el-table-column>
            <el-table-column prop="num" label="数量"></el-table-column>
            <el-table-column prop="price" label="单价"></el-table-column>
            <el-table-column prop="totalPrice" label="总金额"></el-table-column>
            <el-table-column prop="address" label="仓位"></el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
        </el-table>
    </div>
</template>
<script>
import '../../../assets/css/commo.css'
export default {
    data(){
        return{
            list:[]
        }
    },
    mounted(){
        console.log("看看")
        let obj = {}
        for(let i=0;i<9;i++){
            obj.No = '';
            obj.name = '';
            obj.brand='';
            obj.typeName='';
            obj.kind=''
            obj.unit='';
            obj.num=null;
            obj.price =null;
            obj.totalPrice =null;
            obj.address='';
            obj.remark = ''
            this.list.push(obj)
        }
    }
}
</script>
<style>



</style>