import { App } from 'vue'
// 导入所有base-ui注册的组件
import baseComponents from '@/base-ui/index'

export default {
  install (app: App) {
    /* 注册全局组件 */
    for (const [key, value] of Object.entries(baseComponents)) {
      const name = `Def${key}`
      app.component(name, value)
    }
    /* 封装一些全局方法挂在组件实例上 */
    // 函数防抖 - 输入框
    app.config.globalProperties.$debounce = function (fn: any, delay: number): any { // fn = test
      let timerId: number | null | undefined = null
      return (...args: any) => {
        timerId && clearTimeout(timerId)
        timerId = window.setTimeout(() => {
          fn.apply(this, args)
        }, delay || 1000)
      }
    }
    // 函数节流 - onscroll/onresize
    app.config.globalProperties.$throttle = function (fn: any, delay: number): any { // fn = test
      let timerId: number | null | undefined = null
      let flag = true
      return (...args: any) => {
        if (!flag) { return }
        flag = false
        timerId && clearTimeout(timerId)
        timerId = window.setTimeout(() => {
          flag = true
          fn.apply(this, args)
        }, delay || 1000)
      }
    }
    /**
     * @param fmt 格式要求：datetime / date / time  完整值: yyyy-MM-dd hh:mm:ss
     * @param date 传入时间
     * @param flag true: 中文 / 不传或false: 英文
     * @returns {string}
     */
    app.config.globalProperties.$formatDate = (fmt: string, date: Date, flag: boolean): string => {
      flag = flag || false
      if (fmt === 'datetime') {
        fmt = flag ? 'yyyy年MM月dd日 hh时mm分ss秒' : 'yyyy-MM-dd hh:mm:ss'
      } else if (fmt === 'date') {
        fmt = flag ? 'yyyy年MM月dd日' : 'yyyy-MM-dd'
      } else if (fmt === 'time') {
        fmt = flag ? 'hh时mm分ss秒' : 'hh:mm:ss'
      } else if (fmt === 'timeNoSecond') {
        fmt = flag ? 'hh时mm分' : 'hh:mm'
      } else if (fmt === 'datetimeString') {
        fmt = flag ? 'yyyy年MM月dd日 hh时mm分ss秒' : 'yyyyMMddhhmmss'
      }
      const obj: any = {
        'y+': date.getFullYear(),
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds() // 秒
      }
      // 2.1遍历取出所有的时间
      for (const key in obj) {
        // let reg = new RegExp("M+");
        const reg = new RegExp(`${key}`)
        // 取出格式化字符串中对应的格式字符 MM dd hh mm ss
        let fmtStr: any = fmt.match(reg)
        if (fmtStr) {
          fmtStr = fmtStr[0]
          // 单独处理一位或者两位的时间
          if (fmtStr!.length === 1) {
            // 一位
            fmt = fmt.replace(fmtStr, obj[key])
          } else {
            // 两位
            let numStr = '00' + obj[key]
            // "00" + 4 = "004"
            // "00" + 23 = "0023"
            if (fmtStr!.length === 4) {
              numStr = numStr.substr((obj[key] + '').length - 2)
            } else {
              numStr = numStr.substr((obj[key] + '').length)
            }
            fmt = fmt.replace(fmtStr, numStr)
          }
        }
      }
      // 3.将格式化之后的字符串返回
      return fmt
    }
    /**
     * @param list 数据列表
     * @param attr 排序属性 / 没有则为null
     * @param flag 默认为降序 / flag === true为升序
     */
    app.config.globalProperties.$sortList = (list: any[], attr?: string, flag?: boolean): any => {
      flag = flag || false
      list.sort((a, b) => {
        if (attr) {
          return flag ? (a[attr] < b[attr] ? -1 : 1) : (a[attr] < b[attr] ? 1 : -1)
        } else {
          return flag ? (a < b ? -1 : 1) : (a < b ? 1 : -1)
        }
      })
    }
  }
}
