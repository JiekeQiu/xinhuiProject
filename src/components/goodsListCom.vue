<template>
  <el-table
    :height="scrollerHeight"
    style="width: 100%;font-size:18px"
    :header-cell-style="alignText"
    border
  >
    <el-table-column prop="name" label="型号" align="center">
      <template #default="scope">
        <span ref="DomName" v-if="scope.row.editeFlag">
          <el-input v-model="scope.row.name"/>
        </span>
        <span
          ref="DomName1"
          v-if="!scope.row.editeFlag"
          style="display:inline-block;100%;height:100%;"
        >{{scope.row.name}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="typename" label="规格" align="center">
      <template #default="scope">
        <span style="display:inline-block;100%;height:100%;" v-if="scope.row.editeFlag">
          <el-input v-model="scope.row.typename"/>
        </span>
        <span v-if="!scope.row.editeFlag">{{scope.row.typename}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="num" label="副" align="center">
      <template #default="scope">
        <span style="display:inline-block;100%;height:100%;" v-if="scope.row.editeFlag">
          <el-input v-model="scope.row.num"/>
        </span>
        <span v-if="!scope.row.editeFlag">{{scope.row.num}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="numL" label="左手（只）" align="center">
      <template #default="scope">
        <span style="display:inline-block;100%;height:100%;" v-if="scope.row.editeFlag">
          <el-input v-model="scope.row.numL"/>
        </span>
        <span v-if="!scope.row.editeFlag">{{scope.row.numL}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="numR" label="右手（只）" align="center">
      <template #default="scope">
        <span style="display:inline-block;100%;height:100%;" v-if="scope.row.editeFlag">
          <el-input v-model="scope.row.numR"/>
        </span>
        <span v-if="!scope.row.editeFlag">{{scope.row.numR}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="address" label="位置" align="center">
      <template #default="scope">
        <span style="display:inline-block;100%;height:100%;" v-if="scope.row.editeFlag">
          <el-input v-model="scope.row.address"/>
        </span>
        <span v-if="!scope.row.editeFlag">{{scope.row.address}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="time" label="时间" align="center">
      <template #default="scope">
        <span style="display:inline-block;100%;height:100%;" v-if="scope.row.editeFlag">
          <el-input v-model="scope.row.time"/>
        </span>
        <span v-if="!scope.row.editeFlag">{{scope.row.time}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="operating" label="操作人员" align="center">
      <template #default="scope">
        <span style="display:inline-block;100%;height:100%;" v-if="scope.row.editeFlag">
          <el-input v-model="scope.row.operating"/>
        </span>
        <span v-if="!scope.row.editeFlag">{{scope.row.operating}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="select" label="修改" width="200px">
      <template #default="scope">
        <el-button
          size="small"
          @click="handleEdit(scope.$index, scope.row)"
          :disabled="scope.row.editeFlag ? true : false"
        >编辑</el-button>
        <el-button size="small" @click="handleSubmit(scope.$index, scope.row)">保存</el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { getAxios } from "../assets/js/base.js";
import xiugai from "../assets/js/goodsListCom.js";
export default {
  prop: {
    data: Array
  },
  data() {
    return {
      alignText: {
        textAlign: "center"
      },
      numList: [{ num: "", numL: "", numR: "", name: "", typename: "" }],
      scrollerHeight: "scrollerHeight"
    };
  },
  mounted() {
    this.scrollerHeight = window.innerHeight - 282 + "px";
    window.onresize = function() {
      this.scrollerHeight = window.innerHeight - 282 + "px";
    };
  },
  methods: {
    handleEdit(idx, row) {
      //拿到登陆账户，判断用户是否有权限,1位最高权限，2位成品仓库权限，三位原料仓库以及五金仓库权限
      let character = JSON.parse(localStorage.getItem("user")).character;
      //只有最高权限才能使用修改
      if (character === 1) {
        // 显示编辑状态 
        row.editeFlag = !row.editeFlag;
        // 拿到库存信息进行删减
        getAxios("/goodsname", { name: row.name, typename: row.typename }).then(
          data => {
            /*
              思路：
                直接库存副数-历史副数，库存左-历史左，库存右-历史右
                因为不可能两手都有数，所以分为2种情况：
                  一、左手有值
                    1、库存值大于等于历史值，则直接相减
                    2、库存值小于历史值，库存副数的值需要扣除相减后得到的值，相减后得到的值则为右手的值
                    3、判断左右手是否都有值，有值则大的减去小的就为副数
                  二、右手有值
                    1、库存值大于等于历史值，则直接相减
                    2、库存值小于历史值，库存副数的值需要扣除相减后得到的值，相减后得到的值则为左手的值
                    3、判断左右手是否都有值，有值则大的减去小的就为副数

              */
            // 拿到历史记录的数据
            let _num = data.num - row.num;
            let _numL = data.numL - row.numL;
            let _numR = data.numR - row.numR;
            let res = this.numList[0];
            res.name = row.name;
            // res.num = row.num;
            // res.numL = row.numL;
            // res.numR = row.numR;
            res.typename = row.typename;
            if (_num <= 0) {
              // 当库存副数等于0时左右手就不存在有负数的情况
              if (_numL == _numR) {
                let num = _num + _numL;
                res.num = num;
              } else {
                let num = 0;
                res.num = num;
              }
              res.numL = _numL;
              res.numR = _numR;
            } else if (_num > 0) {
              if (_numL <= _numR) {
                let num = _num + _numL;
                let numL = _numL - _numL;
                let numR = _numR - _numL;
                res.num = num;
                res.numL = numL;
                res.numR = numR;
                if (numL > numR) {
                  res.num = num + numR;
                  res.numL = numL - numR;
                  res.numR = numR - numR;
                } else if (numL < numR) {
                  res.num = num + numL;
                  res.numL = numL - numL;
                  res.numR = numR - numL;
                }
              } else if (_numL > _numR) {
                let num = _num + _numR;
                let numL = _numL - _numR;
                let numR = _numR - _numR;
                res.num = num;
                res.numL = numL;
                res.numR = numR;
                if (numL > numR) {
                  res.num = num + numR;
                  res.numL = numL - numR;
                  res.numR = numR - numR;
                } else if (numL < numR) {
                  res.num = num + numL;
                  res.numL = numL - numL;
                  res.numR = numR - numL;
                }
              }
            }
          }
        );
      } else {
        this.$alert("你没有权限操作", "温馨提示", {
          confirmButtonText: "确定"
        });
      }
    },
    handleSubmit(idx, row) {
      //拿到登陆账户，判断用户是否有权限,1位最高权限，2位成品仓库权限，三位原料仓库以及五金仓库权限
      let character = JSON.parse(localStorage.getItem("user")).character;

      if (character === 1) {
        let res = this.numList[0];
        if (res.name != row.name || res.typename != row.typename) {
          if (row.editeFlag) {
            /*这里的逻辑还需要考虑
              思路：
                库存：
                  拿到之前的数据，对库存进行加减
                  修改后的产品数量要进行入库操作
                历史记录：
                  要删除修改前的历史记录
                  保存修改后的数据
                
            */
            let p = {
              time: row.time,
              num: row.num,
              numL: row.numL,
              numR: row.numR,
              name: row.name,
              typename: row.typename,
              address: row.address,
              operating: row.operating,
              kind: "",
              all: row.name + row.typename
            };
            getAxios("/findHistory", p).then(res => {
              if (res.status == 404) {
                this.$confirm(
                  row.name + row.typename + "为新产品, 是否入库?",
                  "提示",
                  {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                  }
                )
                  .then(() => {
                    getAxios("/addgoods", p).then(res => {
                      console.log(res.status);
                      if (res.status == 200) {
                        getAxios("/update", p).then(res => {
                          console.log(res);
                          if (res.status == 200) {
                            console.log("hahhdahu哈哈或手机")
                            // 如果是在历史记录修改为新的产品时同时将产品添加到基础信息库里面
                            let param = {
                              name:row.name,
                              typename:row.typename,
                              k:'1'
                            }
                            getAxios('basicsss',p).then(res=>{

                            })
                            // location.reload();
                          }
                        });
                        row.editeFlag = !row.editeFlag;
                      }
                    });
                  })
                  .catch(() => {
                    this.$message({
                      type: "info",
                      message: "已取消删除"
                    });

                    row.editeFlag = !row.editeFlag;
                      location.reload();
                  });
              }else if(res.status=="200"){
                getAxios("/updatehistory", p).then(res=>{
                  if(res.status=="200"){
                    location.reload();

                  }
                })
              }
            });
          }
        } else {
          // 当点击修改后才能点击提交
          if (row.editeFlag) {
            //拿到相对应得值，在数据库中查找对应的数据，对该数据进行修改

            let params = {
              name: row.name,
              typename: row.typename,
              time: row.time,
              num: row.num,
              numL: row.numL,
              numR: row.numR,
              address: row.address,
              id: row.id
            };
            // 修改后更新历史数据库
            getAxios("/update", params).then(res => {
              // console.log(res);
              if (res.status === 200) {
                // 修改成功后才能更改仓库数据

                let res = this.numList[0];
                let _num = res.num + row.num * 1;
                let _numL = res.numL + row.numL * 1;
                let _numR = res.numR + row.numR * 1;
                if (_numL <= _numR) {
                  _num = parseFloat(_num) + parseFloat(_numL);
                  _numR = _numR - _numL;
                  _numL = _numL - _numL;
                  console.log("oo", _numR,_numL);
                } else if (_numL > _numR) {
                  _num = parseFloat(_num) + parseFloat(_numR);
                  _numL = _numL - _numR * 1;
                  _numR = _numR - _numR * 1;
                  console.log("bb", _num);
                }

                let p = {
                  name: row.name,
                  typename: row.typename,
                  num: _num,
                  numL: _numL,
                  numR: _numR,
                  address: row.address
                };

                this.$alert("修改成功", "温馨提示", {
                  confirmButtonText: "确定",
                  callback: action => {
                    getAxios("/update", p).then(res => {
                      console.log(res);
                    });
                    // this.$message({
                    //   type: "info",
                    //   message: `action: ${action}`
                    // });
                  }
                });
                row.editeFlag = !row.editeFlag;
              } else {
                this.$alert("修改失败(内容没有修改)", "温馨提示", {
                  confirmButtonText: "确定"
                });
              }
            });
          } else {
            this.$alert("内容没有修改", "温馨提示", {
              confirmButtonText: "确定"
            });
          }
        }
      } else {
        this.$alert("你没有权限操作", "温馨提示", {
          confirmButtonText: "确定"
        });
      }
    },
    handleDelete(idx, row) {
      let character = JSON.parse(localStorage.getItem("user")).character;
      if (character === 1) {
        console.log(typeof row.name);
        this.$confirm("此操作将永久删除该条记录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            // 拿到点击那条数据
            let params = {
              name: row.name,
              typename: row.typename,
              time: row.time,
              num: row.num,
              numL: row.numL,
              numR: row.numR,
              address: row.address
            };
            console.log('看',params)
            getAxios("/delList", params).then(res => {
              console.log(res.status);
              if (res.status == 200) {
                
                location.reload();
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
        this.$alert("你没有权限操作", "温馨提示", {
          confirmButtonText: "确定"
        });
      }
    }
  }
};
</script>
<style scoped>
</style>
