// 封装axios请求
import axios from 'axios';
const apiPrev = '/business-admin/';
export async function getAxios(url, params) {
    let data
    await axios.get(apiPrev + url, {
        params: params

    }).then(res => {
        data = res.data
        })
        return data
}

export async function postAxios(url, params) {
    let data 
    await axios.post(apiPrev + url, params).then((res) => {data = res.data})
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
    await axios.get(apiPrev + "/addhistory", {
        params: params
      }).then(res=>{
        // console.log(res)
      });    
}