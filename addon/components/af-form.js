import Ember from 'ember'

export default Ember.Component.extend({
  classNames: 'af-form',

  showAllErrors: false,
  fields: Ember.computed(() => Ember.A()),
  fieldsWithError: Ember.computed.filterBy('fields', 'hasError'),
  haveErrors: Ember.computed.notEmpty('fieldsWithError'),

  _pokeObservedComputed: Ember.on('init', function () {
    // We need to do this explicitly to force the observers to run.
    // Computed KVO isn't wired up until a 'get' is run.
    this.getProperties('haveErrors', 'showAllErrors')
  }),

  _haveErrorsObserver: Ember.observer('haveErrors', function () {
    Ember.run.scheduleOnce('actions', this, this._sendActionHaveErrorsChanged)
  }),

  _sendActionHaveErrorsChanged () {
    this.sendAction('haveErrorsChanged', this, this.get('haveErrors'))
  },

  _showAllErrorsObserver: Ember.observer('showAllErrors', function () {
    if (this.get('showAllErrors')) {
      this.displayFieldErrors()
    }
  }),

  displayFieldErrors () {
    this.get('fields').forEach((field) => {
      field.set('hideError', false)
    })
  },

  scrollToErrorField (index = 0) {
    let field = this.get('fieldsWithError').objectAt(index)
    if (field) {
      let offset = field.$().offset()
      Ember.$('html, body').animate({ scrollTop: offset.top - 20 }, 200)
    }
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
