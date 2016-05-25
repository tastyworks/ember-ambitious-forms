import Ember from 'ember'
import computedIndirect from 'ember-computed-indirect/utils/indirect'

const ALLOW_BLANK_FILTERS = ['exclusion', 'format', 'inclusion', 'length', 'numericality']

export function autoLoad (appInstance) {
  return true
}

export const Plugin = Ember.Mixin.create({
  validationScope: Ember.computed.oneWay('scope'),

  errors: Ember.computed.mapBy('_rawErrors', 'message'),
  _rawErrors: computedIndirect('_rawErrorsKey'),
  _rawErrorsKey: Ember.computed('validationScope', 'fieldKey', function () {
    let validationScope = this.get('validationScope')
    let fieldKey = this.get('fieldKey')
    if (!validationScope || !fieldKey) {
      // There's no scope for the errors to exist so let's create a dummy version
      return '_rawErrors'
    }

    return `validationScope.validations.attrs.${fieldKey}.errors.[]`
  }),

  _fieldValidationRules: Ember.computed('validationScope', 'fieldKey', function () {
    let fieldKey = this.get('fieldKey')
    return Ember.makeArray(this.get(`validationScope.validations._validationRules.${fieldKey}`))
  }),

  required: Ember.computed('_fieldValidationRules', function () {
    let rules = this.get('_fieldValidationRules')
    for (let i = 0; i < rules.length; i++) {
      let rule = rules[i]
      if (ALLOW_BLANK_FILTERS.indexOf(rule._type) && !rule.options.allowBlank) {
        return true
      }

      if (rule._type === 'presence' || rule._type === 'acceptance') {
        return true
      }
    }

    return false
  }),

  optionValues: Ember.computed('validationScope', 'fieldKey', function () {
    let inclusion = this.get('_fieldValidationRules').findBy('_type', 'inclusion')
    return (inclusion && inclusion.options.in) || this._super()
  })
})

export default { autoLoad, Plugin }
