import $http from '@/service/request'

export function login (loginForm: any) {
  return $http.post({
    url: '',
    data: loginForm
    // hideLoading: true // 隐藏加载loading
  })
}
