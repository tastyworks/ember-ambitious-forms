import Ember from 'ember'

export default Ember.Component.extend({
  classNames: 'af-form',

  // TODO: figure out a better way to do this
  afFields: Ember.computed(function () {
    return Ember.A()
  }),

  afFieldsWithError: Ember.computed.filterBy('afFields', 'hasError'),
  hasError: Ember.computed.notEmpty('afFieldsWithError'),

  addField (component) {
    this.get('afFields').addObject(component)
  },

  removeField (component) {
    this.get('afFields').removeObject(component)
  },

  scrollTo (component, { paddingTop = 0 } = {}) {
    let offset = component.$().offset()
    Ember.$('html, body').animate({ scrollTop: offset.top - paddingTop }, 200)
  },

  showFieldErrors () {
    let fields = this.get('afFieldsWithError')
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
        this.sendAction('submit')
        this.sendAction()
      }
    }
  }
})
