import Ember from 'ember'

export let Option = Ember.Object.extend({
  text: Ember.computed.oneWay('value'),
  selected: Ember.computed('value', 'source.value', function () {
    return this.get('value') === this.get('source.value')
  })
})

export function convert (source, rawOption) {
  let option = Option.create({ source })
  if (Ember.isArray(rawOption)) {
    let [value, text, description] = rawOption
    option.setProperties({ value, text, description })
  } else if (rawOption.hasOwnProperty('value')) {
    option.setProperties(rawOption)
  } else {
    option.set('value', rawOption)
  }
  return option
}

export default Ember.Mixin.create({
  optionsConverted: Ember.computed('options.[]', function () {
    let options = this.get('options')
    if (options) {
      return options.map((option) => convert(this, option))
    }
  })
})
