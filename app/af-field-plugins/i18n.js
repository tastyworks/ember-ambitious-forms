import Ember from 'ember'
import Lookup from 'ember-ambitious-forms/mixins/lookup'

export function autoLoad (appInstance) {
  return appInstance.hasRegistration('service:i18n')
}

export const Plugin = Ember.Mixin.create(Lookup, {
  i18n: Ember.inject.service(),

  _lookupCache: Ember.computed.oneWay('i18n.locale'),

  _lookup (key) {
    return this.get('i18n').t(key)
  },

  _lookupExists (key) {
    return this.get('i18n').exists(key)
  }
})

export default { autoLoad, Plugin }
