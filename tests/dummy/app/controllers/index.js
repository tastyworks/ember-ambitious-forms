import Ember from 'ember'

export default Ember.Controller.extend({
  formParams: Ember.computed(function () {
    return {}
  }),

  boolOpts: Ember.A([true, false]),

  actions: {
    formSubmit (ambForm) {
      console.log('Success!', ambForm)
    },

    formError (ambForm) {
      console.warn('Failure!', ambForm)
    }
  }
})
