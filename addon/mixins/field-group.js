import Ember from 'ember'

export default Ember.Mixin.create({
  fields: Ember.computed(() => Ember.A()),
  fieldsWithError: Ember.computed.filterBy('fields', 'hasError'),
  haveErrors: Ember.computed.notEmpty('fieldsWithError'),
  _lastHaveErrors: null,

  _haveErrorsObserver: Ember.observer('haveErrors', function () {
    let haveErrors = this.get('haveErrors')
    if (haveErrors !== this.get('_lastHaveErrors')) {
      this.sendAction('haveErrorsChanged', this, haveErrors)
      this.set('_lastHaveErrors', haveErrors)
    }
  }),

  actions: {
    insertField (component) {
      this.sendAction('insertField', component)
      Ember.run.schedule('afterRender', () => {
        this.get('fields').addObject(component)
      })
    },

    removeField (component) {
      this.sendAction('removeField', component)
      Ember.run.schedule('afterRender', () => {
        this.get('fields').removeObject(component)
      })
    },
  }
})
