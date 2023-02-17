<template>
  <div id="box">
    <div class="box-msg" v-show="show">
      请勿重复提交
      <h5>
        <el-button @click="unhide">确定</el-button>
      </h5>
    </div>
    <div class="box-msg" v-show="shows">
      请写1000的倍数
      <h5>
        <el-button @click="unhide">确定</el-button>
      </h5>
    </div>
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="120px"
      class="demo-ruleForm"
      :rules="rules"
    >
      <el-form-item label="产品型号" prop="name">
        <el-input v-model="ruleForm.name" @blur="inputBlur"></el-input>
      </el-form-item>
      <el-form-item label="产品规格" prop="typename">
        <el-input v-model="ruleForm.typename" @blur="inputBlur"></el-input>
      </el-form-item>
      <el-form-item label="产品数量（副）" prop="num">
        <el-input v-model="ruleForm.num" @blur="numBlur"></el-input>
      </el-form-item>
      <el-form-item label="左手数量（只）" prop="numL">
        <el-input v-model="ruleForm.numL" @blur="numBlur"></el-input>
      </el-form-item>
      <el-form-item label="右手数量（只）" prop="numR">
        <el-input v-model="ruleForm.numR" @blur="numBlur"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="kind">
        <el-input v-model="ruleForm.kind"></el-input>
      </el-form-item>
      <el-form-item label="产品位置" prop="address">
        <el-input v-model="ruleForm.address"></el-input>
      </el-form-item>
      <el-form-item label="操作时间" prop="time">
        <el-input v-model="ruleForm.time"></el-input>
      </el-form-item>
      <el-form-item label="操作人员" prop="operating">
        <el-input v-model="ruleForm.operating"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" style="margin:0 auto" @click="add()">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getAxios, historyList } from "../assets/js/base.js";
