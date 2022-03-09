/**
 * 监听事件-兼容写法
 * @param el 操作的元素
 * @param type 事件名称
 * @param handler 事件处理函数
 */
export const addEvent = (el: HTMLElement | Window | any, type: string, handler: any) => {
  if (el.addEventListener) { // dom2
    el.addEventListener(type, handler, false)
  } else if (el.attachEvent) { // IE方式
    el.attachEvent('on' + type, () => {
      handler.call(el)
    })
  } else {
    el['on' + type] = handler // dom0
  }
}
/**
 * 移除监听事件-兼容写法
 * @param el 操作的元素
 * @param type 事件名称
 * @param handler 事件处理函数
 */
export const removeEvent = (el: HTMLElement | any, type: string, handler: any) => {
  if (el.removeEventListener) { // dom2
    el.removeEventListener(type, handler, false)
  } else if (el.detachEvent) { // IE方式
    el.detachEvent('on' + type, handler)
  } else {
    el['on' + type] = null // dom0
  }
}
/**
 * 事件对象event
 * @param event
 */
// 阻止事件冒泡 (主要是事件冒泡，因为IE不支持事件捕获)
export const stopPropagation = (event: Event) => {
  if (event.stopPropagation) {
    event.stopPropagation()
  } else {
    event.cancelBubble = true
  }
}
// 阻止/取消事件的默认行为
export const preventDefault = (event: Event) => {
  if (event.preventDefault) {
    event.preventDefault()
  } else {
    event.returnValue = false
  }
}
// 获取事件目标
export const getTarget = (event: Event) => {
  return event.target || event.srcElement
}
