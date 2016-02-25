import Ember from 'ember'

export default Ember.Component.extend({
  tagName: 'form',
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

  actions: {
    showErrors () {
      let afFields = this.get('afFieldsWithError')
      afFields.forEach((afField) => {
        afField.set('hideError', false)
      })

      this.scrollTo(afFields.objectAt(0), { paddingTop: 20 })
    }
  }
})
