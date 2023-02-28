<template>
  <div>
    <el-sub-menu :index="idx">
      <template #title>{{title}}</template>
      <el-sub-menu :index="''+idx+'-'+1">
        <template #title>{{data[0][0].name}}</template>
        <el-menu-item :index="idx+'-'+1+'-'+1" route="goto">{{data[0][1].name}}</el-menu-item>
        <el-menu-item :index="idx+'-'+1+'-'+2">{{data[0][2].name}}</el-menu-item>
        <el-menu-item :index="idx+'-'+1+'-'+3" v-if="title=='成品仓库'">{{data[0][3].name}}</el-menu-item>
        <el-menu-item :index="idx+'-'+1+'-'+3" v-if="title=='原料仓库'">{{data[0][3].name}}</el-menu-item>
        <el-menu-item :index="idx+'-'+1+'-'+3" v-if="title=='五金仓库'">{{data[0][3].name}}</el-menu-item>
        <el-menu-item :index="idx+'-'+1+'-'+3" v-if="title=='账单'">{{data[0][3].name}}</el-menu-item>
      </el-sub-menu>
      <el-sub-menu :index="idx+'-'+2">
        <template #title>{{data[1][0].name}}</template>
        <el-menu-item :index="idx+'-'+2+'-'+1">{{data[1][1].name}}</el-menu-item>
        <el-menu-item :index="idx+'-'+2+'-'+2">{{data[1][2].name}}</el-menu-item>
        <el-menu-item :index="idx+'-'+2+'-'+3" v-if="title=='账单'">{{data[1][3].name}}</el-menu-item>
        <el-menu-item :index="idx+'-'+2+'-'+4" v-if="title=='账单'">{{data[1][4].name}}</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
     <el-sub-menu :index="idx+'-'+3"  v-if="title=='成品仓库'">
       <template #title>{{data[2][0].name}}</template>
       <el-menu-item :index="idx+'-'+3+'-'+1">{{data[2][1].name}}</el-menu-item>
     </el-sub-menu>
  </div>
</template>
<script>
export default {
  props: {
    data: Array,
    title: {
      type: String,
      default: "成品仓库"
    }
  },
  data() {
    return {
      idx: "1"
    };
  },
  created() {
    if (this.title == "原料仓库") {
      this.idx = "2";
    } else if (this.title == "五金仓库") {
      this.idx = "3";
    }else if(this.title=="账单"){
      this.idx = "4"
    }else if(this.title=="客户订单"){
      this.idx = "5"
    }
  }
};
</script>
<style scoped>
</style>
