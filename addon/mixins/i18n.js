import Ember from 'ember'
import Lookup from './lookup'

export default Ember.Mixin.create(Lookup, {
  i18n: Ember.inject.service(),

  _lookupCache: Ember.computed.oneWay('i18n.locale'),

  _lookup (key) {
    return this.get('i18n').t(key)
  },

  _lookupExists (key) {
    return this.get('i18n').exists(key)
  }
})
