import { Module } from 'vuex'
import { ICategoryState } from '@/store/modules/category/types'
import { IRootState } from '@/store/types'

const categoryModule: Module<ICategoryState, IRootState> = {
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

export default categoryModule
