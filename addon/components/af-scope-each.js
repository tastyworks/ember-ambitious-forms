import Ember from 'ember'

export default Ember.Component.extend({
  classNames: 'af-scope-each'
}).reopenClass({
  positionalParams: ['scopes']
})
