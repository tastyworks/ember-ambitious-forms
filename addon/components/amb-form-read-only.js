import Ember from 'ember'

export default Ember.Component.extend({
  layoutName: 'ember-ambitious-forms@components/amb-form-read-only',
  classNames: 'amb-form-read-only',

  value: null,
  formattedValue: null,

  displayValue: Ember.computed('formattedValue', 'value', function () {
    let formattedValue = this.get('formattedValue')
    if (formattedValue != null) {
      return formattedValue
    }

    let value = this.get('value')
    if (value != null) {
      return value.toString()
    }

    return Ember.String.htmlSafe('&nbsp;')
  })
})
