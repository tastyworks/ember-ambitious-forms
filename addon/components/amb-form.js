import Ember from 'ember'

import AmbFormGroup from './amb-form-group'

export default AmbFormGroup.extend({
  tagName: 'form',
  classNames: 'amb-form',

  readOnly: false,
  alwaysShowErrors: false,

  scrollToErrorField (index = 0) {
    let field = this.get('fieldsWithErrors').objectAt(index)
    if (field) {
      this.scrollTo(field, { paddingTop: 20})
    }
  },

  scrollTo (component, { paddingTop = 0, timeout = 200 } = {}) {
    let offset = component.$().offset()
    Ember.$('html, body').animate({ scrollTop: offset.top - paddingTop }, timeout)
  },

  submit (e) {
    if (e) {
      e.preventDefault()
    }

    if (this.get('hasErrors')) {
      this.scrollToErrorField()
      this.set('alwaysShowErrors', true)
      this.sendAction('onError', this)
    } else {
      this.sendAction('onSubmit', this)
      this.sendAction('action', this)
    }
  }
})
