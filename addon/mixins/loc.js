import Ember from 'ember'
import Lookup from './lookup'

export default Ember.Mixin.create(Lookup, {
  _lookup (key) {
    return Ember.String.loc(key)
  },

  _lookupExists (key) {
    // TODO: remove dependency on internal magic
    return Ember.STRINGS.hasOwnProperty(key)
  }
})
