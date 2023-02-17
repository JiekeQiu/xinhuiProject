<template>
  <div>
    <div>
      <h3>新辉眼镜有限公司</h3>
      <h5>原料入库单</h5>
      <div>
        <div>
          <span class="l frist">
            <h6>入库来源：</h6>
            <span>
              <el-form ref="form">
                <el-select
                  v-model="nameValue"
                  filterable
                  remote
                  reserve-keyword
                  placeholder="请输入入库来源"
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
              </el-form>
            </span>
          </span>
          <span class="last">
            <h6>入库日期：</h6>
            <div class="block">
              <el-date-picker
                v-model="value2"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </div>
          </span>
          <span class="r btn">
            <el-button size="default" @click="submit">数控录入</el-button>
            <el-button size="default">清空数据</el-button>
          </span>
        </div>
        <div>
          <el-form
            :model="productRuleForm"
            ref="productRuleForm"
            :rules="productRuleForm.rules"
            @keydown.enter="addTable"
          >
            <el-table :data="productRuleForm.tableData" border style="width: 100%">
              <el-table-column prop="date" label="序号" width="70">
                <template #default="scope">
                  <el-form-item :prop="'tableData.' + scope.$index + '.date'">
                    <el-input v-model.trim="scope.row.date"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="原料名称">
                <template #default="scope">
                  <el-form-item
                    :prop="'tableData.' + scope.$index + '.name'"
                    :rules="productRuleForm.rules.name"
                  >
                    <el-input v-model.trim="scope.row.name" autofocus></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="manufacturer" label="品牌" width="80">
                <template #default="scope">
                  <el-form-item
                    :prop="'tableData.' + scope.$index + '.manufacturer'"
                    :rules="productRuleForm.rules.manufacturer"
                  >
                    <el-input v-model.trim="scope.row.manufacturer"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="typeNmae" label="规格">
                <template #default="scope">
                  <el-form-item
                    :prop="'tableData.' + scope.$index + '.typeNmae'"
                    :rules="productRuleForm.rules.typeNmae"
                  >
                    <el-input v-model.trim="scope.row.typeNmae"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="classify" label="仓库归类" width="100">
                <template #default="scope">
                  <el-form-item
                    :prop="'tableData.' + scope.$index + '.classify'"
                    :rules="productRuleForm.rules.classify"
                  >
                    <el-input v-model.trim="scope.row.classify"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="unit" label="单位" width="80">
                <template #default="scope">
                  <el-form-item
                    :prop="'tableData.' + scope.$index + '.unit'"
                    :rules="productRuleForm.rules.unit"
                  >
                    <el-input v-model.trim="scope.row.unit"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="num" label="数量" width="170">
                <template #default="scope">
                  <el-form-item
                    :prop="'tableData.' + scope.$index + '.num'"
                    :rules="productRuleForm.rules.num"
                  >
                    <el-input v-model.trim="scope.row.num"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="address" label="仓位" width="180">
                <template #default="scope">
                  <el-form-item
                    :prop="'tableData.' + scope.$index + '.address'"
                    :rules="productRuleForm.rules.address"
                  >
                    <el-input v-model.trim="scope.row.address"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="remark" label="备注" width="170">
                <template #default="scope">
                  <el-form-item :prop="'tableData.' + scope.$index + '.remark'">
                    <el-input v-model.trim="scope.row.remark"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import base from "../assets/css/base.css";
export default {
  data() {
    return {
      productRuleForm: {
        tableData: [
          {
            date: "1",
            name: "",
            address: "",
            manufacturer: "",
            typeNmae: "",
            classify: "",
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
      dialogVisible: false,
      loading: false,
      nameValue: [],
      tableData: [],
      tableDataX: [],
      options: [],
      states: [],
      userName: "",

      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      value2: "",
      value1: ""
    };
  },
  mounted() {
    this.list = this.states.map(item => {
      return { value: `${item}`, label: `${item}` };
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

    // 添加一行(按回车键新建一行)
    addTable() {
      this.productRuleForm.tableData.push({
        date: "",
        name: "",
        address: "",
        manufacturer: "",
        typeNmae: "",
        classify: "",
        unit: "",
        num: "",
        remark: ""
      });

      for (let item in this.productRuleForm.tableData) {
        // 自动生成序号
        this.productRuleForm.tableData[item].date = item * 1 + 1;
        
      }
    },
    // 提交数据
    submit() {
      this.$refs["productRuleForm"].validate(valid => {
        if (valid) {
          console.log(valid);
          console.log(this.productRuleForm);
        } else {
          this.$alert("除备注外都需要填写", "温馨提示", {
            confirmButtonText: "确定"
          });
        }
      });
    }
  }
};
</script>
<style scoped>
.frist,
.last {
  width: 400px;
  height: 40px;
  text-align: left;
  position: relative;
}
.frist h6,
.last h6 {
  line-height: 40px;
  color: #000;
  font-weight: 900;
}
.frist span:last-child {
  display: block;
  height: 40px;
  width: 200px;
  position: absolute;
  top: 2px;
  left: 85px;
}
.block {
  position: absolute;
  top: 5px;
  right: 133px;
}
.btn {
  position: absolute;
  top: 150px;
  right: 300px;
}
</style>