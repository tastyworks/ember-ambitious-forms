import Ember from 'ember'

export default Ember.Component.extend({
  classNames: 'amb-form-input',
  tagName: 'input',
  attributeBindings: [
    'value',
    'name',
    'type',
    'placeholder',
    'disabled',
    'size',
    'maxlength',
    'autocomplete',
    'autofocus',
    'min',
    'max',
    'step'
  ],

  _lastValue: null,

  _sendUpdate (value) {
    if (this.get('_lastValue') !== value) {
      this.sendAction('action', value)
      this.set('_lastValue', value)
    }
  },

  change (e) {
    this._sendUpdate(e.target.value)
  },

  input (e) {
    this._sendUpdate(e.target.value)
  }
})
