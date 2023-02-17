<template>
  <div>
    <h1>入库明细</h1>
    <div class="box">
      <el-form ref="form">
        <el-select
          v-model="operatingValue"
          filterable
          remote
          reserve-keyword
          placeholder="操作人员"
          :remote-method="remoteMethod"
          :loading="loading"
          allow-create
          clearable
          style="width:100px"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>&nbsp;-&nbsp;
        <el-date-picker
          v-model="dateValue"
          type="datetimerange"
          format="YYYY-MM-DD HH:mm:ss"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          value-format="YYYY-MM-DD HH:mm:ss"
          :default-time="defaultTime"
        ></el-date-picker>&nbsp;-&nbsp;
        <el-select
          v-model="nameValue"
          filterable
          remote
          reserve-keyword
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
          reserve-keyword
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
        <el-button @click="search" v-model="btnName">{{btnName}}</el-button>
        <el-button @click="btn" :disabled="this.nameValue||this.typeNameValue||this.operatingValue?false:true">回到详单</el-button>
      </el-form>
    </div>

    <!-- 这里是历史数据 -->
    <div v-show="show">
      <goodslistcom :data="lister"></goodslistcom>
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
    <div v-show="result">
      <goodslistcom :data="searchList"></goodslistcom>
       <div class="page">
        <el-pagination
          id="page"
          background
          layout="prev, pager, next"
          prev-text='上一页'
          next-text="下一页"
          @current-change="pageChangeList"
          :total="total"
          :default-page-size='pageSize'
          >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import goodslistcom from "./goodsListCom.vue";
import { getAxios } from "../assets/js/base.js";
export default {
  data() {
    return {
      defaultTime: [
        new Date(2000, 1, 1, 7, 30, 0),
        new Date(2000, 2, 1, 19, 30, 0)
      ],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      dateValue: [],
      btnName: "搜索",
      operatingValue: [],
      show: true,
      result: false,
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
      searchList:null,
      total:0,//总条数
      pageIndex:1,//当前页数
      pageSize:10,//一页展示10条
      
    };
  },
  components: {
    goodslistcom
  },
  mounted() {
    // 向数据库拿到入库历史操作数据
    let param = {
        pageIndex:this.pageIndex,
        pageSize:this.pageSize
      }
    getAxios("/findList",param).then(res => {
      
      this.tableData = res.res;
      let len = this.tableData.length;
      //把数据插入到tableDataX里面
      for (let i = 0; i < len; i++) {
        let avv = {};
        let editeFlag = this.tableData[i].editeFlag;
        editeFlag = false;
        avv.id = this.tableData[i]._id;
        avv.kind = this.tableData[i].kind;
        avv.address = this.tableData[i].address;
        avv.name = this.tableData[i].name;
        avv.num = this.tableData[i].num;
        avv.numL = this.tableData[i].numL;
        avv.numR = this.tableData[i].numR;
        avv.time = this.tableData[i].time;
        avv.operating = this.tableData[i].operating;
        avv.typename = this.tableData[i].typename;
        avv.editeFlag = editeFlag;
        this.tableDataX.unshift(avv);
      }
      this.total = res.count
      this.lister = this.tableDataX.slice((this.pageIndex-1)*this.pageSize,this.pageIndex*this.pageSize)
      res.map(itme => {
        var a = itme.name;
        var b = itme.typename;
        var c = itme.operating;
        return this.states.splice(0, 0, a, b, c);
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
    //查询开始
    search() {
      // 每次点击都要清空数组
      this.DataAll = [];

      let _name = this.nameValue;
      let _typename = this.typeNameValue;
      let _operating = this.operatingValue;

      if (!_name && !_typename && !this.dateValue[0] && !_operating) {
        this.$alert("至少填一个查询条件", "温馨提示", {
          confirmButtonText: "确定"
        });
      } else {
        //判断有没有填时间，如果没有填时间就需要给dateValue添加长度，否则会报错
        if (this.dateValue == null || this.dateValue == []) {
          this.dateValue = [];
          this.dateValue[0] = "";
          this.dateValue[1] = "";
        }
        let p = {
          name: _name,
          typename: _typename,
          operating: _operating,
          time: this.dateValue[0],
          time1: this.dateValue[1]
        };

        getAxios("/findSearch", p).then(res => {
          if (res.status == 200) {
            if (res.res.length == 0) {
              console.log(999);
              this.$alert("没有查询到该记录", "提示", {
                confirmButtonText: "确定"
              });
            } else {
              res.res.forEach(itme => {
                // console.log(itme)
                this.DataAll.push(itme)
                 this.total=res.res.length
                this.searchList =this.DataAll.slice((this.pageIndex-1)*this.pageSize,this.pageIndex*this.pageSize)
              });
              this.show = false;
              this.result = true;
            }
          }
        });
       
      }
    },

    //查询结束

    // 回到详单
    btn() {
      if (this.nameValue || this.typeNameValue ||this.operatingValue) {
        if(this.DataAll.length==0){
          console.log(999)
          this.$alert('当前还未点击搜索，是否要返回详单',"提示",{
            confirmButtonText: "确定"
          })
        }else{
          console.log(888)
          this.$alert("现在处于搜索页，是否返回详单页", "温馨提示", {
          confirmButtonText: "确定",
          callback: action => {
            this.show = !this.show;
            this.result = !this.result;
            //清空选项框
            this.nameValue = "";
            this.typeNameValue = "";
          }
        });
        }
        // this.$alert("现在处于搜索页，是否返回详单页", "温馨提示", {
        //   confirmButtonText: "确定",
        //   callback: action => {
        //     this.show = !this.show;
        //     this.result = !this.result;
        //     //清空选项框
        //     this.nameValue = "";
        //     this.typeNameValue = "";
        //   }
        // });
      } else {
        this.disabled = !this.disabled;
      }
    },
    // 回到详单结束

    // 删除开始
    //ele自带的单击事件
    singleShot(row) {
      // row参数为点击某条时返回对应的数据
      console.log("row:", row);

      console.log("row:", 999);
    },
    pageChange(pageIndex){
      let _that = this;
      if(_that.tableDataX){
        if(_that.pageIndex){
          _that.pageIndex=pageIndex
        }
        let param = {
          pageIndex:this.pageIndex,
          pageSize:this.pageSize
        }
        getAxios("/findList",param).then(res => {
          _that.lister = res.res;
        })
      //   _that.lister = _that.tableDataX.slice((_that.pageIndex-1)*_that.pageSize,_that.pageIndex*_that.pageSize)
      // console.log('打印当前页数',_that.lister)
      }

    },
    pageChangeList(pageIndex){
       let _that = this;
      if(_that.DataAll){
        if(_that.pageIndex){
          _that.pageIndex=pageIndex
        }
        _that.searchList = _that.DataAll.slice((_that.pageIndex-1)*_that.pageSize,_that.pageIndex*_that.pageSize)
      console.log('打印当前页数',_that.lister)
      }
    }

  }
};
</script>
<style scoped>
.box {
  margin: 30px 0;
  font-size: 18px;
}
</style>
