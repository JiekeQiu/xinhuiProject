<template>
  <div>
    <div style="padding-bottom:10px">
      <el-row :gutter="10">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>状态：</span>
            <el-select v-model="search.status" placeholder="选择状态" style="width: 50%" clearable>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <div class="block">
              <span class="demonstration">送货日期：</span>
              <el-date-picker
                v-model="search.timeStart"
                type="date"
                placeholder="开始日期"
                style="width: 35%"
                value-format="YYYY-MM-DD"
              ></el-date-picker>&nbsp;-
              <el-date-picker
                v-model="search.timeEnd"
                type="date"
                placeholder="结束日期"
                style="width: 35%"
                value-format="YYYY-MM-DD"
              ></el-date-picker>
            </div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-form :model="search" label-width="80px">
              <el-form-item label="客户名称">
                <el-input v-model.trim="search.name"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-form :model="search" label-width="80px">
              <el-form-item label="送货单号">
                <el-input v-model.trim="search.No"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="1">
          <div class="grid-content bg-purple">
            <el-button @click="searchList" type="primary" :disabled="disabled">搜索</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-table
        :data="list"
        border
        height="240px"
        @row-click="singleShot"
        ref="orderPlanTable"
        highlight-current-row
        @current-change="handleCurrentChange"
      >
        <el-table-column prop="num" label="序号" width="53%"></el-table-column>
        <el-table-column prop="status" label="状态" width="67%"></el-table-column>
        <el-table-column prop="No" label="送货单号" width="140%"></el-table-column>
        <el-table-column prop="name" label="客户名称" width="140%"></el-table-column>
        <el-table-column prop="address" label="客户地址" width="580%"></el-table-column>
        <el-table-column prop="date" label="送货日期" width="120%"></el-table-column>
        <el-table-column prop="All" label="应收金额" width="160%"></el-table-column>
      </el-table>
    </div>

    <div class="goodsList">
      <span class="list">发货明细</span>
      <el-table :data="goodList" border style="width: 100%" height="300px">
        <el-table-column prop="date" label="序号" width="52%"></el-table-column>
        <el-table-column prop="name" label="产品名称" width="320%"></el-table-column>
        <el-table-column prop="typeNmae" label="规格" width="320%"></el-table-column>
        <el-table-column prop="unit" label="单位" width="60%"></el-table-column>
        <el-table-column prop="money" label="单价" width="80%"></el-table-column>
        <el-table-column prop="num" label="数量" width="120%"></el-table-column>
        <el-table-column prop="All" label="总金额" width="120%"></el-table-column>
        <el-table-column prop="remark" label="备注" width="100%"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import goodslistcom from "./goodsListCom.vue";
