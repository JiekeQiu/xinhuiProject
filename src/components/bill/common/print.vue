<template>
  <div id="print">
    <div style="padding:30px">
      <table
        border="1"
        cellspacing="0"
        cellpadding="0"
        style="font-size:9pt;"
        width="1040px"
        align="center"
        class="table_box"
      >
        <thead style="display:table-header-group;font-weight:bold;">
          <tr>
            <td colspan="10" align="center" style="font-weight:bold;border:none" class="head_top">
              <img src="../../../assets/images/logo1.jpg" class="title_logo" title="这里是logo">
              <div class="title">
                <p>鹰潭市新辉眼镜有限公司</p>
                <p v-show="list.timeEnd==null" class="title_msg">客户总订单</P>
                <p v-show="list.times===list.date&&(list.title==='客户详单'||list.title=='客户订单金额')" class="title_msg">{{list.name}}{{list.time}}-{{list.timeEnd}}对账单</p>
                <p v-show="list.times!=list.date&&(list.title==='客户详单'||list.title=='客户订单金额')" class="title_msg">{{list.time}}至{{list.timeEnd}}客户对账单</p>
              </div>
              <el-container class="top_msg">
                <span>列印人：</span>
                <span>{{list.username}}</span>
                <span>列印日期：</span>
                <span>{{date}}</span>
              </el-container>
            </td>
          </tr>
          <tr v-show="this.$route.meta.title=='客户订单金额'">
            <td>送货单号</td>
            <td>客户名称</td>
            <td>送货日期</td>
            <td>总金额</td>
          </tr>
          <tr v-show="this.$route.meta.title=='客户详单'">
            <td>送货时间</td>
            <td>送货单号</td>
            <td>成品名称及规格</td>
            <!-- <td>产品规格</td> -->
            <td>单位</td>
            <td>数量</td>
            <td>单价</td>
            <td>总金额</td>
            <td>备注</td>
          </tr>
           <tr v-show="this.$route.meta.title=='客户订单总金额'">
            <td>日期</td>
            <td>客户名称</td>
            <td>总数量</td>
            <td>总金额</td>
          </tr>
        </thead>
        <tbody style="text-align:center;" v-show="this.$route.meta.title=='客户详单'">
          <tr v-for="item in this.$store.state.list_msg" >
            <td>{{item.time}}</td>
            <td>{{item.No}}</td>
            <td>{{item.name}}{{item.typeNmae}}</td>
            <td>{{item.unit}}</td>
            <td>{{item.num}}</td>
            <td>{{item.money}}</td>
            <td>{{item.All}}</td>
            <td>{{item.remark}}</td>
          </tr>
        </tbody>
        <tbody style="text-align:center;" v-show="this.$route.meta.title=='客户订单金额'">
          <tr v-for="item in this.$store.state.list_msg" >
            <!-- <td>{{item.time}}</td> -->
            <td>{{item.No}}</td>
            <td>{{item.name}}</td>
            <td>{{item.time}}</td>
            <td>{{item.AllMoney}}</td>
          </tr>
        </tbody>
         <tbody style="text-align:center;" v-show="this.$route.meta.title=='客户订单总金额'">
          <tr v-for="item in this.$store.state.list_msg" >
            <td>{{item.date}}</td>
            <td>{{item.name}}</td>
            <td>{{item.num}}</td>
            <td>{{item.money}}</td>
            
          </tr>
        </tbody>
        <!-- <tfoot style="display:table-footer-group;font-weight:bold"> -->
        <tfoot style="font-weight:bold">
          <tr>
            <td colspan="10" align="center" style="font-weight:bold;border:none;">
              <div class="foot_msg">
                <span style="padding-right: 20px;">地址：江西省鹰潭市余江区眼镜工业园四期</span>
                <span>电话：15170100003</span>
              </div>
              <div class="foot_msg">注：请核对无误后，三日之内签回。否则以此单为准，谢谢配合！</div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div style="padding:100px 0 0 50px">
      <input type="button" value=" 打 印 " onclick="javascript:window.print()" style="width:80px;height:30px;margin-right:20px">
      <input type="button" value=" 取消 " style="width:80px;height:30px;margin-right:20px" @click="goback">

    </div>
  </div>
</template>
<script>
export default {
  props: {
    list: Object
  },
  data() {
    return {
      // list:this.$store.state.list_msg,
      // username:""
      date: new Date(+new Date() + 8 * 3600 * 1000)
        .toJSON()
        .substr(0, 19)
        .replace("T", " ")
    };
  },
  mounted(){
    console.log("拿到list",this.$store.state.list_msg)
  },
  methods:{
      goback(){
          console.log("看卡")
          this.$emit("back_flag",false)
      }
  }
};
</script>
<style scoped>
#print {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  /* background: rgba(0, 0, 0, 0.6); */
  background: #fff;
  z-index: 100;
  display: flex;
}
.head_top {
  width: 400px;
  height: 140px;
  border:none;
}
.head_top .title_logo {
  padding-top: 30px;
  padding-left: 10px;
  height: 50px;
  width: 200px;
  float: left;
}
.head_top .title p:first-child {
  font-size: 28px;
  line-height: 50px;
  width: 340px;
  text-align: left;
  padding-left: 30px;
  padding-top: 30px;
}
.head_top .title .title_msg {
  font-size: 20px;
  margin-bottom: 20px;
}
.top_msg span {
  display: inline-block;
  width: 80px;
  height: 30px;
  font-size: 14px;
}
.top_msg span:nth-child(2),
.top_msg span:nth-child(4) {
  text-align: left;
}
.top_msg span:nth-child(4) {
  width: 200px;
}
.table_box{
    border:none;
}
.table_box td {
  height: 40px;
  font-size: 20px;
  border:1px solid #000;
}
.foot_msg {
  height: 30px;
  text-align: left;
  padding: 10px 0 0 20px;
}
.foot_msg:last-child {
  padding-bottom: 10px;
}
@media print {
  input {
    display: none;
  }
  table{
    font-size: 100px;
  }
  
}
</style>
