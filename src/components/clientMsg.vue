<template>
  <div id="content">
    <div class="container-t">
        <el-icon class="icon" @click="close"><CloseBold /></el-icon>
      <el-container class="container">
        <div class="input-tip">客户编号：</div>
        <div class="input-field">
          <el-input v-model.trim="data.No" autofocus  @blur="verify"></el-input>
        </div>
        <div class="input-tip">客户名称：</div>
        <div class="input-field">
          <el-input v-model.trim="data.name"></el-input>
        </div>
        <div class="input-tip">客户地址：</div>
        <div class="input-field">
          <el-input v-model.trim="data.address"></el-input>
        </div>
      </el-container>
      <el-container class="container">
        <div class="input-tip">联系人：</div>
        <div class="input-field">
          <el-input v-model.trim="data.Contact"></el-input>
        </div>
        <div class="input-tip">电话号码：</div>
        <div class="input-field">
          <el-input v-model.trim="data.phone"></el-input>
        </div>
      </el-container>
      <el-container class="container">
        <el-button type="primary" class="btn" @click="add" :disabled="disabled">添加</el-button>
      </el-container>
      <el-container class="container"></el-container>
    </div>
  </div>
</template>
<script>
import { getAxios } from "../assets/js/base.js";

export default {
    props:["data"],
    data(){
        return {
            
        }
    },
    computed:{
        disabled(){
                return (this.data.No==""||this.data.name=="")
        }
    },
    methods:{
        // 关闭添加用户页
        close(){
            this.data.invoke = false
        },
        // 验证用户编号是否存在
        verify(){
          
        },
        // 添加用户信息
        add(){
            console.log(this.data)
            getAxios('/msg',this.data).then(res=>{
                console.log(res.state)
                if(res.state==200){
                    this.$message({
                        type:"success",
                        message:res.msg,
                        duration:3000
                    })
                    let info = localStorage.getItem("info")
                    if(info){
                      localStorage.removeItem("info")
                    }else{
                      return
                    }
                    this.data.invoke = false
                }else if(res.state==203){
                    this.$message({
                        type:"warning",
                        message:res.msg+"，请重新编写一个编号",
                        duration:4000
                    })
                }else if(res.state==404){
                    this.$message({
                        type:"error",
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
  width: 100%;
  height: 100%;
  /* position: absolute; */
}
.container {
  background-color: #fff;
  padding: 40px 20px 0;
}
.container-t {
  width: 1000px;
  margin: 200px auto;
  border-radius: 10px;
  position: relative;
}
.inpu-tip {
  /* margin:0 auto; */
  line-height: 40px;
}
.input-field {
  margin-right: 40px;
}
.btn{
    width:100px;
    margin:0 auto;
}
.icon{
    /* width:50px;
    height:50px; */
    position:absolute;
    top:10px;
    right:10px;
    font-size:20px;
}

</style>
