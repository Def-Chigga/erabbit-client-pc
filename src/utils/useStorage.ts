import Cookies from 'js-cookie'

enum storageType {
  localStorage = 'local',
  sessionStorage = 'session',
  Cookies = 'Cookies'
}

class UseStorage {
  public setItem (key: string, value: any, type: storageType, day?: number) {
    switch (type) {
      case storageType.localStorage:
        localStorage.setItem(key, JSON.stringify(value))
        break
      case storageType.sessionStorage:
        sessionStorage.setItem(key, JSON.stringify(value))
        break
      case storageType.Cookies:
        Cookies.set(key, value, { expires: day })
        break
    }
  }

  public getItem (key: string, type: storageType) {
    let res
    switch (type) {
      case storageType.localStorage:
        res = localStorage.getItem(key)
        break
      case storageType.sessionStorage:
        res = sessionStorage.getItem(key)
        break
      case storageType.Cookies:
        res = Cookies.get(key)
        break
    }
    if (res) {
      if (type === storageType.Cookies) {
        return res
      }
      return JSON.parse(res)
    }
  }

  public removeItem (key: string, type: storageType) {
    switch (type) {
      case storageType.localStorage:
        localStorage.removeItem(key)
        break
      case storageType.sessionStorage:
        sessionStorage.removeItem(key)
        break
      case storageType.Cookies:
        Cookies.remove(key)
        break
    }
  }

  public clear (type: storageType) {
    switch (type) {
      case 'local':
        localStorage.clear()
        break
      case 'session':
        sessionStorage.clear()
        break
    }
  }
}

export const useStorage = new UseStorage()
export const useStorageType = storageType

/*
使用：

import { useStorage, useStorageType } from '@/utils'

useStorage.setItem('loginForm', loginForm, useStorageType.localStorage)
const sLoginForm = useStorage.getItem('loginForm', useStorageType.localStorage)
useStorage.removeItem('loginForm', useStorageType.localStorage)

*/
