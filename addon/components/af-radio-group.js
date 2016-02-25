import Ember from 'ember'
import OptionsConverted from '../mixins/options-converted'

export default Ember.Component.extend(OptionsConverted, {
  tagName: 'span',
  classNames: ['af-radio-group'],

  name: Ember.computed.oneWay('elementId'),

  actions: {
    radioChange (value) {
      this.set('value', value)
    }
  }
})
