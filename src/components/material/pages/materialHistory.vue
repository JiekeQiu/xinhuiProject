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
        <el-input  autofocus></el-input>
      </div>
      <div class="input-tip">材料型号：</div>
      <div class="input-field">
        <el-input ></el-input>
      </div>
      <div class="input-tip"></div>
      <div class="input-field">
        <el-button type="primary" style="font-size: 16px; color: #000;">搜&emsp;索</el-button>
      </div>
    </el-container>
    <el-table border :data="historyList">
      <el-table-column prop="time" label="时间"></el-table-column>
      <el-table-column prop="name" label="材料名称">
        <template #default="scope">
          <span v-if="scope.row.flag">
            <el-input v-model.trim="scope.row.name"></el-input>

          </span>
        </template>
      </el-table-column>
      <el-table-column prop="typeName" label="材料规格">
        <template #default="scope">
          <span v-if="scope.row.flag">
            <el-input v-model.trim="scope.row.typeName"></el-input>

          </span>
        </template>
      </el-table-column>
      <el-table-column prop="num" label="数量">
        <template #default="scope">
          <span v-if="scope.row.flag">
            <el-input v-model.trim="scope.row.num"></el-input>

          </span>
        </template>
      </el-table-column>
      <el-table-column prop="unit" label="单位" width="70"></el-table-column>
      <el-table-column prop="username" label="来源" width="100">
        <template #default="scope">
          <span v-if="scope.row.flag">
            <el-input v-model.trim="scope.row.username"></el-input>

          </span>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="接收人" width="100"></el-table-column>
      <el-table-column prop="remark" label="备注">
        <template #default="scope">
          <span v-if="scope.row.flag">
            <el-input v-model.trim="scope.row.remark"></el-input>

          </span>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="small" @click="save(scope.row)">保存</el-button>
          <el-button size="small" type="danger">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>
<script>
import '@/assets/css/commo.css'
import { getAxios } from '@/assets/js/base'
export default {
  data() {
    return {
      historyList: [],

    }
  },
  created() {
    getAxios("materialgood", { type: 2 }).then(res => {
      if (res.state == 200) {
        let list = []
        res.res.forEach(item=>{
          item.flag=false
          list.unshift(item)
        })
        console.log(list)
        this.historyList = list
      }
    })
  },
  methods:{
    // 打开编辑
    handleEdit(row){
      row.flag = !row.flag
    },
    // 保存更改
    save(row){

    }
  }
}
</script>
<style></style>