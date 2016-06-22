import Ember from 'ember'

import ConvertedOptions from '../mixins/converted-options'

export default Ember.Component.extend(ConvertedOptions, {
  service: Ember.inject.service('ember-ambitious-forms'),

  tagName: 'span',
  classNames: 'af-select',

  prompt: Ember.computed.oneWay('service.config.prompt'),
  actions: {
    selectChange (formValue) {
      // formValue is always a string so we have to compare the string value
      let option = this.get('convertedOptions').find((o) => formValue === o.value.toString())
      let value = option ? option.value : null
      this.set('value', value)
      this.sendAction('action', value)
    }
  }
})
