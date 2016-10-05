import Ember from 'ember'

import ConvertedOptions from '../mixins/converted-options'

export default Ember.Component.extend(ConvertedOptions, {
  layoutName: 'ember-ambitious-forms@components/amb-form-radio-group',
  tagName: 'span',
  classNames: ['amb-form-radio-group'],

  name: Ember.computed.oneWay('elementId')
})
