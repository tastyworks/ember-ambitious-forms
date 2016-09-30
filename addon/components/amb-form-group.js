import Ember from 'ember'

import ErrorState from '../utils/error-state'

export default Ember.Component.extend({
  layoutName: 'ember-ambitious-forms@components/amb-form-group',
  classNames: 'amb-form-group',

  fields: Ember.computed(() => Ember.A()),
  fieldsWithErrors: Ember.computed.alias('errorState.contentWithErrors'),

  hasErrors: Ember.computed.alias('errorState.hasAny'),
  errorState: Ember.computed('fields', function () {
    return ErrorState.create({ content: this.get('fields') })
  }),

  _triggerErrorStateChanged: Ember.on('init', Ember.observer('errorState.value', function () {
    let errorStateValue = this.get('errorState.value')
    if (errorStateValue !== this.get('_lastErrorStateValue')) {
      this.sendAction('onErrorStateChanged', this, this.get('errorState'))
      this.set('_lastErrorStateValue', errorStateValue)
    }
  })),

  actions: {
    insertField (component) {
      this.sendAction('onInsertField', component)
      Ember.run.schedule('afterRender', () => {
        this.get('fields').addObject(component)
      })
    },

    removeField (component) {
      this.sendAction('onRemoveField', component)
      Ember.run.schedule('afterRender', () => {
        this.get('fields').removeObject(component)
      })
    }
  }
}).reopenClass({
  positionalParams: ['scope']
})
