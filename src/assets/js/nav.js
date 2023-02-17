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
        let routerData = this.$router.resolve({
            path: "/home/material"
        });
        window.open(routerData.href, "_blank");
    }else if(key == '2-1-2'){
        let routerData = this.$router.resolve({
            path: "/home/c"
        });
        window.open(routerData.href, "_blank");
    }else if(key == '4-1-1'){
        // let routerData = this.$router.resolve({
        //     path: "/home/bill/infolist"
        // });
        // window.open(routerData.href, "_blank");
        this.$router.push('/home/bill/infolist')

    }else if(key == '4-1-2'){
        // let routerData = this.$router.resolve({
        //     path: "/home/bill/infomoney"
        // });
        // window.open(routerData.href, "_blank");
        this.$router.push('/home/bill/infomoney')
    }else if(key == '4-1-3'){
        // let routerData = this.$router.resolve({
        //     path: "/home/bill/infomoney"
        // });
        // window.open(routerData.href, "_blank");
        this.$router.push('/home/bill/infomonthlist')
    }else if(key == '4-2-1'){
        // let routerData = this.$router.resolve({
        //     path: "/home/bill/infomoney"
        // });
        // window.open(routerData.href, "_blank");
        this.$router.push('/home/bill/billmoney')
    }
}