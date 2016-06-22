import Ember from 'ember'

export default Ember.Component.extend({
  tagName: 'span',
  classNames: ['af-radio-group'],

  name: Ember.computed.oneWay('elementId'),

  actions: {
    radioChange (value) {
      this.set('value', value)
      this.sendAction('action', value)
    }
  }
})
