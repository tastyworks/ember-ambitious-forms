import Ember from 'ember'

export default Ember.Component.extend({
  layoutName: 'ember-ambitious-forms@components/amb-form-scoped-each',
  tagName: ''
}).reopenClass({
  positionalParams: ['scopes']
})
