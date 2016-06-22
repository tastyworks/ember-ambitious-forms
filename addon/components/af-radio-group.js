import Ember from 'ember'

import ConvertedOptions from '../mixins/converted-options'

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
