function computedAnyBy (dependentKey, propertyKey) {
  return Ember.computed(`${dependentKey}.@each.${propertyKey}`, function () {
    return Boolean(this.get(dependentKey).findBy(propertyKey))
  })
}

export default Ember.Object.extend({
  content: null,

  contentWithErrors: Ember.computed.filterBy('content', 'hasErrors'),

  isVisible: Ember.computed.equal('value', 'visible'),
  isHidden: Ember.computed.equal('value', 'hidden'),
  isNone: Ember.computed.equal('value', 'none'),

  value: Ember.computed('hasVisible', 'hasHidden', 'hasNone', function () {
    if (this.get('hasVisible')) {
      return 'visible'
    } else if (this.get('hasHidden')) {
      return 'hidden'
    } else if (this.get('hasNone')) {
      return 'none'
    }

    throw new Error('Which error state am I?')
  }),

  hasNone: Ember.computed.empty('contentWithErrors'),
  hasAny: Ember.computed.not('hasNone'),
  hasVisible: computedAnyBy('contentWithErrors', 'showErrors'),
  hasHidden: Ember.computed('hasAny', 'hasVisible', function () {
    return this.get('hasAny') && !this.get('hasVisible')
  })
})
