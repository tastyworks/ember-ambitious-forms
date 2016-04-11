import Ember from 'ember'
import computedIndirect from 'ember-computed-indirect/utils/indirect'

const ALLOW_BLANK_FILTERS = ['exclusion', 'format', 'inclusion', 'length', 'numericality']

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

  required: Ember.computed('validationScope', 'fieldKey', function () {
    let validationScope = this.get('validationScope')
    let fieldKey = this.get('fieldKey')
    if (!validationScope || !fieldKey) {
      return
    }

    for (let i = 0; i < ALLOW_BLANK_FILTERS.length; i++) {
      let filterName = ALLOW_BLANK_FILTERS[i]
      let filter = validationScope.get(`validations.${fieldKey}.${filterName}`)
      if (filter) {
        return !filter.allowBlank
      }
    }

    return Boolean(validationScope.get(`validations.${fieldKey}.presence`))
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
