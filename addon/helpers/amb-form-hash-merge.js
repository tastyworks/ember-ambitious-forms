import Ember from 'ember'

export function ambFormHashMerge ([existingHash], hashParams) {
  return Ember.assign(existingHash, hashParams)
}

export default Ember.Helper.helper(ambFormHashMerge)
