import Ember from 'ember'

export default Ember.Mixin.create({
  optionsConverted: Ember.computed('options.[]', function () {
    // not dependent on 'value' because we manually observe those changes
    let selectedValue = this.get('value')
    let options = this.get('options')

    return options.map((option, index) => {
      if (Ember.isArray(option)) {
        return Ember.Object.create({
          value: option[0],
          text: option[1],
          selected: selectedValue === option[0]
        })
      } else {
        return Ember.Object.create({
          value: option,
          text: option,
          selected: selectedValue === option
        })
      }
    })
  }),

  _optionsConvertedSelectedObserver: Ember.observer('value', function () {
    let selectedValue = this.get('value')
    let optionsConverted = this.get('optionsConverted')

    optionsConverted.beginPropertyChanges()
    for (let option of optionsConverted) {
      option.set('selected', selectedValue === option.value)
    }
    optionsConverted.endPropertyChanges()
  })
})
