import Ember from 'ember'

export default Ember.Component.extend({
  layoutName: 'ember-ambitious-forms@components/amb-form-checkbox',
  tagName: 'label',
  classNames: 'amb-form-checkbox',
  classNameBindings: 'value:checked:unchecked'
})
