import { Module } from 'vuex'
import { ICartState } from '@/store/modules/cart/types'
import { IRootState } from '@/store/types'

const cartModule: Module<ICartState, IRootState> = {
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

export default cartModule
