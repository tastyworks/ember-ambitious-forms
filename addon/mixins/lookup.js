import Ember from 'ember'

export default Ember.Mixin.create({
  _lookupOptional (key) {
    if (this._lookupExists(key)) {
      return this._lookup(key)
    }
  },

  lookupKeyConvert: Ember.String.dasherize,

  lookupKey: Ember.computed('scopeName', 'fieldKey', function () {
    let convertedScopeName = this.lookupKeyConvert(this.get('scopeName'))
    let convertedFieldKey = this.lookupKeyConvert(this.get('fieldKey'))
    return `af.${convertedScopeName}.${convertedFieldKey}`
  }),

  lookupHintKey: Ember.computed('lookupKey', function () {
    return `${this.get('lookupKey')}.hint`
  }),

  lookupPlaceholderKey: Ember.computed('lookupKey', function () {
    return `${this.get('lookupKey')}.placeholder`
  }),

  lookupOptionsKey: Ember.computed('fieldType', 'lookupKey', function () {
    return this._fieldTypeConfig('lookupOptionsKey') || `${this.get('lookupKey')}.options`
  }),

  lookupOptionDescriptionsKey: Ember.computed('fieldType', 'lookupKey', function () {
    return this._fieldTypeConfig('lookupOptionsDescriptionKey') || `${this.get('lookupKey')}.option-descriptions`
  }),

  label: Ember.computed('_lookupCache', 'lookupKey', function () {
    return this._lookup(this.get('lookupKey'))
  }),

  hint: Ember.computed('_lookupCache', 'lookupHintKey', function () {
    return this._lookupOptional(this.get('lookupHintKey'))
  }),

  placeholder: Ember.computed('_lookupCache', 'lookupPlaceholderKey', function () {
    return this._lookupOptional(this.get('lookupPlaceholderKey'))
  }),

  options: Ember.computed('_lookupCache', 'optionValues.[]', 'lookupOptionsKey', 'lookupOptionDescriptionKey', function () {
    let optionValues = this.get('optionValues')
    if (!optionValues) {
      return
    }

    let lookupOptionsKey = this.get('lookupOptionsKey')
    let lookupOptionDescriptionsKey = this.get('lookupOptionDescriptionsKey')

    return optionValues.map((value) => {
      let option = { value }

      let valueKey = this.lookupKeyConvert(value.toString())

      let textKey = `${lookupOptionsKey}.${valueKey}`
      if (this._lookupExists(textKey)) {
        option.text = this._lookup(textKey)
      }

      let descriptionKey = `${lookupOptionDescriptionsKey}.${valueKey}`
      if (this._lookupExists(descriptionKey)) {
        option.description = this._lookup(descriptionKey)
      }

      return option
    })
  })
})
