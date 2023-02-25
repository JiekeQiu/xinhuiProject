<template>
  <div class="info_search">
    <div class="box">
      <span class="title">{{title}}</span>
      <el-form
                label-width="100px"
                :model="formLabelAlign"
                style="max-width: 340px;"
            >
                <el-form-item label="客户名称">
                    <el-select
                     v-model="formLabelAlign.username"
                     placeholder="请输入客户名称"
                     filterable
                     clearable
                     @focus="queryList"
                    >
                        <el-option 
                          v-for="item in username_list"
                          :label="item.name"
                          :value="item.value"
                          :key="item.name"
                        />
                        
                    </el-select>
                </el-form-item>
                <el-form-item label="送货单号" v-if="this.title!='客户订单总金额'">
                    <el-input placeholder="请输入单号" v-model="formLabelAlign.No" style="width:215px"></el-input>
                </el-form-item>
                <el-form-item label="产品名称" v-if="this.title=='客户详单'">
                    <el-select v-model="formLabelAlign.name" filterable clearable placeholder="请输入产品名称" @focus="produce">
                        <el-option
                          v-for="item in name_list"
                          :Key="item.name"
                          :value="item.name"
                          :label="item.name"
                          
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="产品规格" v-if="this.title=='客户详单'">
                    <el-select v-model="formLabelAlign.type" filterable clearable placeholder="请输入产品规格" @focus="produce">
                        <el-option
                         v-for="item in type_list"
                         :value="item.typename"
                         :key="item.name"
                         :label="item.typename"
                         

                         />
                    </el-select>
                </el-form-item>
                <el-form-item label="送货日期">
                    <el-date-picker
                        v-model="formLabelAlign.timeStart"
                        type="date"
                        placeholder="开始日期"
                        style="width: 47%"
                        value-format="YYYY-MM-DD"
                    ></el-date-picker>&nbsp;-
                    <el-date-picker
                        v-model="formLabelAlign.timeEnd"
                        type="date"
                        placeholder="结束日期"
                        style="width: 47%"
                        value-format="YYYY-MM-DD"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item class="btn">
                    <el-button type="primary" plain @click="btn" :disabled="disabled">确定</el-button>                    
                    <el-button type="info" plain @click="show">取消</el-button>                    
                </el-form-item>
      </el-form>
      
    </div>
  </div>
</template>
<script>
import { getAxios } from "../../../assets/js/base.js";
export default {
  data() {
    return {
      title: this.$route.meta.title,
      formLabelAlign: {
        username: "",
        name: "",
        type: "",
        No:'',
        // timeStart:"2022-08-30",
        // timeEnd: "2022-09-27",
        timeStart:null,
        timeEnd: null,
        // flag:true
      },
      username_list: [],
      name_list:[],
      type_list:[],
    //   flag: true
    };
  },
//   利用计算属性禁用提交
  computed:{
      disabled(){
          return (
            this.formLabelAlign.username==""&&this.formLabelAlign.name==""&&
            this.formLabelAlign.type==""&&this.formLabelAlign.No==""&&
            this.formLabelAlign.timeStart==null&&this.formLabelAlign.timeEnd==null
          )
      }
  },
  methods: {
    //   显示隐藏搜索
    show() {
    //   this.formLabelAlign.flag = false;
    //   this.$emit("show", this.formLabelAlign.flag);
        this.$store.commit("increment1")
    },
    // 获取焦点——获取客户的下拉内容
    queryList(){
        // console.log("获取客户",searchMsg)
        let info = localStorage.getItem("info")
        if(info){
            let info_arr = JSON.parse(info)
            this.username_list = info_arr
        }else{
            getAxios("/billsearch",{info:"1"}).then(res=>{
                let info = JSON.stringify(res.arr)
                localStorage.setItem("info",info)
                this.username_list = res.arr
                
            })

        }
    },
    // 获取焦点——获取产品的下拉内容
    produce(){
        // 先判断本地有没有产品名称和规格
        let info_msg = localStorage.getItem("info_name");
        let info_typename = localStorage.getItem("info_typename")
        if(info_msg&&info_typename){
            let info_name = JSON.parse(info_msg)
            let info_type = JSON.parse(info_typename)
            this.name_list = info_name
            this.type_list = info_type
        }else{
            // console.log("没有info_msg")
            getAxios("/billsearch",{info:"2"}).then(res=>{
                    let info_msg = []
                    // 过滤重复的项
                   let mapName = new Map();
                   for(let item of res.arr){
                       if(!mapName.has(item.name)){
                           mapName.set(item.name,item)
                       }
                   }
                  let info_name = [...mapName.values()]
                    this.name_list = info_name
                  let mapTypeName = new Map();
                  for(let item of res.arr){
                      if(!mapTypeName.has(item.typename)){
                          mapTypeName.set(item.typename,item)
                      }
                  }
                  let info_typename = [...mapTypeName.values()]
                    this.type_list = info_typename
                    let info_nameMsg =JSON.stringify(info_name)
                    let info_typenameMsg = JSON.stringify(info_typename)
                    localStorage.setItem("info_name",info_nameMsg)
                    localStorage.setItem("info_typename",info_typenameMsg)
            })

        }
    },
    // 提交搜索
    btn(){
        // 过滤为空和null的数据
        for(let key in this.formLabelAlign){
            // console.log(this.formLabelAlign[key])
            if(this.formLabelAlign[key]==""||this.formLabelAlign[key]==null){
                delete this.formLabelAlign[key]
            }
        }

        this.$emit("search",this.formLabelAlign)
        console.log("搜索内容",this.formLabelAlign)
        this.$store.commit("search", this.formLabelAlign)

    }
  },
 
};
</script>
<style scoped>
.info_search {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 100;
  display: flex;
}
.box {
  width: 350px;
  /* height: 350px; */
  background-color: #fff;
  margin: auto;
  padding: 20px;
}
.title {
  text-align: left;
  width: 100%;
  display: inline-block;
  padding-bottom: 20px;
}
.btn {
  margin-top: 30px;
  margin-left: 10px;
}
</style>