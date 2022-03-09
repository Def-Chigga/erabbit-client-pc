import Request from './request'
import { API_BASE_URL, TIME_OUT } from './config'
import { useStorage, useStorageType } from '@/utils/useStorage'
import store from '@/store'

const $http = new Request({
  baseURL: API_BASE_URL,
  timeout: TIME_OUT,
  // 是否允许发送Cookie 如果为true 则服务器的 Access-control-Allow-Credentials 必须为 true 来源为 XMLHttpRequest的withCredentials配置项
  withCredentials: true,
  interceptorHooks: {
    requestInterceptor: (config) => {
      const token = useStorage.getItem('nld_login_token', useStorageType.Cookies)
      if (token) {
        if (config && config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }
      }
      /* // 1. 获取用户信息对象
      const { profile } = store.state.user
      // 2. 判断是否有token
      if (profile.token) {
        // 3. 设置token
        config.headers.Authorization = `Bearer ${profile.token}`
      } */
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      return res.data
    },
    responseInterceptorCatch: (err) => {
      return err
    }
  }
})

export default $http
