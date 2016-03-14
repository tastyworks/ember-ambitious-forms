import Ember from 'ember'
import computedIndirect from 'ember-computed-indirect/utils/indirect'

export const DEFAULT_CONFIG = {
  fieldTypeMappings: {
    boolean: { type: 'checkbox' }
  }
}

export default Ember.Component.extend({
  service: Ember.inject.service('ember-ambitious-forms'),

  tagName: 'label',
  classNames: ['af-field'],

  // TODO: figure out a better way to do this
  _onWillInsertElement: Ember.on('willInsertElement', function () {
    let afForm = this.get('afForm')
    afForm && afForm.addField(this)
  }),

  // TODO: figure out a better way to do this
  _onWillDestroyElement: Ember.on('willDestroyElement', function () {
    let afForm = this.get('afForm')
    afForm && afForm.removeField(this)
  }),

  _fieldTypeConfig (configName) {
    let fieldType = this.get('fieldType')
    return this.get(`service.config.fieldTypeMappings.${fieldType}.${configName}`)
  },

  type: Ember.computed('options.length', 'fieldType', 'fieldKey', function () {
    let fieldTypeComponent = this._fieldTypeConfig('type')
    if (fieldTypeComponent) {
      return fieldTypeComponent
    }

    if (this.get('options.length') > 0) {
      return 'select'
    }

    let lcaseFieldKey = (this.get('fieldKey') || '').toLowerCase()

    if (lcaseFieldKey.includes('password')) {
      return 'password'
    } else if (lcaseFieldKey.includes('email')) {
      return 'email'
    } else if (lcaseFieldKey.includes('phone')) {
      return 'tel'
    } else if (lcaseFieldKey.includes('url')) {
      return 'url'
    }

    return 'text'
  }),

  _isComponent (name) {
    // Magic sauce: https://github.com/emberjs/ember.js/blob/v2.3.0/packages/ember-htmlbars/lib/keywords/closure-component.js#L69
    let container = Ember.getOwner(this)
    let componentLookup = container.lookup('component-lookup:main')
    return Boolean(componentLookup.lookupFactory(name, container))
  },

  // The 'component' helper only takes names and component-helper output, not component classes
  // #EmberFails
  _asComponent (name) {
    return this._isComponent(name) ? name : null
  },

  inputComponent: Ember.computed('type', function () {
    let type = this.get('type')

    return this._asComponent(type) ||
      this._asComponent(`af-${type}`)
  }),

  value: computedIndirect('_valueKey'),
  _valueKey: Ember.computed('scope', 'fieldKey', function () {
    if (this.get('scope')) {
      return `scope.${this.get('fieldKey')}`
    } else {
      // Scope does not exist. Stick it on current component instance instead
      return '_value'
    }
  }),

  hasError: Ember.computed.notEmpty('errors'),
  errors: null,

  // show errors only after form was pinged to hide initial errors
  hideError: true,

  focusOut: Ember.observer('value', function () {
    this.set('hideError', false)
  }),

  showError: Ember.computed('hasError', 'hideError', function () {
    return this.get('hasError') && !this.get('hideError')
  }),

  required: false,
  label: null,

  labelClass: Ember.computed('required', function () {
    let required = this.get('required')
    if (required === true) {
      return 'af-required'
    } else if (required) {
      return `af-required-${required}`
    }
  }),

  hintClass: null,
  hint: null,

  prompt: Ember.computed.oneWay('service.config.prompt'),
  options: Ember.computed.alias('optionValues'),

  optionValues: Ember.computed('fieldType', function () {
    return this._fieldTypeConfig('options')
  })
}).reopenClass({
  positionalParams: ['fieldKey']
})
