import Ember from 'ember'

export function ambFormHashSetProperties(params, props) {
  let hash = params[0]
  Ember.setProperties(hash, props)
}

export default Ember.Helper.helper(ambFormHashSetProperties)
