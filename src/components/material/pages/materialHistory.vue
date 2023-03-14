<template>
  <div id="content-container" direction="vartical">
    <div class="interval">
      <h2 class="container-row font_title">新辉眼镜有限公司</h2>
      <h3 class="font_subheading">
        {{ $route.meta.title }}
      </h3>
    </div>
    <el-container class="container-row">
      <div class="input-tip">材料名称：</div>
      <div class="input-field">
        <el-input autofocus v-model="searchValue.name"></el-input>
      </div>
      <div class="input-tip">材料型号：</div>
      <div class="input-field">
        <el-input v-model="searchValue.typeName"></el-input>
      </div>
      <div class="input-tip"></div>
      <div class="input-field">
        <el-button type="primary" style="font-size: 16px; color: #000;" @click="search"
          :disabled="disabled">搜&emsp;索</el-button>
        <el-button type="primary" style="font-size: 16px; color: #000;" @click="back">返回详单</el-button>
      </div>
    </el-container>
    <el-table border :data="historyList">
      <el-table-column prop="time" label="时间" width="120"></el-table-column>
      <el-table-column prop="name" label="材料型号">
        <template #default="scope">
          <span v-if="scope.row.flag">
            <el-input v-model.trim="scope.row.name"></el-input>

          </span>
        </template>
      </el-table-column>
      <el-table-column prop="typeName" label="材料规格">
        <template #default="scope">
          <span v-if="scope.row.flag">
            <el-input v-model.trim="scope.row.typeName"></el-input>

          </span>
        </template>
      </el-table-column>
      <el-table-column prop="num" label="数量" width="80">
        <template #default="scope">
          <span v-if="scope.row.flag">
            <el-input v-model.trim="scope.row.num" @blur="calculate(scope.row)"></el-input>

          </span>
        </template>
      </el-table-column>
      <el-table-column prop="unit" label="单位" width="70"></el-table-column>
      <el-table-column prop="price" label="单价" width="70">
        <template #default="scope">
          <span v-if="scope.row.flag">
            <el-input v-model.trim="scope.row.price" @blur="calculate(scope.row)"></el-input>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="money" label="金额">
        <template #default="scope">
          <span v-if="scope.row.flag">
            <el-input v-model.trim="scope.row.money"></el-input>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="仓位" width="100">
        <template #default="scope">
          <span v-if="scope.row.flag">
            <el-input v-model.trim="scope.row.address"></el-input>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="来源" width="100">
        <template #default="scope">
          <span v-if="scope.row.flag">
            <el-input v-model.trim="scope.row.username"></el-input>

          </span>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="仓管" width="100"></el-table-column>
      <el-table-column prop="remark" label="备注">
        <template #default="scope">
          <span v-if="scope.row.flag">
            <el-input v-model.trim="scope.row.remark"></el-input>

          </span>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)" :disabled="scope.row.flag">编辑</el-button>
          <el-button size="small" @click="save(scope.row, scope.$index)"
            :disabled="scope.row.flag ? false : true">保存</el-button>
          <el-button size="small" type="danger" @click="deleteEdit(scope.row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
    <div>
      <el-pagination id="page" background layout="prev, pager, next" prev-text='上一页' next-text="下一页"
        @current-change="pageChange" :total="total" :default-page-size='pageSize'>
      </el-pagination>
    </div>
  </div>
