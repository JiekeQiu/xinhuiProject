<template>
    <div id="content-container" direction="vartical">
        <div class="interval">
            <h2 class="container-row font_title">新辉眼镜有限公司</h2>
            <h3 class="font_subheading">材料入库单</h3>
        </div>
        <el-row>
            <el-col :span="16" :offset="4">
                <el-container class="container-row">
                    <div class="input-tip">来&emsp;源：</div>
                    <div class="input-field">
                        <el-input></el-input>
                    </div>
                    <div class="input-tip">操作人：</div>
                    <div class="input-field">
                        <el-input></el-input>
                    </div>
                    <div class="input-tip">时&emsp;间：</div>
                    <div class="input-field">
                        <el-input></el-input>
                    </div>
                </el-container>
                <div>
                    <el-container class="container-row">
                        <div class="input-tip">名&emsp;称：</div>
                        <div class="input-field">
                            <el-input></el-input>
                        </div>
                        
                        <div class="input-tip">规&emsp;格：</div>
                        <div class="input-field">
                            <el-input></el-input>
                        </div>
                        <div class="input-tip">单&emsp;位：</div>
                        <div class="input-field">
                            <el-input></el-input>
                        </div>
                        

                    </el-container>
                    <el-container class="container-row">
                        <div class="input-tip">单&emsp;价：</div>
                        <div class="input-field">
                            <el-input></el-input>
                        </div>
                        <div class="input-tip">数&emsp;量：</div>
                        <div class="input-field">
                            <el-input></el-input>
                        </div>
                        <div class="input-tip">金&emsp;额：</div>
                        <div class="input-field">
                            <el-input></el-input>
                        </div>
                        
                    </el-container>
                    <el-container>
                        <div class="input-tip">品&emsp;牌：</div>
                        <div class="input-field">
                            <el-input></el-input>
                        </div>
                        <div class="input-tip">仓&emsp;位：</div>
                        <div class="input-field">
                            <el-input></el-input>
                        </div>
                        <div class="input-tip">备&emsp;注：</div>
                        <div class="input-field">
                            <el-input></el-input>
                        </div>
                    </el-container>
                </div>
            </el-col>
            <el-col :span="2">
                <el-container class="container-row">
                    <el-container>
                        <el-button type="primary">数据提交</el-button>
                    </el-container>
                </el-container>
                <el-container class="container-row">
                    <el-container>
                        <el-button type="primary">清空数据</el-button>
                    </el-container>
                </el-container>
                <el-container class="container-row">
                    <el-container>
                        <el-button type="primary">批量入库</el-button>
                    </el-container>
                </el-container>
            </el-col>
            <el-col :span="6">
                <div style="height: 100px;"></div>
            </el-col>
        </el-row>
       
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    }
}
</script>