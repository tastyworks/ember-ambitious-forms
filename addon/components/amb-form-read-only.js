import Ember from 'ember'

export default Ember.Component.extend({
  layoutName: 'ember-ambitious-forms@components/amb-form-read-only',
  classNames: 'amb-form-read-only',

  value: null,
  formattedValue: null,

  displayValue: Ember.computed('value', 'formattedValue', function () {
    return this.get('formattedValue') ||
      this.get('value') ||
      Ember.String.htmlSafe('&nbsp;')
  })
})
