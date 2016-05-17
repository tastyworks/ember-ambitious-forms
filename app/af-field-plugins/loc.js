import Ember from 'ember'
import Lookup from 'ember-ambitious-forms/mixins/lookup'

export function autoLoad (_appInstance) {
  for (let key in Ember.STRINGS) {
    if (Ember.STRINGS.hasOwnProperty(key) && key.indexOf('af.') === 0) {
      return true
    }
  }

  return false
}

export const Plugin = Ember.Mixin.create(Lookup, {
  _lookup (key) {
    return Ember.String.loc(key)
  },

  _lookupExists (key) {
    // TODO: remove dependency on internal magic
    return Ember.STRINGS.hasOwnProperty(key)
  }
})

export default { autoLoad, Plugin }
