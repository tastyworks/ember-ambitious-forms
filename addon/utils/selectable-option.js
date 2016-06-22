import Ember from 'ember'

export default Ember.Object.extend({
  source: null,

  value: null,
  text: Ember.computed.oneWay('value'),
  isSelected: Ember.computed('value', 'source.value', function () {
    return this.get('value') === this.get('source.value')
  })
})
