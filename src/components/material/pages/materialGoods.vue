<template>
    <div id="content-container" direction="vartical">
        <div class="interval">
            <h2 class="container-row font_title">新辉眼镜有限公司</h2>
            <h3 class="font_subheading">
                {{ $route.meta.title }}
            </h3>
        </div>
        <el-container class="container-row">
            <div class="input-tip">材料名称：</div>
            <div class="input-field">
                <el-input autofocus></el-input>
            </div>
            <div class="input-tip">材料型号：</div>
            <div class="input-field">
                <el-input></el-input>
            </div>
            <div class="input-tip"></div>
            <div class="input-field">
                <el-button type="primary" style="font-size: 16px; color: #000;">搜&emsp;索</el-button>
            </div>
        </el-container>
        <el-table border :data="goods">
            <el-table-column label="材料名称" prop="name"></el-table-column>
            <el-table-column label="材料型号" prop="typeName"></el-table-column>
            <el-table-column label="数量" prop="num"></el-table-column>
            <el-table-column label="单位" prop="unit"></el-table-column>
            <el-table-column label="仓位" prop="address"></el-table-column>
            <el-table-column label="补货提示" prop=""></el-table-column>
        </el-table>
    </div>
</template>
<script>
import '@/assets/css/commo.css'
import { getAxios } from '@/assets/js/base';
export default {
    data(){
        return{
            goods:[]
        }
    },
    mounted(){
        getAxios("materialgood",{type:3}).then(res=>{
            console.log(res.res)
            if(res.state==200){
                let arr = []
                res.res.forEach(item=>{
                    arr.unshift(item)
                })
                this.goods = arr
            }
        })
    }
}
</script>