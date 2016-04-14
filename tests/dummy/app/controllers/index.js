import Ember from 'ember'

export default Ember.Controller.extend({
  formParams: Ember.computed(function () {
    return {}
  }),

  boolOpts: Ember.A([true, false]),

  actions: {
    formSubmit (afForm) {
      console.log('Success!', afForm)
    },

    formError (afForm) {
      console.warn('Failure!', afForm)
    }
  }
})
