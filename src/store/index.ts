import { createStore, Store, useStore } from 'vuex'
import { IRootState, IStoreType } from '@/store/types'
import createPersistedstate from 'vuex-persistedstate'
import user from '@/store/modules/user/user'
import cart from '@/store/modules/cart/cart'
import category from '@/store/modules/category/category'

const store = createStore<IRootState>({
  state () {
    return {

    }
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    cart,
    category
  },
  plugins: [
    createPersistedstate({
      key: 'erabbit-client-pc',
      paths: ['user', 'cart']
    })
  ]
})

export function useVuexStore (): Store<IStoreType> {
  return useStore()
}

export default store
