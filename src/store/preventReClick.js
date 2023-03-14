export default {
    install (Vue) {
      // 防重复点击(指令实现)

      console.log("查看",Vue)
      Vue.directive('preventReClick', {
        inserted (el, binding) {
          console.log("查看",el,binding)
          el.addEventListener('click', () => {
            if (!el.disabled) {
              el.disabled = true
              setTimeout(() => {
                el.disabled = false
              }, binding.value || 3000)
            }
          })
        }
      })
    }
  }