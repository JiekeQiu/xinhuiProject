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
import { getAxios } from "../../../assets/js/base.js";

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
                let len = this.$store.state.list_msg.length
                let time = ''
                let date = null
                let timeStart = null
                let timeEnd = null
                if(this.$store.state.list_msg[0].time){
                    timeStart = this.$store.state.list_msg[len-2].time.substring(5,10).replace('-','月')+'日'
                    timeEnd = this.$store.state.list_msg[0].time.substring(5,10).replace('-','月')+'日'
                    time = this.$store.state.list_msg[0].time.substring(0,7).replace('-','年')
                    date = this.$store.state.list_msg[len-2].time.substring(0,7).replace('-','年')
                    console.log("查看这个",time,date)


                }else{
                    
                    time = this.$store.state.list_msg[0].date.substring(0,7).replace('-','年')
                    time = this.$store.state.list_msg[len-2].date.substring(0,7).replace('-','年')
                }
                let dataList = this.$store.state.list_msg
                console.log("datalist",dataList)
                let name=""
                for(let i=0;i<dataList.length-1;i++){
                    if(dataList[0].username==dataList[i].username){
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
                this.obj.date = date
                this.obj.times = time
                this.obj.title = title
                console.log("看看",this.obj)
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
            let obj = this.$store.state.search
            obj.title = this.$route.meta.title
            
            let jsonData = JSON.stringify(obj)

            // window.open(`http://localhost:18883/exportfile?data=${encodeURIComponent(jsonData)}`);//开发环境

            window.open(`http://47.122.37.166:18883/exportfile?data=${encodeURIComponent(jsonData)}`);//上线环境

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
