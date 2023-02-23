<template>
    <div>
        <t-header></t-header>
        <el-container class="top_btn">
            <div class="btn_select" @click="search">
                <el-icon><Search /></el-icon>
                <div>搜索</div>
            </div>
            <div class="btn_select" @click="download">
                <el-icon><Download /></el-icon>
                <div>导出</div>
            </div>
            <div class="btn_select" @click="print">
                <el-icon><Printer /></el-icon>
                <div>打印</div>
            </div>
        </el-container>
        <el-container v-show="flag">
            <ceprint :list="obj" @back_flag="back"></ceprint>
        </el-container>
        <!-- <el-container> -->
            <div class="msg_msg">
                    <!-- <router-view  v-slot="{ Component }">
                    <keep-alive :include="editableTabs">
                        <component :is="Component"></component>
                    </keep-alive>
                    </router-view> -->
                <router-view></router-view>
            </div>
        <!-- </el-container> -->

    </div>
</template>
<script>
import tHeader from "./tags.vue"
import ceprint from "./print.vue"

import print from "print-js";
export default {
    components:{
        tHeader,
        ceprint
    },
    data(){
        return {
            editableTabs:[],
            flag:false,
            obj:{
                username:'',
                time:'',
                name:'',
                date:''
            }
        }
    },
    methods: {
        // 调出搜索框
        search(){
            
            this.$store.state.flag = true
            // let username = localStorage.getItem("msg")
            console.log("这个是",this.$route.meta.title)
            

        },
        // 调出打印框
        print(){
            // if(this.$route.meta.title=="客户详单"){
                this.flag = !this.flag
                let user = localStorage.getItem("user")
                let username = JSON.parse(user).username
                this.obj.username = username
                console.log("看看电视",this.$store.state)
                let len = this.$store.state.list_msg.length
                let time = ''
                let date = null
                let timeStart = null
                let timeEnd = null
                if(this.$store.state.list_msg[0].time){
                    timeStart = this.$store.state.time.timeStart.substring(5,10).replace('-','月')+'日'
                    timeEnd = this.$store.state.time.timeEnd.substring(5,10).replace('-','月')+'日'
                    console.log("可以这个拿到时间数据",timeEnd)

                //    time = this.$store.state.list_msg[0].time.substring(0,7).replace('-','年')
                //     date = this.$store.state.list_msg[len-2].time.substring(0,7).replace('-','年')

                }else{
                    
                    // time = this.$store.state.list_msg[0].date.substring(0,7).replace('-','年')
                    // date = this.$store.state.list_msg[len-2].date.substring(0,7).replace('-','年')
                }
                let dataList = this.$store.state.list_msg
                console.log("datalist",dataList.length)
                let name=""
                for(let i=0;i<dataList.length-1;i++){
                    if(dataList[0].username==dataList[i].username){
                    console.log("data")
                       name = dataList[0].username
                    }else{
                        console.log("看技术")
                        return name = ''
                    }
                }
                // let name = this.$store.state.list_msg[0].username
                let title = this.$route.meta.title
                this.obj.time = timeStart
                this.obj.name = name
                this.obj.timeEnd = timeEnd
                this.obj.title = title
            // }else if(this.$route.meta.title=="客户订单金额"){

            // }
            // console.log("看看",this.$store.state.list_msg[5].time.substring(0,7).replace('-','年'))
            

        
        },
        // 传递状态，关闭打印框
        back(val){
            console.log("状态",val)
            this.flag = val
        },
        // 导出表格
        download(){
            let jsonData = this.$store.state.list_msg
            
             // 列标题
        let str = '<caption>鹰潭市新辉眼镜有限公司</caption><tr><td>序号</td><td>产品</td><td>邮箱</td></tr>';
        // 循环遍历，每行加入tr标签，每个单元格加td标签
        for(let i = 0 ; i < jsonData.length ; i++ ){
            str+='<tr>';
            for(const key in jsonData[i]){
                // 增加  为了不让表格显示科学计数法或者其他格式
                str+=`<td>${ jsonData[i][key] + '  '}</td>`;    
            }
            str+='</tr>';
        }
        // Worksheet名
        const worksheet = 'Sheet1'
        const uri = 'data:application/vnd.ms-excel;base64,';
  
        // 下载的表格模板数据
        const template = `<html xmlns:o="urn:schemas-microsoft-com:office:office"
        xmlns:x="urn:schemas-microsoft-com:office:excel"
        xmlns="http://www.w3.org/TR/REC-html40">
        <head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
        <x:Name>${worksheet}</x:Name>
        <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
        </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
        </head><body><table>${str}</table></body></html>`;
        let base64 = s => window.btoa(unescape(encodeURIComponent(s)));

        // 下载模板
        window.location.href = uri + base64(template);
        // 输出base64编码
        }
    },
    
}
</script>
<style scoped>
    
    .top_btn{
        margin-top:-10px;
        margin-bottom: 20px;
        padding: 10px;
        background-color:#fff
    }
    .btn_select{
        width:60px;
        color:#000;
        font-size: 14px;
    }
    .btn_select:hover{
        color:blue
    }
</style>
