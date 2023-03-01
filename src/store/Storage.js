import {createStore} from "vuex"

const store = createStore({

    state(){
        return {
            str:"",
            flag:true,
            list_msg:[],
            time:{},
            search:{},
            listMsg:[]
        }
    },
    mutations:{
        increment(state,sessionValue){
            state.str = sessionValue
        },
        increment1(state,val){
            state.flag = false;
            state.list_msg = val
            console.log("导出",val)
        },
        increment3(state,val){
            state.flag = false;
            state.listMsg = val
        },
        isTime(state,val){
            state.time = val 

        },
        search(state,val){
            console.log("测试一下vueX",val)
            state.search = val
        }
    }
})

export default store