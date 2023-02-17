<template>
  <div>
    <div class="box">
      <el-row :gutter="8">
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1" @click="add">
          <div class="grid-content bg-purple" ref="add">
            <i class="icon1 xz" ref="icon1"></i>
            <span class="add" ref="add">新增</span>
          </div>
        </el-col>
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1" @click="change">
          <div class="grid-content bg-purple">
            <i class="xz icon2" ref="icon2"></i>
            <span ref="span2">修改</span>
          </div>
        </el-col>
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
          <div class="grid-content bg-purple" @click="save" ref="save">
            <i class="xz icon3" ref="icon3"></i>
            <span>保存</span>
          </div>
        </el-col>
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
          <div class="grid-content bg-purple">
            <i class="xz icon4"></i>
            <span>删除</span>
          </div>
        </el-col>
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
          <div class="grid-content bg-purple">
            <i class="xz icon5"></i>
            <span>打印</span>
          </div>
        </el-col>
        <el-col :xs="10" :sm="6" :md="4" :lg="3" :xl="1" @click="zhuanhuan">
          <div class="grid-content bg-purple">
            <i class="xz zhuanhuan icon6"></i>
            <span class="lass_span">页面转换</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>  
<script>
import { getAxios } from "../assets/js/base.js";

export default {
  data() {
    return {
      bgcolor: "",
      flag: false,
      show: true,
      result: false,
      value: "",
      search: {
        status: "",
        timeStart: "",
        timeEnd: "",
        name: ""
      },
      options: [
        {
          value: "已打印",
          label: "已打印"
        },
        {
          value: "未打印",
          label: "未打印"
        }
      ],
      value1: [],
      tableData: [],
      productRuleForm: {},
      goodList: [],
      labelPosition: "right",
      formLabelAlign: {}
    };
  },

  mounted() {
    this.$refs.add.style.color = "#1296db";
    let formLabelAlign = localStorage.getItem("formLabelAlign");
    this.formLabelAlign = JSON.parse(formLabelAlign);
    let productRuleForm = localStorage.getItem("productRuleForm");
    this.productRuleForm = JSON.parse(productRuleForm);
    console.log('看看点的是哪个',this.formLabelAlign.flag)
    // if (this.formLabelAlign.flag) {
    //   this.$refs.add.style.color = "#1296db";
    //   this.$refs.icon1.style.backgroundSize = "100%";
    //   this.$refs.icon1.style.backgroundImage =
    //     "url(" + require("../assets/images/icon/xinzeng.png") + ")";
    // } else {
    //   this.$refs.add.style.color = "";
    //   this.$refs.icon1.style.backgroundImage =
    //     "url(" + require("../assets/images/icon/xinzeng_1.png") + ")";
    // }
  },
  updated() {
    if (this.$route.path == "/home/output/ckaddlist") {
      console.log("zz");
      this.$refs.save.style.color = "#1296db";
      this.$refs.icon3.style.backgroundSize = "100%";
      this.$refs.icon3.style.backgroundImage =
        "url(" + require("../assets/images/icon/baocun_1.png") + ")";
    } else {
      console.log("bbbb");
      this.$refs.save.style.color = "";
      this.$refs.icon3.style.backgroundSize = "100%";
      this.$refs.icon3.style.backgroundImage =
        "url(" + require("../assets/images/icon/baocun.png") + ")";
    }
  },

  watch: {
    formLabelAlign: {
      handler(newValue, oldValue) {
        console.log("改变后output", newValue);

        let formLabelAlign = JSON.stringify(newValue);
        localStorage.setItem("formLabelAlign", formLabelAlign);
        // console.log('改变前',formLabelAlign)
      },
      deep: true
    }
  },
  methods: {
    // 新增按钮
    add() {
      // 节流函数（重复点击无效点击一次）]
      if (!this.formLabelAlign.flag) {
        this.$router.push({ path: "/home/output/ckaddlist" });
        this.$refs.add.style.color = "";
        this.$refs.icon1.style.backgroundSize = "100%";
        this.$refs.icon1.style.backgroundImage =
          "url(" + require("../assets/images/icon/xinzeng_1.png") + ")";
      } else {
        return;
      }
      this.formLabelAlign.flag = !this.formLabelAlign.flag;
      setTimeout(() => {
        this.formLabelAlign.flag = !this.formLabelAlign.flag;
      }, 50000);
    },
    // 页面转换
    zhuanhuan() {
      //这里后面要做一个监听
      if (this.formLabelAlign.flag) {
        console.log(999);
        this.$router.push({ path: "/home/output/cklist" });
        this.$refs.add.style.color = "#1296db";
        this.$refs.icon1.style.backgroundImage =
          "url(" + require("../assets/images/icon/xinzeng.png") + ")";
      } else {
        return;
      }
      this.formLabelAlign.flag = !this.formLabelAlign.flag;
      setTimeout(() => {
        this.formLabelAlign.flag = !this.formLabelAlign.flag;
      }, 5000);
    },
    //保存
    save() {
      // 判断是添加保存还是修改保存
      let str = sessionStorage.getItem("str");
      if (str) {
        console.log("修改");
        console.log("修改一下客户信息", this.formLabelAlign);
        console.log("修改一下发货信息", this.productRuleForm.tableData);
      } else {
      }
      // 只能点击一次
      setTimeout(() => {
        let formLabelAlign = localStorage.getItem("formLabelAlign");
        this.formLabelAlign = JSON.parse(formLabelAlign);
        this.formLabelAlign.flag = !this.formLabelAlign.flag;
        let productRuleForm = localStorage.getItem("productRuleForm");
        this.productRuleForm = JSON.parse(productRuleForm);
        let AllMoney = 0;
        this.productRuleForm.tableData.forEach(item => {
          console.log("桥", item.All);
          AllMoney += item.All * 1;
        });
        console.log(AllMoney);
        // 把时间戳当做送货单号
        this.formLabelAlign.No = Date.now();
        if (this.formLabelAlign.name) {
          let paromt = {
            No: this.formLabelAlign.No,
            name: this.formLabelAlign.name,
            status: this.formLabelAlign.status,
            date: this.formLabelAlign.date,
            address: this.formLabelAlign.address,
            phone: this.formLabelAlign.phone,
            lister: this.formLabelAlign.lister,
            AllMoney: AllMoney,
            tableData: productRuleForm
          };
          // console.log(paromt);
          // 保存数据
          getAxios("/save", paromt).then(res => {
            console.log(res.status);
            if (res.status == 200) {
              sessionStorage.removeItem("str");
              // console.log(this.formLabelAlign.flag)
              location.reload();
            }
          });
        } else {
          console.log(888);
        }
      }, 20);
    },
    // 修改
    change() {
      // 拿到选中的值
      let str = sessionStorage.getItem("str");
      console.log(this.formLabelAlign.flag);
      if (!this.formLabelAlign.flag) {
        //判断有没有选中
        if (str) {
          this.$router.push("/home/output/ckaddlist");
          this.$refs.add.style.color = "";
          this.$refs.icon1.style.backgroundSize = "100%";
          this.$refs.icon1.style.backgroundImage =
            "url(" + require("../assets/images/icon/xinzeng_1.png") + ")";
        } else {
          alert("请选择一项信息");
        }
        this.formLabelAlign.flag = !this.formLabelAlign.flag;
        setTimeout(() => {
          this.formLabelAlign.flag = !this.formLabelAlign.flag;
        }, 50);
      }
      // if (!this.formLabelAlign.flag) {
      //   this.$router.push("/home/output/ckaddlist");
      //   console.log(999);
      // } else {
      //   console.log(888);
      // }
      // 清除session
      // sessionStorage.removeItem("str")
    },
    // 键盘按键跳转到一下个input里(代替tab键的功能)
    inputDown(e) {
      let noNum = e.slice(2);
      let no = e.slice(0, 2);
      let No = no + noNum;
      if (e) {
        e = no + ++noNum;
        this.$refs[e].focus();
      }
    },
    //ele的单击事件（row代表拿到具体点击所对应的数据）
    singleShot(row, column, cell, event) {
      // row参数为点击某条时返回对应的数据
      console.log("row:", row);
      console.log("column:", column);
      console.log("cell:", cell);
      console.log("event:", event);
    }
  }
};
</script>
<style scoped>
.box {
  width: 100%;
  padding-top: 10px;
  background-color: #f7f4f4;
  height: 60px;
}
.bg-purple {
  position: relative;
  margin-top: 20px;
}

