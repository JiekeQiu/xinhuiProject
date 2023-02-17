<template>
  <div id="container">
    <div id="tittle">
      <!-- <img src="../assets/images/logo.jpg" class="tittle-img"> -->
      <h1>新辉眼镜有限公司</h1>
      <span class="box-ts" v-show="show">用户名或密码错误</span>
    </div>
    <div class="input">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="70px"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input
            v-model="ruleForm.username"
            ref="inputName"
            @keydown.enter.native.down="inputVal($event)"
            placeholder="请输入用户名"
            autofocus
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            ref="inputPass"
            @keydown.enter.native.down="inputVal($event)"
            @keydown.enter="goto"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            ref="inputGo"
            @click="goto"
            @keydown.enter="goto"
            style="margin:0 auto;width:100%"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { postAxios, login } from "@/assets/js/base";
export default {
  data() {
    return {
      show: false,
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  created() {
    let res = localStorage.getItem("user");
    if (!res) {
      res = {};
    } else {
      res = JSON.parse(res);
    }

    if (res.username) {
      this.$router.push("/home/navigation");
    }
  },

  methods: {
    inputVal(e) {
      this.$refs.inputPass.focus();
    },

    goto() {
      this.$refs.ruleForm.validate(valid => {
        let username = this.ruleForm.username;
        let password = this.ruleForm.password * 1;

        if (valid) {
          // 发起axios请求
          postAxios("/user", {
            username: username,
            password: password
          }).then(res => {
            if (res.status == 200) {
              this.show = false;
              //把res转成字符串，然后将datas写入localStorage
              let datas = JSON.stringify(res);
              localStorage.setItem("user", datas);
              this.$router.push("/home/navigation");
            } else if (res.status == 404) {
              console.log("登陆失败");
              this.show = true;
            }
          });
        }
      });
    }
  }
};
</script>
<style scoped>
body {
  background: rgba(0, 0, 0, 0.3);
  height: 900px;
}
#box {
  width: 400px;
  height: 300px;
  /* margin: auto; */
  border: 4px solid #adb5bd;
  padding: 30px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* background: rgba(0,0,0,.3); */
  border-radius: 12px;
}
.box-tittle {
  height: 75px;
  position: relative;
}
.box-tittle img {
  position: absolute;
  top: 0px;
  left: 4%;
  width: 40px;
  height: 40px;
}
.box-tittle h2 {
  width: 100%;
  height: 40px;
  text-align: center;
  padding-left: 33px;

}
.box-input {
  width: 300px;
}
.box-ts {
  display: inline-block;
  width: 300px;
  height: 30px;
  text-align: center;
  color: red;
}
#container{
  background-color: #595959;
  background-image:url("~@/assets/images/login_bg.jpg");
  height: 100%;
  width:100%;
  position:absolute;
}
#tittle{
  text-align: center;
  margin-top: 200px;
  color: azure
}
#tittle h2{
  display:inline-block;
}
.input{
  margin:20px auto;
  width:500px;
}
.tittle-img{
  width: 60px;
  height:40px
}
.el-form-item{
  color:azure
}
</style>
