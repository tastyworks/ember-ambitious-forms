import Ember from 'ember'
import { InputChangeMixin } from './amb-form-input'

export default Ember.Component.extend(InputChangeMixin, {
  classNames: 'amb-form-textarea',
  tagName: 'textarea',

  attributeBindings: [
    'value',
    'minlength',
    'maxlength',
    'placeholder',
    'disabled',
    'readonly',
    'required',
    'cols',
    'rows'
  ]
})
