import Ember from 'ember'

export function ambFormHashSet(params, _props) {
  let [hash, key, value] = params
  Ember.set(hash, key, value)
}

export default Ember.Helper.helper(ambFormHashSet)
