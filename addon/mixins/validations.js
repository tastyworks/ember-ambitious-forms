import Ember from 'ember'
import computedIndirect from 'ember-computed-indirect/utils/indirect'

export default Ember.Mixin.create({
  validationScope: Ember.computed.oneWay('scope'),

  _errorsKey: Ember.computed('validationScope', 'fieldKey', function () {
    return `validationScope.errors.${this.get('fieldKey')}.[]`
  }),
  errors: computedIndirect('_errorsKey'),

  required: Ember.computed('validationScope', 'fieldKey', 'options', function () {
    let validationScope = this.get('validationScope')
    let fieldKey = this.get('fieldKey')

    let inclusionFilter = validationScope.get(`validations.${fieldKey}.inclusion`)
    if (this.get('options') && inclusionFilter) {
      return !inclusionFilter.allowBlank
    }

    return validationScope.get(`validations.${fieldKey}.presence`)
  }),

  optionValues: Ember.computed('validationScope', 'fieldKey', function () {
    let fieldKey = this.get('fieldKey')
    let validationScope = this.get('validationScope')
    return this._super() || validationScope.get(`validations.${fieldKey}.inclusion.in`)
  })
})
