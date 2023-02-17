<template>
<div>
  <el-table :data="list" style="width: 100%;" class="box" border :height="scrollerHeight">
  <!-- <el-table :data="datas" style="width: 100%;" class="box" border :height="scrollerHeight"> -->
    <el-table-column fixed label="型号" align="center" prop="name"/>
    <el-table-column fixed label="规格" align="center" prop="typename"/>
    <el-table-column fixed label="数量" align="center" prop="num"/>
    <el-table-column fixed label="左手（只）" align="center" prop="numL"/>
    <el-table-column fixed label="右手（只）" align="center" prop="numR"/>
    <el-table-column fixed label="位置" align="center" prop="address"/>
    <el-table-column fixed label="补货提示" align="center">
      <template #default="scope">
        <span class="buhuo">{{scope.row.xxnum > scope.row.num?'需要备货':''}}</span>
        <!-- {{datas[0].xxnum}}-{{scope.row.xxnum}}-{{scope.row.num}} -->
      </template>
    </el-table-column>
    <el-table-column fixed label="备注" align="center" prop="kind"/>
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
  
</template>
<script>
import axios from "axios";
import { getAxios } from "../assets/js/base.js";

export default {
  data() {
    return {
      tableDataX: [],
      tableData: [],
      scrollerHeight: "scrollerHeight",
      show: false,
      list:null,//当前显示的数据
      total:0,//总条数
      pageIndex:1,//当前页数
      pageSize:10,//一页展示10条
    };
  },
  created() {
    let res = localStorage.getItem("user");
    if (res) {
      let params = {
        pageIndex:this.pageIndex,
        pageSize:this.pageSize,
        // total:this.total
      }
      getAxios("/goods",params).then(res => {
        this.tableDataX = res.res;
       console.log("库存",res.count)
        this.total=res.count
         this.list = this.tableDataX.slice((this.pageIndex-1)*this.pageSize,this.pageIndex*this.pageSize)
        // 查询基础信息表的所有信息
        let p = {
          k: 1
        };
        getAxios("/goods",p).then(res=>{
          console.log(res)
          this.tableDataX.forEach((item,idx)=>{
            res.forEach((ele,idxs)=>{
              let name = this.tableDataX[idx].name
              let typename = this.tableDataX[idx].typename
              if(name==ele.name&&typename==ele.typename){
                this.tableDataX[idx].xxnum = ele.xxnum
                // this.tableData = this.tableDataX
              }
            })
          })
        })
      });
    } else {
      this.$router.push("/login");
    }
  },
  computed:{
    datas:{
      get(){
        this.tableDataX.forEach((item,idx) => {
          this.tableDataX[idx].xxnum 
          // console.log('计算',this.tableDataX[idx])
        });
          return this.tableDataX
      },
      // set(val){
      //   console.log(val)
      //   this.tableDataX.forEach((item,idx) => {
      //      this.tableDataX[idx].xxnum="0"
      //     console.log(this.tableDataX[idx].xxnum)
      //   });
      // }
    }
  },
  mounted() {
   
    this.scrollerHeight = window.innerHeight - 290 + "px";
    window.onresize = function() {
      this.scrollerHeight = window.innerHeight - 290 + "px";
    };
    
  },
  methods: {
     pageChange(pageIndex){
      
       let _that = this;
      if(_that.tableDataX){
        if(_that.pageIndex){
          _that.pageIndex=pageIndex
        }
        let params = {
          pageIndex:this.pageIndex,
          pageSize:this.pageSize,
          // total:this.total
        }
      getAxios("/goods",params).then(res => {
        console.log("页码",res)
        _that.list = res.res;
      })
      
      }

    }
  },
};
</script>
<style scoped>
.buhuo {
  color: red;
  font-size: 18px;
}
.box {
  font-size: 18px;
}

</style>
