<template>
    <div style="background-color:#fff">
        <el-tabs
            v-model="editableTabsValue"
            type="card"
            class="demo-tabs"
            closable
            @tab-remove="removeTab"
            @tab-click="handleClick"
        >
            <el-tab-pane
                v-for="item in editableTabs"
                :key="item.name"
                :label="item.title"
                :name="item.name"
                >
            </el-tab-pane>
        </el-tabs>
       
    </div>
</template>
<script>
export default {
    
    data(){
        return {
            editableTabsValue:'',
            editableTabs:[]
        }
    },
    methods:{
        removeTab(targetName){
            let tabs = this.editableTabs
            let activeName = this.editableTabsValue;
            if(this.editableTabs.length>1){
                if(activeName==targetName){
                    tabs.forEach((tab,idx)=>{
                        if(tab.name==targetName){
                            let nextTab = tabs[idx+1] || tabs[idx-1]
                            if(nextTab){
                                activeName=nextTab.name
                            }

                        }
                    })
                };
                this.editableTabsValue = activeName;
                this.editableTabs = tabs.filter(tab=>{
                    return tab.name !== targetName
                })
                // 删除后同步页面
                this.$router.push({name:this.editableTabs[this.editableTabs.length-1].name}) 
            }
        },
        handleClick(tab){
            this.$router.push({name:tab.props.name})
        },
        // 设置标签页
        setTags(route){
            const isExist = this.editableTabs.some(item=>{
                 return item.path === route.fullPath;
            })
            
            if(!isExist){
                if(this.editableTabs.length>=8){
                    this.editableTabs.shift()
                }
                if(route.matched.length==1){
                    return
                }else{
                    this.editableTabs.push({
                        title: route.meta.title,
                        path: route.fullPath,
                        name: route.matched[2].name,
                    })
                }
                
                if(this.editableTabs.length==1){
                    return
                }else{
                    let editableTabs = JSON.stringify(this.editableTabs)
                    localStorage.setItem("editableTabs",editableTabs)

                }
            }
            // this.$emit('tags',this.editableTabs)
        },
       

    },
    watch:{
        $route(newValue,oldValue){
            
            this.setTags(newValue)
            this.editableTabsValue = newValue.name
        },
        editableTabs:{
            handler(newValue,oldValue){
                let editableTabs = JSON.stringify(newValue)
                localStorage.setItem("editableTabs",editableTabs)
            }
        }
    },
    created() {
        this.setTags(this.$route)
    },
    mounted() {
        let editableTabs = JSON.parse(localStorage.getItem("editableTabs"))
        let thisEditableTabs = this.editableTabs
        if(thisEditableTabs.length==1 && editableTabs==null){
            return 
        }else if(editableTabs.length>1){
            this.editableTabs = editableTabs
        }
    },
   
}
</script>
<style scoped>
    .tags_r{
        position: absolute;
        top:0px;
        right: 10px;
        color: #000;
        /* height: 30px; */
        width: 100px;
        background-color: #409EFF;
        margin: 5px 0;
        border-radius: 3px;
    }
    .title{
        display: block;
        height: 30px;
        line-height: 30px;
    }
</style>
