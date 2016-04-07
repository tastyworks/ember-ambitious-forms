import Ember from 'ember'

export default Ember.Mixin.create({
  _lookupOptional (key) {
    if (this._lookupExists(key)) {
      return this._lookup(key)
    }
  },

  _lookupKeyFor (subname) {
    let lookupKey = this.get('lookupKey')
    if (lookupKey) {
      return `${lookupKey}.${subname}`
    }
  },

  lookupKeyConvert: Ember.String.dasherize,

  lookupKey: Ember.computed('scopeName', 'fieldKey', function () {
    let scopeName = this.get('scopeName')
    let fieldKey = this.get('fieldKey')
    if (scopeName && fieldKey) {
      let convertedScopeName = this.lookupKeyConvert(this.get('scopeName'))
      let convertedFieldKey = this.lookupKeyConvert(this.get('fieldKey'))
      return `af.${convertedScopeName}.${convertedFieldKey}`
    }
  }),

  lookupHintKey: Ember.computed('lookupKey', function () {
    return this._lookupKeyFor('hint')
  }),

  lookupPlaceholderKey: Ember.computed('lookupKey', function () {
    return this._lookupKeyFor('placeholder')
  }),

  lookupOptionsKey: Ember.computed('fieldType', 'lookupKey', function () {
    return this._fieldTypeConfig('lookupOptionsKey') || this._lookupKeyFor('options')
  }),

  lookupOptionDescriptionsKey: Ember.computed('fieldType', 'lookupKey', function () {
    return this._fieldTypeConfig('lookupOptionsDescriptionKey') || this._lookupKeyFor('option-descriptions')
  }),

  label: Ember.computed('_lookupCache', 'lookupKey', function () {
    let key = this.get('lookupKey')
    if (key) {
      return this._lookup(key)
    }
  }),

  hint: Ember.computed('_lookupCache', 'lookupHintKey', function () {
    let key = this.get('lookupHintKey')
    if (key) {
      return this._lookupOptional(key)
    }
  }),

  placeholder: Ember.computed('_lookupCache', 'lookupPlaceholderKey', function () {
    let key = this.get('lookupPlaceholderKey')
    if (key) {
      return this._lookupOptional(key)
    }
  }),

  options: Ember.computed('_lookupCache', 'optionValues.[]', 'lookupOptionsKey', 'lookupOptionDescriptionsKey', function () {
    let optionValues = this.get('optionValues')
    if (!optionValues) {
      return
    }

    let lookupOptionsKey = this.get('lookupOptionsKey')
    let lookupOptionDescriptionsKey = this.get('lookupOptionDescriptionsKey')

    if (!lookupOptionsKey) {
      return optionValues
    }

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
