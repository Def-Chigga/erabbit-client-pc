import { Module } from 'vuex'
import { IUserState } from '@/store/modules/user/types'
import { IRootState } from '@/store/types'

const userModule: Module<IUserState, IRootState> = {
  namespaced: true,
  state () {
    return {
    }
  },
  mutations: {
  },
  actions: {
  }
}

export default userModule
