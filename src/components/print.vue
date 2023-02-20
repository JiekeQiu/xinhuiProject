<template>
  <div class="poput-box" style="width:1104px">
    <form class="form-print" id="test">
      <img src="../assets/images/logo1.jpg" class="l zp" style="width:300px;height:80px" title="这里是logo">
      <div class="title-print">
        <p class="custom-h3">鹰潭新辉眼镜有限公司</p>
        <div class="gsmsg" style="font-size:20px">
          <p style="height:30px;line-height:30px;">地址：江西省鹰潭市余江区眼镜工业园四期</p>
          <p>电话：15170100003</p>
        </div>
        <div class="msg">
          <div class="l uu" style="width:1000px;font-size:18px">
            <p style="width:200px;text-align:left;margin:0 0 10px 0">客戶名称：{{ tableMsg.name }}</p>
            <div class="hhh" style="width:900px;text-align:left;padding-left:30px">
              <span>地址：{{ tableMsg.address }}</span>
              <span style="padding-left:48px" class="ls">电话：{{ tableMsg.phone }}</span>
            </div>
          </div>
          <div class="custom-h2" style="width:400px;text-align:center;left:30%">产品出库单</div>
          <div class="r tdate" style="width:300px">
            <p style="font-size:20px;height:35px">NO:{{ tableMsg.No }}</p>
            <p>送货日期：{{ tableMsg.date }}</p>
          </div>
        </div>
      </div>
      <div class="print-teb">
        <div class="cg" style="font-size:18px">
          <p style="height:100px">①白存根</p>
          <p style="height:100px">②红客户</p>
          <p>③黄回单</p>
        </div>
        <table class="print-teb ma-padd" cellspacing="0">
          <tr>
            <td class="tb1">序号</td>
            <td class="tb2" style="width:180px">产品名称</td>
            <td class="tb3">产品规格</td>
            <td class="tb4">单位</td>
            <td class="tb5">产品数量</td>
            <td class="tb6">单价</td>
            <td class="tb7">金额</td>
            <td class="tb8">备注</td>
          </tr>
          <tr v-for="(data, idx) in tableData" :key="idx" style="height:30px">
            <td>{{ data.date }}</td>
            <td>{{ data.name }}</td>
            <td>{{ data.typeNmae }}</td>
            <td>{{ data.unit }}</td>
            <td>{{ data.num }}</td>
            <td>{{ data.money }}</td>
            <td>{{ data.All }}</td>
            <td>{{ data.remark }}</td>
          </tr>
          <tr v-for="len in lenData" v-show="show" style="height:30px">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
        <ul class="m" style="font-size:18px">
          <li class="l" style="width:600px;text-align:left">合计金额（大写）：{{ AllMoney }}</li>
          <li class="r add" style="width:250px;text-align:center;">（小写）：￥{{ tableMsg.AllMoney }}</li>
        </ul>
        <ul class="foot">
          <ul class="zs" style="width:1000px;text-align:left;font-size:16px">注：以上货品请核对数量，如有质量问题，请在收货后3天内通知本公司，逾期恕不负责。</ul>
          <ul class="cx" style="font-size:16px;width:700px">
            <li class="l" style="width:320px; height:60px,margin-bottom:10px">送货单位及经手人（盖章）：{{ tableMsg.lister }}</li>
            <li class="r ccc" style="width:300px;">收货单位及经手人（盖章）：</li>
          </ul>
        </ul>
      </div>
    </form>
    <div class="footer-bot">
      <!-- <button id="but1">导出</button> -->
      <button @click="print">预览打印</button>
      <button @click="back">取消</button>
    </div>
  </div>
</template>
<script>
import '../assets/css/comm.css'
import print from "print-js";
import { convertCurrency } from "../assets/js/convertCurrency.js";
import { getAxios } from "../assets/js/base.js";
export default {
  data() {
    return {
      tableData: [],
      tableMsg: [],
      AllMoney: "",
      // 缺少表格的长度
      lenData: [],
      show: true
    };
  },
  mounted() {
    let str = sessionStorage.getItem("str");
    let data = JSON.parse(str)[0];
    let obj = JSON.parse(data.tableData);
    this.tableData = obj;
    this.tableMsg = data;
    // 如果tableData的长度小于10就补齐表格
    console.log(this.tableData.length);
    if (this.tableData.length <= 8) {
      let len = 8 - this.tableData.length;
      for (let i = 0; i <= len; i++) {
        this.lenData.length = i;
      }
      console.log(this.lenData);
    } else if (this.tableData.length > 8) {
      // let len = 8-this.tableData.length%8
      //    for(let i=0;i<=len;i++){
      //      this.lenData.length =i
      //    }
    }
    // 转换大小写
    this.AllMoney = convertCurrency(this.tableMsg.AllMoney);

    console.log(this.tableMsg.AllMoney);
  },
  methods: {
    // 打印
    print() {
      // this.$Print('form')
      printJS({
        printable: "test",
        showModal: true,
        type: "html",
        style: `@page {margin:0 10mm};}`,// 打印时去掉眉页眉尾
        header: "",
        headerStyle: ";", //标题样式
        scanStyles: true,
        css: '/comm.css', //css外部url
        targetStyles: ["padding-top", "border-bottom"],
        // targetStyles:['*'],
        documentTitle: false, //页头标题
        honorColor: true, //是否打印彩色
        maxWidth: "100%",
        font_size: "", //打印字体大小 12pt = 16px    9pt = 12px   13.5pt = 18px   10.5pt = 14px
        font: '"宋体","新宋体"', //打印使用字体
        repeatTableHeader: true,
        ignoreElements: ["no-print"] || [], // ['no-print']
        properties: null,
        onPrintDialogClose: this.callback,
        onError: this.err
      });
    },
    // 返回出库首页
    back() {
      // this.$router.push("/home/output/cklist");
      sessionStorage.removeItem("str");
      
        window.close();
      // }

    },
    // 离开打印页面的回调
    callback() {
      this.tableMsg.status = "已打印";
      let status = this.tableMsg.status
      let No = this.tableMsg.No
      let params = {
        No: No,
        status: status
      }
      console.log("执行回调", this.tableMsg)
      getAxios('/update', params).then(res => {
        console.log(res.status)
        if (res.status == 202) {
          this.$router.push("/home/output/cklist")
          this.$alert("打印成功", "温馨提示", {
            confirmButtonText: "确定"
          })
        } else if (res.status == 203) {
          this.$router.push("/home/output/cklist")
          this.$alert("已经打印过了", "温馨提示", {
            confirmButtonText: '确定'
          })
        }
      })
    },
    // 发生错误执行的回调
    err() {
      console.log("出错了")
    }
  }
};
</script>
<style scoped>
/* @import "../assets/css/comm.css"; */
/* .form-print {
    padding: 10px 20px;
  padding-bottom: 80px;
  position: relative;
}
.custom-h3 { text-align: center; margin-top: 6px; font-size:24px;letter-spacing:2px;} */
</style>
