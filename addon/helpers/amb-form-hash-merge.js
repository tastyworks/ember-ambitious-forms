import Ember from 'ember'

export function ambFormHashMerge ([existingHash], hash) {
  Ember.assign(existingHash, hash)

  return existingHash
}

export default Ember.Helper.helper(ambFormHashMerge)
