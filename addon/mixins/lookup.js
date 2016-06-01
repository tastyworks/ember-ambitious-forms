import Ember from 'ember'

function computedLookupKey (subname, def) {
  return Ember.computed('lookupKey', function () {
    if (def && def.call(this)) {
      return def.call(this)
    }

    let lookupKey = this.get('lookupKey')
    if (lookupKey) {
      return `${lookupKey}.${subname}`
    }
  })
}

function computedLookupOptional (keyName) {
  return Ember.computed('_lookupCache', keyName, function () {
    let key = this.get(keyName)
    if (key && this._lookupExists(key)) {
      return this._lookup(key)
    }
  })
}

export default Ember.Mixin.create({
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

  lookupHintKey: computedLookupKey('hint'),
  lookupDescriptionKey: computedLookupKey('description'),
  lookupPlaceholderKey: computedLookupKey('placeholder'),
  lookupOptionsKey: computedLookupKey('options', function () {
    return this._fieldTypeConfig('lookupOptionsKey')
  }),

  label: Ember.computed('_lookupCache', 'lookupKey', function () {
    let key = this.get('lookupKey')
    if (key) {
      return this._lookup(key)
    }
  }),

  hint: computedLookupOptional('lookupHintKey'),
  description: computedLookupOptional('lookupDescriptionKey'),
  placeholder: computedLookupOptional('lookupPlaceholderKey'),

  options: Ember.computed('_lookupCache', 'optionValues.[]', 'lookupOptionsKey', function () {
    let optionValues = this.get('optionValues')
    if (!optionValues) {
      return
    }

    let lookupOptionsKey = this.get('lookupOptionsKey')

    if (!lookupOptionsKey) {
      return optionValues
    }

    return optionValues.map((value) => {
      let valueKey = this.lookupKeyConvert(value.toString())

      let option = { value }

      if (this._lookupExists(`${lookupOptionsKey}.${valueKey}`)) {
        option.text = this._lookup(`${lookupOptionsKey}.${valueKey}`)
      }

      if (this._lookupExists(`${lookupOptionsKey}.${valueKey}.description`)) {
        option.description = this._lookup(`${lookupOptionsKey}.${valueKey}.description`)
      }

      return option
    })
  })
})
