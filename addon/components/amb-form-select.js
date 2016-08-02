import Ember from 'ember'

import ConvertedOptions from '../mixins/converted-options'

// TODO: what about when value is not in the list of options?

export default Ember.Component.extend(ConvertedOptions, {
  layoutName: 'ember-ambitious-forms@components/amb-form-select',
  service: Ember.inject.service('ember-ambitious-forms'),

  tagName: 'span',
  classNames: 'amb-form-select',
  classNameBindings: ['isOptionSelected:option-selected:prompt-selected'],

  isOptionSelected: Ember.computed.notEmpty('value'),

  prompt: Ember.computed.oneWay('service.config.prompt'),
  actions: {
    selectChange (domSelect) {
      let selectedIndex = domSelect.selectedIndex
      if (this.get('prompt')) {
        selectedIndex--
      }
      let option = this.get('convertedOptions').objectAt(selectedIndex)
      let value = option ? option.value : null
      this.set('value', value)
      this.sendAction('action', value)
    }
  }
})
