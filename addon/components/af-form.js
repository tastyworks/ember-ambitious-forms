import Ember from 'ember'

export default Ember.Component.extend({
  classNames: 'af-form',

  showAllErrors: false,
  fields: Ember.computed(() => Ember.A()),
  fieldsWithError: Ember.computed.filterBy('fields', 'hasError'),
  haveErrors: Ember.computed.notEmpty('fieldsWithError'),

  _haveErrorsChangedActioner: Ember.observer('haveErrors', function () {
    this.sendAction('haveErrorsChanged', this, this.get('haveErrors'))
  }),

  displayFieldErrors () {
    let fields = this.get('fieldsWithError')
    fields.forEach((field) => {
      field.set('hideError', false)
    })

    this.scrollTo(fields.objectAt(0), { paddingTop: 20 })
  },

  addField (component) {
    if (this.get('showAllErrors')) {
      component.set('hideError', false)
    }
    this.get('fields').addObject(component)
  },

  removeField (component) {
    this.get('fields').removeObject(component)
  },

  scrollTo (component, { paddingTop = 0 } = {}) {
    let offset = component.$().offset()
    Ember.$('html, body').animate({ scrollTop: offset.top - paddingTop }, 200)
  },

  actions: {
    domSubmit () {
      if (this.get('haveErrors')) {
        this.displayFieldErrors()
        this.sendAction('error', this)
      } else {
        this.sendAction('submit', this)
        this.sendAction('action', this)
      }
    }
  }
})
