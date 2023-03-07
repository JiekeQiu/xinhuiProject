// 实现菜单点击某条新页面跳转功能

export function heandleSelect(key, keyPath) {
    console.log(key)
    if (key == "1-1-1") {
        // 实现新页面跳转的功能
        let routerData = this.$router.resolve({
            path: "/home/received"
        });
        window.open(routerData.href, "_blank");
        // this.$router.push('/home/received')
    } else if (key == "1-1-2") {
        let routerData = this.$router.resolve({
            path: "/home/goodlist"
        });
        window.open(routerData.href, "_blank");
    }else if(key == '1-1-3'){
        let routerData = this.$router.resolve({
            path: "/home/inventory"
        });
        window.open(routerData.href, "_blank");
    }else if(key == '1-2-1'){
        let routerData = this.$router.resolve({
            path: "/home/output/cklist"
        });
        window.open(routerData.href, "_blank");
    }else if(key == '1-3-1'){
        let routerData = this.$router.resolve({
            path: "/home/messagelist"
        });
        window.open(routerData.href, "_blank");
    }else if(key == '2-1-1'){
        this.$router.push("/home/material/materiallist")
    }else if(key == '2-1-2'){
        this.$router.push("/home/material/materialhistory")
    }else if(key == '2-1-3'){
        this.$router.push("/home/material/materialgoods")
    }else if(key == '2-2-1'){
        this.$router.push("/home/material/delivery")
    }else if(key == '2-2-2'){
        this.$router.push("/home/material/deliveryhistory")
    }
    else if(key == '3-1-1'){
        this.$router.push("/home/hardware/hardwarelist")
    }else if(key == '3-1-2'){
        this.$router.push("/home/hardware/hardwarehistory")
    }else if(key == '3-1-3'){
        this.$router.push("/home/hardware/hardwaregoods")
    }
    else if(key == '4-1-1'){
        this.$router.push('/home/bill/infolist')

    }else if(key == '4-1-2'){
        this.$router.push('/home/bill/infomoney')
    }else if(key == '4-1-3'){
        this.$router.push('/home/bill/infomonthlist')
    }else if(key == '4-2-1'){
        this.$router.push('/home/bill/billmoney')
    }
}