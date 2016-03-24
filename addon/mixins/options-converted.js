import Ember from 'ember'

export let Option = Ember.Object.extend({
  text: Ember.computed.oneWay('value'),
  selected: Ember.computed('value', 'source.value', function () {
    return this.get('value') === this.get('source.value')
  })
})

export default Ember.Mixin.create({
  optionsConverted: Ember.computed('options.[]', function () {
    return this.get('options').map((option, index) => {
      if (Ember.isArray(option)) {
        return Option.create({
          value: option[0],
          text: option[1],
          description: option[2],
          source: this
        })
      } else if (option.hasOwnProperty('value')) {
        return Option.create(option, { source: this })
      } else {
        return Option.create({
          value: option,
          source: this
        })
      }
    })
  })
})
