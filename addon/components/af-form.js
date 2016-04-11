import Ember from 'ember'

export default Ember.Component.extend({
  classNames: 'af-form',

  fields: Ember.computed(() => Ember.A()),
  fieldsWithError: Ember.computed.filterBy('fields', 'hasError'),
  hasError: Ember.computed.notEmpty('fieldsWithError'),

  addField (component) {
    this.get('fields').addObject(component)
  },

  removeField (component) {
    this.get('fields').removeObject(component)
  },

  scrollTo (component, { paddingTop = 0 } = {}) {
    let offset = component.$().offset()
    Ember.$('html, body').animate({ scrollTop: offset.top - paddingTop }, 200)
  },

  showFieldErrors () {
    let fields = this.get('fieldsWithError')
    fields.forEach((field) => {
      field.set('hideError', false)
    })

    this.scrollTo(fields.objectAt(0), { paddingTop: 20 })
  },

  actions: {
    domSubmit () {
      if (this.get('hasError')) {
        this.showFieldErrors()
        this.sendAction('error')
      } else {
        let scope = this.get('scope')
        this.sendAction('submit', scope)
        this.sendAction('action', scope)
      }
    }
  }
})
