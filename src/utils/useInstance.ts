export function useInstance (getCurrentInstance: any) {
  return getCurrentInstance()?.appContext.config.globalProperties
}
/*
使用：

import { onMounted, getCurrentInstance } from 'vue'
import { useInstance } from '@/utils/useInstance'

onMounted(() => {
    // 传入getCurrentInstance方法过去可以拿到当前注册在实例上的自定义方法
    const { $throttle } = useInstance(getCurrentInstance)
})

*/
