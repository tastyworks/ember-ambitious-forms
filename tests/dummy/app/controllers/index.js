import Ember from 'ember'

export default Ember.Controller.extend({
  options: Ember.A([true, false]),

  actions: {
    formSubmit () {
      console.log('Success!')
    },

    formError () {
      console.warn('Failure!')
    }
  }
})
