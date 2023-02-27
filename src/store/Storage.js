import {createStore} from "vuex"

const store = createStore({

    state(){
        return {
            str:"",
            flag:true,
            list_msg:[],
            time:{},
            search:{}
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
            state.time = val

        },
        search(state,val){
            console.log("测试一下vueX",val)
            state.search = val
        }
    }
})

export default store