<template>
  <div>
    <h1>基础信息维护</h1>

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
        <el-button @click="search()">搜索</el-button>
      </el-form>
    </div>

    <div class="mt-3" v-show="show">
      <el-table
        :data="lister"
        style="width: 100%"
        :header-cell-style="alignText"
        border
        :height="scrollerHeight"
        class="box"
      >
        <el-table-column prop="name" label="型号" width="280" align="center"></el-table-column>
        <el-table-column prop="typename" label="规格" width="280" align="center"></el-table-column>
        <el-table-column prop label="库存下限" align="center">
          <template #default="scope">
            <span style="display:inline-block;100%;height:100%;" v-if="scope.row.editeFlag">
              <el-input v-model="scope.row.xxNum"/>
            </span>
            <span v-if="!scope.row.editeFlag">{{scope.row.xxNum}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="select" label="操作" align="center">
          <template #default="scope">
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row)"
              :disabled="scope.row.editeFlag ? true : false"
            >编辑</el-button>
            <el-button size="small" @click="handleSubmit(scope.$index, scope.row)"  @keydown.enter="handleSubmit(scope.$index, scope.row)">保存</el-button>
          </template>
        </el-table-column>
      </el-table>
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
    </div>
    <div class="mt-3" v-show="result">
      <el-table
        :data="lister"
        style="width: 100%"
        :header-cell-style="alignText"
        border
        :height="scrollerHeight"
        class="box"
      >
        <el-table-column prop="name" label="型号" width="280" align="center"></el-table-column>
        <el-table-column prop="typename" label="规格" width="280" align="center"></el-table-column>
        <el-table-column prop label="库存下限" align="center">
          <template #default="scope">
            <span style="display:inline-block;100%;height:100%;" v-if="scope.row.editeFlag">
              <el-input v-model="scope.row.xxNum"/>
            </span>
            <span v-if="!scope.row.editeFlag">{{scope.row.xxNum}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="select" label="操作" align="center">
          <template #default="scope">
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row)"
              :disabled="scope.row.editeFlag ? true : false"
            >编辑</el-button>
            <el-button size="small" @click="handleSubmit(scope.$index, scope.row)">保存</el-button>
          </template>
        </el-table-column>
      </el-table>
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
    </div>
  </div>
</template>
<script>
import { getAxios } from "../assets/js/base.js";
export default {
  data() {
    return {
      show: true,
      result: false,
      alignText: {
        textAlign: "center"
      },
      scrollerHeight: "scrollerHeight",
      dialogTableVisible: false,
      // show: false,
      tableData: [],
      tableDataX: [],
      options: [],
      nameValue: [],
      typeNameValue: [],
      list: [],
      loading: false,
      states: [],
      DataAll: [],
      lister:null,//当前显示的数据
      total:0,//总条数
      pageIndex:1,//当前页数
      pageSize:10,//一页展示10条
    };
  },
  mounted() {
    let params ={
      pageIndex:this.pageIndex,
      pageSize:this.pageSize
    }
    getAxios("/basicsss",params).then(res => {
      this.tableData = res.res;
      let len = this.tableData.length;
      //把数据插入到tableDataX里面
      for (let i = 0; i < len; i++) {
        let avv = {};
        let editeFlag = this.tableData[i].editeFlag;
        let xxNum = this.tableData[i].xxnum
        editeFlag = false;
        // avv.id = this.tableData[i]._id;
        // avv.kind = this.tableData[i].kind;
        // avv.address = this.tableData[i].address;
        avv.name = this.tableData[i].name;
        // avv.num = this.tableData[i].num;
        // avv.numL = this.tableData[i].numL;
        // avv.numR = this.tableData[i].numR;
        // avv.time = this.tableData[i].time;
        // avv.operating = this.tableData[i].operating;
        avv.xxNum = this.tableData[i].xxNum;
        avv.typename = this.tableData[i].typename;
        avv.editeFlag = editeFlag;
        avv.xxNum = xxNum;
        this.tableDataX.unshift(avv);
        this.total=res.count
         this.lister = this.tableDataX.slice((this.pageIndex-1)*this.pageSize,this.pageIndex*this.pageSize)

        // 这里留下来后期批量导入可以用
        // let p ={
        //   name:avv.name,
        //  typename:avv.typename,
        //   xxnum:0
        // }
        // // console.log('哈哈哈',p)
        // getAxios('/basicsss',p).then(res=>{})




      }
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
        //  console.log(item)
        return { value: `${item}`, label: `${item}` };
      });
    
    });
    
    this.scrollerHeight = window.innerHeight - 260 + "px";
    window.onresize = function() {
      this.scrollerHeight = window.innerHeight - 260 + "px";
    };
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
        typename: _typename,
        K:1
      };
      getAxios("/kcsearch", p).then(res => {
        if (res.status == 200) {
          console.log('长度',res.res)
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
        }
      });





      // 过滤筛选满足选项框的条件
      // this.tableDataX.filter((item, idx, arr) => {
      //   if (_name == "") {
      //     if (item.typename == _typename) {
      //       console.log("按规格查找",item);

      //       this.DataAll.push(item);
      //       this.total=this.DataAll.length
      //       this.lister = this.DataAll.slice((this.pageIndex-1)*this.pageSize,this.pageIndex*this.pageSize)
      //     }
      //   } else if (_typename == "") {
      //     console.log("按规格型号查找");
      //     if (item.name == _name) {
      //       this.DataAll.push(item);
      //        this.total=this.DataAll.length
      //       this.lister = this.DataAll.slice((this.pageIndex-1)*this.pageSize,this.pageIndex*this.pageSize)
      //       console.log(item);
      //     }
      //   } else if (_name && _typename) {
      //     console.log("精确查找");
      //     if (item.name == _name && item.typename == _typename) {
      //       this.DataAll.push(item);
      //        this.total=this.DataAll.length
      //       this.lister = this.DataAll.slice((this.pageIndex-1)*this.pageSize,this.pageIndex*this.pageSize)
      //     }
      //   }
      // });
      this.show = false;
      this.result = true;
    },

    handleEdit(idx, row) {
      console.log(row);

      row.editeFlag = !row.editeFlag;
    },
    handleSubmit(idx, row) {
      this.$confirm("是否要保存库存下限？", "提示", {
        confirmButtonText: "确定",

        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {
            name:row.name,
            typename:row.typename,
            xxnum:row.xxNum
          }
          
            getAxios("/basicsss", params).then(res => {
              if(res.status==200){
                row.editeFlag = !row.editeFlag;
              }
            });
      // console.log('看一家',row.xxNum);

        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    pageChange(pageIndex){
      let _that = this;
      if(_that.DataAll){
        if(_that.pageIndex){
          _that.pageIndex=pageIndex
        }
        let params = {
          pageIndex:this.pageIndex,
          pageSize:this.pageSize,
          // total:this.total
        }
      getAxios("/basicsss",params).then(res => {
        _that.lister = res.res;
      })

      }
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
</style>
