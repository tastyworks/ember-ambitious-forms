import Ember from 'ember'

export default Ember.Component.extend({
  tagName: 'label',
  classNames: 'af-checkbox',
  classNameBindings: 'value:checked:unchecked',

  click (event) {
    if (event.target.type === 'checkbox') {
      this.sendAction('action', event.target.checked)
    }
  }
})
