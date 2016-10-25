import Ember from 'ember'

export const InputChangeMixin = Ember.Mixin.create({
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

export default Ember.Component.extend(InputChangeMixin, {
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
  ]
})
