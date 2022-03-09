import axios from 'axios'
import type { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios'
import { ElLoading, ElMessage } from 'element-plus/es'
import router from '@/router'

interface InterceptorHooks {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any

  responseInterceptor?: (response: AxiosResponse) => AxiosResponse
  responseInterceptorCatch?: (error: any) => any
}

interface RequestConfig extends AxiosRequestConfig {
  hideLoading?: boolean
  interceptorHooks?: InterceptorHooks
}

interface RequestData<T> {
  data: T
  returnCode: string
  success: boolean
}

class Request {
  public config: AxiosRequestConfig
  public interceptorHooks?: InterceptorHooks
  public hideLoading: boolean
  public loading?: any
  public instance: AxiosInstance

  constructor (options: RequestConfig) {
    this.config = options
    this.interceptorHooks = options.interceptorHooks
    this.hideLoading = options.hideLoading ?? false
    this.instance = axios.create(options)

    this.setupInterceptor()
  }

  public setupInterceptor (): void {
    this.instance.interceptors.request.use(
      this.interceptorHooks?.requestInterceptor,
      this.interceptorHooks?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptorHooks?.responseInterceptor,
      this.interceptorHooks?.responseInterceptorCatch
    )

    this.instance.interceptors.request.use((config) => {
      if (!this.hideLoading) {
        this.loading = ElLoading.service({
          lock: true,
          text: '加载中...',
          background: 'rgba(0, 0, 0, 0.7)'
        })
      }
      return config
    })

    this.instance.interceptors.response.use(
      (res) => {
        this.loading?.close()
        return res
      },
      (err) => {
        this.loading?.close()
        return err
      }
    )
  }

  public request<T = any> (config: RequestConfig): Promise<T> {
    if (config.hideLoading) {
      this.hideLoading = true
    }
    return new Promise((resolve, reject) => {
      this.instance
        .request<any, RequestData<T>>(config)
        .then((res) => {
          resolve(res.data)
          /* const result: any = res
          switch (result.status) {
            case 1: // 成功
              if (result.msg) {
                ElMessage.success(result.msg)
              }
              resolve(result.data)
              break
            case 10001: // needLogin
              if (result.msg) {
                ElMessage.error(result.msg)
              }
              router.push('/login').then(r => r)
              break
            default:
              if (result.msg) {
                ElMessage.error(result.msg)
              }
          } */
          this.hideLoading = false
        })
        .catch((err) => {
          /* // 401 状态码，进入该函数
          if (err.response && err.response.status === 401) {
            // 1. 清空无效用户信息
            // 2. 跳转到登录页
            // 3. 跳转需要传参（当前路由地址）给登录页码
            store.commit('user/setUser', {})
            // 当前路由地址
            // 组件里头：`/user?a=10` $route.path === /user  $route.fullPath === /user?a=10
            // js模块中：router.currentRoute.value.fullPath 就是当前路由地址，router.currentRoute 是ref响应式数据
            const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
            // encodeURIComponent 转换uri编码，防止解析地址出问题
            router.push('/login?redirectUrl=' + fullPath)
          } */
          reject(err)
          this.hideLoading = false
        })
    })
  }

  public get<T = any> (config: RequestConfig): Promise<T> {
    return this.request({ ...config, method: 'GET' })
  }

  public post<T = any> (config: RequestConfig): Promise<T> {
    return this.request({ ...config, method: 'POST' })
  }

  public delete<T = any> (config: RequestConfig): Promise<T> {
    return this.request({ ...config, method: 'DELETE' })
  }

  public patch<T = any> (config: RequestConfig): Promise<T> {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default Request
