import Ember from 'ember'

export default Ember.Component.extend({
  layoutName: 'ember-ambitious-forms@components/amb-form-group-each',
  tagName: '',

  parent: null
}).reopenClass({
  positionalParams: ['scopes']
})
