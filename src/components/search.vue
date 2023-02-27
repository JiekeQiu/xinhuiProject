<template>
  <div class="box">
    <div class="mt-3">
      <el-form ref="form">
        <el-select
          v-model="nameValue"
          filterable
          remote
          placeholder="请输入产品型号"
          :remote-method="remoteMethod"
          :loading="loading"
          allow-create
          clearable
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>&nbsp;-&nbsp;
        <el-select
          v-model="typeNameValue"
          filterable
          remote
          placeholder="请输入产品规格"
          :remote-method="remoteMethod"
          :loading="loading"
          allow-create
          clearable
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button @click="search();dialogTableVisible=true">搜索</el-button>
        <el-dialog title="查询结果" v-model="dialogTableVisible" @close='close'>
          <el-table :data="lister" style="width: 100%;" class="box">
            <el-table-column fixed label="型号" align="center" prop="name"/>
            <el-table-column fixed label="规格" align="center" prop="typename"/>
            <el-table-column fixed label="数量" align="center" prop="num"/>
            <el-table-column fixed label="左手（只）" align="center" prop="numL"/>
            <el-table-column fixed label="右手（只）" align="center" prop="numR"/>
            <el-table-column fixed label="位置" align="center" prop="address"/>
            <el-table-column fixed label="补货提示" align="center">
              <template #default="scope">
                <span class="buhuo" v-show="scope.row.show">需要备货</span>
              </template>
            </el-table-column>
            <el-table-column fixed label="备注" align="center" prop="kind"/>
          </el-table>
          <div id="num">总计：&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;{{num}}付</div>
          <div class="page">
        <el-pagination
          id="page"
          background
          layout="prev, pager, next"
          prev-text='上一页'
          next-text="下一页"
          @current-change="pageChange"
          :total="total"
          :default-page-size='pageSize'
          >
        </el-pagination>
      </div>
        </el-dialog>
        <el-button @click="btn">基础信息维护</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
import { getAxios } from "../assets/js/base.js";
export default {
  data() {
    return {
      dialogTableVisible: false,
      show: false,
      tableData: [],
      tableDataX: [],
      options: [],
      nameValue: [],
      typeNameValue: [],
      list: [],
      loading: false,
      states: [],
      DataAll: [],
      num:0,
       lister:null,//当前显示的数据
      total:0,//总条数
      pageIndex:1,//当前页数
      pageSize:10,//一页展示10条
    };
  },
  mounted() {
    // getAxios("/goods").then(res => {
    //   this.tableData = res;
    //   let len = this.tableData.length;
    //   //把数据插入到tableDataX里面
    //   for (let i = 0; i < len; i++) {
    //     let avv = {};
    //     let editeFlag = this.tableData[i].editeFlag;
    //     editeFlag = false;
    //     avv.id = this.tableData[i]._id;
    //     avv.kind = this.tableData[i].kind;
    //     avv.address = this.tableData[i].address;
    //     avv.name = this.tableData[i].name;
    //     avv.num = this.tableData[i].num;
    //     avv.numL = this.tableData[i].numL;
    //     avv.numR = this.tableData[i].numR;
    //     avv.time = this.tableData[i].time;
    //     avv.operating = this.tableData[i].operating;
    //     avv.typename = this.tableData[i].typename;
    //     avv.editeFlag = editeFlag;
    //     this.tableDataX.unshift(avv);
        
    //   }
    //   res.map(itme => {
    //     var a = itme.name;
    //     var b = itme.typename;
    //     return this.states.splice(0, 0, a, b);
    //   });
    //   // 过滤重复的数据,这样下拉选项中就不会有太长的数据了
    //   this.states = this.states.filter((item, idx, arr) => {
    //     res = arr.indexOf(item) === idx;
    //     return res;
    //   });
      
    //   this.list = this.states.map(item => {
    //     //  console.log(item)
    //     return { value: `${item}`, label: `${item}` };
    //   });
     
    // });
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
    search() {
      // 每次点击都要清空数组
      this.DataAll = [];
      let _name = this.nameValue;
      let _typename = this.typeNameValue;
      let p = {
        name: _name,
        typename: _typename
      };
      getAxios("/kcsearch", p).then(res => {
        if (res.status == 200) {
          console.log('搜索结果',res.res)
          this.total=res.res.length
         this.lister = res.res.slice((this.pageIndex-1)*this.pageSize,this.pageIndex*this.pageSize)
            // 遍历拿到查询的总数
          let zsNum = 0
          res.res.forEach(item=>{
            zsNum += parseInt(item.num*1)
            // console.log("得到的类型",zsNum)
            
          })
            this.num = zsNum
          if (res.res.length <= 1) {
            this.DataAll = res.res;
            console.log('看一下',res);
            if (this.DataAll[0].num * 1 < res.arr[0].xxnum * 1) {
              this.DataAll[0].show = true;
            } else {
              this.DataAll[0].show = false;
            }
          } else {
            // this.DataAll = res.res;
            res.res.forEach((item,idx)=>{
              let num = res.res[idx].num*1
              let xxnum = res.arr[idx].xxnum*1
              if(num<xxnum){
                res.res[idx].show = true
                this.DataAll = res.res;
              }else{
                res.res[idx].show = false
                this.DataAll = res.res;

              }
            })

          }
        }else if(res.status==404){
          console.log("没有")
          this.total = 0
        }
      });
      // 过滤筛选满足选项框的条件
      // this.tableData.filter((item, idx, arr) => {
      //   if (_name == "") {
      //     console.log("按规格查找")
      //     if (item.typename == _typename) {
      //       this.DataAll.push(item);
      //     }
      //   } else if (_typename == "") {
      //     console.log("按规格型号查找")
      //     if (item.name == _name) {
      //       this.DataAll.push(item);

      //       console.log(item)
      //     }
      //   } else if (_name && _typename) {
      //     console.log("精确查找")
      //     if (item.name == _name && item.typename == _typename) {
      //       this.DataAll.push(item);
      //     }
      //   }
      // });
    },
    // 基础信息维护
    btn() {
      let routerData = this.$router.resolve({
        path: "/home/buhuo"
      });
      window.open(routerData.href, "_blank");
    },
    pageChange(pageIndex){
      let _that = this;
      if(_that.DataAll){
        if(_that.pageIndex){
          _that.pageIndex=pageIndex
        }
        _that.lister = _that.DataAll.slice((_that.pageIndex-1)*_that.pageSize,_that.pageIndex*_that.pageSize)
      console.log("有没有生效",_that.lister)

      }
    },
    close(){
      location.reload()
    }
  }
};
</script>
<style scoped>
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.box {
  font-size: 18px;
}
.buhuo {
  color: red;
  font-size: 18px;
}
#num{
  text-align: left;
  font-size: 18px;
  padding-left: 20px;
}
</style>
