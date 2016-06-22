import Ember from 'ember'

export default Ember.Component.extend({
  tagName: 'label',
  classNames: 'af-radio',
  classNameBindings: 'checked:checked:unchecked',

  actions: {
    select () {
      let value = this.get('value')
      this.sendAction('action', value)
    }
  }
})
