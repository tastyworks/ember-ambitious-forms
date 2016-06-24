import Ember from 'ember'

export default Ember.Component.extend({
  layoutName: 'ember-ambitious-forms@components/af-checkbox',
  tagName: 'label',
  classNames: 'af-checkbox',
  classNameBindings: 'value:checked:unchecked'
})
