// 封装axios请求
import axios from 'axios';
export async function getAxios(url, params) {
    let data
    await axios.get(url, {
        params: params

    }).then(res => {
        data = res.data
        })
        return data
}

export async function postAxios(url, params) {
    let data 
    await axios.post(url, params).then((res) => {data = res.data})
    return data
}

export async function login(){
    let data
    let res = localStorage.getItem("user");
      if (!res) {
      res = {};
    } else {
      data =await JSON.parse(res);
    
    }
   return data
}


// 封装入库的历史记录
export async function historyList(params){
    await axios.get("/addhistory", {
        params: params
      }).then(res=>{
        // console.log(res)
      });    
}