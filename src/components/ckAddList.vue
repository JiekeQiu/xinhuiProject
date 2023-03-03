<template>
  <div>
    <div class="addList">
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
              <el-form-item label="送货单号">
                <el-input v-model="formLabelAlign.No" ref="No1" @keydown.enter="inputDown('No1')"></el-input>
              </el-form-item>
              <el-form-item label="客户编号" prop="bianhao" ref="bianhao">
                <!-- <el-select
                  v-model="formLabelAlign.bianhao"
                  filterable
                  remote
                  placeholder="请输入客户编号"
                  :remote-method="remoteMethod"
                  :loading="loading"
                  allow-create
                  clearable
                  ref="No2"
                   @blur="messageList"
                  
                  @keydown.enter="inputDown('No2')"
                  style="width:400px"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>-->
                <el-input
                  v-model="formLabelAlign.bianhao"
                  ref="No2"
                  autofocus="true"
                  @blur="messageList"
                   @focus="focusMsg"
                  @keydown.enter="inputDown('No2')"
                ></el-input>
              </el-form-item>
              <el-form-item label="客户名称">
                <el-input v-model="formLabelAlign.name" ref="No3" @keydown.enter="inputDown('No3')"></el-input>
              </el-form-item>
              <el-form-item label="客户地址">
                <el-input
                  v-model="formLabelAlign.address"
                  ref="No4"
                  @keydown.enter="inputDown('No4')"
                ></el-input>
              </el-form-item>
              <el-form-item label="联系电话">
                <el-input
                  v-model="formLabelAlign.phone"
                  ref="No5"
                  @keydown.enter="inputDown('No5')"
                ></el-input>
              </el-form-item>
              <el-form-item label="联系人">
                <el-input
                  v-model="formLabelAlign.Contact"
                  ref="No6"
                  @keydown.enter="inputDown('No6')"
                ></el-input>
              </el-form-item>
              <el-form-item label="业务员">
                <el-input
                  v-model="formLabelAlign.salesman"
                  ref="No7"
                  @keydown.enter="inputDown('No7')"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="6" style="margin-top:24px">
          <div class="grid-content bg-purple-light">
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
              <el-form-item label="状态">
                <el-input
                  v-model="formLabelAlign.status"
                  ref="No8"
                  @keydown.enter="inputDown('No8')"
                ></el-input>
              </el-form-item>
              <el-form-item label="订单号">
                <el-input
                  v-model="formLabelAlign.dingdan"
                  ref="No9"
                  @keydown.enter="inputDown('No9')"
                ></el-input>
              </el-form-item>
              <el-form-item label="送货日期">
                <el-input
                  v-model="formLabelAlign.date"
                  ref="No10"
                  @keydown.enter="inputDown('No10')"
                ></el-input>
              </el-form-item>
              <el-form-item label="付款方式">
                <el-input
                  v-model="formLabelAlign.paymentMethod"
                  ref="No11"
                  @keydown.enter="inputDown('No11')"
                ></el-input>
              </el-form-item>
              <el-form-item label="本次收款">
                <el-input
                  v-model="formLabelAlign.payment"
                  ref="No12"
                  @keydown.enter="inputDown('No12')"
                ></el-input>
              </el-form-item>
              <el-form-item label="制表人">
                <el-input
                  v-model="formLabelAlign.lister"
                  ref="No13"
                  @keydown.enter="inputDown('No13')"
                ></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  v-model="formLabelAlign.remark"
                  ref="No14"
                  @keydown.enter="inputDown('No14')"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="6" style="margin-top:9px">
          <div class="grid-content bg-purple"></div>
        </el-col>
      </el-row>
    </div>

    <div class="goodsList">
      <span class="list">发货明细</span>
      <el-form
        :model="productRuleForm"
        ref="productRuleForm"
        :rules="productRuleForm.rules"
        @keydown.enter="addTable"
      >
        <el-table
          :data="productRuleForm.tableData"
          border
          style="width: 100%"
          @row-dblclick="singleShot"
        >
          <el-table-column prop="date" label="序号" width="70">
            <template #default="scope">
              <el-form-item :prop="'tableData.' + scope.$index + '.date'">
                <el-input v-model.trim="scope.row.date"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="产品名称">
            <template #default="scope">
              <el-form-item :prop="'tableData.' + scope.$index + '.name'">
                <el-input
                  v-model.trim="scope.row.name"
                  ref="No15"
                  @keydown.right="inputDown('No15')"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column prop="typeNmae" label="规格">
            <template #default="scope">
              <el-form-item :prop="'tableData.' + scope.$index + '.typeNmae'">
                <el-input
                  v-model.trim="scope.row.typeNmae"
                  ref="No16"
                  @keydown.right="inputDown('No16')"
                  @keydown.left="inputDownLeft('No16')"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column prop="unit" label="单位" width="80">
            <template #default="scope">
              <el-form-item :prop="'tableData.' + scope.$index + '.unit'">
                <el-input
                  v-model.trim="scope.row.unit"
                  ref="No17"
                  @keydown.right="inputDown('No17')"
                  @keydown.left="inputDownLeft('No17')"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="money" label="单价" width="180">
            <template #default="scope">
              <el-form-item :prop="'tableData.' + scope.$index + '.money'">
                <el-input
                  v-model.trim="scope.row.money"
                  ref="No18"
                  @keydown.right="inputDown('No18')"
                  @keydown.left="inputDownLeft('No18')"
                  @blur="calculate"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="num" label="数量" width="170">
            <template #default="scope">
              <el-form-item :prop="'tableData.' + scope.$index + '.num'">
                <el-input
                  v-model.trim="scope.row.num"
                  ref="No19"
                  @keydown.right="inputDown('No19')"
                  @keydown.left="inputDownLeft('No19')"
                  @blur="calculate"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="All" label="总金额" width="170">
            <template #default="scope">
              <el-form-item :prop="'tableData.' + scope.$index + '.All'">
                <el-input
                  v-model.trim="scope.row.All"
                  ref="No20"
                  @keydown.right="inputDown('No20')"
                  @keydown.left="inputDownLeft('No20')"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注" width="170">
            <template #default="scope">
              <el-form-item :prop="'tableData.' + scope.$index + '.remark'">
                <el-input
                  v-model.trim="scope.row.remark"
                  ref="No21"
                  @keydown.left="inputDownLeft('No21')"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </div>
  </div>
