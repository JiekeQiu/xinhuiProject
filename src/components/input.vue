<template>
  <div>
    <el-form ref="form" label-width="90px" class="box"  id="selectForm">
      <el-form-item label="产品型号">
        <el-select
          v-model.trim="nameValue"
          filterable
          remote
          placeholder="请输入型号"
          :remote-method="remoteMethod"
          :loading="loading"
          allow-create
          clearable
          @change="checked"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="产品规格">
        <el-select
          v-model.trim="typeNameValue"
          filterable
          remote
          placeholder="请输入规格"
          :remote-method="remoteMethod"
          :loading="loading"
          allow-create
          clearable
          @change="checked"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数量(副)" prop="num" style="width:198.8">
        <el-input
          v-model.trim="ruleForm.num"
          placeholder="请输入副数"
          autofocus
          type="text"
          @blur="numBlur(ruleForm.num)"
          @input="checked"
        ></el-input>
      </el-form-item>
      <el-form-item label="左手(只)" prop="numL" style="width:198.8">
        <el-input
          v-model.trim="ruleForm.numL"
          placeholder="请输入左手只数"
          autofocus
          type="text"
          @blur="numBlur(ruleForm.numL)"
          @input="checked"
        ></el-input>
      </el-form-item>
      <el-form-item label="右手(只)" prop="numR" style="width:198.8">
        <el-input
          v-model.trim="ruleForm.numR"
          placeholder="请输入右手只数"
          autofocus
          type="text"
          @blur="numBlur(ruleForm.numR)"
          @input="checked"
        ></el-input>
      </el-form-item>
      <el-form-item label="备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注" prop="kind" style="width:198.8">
        <el-input v-model="ruleForm.kind" placeholder="请输入备注" autofocus></el-input>
      </el-form-item>
      <el-form-item label="产品位置" prop="address" style="width:198.8">
        <el-input v-model="ruleForm.address" placeholder="请输入产品存放位置" autofocus></el-input>
      </el-form-item>
      <el-form-item label="操作时间" prop="time" style="width:198.8">
        <el-input v-model="ruleForm.time" autofocus></el-input>
      </el-form-item>
      <el-form-item label="操作人员" prop="operating">
        <el-input v-model="ruleForm.operating" autofocus></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" style="margin:0 auto" @click="add" @keydown.enter="add">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getAxios, historyList } from "../assets/js/base.js";