</template>
<script>
import '@/assets/css/commo.css'
import { getAxios } from '@/assets/js/base'
export default {
  data() {
    return {
      historyList: [],//渲染列表
      searchValue: {
        name: "",
        typeName: ""
      },
      total: 0,//总条数
      pageIndex: 1,//当前页数
      pageSize: 10,//一页展示10条
      isSearch: false,
      DataAll: []
    }
  },
  created() {
    // 渲染页面
    this.RenderList()
  },
  methods: {
    // 打开编辑
    handleEdit(row) {
      row.flag = !row.flag
      console.log(row)
    },
    // 失去焦点计算总价
    calculate(row) {

      let AllMoney = row.num * row.price
      AllMoney.toFixed(2)
      // console.log("看看",AllMoney)
      row.money = AllMoney
    },
    // 保存更改
    save(row, idx) {
      // 拿到修改前的数据
      let list = JSON.parse(sessionStorage.getItem("historyList"))
      let obj = list[idx]
      delete obj.flag
      delete row.flag
      let pre_edit = JSON.stringify(obj)
      let end_edit = JSON.stringify(row)
      console.log('保存后的', pre_edit)
      console.log('保存后的', end_edit)

      if (pre_edit == end_edit) {
        console.log("没修改")

        this.$confirm(`内容没有修改，不能保存！`)
          .then(() => {
            console.log("内容没有修改", row)
          })
          .catch(() => {
            // catch error
          })
      } else {
        console.log("有修改")
        getAxios("editmaterialhistory", row).then(res => {
          console.log(res)
          if (res.state == 200) {
            this.RenderList()
            this.message(res.msg, "success")
          } else {
            this.message(res.msg, "warning")
          }
        })
      }

    },
    // 删除
    deleteEdit(row) {
      this.$confirm(`删除有风险，是否需要删除？`, "警告提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          getAxios("deletematerial", { _id: row._id, name: row.name, typeName: row.typeName, num: row.num}).then(res => {
            if (res.state == 200) {
              // 重新渲染页面
              this.RenderList()
              this.message(res.msg, 'success')
            } else {
              this.message(res.msg, "error")
            }
          })
        })
        .catch(() => {
          // catch error
          this.message('取消删除', 'success')

        })

    },
    // 点击页码跳转页面
    pageChange(pageIndex) {
      // this.historyList=[]
      let _that = this;
      if (this.isSearch) {
        if (_that.DataAll) {
          if (_that.pageIndex) {
            _that.pageIndex = pageIndex
          }
          _that.historyList = _that.DataAll.slice((_that.pageIndex - 1) * _that.pageSize, _that.pageIndex * _that.pageSize)
        }
      } else {
        if (_that.historyList) {
          if (_that.pageIndex) {
            _that.pageIndex = pageIndex
          }
          let param = {
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
            type: 2
          }
          getAxios('materialgood', param).then(res => {
            if (res.state == 200) {
              _that.historyList = res.res
            }
          })

        }
      }
    },
    // 搜索
    search() {
      this.isSearch = true
      this.total = 0
      getAxios("materialsearch", this.searchValue).then(res => {
        if (res.state == 200) {
          this.historyList = []
          this.DataAll = []
          this.DataAll = res.res
          this.total = res.res.length
          this.historyList = this.DataAll.slice((this.pageIndex - 1) * this.pageSize, this.pageIndex * this.pageSize)
          // this.historyList = res.res

        } else {
          this.message(res.msg, "error")
          this.historyList = []
        }
      })
    },
    // 返回详单
    back() {
      this.isSearch = false
      this.total = 0
      this.RenderList()
    },
    // 封装消息提醒
    message(msg, type) {
      this.$message({
        message: msg,
        type: type,
        duration: 4000
      })

    },

    // 封装渲染列表
    RenderList() {
      getAxios("materialgood", {
        type: 2,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }).then(res => {
        console.log("有没有执行这里",res)
        if (res.state == 200) {
          let list = []
          res.res.forEach(item => {
            item.flag = false
            list.unshift(item)
          })
          this.total = res.count
          this.historyList = list.slice((this.pageIndex - 1) * this.pageSize, this.pageIndex * this.pageSize)
          
          
          sessionStorage.setItem("historyList", JSON.stringify(list))

        }
      }).catch(err=>{
        console.log("出错了")
      })

    },
  },

  computed: {
    disabled() {
      return this.searchValue.name.length == 0 && this.searchValue.typeName.length == 0
    }
  }

}
</script>
<style></style>