</template>
<script>
import goodslistcom from "./goodsListCom.vue";
import { getAxios } from "../assets/js/base.js";
export default {
  data() {
    return {
      show: true,
      result: false,
      value: "",
      search: {
        status: "",
        timeStart: "",
        timeEnd: "",
        name: ""
      },
      options: [],
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
            remark: "",
            All: ""
          }
        ]
      },
      goodList: [],
      labelPosition: "right",
      formLabelAlign: {
        flag: false,
        _id:"",
        No: "",
        bianhao: "",
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
      states: [],
      list: [],
      loading: false
    };
  },
  mounted() {
    //判断是新增还是修改
    let str = sessionStorage.getItem("str");
    let flag = sessionStorage.getItem("flag");
    let obj = JSON.parse(str);
    let user = localStorage.getItem("user");
    let name = JSON.parse(user);
    this.formLabelAlign.lister = name.username;
    if (flag == "false" && str) {
      //  修改页面渲染
      let data = JSON.parse(obj[0].tableData);
      this.formLabelAlign._id = obj[0]._id;
      this.formLabelAlign.No = obj[0].No;
      this.formLabelAlign.name = obj[0].name;
      this.formLabelAlign.bianhao = obj[0].bianhao;
      this.formLabelAlign.address = obj[0].address;
      this.formLabelAlign.lister = obj[0].lister;
      this.formLabelAlign.phone = obj[0].phone;
      this.formLabelAlign.date = obj[0].date;
      this.formLabelAlign.status = obj[0].status;
      this.formLabelAlign.Contact = obj[0].contact;
      this.productRuleForm.tableData = data;
    } else {
      let str = JSON.stringify(this.productRuleForm.tableData);
      localStorage.setItem("productRuleForm", str);
    }
  },
  watch: {
    // 监听productRuleForm、formLabelAlign的变化，把值保存到本地
    formLabelAlign: {
      handler(newValue, oldValue) {
        // console.log('改变后',newValue)

        let formLabelAlign = JSON.stringify(newValue);
        localStorage.setItem("formLabelAlign", formLabelAlign);
        // console.log('改变前',oldValue)
      },
      deep: true
    },
    productRuleForm: {
      handler(newValue, oldValue) {
        // console.log('改变后',newValue)
        // let productRuleForm = JSON.stringify(oldValue.tableData);
        let productRuleForm = JSON.stringify(newValue.tableData);
        localStorage.setItem("productRuleForm", productRuleForm);
        // console.log('改变前',oldValue.tableData)
      },
      deep: true
    }
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
    // 添加一行(按回车键新建一行)
    addTable() {
      let len = this.productRuleForm.tableData.length;
      // console.log("看看重要的事",this.productRuleForm.tableData[len-1].num)
      let utilize = this.productRuleForm.tableData[len - 1].remark.indexOf(
        "用"
      );
      let scrap = this.productRuleForm.tableData[len - 1].remark.indexOf("废");
      let left = this.productRuleForm.tableData[len - 1].remark.indexOf("左");
      let right = this.productRuleForm.tableData[len - 1].remark.indexOf("右");
      if (this.productRuleForm.tableData[len - 1].unit == "副") {
        if (
          this.productRuleForm.tableData[len - 1].num < 0 && (utilize != -1 ||
          scrap != -1)
        ) {
           console.log("这里是退货");
          if(left!=-1||right!=-1){
            this.message("请核对该产品单位")
          }else{
            this.rulesInput()  
          }
         
                
        } else if (this.productRuleForm.tableData[len - 1].num > 0) {
          console.log("这里是出库");
          if(left!=-1||right!=-1){
            this.message("请核对该产品单位")
          }else if(utilize != -1 ||scrap != -1){
            this.message("请核对该产品是出库还是退货")
          }else{
            this.rulesInput()
          }
        }else{
          console.log("这里没有备注");
          this.$message({
            type: "error",
            message: "请在备注栏注明该产品可利用还是废品",
            duration: 5000
          });
        }
      } 
      else if (this.productRuleForm.tableData[len - 1].unit == "只") {
        console.log("这里是只");
        if(this.productRuleForm.tableData[len - 1].num < 0 && (utilize != -1 ||
          scrap != -1)){
            // 这里是退货
            console.log("这里是只的退货")
            // 添加一行
            this.rulesInput()
    
          }else if (this.productRuleForm.tableData[len - 1].num > 0){
            if(left != -1 ||right != -1){
              if(utilize != -1 ||scrap != -1){
                 this.message("请核对该产品是出库还是退货")
              }else{
                this.rulesInput()
              }
            }else {
              this.message("请在备注栏说明哪手出库")
            }
            
          }else if(this.productRuleForm.tableData[len - 1].remark==""){
            this.$message({
              type:"error",
              message:"这里是只，请核对后再输入"
            })
          }else{
            this.$message({
              type:"error",
              message:"请在备注栏注明该产品可利用还是废品",
              duration:50000
            })
          }



       


      } 
      else {
        this.$message({
          type: "error",
          message: "单位只能是副或则只",
          duration: 3000
        });
      }
      
     
    },
    // 封装弹出消息
    message(val){
      this.$message({
        type:"error",
        message:val,
        duration:5000
      })
    },
    // 封装添加行
    rulesInput(){
        if (this.productRuleForm.tableData.length < 9) {
          let arr;
          let len = this.productRuleForm.tableData.length;
          for (let i = 0; i < len; i++) {
            arr = this.productRuleForm.tableData[i];
          }
          if (arr.name && arr.typeNmae && arr.money && arr.num && arr.unit) {
            this.productRuleForm.tableData.push({
              date: "",
              name: "",
              money: "",
              typeNmae: "",
              unit: "",
              num: "",
              All: "",
              remark: ""
            });
          } else {
            window.alert("没有输入完");
          }
        } else {
          this.$alert("最多可以出9条，请保存后再出库","温馨提示",{
              confirmButtonText: '确定',
          })
        }

        for (let item in this.productRuleForm.tableData) {
          // 自动生成序号
          this.productRuleForm.tableData[item].date = item * 1 + 1;
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
    // 键盘按下跳转到上一个input里
    inputDownLeft(e) {
      let noNum = e.slice(2);
      let no = e.slice(0, 2);
      let No = noNum + no;
      if (e) {
        e = no + --noNum;
        this.$refs[e].focus();
      }
    },
    //获取焦点清空客户编号
    focusMsg(){
      console.log("获取焦点")
      this.formLabelAlign.bianhao='';
    },
    //失去焦点获取客户信息
    messageList() {
      let bianhao = this.formLabelAlign.bianhao;
      getAxios("/ckadd", { bianhao }).then(res => {
        console.log("失去焦点",res)
        if (res.status == 200) {
          this.$refs.No2.input.style.color = "";

          this.formLabelAlign.name = res.res[0].name;
          this.formLabelAlign.address = res.res[0].address;
          this.formLabelAlign.phone = res.res[0].phone;
          this.formLabelAlign.Contact = res.res[0].Contact;
        } else if (res.status == 404) {
          this.formLabelAlign.bianhao =
            "未找到" + this.formLabelAlign.bianhao + "所对应的编号";
          this.formLabelAlign.name = "";
          this.formLabelAlign.address = "";
          this.formLabelAlign.phone = "";
          this.formLabelAlign.Contact = "";
          console.log(this.$refs.No2.input);
          this.$nextTick(() => {
            this.$refs.No2.input.style.color = "red";
          });
        }
      });

      // console.log(this.formLabelAlign);
    },
    // 失去焦点计算总价
    calculate() {
      // 拿到单价和数量
      this.productRuleForm.tableData.forEach((item, idx) => {
        console.log('家伙都还好维护',item)
        if(item.unit=="只"){
          let money = item.money;
          //let num = parseInt(item.num/2);
          let num = item.num;
          let AllNum = money * num;
          item.All = AllNum.toFixed(2);
        }else if(item.unit=="副"){
          let money = item.money;
          let num = item.num;
          let AllNum = money * num;
          item.All = AllNum.toFixed(2);
        }
        // let money = item.money;
        // let num = item.num;
        // let AllNum = money * num;
        // item.All = AllNum.toFixed(2);
      });
    },
    //ele的单击事件（row代表拿到具体点击所对应的数据）
    singleShot(row) {
      // row参数为点击某条时返回对应的数据
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          console.log(row);
          // // 删除点击的那一行
          this.productRuleForm.tableData.splice(row.date - 1, 1);
          // 删除后date需要改变长度
          this.productRuleForm.tableData.forEach((item, idx) => {
            this.productRuleForm.tableData[idx].date = idx + 1;
          });
        })
        .catch((error) => {
          console.log("看看",error);
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
      // console.log("column:", column);
      // console.log("cell:", cell);
      // console.log("event:", event);
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
</style>
