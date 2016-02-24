import Ember from 'ember'
import computedIndirect from 'ember-computed-indirect/utils/indirect'

export default Ember.Mixin.create({
  validationObject: Ember.computed.readOnly('model'),

  _errorsKey: Ember.computed('fieldKey', function () {
    return `validationObject.errors.${this.get('fieldKey')}.[]`
  }),
  errors: computedIndirect('_errorsKey'),

  required: Ember.computed('validationObject', 'fieldKey', 'options', function () {
    let validationObject = this.get('validationObject')
    let fieldKey = this.get('fieldKey')

    let inclusionFilter = validationObject.get(`validations.${fieldKey}.inclusion`)
    if (this.get('options') && inclusionFilter) {
      return !inclusionFilter.allowBlank
    }

    return validationObject.get(`validations.${fieldKey}.presence`)
  }),

  optionValues: Ember.computed('validationObject', 'fieldKey', function () {
    let fieldKey = this.get('fieldKey')
    let validationObject = this.get('validationObject')
    return this._super() || validationObject.get(`validations.${fieldKey}.inclusion.in`)
  })
})
