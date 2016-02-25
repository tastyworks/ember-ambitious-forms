import Ember from 'ember'

let FmForm = Ember.Component.extend({
  tagName: 'form',
  classNames: 'fm-form',

  // TODO: figure out a better way to do this
  fmFields: Ember.computed(function () {
    return Ember.A()
  }),

  fmFieldsWithError: Ember.computed.filterBy('fmFields', 'hasError'),
  hasError: Ember.computed.notEmpty('fmFieldsWithError'),

  addField (component) {
    this.get('fmFields').addObject(component)
  },

  removeField (component) {
    this.get('fmFields').removeObject(component)
  },

  scrollTo (component, { paddingTop = 0 } = {}) {
    let offset = component.$().offset()
    Ember.$('html, body').animate({ scrollTop: offset.top - paddingTop }, 200)
  },

  actions: {
    showErrors () {
      let fmFields = this.get('fmFieldsWithError')
      fmFields.forEach((fmField) => {
        fmField.set('hideError', false)
      })

      this.scrollTo(fmFields.objectAt(0), { paddingTop: 20 })
    }
  }
})

export default FmForm