.icon1,
.icon2,
.icon3,
.icon4,
.icon5,
.icon6 {
  display: inline-block;
  width: 20px;
  height: 20px;
  background-size: 100%;
}
.icon1 {
  background-image: url("../assets/images/icon/xinzeng.png");
}
.icon2 {
  background-image: url("../assets/images/icon/xiugai_1.png");
}
.icon3 {
  background-image: url("../assets/images/icon/baocun.png");
}
.icon4 {
  background-image: url("../assets/images/icon/shanchu.png");
}
.icon5 {
  background-image: url("../assets/images/icon/dayin.png");
}
.icon6 {
  background-image: url("../assets/images/icon/zhuanhuan.png");
  /* width: 18px; */
  height: 17px;
}
.lass_span {
  display: block;
  width: 100px;
  color: #1296db;
}

.goodsList {
  padding-top: 50px;
  position: relative;
}

.addList .el-form-small {
  margin-bottom: 2px;
}
.addList .el-form-item {
  margin-bottom: 5px;
}
@media all and (min-width: 1000px) and (max-width: 1800px) {
  .xz {
    position: absolute;
    top: -20px;
    left: 23px;
  }

  .zhuanhuan {
    left: 38px;
  }
  .el-row {
    width: 600px;
  }
}
@media all and (min-width: 1800px) {
  .xz {
    position: absolute;
    top: -20px;
    left: 20px;
  }

  .zhuanhuan {
    left: 40px;
  }
  .el-row {
    width: 1600px;
  }
}
</style>
