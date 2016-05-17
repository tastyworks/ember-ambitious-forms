import Ember from 'ember'
import Lookup from 'ember-ambitious-forms/mixins/lookup'

export function autoLoad (_appInstance) {
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
