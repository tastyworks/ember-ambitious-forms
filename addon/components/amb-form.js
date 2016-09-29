import Ember from 'ember'

import FieldGroup from '../mixins/field-group'

export default Ember.Component.extend(FieldGroup, {
  layoutName: 'ember-ambitious-forms@components/amb-form',
  classNames: 'amb-form',

  readOnly: false,
  showAllErrors: false,

  scrollToErrorField (index = 0) {
    let field = this.get('fieldsWithError').objectAt(index)
    if (field) {
      this.scrollTo(field, { paddingTop: 20})
    }
  },

  scrollTo (component, { paddingTop = 0, timeout = 200 } = {}) {
    let offset = component.$().offset()
    Ember.$('html, body').animate({ scrollTop: offset.top - paddingTop }, timeout)
  },

  actions: {
    domSubmit () {
      if (this.get('haveErrors')) {
        this.scrollToErrorField()
        this.set('showAllErrors', true)
        this.sendAction('error', this)
      } else {
        this.sendAction('submit', this)
        this.sendAction('action', this)
      }
    }
  }
})
