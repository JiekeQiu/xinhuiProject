<template>
  <div>
    <div>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="客户名称">
          <el-input v-model.trim="formInline.user" placeholder="客户名称" autofocus></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="search" :disabled="disabled">查询</el-button>
          <el-button type="primary" @click="add">添加</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div>
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column label="客户编号" width="100px" prop="No">
          <template #default="scope">
            <span v-if="scope.row.editeFlag">
              <el-input v-model="scope.row.No"></el-input>
            </span>
            <span v-if="!scope.row.editeFlag">{{scope.row.No}}</span>
          </template>
        </el-table-column>
        <el-table-column label="客户名称" width="130px" prop="name">
          <template #default="scope">
            <span v-if="scope.row.editeFlag">
              <el-input v-model="scope.row.name"></el-input>
            </span>
            <span v-if="!scope.row.editeFlag">{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="客户地址" width="500px" prop="address">
          <template #default="scope">
            <span v-if="scope.row.editeFlag">
              <el-input v-model="scope.row.address"></el-input>
            </span>
            <span v-if="!scope.row.editeFlag">{{scope.row.address}}</span>
          </template>
        </el-table-column>
        <el-table-column label="联系人" width="130px" prop="Contact">
          <template #default="scope">
            <span v-if="scope.row.editeFlag">
              <el-input v-model="scope.row.Contact"></el-input>
            </span>
            <span v-if="!scope.row.editeFlag">{{scope.row.Contact}}</span>
          </template>
        </el-table-column>
        <el-table-column label="电话号码" width="140px" prop="phone">
          <template #default="scope">
            <span v-if="scope.row.editeFlag">
              <el-input v-model="scope.row.phone"></el-input>
            </span>
            <span v-if="!scope.row.editeFlag">{{scope.row.phone}}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)">修改</el-button>
            <el-button size="small" @click="handleSubmit(scope.row)">保存</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div id="content" v-show="msg.invoke">
      <client-msg :data="msg"></client-msg>
    </div>
  </div>
</template>
<script>
import { getAxios } from "../assets/js/base.js";
import clientMsg from "./clientMsg.vue";
export default {
  data() {
    return {
      formInline: {
        user: ""
      },
      tableData: [],
      msg: {
        No: "",
        name: "",
        address: "",
        Contact: "",
        phone: "",
        invoke: false
      }
    };
  },
  components: {
    clientMsg
  },
  computed:{
    disabled(){
      return this.formInline.user==""
    }
  },
  mounted() {
    let p = {
      khMessage: 1
    };
    getAxios("goods", p).then(res => {
      this.tableData = res;
      this.tableData.forEach((item, idx) => {
        //动态加editeFlag，用来做可编辑操作
        this.tableData[idx].editeFlag = false;
      });
    });
  },
  methods: {
    search() {
      let params = {
        name:this.formInline.user,
        k:1
      }
      getAxios("/searchMsg",params).then(res=>{
        if(res.state==200){
         console.log(res.res.name)
         console.log(this.tableData)
         this.tableData=[]
         this.tableData.push(res.res)
          
        }else if(res.state==404){
          this.$message({
            type:"warning",
            message:res.msg,
            duration:3000
          })
        }
      })
    },
    // 添加用户信息
    add() {
      this.msg.invoke = true
    },
    // 修改信息
    handleEdit(row) {
      // 转为编辑转态
      row.editeFlag = !row.editeFlag
    },
    // 保存修改
    handleSubmit(row) {
     let params = {
        No: row.No, 
        name: row.name,
        address: row.address,
        Contact: row.Contact,
        phone: row.phone,
        invoke: row.invoke,
        _id:row._id,
        k:2
      }
      console.log("传参",params)
      getAxios("/searchMsg",params).then(res=>{
        console.log(res)
        if(res.state==200){
          this.$message({
            type:"success",
            message:res.msg,
            duration:3000
          })
          // 转为编辑转态
          row.editeFlag = !row.editeFlag
        }else if(res.state==404){
          this.$message({
            type:"error",
            message:res.msg,
            duration:3000
          })
        }
      })
    },
    handleDelete(idx, row) {
     console.log(idx)
     let params = {
       No:row.No
     }
     getAxios("/delMsg",params).then(res=>{
       console.log(res.state)
       if(res.state==200){
         this.$message({
           type:"success",
           message:res.msg,
           duration:3000
         })
         this.tableData.splice(idx,1)
         console.log(this.tableData)
       }else if(res.state==404){
         this.$message({
           type:"success",
           message:res.msg,
           duration:3000
         })
       }
     })
    }
  }
};
</script>
<style scoped>
#content {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
}


</style>
