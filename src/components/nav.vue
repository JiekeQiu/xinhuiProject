<template>
  <div>
    <el-menu
      :default-active="$route.path"
      class="el-menu-demo"
      mode="vertical"
      @select="heandleSelect"
    >
      <navcomt :data="finished"></navcomt>
      <navcomt title="原料仓库" :data="RM"></navcomt>
      <navcomt title="五金仓库" :data="wujin"></navcomt>
      <navcomt title="账单" :data="bill"></navcomt>
      <!-- <el-menu-item index="5" disabled>五金仓库</el-menu-item> -->
      <!-- <navcomt title="基础信息" :data="basics"></navcomt> -->
    </el-menu>
    <!-- <div class="h-6"></div> -->
  </div>
</template>
<script>
import navcomt from "./navComt";
import { ref } from "vue";
import { login } from "@/assets/js/base";
import { heandleSelect } from "../assets/js/nav";
export default {
  data() {
    return {
      // activeIndex: 1,
      // activeIndex2: 1,
      finished: [
        [
          { name: "产品入库" },
          { name: "入库单" },
          { name: "入库明细" },
          { name: "库存盘点" }
        ],
        [
          { name: "产品出库" },
          { name: "出库单" },
          { name: "出库明细" },
          // { name: "账单" }
        ],
        [
          {name:"基础信息"},
          {name:"客户信息"}
        ],
      ],
      RM: [
        [{ name: "原料入库" }, { name: "入库单" }, { name: "入库明细" }],
        [{ name: "原料出库" }, { name: "出库单" }, { name: "出库明细" }]
      ],
      wujin: [
        [{ name: "五金入库" }, { name: "入库单" }, { name: "入库明细" }],
        [{ name: "五金出库" }, { name: "出库单" }, { name: "出库明细" }]
      ],
      bill:[
        [{name:'对账单'},{name:"客户详单"},{name:"客户订单金额"},{name:"客户月详单"}],
        [{name:'送货汇总'},{name:"客户订单总金额汇总"},{name:"客户产品订单汇总"},{name:"产品订单汇总"},{name:"客户月账单汇总"}]
      ],
      basics: [[{ name: "客户名片" }]]
    };
  },
  components: {
    navcomt
  },

  methods: {
    //点击菜单栏某一条打开相应页面
    heandleSelect

    // heandleSelect(key, keyPath) {
    //   // 判断有没有登陆
    //   login().then(res => {
    //     if (res) {
    //       if (key == "1-1-1") {
    //         // 实现新页面跳转的功能
    //         let routerData = this.$router.resolve({
    //           path: "/home/received"
    //         });
    //         window.open(routerData.href, "_blank");
    //         // this.$router.push('/home/received')
    //       } else if (key == "1-1-2") {
    //         let routerData = this.$router.resolve({
    //           path: "/home/goodlist"
    //         });
    //         window.open(routerData.href, "_blank");
    //       }
    //     } else {
    //       this.$router.push("/login");
    //     }
    //   });
    // }
  }
};
</script>