export default {
  data() {
    return {
      show: false,
      shows: false,
      ruleForm: {
        name: "",
        kind: "",
        typename: "",
        num: "",
        numR: "",
        numL: "",
        address: "",
        operating: "",
        time: ""
      },
      rules: {
        name: [{ required: true, message: "请输入产品型号", trigger: "blur" }],
        typename: [{ required: true, message: "请输入规格", trigger: "blur" }]
      }
    };
  },
  mounted() {
    // console.log(this.ruleForm.name);
  },
  methods: {
    unhide() {
      this.ruleForm.num = "";
      this.ruleForm.numL = "";
      this.ruleForm.numR = "";
      this.show = false;
      this.shows = false;
    },
    // 失去焦点显示位置时间操作人员信息
    inputBlur() {
      this.$refs.ruleForm.validate(valid => {
        let _name = this.ruleForm.name;
        let _typename = this.ruleForm.typename;
        let d = new Date();
        let y = d.getFullYear();
        let m = d.getMonth() + 1;
        let r = d.getDate();
        let h = d.getHours();
        let f = d.getMinutes();
        let _user = JSON.parse(localStorage.getItem("user"));
        let _time = y + "-" + m + "-" + r + "-" + h + ":" + f;
        if (valid) {
          let params = {
            name: _name,
            typename: _typename
          };
          let url = "/goodsname";
          let data = getAxios(url, params).then(res => {
            if (res.status == 200) {
              // 把值付给input好在页面渲染
              this.ruleForm.address = res.address;
              //把对象装换成字符串，后面好学入sessionStorage
              let datas = JSON.stringify(res);
              this.ruleForm.time = _time;
              this.ruleForm.operating = _user.username;
              //  写入sessionStorage
              sessionStorage.setItem("goodslist", datas);
            } else {
              this.ruleForm.time = _time;
              this.ruleForm.operating = _user.username;
              this.ruleForm.address = "";
            }
          });
        } else {
          console.log(888);
          // this.show = true
        }
      });
    },
    // 失去焦点判断输入的数是否是1000的倍数
    numBlur() {
      let _num = this.ruleForm.num;
      let _numL = this.ruleForm.numL;
      let _numR = this.ruleForm.numR;
      if (_num % 1000 == 0 && _numL % 1000 == 0 && _numR % 1000 == 0) {
        console.log("满足条件");
      } else {
        console.log("不满足条件");
        this.shows = true;
      }
    },
    // 入库
    add() {
      this.$refs.ruleForm.validate(valid => {
        let _name = this.ruleForm.name;
        let _typename = this.ruleForm.typename;
        let _num = this.ruleForm.num;
        let _numR = this.ruleForm.numR;
        let _numL = this.ruleForm.numL;
        let _address = this.ruleForm.address;
        let _operating = this.ruleForm.operating;
        let _kind = this.ruleForm.kind;
        let _time = this.ruleForm.time;
        let _all = _name + _typename;

        let _goodslist = sessionStorage.getItem("goodslist");
        //判断_goodslist是否存在，存在着转为json对象，不存在就为空对象
        if (_goodslist) {
          _goodslist = JSON.parse(_goodslist);
        } else {
          _goodslist = {};
        }
        let params = {
          name: _name,
          typename: _typename,
          address: _address,
          kind: _kind,
          num: _num,
          numR: _numR,
          numL: _numL,
          time: _time,
          operating: _operating
        };
        /**
         * 业务逻辑
         *    1、判断_name、_typename、_address有没有值
         *      1.1、有值则进行下列操作
         *          1.1.1、查找_goodslist是否存在
         *          1.1.2、存在则数量进行加
         *              1.1.2.1、判断左右手哪个更多，多的就减去少的，是最终的值，少的就直接与符数相加
         *          1.1.3、不存在则提示是否需要添加新类目
         *     1.2、没有值这提示信息
         *  2、把输入框的值全部拿到存入historyList数据集合里面
         *  2.1、拿到操作成功的状态码再把数据插入到historyList，
         * */

        if (_name != "" && _typename != "" && _address != 0) {
          // 点击的时候判断_goodslist是否存在，存在则拿到数量进行加减再存入数据库，否则直接存入数据库
          if (_goodslist.name == _name && _goodslist.typename == _typename) {
            let numAll = _goodslist.num * 1 + _num * 1;
            let numAL = _goodslist.numL * 1 + _numL * 1;
            let numAR = _goodslist.numR * 1 + _numR * 1;
            // 判断numAL和numAR哪个大，大的减去小的就是副数多出部分就是只
            if (numAL >= numAR) {
              numAll = numAll + numAR;
              numAL = numAL - numAR;
              numAR = 0;
              //发起axios请求，进行数据更新

              this.$http
                .get("/goodsnum", {
                  params: {
                    name: _goodslist.name,
                    typename: _goodslist.typename,
                    num: numAll,
                    numL: numAL,
                    numR: numAR,
                    operating: _operating,
                    time: _time
                  }
                })
                .then(res => {
                  console.log("左手 大于等于 右手：" + res.data.status);
                  //如果状态为200，说明入库成功了，则把表单数据插入到historyList表里
                  let status = res.data.status;
                  if (status == 200) {
                    console.log(_name);
                    historyList(params).then();
                  }
                  // this.$router.push({path:"/home/received",query:{id}})
                  this.ruleForm.num = "";
                  this.ruleForm.numR = "";
                  this.ruleForm.numL = "";
                  this.ruleForm.address = "";
                  this.ruleForm.time = "";
                });
              // console.log("看看numAll："+numAll,"看看numAL："+numAL)
            } else {
              numAll = numAll + numAL;
              numAR = numAR - numAL;
              numAL = 0;
              this.$http
                .get("/goodsnum", {
                  params: {
                    name: _goodslist.name,
                    typename: _goodslist.typename,
                    num: numAll,
                    numL: numAL,
                    numR: numAR,
                    operating: _operating,
                    time: _time
                  }
                })
                .then(res => {
                  console.log("右手 大于等于 左手：" + res);
                  let status = res.data.status;
                  if (status == 200) {
                    console.log(_name);
                    historyList(params).then();
                  }
                  this.$router.push("/home/received");
                  this.ruleForm.num = "";
                  this.ruleForm.numR = "";
                  this.ruleForm.numL = "";
                  this.ruleForm.address = "";
                  this.ruleForm.time = "";
                });
            }
          } else {
            this.$http
              .get("/addgoods", {
                params: {
                  name: _name,
                  kind: _kind,
                  typename: _typename,
                  num: _num,
                  numR: _numR,
                  numL: _numL,
                  address: _address,
                  operating: _operating,
                  time: _time,
                  all: _all
                }
              })
              .then(res => {
                console.log(res);
                let atatus = res.data.atatus;

                if (atatus == 200) {
                  historyList(params).then();
                }
                this.ruleForm.num = "";
                this.ruleForm.numR = "";
                this.ruleForm.numL = "";
                this.ruleForm.address = "";
                this.ruleForm.time = "";
              });
          }
        } else {
          console.log(222);
          this.show = true;
        }
      });
    }
    // 入库结束
  }
};
</script>
<style scoped>
#box {
  width: 450px;
  margin: 20px auto;
  position: relative;
}
.box-msg {
  width: 300px;
  height: 150px;
  font-size: 20px;
  color: red;
  position: absolute;
  top: 14%;
  left: 28%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100000;
  line-height: 100px;
}
.box-msg h5 {
  color: #000;
}
</style>