export default {
  data() {
    return {
      options: [],
      nameValue: [],
      typeNameValue: [],
      list: [],
      loading: false,
      states: [],
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
      }
    };
  },
  mounted() {
    // 查询goods数据库
    getAxios("/goods").then(res => {
      res.map(itme => {
        var a = itme.name;
        var b = itme.typename;
        return this.states.splice(0, 0, a, b);
      });
      // 过滤重复的数据,这样下拉选项中就不会有太长的数据了
      this.states = this.states.filter((item, idx, arr) => {
        res = arr.indexOf(item) === idx;
        return res;
      });

      this.list = this.states.map(item => {
        return { value: `${item}`, label: `${item}` };
      });
    });
    // 远程查询型号规格结束
  },
  methods: {
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;

        setTimeout(() => {
          this.loading = false;
          this.options = this.list.filter(item => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options = [];
      }
    },
    // 过滤结束
    // 功能开始
    //选中时查询数据库，符合条件则获取时间、位置、操作人员信息，并渲染到input里，否则只渲染时间操作人员信息
    checked() {
      // 1、选中时获取类型和规格的值
      let _name = this.nameValue;
      let _typeNmae = this.typeNameValue;
      // // 获取当前本地时间
      let nowdate = new Date(+new Date() + 8 * 3600 * 1000)
        .toJSON()
        .substr(0, 19)
        .replace("T", " ");
      // 读取localStorage的user数据
      let _user = JSON.parse(localStorage.getItem("user"));
      // 查询数据库有没有同时满足_name和_typeName的数据，
      getAxios("/goodsname", {
        name: _name,
        typename: _typeNmae
      }).then(res => {
        console.log;
        this.ruleForm.operating = _user.username;
        this.ruleForm.time = nowdate;
        //如果status的状态为200就把时间、位置、操作人员渲染到input里
        if (res.status === 200) {
          // 把值付给input好在页面渲染
          this.ruleForm.address = res.address;
          //把对象转换成字符串，后面好写入sessionStorage
          let datas = JSON.stringify(res);
          // 写入sessionStorage
          sessionStorage.setItem("goodslist", datas);
        } else {
          this.ruleForm.address = "";
        }
      });
    },
    // 选中操作结束
    // 封装失去焦点触发
    // 失去焦点时数字输入框的内容必须时1000的倍速，否则跳出弹窗提示输入的数必须是1000的倍数
    numBlur(numValue) {
      //  // 获取当前本地时间
      // let nowdate = new Date(+new Date() + 8 * 3600 * 1000)
      //   .toJSON()
      //   .substr(0, 19)
      //   .replace("T", " ");
      //   this.ruleForm.time = nowdate;
      //判断数字框的值是否为1000的倍数，不是的话就提示XXX不是1000的倍数请输入1000的倍数

     
    },

    // 数字框操作结束

    /*点击时入库操作开始
        思路： 
          * 1、先获取界面输入的所有值
          * 2、判断goodslist存不存在，存在就说明仓库已经收入过，否则就是新产品，需要新添加入库
                ** 存在的操作：
                      1、判断name、typename、address是否存在不存在这禁用按钮
                      2、存在：
                        



    
    */
    add() {
      // this.$confirm("检测到的内容，是否在离开页面前提交入库？", "确认信息", {
      //   distinguishCancelAndClose: true,
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消"
      // })
      //   .then(() => {
      //     // this.$message({
      //     //   type: 'info',
      //     //   message: '保存修改'
      //     // });
      //       console.log("添加")
      //   })
      //   .catch(action => {
      //     if (action === "cancel") {
      //       this.$message({
      //         type: "info",
      //         message: "取消成功"
      //       });
      //     } else {
            console.log(777);
            // 获取input的值
            let _name = this.nameValue;
            let _typeName = this.typeNameValue;
            let _num = this.ruleForm.num;
            let _numR = this.ruleForm.numR;
            let _numL = this.ruleForm.numL;
            let _address = this.ruleForm.address;
            let _operating = this.ruleForm.operating;
            let _kind = this.ruleForm.kind;
            let _time = this.ruleForm.time;
            let _all = _name + _typeName;
            // console.log(_address)
            let params = {
              name: _name,
              typename: _typeName,
              address: _address,
              kind: _kind,
              num: _num,
              numR: _numR,
              numL: _numL,
              time: _time,
              operating: _operating,
              all: _all
            };
            // 拿到goodslist
            let _goodslist = sessionStorage.getItem("goodslist");
            // 判断goodslist否则存在，如果goodslist不存在就会报错
            if (_goodslist) {
              // 存在转为json对象
              _goodslist = JSON.parse(_goodslist);
            } else {
              //不存在就为空对象
              _goodslist = {};
            }
            //判断goodslist、name、typeName、address是否有值
            if (
              _goodslist &&
              _name != "" &&
              _typeName != "" &&
              _address != ""
            ) {
              // 判断_goodslist.name==_name和_goodslist.typeName==_typeName是否为真
              if (
                _goodslist.name == _name &&
                _goodslist.typename == _typeName
              ) {
                // 为真则拿到数量进行加减再存入数据库，否则直接存入数据库
                let numAll = _goodslist.num * 1 + _num * 1;
                let numAL = _goodslist.numL * 1 + _numL * 1;
                let numAR = _goodslist.numR * 1 + _numR * 1;
                // 判断numAL和numAR哪个大，大的减去小的就是副数多出部分就是只
                if (numAL >= numAR) {
                  // 当右手小于左手的时候，右手就是副数，左手多出部分就是只
                  numAll = numAll + numAR;
                  numAL = numAL - numAR;
                  numAR = 0;
                  // 更新数据库的库存信息
                  getAxios("/goodsnum", {
                    name: _goodslist.name,
                    typename: _goodslist.typename,
                    num: numAll,
                    numL: numAL,
                    numR: numAR,
                    operating: _operating,
                    time: _time,
                    address: _address
                  }).then(res => {
                    //如果状态为200，说明入库成功了，则把表单数据插入到historyList表里
                    let status = res.status;
                    if (status == 200) {
                      // console.log(_name);
                      this.$message({
                        type:"success",
                        message:"入库成功",
                        duration:3000
                      })
                      historyList(params).then();
                    }
                    //清空resizeTo
                    this.ruleForm.num = "";
                    this.ruleForm.numR = "";
                    this.ruleForm.numL = "";
                    this.ruleForm.address = "";
                    this.ruleForm.time = "";
                  });
                } else {
                  //这里是numAL < numAR
                  numAll = numAll + numAL;
                  numAR = numAR - numAL;
                  numAL = 0;
                  getAxios("/goodsnum", {
                    name: _goodslist.name,
                    typename: _goodslist.typename,
                    num: numAll,
                    numL: numAL,
                    numR: numAR,
                    operating: _operating,
                    time: _time,
                    address: _address
                  }).then(res => {
                    //如果状态为200，说明入库成功了，则把表单数据插入到historyList表里
                    let status = res.status;
                    if (status == 200) {
                      console.log(_name);
                      this.$message({
                        type:"success",
                        message:"入库成功",
                        duration:3000
                      })
                      historyList(params).then();
                    }
                    //清空
                    this.ruleForm.num = "";
                    this.ruleForm.numR = "";
                    this.ruleForm.numL = "";
                    this.ruleForm.address = "";
                    this.ruleForm.time = "";
                  });
                }
              } else {
                // 这里执行新增产品入库的代码
                getAxios("/addgoods", params).then(res => {
                  console.log(res);
                  let status = res.status;
                  if (status == 200) {
                    console.log("看卡数据不是属虎",name);
                    this.$message({
                        type:"success",
                        message:"入库成功",
                        duration:3000
                      })
                      // 这里把本地的数据删掉，防止账单那里找不到新增的数据
                      let info_name = localStorage.getItem("info_name")
                      let info_typename = localStorage.getItem("info_typename")
                      if(info_name&&info_typename){
                        localStorage.removeItem("info_name")
                        localStorage.removeItem("info_typename")
                      }
                    historyList(params).then();
                    // 如果是新增就往基础信息表里添加型号、规格、下限
                    let p = {
                      name:_name,
                      typename:_typeName,
                      xxnum:0
                    }
                    getAxios("/basicsss",p).then(res=>{
                      console.log('这里是什么',res)
                      // this.$message({
                      //   type:"success",
                      //   message:"入库成功",
                      //   duration:3000
                      // })
                    })
                    
                  }
                  //清空
                  this.ruleForm.num = "";
                  this.ruleForm.numR = "";
                  this.ruleForm.numL = "";
                  this.ruleForm.address = "";
                  this.ruleForm.time = "";
                });
              }
            } else {
              this.$alert("检测到内容为空，请输入入库信息？", "确认信息", {
                confirmButtonText: "确定",
              });
              
            }
          // }
        // });
    }
  }
};
</script>
<style scoped>
.box {
  width: 280px;
  margin: 0 auto;
 
}
#selectForm >>> .el-form-item__label {
  font-size: 18px;
}
</style>
