import Ember from 'ember'

export default Ember.Mixin.create({
  _lookupOptional (key) {
    if (this._lookupExists(key)) {
      return this._lookup(key)
    }
  },

  lookupKey: Ember.computed('scopeName', 'fieldKey', function () {
    return `af.${this.get('scopeName')}.${this.get('fieldKey')}`
  }),

  lookupHintKey: Ember.computed('lookupKey', function () {
    return `${this.get('lookupKey')}.hint`
  }),

  lookupPlaceholderKey: Ember.computed('lookupKey', function () {
    return `${this.get('lookupKey')}.placeholder`
  }),

  lookupOptionsKey: Ember.computed('fieldType', 'lookupKey', function () {
    if (this.get('fieldType') === 'boolean') {
      return 'af.common.options.boolean'
    } else {
      return `${this.get('lookupKey')}.options`
    }
  }),

  label: Ember.computed('lookupKey', function () {
    return this._lookup(this.get('lookupKey'))
  }),

  hint: Ember.computed('lookupHintKey', function () {
    return this._lookupOptional(this.get('lookupHintKey'))
  }),

  placeholder: Ember.computed('lookupPlaceholderKey', function () {
    return this._lookupOptional(this.get('lookupPlaceholderKey'))
  }),

  options: Ember.computed('optionValues', 'lookupOptionsKey', function () {
    let optionValues = this.get('optionValues')
    let lookupOptionsKey = this.get('lookupOptionsKey')

    if (!optionValues) {
      return
    }

    return optionValues.map((value) => {
      let key = `${lookupOptionsKey}.${value.toString().camelize()}`
      return this._lookupExists(key) ? [value, this._lookup(key)] : value
    })
  })
})
