import Ember from 'ember'

export default Ember.Component.extend({
  tagName: 'label',
  classNames: 'fm-radio',
  classNameBindings: 'checked:checked:unchecked',

  checked: Ember.computed('value', 'selectedValue', function () {
    return this.get('value') === this.get('selectedValue')
  }),

  click (event) {
    if (event.target.type === 'radio') {
      let value = this.get('value')
      this.set('selectedValue', value)
      this.sendAction('action', value)
    }
  }
})
