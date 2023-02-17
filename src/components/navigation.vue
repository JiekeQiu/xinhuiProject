<template>
  <div>
    <el-row class="mb-4">
      <el-button type="primary" round size="large" v-for="(list,idx) in list" :key="idx" @click="goto(idx)">{{list.name}}</el-button>
    </el-row>
    
  </div>
</template>
<script>
import {login} from "@/assets/js/base";
export default {
  data() {
    return {
      list: [
        {
          name: "入库单"
        },
        {
          name: "出库单"
        },{
            name:"库存"
        },{
            name:"基础信息"
        }
      ]
    };
  },
  methods: {
    goto(idx) {
      //判断有没有登陆
      login().then(res=>{
        if(res){
          if(idx==0){
            let routerData = this.$router.resolve({
              path:'/home/received',
            })
            window.open(routerData.href, '_blank');
              // this.$router.push('/home/received')
          }else if(idx ==2){
            // this.$router.push('/home/inventory')
             let routerData = this.$router.resolve({
              path:'/home/inventory',
            })
            window.open(routerData.href, '_blank');
          }else if(idx==1){
             let routerData = this.$router.resolve({
              path:'/home/output/cklist',
            })
            window.open(routerData.href, '_blank');
          }else if(idx==3){
            let routerData = this.$router.resolve({
              path:'/home/messagelist',
            })
            window.open(routerData.href, '_blank');
          }
        }else{
          this.$router.push("/login");
        }
      })
    }
  }
};
</script>