import { getAxios } from "../assets/js/base.js";
export default {
  data() {
    return {
      value: "",
      search: {
        status: "",
        timeStart:null,
        timeEnd: null,
        name: "",
        No: ""
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
      productRuleForm: {
        tableData: [
          {
            date: "1",
            name: "",
            money: "",
            typeNmae: "",
            unit: "",
            num: "",
            remark: ""
          }
        ],
        rules: {
          typeNmae: [{ required: true, message: "输规格", trigger: "blur" }],
          name: [{ required: true, message: "输名称", trigger: "blur" }],
          manufacturer: [
            { required: true, message: "输品牌", trigger: "blur" }
          ],
          address: [{ required: true, message: "输仓位", trigger: "blur" }],
          classify: [
            { required: true, message: "输仓库归类", trigger: "blur" }
          ],
          unit: [{ required: true, message: "输单位", trigger: "blur" }],
          num: [{ required: true, message: "输数量", trigger: "blur" }]
        }
      },
      goodList: [],
      labelPosition: "right",
      formLabelAlign: {
        No: "",
        bianbao: "",
        name: "",
        address: "",
        phone: "",
        contact: "",
        salesman: "",
        status: "未打印",
        dingdan: "",
        date: new Date(+new Date() + 8 * 3600 * 1000).toJSON().substr(0, 10),
        paymentMethod: "",
        payment: 0,
        lister: "",
        remark: ""
      },
      currentRow: 0,
      list:[]
    };
  },
  mounted() {
    //  渲染页面(只支持拿到最新的30条数据)

    getAxios("/ckfind").then(res => {
      
      res.data.forEach((item, idx) => {
        let arr = JSON.parse(item.tableData);
        let obj = {};
        obj.num = idx + 1;
        obj.No = item.No;
        obj.name = item.name;
        obj.status = item.status;
        obj.address = item.address;
        obj.date = item.date;
        obj.All = item.AllMoney;

        this.tableData.push(obj);
      });
      this.tableData.forEach(ele=>{
        this.list.unshift(ele)
      })
      // 渲染发货明细
      let p = {
        No: this.list[length].No
      };
      this.currentRow = this.list[length];
      getAxios("ckfind", p).then(res => {
        if (res.stauts == 200) {
          let data = JSON.parse(res.res[0].tableData);
          this.goodList = data;
        }
      });
    });
    sessionStorage.setItem("flag", "false");
  },
  computed: {
    disabled() {
      // cache: false;
      return (
        this.search.status == "" &&
        this.search.timeStart == null &&
        this.search.timeEnd == null &&
        this.search.name == ""&&
        this.search.No ==""
      );
    }
  },

  watch: {},
  methods: {
    // 点击搜索
    searchList() {
      // this.$alert("功能建设中......", "温馨提示", {
      //   confirmButtonText: "确定"
      // });
      this.tableData = [];
      this.goodList = [];
      this.list = [];
      let params = {
        status: this.search.status,
        timeStart: this.search.timeStart,
        timeEnd: this.search.timeEnd,
        name: this.search.name,
        No: this.search.No
      };
      getAxios("/cksearch", params).then(res => {
        console.log('',res);
        if (res.status == 200) {
          res.res.forEach((item, idx) => {
            let obj = {};
            obj.num = idx + 1;
            obj.No = item.No;
            obj.name = item.name;
            obj.status = item.status;
            obj.address = item.address;
            obj.date = item.date;
            obj.All = item.AllMoney;

            this.tableData.push(obj);
            
            this.goodList= JSON.parse(item.tableData);
            
          });
           this.tableData.forEach(ele=>{
            this.list.unshift(ele)
          })
         this.search= {
            status: "",
            timeStart:null,
            timeEnd: null,
            name: "",
            No: ""
          }
        } else if (res.status == 203) {
          this.$message({
            message: res.msg,
            type: "error",
            duration: 3000
          });
        }
      });
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
    // 点击客户订单显示订单详情
    singleShot(row, column, cell, event) {
      console.log("点击",row)
      // 通过订单编号查找
      getAxios("ckfind", { No: row.No }).then(res => {
        // 把数据存入session

        // console.log(res.res[0].tableData);
        // let formLabelAlign = JSON.stringify(res)
        let str = JSON.stringify(res.res);
        // console.log('查找',str);
        sessionStorage.setItem("str", str);
        // sessionStorage.setItem("formLabelAlign", formLabelAlign);

        this.goodList = "";
        if (res.stauts == 200) {
          let data = JSON.parse(res.res[0].tableData);
          this.goodList = data;
          // console.log("顾客订单", this.goodList);
        }
      });
      // row参数为点击某条时返回对应的数据
      // console.log("row:", row.No);
      // console.log("column:", column);
      // console.log("cell:", cell);
      // console.log("event:", event);
    },
    // 点击选中颜色
    handleCurrentChange(val) {
      console.log('颜色',val)
      this.currentRow = val;

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
.xz {
  position: absolute;
  top: -93%;
  left: 40%;
}
.xz img {
  display: block;
  width: 20px;
  height: 20px;
  /* background:url("../assets/images/icon/xinzeng.png") no-repeat; */
  /* background-position: 0px 2px; */
}
.lass_span {
  display: block;
  width: 100px;
}
.zhuanhuan {
  left: 40px;
}
.goodsList {
  padding-top: 50px;
  position: relative;
}
.list {
  position: absolute;
  top: 14px;
  left: 9px;
  font-size: 18px;
}
.addList .el-form-small {
  margin-bottom: 2px;
}
.addList .el-form-item {
  margin-bottom: 5px;
}
/* .el-table__body tr.current-row>td.el-table__cell{
  background-color:
} */
</style>
