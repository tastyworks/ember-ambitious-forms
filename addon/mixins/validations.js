import Ember from 'ember'
import computedIndirect from 'ember-computed-indirect/utils/indirect'

export default Ember.Mixin.create({
  validationScope: Ember.computed.oneWay('scope'),

  errors: computedIndirect('_errorsKey'),
  _errorsKey: Ember.computed('validationScope', 'fieldKey', function () {
    let validationScope = this.get('validationScope')
    let fieldKey = this.get('fieldKey')
    if (!validationScope || !fieldKey) {
      // There's no scope for the errors to exist so let's create a dummy version
      return '_errors'
    }

    return `validationScope.errors.${this.get('fieldKey')}.[]`
  }),

  required: Ember.computed('validationScope', 'fieldKey', 'options', function () {
    let validationScope = this.get('validationScope')
    let fieldKey = this.get('fieldKey')
    if (!validationScope || !fieldKey) {
      return
    }

    let inclusionFilter = validationScope.get(`validations.${fieldKey}.inclusion`)
    if (this.get('options') && inclusionFilter) {
      return !inclusionFilter.allowBlank
    }

    return validationScope.get(`validations.${fieldKey}.presence`)
  }),

  optionValues: Ember.computed('validationScope', 'fieldKey', function () {
    let validationScope = this.get('validationScope')
    let fieldKey = this.get('fieldKey')
    if (!validationScope || !fieldKey) {
      return this._super()
    }

    return this._super() || validationScope.get(`validations.${fieldKey}.inclusion.in`)
  })
})
