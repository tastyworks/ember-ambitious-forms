import Ember from 'ember'

export default Ember.Component.extend({
  layoutName: 'ember-ambitious-forms@components/amb-form',
  classNames: 'amb-form',

  readOnly: false,
  showAllErrors: false,
  fields: Ember.computed(() => Ember.A()),
  fieldsWithError: Ember.computed.filterBy('fields', 'hasError'),
  haveErrors: Ember.computed.notEmpty('fieldsWithError'),

  _pokeObservedComputed: Ember.on('init', function () {
    // Observers are not active until a 'get' is run.
    this.get('haveErrors')
  }),

  _haveErrorsObserver: Ember.observer('haveErrors', function () {
    Ember.run.scheduleOnce('actions', this, this._sendActionHaveErrorsChanged)
  }),

  _sendActionHaveErrorsChanged () {
    this.sendAction('haveErrorsChanged', this, this.get('haveErrors'))
  },

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
    insertField (component) {
      Ember.run.schedule('afterRender', () => {
        this.get('fields').addObject(component)
      })
    },

    removeField (component) {
      Ember.run.schedule('afterRender', () => {
        this.get('fields').removeObject(component)
      })
    },

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
