import Ember from 'ember'

export default Ember.Controller.extend({
  init () {
    this._super()
  },

  formParams: Ember.computed(function () {
    window.foo = {}
    console.log(window.foo)
    return window.foo
  }),

  boolOpts: Ember.A([true, false]),

  actions: {
    formSubmit (params) {
      console.log('Success!', JSON.stringify(params))
    },

    formError (params) {
      console.warn('Failure!', JSON.stringify(params))
    }
  }
})
