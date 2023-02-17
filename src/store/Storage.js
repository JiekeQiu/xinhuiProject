import {createStore} from "vuex"

const store = createStore({

    state(){
        return {
            str:"",
            flag:true,
            list_msg:[]
        }
    },
    mutations:{
        increment(state,sessionValue){
            state.str = sessionValue
        },
        increment1(state,val){
            console.log("测试一下vueX",val)
            state.flag = false;
            state.list_msg = val
            
        }
    }
})

export default store