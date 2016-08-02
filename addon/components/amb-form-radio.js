import Ember from 'ember'

export default Ember.Component.extend({
  layoutName: 'ember-ambitious-forms@components/amb-form-radio',
  tagName: 'label',
  classNames: 'amb-form-radio',
  classNameBindings: 'checked:checked:unchecked',

  actions: {
    select () {
      let value = this.get('value')
      this.sendAction('action', value)
    }
  }
})
