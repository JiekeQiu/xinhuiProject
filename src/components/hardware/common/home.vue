<template>
    <div>
        <t-header></t-header>
        <div class="msg_msg">
                <router-view></router-view>
        </div>
    </div>
</template>
<script>
import tHeader from "../../bill/common/tags.vue"
export default {
    components:{
        tHeader,
    },
    data(){
        return {
            
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