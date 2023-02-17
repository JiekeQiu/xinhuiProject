<template>
  <div class="common-layout">
    <el-container>
      <el-header style="height:60px">
        <h4 class="l logo" style="font-size:24px;line-height:35px">新辉眼镜有限公司</h4>

        <div class="r">
          <span @click="goto">首页</span>&nbsp;
          <span v-if="username==''">{{'请登陆'}}</span>
          <span v-else>{{username+"&nbsp;"+"欢迎你"}}</span>&nbsp;
          <span @click="back">退出</span>&nbsp;
          <span>设置</span>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Menu/>
        </el-aside>
        <el-main :style="{height:scrollerHeight}">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import base from "../assets/css/base.css";
import header from "../assets/css/header.css";
import Menu from "../components/nav.vue";
import { login } from "@/assets/js/base";
// import message from "../components/message.vue";
// import search from "../components/search.vue";
import home from "../assets/js/home.js";
export default {
  data() {
    return {
      username: "",
      Selection: true,
      scrollerHeight:0
    };
  },
  components: {
    Menu
  },

  created() {
    login().then(res => {
      if (res) {
        this.username = res.username;
      }
    });
  },
 mounted() {
  //  window.onresize=function(){
  //    console.log(window.innerHeight)
  //  }
  this.scrollerHeight = window.innerHeight-101+'px'
    window.onresize=function(){
      this.scrollerHeight = window.innerHeight-101+'px'

   }

 },
  computed: {
    // 滚动区高度
    
},
  methods: {
    back() {
      console.log(888);
      localStorage.removeItem("user");
      this.$router.push("/login");
    },
    goto() {
      this.$router.push("/home/navigation");
    }
  }
};
</script>
<style scoped>
.box {
  height: 0px;
}
.common-layout .el-header,
.common-layout .el-footer {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 60px;
}
.common-layout .el-footer {
  line-height: 60px;
}

.common-layout .el-aside {
  /* background-color: #d3dce6; */
  color: var(--el-text-color-primary);
  text-align: center;
  /* line-height: 200px; */
}

.common-layout .el-main {
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
  text-align: center;
  /* line-height: 160px; */
}

.common-layout > .el-container {
  margin-bottom: 40px;
}

.common-layout .el-container:nth-child(5) .el-aside,
.common-layout .el-container:nth-child(6) .el-aside {
  line-height: 2600px;
}

.common-layout .el-container:nth-child(7) .el-aside {
  line-height: 3200px;
}
</style>