import Ember from 'ember'

export default Ember.Component.extend({
  layoutName: 'ember-ambitious-forms@components/af-radio',
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
