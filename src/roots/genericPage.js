import Vue from 'vue'

import store from '@/config/vuex/store'

const genericPageMountElement = document.querySelector('.GenericPage')

if (genericPageMountElement) {
  new Vue({
    name: 'GenericPageRoot',

    store,
  }).$mount(genericPageMountElement)
}
