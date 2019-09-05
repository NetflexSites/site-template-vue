import Vuex from 'vuex'

// Import store modules here
// import * as storeModule from './storeModule

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  modules: {
    // storeModule,
  },
})
