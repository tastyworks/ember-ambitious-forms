import Ember from 'ember'
import FmOptionable from './fm/optionable'

export default FmOptionable.extend({
  tagName: 'span',
  classNames: ['fm-radio-group'],

  name: Ember.computed.oneWay('elementId'),

  actions: {
    radioChange (value) {
      this.set('value', value)
    }
  }
})
