import Vue from 'vue'

Vue.config.productionTip = false

const context = require.context('../../components', true, /.+\.(vue|js)$/)

context.keys()
  .filter(path => context.resolve(path) !== module.id) // Ignore self
  .forEach((path) => {
    const component = context(path).default

    if (component && component.name) {
      Vue.component(component.name, component)
    }
  })
