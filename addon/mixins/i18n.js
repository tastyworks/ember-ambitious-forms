import Ember from 'ember'

import FmLoc from './loc'

export default Ember.Mixin.create(FmLoc, {
  i18n: Ember.inject.service(),

  label: Ember.computed('i18n', function () {
    return this.get('i18n').t(this.get('locKey'))
  }),

  hint: Ember.computed('i18n', 'locHintKey', function () {
    let i18n = this.get('i18n')
    let locHintKey = this.get('locHintKey')

    if (i18n.exists(locHintKey)) {
      return i18n.t(locHintKey)
    }
  }),

  placeholder: Ember.computed('i18n', 'locPlaceholderKey', function () {
    let i18n = this.get('i18n')
    let locPlaceholderKey = this.get('locPlaceholderKey')

    if (i18n.exists(locPlaceholderKey)) {
      return i18n.t(locPlaceholderKey)
    }
  }),

  options: Ember.computed('i18n', 'optionValues', 'locOptionsKey', function () {
    let i18n = this.get('i18n')
    let optionValues = this.get('optionValues')
    let locOptionsKey = this.get('locOptionsKey')

    if (!optionValues) {
      return
    }

    return optionValues.map((value) => {
      let key = `${locOptionsKey}.${value.toString().camelize()}`
      return i18n.exists(key) ? [value, i18n.t(key)] : value
    })
  })
})
