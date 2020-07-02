import Ember from 'ember'
import { InputChangeMixin } from './amb-form-input'

const { Component } = Ember

export default Component.extend(InputChangeMixin, {
  layoutName: 'ember-ambitious-forms@components/amb-form-checkbox',
  tagName: 'label',
  classNames: 'amb-form-checkbox',
  classNameBindings: 'value:checked:unchecked'
})
