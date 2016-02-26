import Ember from 'ember'

export default Ember.Mixin.create({
  _lookupOptional (key) {
    if (this._lookupExists(key)) {
      return this._lookup(key)
    }
  },

  _lookupKey: Ember.computed('scopeName', 'fieldKey', function () {
    return `af.${this.get('scopeName')}.${this.get('fieldKey')}`
  }),

  _lookupHintKey: Ember.computed('_lookupKey', function () {
    return `${this.get('_lookupKey')}.hint`
  }),

  _lookupPlaceholderKey: Ember.computed('_lookupKey', function () {
    return `${this.get('_lookupKey')}.placeholder`
  }),

  _lookupOptionsKey: Ember.computed('fieldType', '_lookupKey', function () {
    if (this.get('fieldType') === 'boolean') {
      return 'af.common.options.boolean'
    } else {
      return `${this.get('_lookupKey')}.options`
    }
  }),

  label: Ember.computed('_lookupKey', function () {
    return this._lookup(this.get('_lookupKey'))
  }),

  hint: Ember.computed('_lookupHintKey', function () {
    return this._lookupOptional(this.get('_lookupHintKey'))
  }),

  placeholder: Ember.computed('_lookupPlaceholderKey', function () {
    return this._lookupOptional(this.get('_lookupPlaceholderKey'))
  }),

  options: Ember.computed('optionValues', '_lookupOptionsKey', function () {
    let optionValues = this.get('optionValues')
    let _lookupOptionsKey = this.get('_lookupOptionsKey')

    if (!optionValues) {
      return
    }

    return optionValues.map((value) => {
      let key = `${_lookupOptionsKey}.${value.toString().camelize()}`
      return this._lookupExists(key) ? [value, this._lookup(key)] : value
    })
  })
})
