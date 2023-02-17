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
            <span ref="span3">保存</span>
          </div>
        </el-col>
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
          <div class="grid-content bg-purple" @click="del">
            <i class="xz icon4"></i>
            <span>删除</span>
          </div>
        </el-col>
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
          <div class="grid-content bg-purple" @click="print">
            <i class="xz icon5" ref="icon5"></i>
            <span ref="span5">打印</span>
          </div>
        </el-col>
        <el-col :xs="10" :sm="6" :md="4" :lg="3" :xl="1" @click.stop.Prevent="zhuanhuan">
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
  // 路由有更新时加载
  // beforeRouteUpdate(to, from) {
  //   console.log("to", to);
  //   console.log("from", from);
  // },

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
      formLabelAlign: {},
      str: ""
    };
  },

  mounted() {
    this.$refs.add.style.color = "#1296db";
    // 如果在新增就不高亮显示
    if (this.$route.path == "/home/output/ckaddlist") {
      this.$refs.add.style.color = "";
      this.$refs.icon1.style.backgroundSize = "100%";
      this.$refs.icon1.style.backgroundImage =
        "url(" + require("../assets/images/icon/xinzeng_1.png") + ")";
    }
    this.flag = false;
  },
  updated() {},

  watch: {},

  methods: {
    // 新增按钮
    add() {
      if (this.$route.path == "/home/output/cklist" && !this.flag) {
        this.$router.push("/home/output/ckaddlist");
        this.$refs.add.style.color = "";
        this.$refs.icon1.style.backgroundSize = "100%";
        this.$refs.icon1.style.backgroundImage =
          "url(" + require("../assets/images/icon/xinzeng_1.png") + ")";
        // 保存图标高亮显示
        this.$refs.span3.style.color = "#1296db";
        this.$refs.icon3.style.backgroundSize = "100%";
        this.$refs.icon3.style.backgroundImage =
          "url(" + require("../assets/images/icon/baocun_1.png") + ")";
        //   // 打印图标高亮显示
        // this.$refs.span5.style.color = "#1296db";
        // this.$refs.icon5.style.backgroundSize = "100%";
        // this.$refs.icon5.style.backgroundImage =
        //   "url(" + require("../assets/images/icon/dayin_1.png") + ")";
        this.flag = true;
        sessionStorage.setItem("flag", this.flag);

        setTimeout(() => {
          this.flag = false;
        }, 2000);
      } else {
        console.log("其他页面");
      }
    },
    // 页面转换
    zhuanhuan() {
      let flag = sessionStorage.getItem("flag");
      sessionStorage.removeItem("str");
      if (flag) {
        this.$router.push("/home/output/cklist");
        //  新增图标高亮显示
        this.$refs.add.style.color = "#1296db";
        this.$refs.icon1.style.backgroundSize = "100%";
        this.$refs.icon1.style.backgroundImage =
          "url(" + require("../assets/images/icon/xinzeng.png") + ")";
        // 取消保存图标高亮显示
        this.$refs.span3.style.color = "";
        this.$refs.icon3.style.backgroundSize = "100%";
        this.$refs.icon3.style.backgroundImage =
          "url(" + require("../assets/images/icon/baocun.png") + ")";
      } else {
        return;
      }
      flag = false;
      sessionStorage.setItem("flag", flag);
    },
    //保存
    save() {
      let data = JSON.parse(localStorage.getItem("productRuleForm"));
      let arr = data[data.length - 1];
      let utilize = arr.remark.indexOf("用");
      let scrap = arr.remark.indexOf("废");
      let left = arr.remark.indexOf("左");
      let right = arr.remark.indexOf("右");
      if (arr.unit == "只") {
        if (arr.num < 0) {
          if (left != -1 || right != -1) {
            if (utilize != -1 || scrap != -1) {
              this.judge();
            } else {
              this.message(
                "error",
                "请在备注栏注明该产品是可利用还是废品",
                5000
              );
            }
          } else {
            this.message("error", "请在备注栏说明哪手出库", 5000);
          }
        } else {
          if (left != -1 || right != -1) {
            this.judge();
          } else {
            console.log(999);
            this.message("error", "请在备注栏说明哪手出库", 5000);
          }
        }
      } else if (arr.unit == "副") {
        if (arr.num < 0) {
          if (utilize != -1 || scrap != -1) {
            this.judge();
          } else {
            this.message("error", "请备注该产品可利用还是废品", 5000);
          }
        } else {
          this.judge();
        }
      }

      // // 判断是新增的保存还是修改的保存
    },
    // 封装保存或修改的相关逻辑
    judge() {
      if (this.$route.path == "/home/output/ckaddlist") {
        let str = sessionStorage.getItem("str");

        let flag = sessionStorage.getItem("flag");

        if (flag == "false" && str) {
          console.log("修改保存");
          // 当参数为2时表示为修改的保存
          this.saveData(2);
        } else {
          if (!this.flag) {
            let formLabelAlign = localStorage.getItem("formLabelAlign");
            let data = JSON.parse(formLabelAlign).name;
            let productRuleForm = localStorage.getItem("productRuleForm");
            let datas = JSON.parse(productRuleForm)[0].All;
            console.log(datas);
            if (data && datas) {
              // 拿到详细数据
              this.saveData();
            } else {
              this.$alert("请输入客户信息和发货明细", "错误提示", {
                confirmButtonText: "确定"
              });
            }
          } else {
            return;
          }
          this.flag = true;
          setTimeout(() => {
            this.flag = false;
          }, 5000);
        }
      } else {
        this.$alert("没有需要保存的内容", "错误提示", {
          confirmButtonText: "确定"
        });
      }
    },
    // 修改
    change() {
      let str = sessionStorage.getItem("str");
      if (str) {
        //跳转页面
        this.$router.push("/home/output/ckaddlist");
        // 取消新增高亮
        this.$refs.add.style.color = "";
        this.$refs.icon1.style.backgroundSize = "100%";
        this.$refs.icon1.style.backgroundImage =
          "url(" + require("../assets/images/icon/xinzeng_1.png") + ")";
        // 保存高亮
        this.$refs.span3.style.color = "#1296db";
        this.$refs.icon3.style.backgroundSize = "100%";
        this.$refs.icon3.style.backgroundImage =
          "url(" + require("../assets/images/icon/baocun_1.png") + ")";
      } else {
        this.$alert("请选中需要修改的内容", "错误提示", {
          confirmButtonText: "确定"
        });
      }
      // console.log(str)
    },
    // 删除
    del() {
      let str = sessionStorage.getItem("str");
      if ((this.$route.path = "/home/output/cklist" && str)) {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let data = sessionStorage.getItem("str");
            let No = JSON.parse(data)[0].No;
            let dataStr = JSON.parse(data)[0].tableData;
            let tableD = JSON.parse(dataStr);
            console.log("看看要删除的数据", dataStr);
            getAxios("/delList", { No: No }).then(res => {
              console.log(res);
              if (res.status == "200") {
                console.log("看余下", dataStr);
                /**
                 * 这里有做好，还未测试
                 */
                getAxios("/delgoods", { oldParams: dataStr }).then(res => {
                  console.log("看看返回", res);
                  if (res.state == "200") {
                    console.log("看看删除后的结果",res)
                      location.reload()
                  } else if (res.state == "203") {
                    // 数据库更新出错
                    this.$message({
                      type: "error",
                      message: "删除失败"
                    });
                  }
                });
              } else if (res.status == "404") {
                console.log(res.msg);
                this.$message({
                  type: "error",
                  message: res.msg,
                  duration: 3000
                });
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      } else {
        this.$alert("请选中需要删除的内容", "错误提示", {
          confirmButtonText: "确定"
        });
      }
    },
    // 打印
    print() {
      let str = sessionStorage.getItem("str");

      if (str) {
        this.$router.push("/home/output/print");
      } else {
        this.$alert("请选中需要打印的内容", "错误提示", {
          confirmButtonText: "确定"
        });
      }
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
    },
    //封装保存
    saveData(state) {
      // 判断是新增的保存还是修改的保存
      let formLabelAlign = localStorage.getItem("formLabelAlign");
      let productRuleForm = localStorage.getItem("productRuleForm");
      let str = localStorage.getItem("str");
      let obj = JSON.parse(formLabelAlign);
      let data = JSON.parse(productRuleForm);
      let dataStr = JSON.parse(str);

      let date = new Date(+new Date() + 8 * 3600 * 1000).toJSON().substr(0, 10);
      getAxios("/ckfind", { date: date }).then(res => {
        let No = "";
        if (state == "2") {
          // console.log("这里是修改的单号");
          No = obj.No;
        } else {
          console.log("这里是保存的单号", res.res.length);
          let reg = new RegExp("-", "g");
          date = date.replace(reg, "");
          console.log("看看总长度是什么", res.res.length);
          let len;
          let num;
          if (res.res.length == "0") {
            // len = res.res[res.res.length].No.slice(8);
            // num = len - res.res.length + 1 * 1;
            len = 0;
            num = 0;
          } else {
            len = res.res[res.res.length - 1].No.slice(8);
            num = len - res.res.length + 1 * 1;
          }
          // let len = res.res[res.res.length - 1].No.slice(8);

          // let num = len - res.res.length + 1 * 1;
          if (res.res.length < 9) {
            if (len - res.res.length != 0) {
              No = date + "0" + (res.res.length + 1 + len - res.res.length * 1);
            } else {
              No = date + "0" + (res.res.length + 1 * 1);
            }
          } else {
            if (len - res.res.length != 0) {
              No = date + (res.res.length + num * 1);
            } else {
              No = date + (res.res.length + 1 * 1);
            }
            // No = date + (res.res.length + 1 * 1);
          }
        }
        //声明一个容器用来存发货明细
        let dataArr = "";
        // 声明总金额
        let AllMoney = 0;
        let All = 0;
        // 判断发货明细最后一行是否为空，空的话就把空的内容删掉在保存到数据库
        if (data.slice(-1)[0].name == "") {
          // 拿到删除空行后的数组
          let res = data.slice(0, -1);
          // 计算客户订单总价
          res.forEach(item => {
            All += item.All * 1;
            AllMoney = All.toFixed(2);
            // AllMoney += item.All * 1;
          });
          dataArr = JSON.stringify(res);
        } else {
          data.forEach(item => {
            All += item.All * 1;
            AllMoney = All.toFixed(2);
            // AllMoney += item.All * 1;
          });

          dataArr = JSON.stringify(data);
        }
        // 传给后No
        let param = {
          No: No,
          name: obj.name,
          bianhao: obj.bianhao,
          address: obj.address,
          lister: obj.lister,
          phone: obj.phone,
          date: obj.date,
          status: obj.status,
          contact: obj.Contact,
          AllMoney: AllMoney,
          states: state,
          tableData: dataArr
        };
        if (state != 2) {
          // console.log("这是NO", dataList);
          // this.$alert("是否需要保存？","温馨提示：",{
          //   confirmButtonText: "确定",
          //   callback: action =>{

          //     let data = localStorage.getItem("productRuleForm")
          //     getAxios('/lose',{params:data}).then(res=>{
          //     /**
          //     * 如果result的结果为false则可以出库，否则不能出库
          //     * state状态码（返回给前端的）
          //     * 200：出库成功
          //     * 203：数据更新出错
          //     * 404：没有找到该产品或产品还没入库
          //     */
          //       if(res.state=="200"){
          //         // 出库成功
          //         getAxios('/save',param).then(res=>{
          //           if(res.state=="200"){
          //             // 这里是保存
          //             this.message("success","出库成功",4000)
          //             this.$router.push("/home/output/cklist")
          //           }else if(res.state=="404"){
          //             this.message("error","出库失败",4000)
          //           }
          //         })
          //       }else if(res.state=="203"){
          //         // 数据更新出错
          //         res.res.forEach(item=>{
          //           let msg = item.name+item.typename+item.msg
          //           console.log("看看",msg)
          //           this.message('warning',msg,8000)
          //         })
          //       }else if(res.state=="404"){
          //         //没有找到该产品或产品还没入库
          //         res.res.forEach(item=>{
          //           let msg = item.name+item.typename+item.msg
          //           console.log("看看",msg)
          //           this.message('warning',msg,8000)
          //         })
          //           window.open("#/home/received")
          //         // this.$router.push("/home/received")
          //       }
          //     })
          //   }

          // });
          this.$confirm("是否需要保存？", "温馨提示：", {
            confirmButtonText: "确定",
            cancelButtonText: "取消"
            // type:'info'
          })
            .then(() => {
              let data = localStorage.getItem("productRuleForm");
              getAxios("/lose", { params: data }).then(res => {
                /**
                 * 如果result的结果为false则可以出库，否则不能出库
                 * state状态码（返回给前端的）
                 * 200：出库成功
                 * 203：数据更新出错
                 * 404：没有找到该产品或产品还没入库
                 */
                if (res.state == "200") {
                  // 出库成功
                  getAxios("/save", param).then(res => {
                    if (res.state == "200") {
                      // 这里是保存
                      this.message("success", "出库成功", 4000);
                      this.$router.push("/home/output/cklist");
                    } else if (res.state == "404") {
                      this.message("error", "出库失败", 4000);
                    }
                  });
                } else if (res.state == "203") {
                  // 数据更新出错
                  res.res.forEach(item => {
                    let msg = item.name + item.typename + item.msg;
                    console.log("看看", msg);
                    this.message("warning", msg, 8000);
                  });
                } else if (res.state == "404") {
                  //没有找到该产品或产品还没入库
                  res.res.forEach(item => {
                    let msg = item.name + item.typename + item.msg;
                    console.log("看看", msg);
                    this.message("warning", msg, 8000);
                  });
                  window.open("#/home/received");
                  // this.$router.push("/home/received")
                }
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消保存"
              });
            });
        } else {
          // 这里是修改的逻辑
          let str = sessionStorage.getItem("str");
          let arr = JSON.parse(str);
          let objStr = {}; //用来装备份的客户数据
          arr.forEach(item => {
            objStr.No = item.No;
            objStr.address = item.address;
            objStr.bianhao = item.bianhao;
            objStr.contact = item.contact;
            objStr.date = item.date;
            objStr.lister = item.lister;
            objStr.name = item.name;
            objStr.phone = item.phone;
            objStr.status = item.status;
            // objStr.tableData = item.tableData
          });
          // 表示提交修改的客户数据
          let objStr1 = {
            No: obj.No,
            address: obj.address,
            bianhao: obj.bianhao,
            contact: obj.name,
            date: obj.date,
            lister: obj.lister,
            name: obj.name,
            phone: obj.phone,
            status: obj.status
            // tableData:productRuleForm
          };

          // 对比客户信息是否有修改
          function info_msg(objStr, objStr1) {
            let keys = Object.keys(objStr);
            let keys1 = Object.keys(objStr1);
            if (keys.length !== keys1.length) return false;
            for (let i = 0; i <= keys.length - 1; i++) {
              let key = keys[i];
              if (!keys1.includes(key)) return false;
              if (objStr1[key] !== objStr[key]) return false;
            }
            return true;
          }
          let info = info_msg(objStr, objStr1);
          // 对比发货明细有没有修改

          let dataStr = JSON.parse(str)[0].tableData;
          let info_data = JSON.parse(dataStr); // 备份的发货明细，data为修改的发货明细
          // 判断info_data和data两个数组是否一致
          let listData = [];
          let res_data = true;
          if (info_data.length === data.length) {
            info_data.filter((t, i) => {
              listData.push(info_msg(t, data[i]));
            });
            listData.filter(item => {
              if (item == false) {
                res_data = false;
                return res_data;
              }
            });
          } else {
            res_data =
              info_data.length === data.length &&
              info_data.filter(t => !data.includes(t));
          }

          if (!res_data) {
            // 只要发货明细有修改，历史记录数据、仓库数据都要更新
            let newData = JSON.parse(productRuleForm);
            let oldData = JSON.parse(dataStr);
            // 对比修改前、修改后的数据
            let oldArr = oldData.filter(
              x =>
                !newData.some((y, idx, arr) => {
                  return (
                    y.typeNmae === x.typeNmae &&
                    y.name === x.name &&
                    y.money === x.money &&
                    y.unit === x.unit &&
                    y.num === x.num &&
                    y.remark === x.remark &&
                    y.All === x.All
                  );
                })
            );

            let newArr = newData.filter(
              x =>
                !oldData.some((y, idx, arr) => {
                  return (
                    y.typeNmae === x.typeNmae &&
                    y.name === x.name &&
                    y.money === x.money &&
                    y.unit === x.unit &&
                    y.num === x.num &&
                    y.remark === x.remark &&
                    y.All === x.All
                  );
                })
            );
            let oldStr = JSON.stringify(oldArr);
            let newStr = JSON.stringify(newArr);

            getAxios("/delgoods", { oldParams: oldStr }).then(res => {
              console.log("看看返回", res);
              if (res.state == "200") {
                // 删除后再出库
                getAxios("/lose", { params: newStr }).then(res => {
                  if (res.state == "200") {
                    // 出库成功
                    getAxios("/save", param).then(res => {
                      if (res.state == "202") {
                        // 这里是保存
                        this.message("success", "出库成功", 4000);
                        this.$router.push("/home/output/cklist");
                      } else if (res.state == "404") {
                        this.message("error", "出库失败", 4000);
                      }
                    });
                  } else if (res.state == "203") {
                    // 数据更新出错
                    res.res.forEach(item => {
                      let msg = item.name + item.typename + item.msg;
                      console.log("看看", msg);
                      this.message("warning", msg, 8000);
                    });
                  } else if (res.state == "404") {
                    //没有找到该产品或产品还没入库
                    res.res.forEach(item => {
                      let msg = item.name + item.typename + item.msg;
                      console.log("看看", msg);
                      this.message("warning", msg, 8000);
                    });
                    window.open("#/home/received");
                    // this.$router.push("/home/received")
                  }
                });
              } else if (res.state == "203") {
                // 数据库更新出错
                this.$message({
                  type: "error",
                  message: res.msg
                });
              }
            });
          } else if (!info) {
            // 只是用户信息更改，只更改历史记录数据
            console.log("客户信息有修改",obj);
            getAxios("/updatemsg",obj).then(res=>{
              console.log("返回数据",res)
              if(res.state=="200"){
                this.message("success",res.msg,3000)
                this.$router.push("/home/output/cklist")
              }else if(res.state=="204"){
                this.message("success",res.msg,3000);
              }
            })

          } else {
            this.$message({
              type: "error",
              message: "没有修改内容"
            });
          }
          // console.log("这里是修改",info)
          /**
           * 思路：
           * 1、先删除以前的数据
           * 2、重新添加数据
           *
           */

          // getAxios('/delgoods',{oldparam:dataStr,newParam:productRuleForm}).then(res=>{
          //   console.log('删除后返回的数据',res)
          // })
        }
      });
    },
    // 封装消息提示
    message(type, msg, time) {
      this.$message({
        type: type,
        message: msg,
        duration: time
      });
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
.xz {
    position: absolute;
    top: -25px;
    /* left: 20px; */
    margin:auto;
  }
 .zhuanhuan {
    left: 38px;
  }
  .el-row {
    min-width: 4.1%;
    /* max-width: 50.5%; */
  }

</style>
