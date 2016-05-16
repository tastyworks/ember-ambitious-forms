import Ember from 'ember'

export function initialize (appInstance) {
  // Force service object to exist to wire itself up.
  appInstance.lookup('service:ember-ambitious-forms')
}

export default {
  name: 'ember-ambitious-forms',
  initialize: initialize
}
