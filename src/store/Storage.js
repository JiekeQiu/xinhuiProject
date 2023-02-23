import {createStore} from "vuex"

const store = createStore({

    state(){
        return {
            str:"",
            flag:true,
            list_msg:[],
            time:{}
        }
    },
    mutations:{
        increment(state,sessionValue){
            state.str = sessionValue
        },
        increment1(state,val){
            state.flag = false;
            state.list_msg = val
        },
        isTime(state,val){
            console.log("测试一下vueX",val)
            state.time = val

        }
    }
})

export default store